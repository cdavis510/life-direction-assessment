// ============================================================
// MELVIN — SECTION 8: Social Judgment & Environment
// Subsections: 8A Peer Influence | 8B Crowd Awareness |
//              8C Decision-Making | 8D Environment Fit |
//              8E Risk Awareness | 8F Social Maturity
// Total Questions: 38
// ============================================================

export const MELVIN_SECTION_8 = [

  // ─────────────────────────────────────────────
  // 8A — Peer Influence
  // ─────────────────────────────────────────────
  {
    id: 'ms8_01',
    subsection: '8A',
    subsectionName: 'Peer Influence',
    type: 'likert',
    text: 'When your friends want to do something you\'re not sure about, how often do you go along anyway?',
    options: [
      'Almost always — I go with it to avoid tension',
      'Often — I usually fall in line even if I\'m unsure',
      'Sometimes — depends on what it is',
      'Rarely — I make my own call regardless of what they want',
      'Almost never — I don\'t move based on group pressure',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Maintains independent judgment in social settings — critical for someone heading to Morehouse from East Oakland',
      weak: 'Consistently defers to group even when personally uncertain — high susceptibility to peer influence',
      complex: 'Some social cooperation is healthy; the flag is when he acts against his own read of a situation',
    },
    redFlags: [
      'Goes along with group decisions even when personally uncomfortable',
      'Avoids social tension by suppressing his own judgment',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'When you go along with something you weren\'t sure about — what happens after? Do you usually feel good about it?',
    },
  },
  {
    id: 'ms8_02',
    subsection: '8A',
    subsectionName: 'Peer Influence',
    type: 'scenario',
    text: 'You\'re with your boys and someone suggests doing something that could get you in trouble — nothing violent, but definitely risky. Everyone\'s in. What do you do?',
    options: [
      'Go along — I\'m not trying to be the odd one out',
      'Go along but stay on the edge — I\'ll be there but won\'t be in the middle of it',
      'Say I\'m not doing it and leave if they go through with it',
      'Try to talk everyone out of it first, then decide based on what happens',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Opts out or actively redirects — demonstrates independent judgment under social pressure',
      weak: 'Goes along fully — peer belonging overrides personal risk calculation',
      complex: '"Stay on the edge" shows risk awareness but still participation; flag if this is a consistent pattern',
    },
    redFlags: [
      'Goes fully along with risky group behavior to avoid being the odd one out',
      'Has no exit strategy for peer pressure situations',
    ],
    followUp: {
      condition: 'Selects "go along" or "stay on the edge"',
      question: 'Has that kind of situation ever cost you something real — academically, with your mom, or with your reputation?',
    },
  },
  {
    id: 'ms8_03',
    subsection: '8A',
    subsectionName: 'Peer Influence',
    type: 'slider',
    text: 'On a scale of 1–10, how much do the people around you right now actually push you to be better — not just support you, but push you?',
    options: null,
    min: 1,
    max: 10,
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: '7+ — peer environment includes people who actively elevate him; positive social pressure working in his favor',
      weak: '1–4 — surrounded by people who don\'t challenge him; social gravity pulling sideways or down',
      complex: '5–6 — neutral environment; not harmful but not activating either',
    },
    redFlags: [
      'Rates 3 or below — no one in his immediate circle challenges him toward excellence',
      'Cannot name a single person who holds him to a higher standard',
    ],
    followUp: {
      condition: 'Scores 1–4',
      question: 'Who in your life right now would actually call you out if you were slipping? Not just be cool with you — but actually call it?',
    },
  },
  {
    id: 'ms8_04',
    subsection: '8A',
    subsectionName: 'Peer Influence',
    type: 'forced_choice',
    text: 'Your crew has a reputation in the neighborhood. Which best describes how that reputation reflects on you personally?',
    options: [
      'Their reputation doesn\'t have much to do with me — I\'m my own person',
      'It reflects well — we\'re known for something I\'m proud of',
      'It\'s mixed — some things I\'m good with, some things I\'m not',
      'Honestly, parts of it could hurt me if the wrong person saw it',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Positive group reputation or clear self-differentiation from negative aspects — shows identity independence',
      weak: 'Group reputation includes elements that could harm his future and he\'s not separating himself from it',
      complex: '"Mixed" is honest and workable if he can articulate what he\'s distancing from; flag if he can\'t',
    },
    redFlags: [
      'Group reputation actively conflicts with his stated goals and he is not separating from it',
      'Unaware of how association shapes perception in academic and professional contexts',
    ],
    followUp: {
      condition: 'Selects "honestly parts of it could hurt me"',
      question: 'What\'s the plan for how that changes when you get to Morehouse — or does it?',
    },
  },
  {
    id: 'ms8_05',
    subsection: '8A',
    subsectionName: 'Peer Influence',
    type: 'open',
    text: 'Describe your closest friends right now. What are they doing with their lives — honestly? Where are they headed?',
    options: null,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can name specific people, articulate their trajectories, and has a mix of peers who are moving forward',
      weak: 'Most peers lack direction, are in trouble, or he cannot articulate where they\'re headed — environmental drag signal',
      complex: 'The quality of his self-awareness about peers matters as much as the peers themselves',
    },
    redFlags: [
      'Most close friends have no educational or career trajectory',
      'Describes peer group exclusively through loyalty without acknowledging trajectory gaps',
    ],
    followUp: {
      condition: 'Describes peers with limited direction',
      question: 'Do you ever feel tension between where you\'re going and where they\'re going? How do you handle that?',
    },
  },
  {
    id: 'ms8_06',
    subsection: '8A',
    subsectionName: 'Peer Influence',
    type: 'likert',
    text: 'When a friend does something you think is wrong or dumb, how often do you actually say something to them about it?',
    options: [
      'Almost never — not my place',
      'Rarely — only if it directly affects me',
      'Sometimes — I\'ll say something if it\'s bad enough',
      'Often — I\'ll speak up when I see it',
      'Almost always — I hold people around me accountable',
    ],
    weight: 1.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Holds friends accountable — signals social maturity and influence rather than passivity',
      weak: 'Never speaks up — may indicate conflict avoidance or indifference to peer trajectories',
      complex: 'Some restraint in peer accountability is socially intelligent; total silence is the flag',
    },
    redFlags: [
      'Never challenges friends\' behavior regardless of severity',
      'Believes accountability is not his role in any context',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'Has there been a time when someone you were close to made a decision you knew was going to hurt them — and you stayed quiet? What happened?',
    },
  },
  {
    id: 'ms8_07',
    subsection: '8A',
    subsectionName: 'Peer Influence',
    type: 'slider',
    text: 'On a scale of 1–10, how often do you make decisions — real ones, not small ones — based on what the people around you will think?',
    options: null,
    min: 1,
    max: 10,
    weight: 2.0,
    scoringDirection: 'weak',
    scoringNotes: {
      strong: '1–3 — low social opinion dependency; decisions are internally driven',
      weak: '7+ — high social opinion dependency; peer perception regularly overrides personal judgment',
      complex: '4–6 — some social awareness is healthy; evaluate if it\'s selectivity or pervasiveness',
    },
    redFlags: [
      'Scores 7+ — major decisions consistently filtered through peer perception',
      'Cannot identify a significant decision made completely independent of social opinion',
    ],
    followUp: {
      condition: 'Scores 6+',
      question: 'Is there a decision you\'ve been sitting on that you already know what you want to do — but haven\'t done it because of what people will say?',
    },
  },

  // ─────────────────────────────────────────────
  // 8B — Crowd Awareness
  // ─────────────────────────────────────────────
  {
    id: 'ms8_08',
    subsection: '8B',
    subsectionName: 'Crowd Awareness',
    type: 'likert',
    text: 'How aware are you of how the group you move with shapes how others — teachers, employers, strangers — see you?',
    options: [
      'Not aware — I don\'t think about it',
      'Slightly aware — I know it exists but don\'t factor it in',
      'Somewhat aware — I think about it in certain settings',
      'Aware — I actively consider how my associations look to others',
      'Very aware — I manage my associations intentionally based on context',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Understands that association is perception — critical social intelligence for his career path',
      weak: 'No awareness of how group membership signals character to outsiders — significant blind spot',
      complex: 'Awareness without action is still progress; total unawareness is the flag',
    },
    redFlags: [
      'No awareness that association shapes external perception of character',
      'Cannot distinguish between how he sees himself and how others see him based on his crew',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'Have you ever been treated differently — positively or negatively — because of who you were with, not who you are yourself?',
    },
  },
  {
    id: 'ms8_09',
    subsection: '8B',
    subsectionName: 'Crowd Awareness',
    type: 'scenario',
    text: 'You\'re at a professional or academic event — a college visit, a program tour — and some people you came with are being loud, disrespectful, or off. What do you do?',
    options: [
      'Stay quiet — I don\'t want to cause drama within the group',
      'Distance myself physically but don\'t say anything',
      'Say something to them directly — that behavior reflects on all of us',
      'Find a way to separate myself clearly so the right people know I\'m not part of it',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Actively separates or redirects — shows social intelligence and reputation management in professional settings',
      weak: 'Stays silent and absorbs the association — group loyalty overrides professional self-protection',
      complex: 'Physical distancing without verbal action is partial credit; best response is direct correction or clear visible separation',
    },
    redFlags: [
      'Stays silent in professional settings when group behavior damages his reputation',
      'Has never considered how group misbehavior reflects on him personally',
    ],
    followUp: {
      condition: 'Selects "stay quiet"',
      question: 'If someone who could give you an opportunity saw that — and associated you with the group\'s behavior — how would that feel?',
    },
  },
  {
    id: 'ms8_10',
    subsection: '8B',
    subsectionName: 'Crowd Awareness',
    type: 'likert',
    text: 'How well can you read a room — sense who has power, what the unspoken rules are, what someone wants from you without them saying it?',
    options: [
      'Not well — I usually miss these things',
      'Slightly — I catch some of it',
      'Somewhat — I pick up on it when I pay attention',
      'Well — I\'m usually reading the room accurately',
      'Very well — I can walk into a situation and understand the dynamics quickly',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'High social intelligence — critical asset in finance, sports business, and networking environments',
      weak: 'Low situational awareness — will miss cues in professional settings and misread relationship dynamics',
      complex: 'Self-reported social intelligence should be cross-referenced with scenario responses for accuracy',
    },
    redFlags: [
      'Cannot read basic social dynamics — who has power, what someone wants, unspoken expectations',
      'Self-report contradicted by scenario answers showing poor situational response',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'Think about the last time you were in an important room — school meeting, program, anything. What was the vibe in that room, and how did you navigate it?',
    },
  },
  {
    id: 'ms8_11',
    subsection: '8B',
    subsectionName: 'Crowd Awareness',
    type: 'forced_choice',
    text: 'When you walk into a new environment — a new school, a new program, a new city — what\'s your default move?',
    options: [
      'Find people I\'m comfortable with quickly and stick with them',
      'Observe first — understand the room before I decide who to connect with',
      'Introduce myself broadly — meet as many people as possible early',
      'Hang back and wait for people to come to me',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Observes first — strategic social entry; reads environment before committing to associations',
      weak: 'Retreats to comfort zone immediately or waits passively — limits network building and environmental intelligence',
      complex: 'Broad introductions show confidence but may lack strategy; comfort-seeking is natural but risky if it limits exposure',
    },
    redFlags: [
      'Defaults to comfort-seeking in all new environments — limits growth network',
      'Waits passively for others to initiate — will not build the network his career goals require',
    ],
    followUp: {
      condition: 'Selects "find comfortable people" or "hang back"',
      question: 'When you get to Morehouse — where you don\'t know anyone — what\'s the plan?',
    },
  },
  {
    id: 'ms8_12',
    subsection: '8B',
    subsectionName: 'Crowd Awareness',
    type: 'open',
    text: 'Think about the different groups or circles you move through — school, neighborhood, Oakland Kids, basketball. How are you different in each one? What changes about you?',
    options: null,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can articulate genuine code-switching and self-presentation across contexts — high social intelligence',
      weak: 'No variation across contexts — either lacks awareness or doesn\'t adapt (both are signals)',
      complex: 'Healthy variation shows flexibility; look for whether the adaptations are authentic or performed',
    },
    redFlags: [
      'Claims to be exactly the same in all environments — unlikely and suggests low self-awareness',
      'Adapts so completely in each context that no consistent core identity emerges',
    ],
    followUp: {
      condition: 'Claims no variation across contexts',
      question: 'The version of you at the Oakland Kids program — is that exactly the same as you in the neighborhood on a Friday night? Walk me through the difference.',
    },
  },
  {
    id: 'ms8_13',
    subsection: '8B',
    subsectionName: 'Crowd Awareness',
    type: 'likert',
    text: 'When someone you don\'t respect tries to influence how you move or what you do, how effective are they?',
    options: [
      'Very effective — I still feel pressure even from people I don\'t respect',
      'Somewhat effective — I notice it even if I don\'t always act on it',
      'Neutral — sometimes it affects me, sometimes not',
      'Not very effective — I filter based on who I respect',
      'Not effective at all — influence from people I don\'t respect doesn\'t land',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Filters influence through respect — strong internal hierarchy; social pressure is source-dependent',
      weak: 'Feels pressure even from people he doesn\'t respect — social anxiety or identity fragility driving compliance',
      complex: 'Some awareness of unrespected influence is normal; being moved by it consistently is the flag',
    },
    redFlags: [
      'Influenced even by people he explicitly does not respect — social pressure is undiscriminating',
      'Cannot identify anyone whose influence he actively filters out',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'What is it about that pressure that still gets in — even from someone you don\'t have respect for?',
    },
  },

  // ─────────────────────────────────────────────
  // 8C — Decision-Making
  // ─────────────────────────────────────────────
  {
    id: 'ms8_14',
    subsection: '8C',
    subsectionName: 'Decision-Making',
    type: 'likert',
    text: 'When you have a big decision to make, how much time do you typically give yourself before you commit?',
    options: [
      'I decide immediately — I go with my first instinct',
      'I decide quickly — usually within a few minutes',
      'I take some time — a few hours or a day',
      'I take real time — I sit with it and think it through',
      'I research and gather information before I decide on anything major',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Takes real time or researches for major decisions — deliberate decision-making process present',
      weak: 'All decisions made immediately on instinct — impulsivity risk in high-stakes situations',
      complex: 'Immediate decisions can be strong for low-stakes; flag only when applied to major life choices',
    },
    redFlags: [
      'Cannot distinguish between low-stakes and high-stakes decision speed',
      'Has made significant life decisions on pure impulse with no reflection',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'Walk me through a decision you made fast that you later wished you\'d slowed down on.',
    },
  },
  {
    id: 'ms8_15',
    subsection: '8C',
    subsectionName: 'Decision-Making',
    type: 'scenario',
    text: 'Someone offers you a fast money opportunity — not clearly illegal, but grey area. It would solve a short-term problem. You have 24 hours to decide. What do you do?',
    options: [
      'Take it — I need the money and I\'ll deal with the risk',
      'Think about it hard, but probably take it if the risk seems manageable',
      'Talk to someone I trust before I decide',
      'Pass — grey area opportunities create grey area problems, and that\'s not my path',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Passes or consults first — demonstrates long-term thinking over short-term relief; critical given family history of addiction and impulsive financial decisions',
      weak: 'Takes it based on immediate need — impulsive financial decision-making that mirrors risk patterns in his family history',
      complex: 'Consulting someone is strong; evaluate who he consults and whether the consultation changes the outcome',
    },
    redFlags: [
      'Takes fast-money opportunities without consultation when under financial pressure',
      'No awareness of how grey-area decisions compound over time — especially given his family history',
    ],
    followUp: {
      condition: 'Selects first or second option',
      question: 'What\'s the version of that decision that plays out 2 years from now — if the grey area catches up with you?',
    },
  },
  {
    id: 'ms8_16',
    subsection: '8C',
    subsectionName: 'Decision-Making',
    type: 'likert',
    text: 'When you make a decision that turns out to be wrong, how do you process it?',
    options: [
      'I try to forget it and move on quickly',
      'I feel bad about it for a while but don\'t really dig into what happened',
      'I acknowledge it was wrong but don\'t dwell on it',
      'I analyze what went wrong so I don\'t repeat it',
      'I go back and understand the exact decision point so I can make a different choice next time',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Debriefs decisions — extracts learning rather than avoiding the discomfort of self-review',
      weak: 'Buries or forgets mistakes without analysis — same decisions will repeat under same conditions',
      complex: 'Not dwelling is healthy; not examining at all is the flag',
    },
    redFlags: [
      'Actively avoids reflecting on past decisions that went wrong',
      'Cannot recall a wrong decision and what he learned from it',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'What\'s the last wrong decision you actually learned something from — not just moved past, but actually changed what you do because of it?',
    },
  },
  {
    id: 'ms8_17',
    subsection: '8C',
    subsectionName: 'Decision-Making',
    type: 'forced_choice',
    text: 'You have two paths: one is safe and predictable but slower. One has higher risk but a much bigger payoff if it works. How do you pick?',
    options: [
      'I almost always choose safe — predictability matters more than upside',
      'I lean safe but can be convinced to take the bigger risk',
      'I lean toward the bigger risk if I believe in it and I\'ve thought it through',
      'I almost always go for the bigger risk — playing it safe feels like settling',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Leans toward calculated risk with deliberation — appropriate for finance and sports business career building',
      weak: 'Always safe OR always high-risk without deliberation — both extremes limit career trajectory',
      complex: 'The quality of "thought it through" matters — ask for an example to validate',
    },
    redFlags: [
      'Always chooses maximum risk without a deliberation process — impulsivity masked as boldness',
      'Always chooses safe and cannot articulate a single time calculated risk would be worth it',
    ],
    followUp: {
      condition: 'Selects "almost always high risk" or "almost always safe"',
      question: 'Give me an example of that — a real decision where you went with that approach. How did it play out?',
    },
  },
  {
    id: 'ms8_18',
    subsection: '8C',
    subsectionName: 'Decision-Making',
    type: 'open',
    text: 'What\'s the best decision you\'ve made in the last two years — not something that just worked out, but one where you made the right call deliberately?',
    options: null,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can name a specific deliberate decision with clear reasoning — evidence of intentional choice-making',
      weak: 'Cannot name a deliberate decision or describes luck as strategy — no evidence of intentional decision process',
      complex: 'Look for whether the choice was driven by values, information, or outside pressure — the driver matters',
    },
    redFlags: [
      'Cannot name a single intentional good decision — only circumstances or luck',
      'Conflates outcomes with decision quality — "it worked out" is not the same as "I made the right call"',
    ],
    followUp: {
      condition: 'Response credits luck or circumstance rather than deliberate choice',
      question: 'Was that a decision you made, or did it just happen to you? What specifically did you choose?',
    },
  },
  {
    id: 'ms8_19',
    subsection: '8C',
    subsectionName: 'Decision-Making',
    type: 'likert',
    text: 'When you\'re upset, stressed, or angry — how good are your decisions in that state compared to when you\'re calm?',
    options: [
      'Much worse — I make bad calls when I\'m heated',
      'Worse — my decisions suffer when I\'m emotionally activated',
      'About the same — my state doesn\'t affect my judgment much',
      'Still decent — I\'ve learned to slow down even when emotional',
      'The same or better — pressure and emotion sharpen me',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Aware of emotional state\'s impact on decision quality and has strategies to compensate',
      weak: 'Makes significantly worse decisions under emotional activation with no mitigation — high risk in volatile environments',
      complex: '"About the same" without self-awareness is a flag; it may indicate lack of insight rather than true emotional regulation',
    },
    redFlags: [
      'Significantly worse decisions under emotional stress with no acknowledged strategy',
      'Claims emotion has no effect — possible lack of self-awareness given his emotional pattern elsewhere',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'What\'s a decision you made while you were angry or stressed that you would make differently with a clear head?',
    },
  },
  {
    id: 'ms8_20',
    subsection: '8C',
    subsectionName: 'Decision-Making',
    type: 'slider',
    text: 'On a scale of 1–10, how much do you trust your own judgment when no one else is around to weigh in?',
    options: null,
    min: 1,
    max: 10,
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: '7+ — strong internal locus of control; can operate independently without external validation',
      weak: '1–4 — low trust in own judgment; will stall or seek excessive validation for decisions — risky in college environments where he\'ll be on his own',
      complex: '5–6 — developing confidence; check if it\'s context-specific or universal',
    },
    redFlags: [
      'Rates 3 or below — cannot trust own judgment even in solo situations',
      'Has not made a significant independent decision in recent memory',
    ],
    followUp: {
      condition: 'Scores 1–4',
      question: 'At Morehouse, you\'re going to be making real decisions without your mom, without your coaches, without anyone who\'s known you. How does that land with you?',
    },
  },

  // ─────────────────────────────────────────────
  // 8D — Environment Fit
  // ─────────────────────────────────────────────
  {
    id: 'ms8_21',
    subsection: '8D',
    subsectionName: 'Environment Fit',
    type: 'likert',
    text: 'How well does your current environment — your neighborhood, your friend group, your daily setting — actually support where you\'re trying to go?',
    options: [
      'It actively works against it — I\'m fighting my environment',
      'It\'s mostly neutral — it doesn\'t help or hurt',
      'It supports some of it — parts push me forward, parts pull me back',
      'It mostly supports me — most people around me understand where I\'m headed',
      'It fully supports it — I\'m surrounded by people who are aligned with my path',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Environment is mostly or fully aligned — no major external drag on trajectory',
      weak: 'Environment actively works against goals — high external resistance that will compound over time',
      complex: 'Mixed environment is honest and common; the key is whether he can name what pulls him back and has a plan',
    },
    redFlags: [
      'Describes environment as actively hostile to his goals with no mitigation strategy',
      'Cannot identify any element of his current environment that supports his trajectory',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'What specifically about where you are is working against where you\'re trying to go — and what are you doing about it?',
    },
  },
  {
    id: 'ms8_22',
    subsection: '8D',
    subsectionName: 'Environment Fit',
    type: 'scenario',
    text: 'Your neighborhood has real risks — situations, people, and energy that don\'t align with Morehouse and finance. How do you navigate that daily?',
    options: [
      'I don\'t think about it much — I just move through it',
      'I\'m aware of it but I don\'t have a specific strategy',
      'I have specific habits and boundaries to protect myself from it',
      'I\'ve mostly separated myself from those environments already',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Has specific habits and boundaries or has already separated — active environmental management',
      weak: 'No awareness or no strategy — environmental risks are passively absorbed',
      complex: '"Aware but no strategy" is progress from total unawareness; flag if this is where it stops long-term',
    },
    redFlags: [
      'No awareness of neighborhood risks as relevant to his personal trajectory',
      'Has no strategy for navigating environmental drag — relies on luck or avoidance without intention',
    ],
    followUp: {
      condition: 'Selects first or second option',
      question: 'Name one specific thing in your environment that\'s a real risk to your path — not a hypothetical, a real one.',
    },
  },
  {
    id: 'ms8_23',
    subsection: '8D',
    subsectionName: 'Environment Fit',
    type: 'likert',
    text: 'How ready do you feel for the environment at Morehouse — the culture, the academic pressure, being far from Oakland, being around different kinds of Black men?',
    options: [
      'Not ready at all — it feels like a completely different world',
      'Slightly ready — I have some sense of it but I\'m uncertain',
      'Somewhat ready — I understand the basics but have real gaps',
      'Ready — I\'ve prepared for this and I know what I\'m walking into',
      'Very ready — I\'ve researched, connected, and I have a plan for Day 1',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Has done research, has a plan, understands the cultural shift — maximum readiness for transition',
      weak: 'Feels totally unready with no preparation — transition shock risk is high; complacency from early acceptance',
      complex: 'Some uncertainty is healthy; the absence of any preparation effort is the flag',
    },
    redFlags: [
      'Has done no research or preparation for the Morehouse environment',
      'Treats Morehouse acceptance as the finish line rather than the starting line',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'What specifically do you not know about Morehouse that you think you should know before August?',
    },
  },
  {
    id: 'ms8_24',
    subsection: '8D',
    subsectionName: 'Environment Fit',
    type: 'open',
    text: 'When you picture your life at 25 — where you\'re living, who\'s around you, how your days look — does any of that match your current environment? What has to change?',
    options: null,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Clear-eyed about the gap between current environment and desired future — with a specific understanding of what has to change',
      weak: 'Future vision is disconnected from current reality with no awareness of what the bridge requires',
      complex: 'Aspirational thinking is good; look for whether the gap analysis is specific or vague',
    },
    redFlags: [
      'Cannot describe what needs to change between now and age 25',
      'Future vision has no connection to current behaviors or decisions',
    ],
    followUp: {
      condition: 'Describes large gap without identifying what needs to change',
      question: 'The biggest thing that has to change — not later, but starting now — what is it?',
    },
  },
  {
    id: 'ms8_25',
    subsection: '8D',
    subsectionName: 'Environment Fit',
    type: 'likert',
    text: 'How often do you find yourself in situations or conversations that have nothing to do with where you\'re trying to go — not just once, but regularly?',
    options: [
      'Almost always — most of my time is spent in low-value environments',
      'Often — more of my time goes there than I\'d like',
      'Sometimes — it happens but it\'s not the majority',
      'Rarely — I\'ve gotten good at avoiding situations that don\'t serve me',
      'Almost never — I protect my time and environment intentionally',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Protects time and environment intentionally — operates with purpose rather than default drift',
      weak: 'Most time spent in low-value environments — attention and energy being drained by misaligned surroundings',
      complex: 'Some environmental drift is unavoidable; consistent majority time in misaligned settings is the flag',
    },
    redFlags: [
      'Majority of time and attention consumed by environments unrelated to goals',
      'No intentional management of where time goes socially',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'What\'s the thing pulling the most of your attention right now that has nothing to do with where you\'re going?',
    },
  },
  {
    id: 'ms8_26',
    subsection: '8D',
    subsectionName: 'Environment Fit',
    type: 'forced_choice',
    text: 'The Oakland Kids program has been a big part of your life. Honestly, how much of who you are right now came from that environment versus your neighborhood environment?',
    options: [
      'Most of who I am came from my neighborhood — OK was secondary',
      'Both shaped me equally — I can\'t separate them',
      'OK shaped more of my direction — my neighborhood shaped my toughness',
      'OK is where I became who I want to be — neighborhood is where I survive',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Distinguishes between the formative influence of structured positive environment vs. survival environment — shows self-awareness about environmental impact',
      weak: 'Cannot identify any differential impact between environments — suggests low environmental self-awareness',
      complex: 'Any answer is valid; the depth of reflection is what matters here',
    },
    redFlags: [
      'Dismisses the impact of the OK program — may not have internalized its values or relationships',
      'Cannot distinguish what different environments gave him — flat environmental awareness',
    ],
    followUp: {
      condition: 'Any response',
      question: 'When you get to Morehouse — away from both of those environments — what parts of each do you want to bring with you, and what do you want to leave behind?',
    },
  },

  // ─────────────────────────────────────────────
  // 8E — Risk Awareness
  // ─────────────────────────────────────────────
  {
    id: 'ms8_27',
    subsection: '8E',
    subsectionName: 'Risk Awareness',
    type: 'likert',
    text: 'How aware are you of the specific risks in your life right now — not general dangers, but the exact things that could derail your path if they happened?',
    options: [
      'Not very aware — I don\'t think about risk much',
      'Slightly aware — I know some risks exist but I\'m vague on specifics',
      'Somewhat aware — I can name the major ones',
      'Aware — I have a clear picture of what my real risks are',
      'Very aware — I track specific risks and I have a plan for each one',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Can name specific risks with mitigation awareness — mature strategic self-protection',
      weak: 'Vague or no risk awareness — dangers approach unseen and unmanaged',
      complex: 'Naming risks without plans is better than not naming them; plans without follow-through is the next-level flag',
    },
    redFlags: [
      'Cannot name a single specific risk to his path beyond generic statements',
      'No risk awareness despite living in an environment with documented hazards',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'Name three specific things that could actually knock you off your path before you get to Morehouse. Not hypothetical — real things.',
    },
  },
  {
    id: 'ms8_28',
    subsection: '8E',
    subsectionName: 'Risk Awareness',
    type: 'scenario',
    text: 'A situation develops around you — not your doing, but you\'re in the middle of it and it could go sideways fast. You have about 30 seconds to decide what to do. What\'s your read and your move?',
    options: [
      'I read the room and get out — my path is more important than whatever this is',
      'I stay to see how it plays out — leaving feels like abandoning my people',
      'I try to de-escalate or redirect the situation before it blows up',
      'I freeze — situations like that are hard for me to read fast',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Reads the room and exits, or de-escalates — prioritizes long-term trajectory over short-term loyalty',
      weak: 'Stays out of loyalty or freezes — high risk of being present when situations escalate with real consequences',
      complex: 'De-escalation is strong but only if realistic; evaluate if it\'s wishful thinking or practiced skill',
    },
    redFlags: [
      'Stays in escalating situations out of loyalty regardless of personal cost',
      'Cannot read or respond to fast-moving social risk situations',
    ],
    followUp: {
      condition: 'Selects "stay to see how it plays out"',
      question: 'What\'s the cost if that situation goes sideways and your name is on it — specifically, to Morehouse, to your mom, to what you\'re building?',
    },
  },
  {
    id: 'ms8_29',
    subsection: '8E',
    subsectionName: 'Risk Awareness',
    type: 'likert',
    text: 'Your father\'s history — addiction, gambling, the way it ended — how much does that history inform how you think about your own risk decisions?',
    options: [
      'It doesn\'t really factor in — that was him, not me',
      'I\'m aware of it but I don\'t think about it actively',
      'It\'s in the back of my mind — I\'m cautious because of it',
      'It actively shapes how I think about risk — I\'ve made decisions because of it',
      'It\'s one of the clearest guides I have — I know exactly what I won\'t do because of what I watched',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Actively uses family history as a risk reference — turned pain into wisdom and behavioral boundaries',
      weak: 'Dismisses family history as irrelevant — may not have processed it; addiction has strong hereditary risk factors he needs to be aware of',
      complex: '"Aware but not active" is a middle state — knowledge without application; flag if paired with any risk-taking behavior',
    },
    redFlags: [
      'Completely dismisses family addiction history as not relevant to his own risk profile',
      'Has no awareness of hereditary risk factors associated with family addiction history',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'Not to put it on you — but what do you know about how that pattern showed up in your dad\'s life, and how early it started?',
    },
  },
  {
    id: 'ms8_30',
    subsection: '8E',
    subsectionName: 'Risk Awareness',
    type: 'forced_choice',
    text: 'Which best describes your relationship with risk overall?',
    options: [
      'I avoid risk whenever possible — it\'s not worth it',
      'I take risks but I don\'t always think them through first',
      'I take calculated risks — I think about what I can lose before I move',
      'I trust my gut on risk — I move fast and figure it out',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Calculated risk-taker — balances opportunity and cost; ideal for finance and high-stakes career environments',
      weak: 'Avoidance (limits upside) or gut-only risk (too impulsive) — both limit performance in adult professional environments',
      complex: '"Don\'t think them through" + risk-taking is the highest risk profile; validate with scenario responses',
    },
    redFlags: [
      'Takes risks without deliberation consistently across contexts',
      'Avoids all risk — will not be able to navigate finance or sports business environments that require bold calculated moves',
    ],
    followUp: {
      condition: 'Selects "take risks but don\'t think them through"',
      question: 'What\'s the biggest risk you\'ve taken that you didn\'t think through? What happened?',
    },
  },
  {
    id: 'ms8_31',
    subsection: '8E',
    subsectionName: 'Risk Awareness',
    type: 'slider',
    text: 'On a scale of 1–10, how much do the choices you make today feel connected to what your life will look like in 5 years?',
    options: null,
    min: 1,
    max: 10,
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: '7+ — strong future-orientation; present decisions are made through a long-term lens',
      weak: '1–4 — present-focused decision-making with low future-consequence awareness — high risk window before Morehouse',
      complex: '5–6 — developing long-term orientation; check which domains feel connected vs. disconnected',
    },
    redFlags: [
      'Rates 3 or below — no felt connection between present choices and future outcomes',
      'Cannot articulate how any current behavior links to a specific future consequence',
    ],
    followUp: {
      condition: 'Scores 1–4',
      question: 'Pick one thing you\'re doing right now — any behavior or habit — and tell me how it shows up in your life at 25.',
    },
  },
  {
    id: 'ms8_32',
    subsection: '8E',
    subsectionName: 'Risk Awareness',
    type: 'open',
    text: 'What\'s the biggest risk to your path right now — the thing you worry about the most even if you don\'t say it out loud?',
    options: null,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Names a specific, honest risk — emotional courage to identify the real threat; can begin addressing it',
      weak: 'Says "nothing" or gives a surface answer — either lack of self-awareness or unwillingness to be vulnerable; both are signals',
      complex: 'The specificity and honesty of the answer is the data; generic answers suggest deflection',
    },
    redFlags: [
      'Claims no real risk exists to his path — denial or emotional avoidance',
      'Names a risk but has no awareness of what\'s already being done to mitigate it',
    ],
    followUp: {
      condition: 'Gives surface-level or dismissive answer',
      question: 'If something was going to stop you from making it to and through Morehouse — what\'s the most realistic version of that story?',
    },
  },

  // ─────────────────────────────────────────────
  // 8F — Social Maturity
  // ─────────────────────────────────────────────
  {
    id: 'ms8_33',
    subsection: '8F',
    subsectionName: 'Social Maturity',
    type: 'likert',
    text: 'When someone disrespects you in a social setting, how do you typically handle it?',
    options: [
      'I respond immediately and directly — disrespect doesn\'t slide',
      'I respond but I try to keep it controlled',
      'I de-escalate in the moment and handle it after if needed',
      'I let it go unless it\'s extreme — not everything deserves a response',
      'I assess the situation first — some disrespect isn\'t worth engaging',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Assesses before responding; de-escalates or selectively engages — mature social response with boundaries',
      weak: 'Responds immediately to all disrespect without assessment — reactive pattern that creates risk in volatile environments',
      complex: 'Melvin\'s profile says he does not tolerate disrespect; this is healthy but needs to be paired with situational intelligence',
    },
    redFlags: [
      'Responds to all perceived disrespect immediately without situational assessment',
      'Cannot identify situations where not responding is the stronger move',
    ],
    followUp: {
      condition: 'Scores 1',
      question: 'Walk me through a time when responding immediately to disrespect cost you more than it gave you.',
    },
  },
  {
    id: 'ms8_34',
    subsection: '8F',
    subsectionName: 'Social Maturity',
    type: 'scenario',
    text: 'You\'re at a professional event — finance conference, college program, something that matters for your future. Someone says something that genuinely disrespects you. What do you do?',
    options: [
      'Address it right there — I don\'t change how I respond based on the setting',
      'Let it go in the moment, but address it privately after',
      'Let it go entirely — the setting is too important to create a scene',
      'Internally clock it and factor it into how I deal with that person going forward — silently',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Context-adaptive response — understands that the same disrespect requires different responses depending on stakes and setting',
      weak: '"I don\'t change how I respond based on setting" — inflexible social response; will create real professional consequences',
      complex: 'Silent noting and adjustment is sophisticated; letting it go entirely is also mature if it\'s strategic not passive',
    },
    redFlags: [
      'Same response to disrespect regardless of professional context — cannot modulate social response',
      'Would create a public confrontation in a high-stakes professional setting',
    ],
    followUp: {
      condition: 'Selects "I don\'t change how I respond"',
      question: 'If that response cost you the opportunity — the internship, the connection, the room — would it have been worth it?',
    },
  },
  {
    id: 'ms8_35',
    subsection: '8F',
    subsectionName: 'Social Maturity',
    type: 'likert',
    text: 'How well do you read when you\'ve done something that hurt someone else, even if they haven\'t said anything directly?',
    options: [
      'I usually don\'t notice until someone tells me',
      'I sometimes pick up on it but often miss it',
      'I usually notice if I pay attention',
      'I read it pretty well — I pick up on energy and shifts',
      'I read it very well — I notice changes in people quickly and check in',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'High relational sensitivity — can detect emotional impact without being told; critical for leadership and relationships',
      weak: 'Low relational sensitivity — interpersonal damage goes unnoticed and compounds; particularly important given his private emotional style',
      complex: 'Pair with self-report on empathy; verify through scenario responses',
    },
    redFlags: [
      'Consistently unaware of impact on others unless explicitly told',
      'Has damaged relationships without knowing it and cannot identify why',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'Think of someone who seems more distant from you lately. Do you know why? When did it change?',
    },
  },
  {
    id: 'ms8_36',
    subsection: '8F',
    subsectionName: 'Social Maturity',
    type: 'open',
    text: 'Describe someone you deeply respect — not famous, someone you actually know. What is it about how they move through the world that you want to carry with you?',
    options: null,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can name a specific person with specific qualities — shows that he has internalized positive role models and can articulate what he admires',
      weak: 'Cannot name anyone or gives generic answer — absence of strong male mentorship figures or inability to articulate values he admires',
      complex: 'The qualities he names reveal his internal value system; cross-reference with how he describes himself',
    },
    redFlags: [
      'Cannot name a single person he genuinely respects in his real life',
      'Describes only famous or aspirational figures — no real, accessible role model present',
    ],
    followUp: {
      condition: 'Describes a famous person or gives a generic answer',
      question: 'Someone who actually knows your name — in your life — who do you look at and think "I want to move like that"?',
    },
  },
  {
    id: 'ms8_37',
    subsection: '8F',
    subsectionName: 'Social Maturity',
    type: 'forced_choice',
    text: 'You\'re 25, working in finance or sports business, managing your first real professional relationships. Which failure is more likely for you based on who you are right now?',
    options: [
      'Coming across too aggressive or too blunt when things don\'t go my way',
      'Holding back too much — not advocating for myself or my ideas',
      'Having trouble reading office politics and relationship dynamics',
      'Letting personal loyalty override professional judgment',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can honestly identify his most likely failure mode — self-awareness is the first step to mitigation',
      weak: 'Cannot identify a likely failure mode or gives an answer that contradicts his profile — defensive self-protection',
      complex: 'All four options are valid for Melvin based on his profile — the honesty and specificity of his answer is the indicator',
    },
    redFlags: [
      'Cannot name any likely professional failure — defensive or unself-aware',
      'Identifies failure mode but shows no awareness of how to mitigate it',
    ],
    followUp: {
      condition: 'Any answer',
      question: 'What\'s one thing you\'re doing now — or could do now — that would make that specific failure less likely?',
    },
  },
  {
    id: 'ms8_38',
    subsection: '8F',
    subsectionName: 'Social Maturity',
    type: 'slider',
    text: 'On a scale of 1–10, how emotionally ready do you feel to be far from home — far from your mom, your neighborhood, everything familiar — for the first time?',
    options: null,
    min: 1,
    max: 10,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: '7+ — genuine readiness to operate independently; has processed the transition emotionally',
      weak: '1–4 — significant emotional unreadiness for the separation; particularly important given the closeness with his mother and the finality of his basketball career ending',
      complex: 'Some anxiety about leaving is healthy and honest; total unreadiness at this stage in the year is a flag',
    },
    redFlags: [
      'Rates 3 or below with no plan or coping framework for the transition',
      'Has not emotionally processed the magnitude of leaving Oakland and everything familiar',
    ],
    followUp: {
      condition: 'Scores 1–4',
      question: 'What part of leaving feels hardest — being away from your mom, losing your daily environment, the unknown of what\'s next, or something else?',
    },
  },
];

