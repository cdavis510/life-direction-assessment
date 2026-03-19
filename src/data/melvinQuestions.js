// ─── MELVIN-SPECIFIC QUESTIONS ────────────────────────────────────────────────
// Built for Melvin Jr. — 17, Deep East Oakland, 4.2 GPA, Morehouse-bound.
// Finance & sports business track. Dyslexia IEP. Post-basketball transition.
// Father deceased (Feb 2023). Oakland Kids Program. Legacy-driven.
// ─────────────────────────────────────────────────────────────────────────────
//
// QUESTION TYPES:
//   likert       — 1–5 agreement scale (Strongly Disagree → Strongly Agree)
//   slider       — 1–10 numeric rating
//   forced_choice — pick one from 4 options (no "all of the above")
//   scenario     — "Here's a situation — what do you do?"
//   open         — free text response
//
// SCORING DIRECTION:
//   strong   — what a high-functioning, self-aware answer looks like
//   weak     — what a concerning or avoidant answer looks like
//   complex  — requires contextual interpretation, no simple high/low
//
// WEIGHT: 0.5 (supporting) → 1.0 (standard) → 1.5 (high signal) → 2.0 (critical)
// ─────────────────────────────────────────────────────────────────────────────

export const MELVIN_SECTION_1 = {
  id: 'melvin_section1',
  title: 'Emotional & Mental State',
  subtitle: 'Mood, Stress, Regulation, Confidence & Self-Awareness',
  userId: 'melvin',
  subsections: [
    'Mood Stability',
    'Stress Tolerance',
    'Emotional Regulation',
    'Confidence Level',
    'Self-Awareness',
    'Shutdown & Avoidance Patterns',
  ],
  questions: [

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 1A — MOOD STABILITY
    // Target: Is the post-basketball transition affecting baseline mood?
    // Probe: consistency, morning state, unexplained drops, energy levels
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms1_01',
      subsection: '1A',
      subsectionName: 'Mood Stability',
      type: 'slider',
      text: 'On a scale of 1–10, how would you rate your overall mood over the past two weeks — not one good or bad day, but your average?',
      min: 1,
      max: 10,
      weight: 1.5,
      scoringDirection: 'strong',
      scoringNotes: {
        strong: '7–10: stable baseline, positive affect maintained despite transitions',
        weak: '1–4: significant mood depression, especially concerning given school absences and basketball ending',
        complex: '5–6: surface-level fine, but worth probing — may be minimizing',
      },
      redFlags: ['score 1–4', 'score 5 combined with avoidance answers in 1F'],
      followUp: {
        condition: 'score <= 5',
        question: 'What do you think has been pulling your mood down the most lately?',
      },
    },

    {
      id: 'ms1_02',
      subsection: '1A',
      subsectionName: 'Mood Stability',
      type: 'forced_choice',
      text: 'How do you feel most mornings when you wake up right now — be honest, not how you think you should feel?',
      options: [
        'Ready — I wake up with purpose and energy',
        'Okay — I get up but it takes a minute',
        'Heavy — it takes real effort just to start the day',
        'Empty — I get up because I have to, not because I want to',
      ],
      weight: 1.5,
      scoringDirection: 'strong',
      scoringNotes: {
        strong: 'Option A: healthy baseline energy, active orientation toward the day',
        weak: 'Options C or D: significant motivational deficit — red flag when combined with school absences',
        complex: 'Option B: acceptable, but should be tracked — especially for Morehouse readiness',
      },
      redFlags: ['Option D — "Empty"', 'Option C combined with low ms1_01 score'],
      followUp: {
        condition: 'answer in ["Heavy", "Empty"]',
        question: 'Has that feeling been there for a while, or is this recent? When did it start?',
      },
    },

    {
      id: 'ms1_03',
      subsection: '1A',
      subsectionName: 'Mood Stability',
      type: 'likert',
      text: 'My mood is mostly consistent day to day — I don\'t have big swings between feeling fine and feeling low.',
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
        strong: 'Agree/Strongly Agree: emotional consistency — supports Morehouse transition readiness',
        weak: 'Strongly Disagree/Disagree: mood instability present — needs more investigation',
        complex: 'Neutral: may be holding in variability he doesn\'t name as "swings"',
      },
      redFlags: ['Strongly Disagree'],
      followUp: null,
    },

    {
      id: 'ms1_04',
      subsection: '1A',
      subsectionName: 'Mood Stability',
      type: 'scenario',
      text: 'Basketball season just ended for you — the last game of your high school career is over. Describe honestly how that\'s been sitting with you. Not what you said to others, but what it actually feels like inside.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Acknowledges grief, loss, or transition with some self-awareness. Named emotions. Processing out loud.',
        weak: 'Deflects with "I\'m good" or gives surface-level answer. Complete minimization. No emotion named.',
        complex: 'Watch for denial that contradicts behavioral data (missing school, staying up late, motivation drop). If he says "it\'s fine" but the behaviors say otherwise — that gap is the data.',
      },
      redFlags: [
        '"It\'s fine" with no elaboration',
        'Complete dismissal of basketball ending as significant',
        'Angry or defensive response to the question itself',
      ],
      followUp: {
        condition: 'response lacks emotional content',
        question: 'That last game — did it feel like an ending of something bigger than basketball?',
      },
    },

    {
      id: 'ms1_05',
      subsection: '1A',
      subsectionName: 'Mood Stability',
      type: 'forced_choice',
      text: 'In the last month, how often have you felt genuinely motivated — like you actually wanted to get things done?',
      options: [
        'Most days — I stay locked in',
        'Some days — it comes and goes',
        'A few days — mostly I\'ve been coasting',
        'Rarely — the motivation just hasn\'t been there',
      ],
      weight: 1.5,
      scoringDirection: 'strong',
      scoringNotes: {
        strong: 'Option A: strong motivational baseline — healthy for Morehouse prep',
        weak: 'Option D: significant motivation deficit — particularly concerning given Morehouse start in 5 months',
        complex: 'Option C: honest answer but a yellow flag — "coasting" after early college acceptance is common and dangerous',
      },
      redFlags: ['Option D', 'Option C if combined with school absence answers'],
      followUp: {
        condition: 'answer in ["A few days", "Rarely"]',
        question: 'What used to drive you that isn\'t driving you the same way right now?',
      },
    },

    {
      id: 'ms1_06',
      subsection: '1A',
      subsectionName: 'Mood Stability',
      type: 'likert',
      text: 'There are things happening in my life right now that are weighing on me emotionally — even if I haven\'t talked about them with anyone.',
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
        strong: 'Agree/Strongly Agree + willingness to elaborate = healthy self-awareness',
        weak: 'Strongly Disagree when behavioral data says otherwise = denial pattern',
        complex: 'This is a contradiction detection question. If he agrees here but minimizes in ms1_04, that gap matters.',
      },
      redFlags: ['Strongly Disagree when other answers signal emotional weight'],
      followUp: {
        condition: 'answer in ["Agree", "Strongly Agree"]',
        question: 'You don\'t have to name it all — but what\'s one thing sitting with you that you haven\'t fully dealt with?',
      },
    },

    {
      id: 'ms1_07',
      subsection: '1A',
      subsectionName: 'Mood Stability',
      type: 'open',
      text: 'When you think about your dad — his life, how he died, the relationship you two had — does that come up for you emotionally? Has anything changed in how you think about him over time?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Any authentic engagement with the question — grief named, complicated feelings acknowledged, some processing happening',
        weak: 'Complete shutdown, single-word answer, or "I don\'t think about it" — indicates unprocessed grief that will surface under pressure',
        complex: 'This is one of the most important windows in the entire assessment. His relationship to his father\'s death (addiction, appearance, complicated love) shapes his relationship to ambition, masculinity, and addiction risk. Do not rush this answer.',
      },
      redFlags: [
        'One-word or dismissive answer',
        '"I don\'t care" or "He wasn\'t really there anyway" with no elaboration',
        'Visible agitation at the question',
      ],
      followUp: {
        condition: 'answer lacks emotional depth',
        question: 'Sometimes the hardest losses are the complicated ones — where you loved someone but the relationship was painful too. Does that feel true for you?',
      },
    },

    {
      id: 'ms1_08',
      subsection: '1A',
      subsectionName: 'Mood Stability',
      type: 'slider',
      text: 'How much hope do you have right now — not just about college, but about your life in general? Rate it honestly.',
      min: 1,
      max: 10,
      weight: 1.5,
      scoringDirection: 'strong',
      scoringNotes: {
        strong: '8–10: strong hopeful orientation — major protective factor',
        weak: '1–4: concerning — especially before a major life transition like Morehouse',
        complex: '5–7: mixed hope — note what he attributes to the uncertainty',
      },
      redFlags: ['score 1–4'],
      followUp: {
        condition: 'score <= 6',
        question: 'What would need to be different for that number to be higher?',
      },
    },

    {
      id: 'ms1_09',
      subsection: '1A',
      subsectionName: 'Mood Stability',
      type: 'forced_choice',
      text: 'When you picture yourself at Morehouse — walking onto campus, being in class, building your life there — which feeling hits first?',
      options: [
        'Excited — I\'ve been building toward this',
        'Ready but nervous — I know what I\'m walking into',
        'Uncertain — I\'m not sure I\'m as prepared as I thought',
        'Detached — I\'m going, but it doesn\'t feel real yet',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Options A or B: healthy anticipation — active engagement with the transition',
        weak: 'Option D: emotional disconnection from a milestone he earned — may signal post-basketball depression or unprocessed loss',
        complex: 'Option C: honest and important — academic overconfidence risk named by him, which means he has some awareness',
      },
      redFlags: ['Option D — detachment from Morehouse arrival'],
      followUp: {
        condition: 'answer is "Detached"',
        question: 'When you imagine what Morehouse will actually be like day to day — not the idea of it, but the reality — what do you think will be the hardest part?',
      },
    },

    {
      id: 'ms1_10',
      subsection: '1A',
      subsectionName: 'Mood Stability',
      type: 'open',
      text: 'Is there anything happening emotionally right now that you haven\'t told anyone? Something you\'re just carrying by yourself?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Any disclosure — even partial — shows trust in the process and some willingness to surface what\'s being held',
        weak: '"No, I\'m good" from someone who scores low on mood and motivation throughout this section = significant suppression pattern',
        complex: 'Melvin carries alone. He held in that he didn\'t make starter for years. This question is an invitation. Don\'t penalize a "no" — flag it in context of the full section.',
      },
      redFlags: [
        '"No" with no elaboration when rest of section shows emotional weight',
        'Sudden shift to shorter, more guarded answers after earlier openness',
      ],
      followUp: {
        condition: 'answer is brief or dismissive',
        question: 'You\'ve shown a lot of strength in your life — but strength doesn\'t mean carrying everything alone. What would it mean to you to actually let someone in on something hard?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 1B — STRESS TOLERANCE
    // Target: Does his external composure reflect internal stability?
    // Probe: performance under pressure, deadline behavior, high-stakes moments
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms1_11',
      subsection: '1B',
      subsectionName: 'Stress Tolerance',
      type: 'slider',
      text: 'When you\'re under real pressure — a deadline, a big game, a test, a hard conversation — how well do you hold up? Rate yourself honestly from 1 to 10.',
      min: 1,
      max: 10,
      weight: 1.0,
      scoringDirection: 'strong',
      scoringNotes: {
        strong: '7–10: strong tolerance — important for finance career environments which are high-pressure by nature',
        weak: '1–4: low tolerance — needs development strategies before Morehouse',
        complex: '5–6: average — watch for overconfidence if self-rating doesn\'t match behavioral evidence',
      },
      redFlags: ['score 1–4', 'score 9–10 combined with avoidance patterns in section 1F (overconfidence signal)'],
      followUp: {
        condition: 'score >= 8',
        question: 'Tell me about a time pressure actually got to you — a moment where you felt it more than you let on.',
      },
    },

    {
      id: 'ms1_12',
      subsection: '1B',
      subsectionName: 'Stress Tolerance',
      type: 'scenario',
      text: 'You\'re at Morehouse, sophomore year. You have a major finance exam in 48 hours. You\'ve been behind in the reading for three weeks because the material is dense and your dyslexia is making it take twice as long as everyone else. Your professor doesn\'t know about your IEP yet. Walk me through what you do.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Reaches out for support (professor, disability services, tutor, study group). Makes a plan. Acknowledges the dyslexia as a factor without shame. Takes action.',
        weak: 'Shuts down, avoids, plans to "wing it," or doesn\'t mention the dyslexia at all. Handles it silently and hopes for the best.',
        complex: 'This scenario tests the collision between his dyslexia reality and his pride. The gap between what he says here and what he actually does under pressure is the key signal.',
      },
      redFlags: [
        '"I\'d figure it out" with no concrete plan',
        'No mention of seeking help or disclosing dyslexia',
        'Plans to study alone without any accommodations strategy',
      ],
      followUp: {
        condition: 'response lacks help-seeking or disclosure',
        question: 'At Morehouse, disclosing your IEP to disability services is what unlocks your accommodations. What would hold you back from doing that on Day 1?',
      },
    },

    {
      id: 'ms1_13',
      subsection: '1B',
      subsectionName: 'Stress Tolerance',
      type: 'forced_choice',
      text: 'When stress builds up over time — not one big moment but sustained pressure — what happens to you?',
      options: [
        'I stay focused — sustained pressure actually helps me lock in',
        'I manage it until something cracks, then I have to reset',
        'I start to withdraw — I go quieter and do less',
        'I push through but I know I\'m not performing at my best',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A: genuine stress response — high-functioning under sustained pressure',
        weak: 'Option C: withdrawal under sustained stress is his known pattern — school absences, staying up late, motivation drop all fit here',
        complex: 'Option B is honest and human. Option D shows self-awareness. Both are workable. Option C matched with behavioral data is the critical flag.',
      },
      redFlags: ['Option C — especially if behavioral data shows school absences'],
      followUp: {
        condition: 'answer is "I start to withdraw"',
        question: 'When you withdraw under pressure, how does it usually show up — physically, behaviorally? What does someone watching you from the outside see?',
      },
    },

    {
      id: 'ms1_14',
      subsection: '1B',
      subsectionName: 'Stress Tolerance',
      type: 'likert',
      text: 'When I\'m under pressure, I perform better than I do in low-stakes situations.',
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
        strong: 'Agree/Strongly Agree: pressure-activated performer — strong trait for finance and sports business',
        weak: 'Strongly Disagree: significant concern for Morehouse and high-pressure career environments',
        complex: 'Cross-reference with ms1_12 scenario answer. Someone who says they perform better under pressure but avoids help-seeking has a blind spot.',
      },
      redFlags: null,
      followUp: null,
    },

    {
      id: 'ms1_15',
      subsection: '1B',
      subsectionName: 'Stress Tolerance',
      type: 'open',
      text: 'Describe a moment — school, basketball, family, anything — where you were under the most stress you\'ve ever been. What happened? And what did you do?',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Specific, detailed, emotionally present story. Describes what he actually did — including any ways he struggled. Shows insight in retrospect.',
        weak: 'Vague answer, deflection, or a story where he conveniently "handled it perfectly" with no struggle named.',
        complex: 'The content of the story matters less than the presence or absence of emotional honesty within it.',
      },
      redFlags: ['No story offered', '"I don\'t really get stressed like that"'],
      followUp: {
        condition: 'story involves family, father, or basketball',
        question: 'Did you have anyone to help you carry that — or was it mostly on you?',
      },
    },

    {
      id: 'ms1_16',
      subsection: '1B',
      subsectionName: 'Stress Tolerance',
      type: 'forced_choice',
      text: 'Your first month at Morehouse, things are harder than expected — academically, socially, or both. What does Melvin do?',
      options: [
        'I dig in harder and find solutions — failure is not an option',
        'I reach out to someone — advisor, mentor, or Mom — and get support',
        'I push through quietly and hope it gets better on its own',
        'I go through the motions while things slowly get worse',
      ],
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Options A or B: proactive response to adversity — critical for Morehouse success',
        weak: 'Option D: passive spiral — this is exactly what happened to his brother. The quiet deterioration pattern.',
        complex: 'Option C is concerning because "hoping it gets better" without action is how college failure compounds silently. Watch for this pattern across the full assessment.',
      },
      redFlags: [
        'Option D — passive spiral under pressure',
        'Option C combined with low help-seeking scores elsewhere',
      ],
      followUp: {
        condition: 'answer in ["Option C", "Option D"]',
        question: 'Your brother pushed through quietly at Clark Atlanta — and things got much worse. What would make your experience different from his?',
      },
    },

    {
      id: 'ms1_17',
      subsection: '1B',
      subsectionName: 'Stress Tolerance',
      type: 'slider',
      text: 'How good are you at asking for help when you\'re struggling — not in theory, but in practice?',
      min: 1,
      max: 10,
      weight: 1.5,
      scoringDirection: 'strong',
      scoringNotes: {
        strong: '7–10: strong help-seeking — critical buffer against college silent failure',
        weak: '1–4: low help-seeking in a young man who holds things in — major risk factor',
        complex: 'Self-rating above 6 should be cross-checked with scenario responses in 1B and 1F',
      },
      redFlags: ['score 1–4'],
      followUp: {
        condition: 'score <= 5',
        question: 'What makes asking for help feel hard for you — is it pride, not wanting to burden people, or something else?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 1C — EMOTIONAL REGULATION
    // Target: How does he process, express, and recover from emotion?
    // Probe: the holding-in pattern, the one crying incident, grief processing
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms1_18',
      subsection: '1C',
      subsectionName: 'Emotional Regulation',
      type: 'open',
      text: 'When something hits you emotionally — something disappointing, something painful, something that knocks you back — what actually happens inside you? Walk me through the real process, not the composed version.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Describes an actual internal process. Names emotions. Acknowledges difficulty. Shows some ability to reflect.',
        weak: '"I don\'t really let things affect me" — this is his probable answer and it is the data. Emotional suppression presented as strength.',
        complex: 'For Melvin, not reacting IS his reaction. The question is whether he has a processing pathway at all, or whether emotion just goes underground.',
      },
      redFlags: [
        '"I just let it go and move on" with no process named',
        '"I don\'t really get emotional like that"',
        'No emotion word used anywhere in the response',
      ],
      followUp: {
        condition: 'response lacks emotional vocabulary',
        question: 'You didn\'t cry from babyhood until you weren\'t named a starter this season. That\'s a long time to hold things in. Where does the hard stuff go when you don\'t let it out?',
      },
    },

    {
      id: 'ms1_19',
      subsection: '1C',
      subsectionName: 'Emotional Regulation',
      type: 'forced_choice',
      text: 'When you\'re feeling something difficult — anger, sadness, disappointment — what do you usually do with it?',
      options: [
        'I feel it, process it, and let it go — I work through it',
        'I sit with it privately until it fades on its own',
        'I push it down and stay focused on what I have to do',
        'It comes out sideways — in my mood, my energy, or how I treat people',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A: healthy processing cycle — adaptive regulation',
        weak: 'Option C: suppression presented as function — sustainable short-term, compounds long-term',
        complex: 'Option B has nuance — private processing isn\'t always avoidance. Option D is self-aware and worth probing.',
      },
      redFlags: ['Option C combined with low openness in ms1_18', 'Option D — named awareness of leakage'],
      followUp: {
        condition: 'answer is "It comes out sideways"',
        question: 'When it comes out sideways — how does the people around you usually see it?',
      },
    },

    {
      id: 'ms1_20',
      subsection: '1C',
      subsectionName: 'Emotional Regulation',
      type: 'likert',
      text: 'I handle difficult emotions better when I\'m alone than when I\'m around other people.',
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
        strong: 'Disagree: comfort processing in community — healthy for college social environment',
        weak: 'Strongly Agree: strong alone-processing preference — not a problem unless it means never processing at all',
        complex: 'For Melvin, Strongly Agree likely means he goes to his room alone and sits with it. That works until the pressure is too large for one person to carry.',
      },
      redFlags: ['Strongly Agree combined with low help-seeking scores'],
      followUp: null,
    },

    {
      id: 'ms1_21',
      subsection: '1C',
      subsectionName: 'Emotional Regulation',
      type: 'scenario',
      text: 'You get your first exam grade back at Morehouse — it\'s a 68. You studied. You knew the material. But the reading comprehension part hit your dyslexia hard. The professor hands it back in front of the class. Describe your internal reaction and what you do in the next 24 hours.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names the frustration honestly. Identifies the dyslexia as a factor without shame. Makes a concrete next step (office hours, disability services, tutor). Doesn\'t spiral.',
        weak: 'Shuts down, feels like a fraud, doesn\'t name the dyslexia as context, isolates, or plans to "do better next time" without any structural change.',
        complex: 'This is the most likely failure point for Melvin at Morehouse. A drop from A\'s to C\'s could devastate his identity. His regulation response in this scenario predicts how he\'ll handle it in real life.',
      },
      redFlags: [
        '"I would just work harder next time" with no structural plan',
        'Shame language — "I\'m not smart enough for this"',
        'No mention of IEP or accommodations as a tool',
      ],
      followUp: {
        condition: 'shame response detected or no help-seeking named',
        question: 'Your 4.2 GPA is proof you can perform. But Morehouse\'s structure is different. What would it take to ask for help before the grade drops — not after?',
      },
    },

    {
      id: 'ms1_22',
      subsection: '1C',
      subsectionName: 'Emotional Regulation',
      type: 'slider',
      text: 'How quickly do you bounce back after a setback — a loss, a failure, a disappointment? Rate your recovery speed.',
      min: 1,
      max: 10,
      weight: 1.0,
      scoringDirection: 'strong',
      scoringNotes: {
        strong: '7–10: strong resilience and recovery — important indicator for high-pressure career path',
        weak: '1–4: slow recovery — particularly concerning given family losses and transitions ahead',
        complex: '5–6: average — track against specific setbacks named in the assessment',
      },
      redFlags: ['score 1–4'],
      followUp: {
        condition: 'score <= 5',
        question: 'What kind of setback takes you the longest to come back from — and why do you think that is?',
      },
    },

    {
      id: 'ms1_23',
      subsection: '1C',
      subsectionName: 'Emotional Regulation',
      type: 'open',
      text: 'Not being named a starter your senior season — you mentioned that was the first time you cried in years. What was happening inside you in that moment? And what did you do with it afterward?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names the pain directly. Connects it to something deeper (recognition, years of effort, identity). Shows what he did with the emotion afterward — even if it was just sitting with it.',
        weak: 'Dismisses it as "just a game" or "I got over it." Complete minimization of what was clearly a significant emotional release.',
        complex: 'The fact that it was his first cry in years is the signal. He has been holding an enormous amount. This question asks him to look directly at that. How he responds is critical data.',
      },
      redFlags: [
        '"It was just a bad moment, I moved on"',
        'No acknowledgment of what the moment represented beyond basketball',
        'Immediate pivot to "but I still played hard"',
      ],
      followUp: {
        condition: 'response minimizes the moment',
        question: 'You hold a lot. The years before that moment — did the emotion have anywhere to go, or did it just stay inside?',
      },
    },

    {
      id: 'ms1_24',
      subsection: '1C',
      subsectionName: 'Emotional Regulation',
      type: 'forced_choice',
      text: 'When something makes you angry — truly angry, not just annoyed — what happens?',
      options: [
        'I address it directly in the moment — I say something',
        'I go quiet and process it internally before I respond',
        'I hold it and it sits with me for a while before I let it go',
        'I don\'t really get angry — things don\'t affect me like that',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Options A or B: either direct expression or deliberate processing — both are adaptive if followed through',
        weak: 'Option D: denial of anger — particularly notable for someone who cut off his ex\'s condolence and has strong protective responses to disrespect',
        complex: 'Melvin\'s anger response is already visible (the refusal to call after disrespect). Option D is a contradiction if he answers it.',
      },
      redFlags: ['Option D — contradiction with known behavioral evidence of strong anger responses'],
      followUp: {
        condition: 'answer is "I don\'t really get angry"',
        question: 'When someone disrespects your mom or your family — what happens in your body in that moment?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 1D — CONFIDENCE LEVEL
    // Target: Is his confidence performance or foundation?
    // Probe: pride vs. fragility, what happens when excellence is threatened
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms1_25',
      subsection: '1D',
      subsectionName: 'Confidence Level',
      type: 'slider',
      text: 'On a scale of 1–10, how confident are you in your ability to succeed at Morehouse and in the finance career you\'re aiming for?',
      min: 1,
      max: 10,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: '7–9: healthy confidence that leaves room for growth and difficulty',
        weak: '1–4: concerning self-doubt before a major transition — needs to be explored',
        complex: '10: flag for overconfidence — particularly around academic readiness given the dyslexia and standardized test scores. Pride before the fall risk.',
      },
      redFlags: ['score 10 — probe for awareness of real academic difficulty ahead', 'score 1–3'],
      followUp: {
        condition: 'score === 10',
        question: 'What\'s the hardest part of Morehouse or a finance career that you think could genuinely challenge you?',
      },
    },

    {
      id: 'ms1_26',
      subsection: '1D',
      subsectionName: 'Confidence Level',
      type: 'forced_choice',
      text: 'Your confidence is mostly built on:',
      options: [
        'My track record — I\'ve proven I can do hard things',
        'My belief in myself regardless of outcomes — I just know who I am',
        'The people who believe in me and what they see in me',
        'Honestly, I\'m not sure — I present confidence but I don\'t know how deep it goes',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A: evidence-based confidence — durable and expandable',
        weak: 'Option D: honest self-awareness about confidence being performed rather than felt — critical signal if named',
        complex: 'Option B can be either deep self-assurance or a brittle identity claim. Option C is fine but shows external dependency.',
      },
      redFlags: [
        'Option D — performed confidence is a risk factor for identity collapse at first major setback',
      ],
      followUp: {
        condition: 'answer is Option D',
        question: 'The confidence you show the world — where does it come from on the days when you don\'t actually feel it?',
      },
    },

    {
      id: 'ms1_27',
      subsection: '1D',
      subsectionName: 'Confidence Level',
      type: 'likert',
      text: 'When I walk into a room, I feel like I belong there — even if I don\'t know anyone.',
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
        strong: 'Agree/Strongly Agree: presence and social confidence — major asset in finance networking',
        weak: 'Strongly Disagree: social confidence deficit — worth exploring given his identity as someone who stands apart',
        complex: 'Melvin likely scores high here — his social presence is a strength. Cross-check with any settings where it breaks down.',
      },
      redFlags: null,
      followUp: {
        condition: 'answer in ["Strongly Disagree", "Disagree"]',
        question: 'Are there specific environments or types of rooms where that confidence doesn\'t show up?',
      },
    },

    {
      id: 'ms1_28',
      subsection: '1D',
      subsectionName: 'Confidence Level',
      type: 'scenario',
      text: 'You\'re in your first finance class at Morehouse. The professor is moving fast. The concepts are clicking for some people in the class but you\'re falling behind in the reading. A student next to you answers a question brilliantly. You don\'t know the answer when the professor calls on you. Describe what happens inside you — and what you do.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names the internal discomfort without catastrophizing. Has a plan (IEP disclosure, office hours, study group). Doesn\'t define the moment as identity.',
        weak: 'Shame spiral. Silent withdrawal. Plans to study alone harder. Doesn\'t name dyslexia as a factor. Connects the moment to "maybe I\'m not cut out for this."',
        complex: 'This is the academic overconfidence collision scenario. His 4.2 GPA was earned with IEP support in high school. Morehouse without that support = a very different experience. His response here reveals whether his confidence is built to survive a real challenge.',
      },
      redFlags: [
        'Shame language',
        '"I\'d just study harder" with no accommodation plan',
        '"I wouldn\'t let it happen again" — suppression without a structural solution',
      ],
      followUp: {
        condition: 'shame or isolation response detected',
        question: 'Your dyslexia is not a secret — it\'s a documented condition with legal protections and accommodations. What would make it feel okay to use them without feeling like it means something about your intelligence?',
      },
    },

    {
      id: 'ms1_29',
      subsection: '1D',
      subsectionName: 'Confidence Level',
      type: 'open',
      text: 'What is one thing about your future that genuinely worries you — that you don\'t talk about because it would sound like doubt?',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names a real fear. Shows vulnerability without shame. Demonstrates that his confidence has room for honest doubt.',
        weak: '"Nothing really" or a deflection — indicates his confidence cannot co-exist with doubt, which makes it brittle',
        complex: 'If he names something real here — family history of addiction, academic readiness, carrying his mom financially — those are important signals about what he\'s actually managing.',
      },
      redFlags: ['"I don\'t really have doubts like that"'],
      followUp: {
        condition: 'answer names family history or addiction',
        question: 'That takes real self-awareness to name. How do you think about your own relationship to that family history?',
      },
    },

    {
      id: 'ms1_30',
      subsection: '1D',
      subsectionName: 'Confidence Level',
      type: 'forced_choice',
      text: 'If you got a C on an exam at Morehouse — your first real academic setback — what would it mean to you?',
      options: [
        'A signal to adjust my approach — nothing more',
        'Disappointing, but it wouldn\'t shake me',
        'It would hit hard — I\'ve never gotten a grade like that',
        'It would make me question whether I really belong at Morehouse',
      ],
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Options A or B: resilient framing of academic setback — adaptive',
        weak: 'Option D: identity-level fragility around academic performance — this is the critical risk. A drop from A\'s to C\'s at Morehouse could break his sense of self if not prepared.',
        complex: 'Option C is honest and human. The difference between C and D is whether the setback challenges strategy vs. identity.',
      },
      redFlags: ['Option D — academic identity fragility'],
      followUp: {
        condition: 'answer is "It would make me question whether I belong"',
        question: 'Your 4.2 GPA proves your ability is real. But Morehouse is a different environment. If a C shows up, how do we make sure it doesn\'t become a story about who you are instead of a problem to solve?',
      },
    },

    {
      id: 'ms1_31',
      subsection: '1D',
      subsectionName: 'Confidence Level',
      type: 'slider',
      text: 'How confident are you that the version of you that shows up at Morehouse will be the same Melvin who earned a 4.2 — not a smaller version of yourself?',
      min: 1,
      max: 10,
      weight: 1.5,
      scoringDirection: 'strong',
      scoringNotes: {
        strong: '8–10: strong identity continuity — believes his core self will transfer to the new environment',
        weak: '1–5: identity uncertainty in transition — needs grounding work before August',
        complex: 'Medium scores (5–7) may reflect healthy humility about the transition difficulty',
      },
      redFlags: ['score 1–4'],
      followUp: {
        condition: 'score <= 6',
        question: 'What\'s the most important part of who you are that you want to make sure you take with you to Morehouse?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 1E — SELF-AWARENESS
    // Target: Does he see himself clearly — strengths, blind spots, patterns?
    // Probe: academic overconfidence, emotional suppression as strength narrative
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms1_32',
      subsection: '1E',
      subsectionName: 'Self-Awareness',
      type: 'open',
      text: 'What is your biggest blind spot — the thing you do or believe that the people who know you best would say you don\'t fully see in yourself?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names something real and specific. Demonstrates capacity for honest self-reflection beyond surface level.',
        weak: '"I don\'t really have blind spots" or a very safe, generic answer. Inability to access self-critical perspective.',
        complex: 'The specific content matters: if he names academic overconfidence or emotional suppression — he has insight. If he names something minor — he may be protecting something larger.',
      },
      redFlags: ['"I don\'t know" with no attempt', '"I\'m pretty self-aware so probably nothing major"'],
      followUp: {
        condition: 'response is generic or brief',
        question: 'What would your mom say is your biggest blind spot? And do you think she\'d be right?',
      },
    },

    {
      id: 'ms1_33',
      subsection: '1E',
      subsectionName: 'Self-Awareness',
      type: 'likert',
      text: 'I know why I do the things I do — I understand my own motivations pretty clearly.',
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
        strong: 'Agree with evidence: strong self-insight capacity',
        weak: 'Strongly Agree with no ability to articulate it — may be a surface claim',
        complex: 'Cross-check: if he says he understands his motivations but can\'t articulate them in open questions, that\'s a gap.',
      },
      redFlags: null,
      followUp: {
        condition: 'answer is "Strongly Agree"',
        question: 'Give me an example — what\'s something you did recently and you know exactly why you did it?',
      },
    },

    {
      id: 'ms1_34',
      subsection: '1E',
      subsectionName: 'Self-Awareness',
      type: 'forced_choice',
      text: 'When you look at your own weaknesses honestly — not the ones you tell people, but the real ones — what category do they mostly fall into?',
      options: [
        'Academic — there are gaps in my skills or knowledge I haven\'t fully addressed',
        'Emotional — I don\'t always process or express what I\'m feeling in healthy ways',
        'Social — there are patterns in my relationships I know aren\'t working',
        'Effort — when things get hard or boring, I sometimes check out',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Any honest answer — the specific category matters less than the willingness to name one',
        weak: 'Inability to select any — "I don\'t really have major weaknesses in any of these"',
        complex: 'Academic + Effort together = very specific Morehouse risk profile. Emotional alone = processing concern. Watch for combination.',
      },
      redFlags: ['Refuses to select or deflects'],
      followUp: {
        condition: 'answer is "Academic"',
        question: 'What specifically in the academic category do you think you need to shore up before Morehouse?',
      },
    },

    {
      id: 'ms1_35',
      subsection: '1E',
      subsectionName: 'Self-Awareness',
      type: 'scenario',
      text: 'Your mom tells you she\'s worried about your motivation lately — the missing school days, staying up late, seeming less locked in than usual. She brings it up directly. How do you respond, and what do you think is actually going on?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Acknowledges the observation as accurate. Reflects on what\'s actually causing it (post-basketball, grief, transition, complacency). Engages with her concern rather than deflecting.',
        weak: '"She\'s exaggerating" or "I\'m fine, I\'ve just been tired." Dismissal of a legitimate and accurate concern.',
        complex: 'This tests his self-awareness against a real behavioral pattern. If he can acknowledge it — even partially — that\'s a significant green flag. If he defends against it, that\'s important data.',
      },
      redFlags: [
        'Complete dismissal of the concern',
        '"She worries too much"',
        'Anger or defensiveness at the question',
      ],
      followUp: {
        condition: 'response is defensive or dismissive',
        question: 'If you set aside how the conversation felt — is there any part of what she\'s observing that you think might be accurate?',
      },
    },

    {
      id: 'ms1_36',
      subsection: '1E',
      subsectionName: 'Self-Awareness',
      type: 'open',
      text: 'Your dyslexia has been with you your whole life. How do you think about it now — is it a limitation, an advantage, something in between, or something you try not to think about?',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names it without shame. Identifies real strategies. Sees how it creates different strengths (verbal, relational, big-picture thinking). Plans to use accommodations at Morehouse.',
        weak: '"I don\'t really let it affect me" — suppression of a real condition that will affect him at Morehouse if not actively managed',
        complex: 'Pride and silence around dyslexia is a major risk factor. The IEP must be established at Morehouse on Day 1. How he frames dyslexia here predicts whether he\'ll do that.',
      },
      redFlags: [
        '"I don\'t really think about it"',
        'No mention of accommodations as a tool',
        'Shame framing — "it\'s embarrassing" combined with plans to hide it',
      ],
      followUp: {
        condition: 'response minimizes dyslexia',
        question: 'At Morehouse, your IEP accommodations are your legal right and they\'re completely confidential. What would make it feel okay to use them from Day 1?',
      },
    },

    {
      id: 'ms1_37',
      subsection: '1E',
      subsectionName: 'Self-Awareness',
      type: 'likert',
      text: 'I can tell when I\'m not being honest with myself — and when I notice it, I actually do something about it.',
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
        strong: 'Agree + evidence in other answers of honest reflection = genuine metacognition',
        weak: 'Strongly Agree here but defensive/dismissive in scenario questions = overestimated self-awareness',
        complex: 'Contradiction detection: this is best used to cross-reference against the rest of Section 1E and 1F.',
      },
      redFlags: null,
      followUp: null,
    },

    {
      id: 'ms1_38',
      subsection: '1E',
      subsectionName: 'Self-Awareness',
      type: 'open',
      text: 'What do you think you\'re most likely to struggle with at Morehouse that you haven\'t fully prepared for yet?',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names something real and specific (academic workload, reading-heavy coursework, being away from Mom, building a new social network, managing finances). Shows foresight.',
        weak: '"I don\'t think I\'ll really struggle" — overconfidence signal heading into a genuinely high-stakes transition',
        complex: 'The content of the answer tells you where his preparation gaps are. This answer drives the Morehouse-Specific Plan section of his results.',
      },
      redFlags: ['"I\'m going to be fine" with no specific challenge named'],
      followUp: {
        condition: 'financial management not mentioned',
        question: 'Your father had a serious gambling addiction. You\'re going to be managing your own money independently for the first time. How are you thinking about that?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 1F — SHUTDOWN & AVOIDANCE PATTERNS
    // Target: Does he recognize his own withdrawal and avoidance behaviors?
    // Probe: school absences, staying up late, motivation drop, silent carrying
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms1_39',
      subsection: '1F',
      subsectionName: 'Shutdown & Avoidance Patterns',
      type: 'open',
      text: 'You\'ve missed some school days recently. What\'s actually been going on?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names a real reason (post-basketball, emotional exhaustion, complacency, transition grief). Takes some responsibility without excessive shame.',
        weak: '"I just needed rest" with no deeper acknowledgment, or complete minimization of frequency',
        complex: 'This is a direct behavioral confrontation. He knows the absences happened. The question is whether he\'ll be honest about why. Any genuine engagement with the why is a positive sign.',
      },
      redFlags: [
        '"It wasn\'t that many" — minimization of documented absences',
        '"I don\'t know" with no attempt to explore',
        'Defensive or irritated response',
      ],
      followUp: {
        condition: 'response lacks clear reason',
        question: 'Is there something about the end of basketball season that changed how you were feeling day to day?',
      },
    },

    {
      id: 'ms1_40',
      subsection: '1F',
      subsectionName: 'Shutdown & Avoidance Patterns',
      type: 'forced_choice',
      text: 'When something in your life isn\'t working — a relationship, a class, a commitment — what do you usually do first?',
      options: [
        'I address it directly as soon as I notice it',
        'I give it time and see if it resolves itself',
        'I pull back quietly and hope the situation changes',
        'I keep going through the motions even when I\'ve mentally checked out',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A: proactive problem-solver — ideal pattern for college and career success',
        weak: 'Option D: zombie functioning — going through motions while mentally disengaged is exactly how college failure compounds silently',
        complex: 'Option B is human. Option C is a yellow flag — passive waiting as a first response creates lag time before problems are addressed.',
      },
      redFlags: ['Option D — mental check-out while physically present'],
      followUp: {
        condition: 'answer in ["Option C", "Option D"]',
        question: 'Is there something in your life right now that you\'ve mentally checked out from but are still physically showing up for?',
      },
    },

    {
      id: 'ms1_41',
      subsection: '1F',
      subsectionName: 'Shutdown & Avoidance Patterns',
      type: 'likert',
      text: 'When things get overwhelming, I tend to go quieter and do less — even when I know doing less is making things worse.',
      options: [
        'Strongly Disagree',
        'Disagree',
        'Neutral',
        'Agree',
        'Strongly Agree',
      ],
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Strongly Disagree with behavioral evidence to support it — genuine resistance to withdrawal under pressure',
        weak: 'Agree/Strongly Agree — named self-awareness of the shutdown-under-pressure pattern. This is actually important data, not just a weakness.',
        complex: 'If he agrees here AND shows school absences AND post-basketball motivation drop: we have a confirmed shutdown pattern. The self-awareness of it is the opening for intervention.',
      },
      redFlags: ['Agree or Strongly Agree — confirm against behavioral evidence across the assessment'],
      followUp: {
        condition: 'answer in ["Agree", "Strongly Agree"]',
        question: 'You just named something real about yourself. At Morehouse, when that pattern shows up — what\'s going to be your circuit breaker?',
      },
    },

    {
      id: 'ms1_42',
      subsection: '1F',
      subsectionName: 'Shutdown & Avoidance Patterns',
      type: 'scenario',
      text: 'Senior year, second semester, Morehouse acceptance in hand. Your last basketball season is over. You still have 3 months of high school left. Describe what your day-to-day actually looks like right now — honestly.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Honest account of the reduced motivation, extra sleep, staying up late — WITH some acknowledgment that he knows this is a transition period and it shouldn\'t become permanent.',
        weak: '"I\'m doing everything I\'m supposed to" with behavioral data that says otherwise. Performance of fine-ness.',
        complex: 'This is a check on the gap between what he presents and what is actually happening. We already know the behavioral picture: missing days, staying up too late, motivation drop. His description should be cross-checked against that.',
      },
      redFlags: ['Description is suspiciously smooth and positive', '"I\'m just chilling, everything is fine"'],
      followUp: {
        condition: 'description doesn\'t match known behavioral data',
        question: 'Your mom has noticed some changes — the school days, the sleep, the energy. Is the version of these last few months you just described the full picture?',
      },
    },

    {
      id: 'ms1_43',
      subsection: '1F',
      subsectionName: 'Shutdown & Avoidance Patterns',
      type: 'forced_choice',
      text: 'When you notice yourself starting to slip — missing things, caring less, going through the motions — what pulls you back?',
      options: [
        'My own drive and sense of purpose — I catch myself and self-correct',
        'Someone in my life notices and says something to me',
        'A consequence shows up that forces me to refocus',
        'Honestly, once I start slipping it takes a while to come back',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A: strong internal pull-back mechanism — the most durable version',
        weak: 'Option D: slow recovery from slippage — especially concerning for college, where consequences are delayed and consequences fall harder',
        complex: 'Option B is fine but shows external dependency for self-correction — he needs to develop more internal triggers for Morehouse',
      },
      redFlags: ['Option D — slow return from slippage'],
      followUp: {
        condition: 'answer in ["Option B", "Option D"]',
        question: 'At Morehouse you won\'t have your mom watching. What internal signal would tell you that you\'re starting to slip — before anyone else sees it?',
      },
    },

    {
      id: 'ms1_44',
      subsection: '1F',
      subsectionName: 'Shutdown & Avoidance Patterns',
      type: 'open',
      text: 'Complacency after early success — getting the acceptance, finishing basketball, knowing you\'re leaving. What\'s the honest version of how that\'s been affecting you?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names the complacency honestly. Reflects on the role that basketball played in keeping him structured. Shows some awareness that this period is temporary and concerning.',
        weak: '"I\'m not really complacent, I just have less to do right now." Reframe of complacency as situational rather than behavioral.',
        complex: 'This is the most direct question about the post-basketball transition. His answer here is the centerpiece of the Avoidance section. Everything else in 1F builds toward this.',
      },
      redFlags: [
        'Full denial of complacency in the face of behavioral evidence',
        '"I\'ve earned the right to chill"',
        'No connection made between basketball ending and motivation drop',
      ],
      followUp: {
        condition: 'response shows some self-awareness',
        question: 'Basketball gave you structure, a team, and a daily reason to show up. What replaces that between now and August?',
      },
    },

    {
      id: 'ms1_45',
      subsection: '1F',
      subsectionName: 'Shutdown & Avoidance Patterns',
      type: 'slider',
      text: 'How likely is it that the pattern you\'re in right now — if you don\'t actively change it — will follow you to Morehouse?',
      min: 1,
      max: 10,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: '6–10: honest risk assessment — shows he understands the stakes and the pattern\'s momentum',
        weak: '1–3: underestimation of pattern transfer risk — particularly dangerous because patterns always travel with you',
        complex: 'This is a contradiction-detection question. If he has named avoidance, complacency, or shutdown patterns throughout Section 1 but rates transfer risk as low — he doesn\'t yet believe his own answers.',
      },
      redFlags: ['score 1–3 after naming avoidance patterns elsewhere in Section 1'],
      followUp: {
        condition: 'score <= 4',
        question: 'You named some patterns in this section that are real. What would make you certain those patterns won\'t travel with you to Atlanta?',
      },
    },

  ],
};

