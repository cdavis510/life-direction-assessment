// ─── MEKHI GROWTH ENGINE ──────────────────────────────────────────────────────
// Monthly Man Goal, Weekly Reset, Encouragement System, Scheduling, AI prompts
// ─────────────────────────────────────────────────────────────────────────────

// ─── PART 1: MONTHLY MAN GOAL LIBRARY ────────────────────────────────────────

const MAN_GOAL_LIBRARY = {
  academicReentry: {
    id: 'academicReentry',
    title: 'Show Up Every Day',
    subtitle: 'Attendance is the first discipline',
    description: 'This month your only job is to show up. Every class. Every day. Nothing else matters until this is locked in.',
    weeklyTarget: 'Zero unexcused absences',
    monthlyMilestone: 'Attend 100% of scheduled classes this month',
    trackingPrompt: 'How many classes did you attend vs. miss this week?',
  },
  financialControl: {
    id: 'financialControl',
    title: 'Own Your Money',
    subtitle: 'Stop letting the money own you',
    description: 'This month you\'re building a spending plan. Every dollar gets a job before you spend it. No gambling from financial aid.',
    weeklyTarget: 'Log every expense — no exceptions',
    monthlyMilestone: 'Complete one full month with no gambling from financial aid funds',
    trackingPrompt: 'Did you stick to your budget this week? What happened with money?',
  },
  communicationBreakthrough: {
    id: 'communicationBreakthrough',
    title: 'Say It Before It\'s Too Late',
    subtitle: 'One real conversation a week',
    description: 'The pattern we\'re breaking: finding out about problems when they\'re already crises. This month, one real check-in with someone who matters — before things get bad.',
    weeklyTarget: 'One honest conversation about how you\'re actually doing',
    monthlyMilestone: 'Initiate contact with Mom once per week — not just responding',
    trackingPrompt: 'Did you check in with someone this week before they had to ask you?',
  },
  medicationConsistency: {
    id: 'medicationConsistency',
    title: 'The Foundation',
    subtitle: 'The medication is not optional',
    description: 'Everything — the school performance, the mood, the motivation — is harder without consistent medication. This month, not one missed dose.',
    weeklyTarget: 'Zoloft taken every day — no skipped days',
    monthlyMilestone: '30 consecutive days of medication consistency',
    trackingPrompt: 'Did you take your medication every day this week?',
  },
  dailyStructure: {
    id: 'dailyStructure',
    title: 'Build a Day That Works',
    subtitle: 'Routine is freedom in disguise',
    description: 'This month you\'re building a routine that doesn\'t depend on motivation. Wake time, meals, class time, study time — mapped out and followed.',
    weeklyTarget: 'Follow your daily schedule 5 out of 7 days',
    monthlyMilestone: 'Build a written weekly schedule and follow it for 4 straight weeks',
    trackingPrompt: 'How many days did you follow your schedule this week?',
  },
  academicHelpSeeking: {
    id: 'academicHelpSeeking',
    title: 'Use the System',
    subtitle: 'The help exists — use it',
    description: 'This month you\'re connecting with every academic support system available to you: tutoring, disability services, office hours. This is not weakness. This is strategy.',
    weeklyTarget: 'Use one academic support resource per week',
    monthlyMilestone: 'Establish IEP/DSP accommodations and attend tutoring at least once',
    trackingPrompt: 'Did you use any academic support this week? What happened?',
  },
  socialReconnection: {
    id: 'socialReconnection',
    title: 'Find Your People',
    subtitle: 'You were meant to be part of something',
    description: 'Isolation is invisible. This month, one real social connection per week. Not scrolling. Not gaming. A real person, real conversation.',
    weeklyTarget: 'One real in-person interaction with a peer per week',
    monthlyMilestone: 'Make contact with at least one person from your Oakland friend group',
    trackingPrompt: 'Did you spend real time with someone this week — not just texts?',
  },
  careerExploration: {
    id: 'careerExploration',
    title: 'Know What You\'re Aiming At',
    subtitle: 'Research before you commit',
    description: 'This month you\'re researching the careers on your shortlist like you\'d research a team before a bet. Salary, requirements, real day-in-the-life. Know the game.',
    weeklyTarget: 'Research one career path or talk to one professional',
    monthlyMilestone: 'Complete written career comparison for your top 3 paths',
    trackingPrompt: 'What did you learn about your target career this week?',
  },
};

