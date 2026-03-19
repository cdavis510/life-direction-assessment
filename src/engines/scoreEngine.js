// ─── MEKHI SCORE ENGINE ───────────────────────────────────────────────────────
// Calculates numerical scores, flags, contradictions, and recommendations
// from Mekhi's assessment answers before AI narrative generation.
// ─────────────────────────────────────────────────────────────────────────────

// Section weights (must sum to 1.00)
export const SECTION_WEIGHTS = {
  section1: 0.14, // Foundation: Self Awareness → emotionalMentalState + identity
  section2: 0.08, // Vision: Future Direction → lifeVisionBlueprint
  section3: 0.11, // Reality: Career & Education Path → academicReality + career
  section4: 0.18, // Execution: Daily Behavior & Discipline → responsibility + attendance
  section5: 0.08, // Communication & Support Systems → communicationAdvocacy
  section6: 0.12, // Readiness: Independence & Life Skills → collegeReadiness
  section7: 0.07, // Commitment & Growth → commitmentLevel
  sectionA: 0.06, // Life Vision
  sectionB: 0.04, // (shared)
  sectionC: 0.04, // (shared)
  sectionD: 0.04, // (shared)
  sectionE: 0.03, // (shared)
  sectionF: 0.03, // (shared)
  sectionG: 0.03, // (shared)
  sectionH: 0.03, // (shared)
  sectionI: 0.02, // Life Blueprint
};

// Multiple choice scoring: maps option index (0–3) to a 1–4 score.
// Default is [4,3,2,1] (first = best). Override per question where needed.
const MC_SCORE_OVERRIDES = {
  // Section 1
  s1_06: [4, 2, 3, 1],  // future feelings — hopeful before anxious
  s1_17: [4, 3, 2, 1],  // actions match values
  s1_23: [4, 3, 4, 1],  // when hard: push through OR ask for help = good
  s1_26: [4, 2, 1, 3],  // criticism: reflect > agree-when-shouldn't > shut down > defensive
  s1_28: [4, 3, 2, 1],  // comparison to others
  s1_32: [4, 3, 2, 1],  // (confidence)
  // Section 4
  s4_01: [4, 3, 2, 1],
  s4_05: [4, 3, 2, 1],
  // Section 6 — independence
  s6_10: [4, 3, 2, 1],
};

// Questions that are REVERSE scored (low choice index = bad outcome)
const REVERSE_SCORED = new Set([
  's1_28', // more comparison = worse
  's4_12', // avoidance questions
]);

// ─── QUESTION ID → CORE SCORE MAPPING ────────────────────────────────────────
// Each question contributes to 1–2 core score dimensions.
// Weight is how much this question contributes to that dimension (0–1 within dimension).

const QUESTION_CORE_MAP = {
  // GOAL ALIGNMENT
  s1_06: 'goalAlignment', s1_08: 'goalAlignment', s1_11: 'goalAlignment',
  s2_01: 'goalAlignment', s7_01: 'goalAlignment', s7_02: 'goalAlignment',
  sa_05: 'goalAlignment', sa_08: 'goalAlignment',

  // RESPONSIBILITY
  s4_01: 'responsibility', s4_02: 'responsibility', s4_05: 'responsibility',
  s4_08: 'responsibility', s4_10: 'responsibility', s4_12: 'responsibility',
  s4_15: 'responsibility', s4_18: 'responsibility',

  // INDEPENDENCE
  s6_01: 'independence', s6_02: 'independence', s6_05: 'independence',
  s6_08: 'independence', s6_10: 'independence', s6_12: 'independence',

  // AVOIDANCE RISK (higher score = more avoidance = higher risk)
  s1_23: 'avoidanceRisk', s4_12: 'avoidanceRisk', s5_05: 'avoidanceRisk',
  s5_08: 'avoidanceRisk', s5_10: 'avoidanceRisk', s5_12: 'avoidanceRisk',

  // CONFIDENCE
  s1_21: 'confidence', s1_24: 'confidence', s1_26: 'confidence',
  s1_28: 'confidence', s1_30: 'confidence', s1_32: 'confidence',

  // COMMITMENT
  s7_01: 'commitment', s7_02: 'commitment', s7_03: 'commitment',
  s7_05: 'commitment', s7_08: 'commitment',
};

