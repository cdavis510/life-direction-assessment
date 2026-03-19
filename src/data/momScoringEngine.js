/**
 * momScoringEngine.js
 * Mom Assessment — Full Post-Assessment Processing System
 *
 * Parts:
 *   1. Scoring Engine     — section → core score mapping + normalization
 *   2. Profile Types      — parenting style detection
 *   3. Son Insights       — son-specific guidance from score patterns
 *   4. Blind Spot Engine  — behavioral pattern detection
 *   5. 30-Day Action Plan — personalized week-by-week plan
 *   6. Monthly Check-In   — progress evaluation against prior results
 *   8. Dashboard Config   — UI section definitions
 *
 * Part 7 (AI Coach Narrative) lives in momAgent.js as buildMomResultsNarrative()
 */


// ============================================================
// PART 1 — SCORING ENGINE
// ============================================================

/**
 * Maps each core score to its contributing sections and blend weights.
 * Section IDs match the momSection[N].js module convention.
 */
export const SCORE_SECTION_MAP = {
  communicationScore: {
    label: 'Communication',
    description: 'How clearly and directly she communicates — including hard conversations',
    sections: [
      { id: 'section_3', weight: 0.60 }, // Communication Style
      { id: 'section_9', weight: 0.40 }, // Hard Conversations
    ],
  },
  emotionalSupportScore: {
    label: 'Emotional Support',
    description: 'Her capacity to be emotionally present without rescuing or withdrawing',
    sections: [
      { id: 'section_4', weight: 0.70 }, // Emotional Support Style
      { id: 'section_10', weight: 0.30 }, // Conflict Patterns
    ],
  },
  accountabilityScore: {
    label: 'Accountability',
    description: 'How she holds her sons to standards while keeping the relationship intact',
    sections: [
      { id: 'section_5', weight: 0.60 }, // Accountability Style
      { id: 'section_8', weight: 0.40 }, // Consistency
    ],
  },
  boundaryScore: {
    label: 'Boundaries',
    description: 'Her ability to hold limits that empower without punishing or abandoning',
    sections: [
      { id: 'section_6', weight: 0.60 }, // Boundaries
      { id: 'section_7', weight: 0.40 }, // Enabling vs. Empowering
    ],
  },
  consistencyScore: {
    label: 'Consistency',
    description: 'Whether her expectations, responses, and follow-through are predictable',
    sections: [
      { id: 'section_8', weight: 0.70 }, // Consistency
      { id: 'section_5', weight: 0.30 }, // Accountability Style
    ],
  },
  trustScore: {
    label: 'Relational Trust',
    description: 'Depth of connection, mutual trust, and felt safety with each son',
    sections: [
      { id: 'section_1', weight: 0.50 }, // Relationship with Mekhi
      { id: 'section_2', weight: 0.50 }, // Relationship with Melvin
    ],
  },
  awarenessScore: {
    label: 'Self & Son Awareness',
    description: 'How accurately she knows her sons and recognizes her own patterns',
    sections: [
      { id: 'section_1', weight: 0.20 }, // Relationship with Mekhi
      { id: 'section_2', weight: 0.20 }, // Relationship with Melvin
      { id: 'section_7', weight: 0.30 }, // Enabling vs. Empowering (self-pattern recognition)
      { id: 'section_12', weight: 0.30 }, // Growth & Monthly Action Planning
    ],
  },
};

/**
 * computeSectionScore
 *
 * Produces a normalized 0–100 score for a single section from raw answers.
 *
 * @param {Object[]} questions   — question objects from momSection[N].js
 * @param {Object}   answers     — { [questionId]: any }
 * @returns {{ normalizedScore: number, flaggedQuestions: string[], answeredCount: number }}
 */
export function computeSectionScore(questions, answers) {
  let totalWeight = 0;
  let weightedScore = 0;
  let answeredCount = 0;
  const flaggedQuestions = [];

  for (const q of questions) {
    const answer = answers[q.id];
    if (answer === undefined || answer === null || answer === '') continue;

    // Open text — cannot score numerically; flag high-weight questions for AI
    if (q.type === 'open') {
      if (q.weight >= 1.5) flaggedQuestions.push(q.id);
      continue;
    }

    let rawScore = null;

    switch (q.type) {
      case 'likert': {
        // answer: 1–5
        rawScore = ((answer - 1) / 4) * 100;
        break;
      }
      case 'slider': {
        const min = q.min ?? 1;
        const max = q.max ?? 10;
        rawScore = ((answer - min) / (max - min)) * 100;
        break;
      }
      case 'forced_choice': {
        // Convention: A = the "strong" response option, B = the "weak" response option
        // scoringDirection overrides where needed
        if (q.scoringDirection === 'strong') {
          rawScore = answer === 'A' ? 85 : 15;
        } else if (q.scoringDirection === 'weak') {
          rawScore = answer === 'B' ? 85 : 15;
        } else {
          // complex — slight lean toward A; AI interprets fully
          rawScore = answer === 'A' ? 60 : 40;
        }
        break;
      }
      case 'scenario': {
        // options array: map answer index to score — later options are typically more mature
        const optionCount = q.options?.length ?? 4;
        const idx = typeof answer === 'number' ? answer : parseInt(answer, 10) || 0;
        rawScore = (idx / (optionCount - 1)) * 100;
        break;
      }
      default:
        continue;
    }

    if (rawScore === null) continue;

    // Invert for 'weak' direction questions (lower answer = stronger score)
    // forced_choice handles its own inversion above
    if (q.scoringDirection === 'weak' && q.type !== 'forced_choice') {
      rawScore = 100 - rawScore;
    }

    rawScore = Math.min(100, Math.max(0, rawScore));

    totalWeight += q.weight;
    weightedScore += rawScore * q.weight;
    answeredCount++;

    // Flag critically low scores on high-weight questions
    if (rawScore < 25 && q.weight >= 1.5) {
      flaggedQuestions.push(q.id);
    }
  }

  return {
    normalizedScore: totalWeight > 0
      ? Math.min(100, Math.max(0, Math.round(weightedScore / totalWeight)))
      : 0,
    flaggedQuestions,
    answeredCount,
  };
}

