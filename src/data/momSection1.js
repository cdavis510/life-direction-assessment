// ============================================================
// MOM — SECTION 1: Relationship with Mekhi
// Subsections: 1A How Well She Knows Him | 1B Emotional Connection |
//              1C Her Response to His Struggles | 1D Pride vs. Pressure
// Total Questions: 38
// ============================================================

export const MOM_SECTION_1 = [

  // ─────────────────────────────────────────────
  // 1A — How Well She Knows Him
  // ─────────────────────────────────────────────
  {
    id: 'ms1_01',
    subsection: '1A',
    subsectionName: 'How Well She Knows Him',
    type: 'open',
    text: 'Without looking anything up — describe Mekhi right now. Not who he was or who you want him to be. Who is he today?',
    options: null,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Specific, current, behavioral description — names what he is doing, thinking, struggling with, and moving toward right now with real detail',
      weak: 'General, dated, or idealized — describes traits from years ago, hopes for the future, or labels (lazy, smart, unfocused) rather than current observable behavior',
      complex: 'The specificity and currency of her description is the data — a mother who truly knows her son can describe his current state without prompting',
    },
    redFlags: [
      'Description is primarily labels or adjectives with no behavioral evidence',
      'Description matches who he was 2+ years ago more than who he is now',
      'She describes who she hopes he is rather than who she observes him being',
    ],
    followUp: {
      condition: 'Vague or dated response',
      question: 'What did Mekhi do or say in the last two weeks that tells you something real about where he is right now?',
    },
  },
  {
    id: 'ms1_02',
    subsection: '1A',
    subsectionName: 'How Well She Knows Him',
    type: 'likert',
    text: 'How accurately do you think you understand what Mekhi is struggling with most right now — not what you assume, what you actually know?',
    options: [
      'I\'m mostly guessing — he doesn\'t share much and I\'m working from assumptions',
      'I have a partial picture — I know some things but there are real gaps',
      'I have a reasonable understanding — I know the broad strokes',
      'I have a clear picture — he\'s talked to me and I understand what he\'s facing',
      'I know exactly what he\'s struggling with — we\'ve talked through it specifically',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Has direct knowledge from real conversations — not inference or assumption',
      weak: 'Working from assumptions with no direct communication — high risk of misreading him and responding to the wrong problem',
      complex: 'A partial picture is honest and workable; total reliance on assumption is the flag',
    },
    redFlags: [
      'Primarily working from assumptions rather than direct knowledge',
      'Has not had a real conversation with Mekhi about his current struggles in the past month',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'What would it take for you to know — not guess — what Mekhi is actually dealing with right now?',
    },
  },
  {
    id: 'ms1_03',
    subsection: '1A',
    subsectionName: 'How Well She Knows Him',
    type: 'forced_choice',
    text: 'Which best describes what you know about Mekhi\'s goals for his future right now?',
    options: [
      'I know what he\'s told me, but I\'m not sure he\'s told me the full truth',
      'I know his general direction but not the specifics — he keeps it vague',
      'I know his goals clearly — he\'s talked about them and they feel real',
      'I\'m honestly not sure he has clear goals yet — and that worries me',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Knows his goals clearly through direct conversation — can articulate what he wants and why it\'s real',
      weak: 'Acknowledges she doesn\'t know or that he keeps things vague — honest, but signals a communication gap that needs to close',
      complex: 'Suspecting he hasn\'t told her the full truth is a significant signal worth exploring — distrust or distance in the relationship',
    },
    redFlags: [
      'Believes he\'s hiding the full truth about his goals — underlying distrust or communication breakdown',
      'He has no clear goals and she has not directly addressed this with him',
    ],
    followUp: {
      condition: 'Selects "told me but not sure it\'s the full truth" or "not sure he has goals"',
      question: 'What makes you feel like you\'re not getting the full picture? What does he do or not do that signals that?',
    },
  },
  {
    id: 'ms1_04',
    subsection: '1A',
    subsectionName: 'How Well She Knows Him',
    type: 'open',
    text: 'What is Mekhi most afraid of right now — and how do you know?',
    options: null,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Names a specific fear grounded in observable behavior or direct conversation — shows she is tracking his emotional interior, not just his behavior',
      weak: 'Cannot name a fear or names something generic ("failure," "the future") without behavioral grounding — suggests she is not seeing beneath the surface',
      complex: '"I don\'t know" is honest and valuable — it reveals a gap she can act on. "He\'s not afraid of anything" is a red flag — all young men carry fear.',
    },
    redFlags: [
      'Cannot name anything specific about what he fears',
      'Claims he is not afraid of anything — suggests she is either not looking or he is not showing her',
    ],
    followUp: {
      condition: 'Cannot name a specific fear',
      question: 'Think about how he reacts when things get hard — when he fails something, gets criticized, or faces something uncertain. What do you see in him in those moments?',
    },
  },
  {
    id: 'ms1_05',
    subsection: '1A',
    subsectionName: 'How Well She Knows Him',
    type: 'likert',
    text: 'How well do you understand what motivates Mekhi — what actually makes him move, not what should motivate him?',
    options: [
      'I\'m not sure — I thought I knew but his behavior doesn\'t match what I thought',
      'I have some sense of it but I\'m often wrong when I try to motivate him',
      'I have a general sense — I know what he responds to most of the time',
      'I understand it well — I know how to reach him and what drives him',
      'I understand it completely — I can predict what will move him and what won\'t',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Understands his actual motivation — can distinguish between what should motivate him and what actually does',
      weak: 'Acknowledges mismatch between her assumptions and his behavior — critical self-awareness that often leads to more effective approaches',
      complex: '"Often wrong when I try to motivate him" is more useful than false confidence — it opens the door to learning what actually works',
    },
    redFlags: [
      'Repeatedly uses motivation strategies that don\'t work without adjusting',
      'Cannot distinguish between what should motivate him and what actually does',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'Think about a recent time you tried to motivate Mekhi and it didn\'t work. What did you try, and what happened?',
    },
  },
  {
    id: 'ms1_06',
    subsection: '1A',
    subsectionName: 'How Well She Knows Him',
    type: 'scenario',
    text: 'Mekhi comes home and something is clearly off — he\'s quiet, withdrawn, not himself. You haven\'t heard anything specific. What do you do?',
    options: [
      'Ask him directly what\'s wrong — I want to know immediately',
      'Give him space and wait — he\'ll come to me when he\'s ready',
      'Find a low-pressure moment to check in — not a direct interrogation',
      'Assume it will pass and watch to see if it escalates',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Finds a low-pressure entry point — demonstrates knowledge of how he opens up, neither forcing nor abandoning',
      weak: 'Immediate direct interrogation (shuts him down) or passive watching with no engagement (misses the moment)',
      complex: '"Give him space and wait" can be right or avoidant depending on whether she follows up — the question is whether the space is strategic or indefinite',
    },
    redFlags: [
      'Assumes it will pass without any form of check-in — abdicating emotional presence',
      'Direct interrogation pattern has historically shut him down but she continues to use it',
    ],
    followUp: {
      condition: 'Selects "ask directly" or "assume it will pass"',
      question: 'When you ask him directly, what usually happens? Does he open up or close down?',
    },
  },
  {
    id: 'ms1_07',
    subsection: '1A',
    subsectionName: 'How Well She Knows Him',
    type: 'slider',
    text: 'On a scale of 1–10, how accurately do you know what Mekhi\'s daily experience feels like right now — not what it looks like from the outside, what it feels like to be him?',
    options: null,
    min: 1,
    max: 10,
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: '7+ — can step into his experience with specific, empathetic understanding of his inner world',
      weak: '1–4 — knows his external behavior but not his internal experience — responding to symptoms without understanding the source',
      complex: '5–6 — partial understanding; check what specific domains she knows vs. where she has genuine gaps',
    },
    redFlags: [
      'Rates 3 or below — significant empathy gap; parenting decisions are being made without understanding his experience',
      'High rating contradicted by inability to describe his fears, motivations, or current struggles specifically',
    ],
    followUp: {
      condition: 'Scores 1–4',
      question: 'What would help you understand what his daily life actually feels like — not what you see, what he experiences?',
    },
  },

  // ─────────────────────────────────────────────
  // 1B — Emotional Connection
  // ─────────────────────────────────────────────
  {
    id: 'ms1_08',
    subsection: '1B',
    subsectionName: 'Emotional Connection',
    type: 'likert',
    text: 'How emotionally connected do you and Mekhi feel to each other right now — not how much you love him, how connected you actually feel in this season?',
    options: [
      'Disconnected — there\'s real distance between us and I feel it',
      'Slightly connected — we coexist but the depth isn\'t there right now',
      'Moderately connected — we have moments but not a consistent thread',
      'Well connected — I feel close to him most of the time',
      'Deeply connected — our relationship has real depth and warmth right now',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Real, felt connection in the current season — not historical or aspirational',
      weak: 'Acknowledged distance — honest and actionable; the flag is if she has no awareness of how the distance formed',
      complex: '"We have moments" is meaningful; the question is whether she is building on those moments or waiting for them',
    },
    redFlags: [
      'Feels real distance and does not know how it formed or what to do about it',
      'Connection is based on the past relationship, not the current one — living in who he was, not who he is',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'When did the distance start? Was there a moment, a shift, or did it build gradually?',
    },
  },
  {
    id: 'ms1_09',
    subsection: '1B',
    subsectionName: 'Emotional Connection',
    type: 'open',
    text: 'What is something Mekhi has said to you recently — in the last month — that told you he trusts you?',
    options: null,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can name a specific thing — a statement, a moment, a vulnerability he showed — that demonstrates real trust is present',
      weak: 'Cannot name anything recent — trust is assumed rather than evidenced; or he has said nothing in the last month that indicates trust',
      complex: 'Trust shown through action (coming to her, being honest, asking for help) is as valid as trust shown through words',
    },
    redFlags: [
      'Cannot name any recent moment of trust from Mekhi — trust gap is real and current',
      'Describes trust from months or years ago — relationship may have shifted without her fully acknowledging it',
    ],
    followUp: {
      condition: 'Cannot name a recent moment',
      question: 'When was the last time Mekhi came to you with something he didn\'t have to tell you? Something real?',
    },
  },
  {
    id: 'ms1_10',
    subsection: '1B',
    subsectionName: 'Emotional Connection',
    type: 'forced_choice',
    text: 'How does Mekhi most often show you that he cares about your relationship?',
    options: [
      'He tells me — he says it directly',
      'He shows up — he\'s present, he helps, he checks on me',
      'He comes to me when something is wrong — he trusts me with hard things',
      'Honestly, I\'m not sure he shows it in a way I clearly recognize',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can name a specific, observable way he shows care — she sees him, not just what she wants to see',
      weak: 'Cannot recognize how he shows care — may be missing his actual language of love/connection, or connection is genuinely absent',
      complex: 'Different love languages — he may show care in ways she doesn\'t register as care; this is a critical gap to address',
    },
    redFlags: [
      'Cannot recognize how he shows care in any form',
      'His expressions of care go unnoticed because they don\'t match her expected form',
    ],
    followUp: {
      condition: 'Selects "I\'m not sure"',
      question: 'Is it possible he\'s showing you he cares in a way you\'re not recognizing — not the way you\'d want him to, but in his own way?',
    },
  },
  {
    id: 'ms1_11',
    subsection: '1B',
    subsectionName: 'Emotional Connection',
    type: 'likert',
    text: 'How safe does Mekhi seem to feel telling you difficult things — things he might be embarrassed about or afraid you\'ll judge?',
    options: [
      'Not safe at all — he doesn\'t share difficult things with me',
      'Slightly safe — he shares surface things but not the real stuff',
      'Somewhat safe — he opens up sometimes but it feels conditional',
      'Mostly safe — he usually comes to me when something is hard',
      'Very safe — he knows he won\'t be judged and he shows it by sharing real things',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'He shares real, difficult things — she has created genuine safety in the relationship',
      weak: 'He shares only surface-level things or nothing at all — she is not a safe person for him to be vulnerable with, which limits her ability to help him',
      complex: 'Conditional safety is workable — the conditions reveal what she needs to adjust',
    },
    redFlags: [
      'He shares nothing difficult — she is not a safe space for him emotionally',
      'She is the last to know when something is wrong with him — trust gap is significant',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'When Mekhi has something hard going on — who does he go to? And what does that tell you?',
    },
  },
  {
    id: 'ms1_12',
    subsection: '1B',
    subsectionName: 'Emotional Connection',
    type: 'scenario',
    text: 'Mekhi tells you something he\'s embarrassed about — a failure, a mistake, something he didn\'t handle well. What is your gut reaction in that moment?',
    options: [
      'Relief that he told me — I focus on keeping the door open, not the content',
      'I immediately want to fix it or help — the solution comes first',
      'I feel disappointed and it probably shows on my face before I can control it',
      'I ask questions to understand fully before I say anything',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Prioritizes keeping the door open — recognizes that how she responds to the first thing he shares determines whether he shares the next thing',
      weak: 'Visible disappointment or immediate problem-solving — both close him down; if he learns sharing leads to disappointment or unsolicited advice, he stops sharing',
      complex: 'Asking questions is good but must follow receiving — jumping to questions before acknowledging what he shared can feel like an interrogation',
    },
    redFlags: [
      'Visible disappointment is the gut response — he is learning that vulnerability leads to her pain, not her support',
      'Immediately moves to solutions without first receiving what he shared — he feels unheard before being helped',
    ],
    followUp: {
      condition: 'Selects disappointment or immediate fix',
      question: 'After that kind of moment — does he usually share similar things again, or does it seem like he pulls back?',
    },
  },

  // ─────────────────────────────────────────────
  // 1C — Her Response to His Struggles
  // ─────────────────────────────────────────────
  {
    id: 'ms1_13',
    subsection: '1C',
    subsectionName: 'Her Response to His Struggles',
    type: 'likert',
    text: 'When Mekhi is clearly struggling — academically, emotionally, with direction — how would you describe your default response?',
    options: [
      'I get anxious and that anxiety comes out as pressure on him',
      'I step in immediately to help fix or solve the problem',
      'I try to understand first, then figure out what kind of support he needs',
      'I give him space unless he asks for help, then I\'m fully there',
      'I ask him what he needs and follow his lead',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Understands first, then follows his lead — response is calibrated to what he actually needs rather than what she needs to do',
      weak: 'Anxiety as pressure or immediate fix-it mode — both can make his struggle feel like a problem she has to solve, which adds to his burden',
      complex: 'Pure space-giving without availability can also leave him feeling abandoned — balance matters',
    },
    redFlags: [
      'Her anxiety consistently translates into pressure on him during his struggles',
      'Fixes before understanding — he learns to hide struggles to avoid unsolicited intervention',
    ],
    followUp: {
      condition: 'Selects anxiety/pressure or immediate fix',
      question: 'When you respond that way — how does Mekhi typically react? Does he lean in or pull away?',
    },
  },
  {
    id: 'ms1_14',
    subsection: '1C',
    subsectionName: 'Her Response to His Struggles',
    type: 'open',
    text: 'Think about the last time Mekhi was really struggling with something. What did you do, and looking back, what do you think he actually needed from you in that moment?',
    options: null,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can describe what she did AND reflect on whether it matched what he needed — self-awareness gap analysis in real situations',
      weak: 'Describes only what she did without reflecting on whether it helped — no gap awareness',
      complex: 'If what she did and what he needed were different, her willingness to name that gap is the most valuable data point',
    },
    redFlags: [
      'What she did and what he needed were clearly different and she cannot see the gap',
      'Cannot recall what he was struggling with — not present enough to remember his difficulties',
    ],
    followUp: {
      condition: 'Cannot identify the gap between her response and his need',
      question: 'If Mekhi could have told you exactly what he needed in that moment — what do you think he would have said?',
    },
  },
  {
    id: 'ms1_15',
    subsection: '1C',
    subsectionName: 'Her Response to His Struggles',
    type: 'likert',
    text: 'How well do you manage your own worry about Mekhi — containing it internally rather than letting it spill into how you interact with him?',
    options: [
      'Not well — my worry is very present in our interactions and he feels it',
      'Somewhat — I try to contain it but it often comes out anyway',
      'Moderately — I manage it most of the time but slip in high-stress moments',
      'Well — I process my worry separately and it doesn\'t usually affect my presence with him',
      'Very well — I\'ve learned to hold my fears without projecting them onto him',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Can hold her worry separate from her presence with him — he experiences her as calm support, not anxious surveillance',
      weak: 'Worry is visible and felt — he is carrying both his own struggles AND her fear, which doubles his burden',
      complex: 'Slipping in high-stress moments is honest and workable — chronic visible worry is the flag',
    },
    redFlags: [
      'Worry is consistently present in interactions — he is managing her emotional state on top of his own',
      'Cannot separate her fear for him from her presence with him in any context',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'When your worry shows up in how you interact with him — what does he do? How does he respond to it?',
    },
  },
  {
    id: 'ms1_16',
    subsection: '1C',
    subsectionName: 'Her Response to His Struggles',
    type: 'forced_choice',
    text: 'Mekhi is failing a class and you just found out. He hasn\'t told you himself. What do you do first?',
    options: [
      'Confront him immediately — he needs to know I know and this isn\'t okay',
      'Wait for a calm moment and bring it up without making it a confrontation',
      'Let him tell me in his own time — I don\'t want to betray how I found out',
      'Contact the school myself to understand the situation before I talk to him',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Chooses a calm, non-confrontational approach — opens a conversation rather than launching an accountability ambush',
      weak: 'Immediate confrontation — he becomes defensive before the conversation begins; or contacting school first without talking to him undermines trust',
      complex: 'Waiting for him to tell her is idealistic — the failing grade requires a response; the question is how',
    },
    redFlags: [
      'Confrontation is the first move — conversation becomes defensive before it starts',
      'Goes around him to the school without telling him — he learns she operates behind his back',
    ],
    followUp: {
      condition: 'Selects immediate confrontation or contacts school first',
      question: 'When you approach him that way — does it usually lead to a real conversation, or does it close down quickly?',
    },
  },
  {
    id: 'ms1_17',
    subsection: '1C',
    subsectionName: 'Her Response to His Struggles',
    type: 'slider',
    text: 'On a scale of 1–10, how good are you at sitting with Mekhi in difficulty — being present with him in his struggle without trying to fix it, minimize it, or move past it?',
    options: null,
    min: 1,
    max: 10,
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: '7+ — can be genuinely present in his difficulty without needing to resolve it; this is one of the most powerful things a parent can offer',
      weak: '1–4 — discomfort with unresolved difficulty leads to premature fixing, minimizing, or moving on; he learns his pain makes her uncomfortable',
      complex: '5–6 — developing; check which domains she can sit with vs. which trigger her fix-it response',
    },
    redFlags: [
      'Rates 3 or below — she cannot tolerate sitting with his pain; her discomfort with it is communicated to him',
      'Moves past difficulty quickly — his pain is treated as a problem to solve rather than an experience to share',
    ],
    followUp: {
      condition: 'Scores 1–4',
      question: 'What happens inside you when Mekhi is hurting and there\'s nothing you can immediately do about it?',
    },
  },
  {
    id: 'ms1_18',
    subsection: '1C',
    subsectionName: 'Her Response to His Struggles',
    type: 'open',
    text: 'What is the hardest part of watching Mekhi struggle — be honest about what it costs you personally?',
    options: null,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Honest, specific answer about her own emotional cost — demonstrates self-awareness that allows her to manage that cost without projecting it onto him',
      weak: 'Redirects to him rather than answering about herself — cannot access her own emotional response; or "nothing, I just want to help him" — suppression of her own experience',
      complex: 'The specific thing she names as hard reveals what her automatic response will be — fear leads to control, helplessness leads to over-intervention, guilt leads to rescue',
    },
    redFlags: [
      'Cannot answer about herself — immediately redirects to what Mekhi needs rather than what she experiences',
      'The cost she names is entirely ego-based (embarrassment, judgment) rather than genuinely connected to his wellbeing',
    ],
    followUp: {
      condition: 'Redirects to Mekhi rather than herself',
      question: 'I\'m asking about you — not him. When he struggles, what happens inside of you? What does it feel like?',
    },
  },

  // ─────────────────────────────────────────────
  // 1D — Pride vs. Pressure
  // ─────────────────────────────────────────────
  {
    id: 'ms1_19',
    subsection: '1D',
    subsectionName: 'Pride vs. Pressure',
    type: 'likert',
    text: 'How often does Mekhi seem to feel your love as belief in him — versus feeling it as pressure to meet your expectations?',
    options: [
      'I think he mostly feels it as pressure — my expectations come through stronger than my belief',
      'Probably more pressure than belief — I want so much for him that it lands hard',
      'A mix — sometimes he feels the belief, sometimes the pressure',
      'Mostly belief — he knows I\'m in his corner even when I push',
      'Clearly belief — he consistently knows I believe in him regardless of outcomes',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'He experiences her as believing in him — her expectations are held within a container of unconditional support',
      weak: 'He primarily feels pressure — her love is conditional on performance in his experience, even if not in her intention',
      complex: 'The gap between her intention and his experience is the most important gap in this section — she can love him completely and he can still feel primarily pressured',
    },
    redFlags: [
      'Acknowledges he mostly feels pressure — her expectations are louder than her belief in practice',
      'She is unaware of how her expectations land on him — gap between intention and impact',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'Has Mekhi ever said — directly or indirectly — that he feels like he\'s not enough? How did you respond?',
    },
  },
  {
    id: 'ms1_20',
    subsection: '1D',
    subsectionName: 'Pride vs. Pressure',
    type: 'scenario',
    text: 'Mekhi does something well — not great, not exceptional, just genuinely solid. How do you respond?',
    options: [
      'I acknowledge it and then mention what he could do even better',
      'I celebrate it genuinely — solid is worth celebrating',
      'I acknowledge it but I don\'t make a big deal — I don\'t want him to get complacent',
      'I ask if he can build on it — I always want him thinking about the next level',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Celebrates genuinely without immediately pivoting to the next level — he experiences his good work as valued, not as a stepping stone',
      weak: 'Acknowledges + immediately corrects or extends — he learns that "good" is never enough; positive moments become mini-disappointments',
      complex: 'Always asking about the next level can mask his wins; the question is whether he gets a moment of pure acknowledgment before the stretch',
    },
    redFlags: [
      'Every acknowledgment of success is immediately followed by correction or extension — he never gets a clean win',
      'Fears complacency so strongly that she cannot let his success land before pushing forward',
    ],
    followUp: {
      condition: 'Selects acknowledge + correct or ask about next level',
      question: 'When was the last time you told Mekhi you were proud of him without following it with a "but" or a "now"?',
    },
  },
  {
    id: 'ms1_21',
    subsection: '1D',
    subsectionName: 'Pride vs. Pressure',
    type: 'open',
    text: 'What do you want Mekhi to know about how you feel about him — right now, not contingent on anything he does or becomes?',
    options: null,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can articulate unconditional love and belief clearly and specifically — the message she would want him to receive exists in her and can be delivered',
      weak: 'Answer is conditional or performance-based even when trying not to be — "I\'m proud of what he can become," "I know he\'ll be great when..." — the conditions are embedded',
      complex: 'The presence or absence of conditionality in her language here predicts whether he experiences her love as safe or as conditional',
    },
    redFlags: [
      'Cannot articulate unconditional positive regard — even her attempt to express love contains performance expectations',
      'Has never said this to him directly — the message exists internally but has not been communicated',
    ],
    followUp: {
      condition: 'Any response',
      question: 'Have you said this to him directly — not implied it, said it? When was the last time?',
    },
  },
  {
    id: 'ms1_22',
    subsection: '1D',
    subsectionName: 'Pride vs. Pressure',
    type: 'likert',
    text: 'How much does your sense of your own success as a parent depend on Mekhi\'s outcomes — his grades, his choices, his direction?',
    options: [
      'A lot — when he struggles, I feel like I\'m failing as a parent',
      'Quite a bit — his outcomes are tied to how I feel about my parenting',
      'Some — I\'m affected by his outcomes but I can separate them from my value',
      'A little — I care deeply but my sense of myself as a parent doesn\'t live in his outcomes',
      'Very little — my worth as a parent and his outcomes are separate things',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can separate her worth as a parent from his outcomes — she is not dependent on his success to feel like a good mother',
      weak: 'Her self-worth as a parent lives in his outcomes — his failure becomes her failure; this creates pressure he cannot escape because her emotional state is contingent on his performance',
      complex: 'Some caring about outcomes is healthy and unavoidable; the flag is when her emotional state becomes his responsibility',
    },
    redFlags: [
      'Her sense of herself as a parent is entirely outcome-dependent — his struggles feel like personal failures',
      'He has likely sensed this — and is now managing her feelings about his life on top of his own',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'When Mekhi is struggling — do you think he feels responsible for how you feel about it? Does he seem like he\'s managing you as well as managing himself?',
    },
  },
  {
    id: 'ms1_23',
    subsection: '1D',
    subsectionName: 'Pride vs. Pressure',
    type: 'forced_choice',
    text: 'Which is more honest about how Mekhi experiences your expectations?',
    options: [
      'He knows what I expect and it motivates him — he wants to meet them',
      'He knows what I expect and it stresses him — he worries about disappointing me',
      'He\'s unclear on what I actually expect — my expectations are inconsistent',
      'He\'s stopped thinking about my expectations — he\'s detached from them',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'He is motivated by expectations — they are held within a relationship where he feels supported, not just evaluated',
      weak: 'He is stressed by expectations or has detached from them — either the expectations are too high, too inconsistent, or not held within enough support to feel motivating',
      complex: 'Detachment is the most concerning option — he has stopped engaging with her expectations entirely, which means the relationship has lost influence over his direction',
    },
    redFlags: [
      'He stresses about disappointing her — her expectations are a source of anxiety, not fuel',
      'He has detached from her expectations — the relationship has lost its motivating influence',
    ],
    followUp: {
      condition: 'Selects stress or detachment',
      question: 'When did that shift happen — when did her expectations start feeling like weight instead of support to him, as far as you can tell?',
    },
  },
  {
    id: 'ms1_24',
    subsection: '1D',
    subsectionName: 'Pride vs. Pressure',
    type: 'open',
    text: 'If Mekhi were answering this assessment honestly — what do you think he would say about what it feels like to be your son right now?',
    options: null,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can take his perspective honestly — not what she hopes he would say, what she genuinely believes he experiences; shows empathic accuracy and self-awareness',
      weak: 'Projects what she wants him to feel rather than what she believes he actually experiences — cannot step into his experience without filtering it through her hopes',
      complex: 'This is the section\'s highest-signal question — her ability to answer honestly determines the accuracy of all other answers in this section',
    },
    redFlags: [
      'Cannot take his perspective without filtering it through what she wants the answer to be',
      'Her answer is predominantly positive when all prior answers suggest a more complicated relationship',
    ],
    followUp: {
      condition: 'Response is primarily positive despite contradicting evidence in prior answers',
      question: 'What\'s the hard part? If there\'s one thing he would say that would be difficult for you to hear — what do you think it would be?',
    },
  },
];

