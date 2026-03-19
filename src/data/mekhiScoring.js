// ─── Mekhi Assessment Scoring Config ────────────────────────────────────────
// Auto-generated from mekhi_final_advanced_assessment_system.xlsx

export const MEKHI_DIMENSIONS = {
  SELF_AWARENESS: {
    label: 'Self-Awareness',
    description: 'Accurate understanding of current patterns and blind spots',
    bands: ['Very low', 'Low', 'Mixed', 'Good', 'Strong'],
    useInOutput: 'Use for reality check and blind-spot section',
  },
  OWNERSHIP: {
    label: 'Ownership',
    description: 'Responsibility, repair mindset, response to correction',
    bands: ['Externalizing', 'Weak ownership', 'Mixed ownership', 'Responsible', 'Strong owner'],
    useInOutput: 'Use for accountability tone and comeback realism',
  },
  CONSISTENCY: {
    label: 'Consistency',
    description: 'Routine, completion, discipline over time',
    bands: ['Chaotic', 'Fragile', 'Inconsistent', 'Improving', 'Strong'],
    useInOutput: 'Use for plan difficulty and trust-building',
  },
  FOCUS_EXECUTION: {
    label: 'Focus & Execution',
    description: 'Time use, distraction management, task initiation and completion',
    bands: ['Severely scattered', 'Weak execution', 'Mixed', 'Functional', 'Strong'],
    useInOutput: 'Use for daily plan recommendations',
  },
  ACADEMIC_RECOVERY: {
    label: 'Academic Recovery',
    description: 'Recovery behavior, class rescue habits, using support',
    bands: ['Crisis pattern', 'Poor recovery', 'Possible with support', 'Recoverable', 'Strong recovery stance'],
    useInOutput: 'Use for school comeback guidance',
  },
  EMOTIONAL_REGULATION: {
    label: 'Emotional Regulation',
    description: 'Acting under pressure without shutdown or avoidance',
    bands: ['Shutdown risk', 'Dysregulated', 'Mixed', 'Stable enough', 'Strong'],
    useInOutput: 'Use for stress / support recommendations',
  },
  HELP_SEEKING: {
    label: 'Help-Seeking',
    description: 'Asking for help, communication, support use',
    bands: ['Hides / disappears', 'Weak communication', 'Mixed', 'Uses support', 'Strong'],
    useInOutput: 'Use for coaching and teacher communication plan',
  },
  RESILIENCE: {
    label: 'Resilience',
    description: 'Ability to recover after setbacks and keep going',
    bands: ['Quits easily', 'Fragile rebound', 'Mixed', 'Rebounds', 'Strong'],
    useInOutput: 'Use for comeback potential',
  },
  CHANGE_READINESS: {
    label: 'Change Readiness',
    description: 'Willingness to change behavior, tolerate discomfort, accept structure',
    bands: ['Resistant', 'Low readiness', 'Undecided', 'Ready', 'Highly ready'],
    useInOutput: 'Use for next-step path and urgency',
  },
  FUTURE_DRIVE: {
    label: 'Future Drive',
    description: 'Vision, reasons for effort, future pull',
    bands: ['Drifting', 'Weak direction', 'Mixed', 'Directional', 'Strong'],
    useInOutput: 'Use for motivation and path-building',
  },
  INTEGRITY: {
    label: 'Integrity',
    description: 'Truthfulness, image management, answer reliability',
    bands: ['Unreliable self-report', 'Image-managed', 'Mixed', 'Mostly reliable', 'High integrity'],
    useInOutput: 'Use to decide confidence level of narrative',
  },
};

// Band thresholds: score 0-100 → index 0-4
export function getBandIndex(score) {
  if (score < 25) return 0;
  if (score < 45) return 1;
  if (score < 60) return 2;
  if (score < 80) return 3;
  return 4;
}