/**
 * computeMomCoreScores
 *
 * Aggregates per-section normalized scores (0–100) into the 7 core scores.
 *
 * @param {Object} sectionScores — { section_1: 72, section_2: 68, ..., section_12: 80 }
 * @returns {{ communicationScore, emotionalSupportScore, accountabilityScore,
 *             boundaryScore, consistencyScore, trustScore, awarenessScore }}
 */
export function computeMomCoreScores(sectionScores) {
  const result = {};

  for (const [scoreKey, config] of Object.entries(SCORE_SECTION_MAP)) {
    let totalWeight = 0;
    let weightedSum = 0;

    for (const { id, weight } of config.sections) {
      const sectionScore = sectionScores[id];
      if (sectionScore === undefined) continue;
      totalWeight += weight;
      weightedSum += sectionScore * weight;
    }

    result[scoreKey] = totalWeight > 0
      ? Math.round(weightedSum / totalWeight)
      : 0;
  }

  return result;
}


// ============================================================
// PART 2 — MOM PROFILE TYPES
// ============================================================

/**
 * Profile definitions evaluated in order — first match wins.
 * Catch-all ("Growing Through It") is always last.
 */
export const MOM_PROFILE_DEFINITIONS = [
  {
    type: 'Balanced Leader',
    description:
      'You show up consistently across every dimension. You balance emotional presence with accountability, hold firm limits without harshness, and communicate in ways that build trust over time. This does not mean you are without flaws — it means your patterns are working. Your sons feel both deeply loved and personally responsible. That combination is rare.',
    strengths: [
      'Consistent standards without emotional punishment',
      'Emotionally present and practically grounded',
      'Communicates with clarity even under pressure',
      'Boundaries that empower rather than restrict',
      'Sons trust her AND respect her',
    ],
    risks: [
      'Risk of complacency — this work requires active maintenance',
      'High-functioning parents can still carry blind spots around emotional expression',
      'May underestimate how much her sons still need her explicit guidance',
    ],
    match: (s) =>
      s.communicationScore >= 70 &&
      s.emotionalSupportScore >= 70 &&
      s.accountabilityScore >= 70 &&
      s.boundaryScore >= 68 &&
      s.consistencyScore >= 68 &&
      s.trustScore >= 70 &&
      s.awarenessScore >= 68,
  },
  {
    type: 'Supportive but Overprotective',
    description:
      'You love deeply and your sons feel it. But your love sometimes crosses into shielding them from consequences they need to face. You step in too early, soften blows that were supposed to teach, and carry worry that expresses itself as control. Your emotional presence is your greatest strength. Your protection reflex is the work.',
    strengths: [
      'Sons feel unconditionally loved and emotionally safe',
      'Quick to notice distress — highly attuned',
      'High relational warmth and connection',
      'Sons will come to her when something is wrong',
    ],
    risks: [
      'Enabling failure avoidance instead of failure processing',
      'Inadvertently signaling they cannot handle hardship on their own',
      'Boundary erosion as exceptions accumulate over time',
      'Sons may become emotionally dependent or avoidant of difficulty',
    ],
    match: (s) =>
      s.emotionalSupportScore >= 72 &&
      s.boundaryScore < 55 &&
      s.accountabilityScore < 62,
  },
  {
    type: 'Strong but Inconsistent',
    description:
      'You know what you expect and you are not afraid to say it. But your standards shift based on your stress, your mood, or how much is on your plate. Your sons have learned to read you instead of learning the rules. When you are fully on, you are powerful. The gap between your best days and your hardest days is what they are navigating.',
    strengths: [
      'Clear vision for who her sons should become',
      'High accountability when operating at full capacity',
      'Sons respect the standard even when they test it',
      'Not afraid of hard conversations',
    ],
    risks: [
      'Sons learn to wait her out rather than comply',
      'Inconsistency breeds negotiation and boundary-testing',
      'Burnout creates accountability vacuums at the worst moments',
      'Trust erodes when follow-through becomes unpredictable',
    ],
    match: (s) =>
      s.accountabilityScore >= 68 &&
      s.consistencyScore < 55,
  },
  {
    type: 'Emotionally Present but Avoids Hard Conversations',
    description:
      'You are there. You feel everything. But when the moment comes to say the hard thing — about grades, choices, the future, money, what she actually sees — you soften it, delay it, or skip it. You protect the relationship over the truth. Your sons feel close to you. But they may not be getting the honest feedback they need to make real decisions.',
    strengths: [
      'Deep emotional connection — sons feel genuinely seen',
      'Sons will come to her with emotional struggles',
      'Empathetic, non-reactive baseline communication',
      'High relational trust and safety',
    ],
    risks: [
      'Sons receive love but not direction',
      'Delayed hard conversations eventually arrive as crises',
      'Critical feedback arrives too late or too softly to register',
      'May be perceived as not taking their choices seriously',
    ],
    match: (s) =>
      s.emotionalSupportScore >= 68 &&
      s.communicationScore < 55,
  },
  {
    type: 'Accountable but Too Harsh',
    description:
      'You hold a high standard and you enforce it. But the delivery can be sharp, the consequence can outpace the lesson, and the emotional temperature can make it hard for your sons to receive what you are actually trying to give them. They hear the expectation. They do not always feel the belief behind it.',
    strengths: [
      'Sons know exactly what is expected — no ambiguity',
      'Strong follow-through on stated consequences',
      'Does not accept excuses or rationalization',
      'Models discipline and work ethic by example',
    ],
    risks: [
      'Sons may comply out of fear rather than internal conviction',
      'Emotional shutdown or withdrawal as self-protection',
      'Accountability without warmth produces compliance, not character',
      'Long-term relationship strain from repeated harshness',
    ],
    match: (s) =>
      s.accountabilityScore >= 72 &&
      s.emotionalSupportScore < 55,
  },
  {
    type: 'Reactive Under Pressure',
    description:
      'When things are calm, you are capable and loving. When pressure hits — financial strain, school crises, behavioral issues — your responses shift. You may escalate when you meant to de-escalate, withdraw when connection is what is needed, or over-correct after going too easy. The stress response is doing the parenting. The real you gets blocked out.',
    strengths: [
      'Genuine love and desire to show up better',
      'Recognizes patterns when she is calm and has distance',
      'Capable of strong, grounded moments outside of high-pressure windows',
    ],
    risks: [
      'Inconsistency driven by external load rather than internal values',
      'Sons learn to manage her emotional state rather than their own behavior',
      'High-pressure moments — college apps, finances, crises — trigger worst patterns',
      'Risk of relationship rupture during the exact moments that matter most',
    ],
    match: (s) =>
      s.consistencyScore < 55 &&
      s.emotionalSupportScore < 60,
  },
  {
    type: 'Disengaged but Loving',
    description:
      'Your love is real but your presence is inconsistent. Whether from exhaustion, overwhelm, or emotional distance built up over time, your sons know you care — but they may not feel fully seen, known, or guided in the day-to-day. You are working with what you have. But the gap between loving them and being present with them is where the work lives.',
    strengths: [
      'Sons do not doubt they are loved',
      'Does not project personal stress onto sons as much as other profiles',
      'Sons have developed significant independence',
    ],
    risks: [
      'Sons filling the leadership vacuum themselves — not always well',
      'Emotional needs going unmet without her realizing it',
      'Key developmental moments missed due to inconsistent presence',
      'Sons stop bringing things to her — learn to carry it alone',
    ],
    match: (s) =>
      s.trustScore < 58 &&
      s.awarenessScore < 58,
  },
  {
    // Catch-all — always last
    type: 'Growing Through It',
    description:
      'You are in the process. Some areas are strong, others are a genuine work in progress, and you are more self-aware than your patterns might suggest. You are doing this without a complete roadmap, without a co-parent, and with less support than you deserve. The fact that you are here, working through this honestly, is itself data. The question is not whether you can be the mother they need — it is what you are willing to change first.',
    strengths: [
      'Self-awareness is present — that is the first and hardest ingredient',
      'Genuine desire to grow rather than defend',
      'Not defensive about the areas that need work',
    ],
    risks: [
      'Risk of insight without behavior change — knowing is not the same as doing',
      'Needs external accountability to convert awareness into action',
      'Pattern interruption requires consistency she is still building',
    ],
    match: () => true,
  },
];

