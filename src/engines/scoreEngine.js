// ─── SCORE ENGINE v2 ──────────────────────────────────────────────────────────
// Works with the mk_*/mv_* user-specific question bank.
// Questions use type:'likert' with options [{label, points: 0–4}].
// Core scores are derived from q.primaryDimension metadata.
// ─────────────────────────────────────────────────────────────────────────────

const USER_NAMES = { mekhi: 'Mekhi', melvin: 'Melvin' };

// ── Section weights by user section ID ───────────────────────────────────────
export const SECTION_WEIGHTS = {
  mekhi_section1:  0.11, // Self-Awareness & Current Reality
  mekhi_section2:  0.12, // Ownership & Accountability
  mekhi_section3:  0.11, // Habits & Consistency
  mekhi_section4:  0.11, // Time, Focus & Follow-Through
  mekhi_section6:  0.09, // Emotional Regulation & Stress
  mekhi_section7:  0.09, // Support, Communication & Boundaries
  mekhi_section8:  0.10, // Resilience & Change Readiness
  mekhi_section9:  0.12, // Future Vision, Purpose & Motivation
  mekhi_section10: 0.11, // Integrity, Honesty & Contradiction Checks
  mekhi_section11: 0.04, // Truth Detection & Integrity Layer

  melvin_section1:  0.11,
  melvin_section2:  0.12,
  melvin_section3:  0.11,
  melvin_section4:  0.11,
  melvin_section6:  0.09,
  melvin_section7:  0.09,
  melvin_section8:  0.10,
  melvin_section9:  0.12,
  melvin_section10: 0.11,
  melvin_section11: 0.04,
};

// ── Legacy overrides for old shared-section question IDs (kept for safety) ────
const MC_SCORE_OVERRIDES = {
  s1_06: [4, 2, 3, 1],
  s1_17: [4, 3, 2, 1],
  s1_23: [4, 3, 4, 1],
  s1_26: [4, 2, 1, 3],
  s1_28: [4, 2, 1, 3],
  s1_32: [4, 3, 2, 1],
  s4_01: [4, 3, 2, 1],
  s4_05: [4, 3, 2, 1],
  s6_10: [4, 3, 2, 1],
};
const REVERSE_SCORED = new Set(['s1_28', 's4_12']);

// ── Map question primaryDimension → one of the 6 core score keys ──────────────
const DIMENSION_TO_CORE = {
  SELF_AWARENESS:       'confidence',      // self-awareness drives self-belief
  OWNERSHIP:            'responsibility',
  CONSISTENCY:          'commitment',
  FOCUS_EXECUTION:      'responsibility',  // execution = taking responsibility for follow-through
  ACADEMIC_RECOVERY:    'responsibility',
  EMOTIONAL_REGULATION: 'confidence',      // emotional regulation = component of self-belief
  HELP_SEEKING:         'independence',    // mature help-seeking = functional independence
  RESILIENCE:           'commitment',
  FUTURE_DRIVE:         'goalAlignment',
  INTEGRITY:            'commitment',
  CHANGE_READINESS:     'commitment',
};

// ── Extract 0–4 points from a question + stored answer ────────────────────────
function getPoints(q, answer) {
  if (answer === null || answer === undefined) return null;

  if (q.type === 'likert') {
    // Stored as full option object {label, points}
    if (typeof answer === 'object' && answer !== null && typeof answer.points === 'number') {
      return answer.points;
    }
    // Stored as integer index
    const idx = typeof answer === 'number' ? answer : parseInt(answer, 10);
    if (!isNaN(idx) && Array.isArray(q.options) && q.options[idx] !== undefined) {
      const opt = q.options[idx];
      return typeof opt === 'object' ? opt.points : null;
    }
    return null;
  }

  if (q.type === 'slider') {
    return typeof answer === 'number' ? Math.round((answer / 10) * 4) : null;
  }

  if (q.type === 'multiple') {
    const idx = typeof answer === 'number' ? answer : parseInt(answer, 10);
    if (isNaN(idx)) return null;
    const map = MC_SCORE_OVERRIDES[q.id] || [4, 3, 2, 1];
    const score = map[idx] ?? null;
    if (score === null) return null;
    return REVERSE_SCORED.has(q.id) ? 4 - score : score;
  }

  return null; // text / open / multi_select — no numeric score
}