// Maps assessment scores/flags to the most relevant monthly goal
const SECTION_TO_GOAL_MAP = [
  {
    condition: (data) => data.flags?.some(f => f.id === 'medication_noncompliance'),
    goal: 'medicationConsistency',
    priority: 10,
  },
  {
    condition: (data) => data.flags?.some(f => f.id === 'academic_shutdown'),
    goal: 'academicReentry',
    priority: 9,
  },
  {
    condition: (data) => data.flags?.some(f => f.id === 'financial_risk'),
    goal: 'financialControl',
    priority: 8,
  },
  {
    condition: (data) => data.flags?.some(f => f.id === 'silent_suffering'),
    goal: 'communicationBreakthrough',
    priority: 7,
  },
  {
    condition: (data) => data.flags?.some(f => f.id === 'avoidance_escalation'),
    goal: 'academicHelpSeeking',
    priority: 6,
  },
  {
    condition: (data) => data.flags?.some(f => f.id === 'isolation_pattern'),
    goal: 'socialReconnection',
    priority: 5,
  },
  {
    condition: (data) => data.cores?.goalAlignment !== null && data.cores.goalAlignment >= 6,
    goal: 'careerExploration',
    priority: 4,
  },
  {
    condition: () => true, // fallback
    goal: 'dailyStructure',
    priority: 1,
  },
];

export function buildMonthlyManGoal(assessmentData) {
  const applicable = SECTION_TO_GOAL_MAP
    .filter(rule => rule.condition(assessmentData))
    .sort((a, b) => b.priority - a.priority);

  const selectedKey = applicable[0]?.goal ?? 'dailyStructure';
  const goal = MAN_GOAL_LIBRARY[selectedKey];

  return {
    ...goal,
    month: new Date().toISOString().slice(0, 7),
    selectedAt: new Date().toISOString(),
  };
}

// ─── PART 2: WEEKLY RESET QUESTION POOLS ─────────────────────────────────────

const WEEKLY_QUESTION_POOLS = {
  attendance: [
    { id: 'w_att_1', text: 'How many classes did you go to this week vs. skip?', type: 'text' },
    { id: 'w_att_2', text: 'Was there a moment this week you thought about not going — and what did you decide?', type: 'text' },
    { id: 'w_att_3', text: 'Rate your attendance commitment this week (1 = skipped most, 10 = went to everything).', type: 'slider', min: 1, max: 10 },
  ],
  medication: [
    { id: 'w_med_1', text: 'Did you take your medication every day this week? If not, which days did you miss?', type: 'multiple', options: ['Every day — no misses', 'Missed 1–2 days', 'Missed 3+ days', 'Didn\'t take it at all'] },
    { id: 'w_med_2', text: 'On a scale of 1–10, how would you rate your mood this week?', type: 'slider', min: 1, max: 10 },
  ],
  finances: [
    { id: 'w_fin_1', text: 'Did you spend any money on gambling or sports betting this week?', type: 'multiple', options: ['No — didn\'t bet at all', 'Small amount — under $20', 'More than I planned', 'I\'d rather not say'] },
    { id: 'w_fin_2', text: 'What did you actually spend your money on this week?', type: 'text' },
    { id: 'w_fin_3', text: 'Rate your financial discipline this week (1 = spent impulsively, 10 = stuck to the plan).', type: 'slider', min: 1, max: 10 },
  ],
  communication: [
    { id: 'w_com_1', text: 'Did you check in with Mom this week — not just respond, but actually reach out?', type: 'multiple', options: ['Yes — I called or texted first', 'I responded but didn\'t reach out', 'We didn\'t really talk', 'We talked but it wasn\'t real'] },
    { id: 'w_com_2', text: 'Was there something going on this week that you kept to yourself instead of telling someone?', type: 'text' },
  ],
  academics: [
    { id: 'w_aca_1', text: 'Did you check Canvas or your school portal this week?', type: 'multiple', options: ['Yes — checked and stayed on top of it', 'Checked once but didn\'t do anything', 'Opened it but closed it', 'Didn\'t look at it'] },
    { id: 'w_aca_2', text: 'What\'s one thing you understood this week in class that you actually got?', type: 'text' },
    { id: 'w_aca_3', text: 'Rate your academic effort this week (1 = did nothing, 10 = gave it everything).', type: 'slider', min: 1, max: 10 },
  ],
  wellbeing: [
    { id: 'w_wbl_1', text: 'On a scale of 1–10, how are you actually feeling right now — not the answer you give people, the real one?', type: 'slider', min: 1, max: 10 },
    { id: 'w_wbl_2', text: 'What was the hardest thing about this week?', type: 'text' },
    { id: 'w_wbl_3', text: 'What was one thing — even something small — that felt good this week?', type: 'text' },
  ],
  goalProgress: [
    { id: 'w_gol_1', text: 'This month\'s goal is: {monthlyGoalTitle}. How close are you to it right now? (1 = not even started, 10 = nailing it)', type: 'slider', min: 1, max: 10 },
    { id: 'w_gol_2', text: 'What is one specific thing you did this week toward your monthly goal?', type: 'text' },
    { id: 'w_gol_3', text: 'What got in the way this week — or if nothing did, what made it easier than usual?', type: 'text' },
  ],
};