/**
 * detectMomProfile
 *
 * @param {Object} coreScores — output of computeMomCoreScores
 * @returns {{ type, description, strengths, risks }}
 */
export function detectMomProfile(coreScores) {
  for (const profile of MOM_PROFILE_DEFINITIONS) {
    if (profile.match(coreScores)) {
      const { match, ...rest } = profile; // eslint-disable-line no-unused-vars
      return rest;
    }
  }
  const { match, ...fallback } = MOM_PROFILE_DEFINITIONS[MOM_PROFILE_DEFINITIONS.length - 1];
  return fallback;
}


// ============================================================
// PART 3 — SON-SPECIFIC INSIGHTS
// ============================================================

/**
 * generateSonInsights
 *
 * Derives son-specific guidance from core scores and section scores.
 * Mekhi insights draw from section_1; Melvin insights from section_2.
 *
 * @param {Object} coreScores    — output of computeMomCoreScores
 * @param {Object} sectionScores — { section_1: N, section_2: N, ... }
 * @returns {{ mekhi: SonInsights, melvin: SonInsights }}
 */
export function generateSonInsights(coreScores, sectionScores = {}) {
  const {
    communicationScore,
    emotionalSupportScore,
    accountabilityScore,
    boundaryScore,
    consistencyScore,
    trustScore,
    awarenessScore,
  } = coreScores;

  const mekhiSection = sectionScores.section_1 ?? null;
  const melvinSection = sectionScores.section_2 ?? null;


  // ── MEKHI ──────────────────────────────────────────────

  const mekhiNeeds = {
    whatHeNeedsMoreOf: [],
    whatToStopDoing: [],
    howToCommunicateBetter: [],
    riskAreas: [],
  };

  // What Mekhi needs more of
  if (communicationScore < 60) {
    mekhiNeeds.whatHeNeedsMoreOf.push(
      'Direct, honest conversations about what you actually see happening — not what you hope is happening'
    );
  }
  if (emotionalSupportScore < 60) {
    mekhiNeeds.whatHeNeedsMoreOf.push(
      'Consistent emotional check-ins that are not tied to his performance, behavior, or your current stress level'
    );
  } else {
    mekhiNeeds.whatHeNeedsMoreOf.push(
      'Space to process failure on his own without you absorbing or softening it for him'
    );
  }
  if (accountabilityScore < 62) {
    mekhiNeeds.whatHeNeedsMoreOf.push(
      'Clear, unmovable expectations around academics, responsibility, and follow-through at Clark Atlanta'
    );
  } else {
    mekhiNeeds.whatHeNeedsMoreOf.push(
      'Recognition when he meets the standard — not just correction when he misses it'
    );
  }
  if (trustScore < 62 || (mekhiSection !== null && mekhiSection < 60)) {
    mekhiNeeds.whatHeNeedsMoreOf.push(
      'Low-agenda one-on-one time — presence without purpose, no evaluation attached'
    );
  }
  if (awarenessScore < 60) {
    mekhiNeeds.whatHeNeedsMoreOf.push(
      'Her knowing the specific details of his current world: who he spends time with, what he fears, what is actually driving him right now'
    );
  }

  // What to stop doing with Mekhi
  if (boundaryScore < 55) {
    mekhiNeeds.whatToStopDoing.push(
      'Stepping in to solve or soften consequences that are specifically designed to teach him something'
    );
  }
  if (accountabilityScore >= 72 && emotionalSupportScore < 55) {
    mekhiNeeds.whatToStopDoing.push(
      'Leading corrections with disappointment as the primary signal — he receives the standard but not the belief behind it'
    );
  }
  if (consistencyScore < 55) {
    mekhiNeeds.whatToStopDoing.push(
      'Letting the rules change based on her capacity that day — he is tracking the inconsistency even when he does not say so'
    );
  }
  if (communicationScore < 55) {
    mekhiNeeds.whatToStopDoing.push(
      'Waiting until something is already a problem to have the hard conversation'
    );
  }
  if (emotionalSupportScore >= 70 && boundaryScore < 52) {
    mekhiNeeds.whatToStopDoing.push(
      'Making it emotionally easy for him to not deal with hard things — love is not the same as protection from difficulty'
    );
  }

  // How to communicate better with Mekhi
  if (communicationScore < 62) {
    mekhiNeeds.howToCommunicateBetter.push(
      'Lead with observation, not judgment: "I noticed X" before "you need to do Y"'
    );
  }
  mekhiNeeds.howToCommunicateBetter.push(
    'Ask questions you do not already know the answer to — genuine curiosity opens more than statements ever will'
  );
  if (accountabilityScore >= 65) {
    mekhiNeeds.howToCommunicateBetter.push(
      'Separate the standard from the relationship — he should know the expectation comes from belief, not evaluation'
    );
  }
  if (emotionalSupportScore < 62) {
    mekhiNeeds.howToCommunicateBetter.push(
      'Match his emotional temperature before redirecting — if he is frustrated, start there, not at the solution'
    );
  }
  mekhiNeeds.howToCommunicateBetter.push(
    'When he minimizes something serious, do not accept it the first time — "I hear you, and I want to understand more"'
  );

  // Risk areas for Mekhi
  if (boundaryScore < 52) {
    mekhiNeeds.riskAreas.push(
      'Not building self-advocacy or problem-solving capacity if she is absorbing his challenges at Clark Atlanta'
    );
  }
  if (consistencyScore < 52) {
    mekhiNeeds.riskAreas.push(
      'Inconsistent consequences are teaching him to negotiate standards rather than meet them'
    );
  }
  if (trustScore < 55) {
    mekhiNeeds.riskAreas.push(
      'Weak relational trust means he may not come to her when something serious actually happens — the silence will be the signal'
    );
  }
  if (awarenessScore < 55) {
    mekhiNeeds.riskAreas.push(
      'If she does not know his actual world, she cannot effectively intervene when he needs it most'
    );
  }


  // ── MELVIN ─────────────────────────────────────────────

  const melvinNeeds = {
    whatHeNeedsMoreOf: [],
    whatToStopDoing: [],
    howToCommunicateBetter: [],
    riskAreas: [],
  };

  // What Melvin needs more of
  if (communicationScore < 60) {
    melvinNeeds.whatHeNeedsMoreOf.push(
      'Honest, direct conversations about the actual stakes of this period — Morehouse, career path, what happens to the family financially'
    );
  }
  melvinNeeds.whatHeNeedsMoreOf.push(
    'Acknowledgment of the grief around basketball ending — it has not been fully processed, and it is affecting everything downstream'
  );
  if (accountabilityScore < 62) {
    melvinNeeds.whatHeNeedsMoreOf.push(
      'Clear, non-negotiable expectations around GPA, applications, and Morehouse preparation that do not bend under pressure'
    );
  }
  if (awarenessScore < 60 || (melvinSection !== null && melvinSection < 58)) {
    melvinNeeds.whatHeNeedsMoreOf.push(
      'Her genuinely knowing which career path he is leaning toward and why — not assuming she already has the answer'
    );
  }
  melvinNeeds.whatHeNeedsMoreOf.push(
    'Someone in his corner who believes the Finance + Morehouse path is real and worth building — not a fallback'
  );

  // What to stop doing with Melvin
  if (boundaryScore < 55) {
    melvinNeeds.whatToStopDoing.push(
      'Shielding him from the weight of decisions that are his to carry — he is 17 and almost an adult'
    );
  }
  if (emotionalSupportScore >= 70 && communicationScore < 55) {
    melvinNeeds.whatToStopDoing.push(
      'Reassuring him without challenging him — he needs both warmth and truth, not one without the other'
    );
  }
  if (consistencyScore < 55) {
    melvinNeeds.whatToStopDoing.push(
      'Letting Morehouse prep or GPA accountability slide when other family stressors are high — this window is short'
    );
  }
  melvinNeeds.whatToStopDoing.push(
    'Treating the basketball chapter as closed before he has actually processed the loss with her present'
  );

  // How to communicate better with Melvin
  melvinNeeds.howToCommunicateBetter.push(
    'Ask him specifically about Finance vs. Sports Business — not as pressure, but as genuine curiosity about who he is becoming'
  );
  if (communicationScore < 62) {
    melvinNeeds.howToCommunicateBetter.push(
      'Say the hard financial truth clearly: what you can support, what you cannot, and what he needs to build for himself'
    );
  }
  melvinNeeds.howToCommunicateBetter.push(
    'Reference his father intentionally — not as a warning, but as a real conversation. He is carrying that weight. Acknowledge it directly.'
  );
  if (accountabilityScore >= 65) {
    melvinNeeds.howToCommunicateBetter.push(
      'Tie standards to his vision, not your worry: "I need you to hit this GPA because Morehouse is real, not because I am scared"'
    );
  }
  melvinNeeds.howToCommunicateBetter.push(
    'When he goes quiet, do not fill the silence with advice — sit in it with him first'
  );

  // Risk areas for Melvin
  melvinNeeds.riskAreas.push(
    'Unprocessed grief around basketball can appear at Morehouse as low motivation, identity confusion, or social risk-taking'
  );
  if (boundaryScore < 52) {
    melvinNeeds.riskAreas.push(
      'If she has been absorbing his academic responsibilities, Morehouse independence will be a hard and sudden adjustment'
    );
  }
  if (awarenessScore < 55) {
    melvinNeeds.riskAreas.push(
      'She may not know which path he is actually interested in — and that conversation needs to happen before he leaves home'
    );
  }
  melvinNeeds.riskAreas.push(
    "His father's death and the family addiction history are live variables in his risk profile — she is the primary person who can speak to this directly and without shame"
  );

  return { mekhi: mekhiNeeds, melvin: melvinNeeds };
}


