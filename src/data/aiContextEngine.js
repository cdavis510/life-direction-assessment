/**
 * aiContextEngine.js
 * AI Brain — Full Context Model + Enhancement Engines
 *
 * Parts:
 *   1. Master context object shape (aiContext template)
 *   2. Academic context object shape (Mekhi-specific)
 *   3. Context builder functions
 *   4. Pattern Memory Engine
 *   5. Drift Detection Engine
 *   6. Identity Gap Engine
 *   7. Truth Layer
 *   8. Priority Engine
 *   9. Growth Reinforcement Engine
 *  10. Risk Escalation Engine
 *  11. Son/Mom Cross-Insight Engine
 *  12. UI Card data builders (Identity Lock, Hard Truth, Priority Focus, etc.)
 *
 * Rule: The AI must always evaluate the FULL PICTURE.
 * Self-report answers are ONE input. Academic data, behavior trends,
 * contradiction flags, and prior history all carry equal or greater weight.
 */


// ============================================================
// PART 1 — MASTER CONTEXT SHAPE
// ============================================================

/**
 * AI_CONTEXT_TEMPLATE
 * The canonical shape of the full context object passed to all AI functions.
 * Each field is optional — engines degrade gracefully when data is missing.
 */
export const AI_CONTEXT_TEMPLATE = {
  userType: '',                   // 'mekhi' | 'melvin' | 'mom'
  userId: '',

  // Core identity and profile
  profile: {
    name: '',
    age: null,
    location: '',
    keyTraits: [],
    communicationStyle: '',
  },

  // Raw assessment data
  assessmentAnswers: [],           // [{ questionId, answer, sectionId }]
  sectionScores: {},               // { section_1: 72, section_2: 68, ... }
  coreScores: {},                  // { communicationScore: 71, ... }

  // Detection outputs
  flags: [],                       // string[] — triggered red flag labels
  contradictions: [],              // [{ id, description, questions, flag }]

  // Identity and goals
  identityProfile: {
    futureIdentityStatement: '',   // "I want to be known as..."
    lifeBlueprint: {},
    careerMatches: [],
    motivationAnchors: {
      lifestyle: [],
      family: [],
      career: [],
      identity: [],
    },
  },

  // Monthly and weekly tracking
  weeklyResetHistory: [],          // [{ week, goals, completedCount, notes }]
  monthlyAssessmentHistory: [],    // [{ month, sectionScores, coreScores, flags }]

  // Academic context (Mekhi — high-value, overrides self-report when present)
  academicContext: {
    currentGrades: [],             // [{ course, grade, status: 'passing'|'failing'|'at_risk' }]
    missingAssignments: [],        // [{ course, count, dueDate }]
    attendanceIssues: [],          // [{ course, absences, tardies }]
    teacherNotes: [],              // [{ course, note, date }]
    lastUpdated: '',
  },

  // Relational context (Mom)
  supportContext: {
    primaryRelationships: [],
    communicationQuality: {},
    trustSignals: [],
  },

  // Computed trend objects (populated by engines below)
  behaviorTrends: {},
  communicationPatterns: {},
  riskPatterns: {},
  progressPatterns: {},
};


// ============================================================
// PART 2 — ACADEMIC CONTEXT (Mekhi Rule)
// ============================================================

/**
 * ACADEMIC_CONTEXT_RULES
 *
 * Permanent rule: For Mekhi, if academic data is available, it carries
 * stronger weight than self-report alone in these five areas:
 *
 * 1. Final result generation
 * 2. College path recommendation
 * 3. Monthly mini-assessment question generation
 * 4. Academic recovery analysis
 * 5. Weekly reset emphasis
 *
 * The AI must:
 * - Use grade data to validate or challenge self-report answers
 * - Detect denial or minimization (e.g., says he's "doing okay" but is failing 4 courses)
 * - Strengthen academic recovery scoring based on actual data
 * - Identify urgency by individual class
 * - Identify patterns of avoidance, confusion, or shutdown
 */
export const ACADEMIC_CONTEXT_RULES = {
  enabled: true,
  applyBefore: [
    'final_result_generation',
    'college_recommendation',
    'monthly_question_generation',
    'academic_recovery_analysis',
    'weekly_reset_emphasis',
  ],
  overridesSelfReport: true,
  detectionTargets: [
    'denial',
    'minimization',
    'avoidance_pattern',
    'confusion_pattern',
    'shutdown_pattern',
  ],
  urgencyThresholds: {
    failing: { grade: 59, label: 'URGENT', action: 'Address this week' },
    at_risk: { grade: 70, label: 'HIGH_RISK', action: 'Address this month' },
    passing: { grade: 71, label: 'MONITOR', action: 'Check-in next session' },
  },
};

/**
 * buildAcademicSummary
 * Converts academic context into a plain-language prompt block for AI injection.
 *
 * @param {Object} academicContext — shape of AI_CONTEXT_TEMPLATE.academicContext
 * @returns {string} — formatted academic summary block
 */
