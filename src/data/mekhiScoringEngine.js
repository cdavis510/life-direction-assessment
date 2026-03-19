/**
 * mekhiScoringEngine.js
 * Mekhi Assessment — Full Post-Assessment Processing System
 *
 * Parts:
 *   1. Section weights + raw score calculators
 *   2. Core score builder
 *   3. Red flag engine
 *   4. Contradiction engine
 *   5. College path recommendation
 *   6. Monthly Man Goal generator
 *   7. Weekly reset builder
 *   8. Monthly output builder
 *   9. Dashboard section config
 *
 * Section key → Section name mapping:
 *   emotionalMentalState          → Section 1:  Emotional & Mental State
 *   identityDirection             → Section 2:  Identity & Direction
 *   responsibilityAccountability  → Section 3:  Responsibility & Accountability
 *   academicReality               → Section 4:  Academic Reality
 *   attendanceStructure           → Section 5:  Attendance & Structure
 *   executiveFunction             → Section 6:  Executive Function
 *   communicationAdvocacy         → Section 7:  Communication & Self-Advocacy
 *   socialJudgmentEnvironment     → Section 8:  Social Judgment & Environment
 *   collegeReadinessIndependence  → Section 9:  College Readiness & Independence
 *   sportsCareerAlignment         → Section 10: Career Alignment
 *   lifeVisionBlueprint           → Section 11: Life Vision & Blueprint
 */


// ============================================================
// PART 1 — SECTION WEIGHTS + SCORE CALCULATORS
// ============================================================

/**
 * sectionWeights
 * Each section's contribution to the overall assessment score.
 * Weights sum to 1.00.
 */
export const SECTION_WEIGHTS = {
  emotionalMentalState:         0.14,  // Highest — emotional state drives all other outcomes
  identityDirection:            0.08,
  responsibilityAccountability: 0.16,  // Highest — the core execution signal
  academicReality:              0.12,
  attendanceStructure:          0.12,
  executiveFunction:            0.10,
  communicationAdvocacy:        0.08,
  socialJudgmentEnvironment:    0.08,
  collegeReadinessIndependence: 0.07,
  sportsCareerAlignment:        0.03,
  lifeVisionBlueprint:          0.02,
};

/**
 * SECTION_LABELS
 * Human-readable names for UI display.
 */
export const SECTION_LABELS = {
  emotionalMentalState:         'Emotional & Mental State',
  identityDirection:            'Identity & Direction',
  responsibilityAccountability: 'Responsibility & Accountability',
  academicReality:              'Academic Reality',
  attendanceStructure:          'Attendance & Structure',
  executiveFunction:            'Executive Function',
  communicationAdvocacy:        'Communication & Self-Advocacy',
  socialJudgmentEnvironment:    'Social Judgment & Environment',
  collegeReadinessIndependence: 'College Readiness & Independence',
  sportsCareerAlignment:        'Career Alignment',
  lifeVisionBlueprint:          'Life Vision & Blueprint',
};

/**
 * calculateSectionScore
 *
 * Computes a normalized 0–100 score for a single section.
 * Assumes each question has been scored 1–5 (Likert scale base).
 * Handles weighted questions via optional q.weight field.
 *
 * @param {Array}  answers — [{ id, score (1–5), weight? }]
 * @returns {number} 0–100
 */
export function calculateSectionScore(answers) {
  if (!answers || answers.length === 0) return 0;

  let totalWeight = 0;
  let weightedSum = 0;

  for (const q of answers) {
    const score = q.score ?? 0;
    const weight = q.weight ?? 1;
    weightedSum += (score / 5) * 100 * weight;
    totalWeight += weight;
  }

  return totalWeight > 0
    ? Math.min(100, Math.max(0, Math.round(weightedSum / totalWeight)))
    : 0;
}

/**
 * calculateOverallScore
 *
 * Computes weighted overall assessment score from all section scores.
 *
 * @param {Object} sectionScores — { emotionalMentalState: 72, ... }
 * @returns {number} 0–100
 */