// ============================================================
// PART 4 — BLIND SPOT ENGINE
// ============================================================

export const BLIND_SPOT_DEFINITIONS = {
  enabling_behavior: {
    type: 'enabling_behavior',
    label: 'Enabling Behavior',
    description:
      'Repeatedly absorbing consequences that are meant to teach — paying for what he should earn, resolving conflicts he should navigate, softening outcomes that carry a lesson.',
    impact:
      'Her sons are not building the problem-solving and resilience muscles they will need for adult life. The protection feels like love. The cost is competence.',
    correction:
      'Identify one area per son where you are currently carrying something that belongs to him. Stop carrying it this week. Watch what he does with it.',
  },
  over_controlling: {
    type: 'over_controlling',
    label: 'Over-Controlling',
    description:
      'High accountability combined with low emotional warmth creates a dynamic where sons comply through fear or shut down through defiance. Control without connection produces compliance — not character.',
    impact:
      'Sons may execute in her presence and abandon the standard the moment they are out of her sight. Morehouse and Clark Atlanta will surface this immediately.',
    correction:
      'For every correction over the next 30 days, pair it with an explicit statement of belief in him. Standard + belief, always together — never one without the other.',
  },
  inconsistent_discipline: {
    type: 'inconsistent_discipline',
    label: 'Inconsistent Discipline',
    description:
      'Expectations and consequences that change based on her capacity, mood, or external pressure. Her sons are tracking this pattern even when she believes they are not.',
    impact:
      'He learns to negotiate rather than comply. He tests the rule to see if it is real this time. He loses trust in the predictability of the household over time.',
    correction:
      'Identify your three non-negotiables per son. Write them down. They do not change regardless of how your day went. Share them out loud.',
  },
  emotional_withdrawal: {
    type: 'emotional_withdrawal',
    label: 'Emotional Withdrawal',
    description:
      'Pulling back emotionally when things get hard — during conflict, after correction, or when under personal stress. Sons experience this as emotional punishment or abandonment even when it is neither.',
    impact:
      'Sons stop bringing things to her because emotional access feels conditional. Critical conversations get replaced by silence at exactly the wrong moments.',
    correction:
      'In the next 30 days: practice one explicit re-connect after every hard conversation — even a brief: "I love you. We are still good."',
  },
  avoiding_hard_conversations: {
    type: 'avoiding_hard_conversations',
    label: 'Avoiding Hard Conversations',
    description:
      'Delaying, softening, or omitting the direct truth about grades, behavior, choices, the family\'s real financial picture, and what she actually sees happening.',
    impact:
      'He makes decisions without complete information. He learns that hard truths are not discussable in this family. He finds them — and processes them — elsewhere.',
    correction:
      'Schedule one real conversation per son this week. Not a lecture — a conversation. Lead with a question. Stay until you get a real answer.',
  },
  stepping_in_too_late: {
    type: 'stepping_in_too_late',
    label: 'Stepping In Too Late',
    description:
      'Recognizing a problem — academic, behavioral, social — but waiting until it is already a crisis before acting. Driven by hope that it will resolve on its own.',
    impact:
      'By the time she engages, options are limited, emotions are high, and her presence feels reactive rather than guiding. Patterns are far easier to address than crises.',
    correction:
      'Name one area of concern right now — before it is a crisis — and have the conversation this week while there is still room to change the trajectory.',
  },
  stepping_in_too_early: {
    type: 'stepping_in_too_early',
    label: 'Stepping In Too Early',
    description:
      'Intervening before he has had the chance to struggle productively. Solving problems he is capable of solving, making calls he should make, managing relationships he should navigate.',
    impact:
      'He is not building agency. He is learning that difficult things get handled for him. Adulthood will require him to handle what she is currently holding.',
    correction:
      'Before the next intervention: "Is this actually my problem to solve, or does he need to solve it and know I believe he can?"',
  },
};

