// ─── MELVIN FULL ASSESSMENT DATA IMPORT ──────────────────────────────────────
// Uploads to Firebase:
//   questionBanks/melvin/questions/[id]          — 500+ questions
//   questionBanks/melvin/sectionMap/[n]           — 10 sections
//   questionBanks/melvin/scoringFramework/[dim]   — 12 dimensions
//   questionBanks/melvin/contradictionChecks/[n]  — 10 flags
//   questionBanks/melvin/aiInstructions/main      — full system prompt
//   questionBanks/melvin/readme/main              — workbook overview

const admin = require('firebase-admin');
const fs    = require('fs');
const path  = require('path');

const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

// ─── Load questions from existing ES-module JS section files ─────────────────
const DATA_DIR = path.join(__dirname, '..', 'life-direction-assessment', 'src', 'data');

function loadSection(filename) {
  const code = fs.readFileSync(path.join(DATA_DIR, filename), 'utf8');
  // Strip ES6 export keyword and fix trailing double-commas
  const stripped = code
    .replace(/^\/\/[^\n]*\n/gm, '')   // remove comment lines
    .replace(/export const \w+ = /, '') // strip export
    .replace(/;?\s*$/, '')             // strip trailing semicolon
    .replace(/,,/g, ',');              // fix double-commas
  try {
    return eval(stripped) || [];
  } catch (e) {
    console.error(`  ✗ Failed to parse ${filename}:`, e.message);
    return [];
  }
}

const SECTION_FILES = [
  'melvinS1.js', 'melvinS2.js',  'melvinS3.js',  'melvinS4.js',
  'melvinS5.js', 'melvinS6.js',  'melvinS7.js',  'melvinS8.js',
  'melvinS9.js', 'melvinS10.js', 'melvinS11.js',
];

// ─── Section Map ──────────────────────────────────────────────────────────────
const SECTION_MAP = [
  {
    sectionNumber: 1,
    title: 'Self-Awareness & Current Reality',
    purpose: 'How honestly he sees his current situation, strengths, excuses, patterns, and blind spots.',
    primaryDimensions: ['SELF_AWARENESS', 'INTEGRITY'],
    notes: 'High value for reality check and minimizing behavior.',
  },
  {
    sectionNumber: 2,
    title: 'Ownership & Accountability',
    purpose: 'Whether he owns outcomes or blames people, timing, emotions, confusion, or circumstances.',
    primaryDimensions: ['OWNERSHIP', 'INTEGRITY'],
    notes: 'Used heavily in readiness scoring.',
  },
  {
    sectionNumber: 3,
    title: 'Habits & Consistency',
    purpose: 'Daily discipline, completion, routine, and reliability.',
    primaryDimensions: ['CONSISTENCY', 'RESILIENCE'],
    notes: 'One of the strongest predictors of actual change.',
  },
  {
    sectionNumber: 4,
    title: 'Time, Focus & Follow-Through',
    purpose: 'How he manages distractions, attention, planning, and finishing what he starts.',
    primaryDimensions: ['FOCUS_EXECUTION', 'CONSISTENCY'],
    notes: 'Important for school comeback and life skills.',
  },
  {
    sectionNumber: 5,
    title: 'Academic Recovery & Learning Behaviors',
    purpose: 'Class attendance, help-seeking, assignment recovery, effort, understanding, and course rescue behaviors.',
    primaryDimensions: ['ACADEMIC_RECOVERY', 'HELP_SEEKING'],
    notes: 'The most school-specific section.',
  },
  {
    sectionNumber: 6,
    title: 'Emotional Regulation & Stress',
    purpose: 'Overwhelm, frustration, shutdown, avoidance, and ability to recover from setbacks.',
    primaryDimensions: ['EMOTIONAL_REGULATION', 'RESILIENCE'],
    notes: 'Should describe patterns without diagnosing.',
  },
  {
    sectionNumber: 7,
    title: 'Support, Communication & Boundaries',
    purpose: 'Whether he asks for help, communicates early, accepts structure, and uses support wisely.',
    primaryDimensions: ['HELP_SEEKING', 'OWNERSHIP'],
    notes: 'Important for family and coaching plan.',
  },
  {
    sectionNumber: 8,
    title: 'Resilience & Change Readiness',
    purpose: 'Whether he is ready to change behavior, tolerate discomfort, and sustain effort after setbacks.',
    primaryDimensions: ['RESILIENCE', 'CHANGE_READINESS'],
    notes: 'Core predictor for next-step planning.',
  },
  {
    sectionNumber: 9,
    title: 'Future Vision, Purpose & Motivation',
    purpose: 'Career identity, meaning, long-term drive, values, and future pull.',
    primaryDimensions: ['FUTURE_DRIVE', 'SELF_AWARENESS'],
    notes: 'Helps distinguish dream from real commitment.',
  },
  {
    sectionNumber: 10,
    title: 'Integrity, Honesty & Contradiction Checks',
    purpose: 'Cross-checks for image management, minimizing, selective truth, and saying what sounds good.',
    primaryDimensions: ['INTEGRITY', 'HONESTY_FLAG'],
    notes: 'Use with contradiction groups, not as a diagnosis.',
  },
];