export function buildAcademicSummary(academicContext) {
  if (!academicContext || !academicContext.currentGrades?.length) {
    return 'Academic data: not yet provided. Use self-report answers only.';
  }

  const { currentGrades, missingAssignments, attendanceIssues, teacherNotes, lastUpdated } = academicContext;

  const gradeLines = currentGrades.map(
    (g) => `  ${g.course}: ${g.grade ?? 'N/A'} — ${(g.status ?? 'unknown').toUpperCase()}`
  );

  const missingLines = missingAssignments.map(
    (m) => `  ${m.course}: ${m.count} missing assignment(s)`
  );

  const attendanceLines = attendanceIssues.map(
    (a) => `  ${a.course}: ${a.absences ?? 0} absences, ${a.tardies ?? 0} tardies`
  );

  const noteLines = teacherNotes.map(
    (n) => `  ${n.course} (${n.date ?? 'undated'}): "${n.note}"`
  );

  const urgentCourses = currentGrades
    .filter((g) => g.status === 'failing')
    .map((g) => g.course);

  return [
    `== ACADEMIC CONTEXT (last updated: ${lastUpdated || 'unknown'}) ==`,
    '',
    'CURRENT GRADES:',
    ...gradeLines,
    '',
    missingLines.length ? 'MISSING ASSIGNMENTS:\n' + missingLines.join('\n') : '',
    attendanceLines.length ? 'ATTENDANCE ISSUES:\n' + attendanceLines.join('\n') : '',
    noteLines.length ? 'TEACHER NOTES:\n' + noteLines.join('\n') : '',
    '',
    urgentCourses.length
      ? `⚠ URGENT COURSES (failing): ${urgentCourses.join(', ')}`
      : 'No courses currently at failing status.',
    '',
    'RULE: If self-report answers conflict with this academic data, trust the academic data.',
    'Flag any minimization or denial detected in self-report.',
  ]
    .filter(Boolean)
    .join('\n');
}


// ============================================================
// PART 3 — CONTEXT BUILDER
// ============================================================

/**
 * buildAIContext
 *
 * Assembles the full aiContext object from raw user data.
 * Runs all available engines and returns enriched context.
 *
 * @param {Object} userData — raw data from Firestore / assessment
 * @returns {Object} — enriched aiContext
 */
export function buildAIContext(userData) {
  const base = {
    ...AI_CONTEXT_TEMPLATE,
    ...userData,
  };

  // Run all enhancement engines
  const behaviorTrends = runPatternMemoryEngine(base);
  const driftReport = runDriftDetection(base);
  const identityGap = runIdentityGapEngine(base);
  const hardTruth = runTruthLayer(base);
  const priority = runPriorityEngine(base);
  const growthReinforcement = runGrowthReinforcementEngine(base);
  const riskEscalation = runRiskEscalationEngine(base);

  return {
    ...base,
    behaviorTrends,
    riskPatterns: {
      ...base.riskPatterns,
      driftReport,
      riskEscalation,
    },
    progressPatterns: {
      ...base.progressPatterns,
      growthReinforcement,
    },
    identityProfile: {
      ...base.identityProfile,
      identityGap,
    },
    aiInsights: {
      hardTruth,
      priority,
      driftDetected: driftReport.driftDetected,
      riskLevel: riskEscalation.currentRiskLevel,
    },
  };
}


// ============================================================
// PART 4 — PATTERN MEMORY ENGINE
// ============================================================

/**
 * runPatternMemoryEngine
 *
 * Tracks repeated weak spots, repeated growth, and cross-session patterns.
 * Requires monthlyAssessmentHistory with at least 2 entries for pattern detection.
 *
 * @param {Object} ctx — aiContext
 * @returns {Object} behaviorTrends
 */