/**
 * detectBlindSpots
 *
 * @param {Object}   coreScores          — output of computeMomCoreScores
 * @param {string[]} redFlagsTriggered   — question IDs where red flags fired
 * @param {Object}   sectionScores       — { section_N: number }
 * @returns {Array<{ type, label, description, impact, correction }>}
 */
export function detectBlindSpots(coreScores, redFlagsTriggered = [], sectionScores = {}) {
  const {
    communicationScore,
    emotionalSupportScore,
    accountabilityScore,
    boundaryScore,
    consistencyScore,
    awarenessScore,
  } = coreScores;

  const detected = [];
  const add = (key) => detected.push(BLIND_SPOT_DEFINITIONS[key]);

  // Enabling behavior — low boundaries + low empowering score
  if (boundaryScore < 55 && (sectionScores.section_7 ?? 100) < 55) {
    add('enabling_behavior');
  }

  // Over-controlling — high accountability + low emotional support
  if (accountabilityScore >= 70 && emotionalSupportScore < 55) {
    add('over_controlling');
  }

  // Inconsistent discipline — low consistency score
  if (consistencyScore < 55) {
    add('inconsistent_discipline');
  }

  // Emotional withdrawal — low emotional support or high conflict-pattern signal
  if (emotionalSupportScore < 52 || (sectionScores.section_10 ?? 100) < 48) {
    add('emotional_withdrawal');
  }

  // Avoiding hard conversations — low communication + adequate emotional support
  if (communicationScore < 55 && emotionalSupportScore >= 62) {
    add('avoiding_hard_conversations');
  }

  // Stepping in too late — low awareness + low communication
  if (awarenessScore < 55 && communicationScore < 58) {
    add('stepping_in_too_late');
  }

  // Stepping in too early — high emotional support + low boundaries
  if (emotionalSupportScore >= 68 && boundaryScore < 52) {
    add('stepping_in_too_early');
  }

  // Deduplicate
  const seen = new Set();
  return detected.filter(({ type }) => {
    if (seen.has(type)) return false;
    seen.add(type);
    return true;
  });
}