// ─── Scoring Framework ────────────────────────────────────────────────────────
const SCORING_FRAMEWORK = [
  {
    dimension: 'SELF_AWARENESS',
    measures: 'Accurate understanding of current patterns and blind spots',
    scoring: 'Normalize weighted average of linked question points to 0–100',
    bands: ['0-24 Very low','25-44 Low','45-59 Mixed','60-79 Good','80-100 Strong'],
    useInOutput: 'Use for reality check and blind-spot section',
  },
  {
    dimension: 'OWNERSHIP',
    measures: 'Responsibility, repair mindset, response to correction',
    scoring: 'Normalize weighted average',
    bands: ['0-24 Externalizing','25-44 Weak ownership','45-59 Mixed ownership','60-79 Responsible','80-100 Strong owner'],
    useInOutput: 'Use for accountability tone and comeback realism',
  },
  {
    dimension: 'CONSISTENCY',
    measures: 'Routine, completion, discipline over time',
    scoring: 'Normalize weighted average',
    bands: ['0-24 Chaotic','25-44 Fragile','45-59 Inconsistent','60-79 Improving','80-100 Strong'],
    useInOutput: 'Use for plan difficulty and trust-building',
  },
  {
    dimension: 'FOCUS_EXECUTION',
    measures: 'Time use, distraction management, task initiation and completion',
    scoring: 'Normalize weighted average',
    bands: ['0-24 Severely scattered','25-44 Weak execution','45-59 Mixed','60-79 Functional','80-100 Strong'],
    useInOutput: 'Use for daily plan recommendations',
  },
  {
    dimension: 'ACADEMIC_RECOVERY',
    measures: 'Recovery behavior, class rescue habits, using support',
    scoring: 'Normalize weighted average',
    bands: ['0-24 Crisis pattern','25-44 Poor recovery','45-59 Possible with support','60-79 Recoverable','80-100 Strong recovery stance'],
    useInOutput: 'Use for school comeback guidance',
  },
  {
    dimension: 'EMOTIONAL_REGULATION',
    measures: 'Acting under pressure without shutdown or avoidance',
    scoring: 'Normalize weighted average',
    bands: ['0-24 Shutdown risk','25-44 Dysregulated','45-59 Mixed','60-79 Stable enough','80-100 Strong'],
    useInOutput: 'Use for stress / support recommendations',
  },
  {
    dimension: 'HELP_SEEKING',
    measures: 'Asking for help, communication, support use',
    scoring: 'Normalize weighted average',
    bands: ['0-24 Hides / disappears','25-44 Weak communication','45-59 Mixed','60-79 Uses support','80-100 Strong'],
    useInOutput: 'Use for coaching and teacher communication plan',
  },
  {
    dimension: 'RESILIENCE',
    measures: 'Ability to recover after setbacks and keep going',
    scoring: 'Normalize weighted average',
    bands: ['0-24 Quits easily','25-44 Fragile rebound','45-59 Mixed','60-79 Rebounds','80-100 Strong'],
    useInOutput: 'Use for comeback potential',
  },
  {
    dimension: 'CHANGE_READINESS',
    measures: 'Willingness to change behavior, tolerate discomfort, accept structure',
    scoring: 'Normalize weighted average',
    bands: ['0-24 Resistant','25-44 Low readiness','45-59 Undecided','60-79 Ready','80-100 Highly ready'],
    useInOutput: 'Use for next-step path and urgency',
  },
  {
    dimension: 'FUTURE_DRIVE',
    measures: 'Vision, reasons for effort, future pull',
    scoring: 'Normalize weighted average',
    bands: ['0-24 Drifting','25-44 Weak direction','45-59 Mixed','60-79 Directional','80-100 Strong'],
    useInOutput: 'Use for motivation and path-building',
  },
  {
    dimension: 'INTEGRITY',
    measures: 'Truthfulness, image management, answer reliability',
    scoring: 'Normalize weighted average plus contradiction logic',
    bands: ['0-24 Unreliable self-report','25-44 Image-managed','45-59 Mixed','60-79 Mostly reliable','80-100 High integrity'],
    useInOutput: 'Use to decide confidence level of narrative',
  },
  {
    dimension: 'HONESTY_FLAG',
    measures: 'Not a strength score; a review flag based on contradiction clusters and image-management items',
    scoring: 'See contradiction sheet',
    bands: ['Low concern','Moderate concern','High concern'],
    useInOutput: 'Use to state confidence in conclusions',
  },
];