// ─── SCORING CONFIGURATION ───────────────────────────────────────────────────

export const MELVIN_SECTION_1_SCORING = {
  subsections: {
    '1A': { name: 'Mood Stability', maxWeight: 13.5, redFlagThreshold: 2 },
    '1B': { name: 'Stress Tolerance', maxWeight: 9.5, redFlagThreshold: 2 },
    '1C': { name: 'Emotional Regulation', maxWeight: 11.5, redFlagThreshold: 2 },
    '1D': { name: 'Confidence Level', maxWeight: 10.5, redFlagThreshold: 2 },
    '1E': { name: 'Self-Awareness', maxWeight: 11.5, redFlagThreshold: 2 },
    '1F': { name: 'Shutdown & Avoidance Patterns', maxWeight: 11.5, redFlagThreshold: 3 },
  },
  globalRedFlags: [
    'Post-basketball motivation collapse confirmed across 3+ questions',
    'Academic overconfidence confirmed across 1D and 1E without accommodation awareness',
    'Emotional suppression as identity (not just preference) across 1C',
    'Pattern transfer to Morehouse underestimated after naming avoidance patterns',
    'Father\'s death — unprocessed grief combined with low ms1_01 mood score',
    'No mention of IEP/disability services in any academic scenario question',
  ],
  contradictionChecks: [
    {
      id: 'contradiction_1',
      description: 'Confidence vs. fragility',
      questions: ['ms1_25', 'ms1_30', 'ms1_31'],
      flag: 'Claims high confidence but shows identity-level fragility at first setback signal',
    },
    {
      id: 'contradiction_2',
      description: 'Stress tolerance vs. withdrawal behavior',
      questions: ['ms1_11', 'ms1_13', 'ms1_41'],
      flag: 'Claims high stress tolerance but names withdrawal as primary response under sustained pressure',
    },
    {
      id: 'contradiction_3',
      description: 'Self-awareness vs. dismissal',
      questions: ['ms1_33', 'ms1_35', 'ms1_37'],
      flag: 'Claims self-awareness but dismisses accurate external observations (Mom\'s concern, school absences)',
    },
    {
      id: 'contradiction_4',
      description: 'Avoidance risk vs. Morehouse readiness',
      questions: ['ms1_39', 'ms1_41', 'ms1_45'],
      flag: 'Names avoidance and shutdown patterns but underestimates likelihood of transfer to Morehouse',
    },
  ],
};