// ─── SCORE A SINGLE ANSWER ───────────────────────────────────────────────────

function scoreAnswer(questionId, value, type) {
  if (value === undefined || value === null || value === '') return null;

  if (type === 'slider') {
    // Sliders are 1–10; normalize to 1–4 scale for uniform treatment
    return Math.round((value / 10) * 4);
  }

  if (type === 'multiple') {
    const idx = typeof value === 'number' ? value : parseInt(value, 10);
    if (isNaN(idx)) return null;
    const map = MC_SCORE_OVERRIDES[questionId] || [4, 3, 2, 1];
    const score = map[idx] ?? null;
    if (score === null) return null;
    return REVERSE_SCORED.has(questionId) ? 5 - score : score;
  }

  return null; // text answers don't get numeric scores
}

// ─── SECTION SCORE ───────────────────────────────────────────────────────────

export function calculateSectionScore(sectionQuestions, answers) {
  const scored = [];

  for (const q of sectionQuestions) {
    const raw = answers[q.id];
    const score = scoreAnswer(q.id, raw, q.type);
    if (score !== null) scored.push(score);
  }

  if (scored.length === 0) return null;
  const avg = scored.reduce((a, b) => a + b, 0) / scored.length;
  return Math.round((avg / 4) * 100); // 0–100
}

// ─── OVERALL WEIGHTED SCORE ──────────────────────────────────────────────────

export function calculateOverallScore(sectionScores) {
  let totalWeight = 0;
  let weightedSum = 0;

  for (const [sectionId, score] of Object.entries(sectionScores)) {
    if (score === null) continue;
    const weight = SECTION_WEIGHTS[sectionId] ?? 0;
    weightedSum += score * weight;
    totalWeight += weight;
  }

  if (totalWeight === 0) return 0;
  return Math.round(weightedSum / totalWeight);
}

// ─── 6 CORE SCORES ───────────────────────────────────────────────────────────

export function buildCoreScores(answers, allQuestions) {
  const coreAccumulators = {
    goalAlignment: [],
    responsibility: [],
    independence: [],
    avoidanceRisk: [],
    confidence: [],
    commitment: [],
  };

  const questionMap = {};
  for (const section of allQuestions) {
    for (const q of section.questions) {
      questionMap[q.id] = q;
    }
  }

  for (const [qId, dimension] of Object.entries(QUESTION_CORE_MAP)) {
    const q = questionMap[qId];
    if (!q) continue;
    const raw = answers[qId];
    let score = scoreAnswer(qId, raw, q.type);
    if (score === null) continue;

    // Normalize slider (1–4 scale already) to 0–10
    const normalized = Math.round((score / 4) * 10);
    coreAccumulators[dimension].push(normalized);
  }

  const cores = {};
  for (const [dim, vals] of Object.entries(coreAccumulators)) {
    if (vals.length === 0) {
      cores[dim] = null;
      continue;
    }
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    cores[dim] = Math.round(avg * 10) / 10; // one decimal
  }

  // avoidanceRisk: invert so that high score = high avoidance (danger signal)
  if (cores.avoidanceRisk !== null) {
    cores.avoidanceRisk = Math.round((10 - cores.avoidanceRisk) * 10) / 10;
  }

  return cores;
}

// ─── GOAL ALIGNMENT % ────────────────────────────────────────────────────────

export function calculateGoalAlignment(cores) {
  const { goalAlignment, commitment, responsibility } = cores;
  const vals = [goalAlignment, commitment, responsibility].filter(v => v !== null);
  if (vals.length === 0) return null;
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
  return Math.round((avg / 10) * 100);
}

