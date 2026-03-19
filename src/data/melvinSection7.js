// ============================================================
// MELVIN — SECTION 7: Communication & Self-Advocacy
// Subsections: 7A Speaking Up | 7B Asking Questions |
//              7C Communicating with Authority Figures |
//              7D Hard Conversations | 7E Self-Advocacy |
//              7F Professional Communication
// Total Questions: 38
// ============================================================

export const MELVIN_SECTION_7 = [

  // ─────────────────────────────────────────────
  // 7A — Speaking Up
  // ─────────────────────────────────────────────
  {
    id: 'ms7_01',
    subsection: '7A',
    subsectionName: 'Speaking Up',
    type: 'likert',
    text: 'In a group setting — class, meeting, practice — how often do you say what you actually think instead of staying quiet?',
    options: [
      'Almost never — I keep my thoughts to myself',
      'Rarely — only if someone asks me directly',
      'Sometimes — depends on who\'s in the room',
      'Often — I speak up when I have something worth saying',
      'Almost always — I say what I think regardless of who\'s listening',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Speaks up regularly, distinguishes between relevant and irrelevant contributions',
      weak: 'Consistently silent; withholds thoughts even when relevant — avoidance pattern',
      complex: 'Context-dependent silence is normal; chronic silence across all contexts is a signal',
    },
    redFlags: [
      'Almost never speaks up in any group setting',
      'Silence driven by fear of judgment, not strategic restraint',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'What goes through your mind in the moment when you decide to stay quiet instead of speaking?',
    },
  },
  {
    id: 'ms7_02',
    subsection: '7A',
    subsectionName: 'Speaking Up',
    type: 'scenario',
    text: 'You\'re in class. The teacher explains something wrong — you know the right answer. What do you do?',
    options: [
      'Stay quiet — not worth the attention',
      'Wait until after class to say something privately',
      'Raise my hand and correct it respectfully',
      'Tell a classmate next to me but not the teacher',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Willing to respectfully correct — shows confidence and academic engagement',
      weak: 'Stays silent or routes feedback through others — avoidance of direct communication',
      complex: 'Private correction after class shows some courage but still indirect; flag if paired with consistent avoidance elsewhere',
    },
    redFlags: [
      'Chooses silence to avoid attention even when correct',
      'Relies on peer mediation instead of direct communication',
    ],
    followUp: {
      condition: 'Selects "Stay quiet" or "Tell a classmate"',
      question: 'What specifically are you worried will happen if you speak up in that moment?',
    },
  },
  {
    id: 'ms7_03',
    subsection: '7A',
    subsectionName: 'Speaking Up',
    type: 'likert',
    text: 'When you disagree with a decision that directly affects you, how likely are you to say something about it?',
    options: [
      'Very unlikely — I accept it and move on',
      'Unlikely — I might mention it but not push',
      'Neutral — depends on how much it matters',
      'Likely — I\'ll say something if it matters enough',
      'Very likely — I don\'t let things affecting me slide without speaking',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Advocates for self when outcomes directly affect him — healthy self-regard',
      weak: 'Accepts unfavorable decisions without voicing disagreement — passivity risk in adult environments',
      complex: 'Neutral responses acceptable; flag only if paired with pattern of consistent self-silencing',
    },
    redFlags: [
      'Accepts all decisions passively even when he disagrees',
      'Cannot articulate what he would do differently',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'Walk me through a recent time someone made a decision that affected you and you didn\'t say anything. What did you do with that?',
    },
  },
  {
    id: 'ms7_04',
    subsection: '7A',
    subsectionName: 'Speaking Up',
    type: 'slider',
    text: 'On a scale of 1–10, how comfortable are you speaking in front of more than 5 people — even casually?',
    options: null,
    min: 1,
    max: 10,
    weight: 1.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: '7+ — functional comfort in group settings, can communicate when needed',
      weak: '1–3 — significant anxiety or avoidance that will limit academic and professional functioning',
      complex: '4–6 — manageable; check if anxiety is context-specific or universal',
    },
    redFlags: [
      'Rates 3 or below with no acknowledged coping strategy',
      'Cannot recall a single positive experience speaking in a group',
    ],
    followUp: {
      condition: 'Scores 1–4',
      question: 'Is it all groups that feel that way, or specific situations — like school, or with strangers?',
    },
  },
  {
    id: 'ms7_05',
    subsection: '7A',
    subsectionName: 'Speaking Up',
    type: 'open',
    text: 'Describe a time you spoke up about something — at school, at home, or anywhere — and it actually made a difference.',
    options: null,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can recall a specific example with real detail — demonstrates lived experience with self-advocacy',
      weak: 'Cannot name a single instance, or redirects to hypotheticals — strong silence pattern',
      complex: 'Quality of example matters more than recency; a childhood memory still shows the capacity exists',
    },
    redFlags: [
      'Cannot recall any instance of speaking up that had impact',
      'Frames all speaking up as pointless or ignored',
    ],
    followUp: {
      condition: 'Cannot provide an example',
      question: 'If you imagine a version of yourself 3 years from now who does speak up — what changed for him?',
    },
  },
  {
    id: 'ms7_06',
    subsection: '7A',
    subsectionName: 'Speaking Up',
    type: 'forced_choice',
    text: 'When you\'re in a room and have an idea or opinion, what stops you most from saying it out loud?',
    options: [
      'I don\'t think people will take me seriously',
      'I don\'t want to look dumb if I\'m wrong',
      'Nothing really stops me — I say it',
      'I worry about how it will change how people see me',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: '"Nothing really stops me" — functional self-expression; check for consistency with other answers',
      weak: 'Fear of judgment, embarrassment, or social consequence — internalized communication block',
      complex: 'Fear of looking wrong is common and workable; fear of permanently changing how people see him suggests deeper identity fragility',
    },
    redFlags: [
      'Fear of judgment is primary and crosses all contexts',
      'Believes his opinions are inherently unworthy of being heard',
    ],
    followUp: {
      condition: 'Any fear-based response',
      question: 'That fear — do you think it\'s something you learned, or has it always been there?',
    },
  },

  // ─────────────────────────────────────────────
  // 7B — Asking Questions
  // ─────────────────────────────────────────────
  {
    id: 'ms7_07',
    subsection: '7B',
    subsectionName: 'Asking Questions',
    type: 'likert',
    text: 'When you don\'t understand something in class, how often do you ask the teacher to explain it again?',
    options: [
      'Almost never — I figure it out later or just leave it',
      'Rarely — only if I\'m really lost',
      'Sometimes — if there\'s a good moment',
      'Often — I ask when I need to',
      'Almost always — I don\'t move on until I understand',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Asks when confused — shows academic self-advocacy and a growth orientation',
      weak: 'Avoids asking regardless of confusion level — high risk given dyslexia; gaps accumulate silently',
      complex: 'Context matters — public asking vs. private asking both valid; flag if asking never happens in any form',
    },
    redFlags: [
      'Almost never asks for clarification even when significantly confused',
      'Would rather fail a task than ask a question',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'When you leave class not understanding something — what do you actually do with that? Does it get resolved or does it sit?',
    },
  },
  {
    id: 'ms7_08',
    subsection: '7B',
    subsectionName: 'Asking Questions',
    type: 'scenario',
    text: 'A teacher assigns a project and the instructions are unclear. What do you do?',
    options: [
      'Start anyway and hope I get it right',
      'Ask a classmate what they think it means',
      'Email or talk to the teacher directly to clarify',
      'Wait until the last minute and see what happens',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Goes to source — teacher — for clarification before proceeding',
      weak: 'Starts without clarity or waits until last minute — procrastination and avoidance of authority contact',
      complex: 'Asking a classmate is a workaround, not ideal — check if this is comfort-based or access-based',
    },
    redFlags: [
      'Waits until deadline rather than seeking clarification',
      'Would rather produce wrong work than communicate with the teacher',
    ],
    followUp: {
      condition: 'Selects "Start anyway" or "Wait until last minute"',
      question: 'What makes reaching out to the teacher feel harder than just guessing?',
    },
  },
  {
    id: 'ms7_09',
    subsection: '7B',
    subsectionName: 'Asking Questions',
    type: 'likert',
    text: 'How comfortable are you admitting out loud — to a teacher, coach, or anyone — that you don\'t understand something?',
    options: [
      'Very uncomfortable — I\'d rather pretend I understand',
      'Uncomfortable — I avoid it unless absolutely necessary',
      'Neutral — it depends on the person',
      'Comfortable — it\'s not a big deal for me',
      'Very comfortable — I\'d rather admit it and get help',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Can admit confusion without ego damage — critical for IEP utilization and academic success',
      weak: 'Pretends to understand; performance of competence over actual learning — dangerous pattern with dyslexia',
      complex: 'Person-specific comfort is normal; universal discomfort is the flag',
    },
    redFlags: [
      'Would rather appear to understand than ask for help in any context',
      'Links admitting confusion to shame or weakness',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'What does it feel like in the moment when you pretend to understand something you don\'t?',
    },
  },
  {
    id: 'ms7_10',
    subsection: '7B',
    subsectionName: 'Asking Questions',
    type: 'forced_choice',
    text: 'You\'re at a job internship and your supervisor gives you a task you\'ve never done before and doesn\'t explain it fully. What\'s your move?',
    options: [
      'Try to figure it out myself — I don\'t want to look inexperienced',
      'Ask a coworker quietly so my supervisor doesn\'t see',
      'Ask my supervisor directly — that\'s what they\'re there for',
      'Do my best guess and submit it',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Goes to supervisor directly — demonstrates professional self-advocacy and confidence',
      weak: 'Guesses or routes around authority — high risk of failure in professional environments',
      complex: 'Asking a coworker is a soft workaround; not ideal but functional — evaluate if it\'s a pattern',
    },
    redFlags: [
      'Prefers guessing over asking to preserve image of competence',
      'Cannot ask authority figures for help even in professional contexts',
    ],
    followUp: {
      condition: 'Selects any non-supervisor option',
      question: 'What specifically feels risky about asking the supervisor directly in that moment?',
    },
  },

  // ─────────────────────────────────────────────
  // 7C — Communicating with Authority Figures
  // ─────────────────────────────────────────────
  {
    id: 'ms7_11',
    subsection: '7C',
    subsectionName: 'Communicating with Authority Figures',
    type: 'likert',
    text: 'How comfortable are you having a direct conversation with a teacher or school administrator about something that involves you?',
    options: [
      'Very uncomfortable — I avoid it at all costs',
      'Uncomfortable — I do it only if someone makes me',
      'Neutral — I can do it but it\'s not easy',
      'Comfortable — I\'ll do it when I need to',
      'Very comfortable — I don\'t have a problem talking to authority figures',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Functional communication with authority — required for IEP meetings, grade disputes, opportunities',
      weak: 'Avoids authority contact — will miss chances to advocate for himself academically and professionally',
      complex: 'Mild discomfort is normal; total avoidance is a structural problem',
    },
    redFlags: [
      'Avoids all contact with teachers or administrators unless forced',
      'Has never initiated a conversation with a school authority figure',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'When you imagine walking up to a teacher to talk about something, what\'s the first thing that goes through your mind?',
    },
  },
  {
    id: 'ms7_12',
    subsection: '7C',
    subsectionName: 'Communicating with Authority Figures',
    type: 'scenario',
    text: 'You got a grade you think is unfair. The teacher made a mistake. What do you actually do — be honest?',
    options: [
      'Accept it and move on — not worth the confrontation',
      'Complain about it to my friends but do nothing',
      'Talk to the teacher after class and explain the issue',
      'Get my parent or guardian to handle it',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Addresses it directly with the teacher — self-advocacy in action',
      weak: 'Accepts the wrong outcome passively or uses a proxy — over-dependence on others or avoidance',
      complex: 'Parental involvement is a tool, not inherently weak — flag if it\'s always the first resort',
    },
    redFlags: [
      'Accepts wrong outcomes to avoid communication',
      'Has never independently resolved an academic dispute',
    ],
    followUp: {
      condition: 'Selects "Accept it" or "Complain to friends"',
      question: 'What would have to be different about the situation for you to say something to the teacher directly?',
    },
  },
  {
    id: 'ms7_13',
    subsection: '7C',
    subsectionName: 'Communicating with Authority Figures',
    type: 'likert',
    text: 'When an adult in a position of authority gives you feedback you disagree with, how often do you respectfully push back?',
    options: [
      'Almost never — I just nod and move on',
      'Rarely — only if I\'m very confident I\'m right',
      'Sometimes — if the situation calls for it',
      'Often — I\'ll respectfully disagree when I think it\'s warranted',
      'Almost always — I express my perspective even if they outrank me',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can respectfully disagree — critical for professional environments and academic self-advocacy',
      weak: 'Always defers regardless of accuracy — passivity in power dynamics will limit career trajectory',
      complex: 'Frequent pushback without selectivity can also be a problem — look for balance',
    },
    redFlags: [
      'Never pushes back on authority even when factually wrong outcomes affect him',
      'Confuses silence with respect',
    ],
    followUp: {
      condition: 'Scores 1',
      question: 'If an authority figure made a decision that hurt you and you knew they were wrong — what would it take for you to say something?',
    },
  },
  {
    id: 'ms7_14',
    subsection: '7C',
    subsectionName: 'Communicating with Authority Figures',
    type: 'open',
    text: 'Think about how you talk to teachers, coaches, or other adults who are in charge of something. What\'s your honest approach — what works, what doesn\'t?',
    options: null,
    weight: 1.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Self-aware about his own communication style; identifies strengths and weaknesses specifically',
      weak: 'No self-awareness, generic answer, or frames all authority communication as pointless or hostile',
      complex: 'Look for evidence that he can shift register (more formal with adults) vs. treats authority same as peers',
    },
    redFlags: [
      'Describes all authority figures as adversarial or untrustworthy',
      'Cannot identify any effective approach to authority communication',
    ],
    followUp: {
      condition: 'Response is vague or negative',
      question: 'Was there ever an adult — teacher, coach, anyone — where the communication actually worked? What made it different?',
    },
  },

  // ─────────────────────────────────────────────
  // 7D — Hard Conversations
  // ─────────────────────────────────────────────
  {
    id: 'ms7_15',
    subsection: '7D',
    subsectionName: 'Hard Conversations',
    type: 'likert',
    text: 'When something is bothering you in a relationship — friend, family, teammate — how likely are you to bring it up directly?',
    options: [
      'Very unlikely — I wait for it to go away',
      'Unlikely — I hint at it but don\'t say it directly',
      'Neutral — depends on how bad it is',
      'Likely — I\'ll say something when it matters enough',
      'Very likely — I address problems when they come up',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Initiates difficult conversations — shows emotional maturity and relationship health',
      weak: 'Waits and suppresses — issues accumulate and relationships erode silently',
      complex: 'Some selectivity is healthy; universal avoidance of hard conversations is the flag',
    },
    redFlags: [
      'Never directly addresses relational conflict',
      'Waits for problems to disappear rather than resolving them',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'When you wait for something to go away on its own — does it usually work, or does it keep showing up?',
    },
  },
  {
    id: 'ms7_16',
    subsection: '7D',
    subsectionName: 'Hard Conversations',
    type: 'scenario',
    text: 'A close friend says something that genuinely disrespects you in front of others. What do you do?',
    options: [
      'Let it go in the moment — bring it up later privately',
      'Let it go entirely — not worth the drama',
      'Address it right there — I don\'t let disrespect slide',
      'Cut them off without saying why — they should know better',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Addresses it — either in the moment or privately later — shows ability to hold boundaries while managing context',
      weak: 'Lets it go entirely or cuts off without communication — avoidance or explosion with no conversation',
      complex: 'Timing matters; private later is often the mature choice; silent cutoff is the biggest red flag',
    },
    redFlags: [
      'Lets genuine disrespect pass without any response',
      'Ends relationships without any conversation — communication avoidance even in high-stakes situations',
    ],
    followUp: {
      condition: 'Selects "Let it go entirely" or "Cut them off without saying why"',
      question: 'What makes it hard to say directly — "Hey, that wasn\'t cool"?',
    },
  },
  {
    id: 'ms7_17',
    subsection: '7D',
    subsectionName: 'Hard Conversations',
    type: 'likert',
    text: 'How well do you handle being told "no" or being shut down when you ask for something you want?',
    options: [
      'Very poorly — I shut down or get frustrated',
      'Poorly — it affects my mood for a while',
      'OK — I accept it but it still bothers me',
      'Well — I can handle it and move forward',
      'Very well — I treat it as information and figure out a different path',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Treats rejection as information — resilience and professional maturity',
      weak: 'Shuts down or holds onto rejection — will struggle in environments with frequent feedback and denial',
      complex: 'Some emotional response to rejection is normal; shutting down entirely is the signal',
    },
    redFlags: [
      'Shuts down completely when rejected or denied',
      'Cannot recover from "no" without significant disruption',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'When you get shut down on something — what does that feel like, and where does that feeling go?',
    },
  },
  {
    id: 'ms7_18',
    subsection: '7D',
    subsectionName: 'Hard Conversations',
    type: 'forced_choice',
    text: 'Someone you care about is making a bad decision that you can see is going to hurt them. What do you do?',
    options: [
      'Stay out of it — not my business',
      'Say something once and leave it alone',
      'Keep bringing it up because I care',
      'Help them even if I disagree — I can\'t control them',
    ],
    weight: 1.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Speaks up at least once — demonstrates care and willingness to have hard conversations',
      weak: 'Stays out entirely — disengaged communication style even in high-stakes situations',
      complex: 'Any option except full silence shows some engagement; look for whether he can articulate why he chose it',
    },
    redFlags: [
      'Defaults to complete non-involvement even when someone he cares about is at risk',
      'Cannot explain the reasoning behind his response',
    ],
    followUp: {
      condition: 'Selects "Stay out of it"',
      question: 'What would it take — how bad would the situation have to get — before you said something?',
    },
  },
  {
    id: 'ms7_19',
    subsection: '7D',
    subsectionName: 'Hard Conversations',
    type: 'open',
    text: 'What\'s the hardest conversation you\'ve had to have with someone in the last year? What did you do, and how did it go?',
    options: null,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can name a specific hard conversation, describe what he did, and reflect on the outcome',
      weak: 'Cannot identify any hard conversation he\'s had — suggests avoidance or emotional shutdown pattern',
      complex: 'Quality of reflection matters — did he learn anything from it, or does he just report the events?',
    },
    redFlags: [
      'Cannot recall having any hard conversation in the past year',
      'Describes a hard conversation that someone else initiated — he only received it, never initiated',
    ],
    followUp: {
      condition: 'Response is vague or reports only receiving conversations',
      question: 'Is there a conversation you\'ve been putting off that you know you need to have?',
    },
  },

  // ─────────────────────────────────────────────
  // 7E — Self-Advocacy
  // ─────────────────────────────────────────────
  {
    id: 'ms7_20',
    subsection: '7E',
    subsectionName: 'Self-Advocacy',
    type: 'likert',
    text: 'How comfortable are you asking for accommodations or special support you\'re entitled to — like IEP services, extra time, or specific resources?',
    options: [
      'Very uncomfortable — I never ask, even if I need it',
      'Uncomfortable — I avoid it unless someone else brings it up',
      'Neutral — I do it but it feels awkward',
      'Comfortable — I ask when I need to without much hesitation',
      'Very comfortable — I know what I\'m entitled to and I use it',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Actively uses accommodations — critical for Melvin given dyslexia and IEP',
      weak: 'Avoids asking for entitled supports — shame, pride, or lack of knowledge; all lead to underperformance',
      complex: 'If awkward but still does it — workable. Never asking = major risk factor',
    },
    redFlags: [
      'Never requests IEP accommodations even when struggling',
      'Views using accommodations as embarrassing or a sign of weakness',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'When you need extra support and don\'t ask for it — what does that cost you?',
    },
  },
  {
    id: 'ms7_21',
    subsection: '7E',
    subsectionName: 'Self-Advocacy',
    type: 'scenario',
    text: 'You\'re in a new school environment and your IEP accommodations weren\'t set up yet. Tests are starting in two weeks. What do you do?',
    options: [
      'Wait and hope someone figures it out',
      'Tell my parent and let them handle it',
      'Go to the special education coordinator or counselor myself',
      'Take the tests without accommodations and deal with the outcome',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Goes directly to the relevant person — proactive self-advocacy in a high-stakes situation',
      weak: 'Waits or accepts the disadvantage without acting — dangerous pattern given academic stakes',
      complex: 'Telling a parent is a reasonable escalation but not a first resort for a young adult; flag if always needs parent mediation',
    },
    redFlags: [
      'Waits passively for system to catch up rather than advocating',
      'Accepts academic disadvantage rather than communicating a need',
    ],
    followUp: {
      condition: 'Selects "Wait" or "Take tests without accommodations"',
      question: 'What would make it feel okay to walk into the counselor\'s office and say "I need my IEP set up"?',
    },
  },
  {
    id: 'ms7_22',
    subsection: '7E',
    subsectionName: 'Self-Advocacy',
    type: 'likert',
    text: 'When you know you need something — more time, a different explanation, a quiet space — how often do you actually ask for it?',
    options: [
      'Almost never — I just try to work with what I have',
      'Rarely — only in extreme cases',
      'Sometimes — depends on the situation and who\'s around',
      'Often — I\'ve learned to ask for what I need',
      'Almost always — asking for what I need is just how I function',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Consistently identifies and voices his needs — self-regulation paired with communication',
      weak: 'Masks needs and pushes through — exhausting and unsustainable, especially with learning differences',
      complex: 'Context-dependent asking is fine; universal suppression is the flag',
    },
    redFlags: [
      'Consistently withholds needs to avoid appearing high-maintenance',
      'Cannot name a single specific need he regularly advocates for',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'When you push through without asking for what you need — what\'s the outcome usually?',
    },
  },
  {
    id: 'ms7_23',
    subsection: '7E',
    subsectionName: 'Self-Advocacy',
    type: 'forced_choice',
    text: 'Someone else gets an opportunity you deserved more than them. What do you do?',
    options: [
      'Accept it — complaining won\'t change it',
      'Talk to the person who made the decision and ask what happened',
      'Let it go but remember it when I decide how much effort to give next time',
      'Talk to someone close to me about it but not the decision-maker',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Addresses the decision-maker directly — advocates for fair treatment and seeks information',
      weak: 'Passive acceptance or passive-aggressive withdrawal — neither changes outcomes nor builds advocacy skills',
      complex: 'Acceptance with forward thinking is growth-oriented; withdrawal as punishment is avoidance',
    },
    redFlags: [
      'Reduces effort or engagement as silent retaliation instead of communicating',
      'Cannot imagine asking a decision-maker to explain an outcome',
    ],
    followUp: {
      condition: 'Selects "Remember it and give less effort"',
      question: 'That move — giving less effort as a response — how has that worked out for you in the past?',
    },
  },
  {
    id: 'ms7_24',
    subsection: '7E',
    subsectionName: 'Self-Advocacy',
    type: 'open',
    text: 'What\'s one thing you need in order to do your best — at school, at work, or in any environment — that most people don\'t know about you?',
    options: null,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can articulate a specific need with clarity — shows self-knowledge and readiness to self-advocate',
      weak: 'Says "nothing" or "I\'m fine" — either lack of self-awareness or performance of invulnerability',
      complex: 'Even one specific need named well is a strong indicator; vague answers suggest suppression',
    },
    redFlags: [
      'Claims to have no needs or requirements for performance',
      'Has never thought about what conditions allow him to do his best',
    ],
    followUp: {
      condition: 'Responds with "nothing" or generic answer',
      question: 'Think about a time when things were clicking for you — school, sports, anything. What was different about that environment?',
    },
  },

  // ─────────────────────────────────────────────
  // 7F — Professional Communication
  // ─────────────────────────────────────────────
  {
    id: 'ms7_25',
    subsection: '7F',
    subsectionName: 'Professional Communication',
    type: 'scenario',
    text: 'You need to email a professor or boss to explain that you\'re going to miss a deadline. You need to write it now. What does that email look like — be honest about what you\'d actually send?',
    options: [
      'A short text-style message — "Hey I\'m going to be late on that thing"',
      'A longer message explaining why, apologizing, and giving a new timeline',
      'I wouldn\'t email — I\'d either show up in person or say nothing',
      'A formal message with a subject line, greeting, explanation, and new ETA',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Formal message with structure — shows professional communication awareness',
      weak: 'Informal, avoidance, or silence — will create friction in academic and professional environments',
      complex: 'In-person explanation can be valid if intentional; silence or text-style message is a flag',
    },
    redFlags: [
      'Would say nothing rather than send any communication',
      'No awareness that professional context requires different communication style',
    ],
    followUp: {
      condition: 'Selects text-style or avoidance option',
      question: 'Have you ever had to send a professional email before? What happened?',
    },
  },
  {
    id: 'ms7_26',
    subsection: '7F',
    subsectionName: 'Professional Communication',
    type: 'likert',
    text: 'How different is the way you talk or write to a teacher or boss compared to how you talk to your friends?',
    options: [
      'No difference — I talk the same way to everyone',
      'Slight difference — maybe I curse less',
      'Noticeable difference — I\'m more formal but still pretty casual',
      'Clear difference — I shift my language and tone depending on who I\'m with',
      'Very different — I code-switch deliberately and know when to use which register',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Conscious code-switching — essential professional communication skill',
      weak: 'Same register in all contexts — will create problems in academic and workplace settings',
      complex: 'Slight adjustments are better than none; full absence of register shift is the flag',
    },
    redFlags: [
      'No awareness of needing different communication styles for different contexts',
      'Has never adjusted language for a professional or academic setting',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'Has anyone ever told you that you came across the wrong way in a professional or school setting? What happened?',
    },
  },
  {
    id: 'ms7_27',
    subsection: '7F',
    subsectionName: 'Professional Communication',
    type: 'likert',
    text: 'If you had to introduce yourself in a professional setting — internship interview, college visit, community program — how prepared do you feel to make a strong impression?',
    options: [
      'Not prepared at all — I wouldn\'t know what to say',
      'Slightly prepared — I\'d say something but it wouldn\'t be great',
      'Somewhat prepared — I could get through it but it wouldn\'t be polished',
      'Prepared — I\'d represent myself well',
      'Very prepared — I know how to walk into a room and leave an impression',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Prepared with a clear sense of how to present himself — critical for Morehouse, finance career, Oakland Kids',
      weak: 'No preparation and no language for professional self-presentation — needs immediate skill-building',
      complex: 'Some nervousness is normal; complete unpreparedness in a post-basketball-career context is a gap',
    },
    redFlags: [
      'Has never introduced himself professionally in any setting',
      'Cannot describe his own strengths or goals in a formal context',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'What would you want someone to know about you in a professional setting — if you had to say it right now, what would you lead with?',
    },
  },
  {
    id: 'ms7_28',
    subsection: '7F',
    subsectionName: 'Professional Communication',
    type: 'scenario',
    text: 'You showed up late to an important meeting or interview. No one called you out yet, but you know you\'re late. What do you do when you walk in?',
    options: [
      'Slide in quietly and hope nobody notices',
      'Apologize loudly as I walk in so everyone knows I know',
      'Acknowledge it briefly, apologize once, and move on without making a scene',
      'Apologize after the meeting privately to the person running it',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Brief acknowledgment — professional, accountable, and doesn\'t derail the room',
      weak: 'Slides in silently — avoidance of accountability; or overcorrects publicly which is also disruptive',
      complex: 'Post-meeting private apology is acceptable but less ideal; evaluate if pattern of lateness accompanies this',
    },
    redFlags: [
      'Avoids all acknowledgment of being late — no accountability',
      'Has never thought about how to handle being late professionally',
    ],
    followUp: {
      condition: 'Selects "slide in quietly"',
      question: 'If the roles were flipped — if someone came into your meeting late and said nothing — how would that land with you?',
    },
  },
  {
    id: 'ms7_29',
    subsection: '7F',
    subsectionName: 'Professional Communication',
    type: 'forced_choice',
    text: 'You\'re applying for a finance internship. The application asks for a 200-word personal statement about your goals. What\'s your honest approach?',
    options: [
      'Write whatever comes to mind and submit it quickly',
      'Use an AI tool to write or heavily edit it — then adjust',
      'Draft it, get feedback from someone I trust, and revise it',
      'Skip it or do the bare minimum — written stuff isn\'t my strength',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Drafts, seeks feedback, and revises — shows process and investment in professional communication',
      weak: 'Skips or does bare minimum due to written communication challenges — IEP-related risk that will limit access to opportunities',
      complex: 'Using AI is a tool, not inherently wrong — flag if there is no authentic voice or investment in the process',
    },
    redFlags: [
      'Avoids written professional tasks due to dyslexia rather than using available tools and support',
      'Has no strategy for written professional communication',
    ],
    followUp: {
      condition: 'Selects "skip" or "bare minimum"',
      question: 'Written communication is going to be part of any finance path you take. What\'s your current plan for handling that?',
    },
  },
  {
    id: 'ms7_30',
    subsection: '7F',
    subsectionName: 'Professional Communication',
    type: 'likert',
    text: 'How confident are you that the way you present yourself — how you talk, write, and carry yourself — matches the level you\'re trying to reach?',
    options: [
      'Not confident at all — there\'s a real gap',
      'Slightly confident — I know it needs work',
      'Somewhat confident — I\'m getting there',
      'Confident — I think I carry myself at the right level',
      'Very confident — my communication matches my goals',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'High confidence paired with specific examples — genuine alignment between presentation and aspiration',
      weak: 'Low confidence with no plan to close the gap — or high confidence that is unsupported by observable behaviors',
      complex: 'This is a contradiction-detection anchor — compare with observable behavior from other questions',
    },
    redFlags: [
      'Scores very high here but shows avoidance in all prior communication questions — contradiction',
      'Acknowledges gap but has no concrete plan or interest in closing it',
    ],
    followUp: {
      condition: 'High score but contradicted by behavioral answers',
      question: 'Walk me through one specific thing you\'ve done to build your professional communication skills.',
    },
  },
  {
    id: 'ms7_31',
    subsection: '7F',
    subsectionName: 'Professional Communication',
    type: 'open',
    text: 'If you had to write a two-sentence pitch about yourself to a Goldman Sachs recruiter right now — who you are and why you belong there — what would you say?',
    options: null,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can produce a specific, compelling pitch — shows professional self-awareness and aspiration clarity',
      weak: 'Blanks, gives generic answers, or says "I don\'t know" — lacks professional identity formation for his target career',
      complex: 'Quality of language matters less than clarity of thought; a raw but specific answer outweighs a polished but hollow one',
    },
    redFlags: [
      'Cannot produce any version of a professional pitch',
      'Does not connect his background (Oakland, basketball, IEP perseverance) to professional value',
    ],
    followUp: {
      condition: 'Response is blank, generic, or extremely short',
      question: 'You don\'t have to use perfect words — just tell me: what has your life taught you that a finance firm would actually want?',
    },
  },

  // ─────────────────────────────────────────────
  // Additional high-signal questions (7A–7F)
  // ─────────────────────────────────────────────
  {
    id: 'ms7_32',
    subsection: '7A',
    subsectionName: 'Speaking Up',
    type: 'slider',
    text: 'On a scale of 1–10, how much do you trust that what you say matters — that your voice has real weight in the rooms you\'re in?',
    options: null,
    min: 1,
    max: 10,
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: '7+ — believes his voice carries weight; will communicate and advocate with confidence',
      weak: '1–4 — doesn\'t believe his voice matters; silences himself before others can silence him',
      complex: '5–6 — developing belief; check what specific contexts support or undermine this',
    },
    redFlags: [
      'Rates 3 or below — deep belief that voice doesn\'t matter',
      'Cannot identify any context where he believes he is heard',
    ],
    followUp: {
      condition: 'Scores 1–4',
      question: 'Where did that belief come from — that what you say doesn\'t carry weight?',
    },
  },
  {
    id: 'ms7_33',
    subsection: '7C',
    subsectionName: 'Communicating with Authority Figures',
    type: 'open',
    text: 'Think about the authority figures in your life right now — teachers, counselors, program leaders. Do any of them actually know what you\'re going through? Have you let them in?',
    options: null,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Has at least one authority figure who knows his real situation — critical support network node',
      weak: 'No authority figure knows his actual circumstances — isolated; support systems cannot activate for someone they don\'t know',
      complex: 'Emotional privacy is healthy; total isolation from authority support is a risk',
    },
    redFlags: [
      'No authority figure knows his real situation or challenges',
      'Describes deliberate hiding of his circumstances from people who could help',
    ],
    followUp: {
      condition: 'Describes no authority figures who know his situation',
      question: 'Is that a choice you\'ve made — to keep people out — or has nobody ever asked?',
    },
  },
  {
    id: 'ms7_34',
    subsection: '7D',
    subsectionName: 'Hard Conversations',
    type: 'likert',
    text: 'When you\'ve hurt someone or made a mistake that affected others, how quickly do you acknowledge it and address it with them?',
    options: [
      'I rarely acknowledge it — I move on and hope they do too',
      'I wait until it becomes unavoidable',
      'I acknowledge it when I\'m ready, which might take a while',
      'I usually address it within a day or two',
      'I address it quickly — owning it and moving forward matters to me',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Addresses mistakes promptly — accountability through communication, not avoidance',
      weak: 'Avoids acknowledgment — patterns of unresolved relational damage accumulate',
      complex: 'Needing time to process is fine; indefinite avoidance is the flag',
    },
    redFlags: [
      'Rarely acknowledges impact on others after a mistake',
      'Waits until confrontation rather than proactively addressing',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'When you move on and hope someone else does too — what usually happens to that relationship after?',
    },
  },
  {
    id: 'ms7_35',
    subsection: '7E',
    subsectionName: 'Self-Advocacy',
    type: 'slider',
    text: 'On a scale of 1–10, how well do you know your own rights and entitlements in your school or program — what you\'re owed and what you can ask for?',
    options: null,
    min: 1,
    max: 10,
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: '7+ — informed self-advocate; knows what to ask for and has the language to ask for it',
      weak: '1–4 — does not know what he is entitled to; cannot advocate for what he doesn\'t know exists',
      complex: 'Knowledge gap is fixable; apathy about knowing is a deeper flag',
    },
    redFlags: [
      'Scores 3 or below and shows no interest in learning his rights',
      'Has an IEP but cannot name any of the accommodations it includes',
    ],
    followUp: {
      condition: 'Scores 1–4',
      question: 'If I told you right now that you have legal rights to specific accommodations — how much does knowing that change anything for you?',
    },
  },
  {
    id: 'ms7_36',
    subsection: '7B',
    subsectionName: 'Asking Questions',
    type: 'scenario',
    text: 'You\'re at a finance networking event — someone important offers to answer questions about their career. You\'re standing right there. What do you do?',
    options: [
      'Stay quiet — I don\'t want to say the wrong thing',
      'Listen to others\' questions but don\'t ask my own',
      'Ask something I\'ve been genuinely wondering about their path',
      'Ask something I think sounds smart even if it\'s not what I\'m really curious about',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Asks a genuine question — authentic engagement that creates real connection',
      weak: 'Silent or performing curiosity rather than expressing it — misses the opportunity and creates no impression',
      complex: 'Asking a performed question is better than silence but shows low authenticity; flag the pattern',
    },
    redFlags: [
      'Stays quiet in a direct opportunity to engage with someone in his target field',
      'Fear of saying the wrong thing overrides genuine curiosity in networking contexts',
    ],
    followUp: {
      condition: 'Selects silence or passive listening',
      question: 'That missed moment — how does that feel after? Is it relief or regret?',
    },
  },
  {
    id: 'ms7_37',
    subsection: '7F',
    subsectionName: 'Professional Communication',
    type: 'likert',
    text: 'How prepared do you feel to represent yourself in a college or scholarship interview — speaking about your goals, your challenges, and why you deserve the opportunity?',
    options: [
      'Not prepared — I wouldn\'t know what to say about myself',
      'Slightly prepared — I have some ideas but couldn\'t hold the conversation',
      'Somewhat prepared — I could get through it but it wouldn\'t be strong',
      'Prepared — I\'d represent myself well under pressure',
      'Very prepared — I can speak clearly and specifically about who I am and where I\'m going',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Prepared with a specific, authentic narrative — essential for Morehouse application and scholarship interviews',
      weak: 'No narrative or language for professional self-presentation — needs immediate support given college goals',
      complex: 'Nervousness is normal; inability to articulate who he is in a structured conversation is a gap',
    },
    redFlags: [
      'Has no prepared narrative about his own life, goals, or challenges',
      'Cannot connect his experiences (Oakland, basketball, IEP, father\'s death) to a coherent story',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'What part of your story do you think would matter most to a college admissions officer — if you had to pick one thing?',
    },
  },
  {
    id: 'ms7_38',
    subsection: '7E',
    subsectionName: 'Self-Advocacy',
    type: 'open',
    text: 'On a scale and in your own words — how good are you at fighting for yourself? Not physically. Verbally. In rooms where decisions are being made about your life?',
    options: null,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Honest self-assessment with specific examples — shows self-awareness about advocacy strengths and gaps',
      weak: 'Dismisses the question, says he doesn\'t need to fight for himself, or cannot engage with the concept',
      complex: 'The quality and honesty of self-reflection here is the data — look for avoidance vs. engagement',
    },
    redFlags: [
      'Has never thought about verbal self-advocacy as a skill he needs',
      'Believes others will fight for him — over-reliance on external advocates without his own voice',
    ],
    followUp: {
      condition: 'Low self-rating or dismissive response',
      question: 'Who in your life has fought for you in rooms you weren\'t in? What did that teach you about how it\'s done?',
    },
  },
];