export function calculateOverallScore(sectionScores) {
  let total = 0;
  for (const key of Object.keys(SECTION_WEIGHTS)) {
    total += (sectionScores[key] ?? 0) * SECTION_WEIGHTS[key];
  }
  return Math.min(100, Math.max(0, Math.round(total)));
}


// ============================================================
// PART 2 — CORE SCORE BUILDER
// ============================================================

/**
 * buildCoreScores
 *
 * Aggregates section scores into 6 meaningful core scores.
 * These are the primary lens through which the AI and dashboard
 * read Mekhi's status.
 *
 * @param {Object} sectionScores
 * @returns {Object} coreScores
 */
export function buildCoreScores(sectionScores) {
  const s = sectionScores;

  return {
    // How he is doing emotionally and mentally right now
    emotionalWellBeing: Math.round(
      (s.emotionalMentalState ?? 0) * 0.70 +
      (s.identityDirection ?? 0) * 0.30
    ),

    // Whether he follows through, shows up, and owns his choices
    responsibility: Math.round(
      (s.responsibilityAccountability ?? 0) * 0.60 +
      (s.attendanceStructure ?? 0) * 0.40
    ),

    // Whether he can function independently — skills, planning, asking for help
    independenceReadiness: Math.round(
      (s.collegeReadinessIndependence ?? 0) * 0.50 +
      (s.executiveFunction ?? 0) * 0.30 +
      (s.communicationAdvocacy ?? 0) * 0.20
    ),

    // Whether he can recover academically — current reality + attendance habits
    academicRecovery: Math.round(
      (s.academicReality ?? 0) * 0.70 +
      (s.attendanceStructure ?? 0) * 0.30
    ),

    // Career clarity and alignment (sports/media/analytics path)
    careerAlignment: Math.round(s.sportsCareerAlignment ?? 0),

    // How clear and concrete his life vision is
    blueprintClarity: Math.round(s.lifeVisionBlueprint ?? 0),
  };
}


// ============================================================
// PART 3 — RED FLAG ENGINE
// ============================================================

/**
 * FLAG_DEFINITIONS
 * Each flag type with label, what it means, and what it costs.
 */
export const FLAG_DEFINITIONS = {
  emotional_instability: {
    type: 'emotional_instability',
    label: 'Emotional Instability',
    severity: 'high',
    threshold: 60,
    scoreKey: 'emotionalWellBeing',
    description: 'Emotional state is below the minimum needed for consistent functioning in a college or work environment.',
    cost: 'Everything else — academics, relationships, discipline — requires emotional stability as a foundation. Without it, nothing else holds.',
    intervention: 'Address emotional health before academic recovery. One without the other will not work.',
  },
  low_responsibility: {
    type: 'low_responsibility',
    label: 'Low Responsibility',
    severity: 'high',
    threshold: 60,
    scoreKey: 'responsibility',
    description: 'Follow-through, accountability, and ownership of choices are below functioning threshold.',
    cost: 'Low responsibility in a college environment means missed deadlines, avoided conversations, and eventually failed semesters. This is what happened at Clark Atlanta.',
    intervention: 'Build a structured accountability system before returning to any academic environment.',
  },
  low_independence: {
    type: 'low_independence',
    label: 'Low Independence Readiness',
    severity: 'high',
    threshold: 55,
    scoreKey: 'independenceReadiness',
    description: 'Cannot fully self-manage, self-advocate, or self-direct at the level required for college independence.',
    cost: 'Independence is the entire skill set that determines whether college works without someone physically present. Without it, the same pattern repeats.',
    intervention: 'Build independence skills at home before attempting a college environment again.',
  },
  academic_risk: {
    type: 'academic_risk',
    label: 'Academic Recovery Risk',
    severity: 'medium',
    threshold: 55,
    scoreKey: 'academicRecovery',
    description: 'Academic habits and current reality suggest significant risk of repeating prior academic failure.',
    cost: 'A second semester like the last one may result in academic dismissal, loss of financial aid, and a longer delay to any goal.',
    intervention: 'Academic support, study skills, and Canvas/LMS navigation must be in place before returning.',
  },
  low_career_clarity: {
    type: 'low_career_clarity',
    label: 'Career Path Unclear',
    severity: 'medium',
    threshold: 50,
    scoreKey: 'careerAlignment',
    description: 'Career interests and the connection between current choices and future goals are not clearly established.',
    cost: 'Without a clear "why," every hard thing about school feels optional. The goal has to be real and visible.',
    intervention: 'Build the career picture in concrete, specific terms — job title, income, day-in-the-life.',
  },
  no_blueprint: {
    type: 'no_blueprint',
    label: 'No Life Blueprint',
    severity: 'low',
    threshold: 45,
    scoreKey: 'blueprintClarity',
    description: 'Life vision is vague or absent — no clear picture of where he is going.',
    cost: 'Without a vivid picture of the future he is building, daily discipline has no anchor.',
    intervention: 'Create a specific, written, visual life blueprint — housing, income, lifestyle, career — that he can look at.',
  },
};

