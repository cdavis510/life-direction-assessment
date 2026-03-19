/**
 * aiResponseBuilder.js
 * AI Response Narrative Builders — Mekhi, Melvin, Mom
 *
 * Each builder:
 *   - Accepts a full aiContext object (from aiContextEngine.buildAIContext)
 *   - Returns a Claude API prompt payload: { systemPrompt, userMessage, expectedOutput }
 *   - Starts with personalized encouragement
 *   - Ends with personalized encouragement
 *   - Includes one honest hard truth
 *   - Includes one next best move
 *   - Uses tone profile from aiPersonas.AI_PERSONA_STYLES
 *   - Incorporates academic context if present (Mekhi)
 *
 * These functions AUGMENT the existing agent system prompts.
 * They do not replace MEKHI_SYSTEM_PROMPT, MELVIN_SYSTEM_PROMPT, or MOM_SYSTEM_PROMPT.
 * Those remain the full identity/context layer.
 * These builders add the structured data + response rules layer.
 *
 * Exports:
 *   buildMekhiResultsNarrative(context)
 *   buildMelvinResultsNarrative(context)
 *   buildMomResultsNarrative(context)   ← supplements momAgent.js version
 *   buildResponseRules(userType)
 */

import { getOpeningLine, getClosingLine, AI_PERSONA_STYLES } from './aiPersonas.js';
import {
  buildAcademicSummary,
  runTruthLayer,
  runPriorityEngine,
  runDriftDetection,
  runGrowthReinforcementEngine,
  runRiskEscalationEngine,
  runPatternMemoryEngine,
  buildIdentityLockCard,
} from './aiContextEngine.js';


// ============================================================
// GLOBAL AI RESPONSE RULES
// ============================================================

/**
 * buildResponseRules
 *
 * Hard structural rules injected into every AI response.
 * Every response MUST follow this structure:
 *   1. Opening encouragement (personalized)
 *   2. Honest assessment (what the data actually shows)
 *   3. What is working
 *   4. What is not working
 *   5. What matters most now (priority)
 *   6. Specific next action (one move, not a list)
 *   7. Closing encouragement (personalized)
 *
 * @param {'mekhi' | 'melvin' | 'mom'} userType
 * @returns {string}
 */