// ============================================================
// PART 5 — 30-DAY ACTION PLAN
// ============================================================

const WEEKLY_ACTIONS = {
  communicationScore: [
    'Week 1 — Audit: Track every hard conversation you avoided this week. Write down what you would say if you were not afraid of the reaction.',
    'Week 2 — Initiate: Have one direct, scheduled conversation with each son. Not casual — on purpose.',
    'Week 3 — Language: Replace "you need to" with "I noticed" and "what happened with." Every single time.',
    'Week 4 — Sustain: Review your conversation log. What produced movement? What produced resistance? Adjust.',
  ],
  emotionalSupportScore: [
    'Week 1 — Reconnect: After every corrective interaction, add one statement of affirmation. Always. Non-negotiable.',
    'Week 2 — Agenda-free check-in: 10 minutes per son, per week. No solving. No correcting. Just listening.',
    'Week 3 — Name what they are carrying: Acknowledge one thing each son is dealing with emotionally — especially Melvin and basketball.',
    'Week 4 — Temperature check: Ask each son: "What has been the hardest thing this month?" Receive it without fixing it.',
  ],
  accountabilityScore: [
    'Week 1 — Establish: Write down three non-negotiable expectations per son. Share them explicitly this week.',
    'Week 2 — Follow through: For every expectation missed, there is a consequence. Not a conversation — a consequence.',
    'Week 3 — Consistency check: Review your follow-through from week 2. Where did you let something slide? Be honest.',
    'Week 4 — Connect to vision: For each expectation, attach the reason. "I need this because your future requires it."',
  ],
  boundaryScore: [
    'Week 1 — Identify: List every responsibility you are currently carrying for each son that belongs to him.',
    'Week 2 — Transfer one: Pick one item per son from that list. Stop doing it this week. Watch what happens.',
    'Week 3 — Hold the line: When he asks you to take it back, decline with warmth. "I know you can handle this."',
    'Week 4 — Review: What happened when you stepped back? What did he figure out? What still needs scaffolding vs. full handoff?',
  ],
  consistencyScore: [
    'Week 1 — Write the rules: Three rules per son, written down, stated out loud. No ambiguity.',
    'Week 2 — Track enforcement: Keep a daily log. Did you enforce the rule today? Yes or no. What happened?',
    'Week 3 — Address the exceptions: What caused you to bend the rule last week? Identify the pattern underneath it.',
    'Week 4 — Close the loops: For any unaddressed violation from this month, address it now — even briefly.',
  ],
  awarenessScore: [
    'Week 1 — Learn something new: Ask one question per son this week that you have never asked before.',
    'Week 2 — Enter their world: Ask about who they spend time with, what they are worried about, what feels heavy.',
    'Week 3 — Verify your assumptions: Pick three things you believe you know about each son. Ask them if you are right.',
    'Week 4 — Update your picture: Write down one thing you learned about Mekhi and one about Melvin that you did not know before this month.',
  ],
};

const DAILY_SHIFTS = {
  communicationScore: [
    'Before speaking, ask: "Am I saying this to help him or to relieve my own anxiety?"',
    'One honest observation per day — about what you see, not what you feel about what you see.',
  ],
  emotionalSupportScore: [
    'Physical presence: be in the same room without a purpose at least once per day.',
    'Name one thing you appreciate about each son today. Say it out loud.',
  ],
  accountabilityScore: [
    'Follow through on at least one stated expectation today — not tomorrow, today.',
    'Do not reschedule a consequence. If it is due today, it happens today.',
  ],
  boundaryScore: [
    'Before solving a problem for a son, ask: "Is this actually mine to solve?"',
    'Let one natural consequence land today without softening it.',
  ],
  consistencyScore: [
    'Start and end the day the same way regardless of how the middle went.',
    'Review your three non-negotiables before bed. Did they hold today?',
  ],
  awarenessScore: [
    'One genuine, curious question per son per day — no agenda.',
    'Listen for 30 seconds before redirecting to advice.',
  ],
};

const COMMUNICATION_CHANGES = {
  communicationScore: [
    'Replace "why did you do that" with "help me understand what happened"',
    'Replace "you always" and "you never" with "I noticed recently"',
    'Replace silence after conflict with "we are okay — I love you, and we can talk more when you are ready"',
  ],
  emotionalSupportScore: [
    'Add "and I love you" at the end of at least one hard conversation per week',
    'Start difficult topics with: "I\'m bringing this up because I believe in you, not because I\'m disappointed"',
  ],
  accountabilityScore: [
    'Tie every expectation to a purpose: "I need this from you because..."',
    'Replace disappointed silence with: "Here is what I need to see change and here is why"',
  ],
  boundaryScore: [
    'Replace "I will handle it" with "what is your plan for this?"',
    'Replace immediate solutions with "what have you already tried?"',
  ],
  consistencyScore: [
    'Replace "this one time" with "I said what I said — that is still the standard"',
    'When enforcing a rule you previously bent: "I should have held this before. I am holding it now."',
  ],
  awarenessScore: [
    'Replace statements about who they are with questions about who they are becoming',
    'Replace "I know you" with "tell me what is actually going on"',
  ],
};