export function generateWeeklyReset(data) {
  const { monthlyGoal, flags = [], cores = {}, weekNumber = 1 } = data;

  // Always include wellbeing and goalProgress
  const selectedPools = ['wellbeing', 'goalProgress'];

  // Add pools based on active flags and scores
  if (flags.some(f => f.id === 'medication_noncompliance')) selectedPools.push('medication');
  if (flags.some(f => f.id === 'academic_shutdown')) selectedPools.push('academics');
  if (flags.some(f => f.id === 'financial_risk')) selectedPools.push('finances');
  if (flags.some(f => f.id === 'silent_suffering')) selectedPools.push('communication');
  if (cores.responsibility !== null && cores.responsibility <= 5) selectedPools.push('attendance');

  // Deduplicate and limit to 4 pools (10 questions total max)
  const uniquePools = [...new Set(selectedPools)].slice(0, 4);

  const questions = [];
  for (const poolKey of uniquePools) {
    const pool = WEEKLY_QUESTION_POOLS[poolKey];
    if (!pool) continue;
    // Pick 2–3 questions from each pool
    const selected = pool.slice(0, weekNumber % 2 === 0 ? 2 : 3);
    // Replace placeholder in goal progress questions
    const processed = selected.map(q => ({
      ...q,
      text: q.text.replace('{monthlyGoalTitle}', monthlyGoal?.title ?? 'your goal'),
    }));
    questions.push(...processed);
  }

  return {
    weekNumber,
    month: new Date().toISOString().slice(0, 7),
    questions: questions.slice(0, 10),
    pools: uniquePools,
    generatedAt: new Date().toISOString(),
  };
}

// ─── PART 3: SCORE WEEKLY RESET ──────────────────────────────────────────────

const WEEKLY_STATUS_LEVELS = {
  lockedIn: { label: 'Locked In', min: 80, color: 'green', message: 'You\'re doing the work. This week you showed what you\'re capable of.' },
  improving: { label: 'Improving', min: 60, color: 'blue', message: 'Moving in the right direction. Keep it going.' },
  inconsistent: { label: 'Inconsistent', min: 40, color: 'yellow', message: 'You started strong but didn\'t finish. That\'s a pattern worth noticing.' },
  avoiding: { label: 'Avoiding', min: 25, color: 'orange', message: 'Something is making it hard to follow through. We need to talk about what\'s getting in the way.' },
  offTrack: { label: 'Off Track', min: 0, color: 'red', message: 'This week didn\'t go the way it was supposed to. That\'s okay — one week doesn\'t define the month. But we need to look at what happened.' },
};