// Normalize a set of answered questions to 0-100
// questions: array of { points, weight, maxPoints }
export function normalizeDimension(questions) {
  const maxPoints = 4; // max points per question
  let weightedSum = 0;
  let weightedMax = 0;
  for (const q of questions) {
    weightedSum += (q.points ?? 0) * (q.weight ?? 1);
    weightedMax += maxPoints * (q.weight ?? 1);
  }
  if (weightedMax === 0) return 0;
  return Math.round((weightedSum / weightedMax) * 100);
}

// Calculate all dimension scores from answers map { questionId: selectedOptionIndex }
export function calculateDimensionScores(questions, answers) {
  const byDimension = {};

  for (const q of questions) {
    const dim = q.primaryDimension;
    if (!dim) continue;
    if (!byDimension[dim]) byDimension[dim] = [];

    const answerIndex = answers[q.id];
    let points = 0;
    if (answerIndex !== undefined && answerIndex !== null && q.options?.[answerIndex]) {
      points = q.options[answerIndex].points ?? 0;
    }
    byDimension[dim].push({ points, weight: q.weight ?? 1 });
  }

  const scores = {};
  for (const [dim, qs] of Object.entries(byDimension)) {
    scores[dim] = normalizeDimension(qs);
  }
  return scores;
}

// Readiness Index (composite)
export function calcReadinessIndex(scores) {
  const s = scores;
  return Math.round(
    0.18 * (s.OWNERSHIP ?? 0) +
    0.16 * (s.CONSISTENCY ?? 0) +
    0.14 * (s.FOCUS_EXECUTION ?? 0) +
    0.16 * (s.ACADEMIC_RECOVERY ?? 0) +
    0.12 * (s.EMOTIONAL_REGULATION ?? 0) +
    0.12 * (s.RESILIENCE ?? 0) +
    0.12 * (s.CHANGE_READINESS ?? 0)
  );
}

// Contradiction flags
export const MEKHI_CONTRADICTION_CHECKS = [
  {
    id: 'aspiration_execution_gap',
    name: 'Aspiration–Execution Gap',
    check: (s) => s.FUTURE_DRIVE >= 70 && (s.CONSISTENCY <= 45 || s.FOCUS_EXECUTION <= 45),
    meaning: 'He wants a better future more than he is currently living toward it.',
    aiLanguage: 'He sounds future-aware, but his current structure and follow-through are not yet supporting the future he describes.',
  },
  {
    id: 'insight_action_gap',
    name: 'Insight–Action Gap',
    check: (s) => s.SELF_AWARENESS >= 65 && (s.OWNERSHIP <= 50 || s.CONSISTENCY <= 50),
    meaning: 'He can name the issue but is not consistently acting on it.',
    aiLanguage: 'He is not fully blind to the problem; the bigger issue is turning insight into action.',
  },
  {
    id: 'image_integrity_risk',
    name: 'Image–Integrity Risk',
    check: (s) => s.INTEGRITY <= 50,
    meaning: 'Answers may be more flattering than fully accurate.',
    aiLanguage: 'There are signs of image management, so conclusions should be stated with cautious confidence.',
  },
  {
    id: 'overwhelm_avoidance_loop',
    name: 'Overwhelm–Avoidance Loop',
    check: (s) => s.EMOTIONAL_REGULATION <= 45 && s.HELP_SEEKING <= 45 && s.ACADEMIC_RECOVERY <= 50,
    meaning: 'Stress may be turning into silence, avoidance, or shutdown.',
    aiLanguage: 'The pattern is not just stress; it appears stress often leads to reduced communication and weaker recovery behavior.',
  },
  {
    id: 'ownership_deficit',
    name: 'Ownership Deficit',
    check: (s) => s.OWNERSHIP <= 45,
    meaning: 'He may understand some problems but still externalize too much.',
    aiLanguage: 'He appears to explain problems more easily than he owns them.',
  },
  {
    id: 'support_resistance',
    name: 'Support Resistance',
    check: (s) => s.HELP_SEEKING <= 45 && s.CHANGE_READINESS <= 55,
    meaning: 'He may want improvement while resisting the structure needed to improve.',
    aiLanguage: 'He may benefit from support, but part of the work is accepting support before crisis level.',
  },
  {
    id: 'recoverable_if_serious',
    name: 'Recoverable If Serious',
    check: (s) => s.ACADEMIC_RECOVERY >= 45 && s.ACADEMIC_RECOVERY <= 69 && s.CHANGE_READINESS >= 60 && s.HELP_SEEKING >= 55,
    meaning: 'There is a realistic path forward if behavior changes fast and consistently.',
    aiLanguage: 'The picture is not hopeless; it suggests recovery is possible if he moves quickly and accepts structure.',
  },
  {
    id: 'quit_risk_pattern',
    name: 'Quit-Risk Pattern',
    check: (s) => s.RESILIENCE <= 45 && s.CHANGE_READINESS <= 50,
    meaning: 'He may stop early when effort gets uncomfortable or exposes weakness.',
    aiLanguage: 'The biggest risk is not ability alone; it is withdrawing when the work stops feeling easy.',
  },
  {
    id: 'high_potential_low_stability',
    name: 'High Potential, Low Stability',
    check: (s) => (s.FUTURE_DRIVE >= 65 || s.SELF_AWARENESS >= 65) && s.CONSISTENCY <= 45,
    meaning: 'He may have real insight or ambition without enough structure to carry it.',
    aiLanguage: 'Potential is visible, but reliability is not yet strong enough to cash it in.',
  },
  {
    id: 'hopeful_not_ready',
    name: 'Hopeful but Not Ready',
    check: (s) => s.FUTURE_DRIVE >= 60 && s.CHANGE_READINESS < 50,
    meaning: 'Dream is ahead of the current commitment level.',
    aiLanguage: 'The dream is ahead of the discipline.',
  },
];