// ─── RED FLAG ENGINE ─────────────────────────────────────────────────────────

const FLAG_RULES = [
  {
    id: 'silent_suffering',
    label: 'Silent Suffering Pattern',
    severity: 'high',
    check: (answers) => {
      const q1 = answers['s5_05']; // asks for help
      const q2 = answers['s5_08']; // tells people when struggling
      return (
        (typeof q1 === 'number' && q1 >= 2) ||
        (typeof q2 === 'number' && q2 >= 2)
      );
    },
    message: 'Mekhi indicates he does not ask for help or tell people when he is struggling.',
  },
  {
    id: 'academic_shutdown',
    label: 'Academic Shutdown Risk',
    severity: 'high',
    check: (answers) => {
      const q1 = answers['s3_05']; // gives up when confused
      const q2 = answers['s4_08']; // asks for help when behind
      return (
        (typeof q1 === 'number' && q1 >= 2) ||
        (typeof q2 === 'number' && q2 >= 2)
      );
    },
    message: 'Mekhi shows a pattern of shutting down academically when he does not understand quickly.',
  },
  {
    id: 'avoidance_escalation',
    label: 'Avoidance Escalation',
    severity: 'high',
    check: (answers, cores) => cores.avoidanceRisk !== null && cores.avoidanceRisk >= 7,
    message: 'High avoidance risk — Mekhi tends to withdraw from problems rather than address them.',
  },
  {
    id: 'low_confidence',
    label: 'Low Self-Belief',
    severity: 'medium',
    check: (answers, cores) => {
      const confSlider = answers['s1_21'];
      return (typeof confSlider === 'number' && confSlider <= 4) ||
             (cores.confidence !== null && cores.confidence <= 4);
    },
    message: 'Mekhi\'s self-belief scores are low — he may not feel he deserves or can achieve the life he describes.',
  },
  {
    id: 'financial_risk',
    label: 'Financial Risk Behavior',
    severity: 'high',
    check: (answers) => {
      const q = answers['s4_18']; // money management
      return typeof q === 'number' && q >= 2;
    },
    message: 'Financial answers indicate risk of impulsive spending or gambling behavior.',
  },
  {
    id: 'isolation_pattern',
    label: 'Social Isolation',
    severity: 'medium',
    check: (answers) => {
      const q = answers['s5_12']; // social connection
      return typeof q === 'number' && q >= 2;
    },
    message: 'Mekhi\'s social connection indicators are low — deepening isolation is a risk.',
  },
  {
    id: 'medication_noncompliance',
    label: 'Medication / Mental Health Management',
    severity: 'medium',
    check: (answers) => {
      const q = answers['s1_40']; // mental health management (if exists)
      return typeof q === 'number' && q >= 3;
    },
    message: 'Mental health management indicators suggest potential inconsistency.',
  },
  {
    id: 'goal_effort_gap',
    label: 'High Goals / Low Effort Gap',
    severity: 'medium',
    check: (answers, cores) => {
      const goalScore = cores.goalAlignment ?? 5;
      const effortScore = cores.responsibility ?? 5;
      return goalScore > 7 && effortScore < 5;
    },
    message: 'Mekhi expresses high career ambitions but low responsibility/effort scores — this gap requires direct attention.',
  },
  {
    id: 'low_independence',
    label: 'Independence Gap',
    severity: 'medium',
    check: (answers, cores) => cores.independence !== null && cores.independence <= 4,
    message: 'Low independence scores suggest Mekhi will struggle in unstructured college environments without direct support systems.',
  },
];

export function buildFlags(answers, cores) {
  const triggered = [];

  for (const rule of FLAG_RULES) {
    try {
      if (rule.check(answers, cores)) {
        triggered.push({
          id: rule.id,
          label: rule.label,
          severity: rule.severity,
          message: rule.message,
        });
      }
    } catch {
      // Skip rules that error due to missing data
    }
  }

  return triggered.sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.severity] - order[b.severity];
  });
}

