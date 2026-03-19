// ─── MELVIN SECTION 3 — RESPONSIBILITY & ACCOUNTABILITY ──────────────────────
// Built for Melvin Jr. — 17, Deep East Oakland, Morehouse-bound, Finance track.
// Probe: Does his self-image as a responsible, standards-driven person match
//        his actual behavior? Can he own decisions, not just describe values?
//
// Key tensions:
//   → "I do things the right way" vs. missing school days, motivation drop
//   → Track record of follow-through (4.2 GPA, basketball) vs. current drift
//   → Private carrying as strength vs. not asking for help as avoidance
//   → Loyalty to others vs. reliability to himself
//   → Awareness of consequences vs. proximity to them actually changing behavior
//   → "Senior slide is normal" as legitimate context vs. as an excuse
//
// CONTRADICTION TESTS IN THIS SECTION:
//   Section 2B said he has high standards → Section 3A/3B tests whether he owns
//   the gap between those standards and current behavior
//   Section 1B said he's self-correcting → Section 3D tests whether that's real
// ─────────────────────────────────────────────────────────────────────────────

export const MELVIN_SECTION_3 = {
  id: 'melvin_section3',
  title: 'Responsibility & Accountability',
  subtitle: 'Ownership, Follow-Through, Reliability, Excuses & Consequence Awareness',
  userId: 'melvin',
  subsections: [
    'Ownership of Decisions',
    'Follow-Through',
    'Reliability',
    'Excuse Patterns',
    'Asking for Help',
    'Consequence Awareness',
  ],
  questions: [

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 3A — OWNERSHIP OF DECISIONS
    // Target: Can he claim his choices — including the ones he's not proud of?
    // Probe: language of agency vs. language of circumstance,
    //        ability to say "I chose this" about uncomfortable decisions
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms3_01',
      subsection: '3A',
      subsectionName: 'Ownership of Decisions',
      type: 'open',
      text: 'Walk me through the school days you\'ve missed this semester. Not the story you\'d tell someone to explain it — your honest account of what happened and why.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Uses "I" language. Names a real reason without hiding behind circumstances. Can say "I chose not to go" or "I wasn\'t in the right headspace and I didn\'t deal with it." Some ownership without excessive shame.',
        weak: 'Pure circumstance language — "things just happened," "I wasn\'t feeling well," "it wasn\'t that many." Absences described as things that occurred rather than choices made.',
        complex: 'The distinction is not between good reasons and bad reasons — it\'s between owning the choice and describing it as something that happened to him. Even a legitimate reason can be owned.',
      },
      redFlags: [
        'Zero "I chose" language — all passive framing',
        'Minimization of frequency or severity',
        'Immediate comparison to peers — "other people missed more"',
      ],
      followUp: {
        condition: 'passive framing detected',
        question: 'Flip it — what would it sound like if you owned that decision fully, without justifying it?',
      },
    },

    {
      id: 'ms3_02',
      subsection: '3A',
      subsectionName: 'Ownership of Decisions',
      type: 'forced_choice',
      text: 'When something in your life goes wrong — a grade, a relationship, a missed commitment — your first instinct is to:',
      options: [
        'Look at what I did or didn\'t do that contributed to it',
        'Understand the full situation before drawing conclusions about my role',
        'Think about what external factors made it harder than it should have been',
        'Move past it quickly — dwelling on what went wrong doesn\'t help me',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A: immediate personal accountability — strong ownership orientation',
        weak: 'Option C: external attribution as first move — circumstance before self',
        complex: 'Option B is thoughtful. Option D can be healthy resilience or problematic avoidance depending on whether he actually processes it. All must be cross-referenced with behavioral evidence.',
      },
      redFlags: ['Option C as primary response combined with excuse patterns in 3D'],
      followUp: {
        condition: 'answer is Option C or D',
        question: 'Give me a specific example — something that went wrong in the last few months — and walk me through how you actually handled it using that approach.',
      },
    },

    {
      id: 'ms3_03',
      subsection: '3A',
      subsectionName: 'Ownership of Decisions',
      type: 'scenario',
      text: 'Your mom sat down and told you she\'s worried — the school days, the motivation, the sleep. She\'s not angry. She\'s concerned. You could explain it, justify it, or own it. What do you actually say?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Owns it. Doesn\'t redirect to circumstances first. Acknowledges her concern as accurate. May explain context but doesn\'t use context as a defense.',
        weak: '"I know, but it\'s because of the basketball season ending, and senior year, and..." — legitimate context deployed to dilute accountability.',
        complex: 'This is not a test of whether he has good reasons. The reasons may be valid. This is a test of whether his first move is ownership or explanation. The difference is in the sequence.',
      },
      redFlags: [
        'Explanation before acknowledgment',
        '"She\'s exaggerating" framing',
        'Reassurance without commitment — "I\'ll get back on track" with no specific plan',
      ],
      followUp: {
        condition: 'response starts with explanation',
        question: 'Before the context — what did you want to say to her first, as the person who made those choices?',
      },
    },

    {
      id: 'ms3_04',
      subsection: '3A',
      subsectionName: 'Ownership of Decisions',
      type: 'likert',
      text: 'When something goes wrong in my life, I own my role in it — even when I could honestly blame external circumstances.',
      options: [
        'Strongly Disagree',
        'Disagree',
        'Neutral',
        'Agree',
        'Strongly Agree',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Agree with behavioral evidence in the assessment supporting it',
        weak: 'Agree/Strongly Agree here but external framing detected in ms3_01 and ms3_02 — contradiction flag',
        complex: 'This is a self-assessment against a standard. Cross-reference with actual ownership language used throughout Section 3A.',
      },
      redFlags: ['Strongly Agree with passive language detected in ms3_01 scenario'],
      followUp: {
        condition: 'answer is "Strongly Agree"',
        question: 'Give me an example in the last 90 days where you could have blamed something external — and chose not to.',
      },
    },

    {
      id: 'ms3_05',
      subsection: '3A',
      subsectionName: 'Ownership of Decisions',
      type: 'open',
      text: 'What is a decision you\'ve made in the last six months that you\'re not fully proud of — and what do you own about it?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names something real. Uses ownership language. Can sit with the discomfort of the answer without immediately pivoting to what he\'ll do differently.',
        weak: 'Deflects to a very small or low-stakes decision to avoid naming something significant. Or names something followed immediately by extensive justification.',
        complex: 'The quality of the decision named is less important than his relationship to it. Can he sit with accountability without shame-spiraling or without immediately excusing himself?',
      },
      redFlags: [
        'Trivial decision selected to avoid meaningful accountability',
        'Decision named then immediately justified away',
        '"I can\'t think of anything major"',
      ],
      followUp: {
        condition: 'school absences or motivation drop not mentioned',
        question: 'What about the school days this semester — does that make the list?',
      },
    },

    {
      id: 'ms3_06',
      subsection: '3A',
      subsectionName: 'Ownership of Decisions',
      type: 'forced_choice',
      text: 'The school absences, the late nights, the lower motivation since basketball ended — who is most responsible for that?',
      options: [
        'Me — I let it happen and I haven\'t corrected it',
        'The transition — it\'s been a harder adjustment than I expected',
        'Honestly, both — I\'m in a rough patch and it\'s been hard to pull out of it',
        'It\'s being overstated — I don\'t think the situation is as bad as it looks',
      ],
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A or C: self-ownership, with or without acknowledging context. Both show accountability capacity.',
        weak: 'Option D: minimization and deflection — inability to see the behavioral pattern clearly, or unwillingness to name it',
        complex: 'Option B is honest about context but watch whether "the transition" becomes an excuse. Context + ownership together = Option C territory.',
      },
      redFlags: ['Option D — minimization of a real pattern'],
      followUp: {
        condition: 'answer is Option A or C',
        question: 'What would it look like to actually correct it — starting tomorrow, not when Morehouse starts?',
      },
    },

    {
      id: 'ms3_07',
      subsection: '3A',
      subsectionName: 'Ownership of Decisions',
      type: 'open',
      text: 'If you could go back and make a different choice in the last three months — one choice — what would it be and why?',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names a real, meaningful choice. Doesn\'t hedge or minimize. Can connect the choice to a real consequence.',
        weak: 'Too small — picks something trivial. Or names something external ("I wish my basketball season had gone differently") rather than a choice he made.',
        complex: 'The ownership is in naming a CHOICE — not a circumstance he wishes were different. That distinction reveals his ownership framework.',
      },
      redFlags: ['Chooses a circumstance rather than a decision', '"I don\'t really have regrets"'],
      followUp: {
        condition: 'choice is genuinely meaningful',
        question: 'What stopped you from making that choice in the moment?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 3B — FOLLOW-THROUGH
    // Target: Does he complete what he commits to?
    // Probe: gap between stated commitments and actual completion,
    //        consistency vs. cherry-picking when things get hard
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms3_08',
      subsection: '3B',
      subsectionName: 'Follow-Through',
      type: 'open',
      text: 'Think about the last three things you committed to — to yourself or to someone else. Did you follow through on all three? Walk me through each one.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Specific, honest account. Names at least one where he fell short without minimizing it. Shows self-awareness about his own completion rate.',
        weak: 'All three are completions with no acknowledgment of any gap, OR can\'t name three concrete recent commitments at all.',
        complex: 'The specificity requirement is intentional — vague commitments are easy to report as completed. Watch for concreteness and honesty in the self-assessment.',
      },
      redFlags: [
        'Cannot name three specific recent commitments',
        'All three described as completed with no caveats — may be selecting easy wins',
        'School-related commitments absent from the list',
      ],
      followUp: {
        condition: 'school-related commitment not mentioned',
        question: 'What about school this semester — what did you commit to at the start that you\'ve fully followed through on?',
      },
    },

    {
      id: 'ms3_09',
      subsection: '3B',
      subsectionName: 'Follow-Through',
      type: 'likert',
      text: 'When I say I\'m going to do something, I do it — people can count on that.',
      options: [
        'Strongly Disagree',
        'Disagree',
        'Neutral',
        'Agree',
        'Strongly Agree',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Agree with behavioral evidence supporting it — strong follow-through track record',
        weak: 'Strongly Agree combined with behavioral data showing current drift — overestimated follow-through self-assessment',
        complex: 'His historical track record (4.2 GPA, basketball full career, OK Program participation) does support Agree. But this semester contradicts that. The question is whether he nuances his answer.',
      },
      redFlags: ['Strongly Agree with no nuance about current season given known behavioral data'],
      followUp: {
        condition: 'answer is "Strongly Agree"',
        question: 'Is there anyone in your life right now you\'ve made a commitment to that you\'re not fully keeping?',
      },
    },

    {
      id: 'ms3_10',
      subsection: '3B',
      subsectionName: 'Follow-Through',
      type: 'scenario',
      text: 'You\'ve committed to finishing strong this semester — showing up, completing work, leaving high school clean. It\'s February. Morehouse is locked in. The motivation is lower than usual. Tuesday morning comes. You don\'t feel like going. What actually happens?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Describes an internal process that leads to going — commitment overrides feeling. Acknowledges the feeling without being controlled by it.',
        weak: '"I\'d figure it out" with no concrete mechanism. Or honestly admits that some Tuesdays he doesn\'t go — which is actually more honest and useful.',
        complex: 'The real answer is behavioral: some Tuesdays he goes, some he doesn\'t. The question tests whether he can be honest about the mechanism of failure without shame.',
      },
      redFlags: [
        '"I\'d always go" — aspirational answer that doesn\'t match behavioral data',
        'No acknowledgment of the internal friction that currently exists',
      ],
      followUp: {
        condition: 'honest admission of non-attendance',
        question: 'What would have to be different about Tuesday morning for you to go even when you don\'t want to?',
      },
    },

    {
      id: 'ms3_11',
      subsection: '3B',
      subsectionName: 'Follow-Through',
      type: 'forced_choice',
      text: 'When follow-through gets hard — when motivation is low and doing the thing feels like a grind — what determines whether you actually finish?',
      options: [
        'I made a commitment — that\'s enough. I finish regardless.',
        'I remind myself of the bigger purpose — what it\'s building toward',
        'Someone or something external holds me accountable',
        'Honestly, it depends on how much I care about the thing in that moment',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A or B: internal mechanism for follow-through that doesn\'t require external accountability',
        weak: 'Option D: conditional follow-through — only completes when motivation is present, which makes reliability contingent rather than consistent',
        complex: 'Option C is honest and many people need external accountability — that\'s fine, but it means he needs to build accountability structures at Morehouse before he needs them.',
      },
      redFlags: ['Option D — motivation-contingent follow-through'],
      followUp: {
        condition: 'answer is Option D',
        question: 'By that logic — school this semester, with Morehouse already secured and motivation lower than usual — what\'s your honest completion rate been?',
      },
    },

    {
      id: 'ms3_12',
      subsection: '3B',
      subsectionName: 'Follow-Through',
      type: 'open',
      text: 'Your basketball career is the best example of long-term follow-through you have — years, injuries, not starting, still showing up. What does that track record tell you about yourself, and why isn\'t that same version of you showing up right now?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Genuinely engages with both parts of the question. Can identify what basketball gave him (structure, team, daily requirement to show up) and what\'s missing now. Honest about the current gap without catastrophizing.',
        weak: '"I\'m still the same person, I just have less to do right now." Fails to interrogate the gap or connect basketball\'s structure to his current drift.',
        complex: 'This is one of the most important questions in Section 3. Basketball was an external accountability structure. Without it, the internal accountability structure is exposed. Does he have one?',
      },
      redFlags: [
        'Dismisses the gap entirely',
        '"Basketball was different" without explaining what made it different and why that matters now',
        'No acknowledgment that the structure basketball provided is currently absent',
      ],
      followUp: {
        condition: 'identifies lack of structure as the gap',
        question: 'Between now and August, what replaces basketball as your daily accountability structure?',
      },
    },

    {
      id: 'ms3_13',
      subsection: '3B',
      subsectionName: 'Follow-Through',
      type: 'slider',
      text: 'On a scale of 1–10, how reliable is your follow-through right now — this month, this season, not historically?',
      min: 1,
      max: 10,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: '5–7 range with honest self-assessment — acknowledges current gap from historical baseline without catastrophizing',
        weak: '9–10 — overestimation that contradicts behavioral data; or 1–2 — catastrophizing that doesn\'t account for genuine strength of historical track record',
        complex: 'The present-tense qualifier ("right now, this month") is intentional. Separating current from historical reliability is the probe.',
      },
      redFlags: ['9–10 without any nuance about current season'],
      followUp: {
        condition: 'score is 5–7',
        question: 'What would bring that back up to your historical baseline before August?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 3C — RELIABILITY
    // Target: Can others count on him? Can he count on himself?
    // Probe: reliability to others vs. reliability to self,
    //        whether his loyalty to others masks unreliability to his own commitments
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms3_14',
      subsection: '3C',
      subsectionName: 'Reliability',
      type: 'open',
      text: 'Who in your life relies on you — genuinely depends on you to show up, follow through, or be there? Name them and describe what you carry for them.',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Specific names and specific roles. Shows awareness of real relational responsibility. Includes his mom — given his protective relationship with her.',
        weak: 'Vague or short answer. Inability to name specific people or specific forms of reliance.',
        complex: 'For Melvin, his mom is almost certainly the primary answer. But does he also see himself as someone Mekhi could rely on? The OK Program? His peers? Reliability isn\'t just downward (protecting mom) — it\'s lateral and upward too.',
      },
      redFlags: ['Only names his mom — no lateral or broader relational reliability'],
      followUp: {
        condition: 'Mekhi not mentioned',
        question: 'What about Mekhi — does he rely on you in any way? Or is that relationship mostly parallel rather than interdependent?',
      },
    },

    {
      id: 'ms3_15',
      subsection: '3C',
      subsectionName: 'Reliability',
      type: 'forced_choice',
      text: 'When it comes to reliability, which of these is most accurate right now?',
      options: [
        'I\'m more reliable to other people than I am to myself',
        'I\'m equally reliable to others and to myself',
        'I\'m more reliable to myself than I am to others',
        'Honestly, reliability has been inconsistent all around lately',
      ],
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option B: balanced reliability — sustainable and honest',
        weak: 'Option A: extremely common pattern for Melvin given his profile — shows up for others but currently not holding himself to the same standard',
        complex: 'Option A is not a failure — it\'s a pattern to name and understand. Option D is honest and important. Cross-reference with Section 2B standards data.',
      },
      redFlags: ['Option A confirmed — then probe the self-reliability gap directly'],
      followUp: {
        condition: 'answer is Option A or D',
        question: 'What\'s the cost of being less reliable to yourself? What has it already cost you this semester?',
      },
    },

    {
      id: 'ms3_16',
      subsection: '3C',
      subsectionName: 'Reliability',
      type: 'scenario',
      text: 'A friend you respect calls you — he needs help with something real. It\'s inconvenient timing, you\'re tired, it\'ll take three hours out of your day. What do you do?',
      options: null,
      weight: 1.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Goes. Shows up. Doesn\'t need to think about it much — loyalty is built in.',
        weak: 'Extended deliberation about whether to go — suggests reliability is more conditional than his self-image suggests.',
        complex: 'For Melvin, this answer is almost certainly "I go." The question isn\'t whether he shows up for others — it\'s to surface the contrast with his current self-reliability.',
      },
      redFlags: null,
      followUp: {
        condition: 'confirms he would show up for the friend',
        question: 'You\'d show up for your friend at 11pm without a second thought. What would it take to show up for yourself — for your own commitments — with that same reliability?',
      },
    },

    {
      id: 'ms3_17',
      subsection: '3C',
      subsectionName: 'Reliability',
      type: 'likert',
      text: 'I keep promises to myself as consistently as I keep promises to other people.',
      options: [
        'Strongly Disagree',
        'Disagree',
        'Neutral',
        'Agree',
        'Strongly Agree',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Agree with behavioral evidence across the assessment supporting it',
        weak: 'Disagree/Strongly Disagree: self-reliability gap is present and acknowledged — this is honest and important data',
        complex: 'The expected answer given his profile is Disagree or Neutral. If he says Strongly Agree, probe with specific evidence.',
      },
      redFlags: ['Strongly Agree with no behavioral evidence supporting it'],
      followUp: {
        condition: 'answer in ["Strongly Disagree", "Disagree"]',
        question: 'That self-reliability gap — how long has it been there? Was it there during basketball season?',
      },
    },

    {
      id: 'ms3_18',
      subsection: '3C',
      subsectionName: 'Reliability',
      type: 'open',
      text: 'What promise have you made to yourself — not to your mom, not to anyone else — that you haven\'t kept this year?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names something specific and meaningful. Can connect the unkept promise to a real cost.',
        weak: '"I don\'t really make promises to myself" — avoidance through reframing. Or names something trivial.',
        complex: 'Self-promises are often the first to go under pressure. What he names here is a window into his relationship with his own commitments.',
      },
      redFlags: [
        '"I don\'t make promises to myself like that"',
        'Trivial answer that avoids meaningful accountability',
      ],
      followUp: {
        condition: 'meaningful promise named',
        question: 'Why did you break that promise? And what would it mean to actually keep it between now and August?',
      },
    },

    {
      id: 'ms3_19',
      subsection: '3C',
      subsectionName: 'Reliability',
      type: 'scenario',
      text: 'At Morehouse, your advisor schedules a check-in to review your first-semester progress. You\'ve been struggling. You haven\'t told anyone. The morning of the meeting, you feel like canceling — you don\'t want the conversation. What do you do?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Goes to the meeting. Tells the advisor the truth. Does not cancel an accountability conversation to avoid discomfort.',
        weak: 'Cancels. Or goes but doesn\'t disclose the struggle. Or frames it as "I just needed more time."',
        complex: 'This is a direct test of reliability to commitments that involve vulnerability. Canceling a check-in to avoid hard information is a key failure pattern for silent college collapse.',
      },
      redFlags: [
        'Would cancel or reschedule',
        'Would go but not disclose the struggle',
        '"I\'d handle it on my own first before talking to the advisor"',
      ],
      followUp: {
        condition: 'would avoid or go without disclosure',
        question: 'The advisor\'s whole job is to catch problems before they compound. What would make it feel safe enough to actually tell them what\'s going on?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 3D — EXCUSE PATTERNS
    // Target: Does he excuse-make, rationalize, or contextualize?
    // Probe: the difference between legitimate context and excuse,
    //        whether he can hold context without deploying it as a defense
    // Note: Melvin is smarter than average. His excuses will be more
    //       sophisticated — framed as analysis rather than deflection.
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms3_20',
      subsection: '3D',
      subsectionName: 'Excuse Patterns',
      type: 'open',
      text: 'Senior slide is a real thing — most seniors coast after getting accepted. Is that what\'s happening with you? And does that context make it okay?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Acknowledges the context is real but distinguishes between understanding it and accepting it as an excuse. Can say: "Yes, that\'s happening. No, I don\'t think it\'s okay."',
        weak: '"Senior slide is normal — everyone does it" — uses a real phenomenon as complete justification with no ownership.',
        complex: 'This question deliberately hands him a legitimate excuse and waits to see what he does with it. The most revealing answer is how he separates context from justification.',
      },
      redFlags: [
        '"Everyone goes through this" — normalization without personal accountability',
        '"It\'s not really that bad" immediately following "it\'s normal"',
        'No acknowledgment that even if it\'s common, it still has a cost',
      ],
      followUp: {
        condition: 'senior slide used as justification',
        question: 'What does Morehouse think about senior slide when they review your final semester before enrollment?',
      },
    },

    {
      id: 'ms3_21',
      subsection: '3D',
      subsectionName: 'Excuse Patterns',
      type: 'forced_choice',
      text: 'When you explain why something didn\'t go as planned, your explanations are usually:',
      options: [
        'Honest about my role — I name what I did or didn\'t do',
        'Contextual — I explain the factors that made it harder without excusing myself',
        'Balanced — I acknowledge both what happened externally and what I could have done differently',
        'Situation-dependent — sometimes I own it fully, sometimes I explain it away',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Options A, B, or C with behavioral evidence to match',
        weak: 'Option D: inconsistent accountability — situational responsibility is unreliable by definition',
        complex: 'The key probe is not the stated answer but whether behavioral evidence in the rest of the section matches it. Smart people often know the "right" answer. Cross-reference.',
      },
      redFlags: ['Option D combined with behavioral evidence of selective accountability'],
      followUp: {
        condition: 'answer is Option D',
        question: 'What determines which mode you go into — when do you own it vs. when do you explain it away?',
      },
    },

    {
      id: 'ms3_22',
      subsection: '3D',
      subsectionName: 'Excuse Patterns',
      type: 'scenario',
      text: 'You tell your mom everything is fine with school. She finds out later that it wasn\'t — grades dipped, days were missed, you hadn\'t been fully honest. When she confronts you, what do you say — and is that the true version?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Owns the dishonesty directly. Doesn\'t rationalize the withholding. Can say "I didn\'t tell you because I didn\'t want to worry you, and that was wrong." Accountability for the cover, not just the behavior.',
        weak: '"I didn\'t want to stress her out" used as a complete justification for the withholding. The intent (protect her) replaces accountability for the impact (she didn\'t have accurate information).',
        complex: 'This scenario directly mirrors his brother\'s situation at Clark Atlanta. If he can see the parallel and name it — that is a significant signal. If he defends the withholding with protective intent — he hasn\'t seen it.',
      },
      redFlags: [
        '"I was trying to protect her" as a full defense with no acknowledgment of cost',
        'Anger at being confronted',
        'No accountability for the dishonesty itself, only the underlying behavior',
      ],
      followUp: {
        condition: 'protective intent deployed as justification',
        question: 'Your brother used the same reasoning — he didn\'t tell your mom what was happening at Clark Atlanta because he didn\'t want her to worry. How did that work out?',
      },
    },

    {
      id: 'ms3_23',
      subsection: '3D',
      subsectionName: 'Excuse Patterns',
      type: 'likert',
      text: 'When I explain why something didn\'t work out, I can tell the difference between giving context and making an excuse.',
      options: [
        'Strongly Disagree',
        'Disagree',
        'Neutral',
        'Agree',
        'Strongly Agree',
      ],
      weight: 1.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Agree — and behavioral evidence shows the distinction being made in practice',
        weak: 'Strongly Agree — overconfident meta-awareness that isn\'t borne out in practice',
        complex: 'This is primarily a contradiction detection setup. If he says he can tell the difference but ms3_20 and ms3_22 show excuse-making, flag the gap.',
      },
      redFlags: ['Strongly Agree combined with evidence of excuse-making earlier in 3D'],
      followUp: null,
    },

    {
      id: 'ms3_24',
      subsection: '3D',
      subsectionName: 'Excuse Patterns',
      type: 'open',
      text: 'What is a story you\'ve been telling yourself about why the current situation is acceptable — or less serious than it actually is?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names the story directly and with some self-awareness that it IS a story — not pure reality. Shows metacognitive ability to catch himself.',
        weak: '"I\'m not telling myself anything — I see the situation clearly." Denial of the self-narrative mechanism.',
        complex: 'Everyone has a story they\'re telling themselves about why things are okay. For Melvin, the candidates are: "senior slide is normal," "I\'ve earned a break," "I\'ll be ready for Morehouse," "I\'m not as bad as Mekhi." Which story is active?',
      },
      redFlags: ['"I don\'t tell myself stories — I just see it how it is"'],
      followUp: {
        condition: 'a story is named',
        question: 'What\'s the part of the situation that story leaves out?',
      },
    },

    {
      id: 'ms3_25',
      subsection: '3D',
      subsectionName: 'Excuse Patterns',
      type: 'forced_choice',
      text: 'The basketball season ending, the early acceptance, the senior year wind-down — these are:',
      options: [
        'Legitimate explanations for my current behavior — any reasonable person would drift in this context',
        'Context that helps understand what happened, but doesn\'t excuse it',
        'Part of it — but I also just let myself slide and that\'s on me',
        'Honestly, I\'ve been using them as reasons more than they deserve',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Options C or D: honest accountability with context — most accurate and most actionable',
        weak: 'Option A: full legitimization — context as complete defense',
        complex: 'Option B is intellectually honest but may still be protective. Options C and D involve self-ownership that is worth building on.',
      },
      redFlags: ['Option A — context as complete defense'],
      followUp: {
        condition: 'answer is Option C or D',
        question: 'What would it look like to stop using them as reasons and actually change the pattern — before August?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 3E — ASKING FOR HELP
    // Target: Can he ask for help before crisis, not just after?
    // Probe: the private-carrying pattern, pride vs. isolation,
    //        whether his help-seeking has any trigger short of catastrophe
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms3_26',
      subsection: '3E',
      subsectionName: 'Asking for Help',
      type: 'open',
      text: 'When was the last time you asked for help with something that mattered — not a small favor, but something real? What happened?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Specific, recent, meaningful. Help-seeking is active and accessible in his life.',
        weak: 'Cannot think of a recent example. Has to go far back. The help was so minor it barely qualifies. Or: "I don\'t really need to ask for help much."',
        complex: 'Melvin carries alone. The rarity of asking for help is embedded in his identity as someone capable and self-sufficient. This question surfaces how accessible help-seeking actually is.',
      },
      redFlags: [
        'No recent example or has to go back more than 6 months',
        '"I don\'t really ask for help — I figure things out"',
        'The example is too small to be meaningful',
      ],
      followUp: {
        condition: 'no recent meaningful help-seeking',
        question: 'Is there something you\'re dealing with right now that you could use help with but haven\'t asked for?',
      },
    },

    {
      id: 'ms3_27',
      subsection: '3E',
      subsectionName: 'Asking for Help',
      type: 'forced_choice',
      text: 'When you\'re struggling — really struggling, not just having a hard day — when do you typically reach out?',
      options: [
        'Early — as soon as I notice I\'m struggling and could use support',
        'Middle — when it\'s been going on long enough that I know I can\'t fix it alone',
        'Late — when things have gotten bad enough that I can\'t hide it anymore',
        'Almost never — I work through it myself until it resolves or until someone notices',
      ],
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A or B: proactive help-seeking — critical for college success',
        weak: 'Option D: reactive-only help-seeking (never until someone else notices) — exactly the pattern that preceded his brother\'s collapse',
        complex: 'Options C and D together map directly onto the silent failure pattern. Morehouse will not have the same visibility structures as home. No one will notice until it\'s significant.',
      },
      redFlags: ['Option D — and especially Option D with low disclosure scores throughout the section'],
      followUp: {
        condition: 'answer is Option C or D',
        question: 'What would early look like for you — what would need to happen inside you for you to reach out before it gets bad?',
      },
    },

    {
      id: 'ms3_28',
      subsection: '3E',
      subsectionName: 'Asking for Help',
      type: 'likert',
      text: 'Asking for help feels like it costs me something — like it signals weakness or creates an obligation.',
      options: [
        'Strongly Disagree',
        'Disagree',
        'Neutral',
        'Agree',
        'Strongly Agree',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Strongly Disagree: asking for help is not threatening to his identity — this is the healthiest position for college and career',
        weak: 'Agree/Strongly Agree: asking for help is perceived as weakness — this is the primary barrier to early intervention at Morehouse',
        complex: 'For Melvin, the cost of asking is likely pride. He has built his identity on excellence and self-sufficiency. Asking for help violates both. Understanding whether this is conscious ("yes, it costs me") or unconscious ("no, I\'m fine") matters.',
      },
      redFlags: ['Agree or Strongly Agree — particularly combined with manhood stoicism in Section 2C'],
      followUp: {
        condition: 'answer in ["Agree", "Strongly Agree"]',
        question: 'What specifically does it signal to you when you have to ask — what\'s the story you tell yourself about what that means?',
      },
    },

    {
      id: 'ms3_29',
      subsection: '3E',
      subsectionName: 'Asking for Help',
      type: 'scenario',
      text: 'You\'re at Morehouse. Week three. You\'ve fallen behind in one class. The material makes sense to you when you hear it, but the reading load is hitting your dyslexia hard. You\'re spending twice as long as everyone else and still behind. You haven\'t told anyone. Describe step-by-step what you do in the next 48 hours.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Goes to disability services. Emails the professor. Reaches out to a study group. Uses the IEP as a tool. Does this proactively, not after failing.',
        weak: '"I\'d study harder." "I\'d figure it out." No mention of disclosing the dyslexia. No help-seeking. Solo problem-solving as the only strategy.',
        complex: 'This is the single highest-stakes help-seeking scenario in the assessment. His response here is highly predictive of how he will actually handle academic difficulty at Morehouse.',
      },
      redFlags: [
        'No mention of disability services or IEP disclosure',
        '"I\'d just spend more hours on it"',
        'No communication with professor or advisor named',
      ],
      followUp: {
        condition: 'no institutional help-seeking mentioned',
        question: 'Your accommodations at Morehouse are legally guaranteed and completely private. Using them isn\'t asking for a favor — it\'s using what belongs to you. What makes that hard to do?',
      },
    },

    {
      id: 'ms3_30',
      subsection: '3E',
      subsectionName: 'Asking for Help',
      type: 'open',
      text: 'Who do you go to when things are hard? Name the person and describe what that actually looks like.',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names a specific person. Describes a real pattern of going to them. The description has specificity — not just "I could go to my mom" but "I actually do."',
        weak: '"I mostly handle things myself" OR names someone but the description is aspirational rather than actual — "I could go to my mom if I needed to."',
        complex: 'For Melvin, his mom is likely named. But the question is whether he actually goes — or whether he protects her from things because he doesn\'t want to worry her.',
      },
      redFlags: [
        '"I mostly handle things myself"',
        '"I could go to [person] if it got really bad" — conditional, not actual',
        'No person named',
      ],
      followUp: {
        condition: 'mom named as primary support but protective withholding detected elsewhere',
        question: 'You protect your mom from a lot. When something is hard for you, is she actually someone you go to — or is she someone you protect from finding out?',
      },
    },

    {
      id: 'ms3_31',
      subsection: '3E',
      subsectionName: 'Asking for Help',
      type: 'slider',
      text: 'How comfortable are you asking for help — not from family, but from institutions: advisors, professors, disability services, counselors?',
      min: 1,
      max: 10,
      weight: 1.5,
      scoringDirection: 'strong',
      scoringNotes: {
        strong: '7–10: institutional help-seeking is accessible and not threatening — critical for Morehouse navigation',
        weak: '1–4: institutional help-seeking feels threatening, exposing, or beneath him — high-risk for navigating new environment alone',
        complex: 'Melvin\'s comfort asking family may be higher than his comfort asking institutions. This question separates those.',
      },
      redFlags: ['score 1–4'],
      followUp: {
        condition: 'score <= 5',
        question: 'What is it about institutional help-seeking — an advisor, a professor, disability services — that feels different from asking someone you trust personally?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 3F — CONSEQUENCE AWARENESS
    // Target: Does he understand the real stakes of his current pattern?
    // Probe: Morehouse enrollment status, financial aid, family precedent,
    //        whether consequence awareness actually changes behavior
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms3_32',
      subsection: '3F',
      subsectionName: 'Consequence Awareness',
      type: 'open',
      text: 'If the pattern you\'re in right now — the school days, the motivation, the sleep — continues for the next five months and carries into Morehouse: walk me through what actually happens.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Specific and honest chain of consequences: grades drop, IEP not established, no network built, financial aid risk, pattern compounds, Mom finds out after it\'s bad. Can trace the actual cascade.',
        weak: '"I\'d figure it out before it got that bad." Confidence in future self-correction without acknowledging the momentum of current patterns.',
        complex: 'Pattern transfer is the key risk. He may understand consequences abstractly. The question is whether he can see the SPECIFIC chain from current behavior to Morehouse outcome.',
      },
      redFlags: [
        '"It won\'t carry into Morehouse — I\'ll be motivated by then"',
        'No concrete consequence chain named',
        'Vague consequence — "I\'d struggle" — without specificity',
      ],
      followUp: {
        condition: 'consequence chain is specific',
        question: 'Given that chain — what changes between now and August to interrupt it?',
      },
    },

    {
      id: 'ms3_33',
      subsection: '3F',
      subsectionName: 'Consequence Awareness',
      type: 'forced_choice',
      text: 'Morehouse can rescind an acceptance based on final semester performance. How seriously do you take that as a real possibility in your situation?',
      options: [
        'Very seriously — it\'s something I actively think about',
        'Somewhat seriously — I know it\'s possible but I don\'t think I\'m at that level',
        'Not very seriously — I don\'t think my situation is close to that threshold',
        'I hadn\'t really thought about it as a real possibility',
      ],
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A or B: awareness of consequence as a real possibility — keeps stakes visible',
        weak: 'Option D: consequence blindness — hasn\'t made the connection between current behavior and enrollment risk',
        complex: 'Option C is the most common position and may be accurate — he may not be near the threshold. But without knowing his actual grade situation, this answer reveals whether he\'s tracking consequences or assuming safety.',
      },
      redFlags: [
        'Option D — hadn\'t thought about it',
        'Option C with no knowledge of current actual grades',
      ],
      followUp: {
        condition: 'answer is Option C or D',
        question: 'Do you know your current grade standing right now — specifically? If not, when will you find out?',
      },
    },

    {
      id: 'ms3_34',
      subsection: '3F',
      subsectionName: 'Consequence Awareness',
      type: 'scenario',
      text: 'Your brother didn\'t tell your mom he was failing until she found out through the student portal. The pattern you\'re in right now has some similarities to where he was. What\'s the honest comparison — and what makes your situation different?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Can name both the similarities AND the differences honestly. Doesn\'t completely dismiss the comparison OR use it to catastrophize. Articulates a specific thing that makes his situation meaningfully different.',
        weak: '"My situation is completely different" with no acknowledgment of parallel. Or: defensive reaction to the comparison.',
        complex: 'This is the most direct consequence scenario in the assessment. His brother\'s trajectory is a preview of what\'s possible. Whether he can see the parallel without shame-spiraling determines whether this is usable information.',
      },
      redFlags: [
        'Full dismissal of the comparison',
        'Defensive or angry reaction',
        '"I\'m nothing like Mekhi" — identity defense that prevents information processing',
      ],
      followUp: {
        condition: 'similarities acknowledged',
        question: 'What specifically are you doing — right now, this week — that makes your path different from his?',
      },
    },

    {
      id: 'ms3_35',
      subsection: '3F',
      subsectionName: 'Consequence Awareness',
      type: 'likert',
      text: 'I understand the real consequences of my current behavior well enough that they change what I do day to day.',
      options: [
        'Strongly Disagree',
        'Disagree',
        'Neutral',
        'Agree',
        'Strongly Agree',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Agree with behavioral change evidence — consequence awareness translating to behavior',
        weak: 'Agree with no behavioral change — he understands the consequences intellectually but they\'re not close enough to feel real and therefore don\'t change his behavior',
        complex: 'The key distinction is "well enough that they change what I do." Abstract consequence awareness and behavioral consequence awareness are different. This question probes which he has.',
      },
      redFlags: ['Agree combined with unchanged behavioral data (absences, motivation, sleep) throughout the assessment'],
      followUp: {
        condition: 'answer is "Agree" but behavioral data says otherwise',
        question: 'If consequences are real to you and you understand them — what has actually changed in your behavior because of that understanding?',
      },
    },

    {
      id: 'ms3_36',
      subsection: '3F',
      subsectionName: 'Consequence Awareness',
      type: 'open',
      text: 'What is the consequence of your current pattern that you\'re most trying not to think about?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names something real and significant — Morehouse rescinding, disappointing his mom, repeating his father\'s pattern, arriving at Morehouse already behind. Shows the thing he\'s avoiding thinking about.',
        weak: '"Nothing — I think about all the consequences." Complete defensive openness with nothing actually named.',
        complex: 'The question deliberately asks for what he\'s AVOIDING. This is the most revealing window into his consequence relationship. The avoidance is data.',
      },
      redFlags: ['"I\'m not avoiding anything — I think about it all"'],
      followUp: {
        condition: 'something real is named',
        question: 'That consequence — what would it take for it to become real enough to change what you do tomorrow?',
      },
    },

    {
      id: 'ms3_37',
      subsection: '3F',
      subsectionName: 'Consequence Awareness',
      type: 'slider',
      text: 'On a scale of 1–10, how urgent does it feel to change your current pattern — not because you should, but because you actually feel the weight of what\'s at stake?',
      min: 1,
      max: 10,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: '7–10: stakes are real and felt — behavioral change is possible from a place of genuine urgency',
        weak: '1–4: stakes are understood abstractly but not felt — consequence awareness that doesn\'t generate urgency is not consequence awareness that changes behavior',
        complex: '5–6: the transition zone — he knows it matters but the urgency isn\'t quite there yet. This is where the intervention work lives.',
      },
      redFlags: ['score 1–5 combined with unchanged behavioral data throughout the section'],
      followUp: {
        condition: 'score <= 6',
        question: 'What would need to happen — inside you, or in your actual life — for this to feel more urgent than it does right now?',
      },
    },

  ],
};