export function buildResponseRules(userType) {
  const style = AI_PERSONA_STYLES[userType] ?? AI_PERSONA_STYLES.mekhi;

  return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GLOBAL AI RESPONSE RULES — ALWAYS APPLY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REQUIRED RESPONSE STRUCTURE (in this order):
1. Opening encouragement — personalized, specific, earned
2. Honest assessment — what the data actually shows, not what they want to hear
3. What is working — genuine strengths with evidence
4. What is not working — the real gaps, named clearly
5. What matters most now — the ONE priority, not a list
6. Specific next action — one move, this week, no ambiguity
7. Closing encouragement — forward-facing, specific, not generic

HARD RULES:
- Never be generic. Every observation must connect to this specific person's data.
- Distinguish between: potential (what they could do) / intention (what they said they will do) / actual behavior (what they actually did). These are not the same.
- Use prior history to identify patterns. If something has appeared in 2+ sessions, it is a pattern — name it as such.
- Detect and name contradictions between self-report and behavior data.
- Every response must include ONE hard truth — direct, not softened.
- Every response must include ONE next best move — specific, time-bound.
- Explain WHY a weakness matters. Not just what it is — what it costs.
- Reinforce identity growth — connect every piece of feedback to who they are becoming.
- If academic context is available for Mekhi, it overrides self-report on academic topics.

TONE: ${style.voice}
ENERGY: ${style.energy}
AVOID: ${style.avoidWords.join(', ')}
AVOID PATTERNS: ${style.avoidPatterns.join('; ')}

MOTIVATION ANCHORS — use these to keep the person emotionally engaged:
- Lifestyle goals (the life they said they want)
- Family goals (who they are doing this for)
- Career goals (the specific path they named)
- Identity goals (the person they said they are becoming)
`;
}


// ============================================================
// MEKHI NARRATIVE BUILDER
// ============================================================

/**
 * buildMekhiResultsNarrative
 *
 * @param {Object} context — full aiContext from buildAIContext()
 * @returns {{ systemPrompt, userMessage, expectedOutput }}
 */
export function buildMekhiResultsNarrative(context) {
  const opening = getOpeningLine('mekhi');
  const closing = getClosingLine('mekhi');
  const truth = runTruthLayer(context);
  const priority = runPriorityEngine(context);
  const drift = runDriftDetection(context);
  const growth = runGrowthReinforcementEngine(context);
  const risk = runRiskEscalationEngine(context);
  const patterns = runPatternMemoryEngine(context);
  const identityCard = buildIdentityLockCard(context);
  const academicBlock = buildAcademicSummary(context.academicContext);

  const systemPrompt = buildMekhiSystemBlock(opening, closing);
  const userMessage = buildMekhiDataBlock({
    context, truth, priority, drift, growth, risk, patterns, identityCard, academicBlock,
  });

  return {
    systemPrompt,
    userMessage,
    expectedOutput: {
      format: 'structured_prose_with_sections',
      sections: [
        'opening_encouragement',
        'honest_assessment',
        'what_is_working',
        'what_is_not_working',
        'what_matters_most_now',
        'specific_next_action',
        'closing_encouragement',
      ],
      hardIncludes: [
        'one_hard_truth',
        'one_next_best_move',
        'academic_context_reference_if_available',
        'identity_connection',
      ],
      targetWordCount: { min: 500, max: 800 },
      tone: 'calm_mentor_grounded',
    },
  };
}

function buildMekhiSystemBlock(opening, closing) {
  return `You are Marcus, Mekhi's AI Life Coach. You are not a school counselor. You are not a test. You are the one space where he gets the truth — delivered with respect, not judgment.

Your opening for this response: "${opening}"
Your closing for this response: "${closing}"

${buildResponseRules('mekhi')}

MEKHI-SPECIFIC RULES:
- He shuts down under pressure. Do not pressure. Name truth calmly.
- Short to medium sentences. No walls of text.
- Connect observations to things he actually cares about: sports, analysis, working with his hands, being respected.
- His silence and avoidance are data. Read them. Name them gently.
- The academic situation at Clark Atlanta is real. If failing courses are present in the academic context, that is the lead.
- His gambling behavior (sports betting) is an intelligence signal AND a risk. Address both sides.
- He is not lazy. He is overwhelmed and has never learned how to ask for help. Do not call him lazy.
- Acknowledge any green shoots — things he is doing right, even small ones.
- End with something that feels like belief, not pressure.`;
}

function buildMekhiDataBlock({ context, truth, priority, drift, growth, risk, patterns, identityCard, academicBlock }) {
  const { coreScores = {}, sectionScores = {}, flags = [], contradictions = [], assessmentAnswers = [], weeklyResetHistory = [], monthlyAssessmentHistory = [] } = context;

  const historyBlock = monthlyAssessmentHistory.length > 1
    ? `PRIOR SESSIONS (${monthlyAssessmentHistory.length} total): ${monthlyAssessmentHistory.slice(0, -1).map((h, i) => `Session ${i + 1}: flags=${h.flags?.length ?? 0}, top risk=${Object.entries(h.coreScores ?? {}).sort(([, a], [, b]) => a - b)[0]?.[0] ?? 'unknown'}`).join(' | ')}`
    : 'FIRST SESSION — no prior history';

  const growthBlock = growth.hasGrowth
    ? `GROWTH SINCE LAST SESSION: ${growth.growthItems.map((g) => `${g.area}: +${g.delta} points`).join(', ')}`
    : 'No significant growth detected from prior session (or first session).';

  return `MEKHI'S FULL ASSESSMENT DATA — GENERATE RESPONSE

${academicBlock}

== CORE SCORES (0–100) ==
${Object.entries(coreScores).map(([k, v]) => `${k}: ${v}`).join('\n')}

== SECTION SCORES ==
${Object.entries(sectionScores).map(([k, v]) => `${k}: ${v}`).join('\n') || 'Not yet available'}

== FLAGS TRIGGERED ==
${flags.length > 0 ? flags.join(', ') : 'None'}

== CONTRADICTIONS DETECTED ==
${contradictions.length > 0 ? contradictions.map((c) => `- ${c.description ?? c.flag}`).join('\n') : 'None'}

== IDENTITY GOAL ==
${identityCard.statement}

== HARD TRUTH (pre-computed) ==
${truth.truth}
Evidence: ${truth.evidenceBase.join(', ') || 'Score patterns'}

== PRIORITY (pre-computed) ==
Area: ${priority.priorityArea}
Reason: ${priority.reason}
Next Best Move: ${priority.nextBestMove}
Urgency: ${priority.urgency}

== DRIFT DETECTION ==
Drift detected: ${drift.driftDetected}
${drift.driftSignals.map((d) => `- ${d.area}: ${d.gap}`).join('\n') || 'No significant drift'}

== RISK LEVEL ==
${risk.currentRiskLevel.toUpperCase()}
${risk.riskFactors.map((r) => `- ${r.label}`).join('\n') || 'No escalation factors'}

== PATTERNS ==
Repeated weak spots: ${patterns.repeatedWeakSpots?.map((r) => r.area)?.join(', ') || 'None detected'}
Repeated strengths: ${patterns.repeatedStrengths?.map((r) => r.area)?.join(', ') || 'None detected'}

${growthBlock}

${historyBlock}

---
Begin the response with the assigned opening line.
Include the hard truth — do not soften it.
Include the next best move — one specific action, this week.
End with the assigned closing line.
Make it real for him. He has been through more than his answers show.`;
}


// ============================================================
// MELVIN NARRATIVE BUILDER
// ============================================================

/**
 * buildMelvinResultsNarrative
 *
 * @param {Object} context — full aiContext from buildAIContext()
 * @returns {{ systemPrompt, userMessage, expectedOutput }}
 */
export function buildMelvinResultsNarrative(context) {
  const opening = getOpeningLine('melvin');
  const closing = getClosingLine('melvin');
  const truth = runTruthLayer(context);
  const priority = runPriorityEngine(context);
  const drift = runDriftDetection(context);
  const growth = runGrowthReinforcementEngine(context);
  const risk = runRiskEscalationEngine(context);
  const patterns = runPatternMemoryEngine(context);
  const identityCard = buildIdentityLockCard(context);

  const systemPrompt = buildMelvinSystemBlock(opening, closing);
  const userMessage = buildMelvinDataBlock({
    context, truth, priority, drift, growth, risk, patterns, identityCard,
  });

  return {
    systemPrompt,
    userMessage,
    expectedOutput: {
      format: 'structured_prose_with_sections',
      sections: [
        'opening_encouragement',
        'honest_assessment',
        'what_is_working',
        'what_is_not_working',
        'what_matters_most_now',
        'specific_next_action',
        'closing_encouragement',
      ],
      hardIncludes: [
        'one_hard_truth',
        'one_next_best_move',
        'dual_path_reference',
        'morehouse_readiness_assessment',
        'identity_connection',
      ],
      targetWordCount: { min: 500, max: 800 },
      tone: 'sharp_strategic_ambitious',
    },
  };
}

function buildMelvinSystemBlock(opening, closing) {
  return `You are Jordan, Melvin's AI Strategy Coach. You are direct, sharp, and you do not waste his time.

Your opening for this response: "${opening}"
Your closing for this response: "${closing}"

${buildResponseRules('melvin')}

MELVIN-SPECIFIC RULES:
- Treat him like a young professional, not a high schooler. He is not fragile.
- He is motivated by recognition, legacy, and building something real. Connect everything to that.
- Address the dual career path (Finance vs. Sports Business) without forcing a choice — help him see both clearly.
- The post-basketball motivation drop is real. Name it without shame. Frame it as information, not failure.
- His dyslexia means Morehouse will be harder than high school. Be honest about what that requires.
- His father's death, addiction history, and the family rejection are live context — reference when directly relevant, not gratuitously.
- His legacy goal: come back to Oakland as proof. 100 Black Men. Oakland Kids program. Connect to this.
- He does not need motivation. He needs clarity and execution structure.
- Do not use filler affirmations. Every sentence must earn its place.`;
}

function buildMelvinDataBlock({ context, truth, priority, drift, growth, risk, patterns, identityCard }) {
  const { coreScores = {}, sectionScores = {}, flags = [], contradictions = [], monthlyAssessmentHistory = [] } = context;

  const pathData = context.careerPathScores ?? {};
  const historyBlock = monthlyAssessmentHistory.length > 1
    ? `PRIOR SESSIONS: ${monthlyAssessmentHistory.length} sessions tracked`
    : 'FIRST SESSION';

  const growthBlock = growth.hasGrowth
    ? `GROWTH: ${growth.growthItems.map((g) => `${g.area} +${g.delta}`).join(', ')}`
    : 'No prior session growth data.';

  return `MELVIN'S FULL ASSESSMENT DATA — GENERATE RESPONSE

== CORE SCORES (0–100) ==
${Object.entries(coreScores).map(([k, v]) => `${k}: ${v}`).join('\n') || 'Not yet scored'}

== DUAL PATH SCORES ==
Finance Path Fit: ${pathData.financePathScore ?? 'N/A'}
Sports Business Path Fit: ${pathData.sportsBusinessScore ?? 'N/A'}
Hybrid Potential: ${pathData.hybridScore ?? 'N/A'}

== SECTION SCORES ==
${Object.entries(sectionScores).map(([k, v]) => `${k}: ${v}`).join('\n') || 'Not yet available'}

== FLAGS TRIGGERED ==
${flags.length > 0 ? flags.join(', ') : 'None'}

== CONTRADICTIONS ==
${contradictions.length > 0 ? contradictions.map((c) => `- ${c.description ?? c.flag}`).join('\n') : 'None'}

== IDENTITY GOAL ==
${identityCard.statement}

== HARD TRUTH ==
${truth.truth}
Evidence: ${truth.evidenceBase.join(', ') || 'Score patterns'}

== PRIORITY ==
Area: ${priority.priorityArea}
Reason: ${priority.reason}
Next Best Move: ${priority.nextBestMove}
Urgency: ${priority.urgency}

== DRIFT ==
${drift.driftDetected ? drift.driftSignals.map((d) => `- ${d.area}: ${d.gap}`).join('\n') : 'No significant drift detected'}

== RISK LEVEL ==
${risk.currentRiskLevel.toUpperCase()}
${risk.riskFactors.map((r) => `- ${r.label}`).join('\n') || 'No escalation factors'}

== PATTERNS ==
Repeated weak spots: ${patterns.repeatedWeakSpots?.map((r) => r.area)?.join(', ') || 'None'}
Repeated strengths: ${patterns.repeatedStrengths?.map((r) => r.area)?.join(', ') || 'None'}

${growthBlock}
${historyBlock}

---
Begin with the assigned opening. Include the hard truth. Name the next best move. Close with the assigned line.
He wants to come back to Oakland as proof. Keep that in the room with you while you write this.`;
}


// ============================================================
// MOM NARRATIVE BUILDER
// (Supplements momAgent.js — same structure, uses full aiContext)
// ============================================================

/**
 * buildMomResultsNarrative
 *
 * Context-engine version of the Mom narrative builder.
 * Supplements the simpler version in momAgent.js.
 * Use this when full aiContext is available.
 *
 * @param {Object} context — full aiContext from buildAIContext()
 * @returns {{ systemPrompt, userMessage, expectedOutput }}
 */
export function buildMomResultsNarrative(context) {
  const opening = getOpeningLine('mom');
  const closing = getClosingLine('mom');
  const truth = runTruthLayer(context);
  const priority = runPriorityEngine(context);
  const drift = runDriftDetection(context);
  const growth = runGrowthReinforcementEngine(context);
  const risk = runRiskEscalationEngine(context);
  const patterns = runPatternMemoryEngine(context);

  const systemPrompt = buildMomSystemBlock(opening, closing);
  const userMessage = buildMomDataBlock({
    context, truth, priority, drift, growth, risk, patterns,
  });

  return {
    systemPrompt,
    userMessage,
    expectedOutput: {
      format: 'structured_prose_with_sections',
      sections: [
        'opening_encouragement',
        'honest_assessment',
        'what_is_working',
        'what_is_not_working',
        'what_matters_most_now',
        'specific_next_action',
        'closing_encouragement',
      ],
      hardIncludes: [
        'one_hard_truth',
        'one_next_best_move',
        'blind_spot_reference',
        'mekhi_specific_guidance',
        'melvin_specific_guidance',
        'identity_connection',
      ],
      targetWordCount: { min: 600, max: 900 },
      tone: 'warm_strong_empowering',
    },
  };
}

function buildMomSystemBlock(opening, closing) {
  return `You are Renee, Mom's AI Family Leadership Coach. You are warm, direct, emotionally intelligent, and you do not soften the things that need to land.

Your opening for this response: "${opening}"
Your closing for this response: "${closing}"

${buildResponseRules('mom')}

MOM-SPECIFIC RULES:
- Always acknowledge what she is carrying before naming what needs to change.
- Her fear of losing her sons is real and deeply rooted. Never pathologize it. Work with it.
- Address Mekhi and Melvin specifically — not sons generically.
- Her blind spots require honest naming. She asked for this. Do not avoid them.
- She is smart and experienced (corporate, entrepreneurial). Speak at her level.
- Her health, her finances, and her mental load are real context. Reference with care.
- Connect every parenting insight to specific behavior change — not abstract principles.
- Every hard observation must be followed by a correction she can actually execute.
- She built this system for her sons. Acknowledge that. It is not a small thing.
- Do not end on a vague inspirational note. End on something specific and true.`;
}

function buildMomDataBlock({ context, truth, priority, drift, growth, risk, patterns }) {
  const { coreScores = {}, sectionScores = {}, flags = [], blindSpots = [], sonInsights = {}, monthlyAssessmentHistory = [], momProfile = {} } = context;

  const historyBlock = monthlyAssessmentHistory.length > 1
    ? `PRIOR SESSIONS: ${monthlyAssessmentHistory.length} sessions tracked`
    : 'FIRST SESSION';

  const growthBlock = growth.hasGrowth
    ? `GROWTH: ${growth.growthItems.map((g) => `${g.area} +${g.delta}`).join(', ')}`
    : 'No prior session growth data.';

  const blindSpotBlock = (blindSpots ?? []).length > 0
    ? (blindSpots ?? []).map((b) => `- ${b.label}: ${b.description}\n  Impact: ${b.impact}\n  Correction: ${b.correction}`).join('\n\n')
    : 'None above detection threshold';

  return `MOM'S FULL ASSESSMENT DATA — GENERATE RESPONSE

== CORE SCORES (0–100) ==
${Object.entries(coreScores).map(([k, v]) => `${k}: ${v}`).join('\n') || 'Not yet scored'}

== PARENTING PROFILE ==
Type: ${momProfile.type ?? 'Not yet detected'}
${momProfile.description ? `Description: ${momProfile.description}` : ''}

== SECTION SCORES ==
${Object.entries(sectionScores).map(([k, v]) => `${k}: ${v}`).join('\n') || 'Not yet available'}

== FLAGS TRIGGERED ==
${flags.length > 0 ? flags.join(', ') : 'None'}

== BLIND SPOTS ==
${blindSpotBlock}

== WHAT MEKHI NEEDS FROM HER ==
More of: ${(sonInsights.mekhi?.whatHeNeedsMoreOf ?? []).join(' | ') || 'N/A'}
Stop doing: ${(sonInsights.mekhi?.whatToStopDoing ?? []).join(' | ') || 'N/A'}
Risk areas: ${(sonInsights.mekhi?.riskAreas ?? []).join(' | ') || 'N/A'}

== WHAT MELVIN NEEDS FROM HER ==
More of: ${(sonInsights.melvin?.whatHeNeedsMoreOf ?? []).join(' | ') || 'N/A'}
Stop doing: ${(sonInsights.melvin?.whatToStopDoing ?? []).join(' | ') || 'N/A'}
Risk areas: ${(sonInsights.melvin?.riskAreas ?? []).join(' | ') || 'N/A'}

== HARD TRUTH ==
${truth.truth}
Evidence: ${truth.evidenceBase.join(', ') || 'Score patterns'}

== PRIORITY ==
Area: ${priority.priorityArea}
Reason: ${priority.reason}
Next Best Move: ${priority.nextBestMove}

== DRIFT ==
${drift.driftDetected ? drift.driftSignals.map((d) => `- ${d.area}: ${d.gap}`).join('\n') : 'No significant drift'}

== RISK LEVEL ==
${risk.currentRiskLevel.toUpperCase()}
${risk.riskFactors.map((r) => `- ${r.label}`).join('\n') || 'No escalation factors'}

== PATTERNS ==
Repeated weak spots: ${patterns.repeatedWeakSpots?.map((r) => r.area)?.join(', ') || 'None'}
${growthBlock}
${historyBlock}

---
Begin with the assigned opening. Be warm. Be honest. Name the blind spots clearly.
Give her specific guidance for Mekhi and specific guidance for Melvin — not combined.
One hard truth. One next best move. Close with the assigned line.
She is doing this because she loves them. Honor that in every paragraph.`;
}