// Core formulas
const SCORING_FORMULAS = {
  readinessIndex: '0.18*OWNERSHIP + 0.16*CONSISTENCY + 0.14*FOCUS_EXECUTION + 0.16*ACADEMIC_RECOVERY + 0.12*EMOTIONAL_REGULATION + 0.12*RESILIENCE + 0.12*CHANGE_READINESS',
  integrityConfidence: 'Start with INTEGRITY score, then reduce confidence if contradiction groups trigger repeatedly',
  urgencyFlag: 'High urgency if ACADEMIC_RECOVERY < 45 or OWNERSHIP < 40 or CONSISTENCY < 40',
  dreamDisciplineGap: 'Trigger if FUTURE_DRIVE >= 70 and CONSISTENCY <= 45',
  overwhelmAvoidancePattern: 'Trigger if EMOTIONAL_REGULATION < 45 and HELP_SEEKING < 45 and multiple avoidance items are low',
  hopefulNotReady: 'Trigger if FUTURE_DRIVE >= 60 and CHANGE_READINESS < 50',
  strugglingButRecoverable: 'Trigger if ACADEMIC_RECOVERY 45–69 and CHANGE_READINESS >= 60 and HELP_SEEKING >= 55',
};

// ─── Contradiction Checks ─────────────────────────────────────────────────────
const CONTRADICTION_CHECKS = [
  {
    flagName: 'Aspiration–Execution Gap',
    primaryCondition: 'FUTURE_DRIVE >= 70',
    secondaryCondition: 'CONSISTENCY <= 45 OR FOCUS_EXECUTION <= 45',
    meaning: 'He wants a better future more than he is currently living toward it.',
    suggestedAILanguage: 'He sounds future-aware, but his current structure and follow-through are not yet supporting the future he describes.',
  },
  {
    flagName: 'Insight–Action Gap',
    primaryCondition: 'SELF_AWARENESS >= 65',
    secondaryCondition: 'OWNERSHIP <= 50 OR CONSISTENCY <= 50',
    meaning: 'He can name the issue but is not consistently acting on it.',
    suggestedAILanguage: 'He is not fully blind to the problem; the bigger issue is turning insight into action.',
  },
  {
    flagName: 'Image–Integrity Risk',
    primaryCondition: 'INTEGRITY <= 50',
    secondaryCondition: '3+ image-management items high risk',
    meaning: 'Answers may be more flattering than fully accurate.',
    suggestedAILanguage: 'There are signs of image management, so conclusions should be stated with cautious confidence.',
  },
  {
    flagName: 'Overwhelm–Avoidance Loop',
    primaryCondition: 'EMOTIONAL_REGULATION <= 45',
    secondaryCondition: 'HELP_SEEKING <= 45 AND ACADEMIC_RECOVERY <= 50',
    meaning: 'Stress may be turning into silence, avoidance, or shutdown.',
    suggestedAILanguage: 'The pattern is not just stress; it appears stress often leads to reduced communication and weaker recovery behavior.',
  },
  {
    flagName: 'Ownership Deficit',
    primaryCondition: 'OWNERSHIP <= 45',
    secondaryCondition: 'multiple blame / defense items high risk',
    meaning: 'He may understand some problems but still externalize too much.',
    suggestedAILanguage: 'He appears to explain problems more easily than he owns them.',
  },
  {
    flagName: 'Support Resistance',
    primaryCondition: 'HELP_SEEKING <= 45',
    secondaryCondition: 'CHANGE_READINESS <= 55',
    meaning: 'He may want improvement while resisting the structure needed to improve.',
    suggestedAILanguage: 'He may benefit from support, but part of the work is accepting support before crisis level.',
  },
  {
    flagName: 'Recoverable If Serious',
    primaryCondition: 'ACADEMIC_RECOVERY between 45 and 69',
    secondaryCondition: 'CHANGE_READINESS >= 60 AND HELP_SEEKING >= 55',
    meaning: 'There is a realistic path forward if behavior changes fast and consistently.',
    suggestedAILanguage: 'The picture is not hopeless; it suggests recovery is possible if he moves quickly and accepts structure.',
  },
  {
    flagName: 'Dream Without Direction',
    primaryCondition: 'FUTURE_DRIVE <= 50',
    secondaryCondition: 'SELF_AWARENESS <= 55',
    meaning: 'He may be reacting more to the present than moving toward a defined future.',
    suggestedAILanguage: 'Part of the challenge is not only discipline but also weak future pull.',
  },
  {
    flagName: 'Quit-Risk Pattern',
    primaryCondition: 'RESILIENCE <= 45',
    secondaryCondition: 'CHANGE_READINESS <= 50 AND multiple setback items low',
    meaning: 'He may stop early when effort gets uncomfortable or exposes weakness.',
    suggestedAILanguage: 'The biggest risk is not ability alone; it is withdrawing when the work stops feeling easy.',
  },
  {
    flagName: 'High Potential, Low Stability',
    primaryCondition: 'FUTURE_DRIVE >= 65 OR SELF_AWARENESS >= 65',
    secondaryCondition: 'CONSISTENCY <= 45',
    meaning: 'He may have real insight or ambition without enough structure to carry it.',
    suggestedAILanguage: 'Potential is visible, but reliability is not yet strong enough to cash it in.',
  },
];