export function scoreWeeklyReset(answers, weeklyReset) {
  const scores = [];

  for (const q of weeklyReset.questions) {
    const val = answers[q.id];
    if (val === undefined || val === null) continue;

    if (q.type === 'slider') {
      scores.push((val / 10) * 100);
    } else if (q.type === 'multiple') {
      const idx = typeof val === 'number' ? val : parseInt(val, 10);
      if (!isNaN(idx)) {
        scores.push(Math.max(0, 100 - idx * 25)); // 0→100, 1→75, 2→50, 3→25
      }
    }
  }

  if (scores.length === 0) return null;

  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  const rounded = Math.round(avg);

  const status = Object.values(WEEKLY_STATUS_LEVELS)
    .sort((a, b) => b.min - a.min)
    .find(s => rounded >= s.min) ?? WEEKLY_STATUS_LEVELS.offTrack;

  return {
    score: rounded,
    status: status.label,
    color: status.color,
    message: status.message,
    answeredCount: scores.length,
    totalQuestions: weeklyReset.questions.length,
  };
}

// ─── PART 4: SCHEDULING ───────────────────────────────────────────────────────

export const WEEKLY_SCHEDULE = {
  dayOfWeek: 0,        // Sunday (0 = Sunday)
  hour: 19,            // 7:00 PM
  minute: 0,
  timezone: 'America/Los_Angeles',
  channels: ['sms', 'email'],
  recipients: {
    mekhi: {
      sms: '+15106502665',
      email: 'mekhi.reynolds30@gmail.com',
    },
    mom: {
      sms: '+15109986112',
      email: 'moneyforcollege510@gmail.com',
    },
  },
  smsTemplate: (name, weekNum) =>
    `Hey ${name} — weekly reset time. Check in with yourself. Week ${weekNum} of the month. Takes 5 min.\n\nOpen your check-in: https://life-direction-assessment.netlify.app/mini/${name.toLowerCase()}`,
  emailSubject: (name, weekNum) => `${name}'s Week ${weekNum} Check-In Is Ready`,
};

export const MONTHLY_SCHEDULE = {
  dayOfMonth: 16,
  hour: 9,
  minute: 0,
  timezone: 'America/Los_Angeles',
  channels: ['sms', 'email'],
  recipients: WEEKLY_SCHEDULE.recipients,
  smsTemplate: (name, month) =>
    `${name} — it's the 16th. Monthly check-in time. This one matters — it feeds your mom's dashboard and tracks your real growth.\n\nYour check-in: https://life-direction-assessment.netlify.app/mini/${name.toLowerCase()}`,
  emailSubject: (name, month) => `${name}'s ${month} Monthly Check-In`,
};

// ─── PART 5: DYNAMIC MONTHLY MINI QUESTION GENERATION ────────────────────────

