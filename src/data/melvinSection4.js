// ─── MELVIN SECTION 4 — ACADEMIC REALITY ─────────────────────────────────────
// Built for Melvin Jr. — 17, Deep East Oakland, Morehouse-bound, Finance track.
// Probe: Separate ability vs. effort vs. avoidance. Identify the real source
//        of any academic risk before Morehouse — not to discourage, to prepare.
//
// Key tensions:
//   → 4.2 GPA (real achievement) vs. dyslexia + standardized test scores below grade level
//   → History of performing well with IEP support vs. no IEP plan at Morehouse yet
//   → "I understand the material" vs. current motivation/attendance drift
//   → Academic confidence (earned) vs. academic overconfidence (fragile)
//   → High school structure vs. college self-direction
//   → Ability is real — the question is whether the systems that supported it travel with him
//
// WHAT THIS SECTION MUST DETERMINE:
//   1. Is the current academic drift an effort issue, a structure issue, or an ability issue?
//   2. Does he have a recovery mechanism or does he wait for someone else to notice?
//   3. Does his confidence about Morehouse account for the dyslexia reality?
//   4. Will he set up IEP accommodations before or after the first academic crisis?
// ─────────────────────────────────────────────────────────────────────────────

export const MELVIN_SECTION_4 = {
  id: 'melvin_section4',
  title: 'Academic Reality',
  subtitle: 'Performance, Comprehension, Confidence, Recovery & Help-Seeking',
  userId: 'melvin',
  subsections: [
    'Class Performance',
    'Missing Work Patterns',
    'Comprehension',
    'Academic Confidence',
    'Academic Recovery Habits',
    'Help-Seeking Behavior',
  ],
  questions: [

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 4A — CLASS PERFORMANCE
    // Target: What is his actual performance right now — not historically?
    // Probe: Current grade reality, effort level this semester,
    //        honest account of what\'s happening in school right now
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms4_01',
      subsection: '4A',
      subsectionName: 'Class Performance',
      type: 'open',
      text: 'Where do your grades actually stand right now — this semester, this month? Not historically. What does your current grade report show?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Knows his grades specifically. Can name each class and approximate standing. Has checked recently.',
        weak: '"I think I\'m doing okay" or "I haven\'t checked lately" — disengagement from current academic reality is a significant signal.',
        complex: 'This is a baseline data question. His answer reveals both his actual standing AND how closely he is tracking his own performance. Disengagement from the grade picture is itself data.',
      },
      redFlags: [
        '"I think I\'m passing everything" without specifics',
        '"I haven\'t checked in a while"',
        'Can\'t name approximate grade in each class',
      ],
      followUp: {
        condition: 'vague answer given',
        question: 'When was the last time you actually looked at your grades — logged in and checked each class?',
      },
    },

    {
      id: 'ms4_02',
      subsection: '4A',
      subsectionName: 'Class Performance',
      type: 'forced_choice',
      text: 'Compared to where you were first semester — your effort, your attendance, your engagement — how would you describe your second semester performance?',
      options: [
        'At the same level or better — I haven\'t dropped off',
        'Slightly lower — the motivation is less but I\'m still showing up consistently',
        'Noticeably lower — there\'s a real gap between this semester and last',
        'Significantly lower — I\'ve mostly been going through the motions or not showing up',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Options C or D with honest self-acknowledgment — accurate self-assessment even of decline is valuable',
        weak: 'Option A when behavioral data (absences, motivation drop) clearly says otherwise — disconnection from current reality',
        complex: 'Option B is the minimum honest answer given what we know. C and D are more likely accurate. A is almost certainly not accurate given the documented pattern.',
      },
      redFlags: ['Option A — denial of documented decline'],
      followUp: {
        condition: 'answer is Option C or D',
        question: 'What specifically changed between first semester and now — was it one thing or was it gradual?',
      },
    },

    {
      id: 'ms4_03',
      subsection: '4A',
      subsectionName: 'Class Performance',
      type: 'slider',
      text: 'Rate your current academic effort this semester — not your ability, your actual daily effort — from 1 to 10.',
      min: 1,
      max: 10,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: '7–10 with behavioral evidence to support it',
        weak: '1–4: honest acknowledgment of low effort — this is useful data even though it\'s concerning',
        complex: '5–7: the most likely honest range. Cross-reference with attendance and missing work data in 4A and 4B.',
      },
      redFlags: ['9–10 with behavioral data showing absences and motivation drop — effort overestimation'],
      followUp: {
        condition: 'score <= 5',
        question: 'At what point this semester did effort start dropping? Was there a specific moment or was it gradual?',
      },
    },

    {
      id: 'ms4_04',
      subsection: '4A',
      subsectionName: 'Class Performance',
      type: 'scenario',
      text: 'A teacher pulls you aside after class and says your performance this semester is noticeably different from last semester. They\'re concerned. Walk me through what you say and what you\'re thinking internally.',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Honest with the teacher. Doesn\'t dismiss the concern. Can name what\'s going on. Opens a dialogue rather than closing it.',
        weak: '"I\'d tell them I\'m fine and I\'ll pick it up." Performance of composure that leaves the teacher without accurate information and him without support.',
        complex: 'This scenario tests his response to external accountability he didn\'t initiate. Does he use it or deflect it?',
      },
      redFlags: [
        '"I\'d reassure them and get out of the conversation"',
        'Internally dismisses teacher\'s concern',
        'Attributes the change to the transition without being honest about the extent',
      ],
      followUp: {
        condition: 'deflection or reassurance response detected',
        question: 'That teacher is doing you a favor by noticing. What would it look like to actually use that moment rather than manage it?',
      },
    },

    {
      id: 'ms4_05',
      subsection: '4A',
      subsectionName: 'Class Performance',
      type: 'open',
      text: 'Of your classes this semester — which one are you doing the worst in, and why? Be specific.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names a class. Names a real, specific reason. Shows awareness of the connection between the challenge and his pattern (dyslexia, missed days, disengagement).',
        weak: '"I\'m doing okay in all of them" — disconnected from actual performance reality; or names a class but can\'t articulate why.',
        complex: 'The specificity of his answer reveals how closely he is tracking his own academic experience. A student who knows exactly where he\'s struggling is already partially managing it.',
      },
      redFlags: [
        '"I\'m passing everything"',
        'Cannot name a specific class or reason',
        'Names a class but attributes it entirely to external factors (hard teacher, unfair test)',
      ],
      followUp: {
        condition: 'specific struggle named',
        question: 'What would it take to turn that class around before the semester ends?',
      },
    },

    {
      id: 'ms4_06',
      subsection: '4A',
      subsectionName: 'Class Performance',
      type: 'likert',
      text: 'My current grades are an accurate reflection of my ability.',
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
        strong: 'Disagree with clear articulation of why — effort or structure issue, not ability issue. Shows the distinction.',
        weak: 'Agree when grades are currently low — conflates current performance with ceiling ability; or Strongly Agree when grades are high without acknowledging IEP support as a factor.',
        complex: 'This is an ability vs. effort separation question. The ideal answer is "No — my grades right now reflect my effort and circumstances, not my ceiling." If he conflates them, that\'s either self-doubt (low grades = low ability) or overconfidence (high grades = fully unassisted ability).',
      },
      redFlags: [
        'Agrees that current low performance reflects actual ability — ability self-doubt',
        'Strongly Agrees that high performance is purely his ability with no acknowledgment of IEP support',
      ],
      followUp: {
        condition: 'answer conflates grades with ability',
        question: 'Is what you\'re turning in right now your best work — or is there a gap between what you\'re capable of and what you\'re currently producing?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 4B — MISSING WORK PATTERNS
    // Target: How does missing work happen — and does he recover from it?
    // Probe: Is missing work an effort issue, a structure issue, or avoidance?
    //        What happens after work is missed — does he catch up or compound?
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms4_07',
      subsection: '4B',
      subsectionName: 'Missing Work Patterns',
      type: 'open',
      text: 'When you miss a class or a deadline this semester, what\'s the typical sequence of events — walk me through exactly what happens next.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Has a clear recovery sequence: checks what was missed, reaches out to teacher or classmate, makes up the work within a defined window. Recovery is habitual, not accidental.',
        weak: 'Vague — "I catch up when I can." Or: misses work and lets it sit, then compounds with more missed work. Or: doesn\'t contact the teacher at all.',
        complex: 'The sequence after missing work is more revealing than the missing itself. Everyone misses things. The difference is whether the recovery system is active or passive.',
      },
      redFlags: [
        '"I usually figure it out"',
        'No mention of contacting teacher or getting notes',
        'Recovery described as waiting until before a test',
        'Missing work that compounds — one missed assignment leads to more',
      ],
      followUp: {
        condition: 'recovery is passive or absent',
        question: 'What usually happens to the grade when work piles up and you haven\'t caught up — do you generally recover it or does it stay low?',
      },
    },

    {
      id: 'ms4_08',
      subsection: '4B',
      subsectionName: 'Missing Work Patterns',
      type: 'forced_choice',
      text: 'When you\'re behind on something academic — an assignment, readings, a project — your most common response is:',
      options: [
        'I address it immediately — I reach out and make a plan to catch up',
        'I wait until I feel ready to deal with it, then I catch up',
        'I tell myself I\'ll do it later and it often doesn\'t get done',
        'I avoid thinking about it until it becomes a crisis or deadline',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A: immediate response — minimal compound effect',
        weak: 'Options C or D: avoidance and delay — exactly the pattern that compounds into academic failure',
        complex: 'Option B is honest and common. But "until I feel ready" is a waiting strategy that doesn\'t have a guaranteed trigger. Probe what "feeling ready" actually requires.',
      },
      redFlags: ['Option C or D — delayed or avoided engagement with academic gaps'],
      followUp: {
        condition: 'answer is Option B, C, or D',
        question: 'How long does it typically take from when you know you\'re behind to when you actually do something about it?',
      },
    },

    {
      id: 'ms4_09',
      subsection: '4B',
      subsectionName: 'Missing Work Patterns',
      type: 'likert',
      text: 'When I miss something — a class, an assignment, a deadline — I consistently follow up to make sure I don\'t fall further behind.',
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
        strong: 'Agree with specific recovery process described in ms4_07',
        weak: 'Agree with no described recovery system — the intention exists but the process doesn\'t',
        complex: 'Strongly Agree here with passive recovery described earlier is the core contradiction in 4B.',
      },
      redFlags: ['Agree or Strongly Agree with passive or absent recovery process in ms4_07'],
      followUp: null,
    },

    {
      id: 'ms4_10',
      subsection: '4B',
      subsectionName: 'Missing Work Patterns',
      type: 'scenario',
      text: 'It\'s a Tuesday you missed. There was a quiz and a homework assignment due. You get back Wednesday. Walk me through what you do — specifically, who you contact, when, and what you ask.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Contacts teacher same day or within 24 hours. Gets notes from a classmate. Asks about making up the quiz. Does this habitually, not exceptionally.',
        weak: 'Waits to see if the teacher brings it up. Doesn\'t reach out. Hopes it doesn\'t affect the grade much. No specific contact named.',
        complex: 'The specificity test: if he can walk through the exact sequence — who he emails, what he says, who he gets notes from — that\'s a functioning recovery system. If he can\'t, it doesn\'t exist.',
      },
      redFlags: [
        'No teacher contact described',
        '"I\'d just make sure I do the next assignment"',
        'Waiting for teacher to reach out first',
        '"I\'d figure it out" with no specific steps',
      ],
      followUp: {
        condition: 'no proactive contact described',
        question: 'At Morehouse, professors don\'t track you down after a missed class. What changes about your approach when there\'s no one prompting you to catch up?',
      },
    },

    {
      id: 'ms4_11',
      subsection: '4B',
      subsectionName: 'Missing Work Patterns',
      type: 'open',
      text: 'How much missing work do you have right now — across all your classes? Give me your honest estimate.',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Knows the answer specifically or approximately. Has been tracking it.',
        weak: '"I\'m not sure" or "not much" without specifics — disengagement from the actual missing work picture',
        complex: 'Not knowing how much is missing is as significant as having missing work. Both indicate disconnection from academic accountability.',
      },
      redFlags: [
        '"Not much" without specifics',
        '"I don\'t really track that"',
        'Clear uncertainty about what\'s missing',
      ],
      followUp: {
        condition: 'doesn\'t know the answer',
        question: 'When was the last time you sat down and took stock of exactly where you stand academically — every class, every missing assignment?',
      },
    },

    {
      id: 'ms4_12',
      subsection: '4B',
      subsectionName: 'Missing Work Patterns',
      type: 'forced_choice',
      text: 'When missing work accumulates, what usually brings you back to addressing it?',
      options: [
        'I check in with myself regularly — I address it before it piles up',
        'A grade notification or portal update shows me the impact',
        'A teacher brings it to my attention',
        'It gets bad enough that I have to deal with it',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A: proactive self-monitoring — the most reliable trigger for consistent recovery',
        weak: 'Option D: reactive-only recovery — crisis-driven rather than system-driven',
        complex: 'Options B and C are common and functional. The key question for Morehouse is whether those external triggers will exist — they may not.',
      },
      redFlags: ['Option D — crisis as the only trigger for addressing accumulation'],
      followUp: {
        condition: 'answer is Option C or D',
        question: 'At Morehouse, teachers won\'t track down individual students. If the external prompt disappears, what keeps you monitoring your own situation?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 4C — COMPREHENSION
    // Target: Separate understanding from performance.
    // Probe: Where does dyslexia actually impact — reading, processing, speed?
    //        Does he know the material but struggle with format?
    //        Does he know when he doesn\'t understand something — and say so?
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms4_13',
      subsection: '4C',
      subsectionName: 'Comprehension',
      type: 'open',
      text: 'When you\'re in a class and the material is clicking — you actually understand it — what does that look like for you? And when it\'s NOT clicking, what happens?',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Describes both states specifically. Can identify the difference. Has a process for when things aren\'t clicking.',
        weak: 'Can describe "clicking" but has no description for "not clicking" — suggests he checks out or hides when lost rather than having a response strategy.',
        complex: 'For Melvin, "not clicking" is most likely the dyslexia interface — when the reading load exceeds his processing speed. Understanding what this looks like for him specifically is critical Morehouse preparation.',
      },
      redFlags: [
        'No description of what "not clicking" looks like',
        '"It usually clicks for me" — difficulty acknowledging non-comprehension moments',
        'Non-comprehension described only in terms of subject matter, not format/load',
      ],
      followUp: {
        condition: '"not clicking" has no described response',
        question: 'When it\'s not clicking in class — right there in the moment — what do you do? Do you ask, wait, zone out, or something else?',
      },
    },

    {
      id: 'ms4_14',
      subsection: '4C',
      subsectionName: 'Comprehension',
      type: 'forced_choice',
      text: 'When you\'re reading something for school and you\'re struggling to absorb it — the words aren\'t landing — what do you do?',
      options: [
        'Reread it — I go through it again until it sticks',
        'Find it in another format — video, audio, diagrams — something that works better for me',
        'Move on and hope I catch it in class or from a classmate',
        'I get frustrated and usually end up not finishing the reading',
      ],
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option B: adaptive format-switching — the most sophisticated and effective response for a dyslexic learner',
        weak: 'Option D: frustration → abandonment — the most dangerous pattern for reading-heavy college coursework',
        complex: 'Option A alone may not be sufficient for severe dyslexia reading challenges — rereading the same format that isn\'t working is a low-yield strategy. Option C is common and not catastrophic but creates comprehension gaps.',
      },
      redFlags: [
        'Option D — frustration and non-completion as primary response',
        'Option A without any format alternatives for when rereading fails',
      ],
      followUp: {
        condition: 'answer is Option D',
        question: 'Morehouse finance coursework is reading-heavy. If frustration leads to non-completion, what\'s the plan for when that happens?',
      },
    },

    {
      id: 'ms4_15',
      subsection: '4C',
      subsectionName: 'Comprehension',
      type: 'likert',
      text: 'I usually know in the moment when I don\'t understand something — I can tell the difference between confusion and clarity.',
      options: [
        'Strongly Disagree',
        'Disagree',
        'Neutral',
        'Agree',
        'Strongly Agree',
      ],
      weight: 1.0,
      scoringDirection: 'strong',
      scoringNotes: {
        strong: 'Agree/Strongly Agree: strong metacognitive awareness — knows when he\'s lost',
        weak: 'Disagree/Strongly Disagree: poor in-the-moment comprehension monitoring — doesn\'t know when he\'s confused until it\'s too late',
        complex: 'For dyslexic learners, comprehension monitoring can be disrupted — they may understand the words but miss the meaning, or think they understand and not realize the gap until a test.',
      },
      redFlags: ['Strongly Disagree — significant metacognitive gap'],
      followUp: {
        condition: 'answer in ["Strongly Agree", "Agree"]',
        question: 'When you know you don\'t understand something in class — what do you do in that moment?',
      },
    },

    {
      id: 'ms4_16',
      subsection: '4C',
      subsectionName: 'Comprehension',
      type: 'open',
      text: 'Your dyslexia affects reading. Finance at Morehouse will be reading-heavy — textbooks, case studies, financial reports. What\'s your honest plan for managing that load?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Has a specific, multi-tool plan: IEP accommodations, text-to-speech software, audio textbooks, study groups where others read aloud, extended time on exams. Shows he\'s thought about this before being asked.',
        weak: '"I\'ll work harder and spend more time on readings." Time-based compensation with no format or accommodation strategy — the approach that ran out of runway at high school level will break faster at Morehouse.',
        complex: 'This is the single most critical academic preparation question in the assessment. His answer determines whether he arrives at Morehouse with a dyslexia management system or with a harder version of what got him to 4.2 in high school — and whether that harder version survives college workload.',
      },
      redFlags: [
        'No mention of IEP or disability services',
        '"I\'ll just study more" — time compensation without format strategy',
        '"I\'ve handled it fine so far" — past success as full plan for new environment',
        'No specific tools named (text-to-speech, audio books, note-taker)',
      ],
      followUp: {
        condition: 'no accommodation plan named',
        question: 'Morehouse has a disability services office. Have you reached out to them yet — or do you have a plan to do so before August?',
      },
    },

    {
      id: 'ms4_17',
      subsection: '4C',
      subsectionName: 'Comprehension',
      type: 'scenario',
      text: 'You\'re in Intro to Finance at Morehouse. The professor is moving fast. You understand the concepts when he explains them verbally — it clicks. But you go home and try to do the reading and it takes you three hours for twenty pages. Your classmates seem to do it in forty minutes. What do you do with that gap?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names the dyslexia as the specific source of the gap. Goes to disability services to activate extended time and alternate format materials. Leverages verbal comprehension strength — sits in front, attends office hours, finds study groups that discuss rather than just read.',
        weak: '"I\'d just keep pushing through it" — time-intensive solo effort without structural support. Reads for six hours instead of three, gets behind on other subjects, starts a spiral.',
        complex: 'This scenario tests whether he understands his OWN learning profile well enough to deploy the right strategy. Understanding verbally + struggling in print is a clear dyslexia profile. His response reveals whether he knows how to use that profile.',
      },
      redFlags: [
        'Plans to just spend more time on readings without format change',
        'No mention of using his verbal comprehension strength',
        'Doesn\'t name the dyslexia as the cause of the gap',
        'No accommodation or support strategy named',
      ],
      followUp: {
        condition: 'response acknowledges the gap but has no structural plan',
        question: 'The three-hour gap versus forty minutes is a real disadvantage in a high-load environment. What specific support structure closes that gap?',
      },
    },

    {
      id: 'ms4_18',
      subsection: '4C',
      subsectionName: 'Comprehension',
      type: 'slider',
      text: 'When you hear something explained verbally — in class, in a conversation, in a video — how well do you typically grasp and retain it?',
      min: 1,
      max: 10,
      weight: 1.0,
      scoringDirection: 'strong',
      scoringNotes: {
        strong: '7–10: strong verbal comprehension — should be leveraged as primary learning mode at Morehouse',
        weak: '1–4: verbal comprehension also impaired — if both reading AND verbal comprehension are low, the academic challenge is more significant',
        complex: 'For dyslexic learners, verbal strength is often the compensatory pathway. If he scores high here, the strategy is to design his learning around verbal input. That\'s the plan.',
      },
      redFlags: ['score 1–4 — both channels impaired'],
      followUp: {
        condition: 'score >= 7',
        question: 'That\'s your strength channel. What would it look like to build your Morehouse study strategy around verbal learning rather than treating reading as the only path?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 4D — ACADEMIC CONFIDENCE
    // Target: Is his academic confidence accurate, inflated, or deflated?
    // Probe: 4.2 GPA vs. standardized test gap, IEP-supported vs. unassisted,
    //        fragility of identity around first academic setback
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms4_19',
      subsection: '4D',
      subsectionName: 'Academic Confidence',
      type: 'slider',
      text: 'How confident are you in your ability to handle Morehouse-level coursework — academically, not just effort-wise?',
      min: 1,
      max: 10,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: '7–9: healthy confidence with room for difficulty — realistic optimism',
        weak: '10: no anticipated difficulty — likely hasn\'t fully accounted for dyslexia load at college level without established IEP',
        complex: '1–4: significant self-doubt — needs grounding in his actual track record, which is genuinely strong',
      },
      redFlags: [
        'Score 10 — probe for awareness of dyslexia and reading load at college level',
        'Score 1–3 — confidence collapse before starting',
      ],
      followUp: {
        condition: 'score === 10',
        question: 'What part of Morehouse academics are you most aware could genuinely challenge you — specifically around the reading load and your dyslexia?',
      },
    },

    {
      id: 'ms4_20',
      subsection: '4D',
      subsectionName: 'Academic Confidence',
      type: 'open',
      text: 'Your 4.2 GPA is real. It was earned with an IEP providing accommodations. At Morehouse, those accommodations don\'t transfer automatically — you have to set them up yourself. How does that change your academic picture?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Acknowledges the IEP dependency honestly. Understands that the 4.2 was earned with support that must be rebuilt at Morehouse. Has a plan to establish accommodations before classes start.',
        weak: '"My 4.2 proves I can handle it" — uses the achievement as evidence without accounting for the support structure that produced it. This is the academic overconfidence blind spot.',
        complex: 'This is the most important academic reality question in the section. His GPA is genuine — his ability is real. But without IEP transfer, he arrives at Morehouse performing a harder version of a system that worked with support.',
      },
      redFlags: [
        '"My GPA shows I can handle it without accommodations"',
        '"I\'ll figure out the IEP when I get there"',
        'No concrete plan to contact Morehouse disability services before August',
      ],
      followUp: {
        condition: 'plan to establish IEP is vague or absent',
        question: 'What\'s the specific step to contact Morehouse disability services — do you know who to call, what to send, when to do it?',
      },
    },

    {
      id: 'ms4_21',
      subsection: '4D',
      subsectionName: 'Academic Confidence',
      type: 'forced_choice',
      text: 'If your first two major grades at Morehouse are lower than you\'ve ever received — C range — your academic confidence would:',
      options: [
        'Stay intact — I\'d see it as a challenge to solve, not a reflection of my ability',
        'Take a hit, but I\'d recover and refocus once I understood the problem',
        'Be significantly shaken — I\'ve never gotten grades like that and I\'m not sure how I\'d process it',
        'Be tied directly to whether I belong there — it would make me question Morehouse',
      ],
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Options A or B: separates performance from identity — grade as data, not verdict',
        weak: 'Option D: identity-level fragility — an A student who gets C\'s questions whether he belongs — this is the most dangerous state for silent college withdrawal',
        complex: 'Option C is honest and human. The difference between C and D is whether the setback challenges strategy vs. challenges identity. Identity-level academic fragility in a new environment is a real collapse risk.',
      },
      redFlags: [
        'Option D — academic belonging contingent on grade level',
        'Option C combined with low help-seeking scores — shaken confidence + no help-seeking = silent withdrawal',
      ],
      followUp: {
        condition: 'answer is Option C or D',
        question: 'Your 4.2 is evidence that your ability is real. What would remind you of that when the grades say otherwise?',
      },
    },

    {
      id: 'ms4_22',
      subsection: '4D',
      subsectionName: 'Academic Confidence',
      type: 'likert',
      text: 'I understand the difference between my academic ability and my current academic performance — they\'re not the same thing.',
      options: [
        'Strongly Disagree',
        'Disagree',
        'Neutral',
        'Agree',
        'Strongly Agree',
      ],
      weight: 1.5,
      scoringDirection: 'strong',
      scoringNotes: {
        strong: 'Agree/Strongly Agree: cognitive separation of ability from output — protective against identity-linked academic fragility',
        weak: 'Strongly Disagree: fuses performance and ability — grades go down, self-belief goes down',
        complex: 'This distinction is the protective factor for academic resilience. If he can hold it — ability is stable, performance varies — he can recover from setbacks without identity damage.',
      },
      redFlags: ['Strongly Disagree — fuses performance and ability at identity level'],
      followUp: {
        condition: 'answer in ["Disagree", "Strongly Disagree"]',
        question: 'What does it mean about your ability if you get a C at Morehouse — specifically, what does that tell you about who you are?',
      },
    },

    {
      id: 'ms4_23',
      subsection: '4D',
      subsectionName: 'Academic Confidence',
      type: 'open',
      text: 'What do you actually know about the academic environment at Morehouse — how hard is it, what do students say, what does first semester look like for most people?',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Has done research. Talked to current students or alumni. Knows the academic culture. Has a realistic picture of what first semester actually involves.',
        weak: 'Vague or idealized — "it\'s a great school," "I know it\'ll be challenging." No specific knowledge about workload, grading, culture.',
        complex: 'Preparation is measured by specificity. Vague awareness of difficulty is not the same as knowing what to expect. The more specific his knowledge, the more prepared his transition.',
      },
      redFlags: ['"I know it\'ll be hard but I\'m ready" with no specific knowledge'],
      followUp: {
        condition: 'knowledge is vague',
        question: 'Have you talked to anyone currently at Morehouse — a student, an alum from the OK Program, anyone who\'s lived it?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 4E — ACADEMIC RECOVERY HABITS
    // Target: When things go wrong academically, does he have recovery systems?
    // Probe: Active vs. passive recovery, speed of response, who he involves
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms4_24',
      subsection: '4E',
      subsectionName: 'Academic Recovery Habits',
      type: 'open',
      text: 'Describe a time academically where things went off track — a grade dropped, you fell behind — and walk me through exactly how you got back on track. Be specific.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Specific event, specific recovery steps, specific timeline. Shows an active and habitual recovery process.',
        weak: '"I just worked harder until it went back up." No specifics. Or: can\'t name an example because things have never significantly dropped — which means the recovery system hasn\'t been tested.',
        complex: 'If his recovery system has never been tested (4.2 GPA, always recovered), the system is unverified. The question reveals both whether a system exists and whether it has a track record.',
      },
      redFlags: [
        'Cannot name a specific recovery example',
        'Recovery described entirely as increased solo effort with no external help',
        '"Things usually work out"',
      ],
      followUp: {
        condition: 'no specific recovery example available',
        question: 'If things haven\'t dropped significantly before, that means your recovery system hasn\'t been tested yet. At Morehouse, it will be. What\'s the plan?',
      },
    },

    {
      id: 'ms4_25',
      subsection: '4E',
      subsectionName: 'Academic Recovery Habits',
      type: 'forced_choice',
      text: 'When you realize you\'re falling behind academically, your first action is:',
      options: [
        'Map out what I\'ve missed and make a prioritized catch-up plan',
        'Talk to the teacher or professor to understand the damage and options',
        'Put in more hours on my own to close the gap',
        'Tell myself I\'ll deal with it after [thing] passes',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Options A or B: structured and/or relational recovery — both are functional systems',
        weak: 'Option D: deferred-action recovery — "after [thing] passes" has no defined endpoint and allows compounding',
        complex: 'Option C is common and not problematic in isolation. The issue is when C is the only tool — solo effort without structural clarity about what specifically needs to be recovered.',
      },
      redFlags: ['Option D — deferred recovery strategy'],
      followUp: {
        condition: 'answer is Option C or D',
        question: 'What\'s the specific thing you do to make sure "more hours" goes to the right things — or that you actually do deal with it after the thing passes?',
      },
    },

    {
      id: 'ms4_26',
      subsection: '4E',
      subsectionName: 'Academic Recovery Habits',
      type: 'scenario',
      text: 'It\'s week six at Morehouse. You\'ve missed three classes across two subjects. You have two assignments overdue. You haven\'t been to office hours. You haven\'t contacted your advisor. Walk me through your exact recovery plan — step by step, with a timeline.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Day 1: email both professors, get missing material, schedule office hours. Day 2: contact advisor, update on situation. This week: complete overdue work in priority order. Next week: office hours. Has a timeline.',
        weak: '"I\'d buckle down and get it done." No specific steps, no contact plan, no timeline. Solo effort with no institutional engagement.',
        complex: 'This is the most operationally specific scenario in the section. The quality of the step-by-step plan reveals whether he has a real recovery system or a general intention to catch up.',
      },
      redFlags: [
        'No professor or advisor contact in the plan',
        'No timeline — "I\'d handle it over the next few weeks"',
        '"I\'d just study more" without identifying what specifically to study',
      ],
      followUp: {
        condition: 'plan lacks institutional contact',
        question: 'At Morehouse, professors and advisors have resources to help students catch up — but only if the student shows up. What makes that hard to do?',
      },
    },

    {
      id: 'ms4_27',
      subsection: '4E',
      subsectionName: 'Academic Recovery Habits',
      type: 'likert',
      text: 'When I\'m behind academically, I recover quickly and completely — I don\'t let setbacks linger.',
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
        strong: 'Agree with behavioral evidence — a track record of fast, complete recovery',
        weak: 'Agree without a tested recovery system (never had a real setback)',
        complex: 'Cross-reference with ms4_24. If he can\'t name a specific recovery example, this agreement is untested confidence.',
      },
      redFlags: ['Strongly Agree with no specific recovery example from ms4_24'],
      followUp: null,
    },

    {
      id: 'ms4_28',
      subsection: '4E',
      subsectionName: 'Academic Recovery Habits',
      type: 'open',
      text: 'What would your academic recovery system at Morehouse actually look like — who is in it, what tools does it use, what triggers it before things get bad?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Specific system with people (advisor, disability services, study group, professor), tools (calendar, grade tracker, IEP), and triggers (grade below X, missed more than 1 class, feeling lost for 3+ days). Built before it\'s needed.',
        weak: '"I\'d figure it out when I needed to." No pre-built system. Crisis-activation only.',
        complex: 'The recovery system should exist before the crisis. Whether he can describe it in advance reveals whether he\'s building infrastructure or assuming he\'ll improvise.',
      },
      redFlags: ['"I\'d figure it out" — no pre-built system named'],
      followUp: {
        condition: 'system is vague or absent',
        question: 'Before you leave for Morehouse — what would it take to have that system built? Who would be in it and what would trigger it?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 4F — HELP-SEEKING BEHAVIOR (ACADEMIC)
    // Target: Will he use academic resources before he needs them?
    // Probe: Comfort with institutional help, IEP disclosure readiness,
    //        office hours behavior, tutoring, study group engagement
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms4_29',
      subsection: '4F',
      subsectionName: 'Help-Seeking Behavior',
      type: 'open',
      text: 'Have you ever gone to a teacher\'s office hours proactively — not because you failed, but because you wanted to understand something better? Describe it.',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Yes — specific example. Proactive office hours use. Shows comfort with initiating academic support relationships.',
        weak: '"I\'ve never really had to" or "I haven\'t needed to go" — history of academic success without using institutional support. This is a risk factor for Morehouse, where the workload will require support.',
        complex: 'His 4.2 GPA may have been achievable without proactive office hours in high school. At Morehouse, office hours relationships are part of how high performers succeed.',
      },
      redFlags: [
        '"I\'ve never really needed to"',
        'No example available',
      ],
      followUp: {
        condition: 'no proactive office hours use',
        question: 'At Morehouse, finance professors often give research opportunities and recommendations to students who come to office hours. What would make you go before you need to — just to build the relationship?',
      },
    },

    {
      id: 'ms4_30',
      subsection: '4F',
      subsectionName: 'Help-Seeking Behavior',
      type: 'forced_choice',
      text: 'When you don\'t understand something in class, what do you typically do?',
      options: [
        'Ask in the moment — I raise my hand or stay after class',
        'Look it up or figure it out on my own after class',
        'Ask a classmate or study partner',
        'Let it go and hope it becomes clear over time',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A: immediate in-class help-seeking — proactive and relationship-building',
        weak: 'Option D: passive approach — letting confusion persist without active resolution strategy',
        complex: 'Options B and C are functional and common. For a dyslexic learner, Option B (self-research) may be less effective than C (classmate discussion) if the self-research relies heavily on reading.',
      },
      redFlags: ['Option D — passive non-resolution of confusion'],
      followUp: {
        condition: 'answer is Option B',
        question: 'When you look it up on your own — does that usually work well for you given your dyslexia? Or do you have a specific format you go to?',
      },
    },

    {
      id: 'ms4_31',
      subsection: '4F',
      subsectionName: 'Help-Seeking Behavior',
      type: 'scenario',
      text: 'You\'ve been accepted to Morehouse. You know your IEP doesn\'t automatically transfer. Morehouse disability services can give you: extended test time, a note-taker, text-to-speech tools, alternate format materials, quiet testing rooms. This requires you to disclose your dyslexia and submit documentation. What is the first step you take and when?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Has already contacted them or has a specific plan: email disability services this week, request accommodation meeting, gather IEP documentation from high school, schedule before semester starts.',
        weak: '"I\'ll handle it when I get there" or "I\'ll see how the first few weeks go." Waits until after difficulty arises to set up the support that should precede it.',
        complex: 'This is the most operationally urgent question in Section 4. Setting up accommodations before the semester is not optional — it\'s what determines whether his dyslexia is managed or a permanent disadvantage.',
      },
      redFlags: [
        '"I\'ll figure it out when I get there"',
        '"I\'ll see how the first few weeks go first"',
        'No specific first step or timeline named',
        'Hesitation about disclosing dyslexia at all',
      ],
      followUp: {
        condition: 'no concrete plan or timeline',
        question: 'The accommodation setup takes time — documentation, a meeting, approval. If you wait until week two of classes, you\'ll be behind before the support is in place. What stops you from doing this before August?',
      },
    },

    {
      id: 'ms4_32',
      subsection: '4F',
      subsectionName: 'Help-Seeking Behavior',
      type: 'likert',
      text: 'I would use tutoring, academic support centers, or study groups at Morehouse without feeling like it means I\'m not smart enough to be there.',
      options: [
        'Strongly Disagree',
        'Disagree',
        'Neutral',
        'Agree',
        'Strongly Agree',
      ],
      weight: 1.5,
      scoringDirection: 'strong',
      scoringNotes: {
        strong: 'Agree/Strongly Agree: academic support is not threatening to his identity — uses resources as a strategy, not a last resort',
        weak: 'Disagree/Strongly Disagree: academic support use is tied to intelligence signaling — major barrier to early intervention',
        complex: 'The specific phrasing "without feeling like it means I\'m not smart enough" is the identity-safety test. Top performers at elite HBCUs use academic resources extensively. This is a strategy, not a weakness signal.',
      },
      redFlags: ['Disagree or Strongly Disagree — shame barrier to academic support use'],
      followUp: {
        condition: 'answer in ["Disagree", "Strongly Disagree"]',
        question: 'The top-performing students at HBCUs use tutoring and study groups more than average students — not less. How does knowing that change how you see it?',
      },
    },

    {
      id: 'ms4_33',
      subsection: '4F',
      subsectionName: 'Help-Seeking Behavior',
      type: 'open',
      text: 'If your mom called and asked how school was going and things were actually rough — grades down, behind on work, struggling with dyslexia and the reading load — what do you tell her?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Tells her the truth. Names the specific struggle. Lets her be a resource rather than a person to protect.',
        weak: '"I\'d tell her things are fine — I don\'t want to worry her." Protective withholding — exactly the pattern that compounded his brother\'s situation.',
        complex: 'This is the academic transparency test with the person who matters most. His protective relationship with his mom is a strength AND a potential barrier to getting support. This question surfaces whether that barrier is active.',
      },
      redFlags: [
        '"I\'d tell her things are fine"',
        '"She has enough to worry about"',
        '"I\'d handle it first before telling her"',
      ],
      followUp: {
        condition: 'protective withholding is the response',
        question: 'Your brother kept things from your mom to protect her. By the time she found out, the situation was much worse. What would it take for your version of that story to be different?',
      },
    },

    {
      id: 'ms4_34',
      subsection: '4F',
      subsectionName: 'Help-Seeking Behavior',
      type: 'slider',
      text: 'How proactively will you use academic support resources at Morehouse — before problems arise, not just when they\'re bad?',
      min: 1,
      max: 10,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: '7–10: proactive resource use — builds support infrastructure before it\'s needed',
        weak: '1–4: reactive resource use — waits for crisis; high-risk for compounding problems',
        complex: 'Cross-reference with ms4_31. If he rates himself 8+ here but has no plan for IEP setup in ms4_31, the rating is aspirational.',
      },
      redFlags: [
        'Score 8+ with no concrete proactive plan in ms4_28 or ms4_31',
        'Score 1–4 — reactive-only help-seeking confirmed',
      ],
      followUp: {
        condition: 'score >= 7 with no concrete proactive plan elsewhere',
        question: 'What specifically, in the next 30 days before August, will you do that demonstrates that proactive approach?',
      },
    },

  ],
};