// ============================================================
// SECTION 1 SCORING CONFIGURATION
// ============================================================

export const MOM_SECTION_1_SCORING = {
  subsections: {
    '1A': {
      name: 'How Well She Knows Him',
      maxWeight: 13.0,
      redFlagThreshold: 2,
    },
    '1B': {
      name: 'Emotional Connection',
      maxWeight: 9.5,
      redFlagThreshold: 2,
    },
    '1C': {
      name: 'Her Response to His Struggles',
      maxWeight: 11.0,
      redFlagThreshold: 2,
    },
    '1D': {
      name: 'Pride vs. Pressure',
      maxWeight: 11.5,
      redFlagThreshold: 2,
    },
  },

  globalRedFlags: [
    'She describes Mekhi primarily through assumptions, labels, or outdated information rather than current observable behavior',
    'She cannot accurately name what he is struggling with, afraid of, or motivated by in this season',
    'He does not experience her as a safe person to share difficult things with',
    'Her visible anxiety about him is consistently communicated to him — he is carrying her fear on top of his own',
    'Every acknowledgment of his success is immediately followed by correction, extension, or a higher expectation',
    'Her worth as a parent is outcome-dependent — his struggles feel like her failures',
    'He has detached from her expectations entirely — the relationship has lost its motivational influence',
    'She cannot take his perspective without filtering it through what she hopes he experiences',
  ],

  contradictionChecks: [
    {
      id: 'contradiction_mom1_1',
      description: 'Claims strong connection but cannot name recent evidence of trust or describe his current inner state',
      questions: ['ms1_08', 'ms1_09', 'ms1_07', 'ms1_04'],
      flag: 'Rates emotional connection high (ms1_08) but cannot name a recent moment of trust from Mekhi (ms1_09), rates knowledge of his inner experience low (ms1_07), and cannot name what he is currently afraid of (ms1_04) — connection is felt but not evidenced; may be based on historical relationship rather than current state',
    },
    {
      id: 'contradiction_mom1_2',
      description: 'Believes he experiences her as belief and support but her responses in scenarios reveal pressure and correction',
      questions: ['ms1_19', 'ms1_20', 'ms1_22', 'ms1_23'],
      flag: 'Reports that he mostly feels her belief (ms1_19) but immediately follows success with correction (ms1_20), her worth is outcome-dependent (ms1_22), and he is stressed or detached from her expectations (ms1_23) — she believes she is communicating belief; he is experiencing pressure',
    },
    {
      id: 'contradiction_mom1_3',
      description: 'Claims to manage worry well but scenario responses reveal anxiety-driven interventions',
      questions: ['ms1_15', 'ms1_13', 'ms1_16', 'ms1_17'],
      flag: 'Reports managing worry well (ms1_15) but default response to his struggles is anxiety-as-pressure (ms1_13), confrontation is the first move when he fails (ms1_16), and cannot sit with him in difficulty (ms1_17) — worry containment is self-reported but not behaviorally demonstrated',
    },
    {
      id: 'contradiction_mom1_4',
      description: 'Believes she knows him well but cannot answer specific questions about his current experience',
      questions: ['ms1_02', 'ms1_04', 'ms1_05', 'ms1_01'],
      flag: 'Reports reasonable to clear understanding of his struggles (ms1_02) but cannot name what he is currently afraid of (ms1_04), acknowledges often being wrong about motivation (ms1_05), and description of him is vague or dated (ms1_01) — knowledge self-assessment is inflated relative to demonstrated specific knowledge',
    },
    {
      id: 'contradiction_mom1_5',
      description: 'Describes the relationship as having real connection but his behavior signals distance',
      questions: ['ms1_08', 'ms1_11', 'ms1_24', 'ms1_10'],
      flag: 'Describes felt connection (ms1_08) but he does not share difficult things with her (ms1_11), she cannot take his honest perspective without filtering (ms1_24), and she cannot recognize how he shows care (ms1_10) — she feels connected; he may experience significant distance that she has not yet acknowledged',
    },
  ],
};
