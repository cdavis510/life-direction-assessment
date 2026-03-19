// ─── MELVIN SECTION 2 — IDENTITY & DIRECTION ─────────────────────────────────
// Built for Melvin Jr. — 17, Deep East Oakland, Morehouse-bound, Finance track.
// Probe: Is his identity built to survive failure? Does direction come from inside?
// Key tensions:
//   → External validation (accolades, recognition) vs. internal compass
//   → Father's cautionary tale vs. his own manhood model
//   → Confidence as performance vs. confidence as foundation
//   → Legacy vision vs. current behavioral drift (school absences, low motivation)
//   → Being different (anime, Travis Scott, going to concert alone) vs. needing recognition
// ─────────────────────────────────────────────────────────────────────────────

export const MELVIN_SECTION_2 = {
  id: 'melvin_section2',
  title: 'Identity & Direction',
  subtitle: 'Self-Image, Standards, Manhood, Future Confidence & Internal Drive',
  userId: 'melvin',
  subsections: [
    'Self-Image',
    'Personal Standards',
    'Masculinity & Manhood Vision',
    'Confidence in Future',
    'Internal Motivation',
    'Belief in Own Potential',
  ],
  questions: [

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 2A — SELF-IMAGE
    // Target: How does he see himself — accurately, inflated, or deflated?
    // Probe: consistency of self-image across contexts, identity under threat,
    //        whether the image matches his actual life choices right now
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms2_01',
      subsection: '2A',
      subsectionName: 'Self-Image',
      type: 'open',
      text: 'Describe yourself in your own words — not your accomplishments, not what you\'re going to do, not what people say about you. Who are you, right now, today?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Specific, grounded description that includes character traits, values, and honest self-observation. Not just a list of achievements.',
        weak: 'Resume answer — GPA, Morehouse, basketball. Achievement-based identity with no access to character beneath the record.',
        complex: 'Melvin\'s identity is built around excellence and distinction. This question asks what\'s underneath that. If he can\'t access the layer below the achievements, his identity is fragile — it depends on keeping the record intact.',
      },
      redFlags: [
        'Only names achievements, acceptances, and accolades',
        '"I\'m just Melvin, I\'m different from most people" with no elaboration',
        'No character trait named at all',
      ],
      followUp: {
        condition: 'response is achievement-heavy',
        question: 'If you took away the 4.2 GPA, the Morehouse acceptance, and the basketball career — who is Melvin underneath all of that?',
      },
    },

    {
      id: 'ms2_02',
      subsection: '2A',
      subsectionName: 'Self-Image',
      type: 'forced_choice',
      text: 'When you think about who you are, which of these feels most true?',
      options: [
        'I have a very clear, stable sense of who I am — it doesn\'t change based on where I am or who I\'m with',
        'I know who I am at my core, but different sides come out in different situations',
        'I\'m still figuring out who I am — I have a general idea but it\'s not solid yet',
        'I present a version of myself publicly but I\'m not sure that\'s actually me',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A or B: stable identity with contextual flexibility — both are healthy',
        weak: 'Option D: performed self vs. real self gap — significant identity fragility',
        complex: 'Option C is honest and developmentally appropriate at 17. The question is whether the uncertainty is acknowledged with curiosity or with anxiety.',
      },
      redFlags: ['Option D — especially if combined with confidence performance signals in Section 1D'],
      followUp: {
        condition: 'answer is Option D',
        question: 'The version of yourself you present publicly — where does that come from? Who taught you to show up that way?',
      },
    },

    {
      id: 'ms2_03',
      subsection: '2A',
      subsectionName: 'Self-Image',
      type: 'likert',
      text: 'I like who I am right now — not just where I\'m going, but who I actually am in this moment.',
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
        strong: 'Agree or Strongly Agree with congruence elsewhere in the section — healthy self-acceptance',
        weak: 'Strongly Disagree — self-rejection is a significant risk factor heading into a major transition',
        complex: 'Neutral is worth examining. Melvin is someone who lives heavily in future-orientation. He may be proud of where he\'s going while not having peace with who he is right now.',
      },
      redFlags: ['Strongly Disagree', 'Neutral combined with low Mood Stability scores from Section 1A'],
      followUp: {
        condition: 'answer in ["Strongly Disagree", "Disagree", "Neutral"]',
        question: 'What would need to be different about who you are right now for you to like yourself more fully?',
      },
    },

    {
      id: 'ms2_04',
      subsection: '2A',
      subsectionName: 'Self-Image',
      type: 'scenario',
      text: 'You\'re going to a Travis Scott concert in Berkeley — alone — because none of your friends are into the music. You run into a group of people from your school who think it\'s weird. They give you a hard time about it. Walk me through how you handle that — inside and out.',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Doesn\'t bend. Holds his own perspective without needing to justify himself. Some version of "I don\'t care what they think." Shows identity security.',
        weak: 'Becomes defensive. Feels the need to explain or justify. Lets the comment land internally even if he doesn\'t show it externally.',
        complex: 'This scenario uses a real event from his life. The question isn\'t whether he\'d handle it — he would. The question is whether his internal experience of being different is genuinely secure or secretly costly.',
      },
      redFlags: [
        'Extended justification of his music taste',
        'Named internal discomfort that he then suppressed',
        'The experience of being alone becomes a sore point',
      ],
      followUp: {
        condition: 'any discomfort about being alone is named',
        question: 'You\'re comfortable being different from your peers. But is there a version of "different" that sometimes feels lonely rather than free?',
      },
    },

    {
      id: 'ms2_05',
      subsection: '2A',
      subsectionName: 'Self-Image',
      type: 'slider',
      text: 'How much do you genuinely respect the person you are right now — not the person you\'re becoming, but who you are today?',
      min: 1,
      max: 10,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: '7–10: healthy self-respect in the present tense — not contingent on future achievement',
        weak: '1–4: significant gap between self-respect and self-image — may be entirely future-contingent ("I\'ll respect myself when...")',
        complex: 'High score should be cross-checked with ms2_06. If he scores 9–10 but can\'t name what he respects about his present self, the score is aspirational rather than accurate.',
      },
      redFlags: ['score 1–4', 'score 9–10 with no specific present-moment self-respect evidence'],
      followUp: {
        condition: 'score >= 8',
        question: 'What specifically about who you are right now — not your accomplishments, but who you ARE — do you respect?',
      },
    },

    {
      id: 'ms2_06',
      subsection: '2A',
      subsectionName: 'Self-Image',
      type: 'open',
      text: 'When you\'re alone — no performance, no audience, no one to impress — who are you? What do you think about? What do you feel?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Describes internal life with some specificity. Shows that his inner world is rich and inhabited even without external validation. Not threatened by solitude.',
        weak: 'Can\'t access the question. Deflects into activities ("I watch anime, I listen to music"). No interior reflection offered.',
        complex: 'Melvin\'s comfort with being alone (concert, different from peers) is a strength. But "comfortable being alone" and "knowing who you are alone" are different things. This question finds the difference.',
      },
      redFlags: [
        'Only names activities, not interior states',
        'Discomfort with the question itself',
        '"I don\'t really think about deep stuff like that when I\'m alone"',
      ],
      followUp: {
        condition: 'response only names activities',
        question: 'When you\'re watching anime or listening to Travis — what does that give you that most people around you don\'t?',
      },
    },

    {
      id: 'ms2_07',
      subsection: '2A',
      subsectionName: 'Self-Image',
      type: 'forced_choice',
      text: 'Your identity — the core of who you are — is mostly built on:',
      options: [
        'My values and how I treat people — my character',
        'What I\'ve achieved and what I\'m working toward — my track record',
        'How I show up in relationships — my loyalty and protection',
        'What makes me different from everyone around me — my independence',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A: character-based identity — most durable, least fragile under failure',
        weak: 'Option B: achievement-based identity — strong motivator, but brittle when achievements are threatened (e.g., first C at Morehouse)',
        complex: 'Option C (loyalty/protection) is Melvin\'s visible operating system — especially toward Mom. Option D (independence/difference) is his social identity. Neither is wrong; all reveal what sustains him.',
      },
      redFlags: ['Option B — especially if academic overconfidence signals present in Section 1'],
      followUp: {
        condition: 'answer is "What I\'ve achieved"',
        question: 'If a season comes where the achievements slow down — grades harder, no team, no accolades — what holds your identity up during that period?',
      },
    },

    {
      id: 'ms2_08',
      subsection: '2A',
      subsectionName: 'Self-Image',
      type: 'open',
      text: 'What is one thing about yourself that you\'re working on — not externally, not your grades or career, but internally? Something about the kind of person you want to become that isn\'t there yet?',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names something real and internal — emotional expression, vulnerability, communication, processing grief. Shows interior growth awareness.',
        weak: '"I\'m working on studying more" or other external/achievement-based answer — inability to access internal growth edges.',
        complex: 'What he names here tells you where his self-awareness lives. Emotional suppression, communication with his mom, processing his dad — any of these would be significant.',
      },
      redFlags: ['"Nothing really — I\'m pretty solid" with no internal growth edge named'],
      followUp: {
        condition: 'answer is external or achievement-based',
        question: 'What about the person inside — your emotional life, your relationships, your ability to let people in? Any growth edge there?',
      },
    },

    {
      id: 'ms2_09',
      subsection: '2A',
      subsectionName: 'Self-Image',
      type: 'likert',
      text: 'The way people see me on the outside is pretty close to who I actually am on the inside.',
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
        strong: 'Agree: congruence between inner and outer self — psychological integration',
        weak: 'Strongly Disagree: significant gap between presentation and reality — asks what he\'s hiding',
        complex: 'For Melvin, the gap is likely emotional. He presents composed and in control. Inside — post-basketball grief, dad\'s death, watching his mom suffer — there may be a very different picture.',
      },
      redFlags: ['Strongly Disagree combined with emotional suppression signals from Section 1C'],
      followUp: {
        condition: 'answer in ["Strongly Disagree", "Disagree"]',
        question: 'What\'s the biggest gap between how people see you and who you actually are?',
      },
    },

    {
      id: 'ms2_10',
      subsection: '2A',
      subsectionName: 'Self-Image',
      type: 'open',
      text: 'What has shaped your sense of who you are more than anything else? Not a general answer — what specific person, experience, or moment made you who you are?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Specific, emotionally present answer. Names the experience and what it taught him or made him. Shows capacity to trace his own formation.',
        weak: 'Generic or deflective — "just my life experiences" with nothing specific. Or a completely safe, positive answer that avoids any painful formative experiences.',
        complex: 'Watch for: whether his father\'s death appears, whether the OK Program appears, whether his mom appears. All three are likely. What he names first and what he omits entirely are both data.',
      },
      redFlags: [
        'No mention of his father at all given known significance',
        'Purely positive formation story with no difficult experience named',
        '"I don\'t really know" with no attempt to reflect',
      ],
      followUp: {
        condition: 'father not mentioned',
        question: 'What about your dad — his life, what happened — has that shaped who you are or who you\'re determined to become?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 2B — PERSONAL STANDARDS
    // Target: Does he hold himself to the standards he names?
    // Probe: standards vs. behavior gap (school absences), double standards,
    //        consistency of standards across domains
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms2_11',
      subsection: '2B',
      subsectionName: 'Personal Standards',
      type: 'open',
      text: 'What are your standards for yourself — non-negotiable things you believe you must do or be? Not aspirations. Standards you actually hold yourself to.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names specific, behavioral standards (not vague ideals). Can describe what it looks like when he meets them and what happens inside when he doesn\'t.',
        weak: 'Vague ideals — "I have high standards," "I do things the right way" — with no specific content. Aspirational language without behavioral grounding.',
        complex: 'This is a setup for the contradiction check in ms2_13. His stated standards will be tested against his current behavioral reality (school absences, motivation drop, staying up late).',
      },
      redFlags: ['"I don\'t really think about standards like that"', 'Only academic/career standards named with no personal/character standards'],
      followUp: {
        condition: 'standards are vague or only academic',
        question: 'Give me an example of a standard you held yourself to in the last month. Something you did or didn\'t do because it didn\'t meet your own bar.',
      },
    },

    {
      id: 'ms2_12',
      subsection: '2B',
      subsectionName: 'Personal Standards',
      type: 'likert',
      text: 'When I hold myself to a high standard and fall short of it, I address it directly — I don\'t let it slide.',
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
        strong: 'Agree with behavioral evidence in the assessment to support it',
        weak: 'Agree/Strongly Agree but current behavior (school absences, coasting) shows he is in fact letting things slide without self-correction',
        complex: 'This is a primary contradiction detection question. Melvin believes in standards. But the post-basketball behavioral data suggests he is NOT self-correcting right now. If he says Agree — probe.',
      },
      redFlags: ['Agree/Strongly Agree combined with school absence and motivation data from Section 1F'],
      followUp: {
        condition: 'answer is "Agree" or "Strongly Agree"',
        question: 'The school days you\'ve missed this semester — by your own standards, how do you account for those?',
      },
    },

    {
      id: 'ms2_13',
      subsection: '2B',
      subsectionName: 'Personal Standards',
      type: 'scenario',
      text: 'It\'s February 2026. Your last basketball game was two weeks ago. You\'ve missed 2 school days this semester. You\'re staying up later than usual. You\'re not as locked in as you were in October. By your own standards — the ones you just named — how are you doing right now?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Honest assessment. Names the gap between his standards and current behavior. Doesn\'t rationalize. Shows accountability without excessive shame.',
        weak: 'Rationalization — "I\'ve earned a break," "It\'s just a transition period," "It\'s not that serious." Inability to apply his own standards to his own current behavior.',
        complex: 'This is the central contradiction test of Section 2B. He will likely have high standards on paper. This question puts those standards against his current reality and asks him to be honest.',
      },
      redFlags: [
        '"I\'ve earned a break" framing',
        '"It\'s not that bad" minimization',
        'Anger or defensiveness at the question',
        'No acknowledgment that any standard has slipped',
      ],
      followUp: {
        condition: 'any honest gap acknowledgment is made',
        question: 'What needs to change in the next 30 days for you to feel like you\'re back to your own standard?',
      },
    },

    {
      id: 'ms2_14',
      subsection: '2B',
      subsectionName: 'Personal Standards',
      type: 'forced_choice',
      text: 'When you see someone around you choosing a lower standard — cutting corners, taking shortcuts, not holding themselves accountable — what happens inside you?',
      options: [
        'I notice it but stay focused on myself — their choices are theirs',
        'I feel frustrated — I hold people around me to similar standards',
        'I sometimes drift toward their level without meaning to',
        'I step in and say something — I don\'t just watch people slide',
      ],
      weight: 1.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A or D: either self-focused discipline or active standard-holding — both healthy depending on context',
        weak: 'Option C: environmental drift — particularly dangerous for someone heading to a new environment (Morehouse) where peer norms are unknown',
        complex: 'Option B (frustration) is consistent with his known character but can become rigidity. Option C is the academic overconfidence blind spot — he may underestimate how much environment shapes behavior.',
      },
      redFlags: ['Option C — environmental drift risk'],
      followUp: {
        condition: 'answer is "I sometimes drift"',
        question: 'That drift — has it happened to you recently? Is any of the current drift in your school routine connected to what\'s around you?',
      },
    },

    {
      id: 'ms2_15',
      subsection: '2B',
      subsectionName: 'Personal Standards',
      type: 'open',
      text: 'Is there a standard you hold other people to that you\'re not currently holding yourself to? Be honest.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names the double standard honestly. Doesn\'t rationalize. Shows capacity for self-critical accountability.',
        weak: '"No, I hold myself to the same standards I hold others." Inability to identify a double standard that the behavioral data strongly suggests exists.',
        complex: 'This is the most direct integrity question in Section 2B. His no-nonsense character makes it harder to admit hypocrisy — which makes admitting it even more significant if he does.',
      },
      redFlags: ['Flat denial with no attempt at reflection'],
      followUp: {
        condition: 'answer is honest admission',
        question: 'What would it look like to start holding yourself to that same standard — starting this week?',
      },
    },

    {
      id: 'ms2_16',
      subsection: '2B',
      subsectionName: 'Personal Standards',
      type: 'likert',
      text: 'I finish what I start, even when the motivation is gone and it would be easier to walk away.',
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
        strong: 'Agree/Strongly Agree with behavioral evidence — follow-through as a genuine character trait',
        weak: 'Agree/Strongly Agree here + current behavioral drift = contradiction flag',
        complex: 'His track record (honor roll, basketball, OK Program) supports Agree. But the current semester contradicts it. The question tests whether he can hold the nuance.',
      },
      redFlags: ['Strongly Agree with no acknowledgment of current exceptions'],
      followUp: {
        condition: 'answer is "Strongly Agree"',
        question: 'Give me an example from the last 90 days where you finished something when you genuinely didn\'t want to.',
      },
    },

    {
      id: 'ms2_17',
      subsection: '2B',
      subsectionName: 'Personal Standards',
      type: 'open',
      text: 'What does "doing things the right way" mean to you — not a slogan, but specifically? What does it look like when you\'re living by that and when you\'re not?',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Specific behavioral description of both sides. Can articulate what it feels like to be on either side.',
        weak: 'Abstract or slogan-like answer — "it means being honest and responsible." Inability to give it behavioral definition.',
        complex: 'His belief in "doing things the right way" is a core identity marker. This question operationalizes it — and creates a standard against which his current behavior can be measured.',
      },
      redFlags: ['Generic answer with no specific behavioral content'],
      followUp: {
        condition: 'answer is specific and grounded',
        question: 'By that definition — are you doing things the right way right now, in this season of your life?',
      },
    },

    {
      id: 'ms2_18',
      subsection: '2B',
      subsectionName: 'Personal Standards',
      type: 'slider',
      text: 'On a scale of 1–10, how close are you right now to living up to your own standards — not other people\'s, yours?',
      min: 1,
      max: 10,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: '7–10 with honest acknowledgment of specific gaps: self-awareness + high standard + accountability',
        weak: '9–10 with no named gaps in Section 2B: overconfidence / inability to self-assess honestly',
        complex: '5–7: honest range given behavioral data. If he lands here with specific gap awareness, this is a positive signal — it means he can see himself clearly.',
      },
      redFlags: ['9–10 with no gap named anywhere in Section 2B'],
      followUp: {
        condition: 'score is 5–7',
        question: 'What would close the gap between where you are and a 9?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 2C — MASCULINITY & MANHOOD VISION
    // Target: What model of manhood is he building?
    // Probe: father as cautionary tale vs. model, OK Program influence,
    //        protection vs. vulnerability, what being a man means to him
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms2_19',
      subsection: '2C',
      subsectionName: 'Masculinity & Manhood Vision',
      type: 'open',
      text: 'What does it mean to you to be a man — not what society says, not what your dad was or wasn\'t, but what you believe it means? What is the standard you\'re building yourself toward?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Specific, earned definition rooted in his own values and experience. Includes protecting family, building legacy, being accountable. Not a generic answer.',
        weak: 'Vague or surface-level — "being responsible, taking care of your family." No personal ownership of the definition.',
        complex: 'This is his manhood framework. It will be shaped by three things: his father (what NOT to be), the OK Program (what TO be), and his own experience. What he names — and what he omits — tells you where his model comes from.',
      },
      redFlags: [
        'No mention of his own definition — just echoes cultural norms',
        'Hyper-stoic definition: "a man handles things without showing weakness"',
        'Father\'s failure completely absent from the framing',
      ],
      followUp: {
        condition: 'definition is stoic or closed-off',
        question: 'Is there room in your definition of manhood for asking for help, or showing someone you\'re struggling?',
      },
    },

    {
      id: 'ms2_20',
      subsection: '2C',
      subsectionName: 'Masculinity & Manhood Vision',
      type: 'forced_choice',
      text: 'When you think about the kind of man your dad was — his life, his choices, his story — how does that shape the man you\'re trying to be?',
      options: [
        'Mostly it shows me what not to do — I\'m building in the opposite direction',
        'It\'s complicated — there were things I respected about him and things I don\'t want',
        'I don\'t think about him much in terms of what I\'m building — I focus on other models',
        'I haven\'t really worked through what his life means for mine yet',
      ],
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option B: complexity — he can hold both his father\'s failures and whatever connection existed. This is the emotionally honest answer.',
        weak: 'Option C: complete emotional bypass of the father — particularly concerning given family history of addiction and gambling. If he\'s not processing this, it will surface.',
        complex: 'Option A is common and understandable. Option D is honest and shows openness to processing. The most concerning is Option C — not because of what it says but because unprocessed father-son inheritance (especially with addiction history) is a real risk factor.',
      },
      redFlags: [
        'Option C combined with low emotional processing scores in Section 1',
        'Any version of "he doesn\'t affect me"',
      ],
      followUp: {
        condition: 'answer is Option C or avoidant',
        question: 'Your dad had a gambling addiction that became a drug addiction. You\'re about to be on your own for the first time, managing your own money and your own time. Has that history crossed your mind at all?',
      },
    },

    {
      id: 'ms2_21',
      subsection: '2C',
      subsectionName: 'Masculinity & Manhood Vision',
      type: 'likert',
      text: 'A man should be able to handle his struggles privately — showing weakness to others is not something I\'m comfortable with.',
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
        strong: 'Disagree or Neutral: not locked into stoic masculinity — room for help-seeking and vulnerability',
        weak: 'Strongly Agree: rigid stoicism — combined with his emotional suppression patterns, this is a significant flag for silent collapse under pressure',
        complex: 'For Melvin, stoicism is baked into his identity. The question isn\'t whether he values privacy — it\'s whether his manhood definition has room for anyone to see him struggle.',
      },
      redFlags: ['Strongly Agree — particularly when combined with Section 1 emotional suppression data'],
      followUp: {
        condition: 'answer is "Agree" or "Strongly Agree"',
        question: 'The one time you cried — when you didn\'t make starter — did it change anything in your relationship with the people who saw it or who you told?',
      },
    },

    {
      id: 'ms2_22',
      subsection: '2C',
      subsectionName: 'Masculinity & Manhood Vision',
      type: 'open',
      text: 'The Oakland Kids Program has given you male role models since 6th grade. What did you learn about manhood from those men that you didn\'t get anywhere else?',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Specific lessons, specific men, specific moments. Shows the program\'s real impact on his formation. Can name what those men gave him that he didn\'t have otherwise.',
        weak: 'Vague or generic — "they showed me how to be responsible." Inability to connect the program to specific shifts in how he sees himself or manhood.',
        complex: 'This question honors the program while also surfacing how much of his manhood model comes from external mentors vs. internal synthesis. Both are valid — but the balance matters.',
      },
      redFlags: ['"They just helped me stay out of trouble" — minimization of what the program gave him'],
      followUp: {
        condition: 'specific lessons are named',
        question: 'Of everything those men modeled — which is the one thing you\'re still working on actually living out yourself?',
      },
    },

    {
      id: 'ms2_23',
      subsection: '2C',
      subsectionName: 'Masculinity & Manhood Vision',
      type: 'scenario',
      text: 'At Morehouse, a close friend of yours — another young man you respect — opens up to you. He\'s struggling. He\'s not doing well emotionally. He\'s not sure about his major. He\'s thinking about going home. How do you respond — and what does this bring up in you about your own experience?',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Shows up for his friend. Listens. Connects the friend\'s vulnerability to his own interior experience. Can hold space for someone else\'s struggle without needing to immediately fix or dismiss.',
        weak: 'Purely practical response — "I\'d tell him to talk to an advisor." No emotional presence. No reflection on what the moment brings up in himself.',
        complex: 'Melvin\'s relational model is loyalty + protection. This scenario tests whether his version of support includes emotional presence or only practical action.',
      },
      redFlags: [
        'No acknowledgment of what the moment brings up in him',
        'Purely problem-solving response with no emotional content',
        '"I\'d tell him to man up" — even joking',
      ],
      followUp: {
        condition: 'response is purely practical',
        question: 'If your friend was describing exactly what you\'ve been going through this semester — what would you want someone to say to you?',
      },
    },

    {
      id: 'ms2_24',
      subsection: '2C',
      subsectionName: 'Masculinity & Manhood Vision',
      type: 'open',
      text: 'You\'ve said you want to come back to Oakland after your graduate degree, be part of 100 Black Men, and give back to the OK Program. What does being that man require of you that you don\'t yet have?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Specific and honest. Names real gaps — emotional maturity, financial discipline, academic credentials, leadership skills. Shows the vision is grounded in an honest assessment of the distance.',
        weak: '"I just need to graduate and get the degree" — reduces legacy to a credential. No interior work named.',
        complex: 'His legacy vision is genuinely powerful. This question asks what it costs. The quality of his answer predicts whether the vision is a live ambition or a future identity claim that he hasn\'t started building.',
      },
      redFlags: ['"I\'m mostly ready, I just need time and the degree"'],
      followUp: {
        condition: 'answer names emotional or character gaps',
        question: 'That gap you just named — what\'s the first step to closing it, before you leave for Morehouse?',
      },
    },

    {
      id: 'ms2_25',
      subsection: '2C',
      subsectionName: 'Masculinity & Manhood Vision',
      type: 'forced_choice',
      text: 'When you picture yourself at 35 — a man who made it, who came back, who built something — what made the difference? What separated you from the version of yourself that didn\'t make it?',
      options: [
        'Discipline — I did the work even when I didn\'t feel like it',
        'My network — the right people opened the right doors',
        'My mind — I out-thought and out-prepared everyone around me',
        'My why — I never lost sight of what I was building it for',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Any answer stated with genuine ownership and evidence — the answer itself is less important than whether it\'s real',
        weak: '"My why" as a purely emotional answer with no behavioral grounding — motivation without execution plan',
        complex: 'All four options are legitimate. The question is whether he can connect his answer back to his current behavior. If he says "discipline" but is currently coasting — probe that.',
      },
      redFlags: null,
      followUp: {
        condition: 'any answer given',
        question: 'On a scale of 1–10, how present is that quality — [their answer] — in your life right now, in this moment?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 2D — CONFIDENCE IN FUTURE
    // Target: Is his future vision built on real preparation or assumption?
    // Probe: Morehouse readiness gap, financial management, social transition,
    //        whether confidence is grounded or abstract
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms2_26',
      subsection: '2D',
      subsectionName: 'Confidence in Future',
      type: 'slider',
      text: 'How confident are you that the specific plan you have — Morehouse, finance degree, career in finance or sports business, coming back to Oakland — will actually happen?',
      min: 1,
      max: 10,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: '7–9: confident with room for uncertainty — realistic optimism',
        weak: '10: no room for contingency — plans-as-destiny thinking is fragile',
        complex: '1–4: low confidence in his own plan before it starts — needs grounding and clarity on why',
      },
      redFlags: ['score 10 — probe plan fragility', 'score 1–4 — probe source of doubt'],
      followUp: {
        condition: 'score === 10',
        question: 'What\'s the one thing that could realistically derail that plan — and what\'s your contingency?',
      },
    },

    {
      id: 'ms2_27',
      subsection: '2D',
      subsectionName: 'Confidence in Future',
      type: 'open',
      text: 'Walk me through what you think your first year at Morehouse actually looks like — day to day. Not the highlight version. The real day-to-day.',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Specific and realistic account that includes difficulty — reading-heavy classes, new social environment, managing money independently, building a network from scratch, missing home.',
        weak: 'Highlight reel answer — "I\'ll be at the finance club, networking, crushing my classes." No difficulty named.',
        complex: 'The gap between his Morehouse imagination and the reality will determine how prepared he is to handle the transition. An answer with no named difficulty predicts a harder landing.',
      },
      redFlags: [
        'No difficulty or challenge named',
        'No mention of dyslexia as a factor in academic reality',
        '"I\'ll be fine" as the summary',
      ],
      followUp: {
        condition: 'no difficulty named',
        question: 'What part of your first week at Morehouse are you actually nervous about — even a little?',
      },
    },

    {
      id: 'ms2_28',
      subsection: '2D',
      subsectionName: 'Confidence in Future',
      type: 'forced_choice',
      text: 'Your confidence about the future is mostly based on:',
      options: [
        'Concrete preparation — I\'ve done real work to be ready',
        'My track record — I\'ve always found a way',
        'The people in my corner — I know I have support',
        'Belief — I just know I\'m going to make it',
      ],
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A: preparation-based confidence — most durable form',
        weak: 'Option D: belief-only confidence — motivationally useful but behaviorally insufficient for the specific challenges ahead',
        complex: 'Option B (track record) is strong for Melvin given his history, but the track record was built in a highly supported, familiar environment. Morehouse changes the environment entirely.',
      },
      redFlags: [
        'Option D combined with no concrete preparation named anywhere in Section 2D',
        'Option B without acknowledgment that the environment is changing',
      ],
      followUp: {
        condition: 'answer is "Belief" or "Track record"',
        question: 'What specific preparation have you done — or what will you do before August — that makes this confidence something more than belief?',
      },
    },

    {
      id: 'ms2_29',
      subsection: '2D',
      subsectionName: 'Confidence in Future',
      type: 'open',
      text: 'Your father had a gambling addiction that became a drug addiction. You\'re about to manage your own money and your own time independently for the first time. How are you thinking about your relationship to risk, gambling, and money?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names the family history directly and honestly. Has thought about it. Has some awareness of his own tendencies. Names a specific approach or guardrail.',
        weak: '"I\'m nothing like my dad" with no further thought. Dismissal of the genetic and environmental risk.',
        complex: 'This is one of the most important questions in the entire assessment for Melvin. The family history on both sides includes addiction. He is about to be unsupervised, with financial aid, in a new environment. Any dismissal of this risk is a flag.',
      },
      redFlags: [
        '"I\'m not like that" with no acknowledgment of family pattern',
        'No thought given to this at all',
        'Anger or defensiveness at the comparison',
      ],
      followUp: {
        condition: 'response shows awareness',
        question: 'What specific guardrail will you put around money and risk at Morehouse — not a value, a structure?',
      },
    },

    {
      id: 'ms2_30',
      subsection: '2D',
      subsectionName: 'Confidence in Future',
      type: 'likert',
      text: 'I have a clear picture of what I need to do — and when — between now and my first day at Morehouse.',
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
        strong: 'Agree with a concrete list when probed — operational readiness for the transition',
        weak: 'Agree but can\'t name specific steps — confidence without a plan',
        complex: 'Strongly Disagree is honest if he hasn\'t built the bridge between where he is and August. The question exposes whether his Morehouse confidence is specific or ambient.',
      },
      redFlags: ['Agree/Strongly Agree with no concrete preparation items when probed'],
      followUp: {
        condition: 'answer is "Agree" or "Strongly Agree"',
        question: 'Name three specific things you need to do or have in place before August — IEP disclosure, financial plan, academic prep — that aren\'t done yet.',
      },
    },

    {
      id: 'ms2_31',
      subsection: '2D',
      subsectionName: 'Confidence in Future',
      type: 'scenario',
      text: 'It\'s October of your freshman year at Morehouse. You\'re struggling more than you expected. The reading workload is harder. Your first two grades were C\'s. You haven\'t told your mom yet. What do you do?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Tells his mom. Goes to the professor. Contacts disability services. Makes a plan. Doesn\'t let it compound in silence.',
        weak: '"I\'d figure it out myself." "I wouldn\'t want to worry Mom." Planning to handle it alone — exactly the pattern that preceded his brother\'s collapse.',
        complex: 'This is the single most predictive scenario in the assessment for Morehouse success. Whether he can name "tell someone" as his first response — and mean it — predicts whether he will or won\'t go silent under academic pressure.',
      },
      redFlags: [
        '"I wouldn\'t want to worry my mom"',
        '"I\'d handle it myself first"',
        'No mention of disability services or IEP accommodations as a resource',
      ],
      followUp: {
        condition: 'response doesn\'t include disclosure to Mom',
        question: 'Your brother didn\'t tell your mom when things were falling apart. We know how that went. What makes your story different?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 2E — INTERNAL MOTIVATION
    // Target: Is his drive genuinely internal or primarily external validation?
    // Probe: recognition-dependency, what drives him when no one is watching,
    //        whether the legacy vision generates daily action or future identity
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms2_32',
      subsection: '2E',
      subsectionName: 'Internal Motivation',
      type: 'open',
      text: 'When no one is watching — no grade, no team, no mom, no OK Program — what makes you get up and do what you need to do?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names an internal driver — legacy, his brother, his dad\'s story, the man he\'s building, Oakland. Something that lives inside him rather than coming from outside.',
        weak: '"I just do what I have to do" — task-completion without internal driver. Or: can\'t answer the question without referencing an external audience.',
        complex: 'Melvin is externally motivated by recognition and accolades. This is legitimate and powerful. But at Morehouse — in a new city, with no basketball team, no established reputation — what pulls him through? This is the internal motivation question.',
      },
      redFlags: [
        'Can only name external drivers (grades, impressing others, mom)',
        'Cannot answer without referencing external validation',
        '"I just do what I have to" with no internal driver named',
      ],
      followUp: {
        condition: 'no clear internal driver named',
        question: 'At Morehouse you\'ll be starting over — no reputation, no team, no established track record. In those early months, before you\'ve built anything, what keeps you going?',
      },
    },

    {
      id: 'ms2_33',
      subsection: '2E',
      subsectionName: 'Internal Motivation',
      type: 'forced_choice',
      text: 'Your drive to succeed is mostly fueled by:',
      options: [
        'Proving to myself that I can — it\'s between me and my own standard',
        'What I\'ll be able to do for my mom and family when I make it',
        'Being recognized and respected by people I look up to',
        'Making my community proud and being the example they can point to',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A: fully internal driver — most durable for long-haul career success',
        weak: 'Option C alone without other drivers: recognition-dependent motivation — vulnerable when recognition is delayed or absent',
        complex: 'Options B and D are powerful and Melvin-specific. Family motivation is extremely strong. Legacy/community motivation is rare and potent. But both are still somewhat external. The question is whether Option A is present anywhere.',
      },
      redFlags: ['Option C as primary driver — especially absent internal standard in ms2_32'],
      followUp: {
        condition: 'answer is Option C',
        question: 'Early in a finance career, recognition is slow. You\'re a junior analyst doing grunt work. No one is handing you respect yet. What gets you through that period?',
      },
    },

    {
      id: 'ms2_34',
      subsection: '2E',
      subsectionName: 'Internal Motivation',
      type: 'likert',
      text: 'I would keep working toward my goals even if no one ever acknowledged or recognized the effort.',
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
        strong: 'Agree/Strongly Agree: self-sustaining motivation — not dependent on acknowledgment',
        weak: 'Disagree/Strongly Disagree: recognition is a necessary fuel — if recognition dries up, so does effort',
        complex: 'This is a contradiction detection question for ms2_33. He may want to say Agree but his known motivation profile (accolades, recognition) tells a more nuanced story.',
      },
      redFlags: ['Disagree or Strongly Disagree'],
      followUp: {
        condition: 'answer in ["Strongly Disagree", "Disagree"]',
        question: 'That\'s honest — and it\'s important to know. At Morehouse, recognition won\'t come automatically. What structure will you build to keep yourself going when it\'s quiet?',
      },
    },

    {
      id: 'ms2_35',
      subsection: '2E',
      subsectionName: 'Internal Motivation',
      type: 'scenario',
      text: 'It\'s the end of your sophomore year at Morehouse. You worked harder than you ever have. You applied for three internships — two didn\'t respond, one rejected you. You didn\'t get the recognition you were working for. No acknowledgment yet. What happens to your motivation?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names the disappointment honestly. Refocuses on the larger goal. Makes an adjustment to strategy, not an exit from the pursuit. Doesn\'t need the win to keep going.',
        weak: 'Motivation significantly drops. Questions whether the path is right. Needs external validation to recalibrate.',
        complex: 'This scenario is about the gap between his recognition-driven motivation and the reality of early finance careers — which are full of rejection, invisible work, and delayed reward.',
      },
      redFlags: [
        'Motivation described as significantly dropping',
        '"I\'d have to seriously rethink the path"',
        'No concrete plan to adjust strategy',
      ],
      followUp: {
        condition: 'motivation drop described',
        question: 'What would remind you — in that moment — why you started and whether you should keep going?',
      },
    },

    {
      id: 'ms2_36',
      subsection: '2E',
      subsectionName: 'Internal Motivation',
      type: 'open',
      text: 'Right now, in this season — post-basketball, second semester, Morehouse is five months away — what is actually motivating you day to day? Be honest, not aspirational.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Honest answer that may include "not much" or "less than usual." Self-aware about the current motivational gap and can identify why.',
        weak: '"I\'m motivated by my goals and my future." Abstract answer that doesn\'t match behavioral data (absences, motivation drop, staying up late).',
        complex: 'This is the real-time motivation question. If his answer is high-energy and goal-focused but his behavior says otherwise — that\'s the central contradiction of Section 2E.',
      },
      redFlags: [
        'High-energy aspirational answer that contradicts Section 1F behavioral data',
        '"My future motivates me every day" when school absences are occurring',
      ],
      followUp: {
        condition: 'answer is honest about low motivation',
        question: 'Given that, what\'s the bridge between now and August? What will get you to Morehouse fully charged rather than running on empty?',
      },
    },

    {
      id: 'ms2_37',
      subsection: '2E',
      subsectionName: 'Internal Motivation',
      type: 'slider',
      text: 'How motivated are you RIGHT NOW — not about your future, but about today — to do what this season requires?',
      min: 1,
      max: 10,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: '7–10: sustained present-tense motivation despite transition — strong indicator',
        weak: '1–4: significant motivational deficit in the present moment — particularly concerning given Morehouse is five months away',
        complex: '5–6: honest range given behavioral data. Cross-check against Section 1F avoidance answers.',
      },
      redFlags: ['score 1–4'],
      followUp: {
        condition: 'score <= 5',
        question: 'What is one thing that if it changed tomorrow would immediately raise that number?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 2F — BELIEF IN OWN POTENTIAL
    // Target: Does he believe he can reach the ceiling he claims?
    // Probe: gap between stated ceiling and daily behavior,
    //        whether potential is felt vs. performed, addiction risk awareness
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms2_38',
      subsection: '2F',
      subsectionName: 'Belief in Own Potential',
      type: 'slider',
      text: 'On a scale of 1–10, how much do you genuinely believe — not hope, believe — that you will reach the level you\'re aiming for?',
      min: 1,
      max: 10,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: '8–10 with behavioral grounding: belief sustained by daily action and preparation',
        weak: '10 combined with low present-day effort: belief as a substitute for action',
        complex: '5–7: honest uncertainty that should be probed — either healthy humility or early doubt that needs addressing before Morehouse',
      },
      redFlags: ['10 combined with low motivation scores in 2E and Section 1F'],
      followUp: {
        condition: 'score === 10',
        question: 'What are you doing daily — right now, this week — that makes that belief something more than a feeling?',
      },
    },

    {
      id: 'ms2_39',
      subsection: '2F',
      subsectionName: 'Belief in Own Potential',
      type: 'open',
      text: 'What is the highest version of yourself you can genuinely imagine — not the dream, but the version you actually believe is possible if you do everything right?',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Specific and owned. Names a version of himself with detail. Shows he can see it — not just say it.',
        weak: 'Generic — "successful finance professional," "someone who makes his community proud." No specific vision of the actual person.',
        complex: 'His stated vision (100 Black Men, Morehouse grad, returning to Oakland, finance career) is real and specific. This question asks if he can see himself IN that vision — inhabiting it — or if it\'s a concept he holds at arm\'s length.',
      },
      redFlags: ['Completely generic answer with no personal specificity'],
      followUp: {
        condition: 'vision is named but abstract',
        question: 'Put yourself in that version. What does that Melvin do on a Tuesday morning — what does his life actually look like?',
      },
    },

    {
      id: 'ms2_40',
      subsection: '2F',
      subsectionName: 'Belief in Own Potential',
      type: 'forced_choice',
      text: 'When you honestly assess what it will take to reach your ceiling — everything you want to accomplish — the main thing that could stop you is:',
      options: [
        'My own discipline — whether I actually do the work consistently',
        'My academic preparation — whether I can handle the level of study required',
        'Something happening to my mom or family — losing the one anchor I have',
        'The environment — bad influence, wrong choices in a new city, falling into patterns I haven\'t faced before',
      ],
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Any answer given with genuine ownership and awareness — the content matters less than the honesty',
        weak: '"None of these — I\'m going to make it no matter what" — inability to name his own risk factors',
        complex: 'Option D is particularly significant — "patterns I haven\'t faced before" touches on addiction risk and behavioral environment in a new city. If he chooses this, it shows risk awareness. If he dismisses it, that\'s a flag.',
      },
      redFlags: ['No risk factor named — "nothing can really stop me"'],
      followUp: {
        condition: 'answer is Option D',
        question: 'What specifically are you thinking about when you say "patterns I haven\'t faced before"?',
      },
    },

    {
      id: 'ms2_41',
      subsection: '2F',
      subsectionName: 'Belief in Own Potential',
      type: 'likert',
      text: 'My dyslexia is something I\'ve made peace with — it doesn\'t limit my belief in what I can achieve.',
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
        strong: 'Agree/Strongly Agree: has integrated dyslexia into his identity without shame — uses it rather than hiding it',
        weak: 'Strongly Disagree: dyslexia-based identity limitation — a real ceiling on potential if not addressed',
        complex: 'Neutral with no elaboration: hasn\'t made peace AND hasn\'t fully confronted it — this is the most common position and the most dangerous for Morehouse transition.',
      },
      redFlags: ['Strongly Disagree — shame-based identity limitation', 'Neutral combined with no accommodation plan in ms2_30'],
      followUp: {
        condition: 'answer in ["Neutral", "Disagree", "Strongly Disagree"]',
        question: 'Your 4.2 GPA with dyslexia is extraordinary. Most people would have quit. What does that tell you about what you\'re actually capable of?',
      },
    },

    {
      id: 'ms2_42',
      subsection: '2F',
      subsectionName: 'Belief in Own Potential',
      type: 'open',
      text: 'Is there a version of your future that you\'re afraid of — not that it won\'t work out, but a specific failure or outcome that genuinely scares you?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names a real fear. Specific, owned, emotionally present. Shows he has thought about what\'s actually at stake.',
        weak: '"Not really — I don\'t think about failure like that." Inability to name a genuine fear is either denial or performance of invulnerability.',
        complex: 'The specific fear matters: if he names becoming his father, or ending up back in Oakland without having made it, or his mom struggling while he\'s away — those are important signals about what drives him and what he\'s managing.',
      },
      redFlags: ['"I don\'t really have fears like that"'],
      followUp: {
        condition: 'fear of becoming his father is named or hinted at',
        question: 'That fear — that\'s also one of your most powerful motivators. How do you keep it from becoming something that paralyzes you rather than drives you?',
      },
    },

    {
      id: 'ms2_43',
      subsection: '2F',
      subsectionName: 'Belief in Own Potential',
      type: 'scenario',
      text: 'Ten years from now, you\'re at a 100 Black Men event in Oakland. A young man from East Oakland — same neighborhood, same background — walks up to you. He asks you what made the difference. What do you tell him?',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Specific, authentic answer. Not a motivational speech — a real answer rooted in what he actually knows and has experienced. Shows he\'s already thought about what the difference will be.',
        weak: 'Generic motivational language — "stay focused," "believe in yourself," "work hard." No personal ownership of the lesson.',
        complex: 'The content of the answer reveals his actual theory of change for himself — what he believes will be the deciding factor. This is some of the most revealing data in the assessment.',
      },
      redFlags: ['Generic answer with no personal specificity'],
      followUp: {
        condition: 'answer contains a specific insight',
        question: 'The thing you just told that young man — are you living that right now?',
      },
    },

    {
      id: 'ms2_44',
      subsection: '2F',
      subsectionName: 'Belief in Own Potential',
      type: 'open',
      text: 'What do you owe yourself — not your mom, not Oakland, not the OK Program — just yourself? What do you owe the version of Melvin who has been showing up and doing the work since 6th grade?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Can name something he owes himself that is separate from obligation to others. Shows self-investment is as real as obligation. Can hold his own worth independent of who he serves.',
        weak: 'Can only frame it in terms of others — "I owe it to my mom," "I owe it to my community." No self-directed answer possible.',
        complex: 'Melvin is exceptionally outward-facing in his motivation. This question asks if he can locate himself as a destination — not just a vehicle for other people\'s hopes.',
      },
      redFlags: ['Cannot answer without immediately redirecting to others'],
      followUp: {
        condition: 'answer is purely other-directed',
        question: 'What about just for you — not for anyone you\'ll give back to, not for your mom, but for the 17-year-old Melvin sitting here right now. What does he deserve?',
      },
    },

  ],
};