// ============================================================
// SECTION 8 SCORING CONFIGURATION
// ============================================================

export const MELVIN_SECTION_8_SCORING = {
  subsections: {
    '8A': {
      name: 'Peer Influence',
      maxWeight: 12.0,
      redFlagThreshold: 2,
    },
    '8B': {
      name: 'Crowd Awareness',
      maxWeight: 9.5,
      redFlagThreshold: 2,
    },
    '8C': {
      name: 'Decision-Making',
      maxWeight: 11.0,
      redFlagThreshold: 2,
    },
    '8D': {
      name: 'Environment Fit',
      maxWeight: 10.5,
      redFlagThreshold: 2,
    },
    '8E': {
      name: 'Risk Awareness',
      maxWeight: 12.0,
      redFlagThreshold: 2,
    },
    '8F': {
      name: 'Social Maturity',
      maxWeight: 10.5,
      redFlagThreshold: 2,
    },
  },

  globalRedFlags: [
    'Peer group is the primary driver of decisions with no independent counter-influence present',
    'Cannot identify a single specific risk to his path beyond surface-level acknowledgment',
    'Makes significant decisions impulsively across multiple contexts with no deliberation process',
    'Current environment is actively hostile to his goals with no mitigation strategy or plan to exit it',
    'No connection felt between present behaviors and future outcomes — complete present-orientation',
    'Dismisses family addiction history as irrelevant to his own risk decisions',
    'Social response is inflexible — same reaction to disrespect regardless of professional stakes or context',
    'Has not emotionally processed the transition to Morehouse and has no readiness framework for independence',
  ],

  contradictionChecks: [
    {
      id: 'contradiction_8_1',
      description: 'Claims independence from peer influence but scenario answers show consistent group-following behavior',
      questions: ['ms8_07', 'ms8_01', 'ms8_02', 'ms8_04'],
      flag: 'Reports low social opinion dependency (ms8_07 low score) but consistently defers to group in scenarios (ms8_01, ms8_02) and cannot separate his reputation from his crew\'s (ms8_04) — independence claim is not matched by behavioral patterns',
    },
    {
      id: 'contradiction_8_2',
      description: 'Claims environment supports goals but behaviors show significant environmental drag',
      questions: ['ms8_21', 'ms8_22', 'ms8_25', 'ms8_05'],
      flag: 'Rates environment as supportive (ms8_21 high) but reports most time in low-value settings (ms8_25 high), peer group with no clear trajectory (ms8_05), and no specific strategy to navigate neighborhood risks (ms8_22) — self-report of support is not matched by behavioral evidence',
    },
    {
      id: 'contradiction_8_3',
      description: 'Claims high social maturity but shows inflexible or reactive response to disrespect across contexts',
      questions: ['ms8_33', 'ms8_34', 'ms8_10', 'ms8_35'],
      flag: 'Reports high room-reading ability (ms8_10) and relational sensitivity (ms8_35) but responds to disrespect uniformly regardless of professional context (ms8_33, ms8_34) — self-assessed social maturity is not matched by contextual social flexibility',
    },
    {
      id: 'contradiction_8_4',
      description: 'Claims calculated risk approach but family history dismissed and fast-money decisions made impulsively',
      questions: ['ms8_30', 'ms8_29', 'ms8_15', 'ms8_31'],
      flag: 'Identifies as a calculated risk-taker (ms8_30) but dismisses family addiction history as risk-irrelevant (ms8_29) and takes fast-money opportunities under pressure (ms8_15) — risk calculation does not appear to include personal history or long-term consequence modeling',
    },
    {
      id: 'contradiction_8_5',
      description: 'Claims Morehouse readiness but shows no preparation, low environmental self-awareness, and emotional unreadiness for independence',
      questions: ['ms8_23', 'ms8_38', 'ms8_11', 'ms8_20'],
      flag: 'Reports readiness for Morehouse (ms8_23 high) but scores low on emotional readiness for independence (ms8_38), defaults to comfort-seeking in new environments (ms8_11), and does not trust own judgment without external input (ms8_20) — readiness claim is contradicted by multiple behavioral and emotional indicators',
    },
  ],
};