// ─── AI Output Instructions ───────────────────────────────────────────────────
const AI_INSTRUCTIONS = {
  systemRole: `You are a calm, grounded, direct assessment interpreter who respects independence but enforces truth for Melvin's Life Direction Assessment.`,

  job: `Use the scores, contradiction flags, and text answers to produce a truthful, calm, specific output. Do not flatter. Do not attack. Do not diagnose. Describe patterns, risks, strengths, readiness, supports needed, and next-step recommendations.`,

  nonNegotiableRules: [
    'Do not describe him as hopeless.',
    'Do not diagnose depression, anxiety, ADHD, or any disorder.',
    'Do not reduce everything to "motivation."',
    'Distinguish clearly between: lack of skill, lack of structure, overwhelm, avoidance, weak ownership, inconsistency.',
    'If integrity is low, say the result has lower confidence because some answers suggest image management or contradiction.',
    'If future drive is high but consistency is low, name the aspiration–execution gap clearly.',
    'If academic recovery is low but help-seeking and change readiness are decent, say recovery may still be possible with urgent structure and communication.',
    'Use plain language, not therapy jargon.',
    'Mention real patterns shown by the scores and text answers, not generic encouragement.',
    'End with realistic hope plus a specific next move.',
  ],

  inputsReceived: [
    'dimension_scores: 0–100 for each dimension',
    'contradiction_flags: list of triggered flags',
    'top_risk_items: the lowest-scoring/highest-risk questions',
    'text_answers: user text responses',
    'key_multi_select_patterns: selected risk / support options',
    'confidence_level: high / medium / low based on integrity',
  ],

  outputFormat: [
    '1. Direct Summary',
    '2. Biggest Strengths',
    '3. Biggest Blockers',
    '4. Contradictions / Reality Checks',
    '5. Academic Recovery Readiness',
    '6. Best Next-Step Path',
    '7. 7-Day Action Plan',
    '8. 30-Day Growth Focus',
    '9. Parent / Coach Notes',
    '10. Closing Line',
  ],

  style: 'calm, clear, direct, emotionally intelligent, no fluff, no fake hype, no diagnosis',

  confidenceRule: 'If INTEGRITY or HONESTY_FLAG raises concern, add: "Some answers suggest image management or contradiction, so parts of this result should be read with caution and tested against recent behavior."',

  truthScoreLogic: 'If 3+ contradiction groups (TD_01–TD_10) conflict, raise Integrity Risk. Report Truth Score (0–100) derived from INTEGRITY and contradiction frequency.',

  fullSystemPrompt: `SYSTEM ROLE
You are a calm, grounded, direct assessment interpreter who respects independence but enforces truth for Melvin's Life Direction Assessment.

YOUR JOB
Use the scores, contradiction flags, and text answers to produce a truthful, calm, specific output.
Do not flatter. Do not attack. Do not diagnose.
Describe patterns, risks, strengths, readiness, supports needed, and next-step recommendations.

NON-NEGOTIABLE RULES
1. Do not describe him as hopeless.
2. Do not diagnose depression, anxiety, ADHD, or any disorder.
3. Do not reduce everything to "motivation."
4. Distinguish clearly between: lack of skill / lack of structure / overwhelm / avoidance / weak ownership / inconsistency.
5. If integrity is low, say the result has lower confidence because some answers suggest image management or contradiction.
6. If future drive is high but consistency is low, name the aspiration–execution gap clearly.
7. If academic recovery is low but help-seeking and change readiness are decent, say recovery may still be possible with urgent structure and communication.
8. Use plain language, not therapy jargon.
9. Mention real patterns shown by the scores and text answers, not generic encouragement.
10. End with realistic hope plus a specific next move.

INPUTS YOU WILL RECEIVE
- dimension_scores: 0–100 for each dimension
- contradiction_flags: list of triggered flags
- top_risk_items: the lowest-scoring/highest-risk questions
- text_answers: user text responses
- key_multi_select_patterns: selected risk / support options
- confidence_level: high / medium / low based on integrity

OUTPUT FORMAT
1. Direct Summary
2. Biggest Strengths
3. Biggest Blockers
4. Contradictions / Reality Checks
5. Academic Recovery Readiness
6. Best Next-Step Path
7. 7-Day Action Plan
8. 30-Day Growth Focus
9. Parent / Coach Notes
10. Closing Line

STYLE: calm, clear, direct, emotionally intelligent, no fluff, no fake hype, no diagnosis

CONFIDENCE RULE
If INTEGRITY or HONESTY_FLAG raises concern, add:
"Some answers suggest image management or contradiction, so parts of this result should be read with caution and tested against recent behavior."

TRUTH SCORE LOGIC
If 3+ contradiction groups (TD_01–TD_10) conflict, raise Integrity Risk.
Report Truth Score (0–100) derived from INTEGRITY and contradiction frequency.`,
};