export function runPatternMemoryEngine(ctx) {
  const history = ctx.monthlyAssessmentHistory ?? [];

  if (history.length < 2) {
    return {
      dataPoints: history.length,
      repeatedWeakSpots: [],
      repeatedStrengths: [],
      patternAlerts: [],
      note: 'Insufficient history for pattern detection — minimum 2 sessions required',
    };
  }

  const scoreKeys = Object.keys(history[0]?.coreScores ?? {});
  const repeatedWeakSpots = [];
  const repeatedStrengths = [];
  const patternAlerts = [];

  for (const key of scoreKeys) {
    const values = history.map((h) => h.coreScores?.[key]).filter((v) => v !== undefined);
    if (values.length < 2) continue;

    const isConsistentlyLow = values.every((v) => v < 55);
    const isConsistentlyHigh = values.every((v) => v >= 70);
    const latestTrend = values[values.length - 1] - values[0];

    if (isConsistentlyLow) {
      repeatedWeakSpots.push({
        area: key,
        sessionCount: values.length,
        avgScore: Math.round(values.reduce((s, v) => s + v, 0) / values.length),
        alert: values.length >= 2 ? 'REPEATED_PATTERN' : null,
      });
      if (values.length >= 2) {
        patternAlerts.push({
          type: 'repeated_weak_spot',
          area: key,
          message: `${key} has been consistently low across ${values.length} sessions. This is a pattern, not a bad day.`,
          urgency: values.length >= 3 ? 'high' : 'medium',
        });
      }
    }

    if (isConsistentlyHigh) {
      repeatedStrengths.push({ area: key, avgScore: Math.round(values.reduce((s, v) => s + v, 0) / values.length) });
    }

    // Declining trend
    if (latestTrend < -10) {
      patternAlerts.push({
        type: 'declining_trend',
        area: key,
        message: `${key} has declined by ${Math.abs(latestTrend)} points since the first session.`,
        urgency: latestTrend < -20 ? 'high' : 'medium',
      });
    }

    // Improving trend
    if (latestTrend > 10) {
      patternAlerts.push({
        type: 'improving_trend',
        area: key,
        message: `${key} has improved by ${latestTrend} points. Name this growth explicitly.`,
        urgency: 'positive',
      });
    }
  }

  return {
    dataPoints: history.length,
    repeatedWeakSpots,
    repeatedStrengths,
    patternAlerts,
  };
}


// ============================================================
// PART 5 — DRIFT DETECTION ENGINE
// ============================================================

/**
 * runDriftDetection
 *
 * Detects when stated goals and actual behavior stop matching.
 * Compares identityProfile goals against current scores and behavioral answers.
 *
 * @param {Object} ctx — aiContext
 * @returns {Object} driftReport
 */
export function runDriftDetection(ctx) {
  const goals = ctx.identityProfile?.lifeBlueprint ?? {};
  const coreScores = ctx.coreScores ?? {};
  const history = ctx.monthlyAssessmentHistory ?? [];
  const driftSignals = [];
  let driftDetected = false;

  // Check: high ambition goals vs low execution scores
  if (goals.careerAmbitionLevel === 'high' && (coreScores.consistencyScore ?? 100) < 50) {
    driftSignals.push({
      area: 'Career execution',
      goal: 'High career ambition stated',
      behavior: `Consistency score: ${coreScores.consistencyScore}`,
      gap: 'Goals and daily behavior are misaligned',
    });
    driftDetected = true;
  }

  // Check: wants strong relationships but low communication score (mom context)
  if (ctx.userType === 'mom' && goals.relationshipGoals?.length > 0 && (coreScores.communicationScore ?? 100) < 55) {
    driftSignals.push({
      area: 'Relationship goals vs communication behavior',
      goal: 'Wants stronger relationship with sons',
      behavior: `Communication score: ${coreScores.communicationScore}`,
      gap: 'Relationship goals require direct communication patterns not currently present',
    });
    driftDetected = true;
  }

  // Check: historical score decline despite stated growth intention
  if (history.length >= 2) {
    const latest = history[history.length - 1]?.coreScores ?? {};
    const first = history[0]?.coreScores ?? {};
    const declinedAreas = Object.keys(latest).filter(
      (k) => first[k] !== undefined && latest[k] < first[k] - 8
    );
    if (declinedAreas.length > 0) {
      driftSignals.push({
        area: 'Score trajectory',
        goal: 'Improvement intended across all areas',
        behavior: `Declining: ${declinedAreas.join(', ')}`,
        gap: 'Scores declining in areas where growth was the stated goal',
      });
      driftDetected = true;
    }
  }

  // Check: Mekhi — academic context vs self-reported confidence
  if (ctx.userType === 'mekhi') {
    const failingCourses = (ctx.academicContext?.currentGrades ?? []).filter(
      (g) => g.status === 'failing'
    );
    const selfReportedConfidence = ctx.coreScores?.confidenceScore ?? null;
    if (failingCourses.length > 0 && selfReportedConfidence !== null && selfReportedConfidence > 65) {
      driftSignals.push({
        area: 'Academic self-assessment',
        goal: 'Reports confidence in academic situation',
        behavior: `Failing ${failingCourses.length} course(s): ${failingCourses.map((g) => g.course).join(', ')}`,
        gap: 'Self-reported confidence conflicts with academic reality — possible minimization or denial',
      });
      driftDetected = true;
    }
  }

  return {
    driftDetected,
    driftSignals,
    driftSeverity: driftSignals.length === 0 ? 'none'
      : driftSignals.length <= 1 ? 'low'
      : driftSignals.length <= 3 ? 'moderate'
      : 'high',
  };
}


// ============================================================
// PART 6 — IDENTITY GAP ENGINE
// ============================================================

/**
 * runIdentityGapEngine
 *
 * Compares "the person you said you want to become"
 * vs "the way you are currently living."
 *
 * @param {Object} ctx — aiContext
 * @returns {Object} identityGap
 */