// ─── CONTRADICTION DETECTION ─────────────────────────────────────────────────

const CONTRADICTION_PAIRS = [
  {
    id: 'C1',
    label: 'Motivation vs. Effort',
    qA: 's7_01', labelA: 'motivation to change',
    qB: 's4_05', labelB: 'daily study habits',
    check: (a, b) => a !== null && b !== null && a >= 8 && b <= 3,
    message: 'Says he is highly motivated to change but reports poor daily study habits.',
  },
  {
    id: 'C2',
    label: 'Career Ambition vs. Academic Commitment',
    qA: 'sa_08', labelA: 'career ambition level',
    qB: 's4_01', labelB: 'academic follow-through',
    check: (a, b) => a !== null && b !== null && a >= 7 && b <= 3,
    message: 'Career ambition is high but academic commitment indicators are low — dreams are outpacing action.',
  },
  {
    id: 'C3',
    label: 'Independence Self-Rating vs. Life Skills',
    qA: 's6_01', labelA: 'self-rated independence',
    qB: 's6_08', labelB: 'actual life skills score',
    check: (a, b) => a !== null && b !== null && a >= 7 && b <= 3,
    message: 'Rates self as highly independent but life skills answers tell a different story.',
  },
  {
    id: 'C4',
    label: 'Open Communication vs. Avoidance Behavior',
    qA: 's5_01', labelA: 'self-rated communication',
    qB: 's5_05', labelB: 'asks for help when struggling',
    check: (a, b) => a !== null && b !== null && a >= 7 && b >= 8,
    message: 'Claims to communicate well but indicates he does not ask for help when struggling.',
  },
  {
    id: 'C5',
    label: 'Future Vision vs. Current Direction',
    qA: 's2_01', labelA: 'strength of future vision',
    qB: 's1_06', labelB: 'current feeling about future',
    check: (a, b) => a !== null && b !== null && a >= 7 && b <= 2,
    message: 'Describes a clear future vision but feels disconnected or anxious about the future right now.',
  },
  {
    id: 'C6',
    label: 'Commitment to Return vs. College Avoidance',
    qA: 's7_05', labelA: 'commitment to education',
    qB: 's3_10', labelB: 'avoidance of academic help',
    check: (a, b) => a !== null && b !== null && a >= 7 && b >= 7,
    message: 'Says he is committed to his education but shows consistent avoidance of academic support.',
  },
];

export function detectContradictions(answers, cores) {
  const triggered = [];

  for (const pair of CONTRADICTION_PAIRS) {
    const valA = answers[pair.qA];
    const valB = answers[pair.qB];

    const numA = typeof valA === 'number' ? valA :
                 typeof valA === 'string' ? parseInt(valA, 10) : null;
    const numB = typeof valB === 'number' ? valB :
                 typeof valB === 'string' ? parseInt(valB, 10) : null;

    try {
      if (pair.check(numA, numB)) {
        triggered.push({
          id: pair.id,
          label: pair.label,
          message: pair.message,
        });
      }
    } catch {
      // Skip
    }
  }

  return triggered;
}

// ─── COLLEGE PATH RECOMMENDATION ─────────────────────────────────────────────