const ACCOUNTABILITY_CHANGES = {
  communicationScore: [
    'Schedule one dedicated real-talk conversation per son each month — on the calendar, not reactive',
    'When a hard conversation goes well, note what worked so you can repeat it',
  ],
  emotionalSupportScore: [
    'Check in on emotional state before checking on performance — every single time',
    'Weekly ritual: 10 minutes per son, no phones, no agenda',
  ],
  accountabilityScore: [
    'Make expectations visible — written or shared — not just verbal',
    'Acknowledge explicitly when he meets the standard, not only when he misses it',
  ],
  boundaryScore: [
    'Before intervening in a son\'s problem, wait 24 hours to see if he handles it first',
    'When transferring a responsibility, tell him explicitly: "This one is yours now"',
  ],
  consistencyScore: [
    'Weekly review: did my rules hold this week? Where did I break them and why?',
    'Find one person to ask you once a week: "Did you follow through?"',
  ],
  awarenessScore: [
    'Monthly: write five current facts about each son\'s world — people, worries, goals, habits',
    'Quarterly: ask each son directly: "What do you wish I understood better about you right now?"',
  ],
};

/**
 * generate30DayPlan
 *
 * @param {Object} coreScores
 * @param {Object} momProfile   — output of detectMomProfile
 * @param {Object} sonInsights  — output of generateSonInsights
 * @returns {Object} mom30DayPlan
 */
export function generate30DayPlan(coreScores, momProfile, sonInsights) {
  const {
    communicationScore,
    emotionalSupportScore,
    accountabilityScore,
    boundaryScore,
    consistencyScore,
    awarenessScore,
  } = coreScores;

  const scoreMap = {
    communicationScore,
    emotionalSupportScore,
    accountabilityScore,
    boundaryScore,
    consistencyScore,
    awarenessScore,
  };

  const focusLabels = {
    communicationScore: 'Communication',
    emotionalSupportScore: 'Emotional Presence',
    accountabilityScore: 'Accountability',
    boundaryScore: 'Boundaries',
    consistencyScore: 'Consistency',
    awarenessScore: 'Awareness',
  };

  const sorted = Object.entries(scoreMap).sort(([, a], [, b]) => a - b);
  const [primaryKey] = sorted[0];
  const [secondaryKey] = sorted[1];

  return {
    mom30DayPlan: {
      focus: `${focusLabels[primaryKey]} + ${focusLabels[secondaryKey]}`,
      primaryFocusArea: focusLabels[primaryKey],
      secondaryFocusArea: focusLabels[secondaryKey],
      weeklyActions: WEEKLY_ACTIONS[primaryKey] ?? [],
      dailyShifts: DAILY_SHIFTS[primaryKey] ?? [],
      communicationChanges: COMMUNICATION_CHANGES[primaryKey] ?? [],
      accountabilityChanges: ACCOUNTABILITY_CHANGES[primaryKey] ?? [],
      mekhiSpecificActions: (sonInsights?.mekhi?.whatToStopDoing ?? []).slice(0, 2),
      melvinSpecificActions: (sonInsights?.melvin?.whatToStopDoing ?? []).slice(0, 2),
    },
  };
}


// ============================================================
// PART 6 — MONTHLY CHECK-IN EVALUATION
// ============================================================

/**
 * evaluateMonthlyCheckIn
 *
 * Compares check-in answers against prior results to surface growth or regression.
 * Check-in question IDs follow the convention: ci_communication, ci_relationship,
 * ci_boundary, ci_followthrough_1, ci_followthrough_2, ci_followthrough_3.
 * All scored on 1–5 Likert scale.
 *
 * @param {Object} previousResults  — { coreScores, actionPlan }
 * @param {Object} checkInAnswers   — { [questionId]: number (1–5) }
 * @returns {{ monthlyMomCheck: { status, improvements, missedAreas, nextFocus } }}
 */
export function evaluateMonthlyCheckIn(previousResults, checkInAnswers) {
  const prev = previousResults?.coreScores ?? {};
  const prevPlan = previousResults?.actionPlan?.mom30DayPlan ?? {};

  const improvements = [];
  const missedAreas = [];
  const nextFocus = [];

  const normalize = (likertAnswer) => ((likertAnswer - 1) / 4) * 100;
  const DELTA_THRESHOLD = 8; // Points of change needed to register as meaningful

  // Communication
  const commAnswer = checkInAnswers['ci_communication'];
  if (commAnswer !== undefined) {
    const current = normalize(commAnswer);
    const baseline = prev.communicationScore ?? 50;
    if (current >= baseline + DELTA_THRESHOLD) {
      improvements.push('Communication quality with her sons has measurably improved');
    } else if (current <= baseline - DELTA_THRESHOLD) {
      missedAreas.push('Communication regressed — direct conversation practice needs to restart');
      nextFocus.push('Return to Week 2 of the action plan: scheduled, intentional conversations');
    }
  }

  // Relationship / connection
  const relAnswer = checkInAnswers['ci_relationship'];
  if (relAnswer !== undefined) {
    const current = normalize(relAnswer);
    const baseline = prev.trustScore ?? 50;
    if (current >= baseline + DELTA_THRESHOLD) {
      improvements.push('Relational connection with at least one son has strengthened');
    } else if (current <= baseline - DELTA_THRESHOLD) {
      missedAreas.push('Relational trust declined — check for disconnection patterns');
      nextFocus.push('Prioritize low-agenda time with each son — presence without purpose');
    }
  }

  // Boundary / enabling
  const boundaryAnswer = checkInAnswers['ci_boundary'];
  if (boundaryAnswer !== undefined) {
    const current = normalize(boundaryAnswer);
    const baseline = prev.boundaryScore ?? 50;
    if (current >= baseline + DELTA_THRESHOLD) {
      improvements.push('Boundary-holding has improved — stepping back where appropriate');
    } else if (current <= baseline - DELTA_THRESHOLD) {
      missedAreas.push('Enabling pattern may have returned — boundary regression detected');
      nextFocus.push('Return to the Week 2 responsibility-transfer exercise from the action plan');
    }
  }

  // Consistency
  const consistencyAnswer = checkInAnswers['ci_consistency'];
  if (consistencyAnswer !== undefined) {
    const current = normalize(consistencyAnswer);
    const baseline = prev.consistencyScore ?? 50;
    if (current >= baseline + DELTA_THRESHOLD) {
      improvements.push('Rule enforcement has become more consistent');
    } else if (current <= baseline - DELTA_THRESHOLD) {
      missedAreas.push('Consistency dropped — rules may be bending under external pressure again');
      nextFocus.push('Re-establish the three non-negotiables per son — written and spoken aloud');
    }
  }

  // Action plan follow-through (self-reported, 1–5 per item)
  const ftKeys = ['ci_followthrough_1', 'ci_followthrough_2', 'ci_followthrough_3'];
  const ftAnswers = ftKeys.map((k) => checkInAnswers[k]).filter((a) => a !== undefined);
  const avgFT = ftAnswers.length > 0
    ? ftAnswers.reduce((sum, v) => sum + v, 0) / ftAnswers.length
    : null;

  let status = 'in_progress';
  if (avgFT !== null) {
    if (avgFT >= 4.0) {
      status = 'strong_progress';
      improvements.push('Consistent follow-through across action plan items this month');
    } else if (avgFT >= 3.0) {
      status = 'moderate_progress';
    } else {
      status = 'needs_attention';
      missedAreas.push('Action plan follow-through was inconsistent — identify where the breakdown happened');
      nextFocus.push('Pinpoint which specific week caused the breakdown and restart from there');
    }
  }

  // Default next focus if none triggered
  if (nextFocus.length === 0) {
    const secondaryFocus = prevPlan?.secondaryFocusArea;
    nextFocus.push(
      secondaryFocus
        ? `Shift primary focus to: ${secondaryFocus}`
        : 'Deepen work on communication — this is the long game'
    );
  }

  return {
    monthlyMomCheck: {
      status,
      improvements,
      missedAreas,
      nextFocus,
    },
  };
}