/**
 * buildFlags
 *
 * Evaluates core scores against thresholds and returns triggered flags.
 *
 * @param {Object} coreScores — output of buildCoreScores
 * @returns {Array} triggered flag objects
 */
export function buildFlags(coreScores) {
  const triggered = [];

  for (const flagDef of Object.values(FLAG_DEFINITIONS)) {
    const score = coreScores[flagDef.scoreKey] ?? 100;
    if (score < flagDef.threshold) {
      triggered.push({
        ...flagDef,
        currentScore: score,
        gap: flagDef.threshold - score,
      });
    }
  }

  // Sort: high severity first, then by score gap (largest gap first)
  return triggered.sort((a, b) => {
    const sevOrder = { high: 0, medium: 1, low: 2 };
    if (sevOrder[a.severity] !== sevOrder[b.severity]) {
      return sevOrder[a.severity] - sevOrder[b.severity];
    }
    return (b.gap ?? 0) - (a.gap ?? 0);
  });
}


// ============================================================
// PART 4 — CONTRADICTION ENGINE
// ============================================================

/**
 * CONTRADICTION_DEFINITIONS
 * Known high-signal contradictions for Mekhi's profile.
 */
export const CONTRADICTION_DEFINITIONS = [
  {
    id: 'high_goals_low_discipline',
    label: 'High Goals, Low Discipline',
    condition: (d) => d.highGoals && d.lowDiscipline,
    description: 'States high career or life ambitions but current discipline and follow-through scores are low.',
    implication: 'Goals without discipline are just wishes. The gap between what he says he wants and what he does every day is the thing that has to close.',
  },
  {
    id: 'wants_independence_needs_reminders',
    label: 'Wants Independence, Depends on Others',
    condition: (d) => d.wantsIndependence && d.needsReminders,
    description: 'Reports wanting independence and autonomy but shows patterns of needing external reminders to complete basic tasks.',
    implication: 'Independence is a skill, not a feeling. You cannot want independence and also need someone to remind you of deadlines every week.',
  },
  {
    id: 'sports_career_avoids_communication',
    label: 'Sports Career Goal, Avoids Communication',
    condition: (d) => d.wantsSportsCareer && d.avoidsCommunication,
    description: 'Wants a career in sports (analytics, media, operations) but communication and self-advocacy scores are critically low.',
    implication: 'Every path in sports and media requires communication — with professors, advisors, bosses, agents. Avoidance is not compatible with this career.',
  },
  {
    id: 'college_talk_no_academic_action',
    label: 'Talks About College, No Academic Action',
    condition: (d) => d.wantsToReturn && d.noStudyHabits,
    description: 'Expresses desire to return to college or succeed academically but shows no evidence of study habits, assignment tracking, or academic routine.',
    implication: 'Wanting to go back to school is not the same as being ready. The habits have to exist before the building, not after.',
  },
  {
    id: 'financial_goals_gambling_behavior',
    label: 'Financial Goals, Gambling Behavior',
    condition: (d) => d.financialGoals && d.gamblingBehavior,
    description: 'Has stated goals around income and financial stability but uses financial aid or income for sports betting.',
    implication: 'You cannot build financial stability and gamble away the resources you have. The behavior contradicts the goal every time.',
  },
];