export function runIdentityGapEngine(ctx) {
  const stated = ctx.identityProfile?.futureIdentityStatement ?? '';
  const coreScores = ctx.coreScores ?? {};
  const flags = ctx.flags ?? [];
  const gaps = [];

  if (!stated) {
    return {
      statedIdentity: null,
      currentBehaviorScore: null,
      gaps: [],
      gapSeverity: 'unknown',
      note: 'No future identity statement found — run Section 11 (Life Vision) first',
    };
  }

  // Derive what the stated identity requires
  const identityRequires = inferIdentityRequirements(stated, ctx.userType);

  // Check each requirement against current scores and flags
  for (const req of identityRequires) {
    const actualScore = coreScores[req.scoreKey] ?? null;
    const flagTriggered = flags.some((f) => req.relatedFlags?.includes(f));

    if (actualScore !== null && actualScore < req.minRequired) {
      gaps.push({
        requirement: req.label,
        minRequired: req.minRequired,
        current: actualScore,
        gap: req.minRequired - actualScore,
        message: `You said you want to be "${req.statedTrait}" — but your current ${req.scoreKey} score is ${actualScore}. That gap is the work.`,
      });
    }
    if (flagTriggered) {
      gaps.push({
        requirement: req.label,
        flagType: 'red_flag',
        message: `A red flag in "${req.label}" conflicts with your stated identity goal.`,
      });
    }
  }

  const avgGap = gaps.length > 0
    ? gaps.filter((g) => g.gap).reduce((s, g) => s + (g.gap ?? 0), 0) / gaps.filter((g) => g.gap).length
    : 0;

  return {
    statedIdentity: stated,
    gaps,
    gapSeverity: avgGap > 20 ? 'significant' : avgGap > 10 ? 'moderate' : avgGap > 0 ? 'small' : 'aligned',
    alignmentSummary: gaps.length === 0
      ? 'Current behavior aligns with stated identity goals'
      : `${gaps.length} gap(s) between stated identity and current behavior patterns`,
  };
}

function inferIdentityRequirements(statement, userType) {
  const requirements = [];
  const s = (statement ?? '').toLowerCase();

  if (userType === 'mekhi') {
    if (s.includes('sports') || s.includes('media') || s.includes('analyst')) {
      requirements.push({ label: 'Career follow-through', scoreKey: 'goalAlignmentScore', minRequired: 65, statedTrait: 'building a career in sports', relatedFlags: ['no_study_habits', 'academic_avoidance'] });
    }
    if (s.includes('independent') || s.includes('on my own')) {
      requirements.push({ label: 'Independence', scoreKey: 'independenceScore', minRequired: 60, statedTrait: 'independent', relatedFlags: ['avoidance_pattern'] });
    }
  }

  if (userType === 'melvin') {
    if (s.includes('finance') || s.includes('wealth') || s.includes('invest')) {
      requirements.push({ label: 'Finance discipline', scoreKey: 'accountabilityScore', minRequired: 70, statedTrait: 'working in finance', relatedFlags: [] });
    }
    if (s.includes('morehouse') || s.includes('graduate')) {
      requirements.push({ label: 'Academic readiness', scoreKey: 'consistencyScore', minRequired: 68, statedTrait: 'succeeding at Morehouse', relatedFlags: ['post_basketball_drift'] });
    }
  }

  if (userType === 'mom') {
    if (s.includes('relationship') || s.includes('connection')) {
      requirements.push({ label: 'Communication quality', scoreKey: 'communicationScore', minRequired: 65, statedTrait: 'having a real relationship with her sons', relatedFlags: ['avoids_hard_conversations'] });
    }
    if (s.includes('strong') || s.includes('accountability')) {
      requirements.push({ label: 'Consistency', scoreKey: 'consistencyScore', minRequired: 65, statedTrait: 'holding consistent standards', relatedFlags: ['inconsistent_discipline'] });
    }
  }

  return requirements;
}


// ============================================================
// PART 7 — TRUTH LAYER
// ============================================================

/**
 * runTruthLayer
 *
 * Generates ONE clear hard truth based on the highest-priority gap
 * between stated goals and actual behavior/scores.
 *
 * Every AI response must include this truth — named directly, not softened.
 *
 * @param {Object} ctx — aiContext
 * @returns {{ truth: string, evidenceBase: string[] }}
 */