const MONTHLY_QUESTION_DRIVERS = {
  priorGoal: (data) => ({
    id: `dq_goal_${Date.now()}`,
    type: 'slider',
    text: `Last month your goal was: "${data.lastGoal?.title || 'your monthly goal'}". On a scale of 1–10, how well did you actually follow through on it?`,
    min: 1, max: 10,
    driver: 'priorGoal',
  }),
  weakestScore: (data) => {
    const entries = Object.entries(data.cores || {})
      .filter(([, v]) => v !== null)
      .sort(([, a], [, b]) => a - b);
    const weakest = entries[0]?.[0];
    const labelMap = {
      responsibility: 'showing up and following through',
      independence: 'handling things on your own',
      confidence: 'believing in yourself',
      commitment: 'sticking to what you said you would do',
      goalAlignment: 'taking daily steps toward your goals',
      avoidanceRisk: 'addressing problems before they get big',
    };
    const label = labelMap[weakest] ?? 'your biggest challenge area';
    return {
      id: `dq_weak_${Date.now()}`,
      type: 'slider',
      text: `Last month your lowest score was in ${label}. How much progress did you make on that this month? (1 = none, 10 = a lot)`,
      min: 1, max: 10,
      driver: 'weakestScore',
    };
  },
  weeklyTrends: (data) => {
    const recent = (data.weeklyScores || []).slice(-4);
    const avg = recent.length > 0 ? recent.reduce((a, b) => a + b, 0) / recent.length : 5;
    const trend = avg >= 70 ? 'improving' : avg >= 45 ? 'mixed' : 'dropping';
    return {
      id: `dq_trend_${Date.now()}`,
      type: 'multiple',
      text: `Your weekly check-ins this month have been ${trend}. What is the main reason for that?`,
      options: [
        'I\'ve been consistent and focused',
        'Things have been up and down',
        'Life got in the way — external factors',
        'Honestly, I\'ve been avoiding',
      ],
      driver: 'weeklyTrends',
    };
  },
  activeFlag: (data) => {
    const flag = (data.flags || [])[0];
    if (!flag) return null;
    const flagQuestions = {
      silent_suffering: { text: 'Is there something going on right now that you haven\'t told anyone about?', type: 'multiple', options: ['No — I\'ve been open', 'There\'s one thing I\'ve kept quiet', 'There\'s a lot I haven\'t said', 'I don\'t want to answer this'] },
      academic_shutdown: { text: 'When you got confused in class this month, what did you do?', type: 'multiple', options: ['Asked for help right away', 'Figured it out on my own', 'Let it slide and moved on', 'Stopped engaging with that class'] },
      financial_risk: { text: 'Did you gamble or bet any money this month?', type: 'multiple', options: ['No — stayed away from it', 'Small amount — under $20', 'More than I should have', 'More than last month'] },
    };
    const q = flagQuestions[flag.id];
    if (!q) return null;
    return {
      id: `dq_flag_${Date.now()}`,
      ...q,
      driver: 'activeFlag',
    };
  },
  alignmentCheck: (data) => ({
    id: `dq_align_${Date.now()}`,
    type: 'slider',
    text: 'This month — how aligned were your daily actions with the life you said you want to build?',
    min: 1, max: 10,
    driver: 'alignmentCheck',
  }),
  emotionalState: (data) => ({
    id: `dq_emotion_${Date.now()}`,
    type: 'multiple',
    text: 'How would you honestly describe your overall emotional state this month?',
    options: [
      'Good — I felt grounded and clear',
      'Up and down — some good weeks, some hard ones',
      'Struggling — carrying more than I showed',
      'This month was really hard and I need support',
    ],
    driver: 'emotionalState',
  }),
  nextMonthIntent: (data) => ({
    id: `dq_intent_${Date.now()}`,
    type: 'text',
    text: 'What is one specific thing you want to do differently next month?',
    driver: 'nextMonthIntent',
  }),
};

export function generateNextMonthQuestions(allData) {
  const questions = [];

  for (const [driver, fn] of Object.entries(MONTHLY_QUESTION_DRIVERS)) {
    try {
      const q = fn(allData);
      if (q) questions.push(q);
    } catch {
      // Skip driver if it errors
    }
  }

  return questions.slice(0, 8); // Cap at 8 questions
}

// ─── PART 6: MONTHLY GROWTH IMPLEMENTATION SCORE ─────────────────────────────

const IMPLEMENTATION_LEVELS = [
  { min: 85, label: 'Elite Execution', description: 'You did what you said. That\'s rare. Build on it.' },
  { min: 70, label: 'Solid Growth', description: 'More good weeks than bad. The pattern is forming.' },
  { min: 55, label: 'Partial Follow-Through', description: 'You started things you didn\'t finish. That\'s the main pattern to address.' },
  { min: 40, label: 'Inconsistent', description: 'Some progress, but the effort wasn\'t sustained. What\'s getting in the way?' },
  { min: 0,  label: 'Off Track', description: 'This month didn\'t go the way we planned. Let\'s talk about why before we plan the next one.' },
];

export function scoreMonthlyGrowthImplementation(data) {
  const { weeklyScores = [], monthlyCheckInScore = null, goalCompletionRate = null } = data;

  const scores = [];

  if (weeklyScores.length > 0) {
    const weeklyAvg = weeklyScores.reduce((a, b) => a + b, 0) / weeklyScores.length;
    scores.push(weeklyAvg);
  }

  if (monthlyCheckInScore !== null) scores.push(monthlyCheckInScore);
  if (goalCompletionRate !== null) scores.push(goalCompletionRate * 100);

  if (scores.length === 0) return null;

  const overall = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const level = IMPLEMENTATION_LEVELS.find(l => overall >= l.min) ?? IMPLEMENTATION_LEVELS.at(-1);

  return {
    score: overall,
    level: level.label,
    description: level.description,
    weeklyAvg: weeklyScores.length > 0
      ? Math.round(weeklyScores.reduce((a, b) => a + b, 0) / weeklyScores.length)
      : null,
    trend: weeklyScores.length >= 2
      ? weeklyScores.at(-1) > weeklyScores[0] ? 'up' : weeklyScores.at(-1) < weeklyScores[0] ? 'down' : 'flat'
      : null,
  };
}