/**
 * detectContradictions
 *
 * @param {Object} data — behavioral signal object derived from assessment answers
 *   Expected shape: { highGoals, lowDiscipline, wantsIndependence, needsReminders,
 *                     wantsSportsCareer, avoidsCommunication, wantsToReturn,
 *                     noStudyHabits, financialGoals, gamblingBehavior }
 * @returns {Array} triggered contradiction objects
 */
export function detectContradictions(data) {
  return CONTRADICTION_DEFINITIONS.filter((def) => def.condition(data));
}

/**
 * buildBehaviorSignals
 *
 * Derives boolean behavior signals from core scores + section scores
 * for use in detectContradictions.
 *
 * @param {Object} coreScores
 * @param {Object} sectionScores
 * @param {Object} academicContext — optional, from AI_CONTEXT_TEMPLATE.academicContext
 * @returns {Object} behaviorSignals
 */
export function buildBehaviorSignals(coreScores, sectionScores = {}, academicContext = {}) {
  const failingCourses = (academicContext.currentGrades ?? []).filter(
    (g) => g.status === 'failing'
  ).length;

  return {
    highGoals: (sectionScores.lifeVisionBlueprint ?? 0) > 65 ||
               (sectionScores.sportsCareerAlignment ?? 0) > 65,
    lowDiscipline: coreScores.responsibility < 60,
    wantsIndependence: (sectionScores.collegeReadinessIndependence ?? 0) > 60,
    needsReminders: (sectionScores.executiveFunction ?? 0) < 55,
    wantsSportsCareer: (sectionScores.sportsCareerAlignment ?? 0) > 55,
    avoidsCommunication: (sectionScores.communicationAdvocacy ?? 0) < 52,
    wantsToReturn: (sectionScores.academicReality ?? 0) > 55,
    noStudyHabits: failingCourses > 0 || (sectionScores.academicReality ?? 0) < 50,
    financialGoals: (sectionScores.lifeVisionBlueprint ?? 0) > 55,
    gamblingBehavior: false, // Set to true if gambling behavior confirmed in answers (ms3_xx flag)
  };
}


// ============================================================
// PART 5 — COLLEGE PATH RECOMMENDATION
// ============================================================

export const COLLEGE_PATH_OPTIONS = {
  A: {
    id: 'A',
    label: 'Return to Clark Atlanta — Structured Support Plan',
    description: 'Return to CAU with a specific, non-negotiable support infrastructure in place.',
    requirements: {
      emotionalWellBeing: 75,
      responsibility: 75,
      independenceReadiness: 75,
      academicRecovery: 70,
    },
    planItems: [
      'Disability Services office — IEP and accommodations registered on Day 1',
      'Canvas LMS training completed before semester starts',
      'Weekly academic advisor check-in (calendar invite, not optional)',
      'Medication accountability system established with a trusted contact at school',
      'Tutoring center location identified and visited before classes begin',
      'iClicker account purchased and activated before first class',
      'No gambling apps on phone for first 90 days',
    ],
  },
  B: {
    id: 'B',
    label: 'Hybrid Path — Continue with Intensive Support System',
    description: 'Continue at CAU but with substantially increased external support and structured accountability.',
    requirements: {
      emotionalWellBeing: 60,
      responsibility: 60,
      independenceReadiness: 55,
      academicRecovery: 55,
    },
    planItems: [
      'Return only after CAU incomplete/withdrawal paperwork is handled correctly',
      'Must complete a formal re-entry or academic recovery plan with the Dean of Students',
      'Weekly accountability call with Mom — grades discussed openly, not avoided',
      'Academic coach or tutor hired before semester starts',
      'Medication consistency plan (not just "I\'ll take it")',
    ],
  },
  C: {
    id: 'C',
    label: 'Return Home — Community College → Transfer',
    description: 'Stabilize at home, attend a Bay Area community college, rebuild academic foundation, then transfer.',
    requirements: null, // No minimum scores — this is the default for below B thresholds
    planItems: [
      'Enroll at Laney College, Merritt College, or College of Alameda — Oakland-based',
      'Choose 2 courses first semester: English Composition + one elective interest',
      'Work 15–20 hours/week to build structure and income',
      'Join a campus club or activity to rebuild social confidence',
      'Set 1-year target: 3.0+ GPA, clear transfer plan to 4-year',
    ],
  },
  D: {
    id: 'D',
    label: 'Structured Gap / Vocational Path',
    description: 'Take a purposeful gap — Job Corps, vocational training, apprenticeship, or structured career program.',
    requirements: null,
    planItems: [
      'Job Corps program in tech, automotive, or media',
      'Bay Area trade apprenticeship (IBEW, carpenters, plumbers — union wages)',
      'Sports data or analytics certificate program (online, e.g., MIT OpenCourseWare)',
      'Work full-time and take one online course per semester',
      'Revisit college decision in 12 months with real data: savings, skills, clarity',
    ],
  },
};