export function runTruthLayer(ctx) {
  const coreScores = ctx.coreScores ?? {};
  const flags = ctx.flags ?? [];
  const history = ctx.monthlyAssessmentHistory ?? [];
  const userType = ctx.userType;

  // Find the lowest score
  const scoreEntries = Object.entries(coreScores).filter(([, v]) => v !== null && v !== undefined);
  if (scoreEntries.length === 0) {
    return { truth: 'Insufficient data to generate a truth statement.', evidenceBase: [] };
  }

  const [lowestKey, lowestVal] = scoreEntries.sort(([, a], [, b]) => a - b)[0];
  const evidenceBase = [];

  // Check academic override for Mekhi
  if (userType === 'mekhi') {
    const failingCount = (ctx.academicContext?.currentGrades ?? []).filter((g) => g.status === 'failing').length;
    if (failingCount > 0) {
      evidenceBase.push(`Failing ${failingCount} course(s) at Clark Atlanta`);
      const missingCount = (ctx.academicContext?.missingAssignments ?? []).reduce((s, m) => s + (m.count ?? 0), 0);
      if (missingCount > 0) evidenceBase.push(`${missingCount} missing assignment(s) across courses`);

      return {
        truth: `The school situation is more serious than your answers suggest. You are not struggling with motivation — you are in academic crisis. That is the thing that has to be addressed before everything else.`,
        evidenceBase,
      };
    }
  }

  // Build truth from lowest score
  const truthByScore = {
    communicationScore: 'The conversations you are avoiding are the ones that would change everything.',
    emotionalSupportScore: 'The emotional distance is visible to the people around you, even when you think you\'re hiding it.',
    accountabilityScore: 'The gap between what you say you will do and what you actually do is the thing holding you back.',
    boundaryScore: 'You keep absorbing what other people should be carrying. It is costing you and them.',
    consistencyScore: 'The rules change. The people around you know it. That inconsistency is louder than you think.',
    trustScore: 'The people closest to you do not fully trust that you will follow through. That trust has to be rebuilt by doing, not saying.',
    awarenessScore: 'You are operating on assumptions about the people you love. Some of those assumptions are wrong.',
    goalAlignmentScore: 'Your goals and your daily behavior are pointed in different directions.',
    independenceScore: 'You are not as ready to operate alone as you believe you are.',
    consistencyMelvin: 'The window before Morehouse is closing. What you build — or don\'t build — in these months follows you there.',
  };

  // Add evidence base
  if (history.length >= 2) {
    const prev = history[history.length - 2]?.coreScores?.[lowestKey];
    if (prev !== undefined && lowestVal < prev) {
      evidenceBase.push(`${lowestKey} dropped from ${prev} to ${lowestVal} since last session`);
    }
  }
  if (flags.length > 0) {
    evidenceBase.push(`${flags.length} red flag(s) triggered in this assessment`);
  }

  return {
    truth: truthByScore[lowestKey] ?? `Your ${lowestKey.replace('Score', '').replace(/([A-Z])/g, ' $1').trim()} is the real area of work right now.`,
    evidenceBase,
    lowestScoreArea: lowestKey,
    lowestScoreValue: lowestVal,
  };
}


// ============================================================
// PART 8 — PRIORITY ENGINE
// ============================================================

/**
 * runPriorityEngine
 *
 * Selects the ONE most important thing to fix first.
 * Factors: score severity, flag count, academic urgency, repeated pattern count.
 *
 * @param {Object} ctx — aiContext
 * @returns {{ priorityArea: string, reason: string, nextBestMove: string }}
 */
export function runPriorityEngine(ctx) {
  const coreScores = ctx.coreScores ?? {};
  const flags = ctx.flags ?? [];
  const behaviorTrends = ctx.behaviorTrends ?? {};
  const userType = ctx.userType;

  // Academic emergency override (Mekhi)
  if (userType === 'mekhi') {
    const failingCourses = (ctx.academicContext?.currentGrades ?? []).filter(
      (g) => g.status === 'failing'
    );
    if (failingCourses.length > 0) {
      return {
        priorityArea: 'Academic recovery',
        reason: `Failing ${failingCourses.length} course(s). This is the only thing that matters before anything else can be addressed.`,
        nextBestMove: `Contact Clark Atlanta academic advisor this week. Get the list of what can still be recovered this semester. Make one decision: recover or transition — but make it with full information.`,
        urgency: 'critical',
      };
    }
  }

  // Score-based priority
  const scoreEntries = Object.entries(coreScores)
    .filter(([, v]) => v !== null && v !== undefined)
    .sort(([, a], [, b]) => a - b);

  if (scoreEntries.length === 0) {
    return { priorityArea: 'Complete assessment', reason: 'Insufficient data', nextBestMove: 'Complete all sections before priority analysis', urgency: 'low' };
  }

  const [topPriorityKey, topPriorityVal] = scoreEntries[0];
  const repeatedPatterns = (behaviorTrends.repeatedWeakSpots ?? []).map((r) => r.area);
  const isRepeated = repeatedPatterns.includes(topPriorityKey);

  const nextMovesMap = {
    communicationScore: 'Have one hard, scheduled conversation this week. Not a check-in — a real conversation.',
    emotionalSupportScore: 'Add one moment of no-agenda connection per son this week — not tied to behavior or performance.',
    accountabilityScore: 'Write down three non-negotiables. Share them explicitly. Enforce the first one.',
    boundaryScore: 'Identify one responsibility you are carrying that belongs to someone else. Stop carrying it.',
    consistencyScore: 'Pick one rule that has been bending. Hold it without exception this week.',
    trustScore: 'Name one thing you said you would do and did not. Address that gap directly.',
    awarenessScore: 'Ask one question per son this week that you do not already know the answer to.',
    goalAlignmentScore: 'Identify what you actually did yesterday that moved toward your goal. If nothing — that is the problem.',
    independenceScore: 'Identify one task you are still having someone else handle. Own it this week.',
  };

  return {
    priorityArea: topPriorityKey.replace('Score', '').replace(/([A-Z])/g, ' $1').trim(),
    priorityScoreKey: topPriorityKey,
    currentScore: topPriorityVal,
    reason: isRepeated
      ? `This has been the lowest area across multiple sessions. It is a pattern, not a phase.`
      : `Lowest current score. Improvement here has the highest ripple effect.`,
    nextBestMove: nextMovesMap[topPriorityKey] ?? 'Focus all energy on this area for the next 7 days.',
    urgency: topPriorityVal < 45 ? 'critical' : topPriorityVal < 58 ? 'high' : 'medium',
    isRepeatedPattern: isRepeated,
  };
}