// ─── PART 7: ENCOURAGEMENT ENGINE ────────────────────────────────────────────

const ENCOURAGEMENT_BANK = {
  lockedIn: [
    'You showed up this week when you could have found a reason not to. That\'s the version of you that wins.',
    'The work you put in this week doesn\'t look like much from the outside. But you know what it cost. It counts.',
    'Consistency is boring until it isn\'t. You\'re building something real right now.',
  ],
  improving: [
    'Moving in the right direction is underrated. Keep going — the momentum builds.',
    'You\'re trending up. Don\'t stop to celebrate yet — just keep the foot on the gas.',
    'Every week you improve is a week you didn\'t give up. That matters more than you know.',
  ],
  struggling: [
    'You\'re going through something. And you\'re still here. That\'s not small.',
    'The fact that you checked in — even when it was hard — means something. Don\'t disappear.',
    'Some weeks you just survive. That\'s okay. Surviving is not the same as losing.',
  ],
  offTrack: [
    'You know it didn\'t go well this week. So do I. Now here\'s the question: what\'s one thing we change tomorrow?',
    'The week is over. You can\'t fix it. But you\'re not out. One decision today changes the next week.',
    'Not the week you wanted. Not the week you needed. But you\'re reading this — which means you haven\'t checked out.',
  ],
};

export function buildMonthlyEncouragement(data) {
  const { weeklyScore, trend, flags = [] } = data;

  const isStruggling = flags.some(f => f.severity === 'high') || (weeklyScore !== null && weeklyScore < 45);
  const isLockedIn = weeklyScore !== null && weeklyScore >= 75;
  const isImproving = trend === 'up' && !isLockedIn;
  const isOffTrack = weeklyScore !== null && weeklyScore < 30;

  let bank;
  if (isOffTrack) bank = ENCOURAGEMENT_BANK.offTrack;
  else if (isStruggling) bank = ENCOURAGEMENT_BANK.struggling;
  else if (isLockedIn) bank = ENCOURAGEMENT_BANK.lockedIn;
  else if (isImproving) bank = ENCOURAGEMENT_BANK.improving;
  else bank = ENCOURAGEMENT_BANK.struggling;

  const idx = Math.floor(Date.now() / 1000) % bank.length;
  return bank[idx];
}

// ─── PART 8: MONTHLY OUTPUT OBJECT ───────────────────────────────────────────

export function buildMonthlyOutput(data) {
  const { userId, month, weeklyResets = [], monthlyCheckIn = {}, assessmentData = {}, lastGoal = null } = data;

  const weeklyScores = weeklyResets
    .map(r => r.score?.score)
    .filter(s => s !== null && s !== undefined);

  const growthScore = scoreMonthlyGrowthImplementation({
    weeklyScores,
    monthlyCheckInScore: monthlyCheckIn.alignmentScore ?? null,
    goalCompletionRate: monthlyCheckIn.goalCompletionRate ?? null,
  });

  const encouragement = buildMonthlyEncouragement({
    weeklyScore: weeklyScores.at(-1) ?? null,
    trend: growthScore?.trend ?? null,
    flags: assessmentData.flags ?? [],
  });

  const nextGoal = buildMonthlyManGoal(assessmentData);
  const nextQuestions = generateNextMonthQuestions({
    lastGoal,
    cores: assessmentData.cores ?? {},
    flags: assessmentData.flags ?? [],
    weeklyScores,
  });

  return {
    userId,
    month,
    growthScore,
    encouragement,
    nextGoal,
    nextQuestions,
    weeklyResets,
    summary: {
      weeksCheckedIn: weeklyResets.length,
      averageWeeklyScore: weeklyScores.length > 0
        ? Math.round(weeklyScores.reduce((a, b) => a + b, 0) / weeklyScores.length)
        : null,
      flags: assessmentData.flags ?? [],
    },
    generatedAt: new Date().toISOString(),
  };
}