// ─── README Overview ─────────────────────────────────────────────────────────
const README = {
  title: 'Melvin Final Assessment System — Advanced Version',
  sheets: [
    { name: 'Questions', description: '500 assessment questions with answer choices, scoring points, dimensions, weights, contradiction groups, and AI review tags.' },
    { name: 'Scoring_Framework', description: 'How to calculate dimension scores, flags, and recovery readiness.' },
    { name: 'Contradiction_Checks', description: 'Logic pairs and clusters the AI should compare.' },
    { name: 'AI_Output_Instructions', description: 'Final system prompt and output structure for your app / Claude / OpenAI.' },
    { name: 'Section_Map', description: 'The exact assessment sections and what each section is trying to uncover.' },
  ],
  howToUse: [
    'Keep the Questions sheet as your source of truth for the app.',
    'Store answers per question ID.',
    'Convert selected answer to points using Option_A_Points through Option_E_Points.',
    'Normalize each dimension to a 0–100 score.',
    'Run contradiction checks before generating the final narrative output.',
    'Text questions are not auto-scored; they should be summarized by AI and used to enrich the final output.',
  ],
  scoringConventions: {
    '0': 'strong risk / unhealthy pattern',
    '1': 'mild risk',
    '2': 'mixed / unclear',
    '3': 'healthy',
    '4': 'strong healthy pattern',
    weights: '1.0 = standard, 1.25 = important, 1.5 = high signal',
  },
  aiSafetyRule: 'The AI should not diagnose. It should describe observable patterns, contradictions, readiness, risks, supports needed, and next steps.',
};