// ============================================================
// PART 9 — GROWTH REINFORCEMENT ENGINE
// ============================================================

/**
 * runGrowthReinforcementEngine
 *
 * If a user improved since the last session, the AI must name the exact growth.
 * Never let improvement go unacknowledged.
 *
 * @param {Object} ctx — aiContext
 * @returns {Object} growthReinforcement
 */
export function runGrowthReinforcementEngine(ctx) {
  const history = ctx.monthlyAssessmentHistory ?? [];

  if (history.length < 2) {
    return {
      hasGrowth: false,
      growthItems: [],
      note: 'No prior session for comparison',
    };
  }

  const current = history[history.length - 1]?.coreScores ?? {};
  const previous = history[history.length - 2]?.coreScores ?? {};
  const growthItems = [];

  for (const [key, currentVal] of Object.entries(current)) {
    const prevVal = previous[key];
    if (prevVal === undefined) continue;
    const delta = currentVal - prevVal;

    if (delta >= 8) {
      growthItems.push({
        area: key.replace('Score', '').replace(/([A-Z])/g, ' $1').trim(),
        scoreKey: key,
        previous: prevVal,
        current: currentVal,
        delta,
        reinforcementMessage: buildGrowthMessage(key, delta),
      });
    }
  }

  return {
    hasGrowth: growthItems.length > 0,
    growthItems,
    topGrowthArea: growthItems.length > 0
      ? growthItems.sort((a, b) => b.delta - a.delta)[0]
      : null,
  };
}

function buildGrowthMessage(scoreKey, delta) {
  const messages = {
    communicationScore: `Your communication improved by ${delta} points. You started having the conversations you were avoiding. That is not small.`,
    emotionalSupportScore: `Your emotional presence score went up by ${delta} points. The people around you felt that shift, even if they didn't name it.`,
    accountabilityScore: `Your accountability score improved by ${delta} points. You followed through where you previously didn't. That earns real trust.`,
    boundaryScore: `Your boundary score improved by ${delta} points. You stopped carrying things that weren't yours. That takes real work.`,
    consistencyScore: `Your consistency improved by ${delta} points. The rules held more than they bent. That is what builds trust.`,
    trustScore: `Your relational trust score went up by ${delta} points. The connection is stronger. That came from showing up differently.`,
    awarenessScore: `Your awareness score improved by ${delta} points. You are seeing more clearly — your own patterns and theirs.`,
  };
  return messages[scoreKey] ?? `${scoreKey.replace('Score', '')} improved by ${delta} points. Name it. Own it. Keep going.`;
}


// ============================================================
// PART 10 — RISK ESCALATION ENGINE
// ============================================================

/**
 * runRiskEscalationEngine
 *
 * If repeated negative patterns continue, escalates urgency level.
 * Monitors emotional, academic, and discipline risk.
 *
 * @param {Object} ctx — aiContext
 * @returns {Object} riskEscalation
 */