// ─── SCORING CONFIGURATION ───────────────────────────────────────────────────

export const MELVIN_SECTION_2_SCORING = {
  subsections: {
    '2A': { name: 'Self-Image', maxWeight: 15.5, redFlagThreshold: 2 },
    '2B': { name: 'Personal Standards', maxWeight: 12.0, redFlagThreshold: 3 },
    '2C': { name: 'Masculinity & Manhood Vision', maxWeight: 11.0, redFlagThreshold: 2 },
    '2D': { name: 'Confidence in Future', maxWeight: 12.0, redFlagThreshold: 3 },
    '2E': { name: 'Internal Motivation', maxWeight: 12.0, redFlagThreshold: 2 },
    '2F': { name: 'Belief in Own Potential', maxWeight: 12.0, redFlagThreshold: 2 },
  },
  globalRedFlags: [
    'Achievement-based identity confirmed — no character-layer accessible beneath the record (2A)',
    'Standards vs. behavior contradiction confirmed — states high standards, current behavior contradicts (2B)',
    'Stoic manhood definition with no room for help-seeking or vulnerability (2C)',
    'Father\'s addiction/gambling pattern not acknowledged before first independent money management (2D + 2C)',
    'Recognition-dependent motivation as primary driver — no internal driver named (2E)',
    'Belief in potential at 9–10 combined with low present-day motivation — belief substituting for action (2F)',
    'Future Morehouse struggle scenario: plans to handle silently without disclosure (2D)',
    'Cannot name what he owes himself — fully other-directed self-concept (2F)',
  ],
  contradictionChecks: [
    {
      id: 'contradiction_2_1',
      description: 'Standards vs. current behavior',
      questions: ['ms2_11', 'ms2_12', 'ms2_13', 'ms2_18'],
      flag: 'Names high personal standards but rates current standard-living significantly below standard and rationalizes school absences',
    },
    {
      id: 'contradiction_2_2',
      description: 'Internal motivation vs. recognition dependency',
      questions: ['ms2_32', 'ms2_33', 'ms2_34', 'ms2_36'],
      flag: 'Claims internal motivation but cannot name driver without external audience; motivation drops when recognition is delayed',
    },
    {
      id: 'contradiction_2_3',
      description: 'Future confidence vs. present preparation',
      questions: ['ms2_26', 'ms2_28', 'ms2_30', 'ms2_38'],
      flag: 'High confidence in future plan without concrete preparation steps — confidence as assumption rather than readiness',
    },
    {
      id: 'contradiction_2_4',
      description: 'Manhood definition vs. help-seeking',
      questions: ['ms2_19', 'ms2_21', 'ms2_31'],
      flag: 'Defines manhood as handling things independently/privately but the Morehouse struggle scenario requires disclosure to succeed',
    },
    {
      id: 'contradiction_2_5',
      description: 'Achievement identity vs. setback resilience',
      questions: ['ms2_01', 'ms2_07', 'ms2_40', 'ms2_42'],
      flag: 'Identity built primarily on achievement record — first significant academic setback at Morehouse may trigger identity collapse rather than strategy adjustment',
    },
  ],
};