// ── Section score (0–100, weighted by q.weight) ───────────────────────────────
export function calculateSectionScore(sectionQuestions, answers) {
  let weightedSum = 0;
  let totalWeight = 0;

  for (const q of sectionQuestions) {
    const points = getPoints(q, answers[q.id]);
    if (points === null) continue;
    const w = q.weight || 1;
    weightedSum += (points / 4) * 100 * w;
    totalWeight += w;
  }

  return totalWeight === 0 ? null : Math.round(weightedSum / totalWeight);
}

// ── Overall weighted score (0–100) ────────────────────────────────────────────
export function calculateOverallScore(sectionScores) {
  let weightedSum = 0;
  let totalWeight = 0;

  for (const [sectionId, score] of Object.entries(sectionScores)) {
    if (score === null) continue;
    const w = SECTION_WEIGHTS[sectionId] ?? 0.1; // equal fallback if unknown section
    weightedSum += score * w;
    totalWeight += w;
  }

  return totalWeight === 0 ? 0 : Math.round(weightedSum / totalWeight);
}

// ── 6 core score dimensions (each 0–10) ───────────────────────────────────────
// Uses q.primaryDimension + DIMENSION_TO_CORE to route answers dynamically.
export function buildCoreScores(answers, allSections) {
  const questionMap = {};
  for (const section of allSections) {
    for (const q of section.questions) {
      questionMap[q.id] = q;
    }
  }

  const accumulators = {
    goalAlignment:  [],
    responsibility: [],
    independence:   [],
    confidence:     [],
    commitment:     [],
  };

  for (const [qId, answer] of Object.entries(answers)) {
    const q = questionMap[qId];
    if (!q || !q.primaryDimension) continue;

    const dim = DIMENSION_TO_CORE[q.primaryDimension];
    if (!dim || !accumulators[dim]) continue;

    const points = getPoints(q, answer);
    if (points === null) continue;

    accumulators[dim].push({ score: (points / 4) * 10, weight: q.weight || 1 });
  }

  const cores = {};
  for (const [dim, items] of Object.entries(accumulators)) {
    if (items.length === 0) { cores[dim] = null; continue; }
    const totalW = items.reduce((s, i) => s + i.weight, 0);
    const sum    = items.reduce((s, i) => s + i.score * i.weight, 0);
    cores[dim] = Math.round((sum / totalW) * 10) / 10;
  }

  // avoidanceRisk: inverse of (commitment + responsibility + independence) average.
  // High avoidanceRisk = danger signal.
  const bases = [cores.commitment, cores.responsibility, cores.independence].filter(v => v !== null);
  cores.avoidanceRisk = bases.length > 0
    ? Math.round((10 - bases.reduce((a, b) => a + b, 0) / bases.length) * 10) / 10
    : null;

  return cores;
}

// ── Goal alignment % ──────────────────────────────────────────────────────────
export function calculateGoalAlignment(cores) {
  const vals = [cores.goalAlignment, cores.commitment, cores.responsibility].filter(v => v !== null);
  if (vals.length === 0) return null;
  return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length / 10) * 100);
}