// ─── PART 9: AI PROMPT BUILDERS ───────────────────────────────────────────────

export function buildWeeklyResetResponse(data) {
  const { userId, weekNumber, answers, weeklyReset, score, monthlyGoal, previousWeeks = [] } = data;

  const answersFormatted = Object.entries(answers)
    .map(([k, v]) => `[${k}]: ${JSON.stringify(v)}`)
    .join('\n');

  const prevContext = previousWeeks.length > 0
    ? `\n\nPREVIOUS WEEKS THIS MONTH:\n${previousWeeks.map((w, i) =>
        `Week ${i + 1}: Score ${w.score?.score ?? 'N/A'} — Status: ${w.score?.status ?? 'N/A'}`
      ).join('\n')}`
    : '';

  return `WEEKLY RESET — MEKHI — WEEK ${weekNumber}

MONTHLY GOAL: ${monthlyGoal?.title ?? 'N/A'} — ${monthlyGoal?.description ?? ''}

THIS WEEK'S ANSWERS:
${answersFormatted}

WEEK SCORE: ${score?.score ?? 'N/A'}/100 — Status: ${score?.status ?? 'N/A'}
${prevContext}

Based on these answers, give Mekhi a SHORT (4–6 sentence) direct response. Acknowledge what he actually said. Note any patterns. If something is off, name it directly but without shame. End with one specific thing to focus on next week.

Do NOT give a lecture. Do NOT be soft. Speak to him like you know him — because you do.`;
}

export function buildMonthlyCheckInResponse(data) {
  const { userId, month, monthlyOutput, assessmentData = {} } = data;

  const flags = (assessmentData.flags ?? [])
    .map(f => `- ${f.label} (${f.severity}): ${f.message}`)
    .join('\n');

  return `MONTHLY CHECK-IN ANALYSIS — MEKHI — ${month}

GROWTH SCORE: ${monthlyOutput.growthScore?.score ?? 'N/A'}/100 — ${monthlyOutput.growthScore?.level ?? 'N/A'}
AVERAGE WEEKLY SCORE: ${monthlyOutput.summary.averageWeeklyScore ?? 'N/A'}/100
WEEKS CHECKED IN: ${monthlyOutput.summary.weeksCheckedIn}/4

ACTIVE FLAGS:
${flags || 'None currently active'}

NEXT MONTH GOAL: ${monthlyOutput.nextGoal?.title ?? 'N/A'}

Based on this month's data, provide Mekhi's monthly growth summary in this format:

1. What changed this month (2–3 sentences, specific to his data)
2. What stayed the same or got worse (name it directly)
3. What his scores actually mean for his path forward
4. One thing to lock in next month before anything else
5. A direct message to him — real talk, not a pep talk

Keep it under 250 words. Speak directly to him.`;
}

// ─── PART 10: AI API CALLS ────────────────────────────────────────────────────

export async function getWeeklyResetAIResponse(data) {
  const prompt = buildWeeklyResetResponse(data);

  const response = await fetch('/.netlify/functions/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: 'mekhi',
      systemPrompt: 'You are Mekhi\'s dedicated AI guide. You know everything about him. You speak directly, honestly, and with respect. You are not a chatbot. You are the system his mom built for him.',
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) throw new Error('Weekly AI response failed');
  const data2 = await response.json();
  return data2.content;
}

export async function getMonthlyCheckInAIResponse(data) {
  const prompt = buildMonthlyCheckInResponse(data);

  const response = await fetch('/.netlify/functions/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: 'mekhi',
      systemPrompt: 'You are Mekhi\'s dedicated AI guide. You know everything about him. You speak directly, honestly, and with respect. You are not a chatbot. You are the system his mom built for him.',
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) throw new Error('Monthly AI response failed');
  const data2 = await response.json();
  return data2.content;
}