/**
 * getCollegePathRecommendation
 *
 * @param {Object} coreScores — output of buildCoreScores
 * @returns {Object} recommended path object
 */
export function getCollegePathRecommendation(coreScores) {
  const { emotionalWellBeing, responsibility, independenceReadiness, academicRecovery } = coreScores;

  // Path A — strongest
  if (
    emotionalWellBeing >= 75 &&
    responsibility >= 75 &&
    independenceReadiness >= 75 &&
    academicRecovery >= 70
  ) {
    return { ...COLLEGE_PATH_OPTIONS.A, confidence: 'high' };
  }

  // Path B — hybrid
  if (
    emotionalWellBeing >= 60 &&
    responsibility >= 60 &&
    independenceReadiness >= 55 &&
    academicRecovery >= 55
  ) {
    return { ...COLLEGE_PATH_OPTIONS.B, confidence: 'medium' };
  }

  // Path C — community college
  if (emotionalWellBeing >= 45 || responsibility >= 45) {
    return { ...COLLEGE_PATH_OPTIONS.C, confidence: 'high' };
  }

  // Path D — needs stabilization first
  return { ...COLLEGE_PATH_OPTIONS.D, confidence: 'high' };
}


// ============================================================
// PART 6 — MONTHLY MAN GOAL
// ============================================================