// ─── SCORING CONFIGURATION ───────────────────────────────────────────────────

export const MELVIN_SECTION_3_SCORING = {
  subsections: {
    '3A': { name: 'Ownership of Decisions', maxWeight: 12.5, redFlagThreshold: 2 },
    '3B': { name: 'Follow-Through', maxWeight: 10.5, redFlagThreshold: 2 },
    '3C': { name: 'Reliability', maxWeight: 10.0, redFlagThreshold: 2 },
    '3D': { name: 'Excuse Patterns', maxWeight: 10.0, redFlagThreshold: 2 },
    '3E': { name: 'Asking for Help', maxWeight: 11.0, redFlagThreshold: 3 },
    '3F': { name: 'Consequence Awareness', maxWeight: 11.5, redFlagThreshold: 3 },
  },
  globalRedFlags: [
    'Passive framing of school absences — described as things that happened, not choices made (3A)',
    'Follow-through described as motivation-contingent — reliability only when he cares (3B)',
    'Higher reliability to others than to himself — self-reliability gap confirmed (3C)',
    'Protective intent used to justify withholding information from Mom — same pattern as his brother (3D)',
    'Help-seeking threshold is "when it\'s bad enough that I can\'t hide it anymore" (3E)',
    'Morehouse consequence chain not traceable — abstract awareness without behavioral weight (3F)',
    'Pattern comparison to Mekhi rejected defensively — prevents information from being usable (3F)',
    'Consequence awareness confirmed as intellectual but not behavioral — knows and doesn\'t change (3F)',
  ],
  contradictionChecks: [
    {
      id: 'contradiction_3_1',
      description: 'High standards vs. ownership of current gap',
      questions: ['ms2_11', 'ms2_18', 'ms3_01', 'ms3_06'],
      flag: 'Named high personal standards in Section 2B but uses passive framing for school absences and minimizes current behavioral gap',
    },
    {
      id: 'contradiction_3_2',
      description: 'Follow-through identity vs. current completion rate',
      questions: ['ms3_09', 'ms3_10', 'ms3_11', 'ms3_13'],
      flag: 'Claims strong follow-through identity but names motivation as the determining factor — conditional follow-through contradicts reliable follow-through',
    },
    {
      id: 'contradiction_3_3',
      description: 'Help-seeking self-rating vs. actual help-seeking behavior',
      questions: ['ms1_17', 'ms3_26', 'ms3_27', 'ms3_29'],
      flag: 'Rates own help-seeking capacity at 6+ but cannot name recent meaningful help-seeking and describes solo problem-solving as primary response',
    },
    {
      id: 'contradiction_3_4',
      description: 'Consequence awareness vs. behavioral urgency',
      questions: ['ms3_32', 'ms3_35', 'ms3_37'],
      flag: 'Can articulate the consequence chain clearly but urgency score is low — understands consequences intellectually, does not feel them behaviorally',
    },
    {
      id: 'contradiction_3_5',
      description: 'Reliability to others vs. reliability to self',
      questions: ['ms3_15', 'ms3_16', 'ms3_17', 'ms3_18'],
      flag: 'Confirms high reliability to others (would show up for friend at 11pm) combined with acknowledged self-reliability gap — asymmetric accountability',
    },
  ],
};