// ─── Main upload function ─────────────────────────────────────────────────────
async function run() {
  const userId = 'melvin';

  // 1. Load questions from existing JS section files
  console.log('Loading questions from JS files...');
  let allQuestions = [];
  for (const file of SECTION_FILES) {
    const questions = loadSection(file);
    allQuestions = allQuestions.concat(questions);
    console.log(`  ${file}: ${questions.length} questions`);
  }
  console.log(`Total questions loaded: ${allQuestions.length}`);

  // 2. Upload questions in batches of 400
  console.log('\n── Uploading questions ──');
  let batch = db.batch();
  let batchCount = 0;
  let totalWritten = 0;
  for (let i = 0; i < allQuestions.length; i++) {
    const q = allQuestions[i];
    if (!q || !q.id) continue;
    const ref = db.collection('questionBanks').doc(userId).collection('questions').doc(String(q.id));
    batch.set(ref, { ...q, importIndex: i + 1, importedAt: new Date().toISOString() });
    batchCount++;
    if (batchCount === 400) {
      await batch.commit();
      totalWritten += batchCount;
      console.log(`  committed ${totalWritten} questions`);
      batch = db.batch();
      batchCount = 0;
    }
  }
  if (batchCount > 0) {
    await batch.commit();
    totalWritten += batchCount;
  }
  console.log(`✓ All questions written: ${totalWritten}`);

  // 3. Upload section map
  console.log('\n── Uploading section map ──');
  const sectionBatch = db.batch();
  SECTION_MAP.forEach((sec, i) => {
    const ref = db.collection('questionBanks').doc(userId).collection('sectionMap').doc(`section_${i + 1}`);
    sectionBatch.set(ref, { ...sec, importedAt: new Date().toISOString() });
  });
  await sectionBatch.commit();
  console.log(`✓ Section map written: ${SECTION_MAP.length}`);

  // 4. Upload scoring framework
  console.log('\n── Uploading scoring framework ──');
  const scoringBatch = db.batch();
  SCORING_FRAMEWORK.forEach((dim, i) => {
    const ref = db.collection('questionBanks').doc(userId).collection('scoringFramework').doc(`dim_${i + 1}`);
    scoringBatch.set(ref, { ...dim, importedAt: new Date().toISOString() });
  });
  // Also store the formulas
  scoringBatch.set(
    db.collection('questionBanks').doc(userId).collection('scoringFramework').doc('formulas'),
    { ...SCORING_FORMULAS, importedAt: new Date().toISOString() }
  );
  await scoringBatch.commit();
  console.log(`✓ Scoring framework written: ${SCORING_FRAMEWORK.length} dimensions + formulas`);

  // 5. Upload contradiction checks
  console.log('\n── Uploading contradiction checks ──');
  const contraBatch = db.batch();
  CONTRADICTION_CHECKS.forEach((check, i) => {
    const ref = db.collection('questionBanks').doc(userId).collection('contradictionChecks').doc(`check_${i + 1}`);
    contraBatch.set(ref, { ...check, importedAt: new Date().toISOString() });
  });
  await contraBatch.commit();
  console.log(`✓ Contradiction checks written: ${CONTRADICTION_CHECKS.length}`);

  // 6. Upload AI instructions
  console.log('\n── Uploading AI instructions ──');
  await db.collection('questionBanks').doc(userId)
    .collection('aiInstructions').doc('main')
    .set({ ...AI_INSTRUCTIONS, importedAt: new Date().toISOString() });
  console.log('✓ AI instructions written');

  // 7. Upload README
  console.log('\n── Uploading README ──');
  await db.collection('questionBanks').doc(userId)
    .collection('readme').doc('main')
    .set({ ...README, importedAt: new Date().toISOString() });
  console.log('✓ README written');

  console.log('\n✓ MELVIN IMPORT COMPLETE');
  console.log(`Firebase path: questionBanks/${userId}/...`);
}

run().catch(console.error);