export function runRiskEscalationEngine(ctx) {
  const history = ctx.monthlyAssessmentHistory ?? [];
  const flags = ctx.flags ?? [];
  const coreScores = ctx.coreScores ?? {};
  const userType = ctx.userType;
  const riskFactors = [];
  let baseRisk = 'low';

  // Flag-based risk
  if (flags.length >= 5) riskFactors.push({ type: 'high_flag_count', severity: 'high', label: `${flags.length} red flags triggered` });
  else if (flags.length >= 3) riskFactors.push({ type: 'moderate_flag_count', severity: 'medium', label: `${flags.length} red flags triggered` });

  // Academic risk (Mekhi)
  if (userType === 'mekhi') {
    const failingCount = (ctx.academicContext?.currentGrades ?? []).filter((g) => g.status === 'failing').length;
    if (failingCount >= 3) riskFactors.push({ type: 'academic_crisis', severity: 'critical', label: `Failing ${failingCount} courses — academic standing at risk` });
    else if (failingCount >= 1) riskFactors.push({ type: 'academic_risk', severity: 'high', label: `Failing ${failingCount} course(s)` });
  }

  // Repeated pattern risk (2+ sessions of same weak spot)
  if (history.length >= 2) {
    const allScoreKeys = Object.keys(history[0]?.coreScores ?? {});
    const repeatedLow = allScoreKeys.filter((k) =>
      history.slice(-2).every((h) => (h.coreScores?.[k] ?? 100) < 50)
    );
    if (repeatedLow.length >= 2) {
      riskFactors.push({ type: 'repeated_low_pattern', severity: 'high', label: `${repeatedLow.length} areas consistently low across 2+ sessions` });
    }
  }

  // Low score risk
  const criticallyLow = Object.entries(coreScores).filter(([, v]) => v < 40);
  if (criticallyLow.length >= 2) {
    riskFactors.push({ type: 'multiple_critical_scores', severity: 'high', label: `${criticallyLow.length} scores below 40` });
  }

  // Determine overall risk level
  if (riskFactors.some((r) => r.severity === 'critical')) baseRisk = 'critical';
  else if (riskFactors.filter((r) => r.severity === 'high').length >= 2) baseRisk = 'high';
  else if (riskFactors.some((r) => r.severity === 'high')) baseRisk = 'elevated';
  else if (riskFactors.some((r) => r.severity === 'medium')) baseRisk = 'medium';

  return {
    currentRiskLevel: baseRisk,
    riskFactors,
    escalationRequired: ['critical', 'high', 'elevated'].includes(baseRisk),
    escalationMessage: baseRisk === 'critical'
      ? 'CRITICAL: Immediate intervention required. Do not wait for next assessment cycle.'
      : baseRisk === 'high'
      ? 'HIGH RISK: Address the flagged patterns in the current session, not the next one.'
      : null,
  };
}


// ============================================================
// PART 11 — SON/MOM CROSS-INSIGHT ENGINE
// ============================================================

/**
 * buildMomCrossInsightSummary
 *
 * Packages son assessment insights for Mom's AI without overloading
 * her with raw assessment detail. Gives her what she needs to act —
 * not what she needs to analyze.
 *
 * @param {Object} mekhiContext   — Mekhi's aiContext
 * @param {Object} melvinContext  — Melvin's aiContext
 * @returns {Object} momCrossInsight
 */
export function buildMomCrossInsightSummary(mekhiContext, melvinContext) {
  const buildSonSummary = (ctx, sonName) => {
    if (!ctx) return { sonName, status: 'No assessment data available' };

    const priority = runPriorityEngine(ctx);
    const risk = runRiskEscalationEngine(ctx);
    const growth = runGrowthReinforcementEngine(ctx);
    const truth = runTruthLayer(ctx);

    return {
      sonName,
      currentRiskLevel: risk.currentRiskLevel,
      topPriority: priority.priorityArea,
      topPriorityReason: priority.reason,
      whatHeNeedsMost: priority.nextBestMove,
      hardTruth: truth.truth,
      growthToAcknowledge: growth.hasGrowth
        ? growth.topGrowthArea?.reinforcementMessage
        : null,
      escalationFlag: risk.escalationRequired ? risk.escalationMessage : null,
      topFlags: (ctx.flags ?? []).slice(0, 3),
    };
  };

  return {
    mekhi: buildSonSummary(mekhiContext, 'Mekhi'),
    melvin: buildSonSummary(melvinContext, 'Melvin'),
    generatedAt: new Date().toISOString(),
    note: 'This summary is Mom-facing. It surfaces action and urgency — not raw scores.',
  };
}


// ============================================================
// PART 12 — UI CARD DATA BUILDERS
// ============================================================

/**
 * buildIdentityLockCard
 * Always shows the user's future identity statement.
 */
export function buildIdentityLockCard(ctx) {
  return {
    cardType: 'identity_lock',
    title: 'Your Future Identity',
    statement: ctx.identityProfile?.futureIdentityStatement ?? 'Complete the Life Vision section to unlock your identity statement.',
    subtext: 'This is who you said you are becoming. Every decision either moves toward this or away from it.',
    isLocked: !ctx.identityProfile?.futureIdentityStatement,
  };
}

/**
 * buildHardTruthCard
 * One sentence truth after results — cannot be skipped.
 */
export function buildHardTruthCard(ctx) {
  const truthData = runTruthLayer(ctx);
  return {
    cardType: 'hard_truth',
    title: 'The Hard Truth',
    truth: truthData.truth,
    evidenceBase: truthData.evidenceBase,
    instruction: 'Read this once. Then decide what you are going to do about it.',
  };
}

/**
 * buildPriorityFocusCard
 * One thing to work on now — not a list.
 */