// ============================================================
// PART 8 — MOM DASHBOARD SECTIONS CONFIG
// ============================================================

/**
 * Defines the 9 UI sections of the Mom dashboard.
 * Each entry maps to a React component and its data source key.
 */
export const MOM_DASHBOARD_SECTIONS = [
  {
    id: 'my_scores',
    label: 'My Scores',
    order: 1,
    component: 'MomScoreGrid',
    dataKey: 'coreScores',
    description: 'Seven core scores normalized to 0–100',
    displayMode: 'score_grid',
    fields: [
      { key: 'communicationScore',    label: 'Communication' },
      { key: 'emotionalSupportScore', label: 'Emotional Support' },
      { key: 'accountabilityScore',   label: 'Accountability' },
      { key: 'boundaryScore',         label: 'Boundaries' },
      { key: 'consistencyScore',      label: 'Consistency' },
      { key: 'trustScore',            label: 'Relational Trust' },
      { key: 'awarenessScore',        label: 'Awareness' },
    ],
  },
  {
    id: 'parenting_profile',
    label: 'My Parenting Profile',
    order: 2,
    component: 'MomProfileCard',
    dataKey: 'momProfile',
    description: 'Detected parenting and support style archetype',
    displayMode: 'hero_card',
    fields: ['type', 'description', 'strengths', 'risks'],
  },
  {
    id: 'my_strengths',
    label: 'My Strengths',
    order: 3,
    component: 'StrengthsList',
    dataKey: 'momProfile.strengths',
    description: 'Strengths from profile type and highest-scoring sections',
    displayMode: 'list',
  },
  {
    id: 'blind_spots',
    label: 'My Blind Spots',
    order: 4,
    component: 'BlindSpotCards',
    dataKey: 'blindSpots',
    description: 'Behavioral patterns that may be limiting her sons',
    displayMode: 'expandable_cards',
    fields: ['label', 'description', 'impact', 'correction'],
    emptyState: 'No significant blind spots detected in this assessment.',
  },
  {
    id: 'mekhi_needs',
    label: 'Mekhi: What He Needs From Me',
    order: 5,
    component: 'SonNeedsPanel',
    dataKey: 'sonInsights.mekhi',
    description: 'Son-specific guidance derived from her patterns and his section score',
    displayMode: 'tabbed_list',
    tabs: ['whatHeNeedsMoreOf', 'whatToStopDoing', 'howToCommunicateBetter', 'riskAreas'],
    tabLabels: ['More Of', 'Stop Doing', 'How to Communicate', 'Risk Areas'],
    sonName: 'Mekhi',
  },
  {
    id: 'melvin_needs',
    label: 'Melvin: What He Needs From Me',
    order: 6,
    component: 'SonNeedsPanel',
    dataKey: 'sonInsights.melvin',
    description: 'Son-specific guidance derived from her patterns and his section score',
    displayMode: 'tabbed_list',
    tabs: ['whatHeNeedsMoreOf', 'whatToStopDoing', 'howToCommunicateBetter', 'riskAreas'],
    tabLabels: ['More Of', 'Stop Doing', 'How to Communicate', 'Risk Areas'],
    sonName: 'Melvin',
  },
  {
    id: 'action_plan',
    label: 'My 30-Day Plan',
    order: 7,
    component: 'MomActionPlan',
    dataKey: 'actionPlan.mom30DayPlan',
    description: 'Personalized 4-week plan targeting lowest-scoring areas',
    displayMode: 'week_tabs',
    fields: [
      'focus',
      'weeklyActions',
      'dailyShifts',
      'communicationChanges',
      'accountabilityChanges',
      'mekhiSpecificActions',
      'melvinSpecificActions',
    ],
  },
  {
    id: 'ai_coach',
    label: 'AI Coach Summary',
    order: 8,
    component: 'MomAICoachSummary',
    dataKey: 'aiNarrative',
    description: 'Full AI-generated narrative report + live chat interface',
    displayMode: 'report_with_chat',
    fields: ['reportContent', 'chatHistory'],
  },
  {
    id: 'monthly_progress',
    label: 'Monthly Progress',
    order: 9,
    component: 'MomProgressHistory',
    dataKey: 'progressHistory',
    description: 'Timeline of scores and check-in results over time',
    displayMode: 'chart_with_history',
    fields: ['checkIns', 'scoreHistory', 'trendData'],
    emptyState: 'Complete your first monthly check-in to begin tracking progress.',
  },
];