const MONTHLY_GOAL_CONTENT = {
  emotionalMentalState: {
    title: 'Build Emotional Stability',
    whyItMatters: 'Everything else in your life — school, work, relationships — runs on your emotional state. When it\'s unstable, you shut down. When it\'s grounded, you can execute.',
    successDefinition: 'By end of 30 days: consistent Zoloft compliance, one new coping tool practiced at least 3x/week, and one hard conversation completed instead of avoided.',
    weeklyActions: [
      'Week 1: Take medication consistently — track it daily',
      'Week 2: Name one thing that is bothering you and say it out loud to one person',
      'Week 3: Replace one shutdown behavior with one grounding action (walk, music, exercise)',
      'Week 4: Review — what shifted? What needs to continue?',
    ],
  },
  responsibilityAccountability: {
    title: 'Build Follow-Through',
    whyItMatters: 'Responsibility is the one skill that determines whether everything else works. Without it, nothing holds — not school, not work, not any goal you set.',
    successDefinition: 'By end of 30 days: complete 80% of weekly reset check-ins, follow through on 3 stated commitments, and no major avoided responsibilities.',
    weeklyActions: [
      'Week 1: Write down 3 things you will do this week. Do them.',
      'Week 2: Tell one person what you committed to so they can hold you to it.',
      'Week 3: Identify the one responsibility you have been avoiding the longest. Address it.',
      'Week 4: Review — what did you complete vs. avoid? Be honest.',
    ],
  },
  academicReality: {
    title: 'Face the Academic Reality',
    whyItMatters: 'Pretending the academic situation is okay when it isn\'t is exactly what put you here. Facing it clearly is the only way out.',
    successDefinition: 'By end of 30 days: know exactly where you stand in every course, have a real plan for recovery or next steps, and have communicated with at least one professor.',
    weeklyActions: [
      'Week 1: Log into Canvas and write down the status of every class — no skipping, no guessing.',
      'Week 2: Email one professor. Not to make excuses — to ask what can still be done.',
      'Week 3: Make the decision: recover this semester or handle withdrawal correctly.',
      'Week 4: Have the conversation with Mom about what actually happened and what comes next.',
    ],
  },
  attendanceStructure: {
    title: 'Build a Daily Structure',
    whyItMatters: 'Without structure, the days blur together and nothing gets done. Structure is what turns intentions into actions.',
    successDefinition: 'By end of 30 days: a consistent daily schedule that you actually follow — not just set.',
    weeklyActions: [
      'Week 1: Build a 7-day schedule. Include wake time, meals, one productive task per day.',
      'Week 2: Follow it 5 of 7 days. Track it.',
      'Week 3: Identify what keeps breaking the schedule. Solve one of those problems.',
      'Week 4: Evaluate — what does your schedule say about your actual priorities?',
    ],
  },
  collegeReadinessIndependence: {
    title: 'Build Independence Skills',
    whyItMatters: 'The reason college got hard wasn\'t lack of intelligence. It was lack of self-management skills. Those can be built — but not while someone else is doing them for you.',
    successDefinition: 'By end of 30 days: handling one responsibility completely independently that previously required help.',
    weeklyActions: [
      'Week 1: Identify 3 things you let someone else handle that belong to you. Pick one.',
      'Week 2: Own that one thing completely — set it up, do it, report back only when done.',
      'Week 3: Add a second item from your list.',
      'Week 4: Review — what does it feel like to handle your own life? What did you avoid?',
    ],
  },
  identityDirection: {
    title: 'Get Clear on Direction',
    whyItMatters: 'Without knowing who you are trying to become, every hard thing feels optional. Identity is the anchor.',
    successDefinition: 'By end of 30 days: a written, specific statement of where you are going and why — not a vague goal, a real picture.',
    weeklyActions: [
      'Week 1: Write down the answer to: "What kind of man do I want to be at 25?"',
      'Week 2: Research one specific job title in sports analytics or media. Learn what it pays and what it requires.',
      'Week 3: Find one person who does that job and learn how they got there.',
      'Week 4: Write a 1-year plan based on that research. Share it with one person.',
    ],
  },
};

/**
 * generateMonthlyManGoal
 *
 * @param {Object} sectionScores
 * @param {Object} coreScores — optional, used to refine selection
 * @returns {Object} monthlyManGoal
 */
export function generateMonthlyManGoal(sectionScores, coreScores = {}) {
  // Find the section with the most critical gap
  const priorityOrder = [
    'responsibilityAccountability',
    'emotionalMentalState',
    'academicReality',
    'attendanceStructure',
    'collegeReadinessIndependence',
    'identityDirection',
  ];

  let weakestKey = priorityOrder[0];
  let lowestScore = sectionScores[priorityOrder[0]] ?? 100;

  for (const key of priorityOrder) {
    const score = sectionScores[key] ?? 100;
    if (score < lowestScore) {
      lowestScore = score;
      weakestKey = key;
    }
  }

  const content = MONTHLY_GOAL_CONTENT[weakestKey] ?? MONTHLY_GOAL_CONTENT.responsibilityAccountability;

  return {
    section: weakestKey,
    sectionLabel: SECTION_LABELS[weakestKey],
    currentScore: lowestScore,
    title: content.title,
    whyItMatters: content.whyItMatters,
    successDefinition: content.successDefinition,
    weeklyActions: content.weeklyActions,
  };
}


// ============================================================
// PART 7 — WEEKLY RESET BUILDER
// ============================================================