export function buildPriorityFocusCard(ctx) {
  const priority = runPriorityEngine(ctx);
  return {
    cardType: 'priority_focus',
    title: 'Your #1 Focus Right Now',
    area: priority.priorityArea,
    reason: priority.reason,
    nextBestMove: priority.nextBestMove,
    urgency: priority.urgency,
    isRepeatedPattern: priority.isRepeatedPattern,
  };
}

/**
 * buildProgressMomentumCard
 * Shows trend: improving / flat / declining.
 */
export function buildProgressMomentumCard(ctx) {
  const history = ctx.monthlyAssessmentHistory ?? [];
  if (history.length < 2) {
    return { cardType: 'progress_momentum', trend: 'baseline', label: 'Starting Point', message: 'First session — your baseline is set. Come back next month to see your trajectory.' };
  }

  const growth = runGrowthReinforcementEngine(ctx);
  const risk = runRiskEscalationEngine(ctx);
  const current = history[history.length - 1]?.coreScores ?? {};
  const previous = history[history.length - 2]?.coreScores ?? {};
  const avgCurrent = Object.values(current).reduce((s, v) => s + v, 0) / Object.values(current).length;
  const avgPrevious = Object.values(previous).reduce((s, v) => s + v, 0) / Object.values(previous).length;
  const delta = avgCurrent - avgPrevious;

  let trend = 'flat';
  let label = 'Holding Steady';
  let message = 'No significant change since last session. Consistency is neutral — choose direction.';

  if (delta >= 5) { trend = 'improving'; label = 'Improving'; message = growth.topGrowthArea?.reinforcementMessage ?? 'Scores are up. Something is working. Keep it.'; }
  else if (delta <= -5) { trend = 'declining'; label = 'Declining'; message = risk.escalationMessage ?? 'Scores are down from last session. Find the reason before the next cycle.'; }

  return { cardType: 'progress_momentum', trend, label, delta: Math.round(delta), message, sessionCount: history.length };
}

/**
 * buildRepeatedPatternAlert
 * Warns when the same issue appears 2+ cycles.
 */
export function buildRepeatedPatternAlert(ctx) {
  const patterns = runPatternMemoryEngine(ctx);
  const alerts = (patterns.patternAlerts ?? []).filter((a) => a.type === 'repeated_weak_spot');

  if (alerts.length === 0) return null;

  return {
    cardType: 'repeated_pattern_alert',
    title: 'Pattern Alert',
    alerts: alerts.map((a) => ({
      area: a.area,
      message: a.message,
      urgency: a.urgency,
    })),
    instruction: 'This is not a bad stretch. This is a pattern. Patterns require a different approach than temporary fixes.',
  };
}

/**
 * buildHighRiskAlert
 * Fires when emotional, academic, or discipline risk spikes.
 */
export function buildHighRiskAlert(ctx) {
  const risk = runRiskEscalationEngine(ctx);
  if (!risk.escalationRequired) return null;

  return {
    cardType: 'high_risk_alert',
    riskLevel: risk.currentRiskLevel,
    factors: risk.riskFactors,
    message: risk.escalationMessage,
    callToAction: risk.currentRiskLevel === 'critical'
      ? 'This requires a real conversation this week — not next month.'
      : 'Address this in the current session.',
  };
}

/**
 * buildResetPlan
 * Generates a "start over this week" plan targeting the top priority area.
 */
export function buildResetPlan(ctx) {
  const priority = runPriorityEngine(ctx);

  const resetStructure = {
    day1: 'Identify the ONE thing you stopped doing that was working. Write it down.',
    day2: 'Do the first action from your priority area. Not all of them — just the first one.',
    day3: 'Check in: did the action happen? If yes, what was different? If no, what blocked it?',
    day4: 'Share your next move with one person who will hold you to it.',
    day5: 'Review: what did you actually do this week vs. what you said you would do?',
    day6: 'Rest. But make one note about what next week needs to look different.',
    day7: 'Set one commitment for the next 7 days. Specific. Measurable. No exceptions.',
  };

  return {
    cardType: 'reset_plan',
    title: 'Reset This Week',
    focusArea: priority.priorityArea,
    topPriorityAction: priority.nextBestMove,
    dailyStructure: resetStructure,
    note: 'This is a 7-day restart — not a month-long overhaul. One area, one week, full focus.',
  };
}

/**
 * buildNextBestMoveCard
 * One strategic action — not a list of ten.
 */
export function buildNextBestMoveCard(ctx) {
  const priority = runPriorityEngine(ctx);
  return {
    cardType: 'next_best_move',
    title: 'Your Next Best Move',
    move: priority.nextBestMove,
    area: priority.priorityArea,
    urgency: priority.urgency,
    why: priority.reason,
    timeframe: priority.urgency === 'critical' ? 'This week — no delay' : priority.urgency === 'high' ? 'This week' : 'This month',
  };
}