// ─── SCORING CONFIGURATION ───────────────────────────────────────────────────

export const MELVIN_SECTION_4_SCORING = {
  subsections: {
    '4A': { name: 'Class Performance', maxWeight: 10.0, redFlagThreshold: 2 },
    '4B': { name: 'Missing Work Patterns', maxWeight: 10.0, redFlagThreshold: 2 },
    '4C': { name: 'Comprehension', maxWeight: 10.5, redFlagThreshold: 2 },
    '4D': { name: 'Academic Confidence', maxWeight: 10.5, redFlagThreshold: 2 },
    '4E': { name: 'Academic Recovery Habits', maxWeight: 11.5, redFlagThreshold: 2 },
    '4F': { name: 'Help-Seeking Behavior', maxWeight: 10.5, redFlagThreshold: 3 },
  },
  globalRedFlags: [
    'IEP not established at Morehouse — no plan, no timeline, no contact made (4F)',
    'Dyslexia management plan is time-compensation only — no format or accommodation strategy (4C)',
    'Academic confidence fused with identity — first C triggers belonging question, not strategy question (4D)',
    'Recovery system untested and unbuilt — no plan for Morehouse academic setback (4E)',
    'Protective withholding from Mom when academically struggling — same pattern as Mekhi (4F)',
    'Current grade reality unknown — not tracking own academic standing (4A)',
    'Missing work compound pattern — avoids, then it accumulates, then crisis (4B)',
    'Verbal comprehension strong but no plan to leverage as primary learning mode (4C)',
  ],
  contradictionChecks: [
    {
      id: 'contradiction_4_1',
      description: 'Academic confidence vs. IEP dependency',
      questions: ['ms4_19', 'ms4_20', 'ms4_22'],
      flag: 'Claims high academic confidence for Morehouse but hasn\'t accounted for IEP support dependency — 4.2 GPA was built with accommodations that don\'t automatically transfer',
    },
    {
      id: 'contradiction_4_2',
      description: 'Recovery confidence vs. untested recovery system',
      questions: ['ms4_24', 'ms4_27', 'ms4_28'],
      flag: 'Rates recovery speed highly but cannot name a specific tested recovery experience — confidence in an unverified system',
    },
    {
      id: 'contradiction_4_3',
      description: 'Proactive help-seeking self-rating vs. no proactive plan',
      questions: ['ms4_29', 'ms4_31', 'ms4_34'],
      flag: 'Rates proactive resource use at 7+ but has no plan for IEP setup, no history of proactive office hours, no step-by-step recovery plan',
    },
    {
      id: 'contradiction_4_4',
      description: 'Grades = ability vs. grades ≠ ability',
      questions: ['ms4_06', 'ms4_21', 'ms4_22'],
      flag: 'Says current grades don\'t reflect true ability (4A) but treats first Morehouse setback as an identity/belonging question rather than a strategy question (4D)',
    },
    {
      id: 'contradiction_4_5',
      description: 'Transparency commitment vs. protective withholding',
      questions: ['ms3_22', 'ms4_33'],
      flag: 'Claims honesty with Mom as a standard but plans to protect her from academic difficulty — same withholding pattern identified in Section 3D',
    },
  ],
};