// ── Behavior flags ────────────────────────────────────────────────────────────
// All thresholds on 0–10 scale. Messages are parameterized by user name.
const FLAG_RULES = [
  {
    id: 'silent_suffering',
    label: 'Silent Suffering Pattern',
    severity: 'high',
    check: (cores) => cores.independence !== null && cores.independence <= 3.5,
    message: (name) => `${name} shows patterns of not reaching out for help or support when it is needed most.`,
  },
  {
    id: 'low_ownership',
    label: 'Low Ownership Pattern',
    severity: 'high',
    check: (cores) => cores.responsibility !== null && cores.responsibility <= 3.5,
    message: (name) => `${name} tends to externalize responsibility — a pattern that blocks real forward progress.`,
  },
  {
    id: 'avoidance_escalation',
    label: 'Avoidance Escalation',
    severity: 'high',
    check: (cores) => cores.avoidanceRisk !== null && cores.avoidanceRisk >= 7,
    message: (name) => `High avoidance risk — ${name} tends to withdraw from problems rather than face them directly.`,
  },
  {
    id: 'low_confidence',
    label: 'Low Self-Belief',
    severity: 'medium',
    check: (cores) => cores.confidence !== null && cores.confidence <= 4,
    message: (name) => `${name}'s self-belief and emotional regulation scores are low — a ceiling on what they will attempt.`,
  },
  {
    id: 'goal_effort_gap',
    label: 'High Goals / Low Effort Gap',
    severity: 'medium',
    check: (cores) => {
      const goal   = cores.goalAlignment  ?? 5;
      const effort = cores.responsibility ?? 5;
      return goal > 6.5 && effort < 4.5;
    },
    message: (name) => `${name} expresses high ambition but current effort and ownership patterns don't match the stated goals.`,
  },
  {
    id: 'low_independence',
    label: 'Independence Gap',
    severity: 'medium',
    check: (cores) => cores.independence !== null && cores.independence <= 4.5,
    message: (name) => `Low independence scores suggest ${name} will struggle in unstructured environments without active support systems in place.`,
  },
  {
    id: 'weak_resilience',
    label: 'Low Resilience / Follow-Through',
    severity: 'medium',
    check: (cores) => cores.commitment !== null && cores.commitment <= 3.5,
    message: (name) => `${name}'s resilience and commitment scores are low — difficulty recovering from setbacks and sustaining effort.`,
  },
];

export function buildFlags(answers, cores, name = 'They') {
  const triggered = [];
  for (const rule of FLAG_RULES) {
    try {
      if (rule.check(cores)) {
        triggered.push({
          id:       rule.id,
          label:    rule.label,
          severity: rule.severity,
          message:  rule.message(name),
        });
      }
    } catch { /* skip rules that error on missing data */ }
  }
  return triggered.sort((a, b) => ({ high: 0, medium: 1, low: 2 }[a.severity] - { high: 0, medium: 1, low: 2 }[b.severity]));
}

// ── Contradiction detection (core-score based) ────────────────────────────────
const CONTRADICTION_PAIRS = [
  {
    id: 'C1',
    label: 'Motivation vs. Follow-Through',
    check: (c) => c.goalAlignment >= 7 && c.commitment <= 4,
    message: 'Reports strong motivation and future vision but consistency scores tell a different story.',
  },
  {
    id: 'C2',
    label: 'Ambition vs. Ownership',
    check: (c) => c.goalAlignment >= 7 && c.responsibility <= 4,
    message: 'High career ambition but low ownership scores — dreams are outpacing current actions.',
  },
  {
    id: 'C3',
    label: 'Confidence vs. Consistency',
    check: (c) => c.confidence >= 6 && c.commitment <= 4,
    message: 'Presents as capable and confident but behavioral consistency scores are low.',
  },
  {
    id: 'C4',
    label: 'Self-Image vs. Help-Seeking',
    check: (c) => c.confidence >= 6.5 && c.independence <= 3.5,
    message: 'Claims independence and confidence but support-seeking and connection scores are low.',
  },
  {
    id: 'C5',
    label: 'Future Vision vs. Current Effort',
    check: (c) => c.goalAlignment >= 7 && c.responsibility <= 3,
    message: 'Strong future vision described but current behavioral effort does not support reaching it.',
  },
];

export function detectContradictions(answers, cores) {
  const triggered = [];
  // Only run checks when cores have real values
  const c = {
    goalAlignment:  cores.goalAlignment  ?? -1,
    responsibility: cores.responsibility ?? -1,
    independence:   cores.independence   ?? -1,
    confidence:     cores.confidence     ?? -1,
    commitment:     cores.commitment     ?? -1,
    avoidanceRisk:  cores.avoidanceRisk  ?? -1,
  };
  for (const pair of CONTRADICTION_PAIRS) {
    try {
      if (pair.check(c)) triggered.push({ id: pair.id, label: pair.label, message: pair.message });
    } catch { /* skip */ }
  }
  return triggered;
}