/**
 * buildWeeklyReset
 *
 * Processes weekly check-in answers and returns status + score.
 *
 * @param {Array} answers — [{ id, score (1–5), weight? }]
 * @param {Object} previousReset — last week's result (optional, for trend)
 * @returns {Object} weeklyReset
 */
export function buildWeeklyReset(answers, previousReset = null) {
  const score = calculateSectionScore(answers);

  let status;
  let statusMessage;
  if (score > 80) {
    status = 'locked_in';
    statusMessage = 'Locked in. The habits are holding. Keep the standard.';
  } else if (score > 65) {
    status = 'improving';
    statusMessage = 'Improving. Something is working — identify what and repeat it.';
  } else if (score > 50) {
    status = 'inconsistent';
    statusMessage = 'Inconsistent. The effort is there but the follow-through is breaking. Find where it drops.';
  } else {
    status = 'off_track';
    statusMessage = 'Off track. Not a judgment — a signal. Something needs to reset.';
  }

  const trend = previousReset
    ? score - previousReset.score > 5 ? 'improving'
      : score - previousReset.score < -5 ? 'declining'
      : 'stable'
    : 'first_entry';

  return {
    score,
    status,
    statusMessage,
    trend,
    completedAt: new Date().toISOString(),
  };
}


// ============================================================
// PART 8 — MONTHLY OUTPUT BUILDER
// ============================================================

/**
 * buildMonthlyOutput
 *
 * Synthesizes all monthly data into a structured output object
 * for the AI coach and dashboard.
 *
 * @param {Object} data — {
 *   coreScores, sectionScores, flags, weeklyResets (array),
 *   previousMonthScores, academicContext
 * }
 * @returns {Object} monthlyOutput
 */
export function buildMonthlyOutput(data) {
  const {
    coreScores = {},
    sectionScores = {},
    flags = [],
    weeklyResets = [],
    previousMonthScores = null,
    academicContext = {},
  } = data;

  const overallScore = calculateOverallScore(sectionScores);

  // Status
  let status;
  if (overallScore >= 75) status = 'strong_progress';
  else if (overallScore >= 60) status = 'improving';
  else if (overallScore >= 45) status = 'at_risk';
  else status = 'critical';

  // Changes detected vs. prior month
  const changesDetected = [];
  if (previousMonthScores) {
    for (const [key, currentVal] of Object.entries(coreScores)) {
      const prevVal = previousMonthScores[key];
      if (prevVal === undefined) continue;
      const delta = currentVal - prevVal;
      if (Math.abs(delta) >= 8) {
        changesDetected.push({
          area: key,
          previous: prevVal,
          current: currentVal,
          delta,
          direction: delta > 0 ? 'improved' : 'declined',
        });
      }
    }
  }

  // Improvements
  const improvements = changesDetected
    .filter((c) => c.direction === 'improved')
    .map((c) => `${SECTION_LABELS[c.area] ?? c.area} improved by ${c.delta} points`);

  // Regressions
  const regressions = changesDetected
    .filter((c) => c.direction === 'declined')
    .map((c) => `${SECTION_LABELS[c.area] ?? c.area} declined by ${Math.abs(c.delta)} points`);

  // Academic urgency
  const failingCourses = (academicContext.currentGrades ?? []).filter(
    (g) => g.status === 'failing'
  ).map((g) => g.course);

  // Updated focus areas (lowest 2 core scores)
  const sortedScores = Object.entries(coreScores).sort(([, a], [, b]) => a - b);
  const updatedFocusAreas = sortedScores.slice(0, 2).map(([key]) => SECTION_LABELS[key] ?? key);

  // Weekly consistency
  const avgWeeklyScore = weeklyResets.length > 0
    ? Math.round(weeklyResets.reduce((s, w) => s + (w.score ?? 0), 0) / weeklyResets.length)
    : null;

  // Support recommendations
  const supportRecommendations = [];
  if (flags.some((f) => f.type === 'emotional_instability')) {
    supportRecommendations.push('Counseling or therapy access — this month, not next semester');
  }
  if (flags.some((f) => f.type === 'academic_risk') || failingCourses.length > 0) {
    supportRecommendations.push('Academic advisor meeting — within 7 days');
  }
  if (flags.some((f) => f.type === 'low_independence')) {
    supportRecommendations.push('Life skills coaching — executive function support');
  }

  return {
    status,
    overallScore,
    changesDetected,
    improvements,
    regressions,
    riskFlags: flags.map((f) => ({ type: f.type, label: f.label, severity: f.severity })),
    updatedFocusAreas,
    supportRecommendations,
    weeklyConsistency: avgWeeklyScore,
    academicUrgency: failingCourses.length > 0
      ? { level: 'critical', courses: failingCourses }
      : null,
    generatedAt: new Date().toISOString(),
  };
}