export function getCollegePathRecommendation(cores, flags, answers) {
  const independence = cores.independence ?? 5;
  const responsibility = cores.responsibility ?? 5;
  const avoidance = cores.avoidanceRisk ?? 5;
  const commitment = cores.commitment ?? 5;

  const hasAcademicShutdown = flags.some(f => f.id === 'academic_shutdown');
  const hasHighAvoidance = flags.some(f => f.id === 'avoidance_escalation');
  const hasFinancialRisk = flags.some(f => f.id === 'financial_risk');

  // Hard override: confirmed behavioral collapse with no plan
  if (independence <= 3 && responsibility <= 3 && hasAcademicShutdown && hasHighAvoidance) {
    return {
      path: 'D',
      label: 'Structured Gap Year / Job Corps / Vocational Path',
      reasoning: 'Current scores indicate that returning to a 4-year university environment without foundational skill-building would likely repeat the same collapse. A structured gap year, Job Corps, or vocational program builds the executive function, financial literacy, and daily discipline that are currently missing.',
      nextSteps: [
        'Research Job Corps programs in Oakland/Bay Area',
        'Explore structured gap year options (AmeriCorps, Year Up)',
        'Target Community College for 1 semester first with disability support established',
        'Build daily routine and financial management habits before re-enrolling',
      ],
    };
  }

  // Path C: Community college → 4-year transfer
  if (independence <= 4.5 && responsibility <= 4.5 && (hasAcademicShutdown || hasHighAvoidance)) {
    return {
      path: 'C',
      label: 'Community College Transfer Track',
      recommendation: 'Laney College or Merritt College (Oakland) → transfer to CSU East Bay, SF State, or Clark Atlanta',
      reasoning: 'The California community college system offers a lower-pressure re-entry with proximity to home support, established disability services, and a clear transfer pathway to a 4-year university. This builds real college success before returning to an independent living situation.',
      nextSteps: [
        'Apply to Laney College or Merritt College for Fall 2026',
        'Establish DSP (Disabled Students Program) on Day 1',
        'Take 12 units max first semester — no overload',
        'Build Canvas and LMS skills in first 2 weeks',
        'Attend every class for the first 4 weeks to build the habit',
      ],
    };
  }

  // Path B: Gap semester — stabilize then return
  if (commitment >= 6 && (independence <= 5.5 || responsibility <= 5.5) && !hasHighAvoidance) {
    return {
      path: 'B',
      label: 'Gap Semester — Build and Return',
      reasoning: 'Commitment is present but foundational skills need shoring up before returning. A structured gap semester at home focused on disability documentation, financial literacy, Canvas/LMS training, and daily routine will increase odds of a successful return significantly.',
      nextSteps: [
        'Contact Clark Atlanta Disability Services to understand readmission requirements',
        'Complete Canvas/LMS certification or tutorial program',
        'Work part-time (car shop or similar) to rebuild routine',
        'Begin credit counseling / financial literacy course',
        'Set return date: Spring 2027 semester',
      ],
    };
  }

  // Path A: Return to Clark Atlanta with support plan
  return {
    path: 'A',
    label: 'Return to Clark Atlanta — Structured Support Plan',
    reasoning: 'The data suggests Mekhi can succeed at Clark Atlanta with the right support infrastructure in place. The first semester working indicates he can function in college — the issues are structural, not ability-based.',
    supportPlan: [
      'Register with Clark Atlanta Disability Services — request extended test time, note-taking, alternative formats',
      'Weekly academic advisor check-in (scheduled, not optional)',
      'Canvas/iClicker orientation before first day of class',
      'Mom accountability protocol: access to student portal (agreed, not secretive)',
      'Medication accountability: daily check-in plan with Mom',
      'Financial aid structure: remove gambling temptation through direct-to-expense disbursement if possible',
      'Identify 1 peer or RA as accountability partner on campus',
    ],
    nextSteps: [
      'Contact Clark Atlanta about readmission within 7 days',
      'Request Disability Services appointment before semester starts',
      'Agree on portal-sharing arrangement with Mom',
      'Identify campus mental health resources and schedule intake',
    ],
  };
}

// ─── SPORTS CAREER MATCH ENGINE ──────────────────────────────────────────────