// ── College path recommendation ───────────────────────────────────────────────
export function getCollegePathRecommendation(cores, flags, answers) {
  const independence  = cores.independence  ?? 5;
  const responsibility = cores.responsibility ?? 5;
  const commitment    = cores.commitment    ?? 5;

  const hasHighAvoidance = flags.some(f => f.id === 'avoidance_escalation');
  const hasLowOwnership  = flags.some(f => f.id === 'low_ownership');

  if (independence <= 3 && responsibility <= 3 && hasHighAvoidance) {
    return {
      path: 'D',
      label: 'Structured Gap Year / Vocational Path',
      reasoning: 'Current scores indicate that returning to a 4-year university environment without foundational skill-building would likely repeat the same collapse. A structured gap year or vocational program builds the executive function, financial literacy, and daily discipline that are currently missing.',
      nextSteps: [
        'Research Job Corps programs in Oakland/Bay Area',
        'Explore structured gap year options (AmeriCorps, Year Up)',
        'Target Community College for 1 semester with support established',
        'Build daily routine and financial management habits before re-enrolling',
      ],
    };
  }

  if (independence <= 4.5 && responsibility <= 4.5 && (hasHighAvoidance || hasLowOwnership)) {
    return {
      path: 'C',
      label: 'Community College Transfer Track',
      recommendation: 'Laney College or Merritt College (Oakland) → transfer to CSU East Bay, SF State, or Clark Atlanta',
      reasoning: 'The California community college system offers a lower-pressure re-entry with proximity to home support and a clear transfer pathway to a 4-year university.',
      nextSteps: [
        'Apply to Laney College or Merritt College for Fall 2026',
        'Establish DSP (Disabled Students Program) on Day 1',
        'Take 12 units max first semester',
        'Build Canvas and LMS skills in first 2 weeks',
        'Attend every class for the first 4 weeks to build the habit',
      ],
    };
  }

  if (commitment >= 5.5 && (independence <= 5 || responsibility <= 5) && !hasHighAvoidance) {
    return {
      path: 'B',
      label: 'Gap Semester — Build and Return',
      reasoning: 'Commitment is present but foundational skills need shoring up. A focused gap semester builds the executive function and discipline needed for a successful return.',
      nextSteps: [
        'Contact Clark Atlanta Disability Services for readmission requirements',
        'Work part-time to rebuild routine and daily structure',
        'Begin credit counseling / financial literacy course',
        'Set return target: Spring 2027 semester',
      ],
    };
  }

  return {
    path: 'A',
    label: 'Return — Structured Support Plan',
    reasoning: 'Scores suggest return is viable with the right support infrastructure. The first semester shows baseline capability — issues are structural, not ability-based.',
    supportPlan: [
      'Register with Disability Services — extended test time, note-taking support',
      'Weekly academic advisor check-in (scheduled, not optional)',
      'Canvas/iClicker orientation before first day of class',
      'Mom accountability: shared student portal access (agreed, not secretive)',
      'Financial aid structure: direct-to-expense disbursement where possible',
      'Identify 1 peer or RA as accountability partner on campus',
    ],
    nextSteps: [
      'Contact Clark Atlanta about readmission within 7 days',
      'Request Disability Services appointment before semester starts',
      'Identify campus mental health resources and schedule intake',
    ],
  };
}