export function getTriggeredFlags(scores) {
  return MEKHI_CONTRADICTION_CHECKS.filter(c => c.check(scores));
}

export function getConfidenceLevel(scores) {
  if (scores.INTEGRITY >= 60) return 'high';
  if (scores.INTEGRITY >= 40) return 'medium';
  return 'low';
}

// AI system prompt (from Excel AI_Output_Instructions sheet)
export const MEKHI_AI_SYSTEM_PROMPT = `You are a direct, emotionally intelligent assessment interpreter for Mekhi's Life Direction Assessment.

YOUR JOB
Use the scores, contradiction flags, and text answers to produce a truthful, calm, specific output.
Do not flatter. Do not attack. Do not diagnose.
Describe patterns, risks, strengths, readiness, supports needed, and next-step recommendations.

NON-NEGOTIABLE RULES
1. Do not describe him as hopeless.
2. Do not diagnose depression, anxiety, ADHD, or any disorder.
3. Do not reduce everything to "motivation."
4. Distinguish clearly between: lack of skill, lack of structure, overwhelm, avoidance, weak ownership, inconsistency.
5. If integrity is low, say the result has lower confidence because some answers suggest image management or contradiction.
6. If future drive is high but consistency is low, name the aspiration–execution gap clearly.
7. If academic recovery is low but help-seeking and change readiness are decent, say recovery may still be possible with urgent structure and communication.
8. Use plain language, not therapy jargon.
9. Mention real patterns shown by the scores and text answers, not generic encouragement.
10. End with realistic hope plus a specific next move.

OUTPUT FORMAT
1. Direct Summary — 1 short paragraph, blunt but fair
2. Biggest Strengths — 3 bullet points
3. Biggest Blockers — 3 to 5 bullet points, name patterns not labels
4. Contradictions / Reality Checks — where words, goals, and habits are not lining up
5. Academic Recovery Readiness — choose: ready / possibly recoverable / not showing enough consistency
6. Best Next-Step Path — structured comeback / stabilization / skills rebuild / alternative exploration
7. 7-Day Action Plan — 5 concrete behavior-based actions
8. 30-Day Growth Focus — 3 priorities tied to lowest dimensions
9. Parent / Coach Notes — what kind of support helps vs hurts
10. Closing Line — firm, realistic, hopeful`;