const CAREER_TRACKS = {
  sportsAnalytics: {
    title: 'Sports Data Analyst / Sports Betting Analyst',
    companies: ['ESPN Analytics', 'DraftKings', 'FanDuel', 'The Athletic', 'NFL Research', 'Sportradar'],
    salaryRange: { entry: '$45–55k', mid: '$70–90k', senior: '$110–150k' },
    keySkills: ['Excel / Python basics', 'Sports statistics', 'Probability and odds', 'Data visualization'],
    whyMekhi: 'His sports betting brain IS a real analytical skill. He reads odds, patterns, and probability naturally — this is the commercial version of that ability.',
    majorNeeded: 'Statistics, Mathematics, or Sports Management with data focus',
    certifications: ['Google Data Analytics Certificate', 'Excel financial modeling'],
  },
  sportsOperations: {
    title: 'Sports Operations Coordinator / Team Operations',
    companies: ['Golden State Warriors', 'Oakland A\'s', 'Sacramento Kings', 'NFL teams', 'Nike', 'Under Armour'],
    salaryRange: { entry: '$38–50k', mid: '$60–80k', senior: '$90–130k' },
    keySkills: ['Logistics and scheduling', 'Communication', 'Problem-solving under pressure', 'Team coordination'],
    whyMekhi: 'He thrives in structured, male-environment, task-oriented settings (ref: car shop). Operations is exactly that — no stage, just execution.',
    majorNeeded: 'Sports Management, Business Administration',
    certifications: ['Project Management basics', 'Sports Business certificate programs'],
  },
  broadcastProduction: {
    title: 'Broadcast Production / Sports Media (Behind Camera)',
    companies: ['ESPN', 'NBC Sports', 'Bleacher Report', 'The Undefeated', 'Overtime', 'DAZN'],
    salaryRange: { entry: '$40–55k', mid: '$65–85k', senior: '$95–140k' },
    keySkills: ['Video production basics', 'Sports knowledge', 'Storytelling', 'Technical production tools'],
    whyMekhi: 'He loves sports deeply and has a storytelling mind — but does not need to be the face. Behind-camera production lets him contribute without social performance pressure.',
    majorNeeded: 'Sports Media, Communications, or Film/TV Production',
    certifications: ['Adobe Premiere basics', 'Sports Journalism fundamentals'],
  },
  sportsAgencyOps: {
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
    sportsAnalytics: 0,
    sportsOperations: 0,
    broadcastProduction: 0,
    sportsAgencyOps: 0,
  };

  // Analytical tendency (sports betting question proxy)
  const analyticalSlider = answers['s3_08'] ?? answers['sa_03'] ?? null;
  if (typeof analyticalSlider === 'number' && analyticalSlider >= 7) {
    scores.sportsAnalytics += 3;
    scores.sportsAgencyOps += 1;
  }

  // Prefers structured/operational environments
  if (cores.independence !== null && cores.independence >= 5) {
    scores.sportsOperations += 2;
  }

  // Communication / social confidence
  if (cores.confidence !== null && cores.confidence <= 5) {
    scores.broadcastProduction += 2; // behind-camera fits low social confidence
    scores.sportsOperations += 1;
  }

  // Strong career vision
  if (cores.goalAlignment !== null && cores.goalAlignment >= 6) {
    scores.sportsAgencyOps += 2;
    scores.sportsAnalytics += 1;
  }

  // Build ranked list
  const ranked = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([key]) => CAREER_TRACKS[key]);

  return ranked.slice(0, 4); // return all 4, ranked
}

// ─── LIFESTYLE BUDGET REALITY CALCULATOR ─────────────────────────────────────

const LIFESTYLE_DEFAULTS = {
  modest: {
    housing: 1400,
    carPayment: 350,
    carInsurance: 200,
    food: 400,
    utilities: 150,
    phone: 80,
    savings: 200,
    travel: 100,
    other: 200,
  },
  comfortable: {
    housing: 2200,
    carPayment: 500,
    carInsurance: 250,
    food: 600,
    utilities: 200,
    phone: 100,
    savings: 500,
    travel: 300,
    other: 400,
  },
  aspirational: {
    housing: 3500,
    carPayment: 800,
    carInsurance: 350,
    food: 800,
    utilities: 250,
    phone: 120,
    savings: 1000,
    travel: 600,
    other: 700,
  },
};