// ── Career match engine ───────────────────────────────────────────────────────
const CAREER_TRACKS = {
  sportsAnalytics: {
    id: 'sportsAnalytics',
    title: 'Sports Data Analyst / Sports Betting Analyst',
    companies: ['ESPN Analytics', 'DraftKings', 'FanDuel', 'The Athletic', 'NFL Research', 'Sportradar'],
    salaryRange: { entry: '$45–55k', mid: '$70–90k', senior: '$110–150k' },
    keySkills: ['Excel / Python basics', 'Sports statistics', 'Probability and odds', 'Data visualization'],
    whyMekhi: 'His sports betting brain IS a real analytical skill. He reads odds, patterns, and probability naturally — this is the commercial version of that ability.',
    majorNeeded: 'Statistics, Mathematics, or Sports Management with data focus',
    certifications: ['Google Data Analytics Certificate', 'Excel financial modeling'],
  },
  sportsOperations: {
    id: 'sportsOperations',
    title: 'Sports Operations Coordinator / Team Operations',
    companies: ['Golden State Warriors', "Oakland A's", 'Sacramento Kings', 'NFL teams', 'Nike', 'Under Armour'],
    salaryRange: { entry: '$38–50k', mid: '$60–80k', senior: '$90–130k' },
    keySkills: ['Logistics and scheduling', 'Communication', 'Problem-solving under pressure', 'Team coordination'],
    whyMekhi: 'He thrives in structured, male-environment, task-oriented settings (ref: car shop). Operations is exactly that — no stage, just execution.',
    majorNeeded: 'Sports Management, Business Administration',
    certifications: ['Project Management basics', 'Sports Business certificate programs'],
  },
  broadcastProduction: {
    id: 'broadcastProduction',
    title: 'Broadcast Production / Sports Media (Behind Camera)',
    companies: ['ESPN', 'NBC Sports', 'Bleacher Report', 'The Undefeated', 'Overtime', 'DAZN'],
    salaryRange: { entry: '$40–55k', mid: '$65–85k', senior: '$95–140k' },
    keySkills: ['Video production basics', 'Sports knowledge', 'Storytelling', 'Technical production tools'],
    whyMekhi: 'He loves sports deeply and has a storytelling mind — but does not need to be the face. Behind-camera production lets him contribute without social performance pressure.',
    majorNeeded: 'Sports Media, Communications, or Film/TV Production',
    certifications: ['Adobe Premiere basics', 'Sports Journalism fundamentals'],
  },
  sportsAgencyOps: {
    id: 'sportsAgencyOps',
    title: 'Sports Agency Operations / Athlete Management Support',
    companies: ['Wasserman', 'CAA Sports', 'Excel Sports', 'Roc Nation Sports', 'Creative Artists'],
    salaryRange: { entry: '$40–55k', mid: '$65–90k', senior: '$100–160k+' },
    keySkills: ['Relationship management', 'Contracts basics', 'Communication', 'Sports market knowledge'],
    whyMekhi: 'He understands the athlete world from the inside. Operations roles in agencies are less client-facing early on — and reward pattern-recognition about who is worth betting on.',
    majorNeeded: 'Sports Management, Business, or Communications',
    certifications: ['Sports agent certification (state-specific)', 'Contract basics'],
  },
};

export function buildCareerMatches(answers, cores) {
  const scores = {
    sportsAnalytics:    0,
    sportsOperations:   0,
    broadcastProduction: 0,
    sportsAgencyOps:    0,
  };

  if (cores.responsibility !== null && cores.responsibility >= 5) {
    scores.sportsAnalytics += 2;
    scores.sportsAgencyOps += 1;
  }
  if (cores.goalAlignment !== null && cores.goalAlignment >= 6) {
    scores.sportsAgencyOps += 2;
    scores.sportsAnalytics += 1;
  }
  if (cores.responsibility !== null && cores.commitment !== null &&
      cores.responsibility >= 5 && cores.commitment >= 5) {
    scores.sportsOperations += 3;
  }
  if (cores.confidence !== null && cores.confidence <= 5) {
    scores.broadcastProduction += 2;
    scores.sportsOperations += 1;
  }
  if (cores.commitment !== null && cores.commitment >= 6) {
    scores.sportsAgencyOps += 1;
  }
  if (cores.independence !== null && cores.independence >= 5) {
    scores.sportsOperations += 1;
    scores.sportsAnalytics += 1;
  }

  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([key]) => CAREER_TRACKS[key]);
}