// ============================================================
// SECTION 7 SCORING CONFIGURATION
// ============================================================

export const MELVIN_SECTION_7_SCORING = {
  subsections: {
    '7A': {
      name: 'Speaking Up',
      maxWeight: 11.5,
      redFlagThreshold: 2,
    },
    '7B': {
      name: 'Asking Questions',
      maxWeight: 10.0,
      redFlagThreshold: 2,
    },
    '7C': {
      name: 'Communicating with Authority Figures',
      maxWeight: 8.0,
      redFlagThreshold: 2,
    },
    '7D': {
      name: 'Hard Conversations',
      maxWeight: 9.0,
      redFlagThreshold: 2,
    },
    '7E': {
      name: 'Self-Advocacy',
      maxWeight: 11.0,
      redFlagThreshold: 2,
    },
    '7F': {
      name: 'Professional Communication',
      maxWeight: 11.5,
      redFlagThreshold: 2,
    },
  },

  globalRedFlags: [
    'Never initiates communication with authority figures in any context',
    'Consistently avoids asking questions even when significantly confused or at a disadvantage',
    'Does not use IEP accommodations due to shame or avoidance — not lack of knowledge',
    'No professional communication register — speaks to authority figures same as peers',
    'Cannot produce any version of a professional self-introduction or pitch',
    'Has no authority figure who knows his actual situation or challenges',
    'Avoids hard conversations in all contexts — relational, academic, and professional',
    'Believes his voice does not carry weight and has made no effort to change this',
  ],

  contradictionChecks: [
    {
      id: 'contradiction_7_1',
      description: 'Claims communication confidence but avoids speaking up in observable scenarios',
      questions: ['ms7_30', 'ms7_02', 'ms7_12', 'ms7_36'],
      flag: 'Scores high on communication confidence (ms7_30) but consistently avoids speaking up in scenarios, correcting teachers, or engaging in networking opportunities — self-assessment is inflated relative to behavior',
    },
    {
      id: 'contradiction_7_2',
      description: 'Claims IEP awareness but never requests accommodations',
      questions: ['ms7_35', 'ms7_20', 'ms7_21'],
      flag: 'Knows about IEP rights and accommodations (ms7_35 7+) but never actually requests them (ms7_20, ms7_21 low) — knowledge without action; likely shame-based suppression',
    },
    {
      id: 'contradiction_7_3',
      description: 'Claims to handle rejection well but shows avoidance of any high-stakes communication',
      questions: ['ms7_17', 'ms7_11', 'ms7_13', 'ms7_07'],
      flag: 'Reports handling "no" well (ms7_17) but avoids asking questions, challenging authority, or communicating in high-stakes contexts — avoidance prevents exposure to rejection, making the self-rating unreliable',
    },
    {
      id: 'contradiction_7_4',
      description: 'Finance career ambition paired with no professional communication preparation',
      questions: ['ms7_25', 'ms7_26', 'ms7_27', 'ms7_29', 'ms7_31', 'ms7_37'],
      flag: 'Aspires to Goldman Sachs / finance track but cannot produce a professional pitch, has no email protocol, and rates professional presentation readiness very low — major gap between aspiration and communication skill development',
    },
    {
      id: 'contradiction_7_5',
      description: 'Reports caring about outcomes but never advocates when outcomes are unfair',
      questions: ['ms7_03', 'ms7_12', 'ms7_23'],
      flag: 'Expresses that outcomes matter to him but consistently chooses passive acceptance or silence when outcomes are unfair — commitment to desired outcomes is not matched by willingness to communicate for them',
    },
  ],
};