export function buildLifestyleBudget(answers) {
  // Determine lifestyle tier from answer to lifestyle question
  // sa_07 or s2_08 typically asks about desired lifestyle
  const lifestyleAnswer = answers['sa_07'] ?? answers['s2_08'] ?? null;

  let tier = 'comfortable';
  if (typeof lifestyleAnswer === 'number') {
    if (lifestyleAnswer <= 1) tier = 'modest';
    else if (lifestyleAnswer >= 3) tier = 'aspirational';
  }

  const budget = { ...LIFESTYLE_DEFAULTS[tier] };

  // Add family support if indicated
  const familySupport = answers['s2_12'] ?? null;
  if (typeof familySupport === 'number' && familySupport >= 1) {
    budget.familySupport = 500;
  }

  const totalMonthly = Object.values(budget).reduce((a, b) => a + b, 0);
  const requiredAnnual = totalMonthly * 12;

  return {
    tier,
    breakdown: budget,
    totalMonthly,
    requiredAnnual,
    entryLevelGap: Math.max(0, requiredAnnual - 50000),
    note: requiredAnnual > 80000
      ? 'This lifestyle requires a mid-career salary. Entry-level roles will require adjustments for 2–4 years.'
      : requiredAnnual > 50000
      ? 'This lifestyle is achievable within 2–3 years of entry-level work with disciplined saving.'
      : 'This lifestyle is achievable on entry-level salary with basic financial discipline.',
  };
}

// ─── FULL RESULTS PACKAGE ─────────────────────────────────────────────────────

export function buildResultsPackage(answers, allSections) {
  // Calculate section scores
  const sectionScores = {};
  for (const section of allSections) {
    const score = calculateSectionScore(section.questions, answers);
    if (score !== null) sectionScores[section.id] = score;
  }

  const overallScore = calculateOverallScore(sectionScores);
  const cores = buildCoreScores(answers, allSections);
  const goalAlignmentPct = calculateGoalAlignment(cores);
  const flags = buildFlags(answers, cores);
  const contradictions = detectContradictions(answers, cores);
  const collegeRec = getCollegePathRecommendation(cores, flags, answers);
  const careerMatches = buildCareerMatches(answers, cores);
  const lifestyleBudget = buildLifestyleBudget(answers);

  return {
    overallScore,
    sectionScores,
    cores: {
      ...cores,
      goalAlignmentPct,
    },
    flags,
    contradictions,
    collegeRec,
    careerMatches,
    lifestyleBudget,
    riskLevel: deriveRiskLevel(flags, cores),
    trajectory: deriveTrajectory(cores, flags),
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
  const positiveSignals = [
    cores.commitment !== null && cores.commitment >= 6,
    cores.confidence !== null && cores.confidence >= 5,
    cores.goalAlignment !== null && cores.goalAlignment >= 6,
  ].filter(Boolean).length;

  const negativeSignals = flags.filter(f => f.severity === 'high').length;

  if (positiveSignals >= 2 && negativeSignals <= 1) return 'Improving';
  if (negativeSignals >= 3) return 'Declining';
  return 'Stable';
}

// ─── SCORE DISPLAY LABELS ────────────────────────────────────────────────────

export function getScoreLabel(score) {
  if (score === null) return 'N/A';
  if (score >= 8) return 'Strong';
  if (score >= 6) return 'Developing';
  if (score >= 4) return 'Needs Work';
  return 'Critical';
}

export function getRiskLabel(score) {
  if (score === null) return 'Unknown';
  if (score >= 8) return 'High';
  if (score >= 5) return 'Medium';
  return 'Low';
}