// ── Lifestyle budget ──────────────────────────────────────────────────────────
const LIFESTYLE_DEFAULTS = {
  modest: {
    housing: 1400, carPayment: 350, carInsurance: 200,
    food: 400, utilities: 150, phone: 80, savings: 200, travel: 100, other: 200,
  },
  comfortable: {
    housing: 2200, carPayment: 500, carInsurance: 250,
    food: 600, utilities: 200, phone: 100, savings: 500, travel: 300, other: 400,
  },
  aspirational: {
    housing: 3500, carPayment: 800, carInsurance: 350,
    food: 800, utilities: 250, phone: 120, savings: 1000, travel: 600, other: 700,
  },
};

export function buildLifestyleBudget(answers) {
  // No dedicated lifestyle-tier question exists in the current bank.
  // Defaults to 'comfortable'. Will be updated when lifestyle question is added.
  const tier = 'comfortable';
  const budget = { ...LIFESTYLE_DEFAULTS[tier] };
  const totalMonthly = Object.values(budget).reduce((a, b) => a + b, 0);
  const requiredAnnual = totalMonthly * 12;
  return {
    tier,
    breakdown: budget,
    totalMonthly,
    requiredAnnual,
    entryLevelGap: Math.max(0, requiredAnnual - 50000),
    note: 'This lifestyle is achievable within 2–3 years of entry-level work with disciplined saving.',
  };
}

// ── Full results package ──────────────────────────────────────────────────────
export function buildResultsPackage(answers, allSections, userId = '') {
  const name = USER_NAMES[userId] || 'They';

  const sectionScores = {};
  for (const section of allSections) {
    const score = calculateSectionScore(section.questions, answers);
    if (score !== null) sectionScores[section.id] = score;
  }

  const overallScore      = calculateOverallScore(sectionScores);
  const cores             = buildCoreScores(answers, allSections);
  const goalAlignmentPct  = calculateGoalAlignment(cores);
  const flags             = buildFlags(answers, cores, name);
  const contradictions    = detectContradictions(answers, cores);
  const collegeRec        = getCollegePathRecommendation(cores, flags, answers);
  const careerMatches     = buildCareerMatches(answers, cores);
  const lifestyleBudget   = buildLifestyleBudget(answers);

  return {
    overallScore,
    sectionScores,
    cores: { ...cores, goalAlignmentPct },
    flags,
    contradictions,
    collegeRec,
    careerMatches,
    lifestyleBudget,
    riskLevel:   deriveRiskLevel(flags, cores),
    trajectory:  deriveTrajectory(cores, flags),
    generatedAt: new Date().toISOString(),
  };
}

function deriveRiskLevel(flags, cores) {
  const highFlags = flags.filter(f => f.severity === 'high').length;
  const avoidance = cores.avoidanceRisk ?? 5;
  if (highFlags >= 3 || avoidance >= 8) return 'High';
  if (highFlags >= 1 || avoidance >= 6) return 'Medium';
  return 'Low';
}

function deriveTrajectory(cores, flags) {
  const pos = [
    cores.commitment   !== null && cores.commitment   >= 6,
    cores.confidence   !== null && cores.confidence   >= 5,
    cores.goalAlignment !== null && cores.goalAlignment >= 6,
  ].filter(Boolean).length;
  const neg = flags.filter(f => f.severity === 'high').length;
  if (pos >= 2 && neg <= 1) return 'Improving';
  if (neg >= 3) return 'Declining';
  return 'Stable';
}

// ── Display helpers ───────────────────────────────────────────────────────────
export function getScoreLabel(score) {
  if (score === null || score === undefined) return 'N/A';
  if (score >= 8) return 'Strong';
  if (score >= 6) return 'Developing';
  if (score >= 4) return 'Needs Work';
  return 'Critical';
}

export function getRiskLabel(score) {
  if (score === null || score === undefined) return 'Unknown';
  if (score >= 8) return 'High';
  if (score >= 5) return 'Medium';
  return 'Low';
}