// ============================================================
// PART 9 — DASHBOARD SECTION CONFIG
// ============================================================

/**
 * MEKHI_DASHBOARD_SECTIONS
 * Defines the 9 sections of Mekhi's results dashboard.
 * Maps to React components and data keys.
 */
export const MEKHI_DASHBOARD_SECTIONS = [
  {
    id: 'my_scores',
    label: 'My Scores',
    order: 1,
    component: 'MekhiScoreGrid',
    dataKey: 'coreScores',
    displayMode: 'score_grid',
    fields: [
      { key: 'emotionalWellBeing',    label: 'Emotional Well-Being' },
      { key: 'responsibility',        label: 'Responsibility' },
      { key: 'independenceReadiness', label: 'Independence Readiness' },
      { key: 'academicRecovery',      label: 'Academic Recovery' },
      { key: 'careerAlignment',       label: 'Career Alignment' },
      { key: 'blueprintClarity',      label: 'Blueprint Clarity' },
    ],
  },
  {
    id: 'strengths',
    label: 'Strengths',
    order: 2,
    component: 'StrengthsList',
    dataKey: 'strengths',
    displayMode: 'list',
    description: 'Genuine strengths pulled directly from assessment answers',
  },
  {
    id: 'patterns',
    label: 'Patterns Holding You Back',
    order: 3,
    component: 'PatternCards',
    dataKey: 'flags',
    displayMode: 'expandable_cards',
    fields: ['label', 'description', 'cost', 'intervention'],
    emptyState: 'No major patterns detected — check back after more data.',
  },
  {
    id: 'readiness_decision',
    label: 'Readiness Decision',
    order: 4,
    component: 'ReadinessDecisionCard',
    dataKey: 'collegePath',
    displayMode: 'decision_card',
    fields: ['label', 'description', 'confidence', 'planItems'],
  },
  {
    id: 'best_path',
    label: 'Best Path',
    order: 5,
    component: 'CollegePathCard',
    dataKey: 'collegePath',
    displayMode: 'path_card',
    fields: ['id', 'label', 'planItems'],
  },
  {
    id: 'career_matches',
    label: 'Career Matches',
    order: 6,
    component: 'CareerMatchCards',
    dataKey: 'careerMatches',
    displayMode: 'match_cards',
    description: 'Top career paths in sports analytics, media, and operations',
  },
  {
    id: 'life_blueprint',
    label: 'Life Blueprint',
    order: 7,
    component: 'LifeBlueprintDisplay',
    dataKey: 'identityProfile.lifeBlueprint',
    displayMode: 'blueprint',
    fields: ['futureIdentityStatement', 'lifestyleGoals', 'incomeTarget', 'timelineYear'],
  },
  {
    id: 'ai_coach',
    label: 'AI Coach Summary',
    order: 8,
    component: 'MekhiAICoachCard',
    dataKey: 'aiNarrative',
    displayMode: 'coach_card',
    fields: ['narrative', 'hardTruth', 'priorityFocus', 'progressTrend'],
  },
  {
    id: 'monthly_plan',
    label: 'Next 30-Day Plan',
    order: 9,
    component: 'MonthlyManGoalCard',
    dataKey: 'monthlyManGoal',
    displayMode: 'goal_card',
    fields: ['title', 'whyItMatters', 'successDefinition', 'weeklyActions'],
  },
];
