// ============================================================
// MELVIN — SECTION 10: Career Alignment
// Subsections: 10A Finance Interest | 10B Sports Business Interest |
//              10C Communication Strength | 10D Leadership Style |
//              10E Work Environment Fit | 10F Public vs Behind-the-Scenes |
//              10G Career Curiosity | 10H Income & Lifestyle Motivation
// Total Questions: 40
// Dual-path: Finance/Business + Sports Industry (business side)
// ============================================================

export const MELVIN_SECTION_10 = [

  // ─────────────────────────────────────────────
  // 10A — Finance Interest
  // ─────────────────────────────────────────────
  {
    id: 'ms10_01',
    subsection: '10A',
    subsectionName: 'Finance Interest',
    type: 'likert',
    text: 'How genuinely curious are you about how money works — markets, investing, wealth building, financial systems — beyond just wanting to make a lot of it?',
    options: [
      'Not very curious — I want the money but the mechanics don\'t interest me',
      'Slightly curious — I find it interesting occasionally but don\'t seek it out',
      'Moderately curious — I\'d learn more if it was in front of me',
      'Very curious — I actively seek out information about markets and finance',
      'Deeply curious — I study it on my own because I genuinely want to understand it',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Intrinsic curiosity about finance mechanics — will sustain through difficult coursework and early-career grind',
      weak: 'Money-motivated without intellectual curiosity — high dropout risk when finance work is tedious, technical, or slow-building',
      complex: 'Wanting money is not a red flag; not caring about how it works is — especially for an investment banking or analyst track',
    },
    redFlags: [
      'Finance interest is purely income-driven with no intellectual curiosity about the field',
      'Has never voluntarily read, watched, or explored finance content outside of school',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'Outside of school — what\'s the last thing you watched, read, or looked up that had anything to do with money, markets, or investing?',
    },
  },
  {
    id: 'ms10_02',
    subsection: '10A',
    subsectionName: 'Finance Interest',
    type: 'scenario',
    text: 'You\'re a second-year analyst at an investment bank. It\'s 11pm, you\'re still in the office, building a financial model for a deal closing in two days. Nobody is celebrating you right now. What keeps you going?',
    options: [
      'Honestly, this doesn\'t sound like something I\'d push through well',
      'The money — I know what this pays and that\'s enough',
      'Knowing the deal closes and my name is on it — the outcome matters to me',
      'The craft — building the model right is its own motivation',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Outcome ownership or craft motivation — intrinsic drivers that sustain through grind without external recognition',
      weak: 'Honest acknowledgment that this doesn\'t fit — valuable self-knowledge; money-only motivation is fragile at 11pm in year two',
      complex: 'Melvin is motivated by recognition and accolades; check whether outcome ownership carries him when recognition is delayed',
    },
    redFlags: [
      'Cannot identify any intrinsic motivation to sustain through finance\'s demanding early-career phase',
      'Money-only motivation without acknowledgment of what finance work actually requires day-to-day',
    ],
    followUp: {
      condition: 'Selects "honestly this doesn\'t sound like me" or "the money"',
      question: 'Investment banking analysts work 80–100 hour weeks for 2–3 years before it pays off. What keeps someone going through that — and does that thing exist in you?',
    },
  },
  {
    id: 'ms10_03',
    subsection: '10A',
    subsectionName: 'Finance Interest',
    type: 'likert',
    text: 'How comfortable are you with numbers, data, and analytical thinking — not just math class, but actually reasoning through numbers to make decisions?',
    options: [
      'Not comfortable — numbers and data analysis are not my strength',
      'Slightly comfortable — I can handle basic math but deep analysis is hard',
      'Moderately comfortable — I can work through it when I have to',
      'Comfortable — I think analytically and numbers don\'t intimidate me',
      'Very comfortable — data and analytical reasoning are genuine strengths',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Analytical comfort — foundational requirement for finance, investment, and corporate roles',
      weak: 'Numerical discomfort — will face a significant structural challenge in finance coursework and role requirements',
      complex: 'Dyslexia does not affect numerical reasoning; this is an independent assessment. High GPA suggests analytical ability exists.',
    },
    redFlags: [
      'Significant discomfort with numerical and analytical reasoning — foundational gap for finance track',
      'Conflates reading difficulty (dyslexia) with analytical inability — separate issues requiring separate strategies',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'What specifically about working with numbers feels hard — is it math itself, interpreting data, or something else?',
    },
  },
  {
    id: 'ms10_04',
    subsection: '10A',
    subsectionName: 'Finance Interest',
    type: 'forced_choice',
    text: 'Which finance-related activity sounds most interesting to you right now?',
    options: [
      'Analyzing a company\'s financial statements to decide if it\'s a good investment',
      'Managing a wealthy client\'s portfolio and building a long-term relationship',
      'Working on a major acquisition deal — structuring the transaction and closing it',
      'Building a model that forecasts a team\'s revenue and cap space over 5 years',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Any clear, specific answer — reveals which finance domain genuinely pulls him; use to guide career match output',
      weak: 'Cannot choose or chooses randomly — suggests finance interest is general and not yet differentiated into specific domains',
      complex: 'Option 4 (cap space model) is the hybrid signal — finance skills applied to sports; strong indicator for hybrid career path',
    },
    redFlags: [
      'Cannot choose any finance activity that sounds interesting — general "I like money" motivation without domain specificity',
    ],
    followUp: {
      condition: 'Any response',
      question: 'What specifically about that one sounds interesting — what part of the work is it that pulls you?',
    },
  },
  {
    id: 'ms10_05',
    subsection: '10A',
    subsectionName: 'Finance Interest',
    type: 'open',
    text: 'Tell me about a time you thought seriously about money — not spending it, but how it works, how it grows, or how someone built it. What were you thinking about and what pulled your attention?',
    options: null,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can describe a specific moment of genuine financial curiosity — intrinsic interest is present and real',
      weak: 'Cannot describe any moment — finance interest is stated but not experiential or intellectual',
      complex: 'The trigger matters — was it his dad\'s financial destruction, his mom\'s struggle, the OK program, or a news story? Each points to a different kind of finance motivation.',
    },
    redFlags: [
      'No genuine experiential moment of financial curiosity — interest is aspirational rather than intrinsic',
      'Cannot connect personal life experiences to finance interest — surface-level aspiration',
    ],
    followUp: {
      condition: 'Response is vague or money-adjacent without intellectual engagement',
      question: 'Have you ever looked at something — how a company works, how an athlete\'s deal was structured, how someone got rich — and wanted to understand the mechanics of it?',
    },
  },

  // ─────────────────────────────────────────────
  // 10B — Sports Business Interest
  // ─────────────────────────────────────────────
  {
    id: 'ms10_06',
    subsection: '10B',
    subsectionName: 'Sports Business Interest',
    type: 'likert',
    text: 'How much do you think about the business side of sports — contracts, deals, player movement, team revenue, agent relationships — versus just watching and playing?',
    options: [
      'I don\'t think about it much — sports is just something I love, not a business interest',
      'Slightly — I notice big deals or trades but don\'t think deeply about the business',
      'Moderately — I think about it sometimes, especially around big deals or negotiations',
      'Often — I follow sports business news and think about the strategy behind moves',
      'Very often — sports business is one of the things I think about most naturally',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Natural sports business curiosity — thinks in terms of value, strategy, and structure rather than just fandom',
      weak: 'Fan interest only — will not sustain in sports business roles that require seeing the industry without the emotion of being a player',
      complex: 'His basketball career just ended — this is the critical window where sports-as-business can replace sports-as-identity',
    },
    redFlags: [
      'Sports interest is entirely player/fan-oriented with no business curiosity',
      'Cannot separate loving sports from analyzing sports as a business — will find the business side deflating',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'When a player signs a massive contract — do you think about the deal itself, or just the money? What goes through your mind?',
    },
  },
  {
    id: 'ms10_07',
    subsection: '10B',
    subsectionName: 'Sports Business Interest',
    type: 'scenario',
    text: 'A college athlete in your city gets offered a major NIL deal. You find out the terms before the agent does and realize the deal undervalues the athlete significantly. What do you do with that knowledge?',
    options: [
      'Nothing — not my place and I\'m not involved',
      'Tell the athlete as a heads up — that\'s just being a good person',
      'Think through how I\'d structure a better deal and what leverage the athlete has',
      'Research what similar athletes have gotten and start building a case for renegotiation',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Thinks in deal structure and leverage — natural sports business instinct; the mind goes to solving the problem, not just observing it',
      weak: 'Passive or social response only — doesn\'t engage with the business problem beneath the situation',
      complex: 'Option 2 is human but not business-minded; options 3 and 4 show natural sports agent / business operator instinct',
    },
    redFlags: [
      'Completely disengages from the business opportunity — no instinct to think in deal terms',
      'Has no awareness of what NIL deals involve or how athlete valuation works',
    ],
    followUp: {
      condition: 'Selects option 1 or 2',
      question: 'Do you know how NIL deals are valued — what makes an athlete worth $500K versus $50K to a brand? Have you ever looked into it?',
    },
  },
  {
    id: 'ms10_08',
    subsection: '10B',
    subsectionName: 'Sports Business Interest',
    type: 'forced_choice',
    text: 'Which sports business role sounds most like what you\'d actually want to do?',
    options: [
      'Sports agent — negotiate contracts, represent athletes, build relationships',
      'Front office analyst — data, strategy, team building decisions',
      'NIL and brand management — connect athletes with deals and build their brands',
      'Athlete wealth advisor — manage a pro athlete\'s money and financial future',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Clear, specific choice with a reason — domain preference is emerging, which sharpens career match output',
      weak: 'No clear preference or selects based on income rather than work type — general "sports business" interest without role clarity',
      complex: 'Option 4 (athlete wealth advisor) is the strongest hybrid signal — directly bridges finance and sports paths',
    },
    redFlags: [
      'Cannot identify any sports business role that actually appeals to him — interest is general rather than role-specific',
    ],
    followUp: {
      condition: 'Any response',
      question: 'What about the day-to-day of that role appeals to you — not the title, the actual work?',
    },
  },
  {
    id: 'ms10_09',
    subsection: '10B',
    subsectionName: 'Sports Business Interest',
    type: 'likert',
    text: 'How well do you understand the actual business structure of a professional sports organization — revenue streams, cap management, operations, partnerships?',
    options: [
      'Not at all — I know the sport, not the business',
      'Very little — I have surface knowledge but nothing deep',
      'Some — I understand the basics but have real gaps',
      'Fairly well — I have solid working knowledge of how teams operate as businesses',
      'Very well — I understand the business infrastructure behind professional sports',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Foundational business knowledge of sports organizations — shows the interest goes beyond fandom',
      weak: 'Knows the sport but not the business — high risk of discovering sports business is not what he imagined once inside it',
      complex: 'Partial knowledge is workable; zero business knowledge paired with high sports business interest is a surface-level aspiration flag',
    },
    redFlags: [
      'Zero working knowledge of how professional sports organizations operate as businesses',
      'Interest in sports business cannot be distinguished from interest in sports — no business layer present',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'Name one way a professional sports team makes money — besides ticket sales.',
    },
  },
  {
    id: 'ms10_10',
    subsection: '10B',
    subsectionName: 'Sports Business Interest',
    type: 'open',
    text: 'Your basketball career is over. You still know the game better than most people in any boardroom will. How does that knowledge become a professional asset — specifically, not generally?',
    options: null,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can translate sports experience into specific professional value — athlete perspective in scouting, player relations, contract negotiation, or NIL — sees the asset clearly',
      weak: 'Cannot articulate how basketball experience translates to professional value — sees it as something left behind rather than something to leverage',
      complex: 'This is a career identity pivot question — his ability to answer it reveals whether he\'s already processing the transition constructively',
    },
    redFlags: [
      'Cannot identify any professional value from his basketball experience — complete identity severance',
      'Sees basketball as purely a past identity with no forward application — significant transition risk',
    ],
    followUp: {
      condition: 'Response is vague or presents basketball as entirely behind him',
      question: 'A sports agent sitting across from a player — who has more credibility: someone who played or someone who only studied? Where does your basketball background fit into that equation?',
    },
  },

  // ─────────────────────────────────────────────
  // 10C — Communication Strength
  // ─────────────────────────────────────────────
  {
    id: 'ms10_11',
    subsection: '10C',
    subsectionName: 'Communication Strength',
    type: 'likert',
    text: 'How effective are you at persuading someone — changing their mind or getting them to act — through conversation alone?',
    options: [
      'Not effective — persuasion is not a strength of mine',
      'Slightly effective — I can do it sometimes in the right conditions',
      'Moderately effective — I\'m decent at it but inconsistent',
      'Very effective — I can usually bring people around to my view',
      'Highly effective — persuasion through conversation is one of my strongest tools',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Strong verbal persuasion — critical for both finance (client acquisition, deal closing) and sports business (negotiation, agent work, NIL deals)',
      weak: 'Weak persuasion — will struggle in both paths; relationship-based finance and agent work require this skill above almost everything else',
      complex: 'Melvin\'s directness and confidence are natural assets here — cross-reference with communication section data',
    },
    redFlags: [
      'Persuasion is not a strength and no awareness of how to develop it',
      'Avoids communication contexts where persuasion is required',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'Both finance and sports business require you to move people — clients, partners, athletes. If persuasion isn\'t your strength yet, what\'s the plan?',
    },
  },
  {
    id: 'ms10_12',
    subsection: '10C',
    subsectionName: 'Communication Strength',
    type: 'scenario',
    text: 'You\'re pitching to a room of 5 executives — either a financial product or a sports partnership deal. You have 10 minutes and no slides. Just you, the room, and what you know. How do you feel about that, honestly?',
    options: [
      'Honestly nervous — I\'d rather have more structure and support',
      'Uncomfortable but I\'d push through it',
      'Comfortable — I can hold a room when I know my material',
      'In my element — that kind of pressure brings out my best',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Comfortable or thrives — can command a room under pressure; this is the definition of both client-facing finance and sports deal work',
      weak: 'Nervous or avoidant — high-pressure verbal communication is required in both career paths; consistent avoidance is a structural gap',
      complex: 'Some nerves are normal and manageable; the flag is if he would avoid this situation entirely or significantly underperform',
    },
    redFlags: [
      'Would significantly underperform or avoid high-stakes verbal presentations entirely',
      'No sense of what he would say or how to hold the room without structured support',
    ],
    followUp: {
      condition: 'Selects nervous or uncomfortable',
      question: 'What specifically makes the verbal pitch format hard — is it the lack of structure, the pressure, not knowing what to say, or something else?',
    },
  },
  {
    id: 'ms10_13',
    subsection: '10C',
    subsectionName: 'Communication Strength',
    type: 'forced_choice',
    text: 'Which communication situation are you strongest in?',
    options: [
      'One-on-one conversations — I\'m at my best in direct, personal communication',
      'Small group settings — I lead and communicate well in tight groups',
      'Large room presentations — I come alive in front of an audience',
      'Written communication — I\'m most effective when I can craft my message carefully',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Any clear answer — reveals where his communication strength sits and which career environments will amplify it',
      weak: 'Written only — given dyslexia, this is a complex signal; written strength is possible but should be explored for authenticity',
      complex: 'One-on-one strength maps to wealth management and agent work. Large room maps to client-facing finance and leadership. Small group maps to front office operations.',
    },
    redFlags: [
      'Claims written communication as primary strength without clarification given dyslexia — may be aspirational rather than actual',
      'Cannot identify any communication context where he is strong',
    ],
    followUp: {
      condition: 'Any response',
      question: 'Give me an example — a real situation where that strength showed up and made a difference.',
    },
  },
  {
    id: 'ms10_14',
    subsection: '10C',
    subsectionName: 'Communication Strength',
    type: 'likert',
    text: 'How strong are you at building rapport quickly — making someone feel comfortable, trusted, and connected within a short first interaction?',
    options: [
      'Not strong — I don\'t warm up to new people quickly and they don\'t warm up to me',
      'Slightly strong — it takes time and conditions have to be right',
      'Moderately strong — I can build rapport but it\'s not my strongest tool',
      'Strong — I have a natural ease with new people in most contexts',
      'Very strong — building instant rapport is one of my clearest natural gifts',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Rapid rapport building — Melvin\'s profile (confidence, directness, knowing his identity) suggests this is natural; essential for wealth management and agent work',
      weak: 'Slow to warm up — will limit network building, client acquisition, and athlete relationship management',
      complex: 'Cross-reference with Section 7 communication data and Section 8 crowd awareness — his confidence should support this',
    },
    redFlags: [
      'Cannot build rapport quickly in professional or networking contexts',
      'Warmth is absent from professional interactions — directness without connection limits relationship-based career paths',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'Both wealth management and sports agency live and die on relationships built fast. How are you planning to develop that skill?',
    },
  },

  // ─────────────────────────────────────────────
  // 10D — Leadership Style
  // ─────────────────────────────────────────────
  {
    id: 'ms10_15',
    subsection: '10D',
    subsectionName: 'Leadership Style',
    type: 'forced_choice',
    text: 'How do you naturally lead when you\'re in a group with something at stake?',
    options: [
      'I lead by example — I do the work and people follow',
      'I lead by directing — I tell people what needs to happen and make sure it does',
      'I lead by vision — I paint the picture of where we\'re going and inspire people toward it',
      'I lead by relationships — I know each person and motivate them individually',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Any clear, specific answer — maps directly to career environment fit',
      weak: 'No identifiable leadership style — suggests limited leadership experience or self-awareness',
      complex: 'Example/directive maps to analyst and operations roles. Vision maps to executive and client-facing roles. Relationship maps to agent and wealth advisor roles.',
    },
    redFlags: [
      'Cannot identify any leadership style — has not led in any meaningful context',
      'Leadership style is entirely situational with no consistent approach — difficult to match to career environments',
    ],
    followUp: {
      condition: 'Any response',
      question: 'Walk me through a real situation where that leadership style showed up — not a hypothetical, an actual moment.',
    },
  },
  {
    id: 'ms10_16',
    subsection: '10D',
    subsectionName: 'Leadership Style',
    type: 'likert',
    text: 'How comfortable are you making decisions that affect others — deciding for a team, a group, or a client — and owning the outcome?',
    options: [
      'Very uncomfortable — I prefer not to have decision authority over others',
      'Uncomfortable — I can do it but it weighs on me significantly',
      'Neutral — it depends on the stakes and the situation',
      'Comfortable — I can make the call and own what happens',
      'Very comfortable — decision authority is where I operate best',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Comfortable with decision authority — both finance leadership and sports agency require making calls that affect other people\'s outcomes',
      weak: 'Avoids decision authority — will be limited to execution roles rather than advisory or leadership roles in both paths',
      complex: 'Being careful with decisions is not the same as avoiding authority; flag avoidance specifically',
    },
    redFlags: [
      'Avoids any role with decision authority over others',
      'Cannot own outcomes when decisions affect others — responsibility avoidance in leadership context',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'If an athlete\'s career depends on advice you gave them — and the advice turns out to be wrong — how do you handle that?',
    },
  },
  {
    id: 'ms10_17',
    subsection: '10D',
    subsectionName: 'Leadership Style',
    type: 'scenario',
    text: 'You\'re leading a project at Morehouse — finance club pitch competition or a business case team. One teammate isn\'t pulling their weight. What do you do?',
    options: [
      'Do their part myself so the project doesn\'t suffer',
      'Talk to them directly and set expectations for the rest of the project',
      'Tell the group and let the team pressure resolve it',
      'Let it go — I don\'t want to create conflict within the team',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Addresses directly and sets expectations — mature leadership with accountability; functional in both finance and sports business environments',
      weak: 'Does it himself (martyr pattern) or avoids (conflict avoidance) — neither is sustainable in management or advisory roles',
      complex: 'Group pressure option can work but is indirect — evaluate if it\'s strategy or conflict avoidance',
    },
    redFlags: [
      'Absorbs others\' work rather than holding them accountable — cannot function as a manager or leader',
      'Avoids any confrontation even when team outcomes are at stake',
    ],
    followUp: {
      condition: 'Selects "do it myself" or "let it go"',
      question: 'At a bank or a sports agency, you\'re going to manage people who underperform. What happens to your project — and your reputation — if you absorb their work or say nothing?',
    },
  },
  {
    id: 'ms10_18',
    subsection: '10D',
    subsectionName: 'Leadership Style',
    type: 'open',
    text: 'Describe the best leader you\'ve personally played for or worked under — a coach, a mentor, a program director. What made them effective, and what did you take from how they operated?',
    options: null,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Names specific leadership qualities observed and articulates what he internalized — shows leadership learning is active, not passive',
      weak: 'Cannot name effective leader qualities or identifies only superficial traits — limited leadership development framework',
      complex: 'Given his years in Oakland Kids, he has been surrounded by intentional Black male leadership — his ability to articulate this reveals whether he\'s absorbed it',
    },
    redFlags: [
      'Cannot identify any effective leadership quality from his years with coaches and mentors',
      'Leadership model is entirely external — cannot connect observed leadership to his own developing style',
    ],
    followUp: {
      condition: 'Response is vague or identifies only surface qualities',
      question: 'The OK program is built around Black men leading Black boys. Which of the leaders in that program do you want to be like — and what specifically about the way they lead?',
    },
  },

  // ─────────────────────────────────────────────
  // 10E — Work Environment Fit
  // ─────────────────────────────────────────────
  {
    id: 'ms10_19',
    subsection: '10E',
    subsectionName: 'Work Environment Fit',
    type: 'forced_choice',
    text: 'Which work environment sounds most like where you\'d thrive?',
    options: [
      'Corporate office — structure, hierarchy, clear performance metrics, professional dress',
      'Fast-moving startup or agency — fluid roles, high energy, deal-making culture',
      'Professional sports organization — team environment, industry passion, dynamic operations',
      'Advisory / client-service firm — relationship-first, long-term client focus, tailored work',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Clear preference with reasoning — reveals environment alignment that should guide career match selection',
      weak: 'No preference or choosing based on prestige rather than fit — will struggle in environments mismatched to his style',
      complex: 'Corporate maps to IB and PE. Agency maps to sports agency and NIL. Sports org maps to front office. Advisory maps to wealth management and athlete finance.',
    },
    redFlags: [
      'Selects environment based entirely on status or income, not work culture or daily function',
      'Cannot identify any environment that feels like a fit',
    ],
    followUp: {
      condition: 'Any response',
      question: 'What specifically about that environment works for you — and what about the others doesn\'t?',
    },
  },
  {
    id: 'ms10_20',
    subsection: '10E',
    subsectionName: 'Work Environment Fit',
    type: 'likert',
    text: 'How well do you operate within rules, structures, and hierarchies — doing things the right way even when you disagree with the system?',
    options: [
      'Poorly — I push back against structure instinctively',
      'Below average — I comply but it creates real friction for me',
      'Average — I work within it but have my limits',
      'Well — I understand hierarchy and navigate it without significant friction',
      'Very well — I use structure to my advantage rather than fighting it',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Can navigate hierarchy strategically — critical for investment banking, corporate finance, and large sports organizations',
      weak: 'Pushes against structure instinctively — will create friction in any corporate or hierarchical environment',
      complex: 'Melvin\'s "no tolerance for disrespect" combined with directness could manifest as hierarchy friction; evaluate specifically',
    },
    redFlags: [
      'Instinctive resistance to structure and hierarchy — will limit advancement in both corporate finance and large sports organizations',
      'Cannot distinguish between unjust hierarchy (worth resisting) and functional structure (worth navigating)',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'In investment banking or at an NBA front office, you\'re going to have bosses above you for years before you\'re the one in charge. How does that sit with you?',
    },
  },
  {
    id: 'ms10_21',
    subsection: '10E',
    subsectionName: 'Work Environment Fit',
    type: 'likert',
    text: 'How much do you enjoy the grind of technical, detail-oriented work — analysis, research, modeling, documentation — that happens behind the scenes before any results are visible?',
    options: [
      'Not at all — I need to see impact and results quickly',
      'A little — I can do it but it drains me',
      'Moderately — I can sustain it when I see the purpose',
      'Quite a bit — I find satisfaction in doing detailed work well',
      'A lot — I thrive in deep, precise, behind-the-scenes work',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Genuine satisfaction in detailed technical work — critical for analyst roles in both finance and sports analytics',
      weak: 'Needs immediate visible impact — will struggle in any analyst or associate role where the work is invisible for years',
      complex: 'This is one of the highest-signal questions for path fit — results-now people belong in client-facing roles; detail-grinders belong in analyst and modeling roles',
    },
    redFlags: [
      'Cannot sustain detail-oriented work without immediate visible impact — rules out analyst tracks in both paths',
      'Needs external recognition for effort — will be invisible for the first 1–2 years in both IB and sports analytics',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'Investment banking analysts spend their first two years building models nobody sees publicly. Sports analysts do the same — research that becomes someone else\'s decision. Is that something you can work with?',
    },
  },
  {
    id: 'ms10_22',
    subsection: '10E',
    subsectionName: 'Work Environment Fit',
    type: 'scenario',
    text: 'You\'re six months into your first real job — finance or sports business. The work is harder than expected, the recognition is slower than expected, and your boss takes credit for a project you led. What do you do?',
    options: [
      'Start looking for a new job — this isn\'t the environment I was promised',
      'Say something directly to my boss about the credit issue',
      'Document my contributions and play the long game — this is how early careers work',
      'Talk to a mentor about whether I\'m in the right place',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Documents and plays long game, or consults mentor — mature career navigation with patience and strategy',
      weak: 'Leaves immediately — impatience that will replicate across environments; or says nothing and builds resentment silently',
      complex: 'Melvin is motivated by recognition — this scenario is a direct test of whether that need derails his early career; addressing credit issue directly is bold but must be done correctly',
    },
    redFlags: [
      'Leaves after six months of difficulty — pattern of early exit when environments are hard',
      'Cannot tolerate being unrecognized in early-career environments — will disqualify himself from most serious finance and sports business pipelines',
    ],
    followUp: {
      condition: 'Selects "start looking for a new job"',
      question: 'Every serious finance and sports business career has 2–3 years of invisible grind before you get recognized. If you leave the first time that happens — where does the cycle end?',
    },
  },

  // ─────────────────────────────────────────────
  // 10F — Public-Facing vs. Behind-the-Scenes
  // ─────────────────────────────────────────────
  {
    id: 'ms10_23',
    subsection: '10F',
    subsectionName: 'Public-Facing vs Behind-the-Scenes',
    type: 'forced_choice',
    text: 'Which role sounds more like you?',
    options: [
      'The person in the room making the deal — visible, relationship-driven, high-stakes conversation',
      'The person who built the analysis that made the deal possible — powerful but unseen',
      'The person managing the relationship after the deal — retention, trust, long-term presence',
      'The person who found the deal in the first place — research, scouting, early intelligence',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Clear role preference with reasoning — directly maps to career path and day-to-day work type',
      weak: 'No preference — hasn\'t thought about what the actual work looks like beyond the title or income',
      complex: 'Option 1 maps to client-facing finance and sports agent. Option 2 maps to analyst roles. Option 3 maps to wealth management and account management. Option 4 maps to scouting and sports intel.',
    },
    redFlags: [
      'Selects based on title or income rather than work type — surface career alignment',
      'Cannot choose because hasn\'t considered what the actual day-to-day work involves',
    ],
    followUp: {
      condition: 'Any response',
      question: 'If you had to do that role on a Monday morning with no fanfare and no big moment coming for months — does that still work for you?',
    },
  },
  {
    id: 'ms10_24',
    subsection: '10F',
    subsectionName: 'Public-Facing vs Behind-the-Scenes',
    type: 'likert',
    text: 'How much do you need to be visible, recognized, and in the room where it happens — versus being the person behind the scenes whose work makes the room possible?',
    options: [
      'I need to be visible — behind-the-scenes work doesn\'t satisfy me',
      'I prefer visibility but can work behind the scenes for a purpose',
      'I\'m genuinely comfortable in either role depending on the work',
      'I prefer behind-the-scenes — I don\'t need to be seen to feel effective',
      'I strongly prefer behind-the-scenes — visibility actually makes me less effective',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Clear preference that matches his stated career paths — either direction is valid; mismatch is the flag',
      weak: 'Strong visibility need paired with analyst or behind-the-scenes career aspirations — will not survive early career roles; or strong behind-the-scenes preference paired with agent or client-facing aspirations',
      complex: 'Melvin is motivated by recognition — strong behind-the-scenes preference would be an unexpected finding worth exploring',
    },
    redFlags: [
      'Requires high visibility but is pursuing analyst or operational roles where work is invisible for years',
      'Strong preference contradicts stated career paths — either the paths or the preference need to be re-evaluated',
    ],
    followUp: {
      condition: 'Scores 1 (needs visibility) paired with analyst or behind-the-scenes career interest',
      question: 'The work that leads to where you want to go is going to be invisible for the first few years. How do you manage that personally?',
    },
  },
  {
    id: 'ms10_25',
    subsection: '10F',
    subsectionName: 'Public-Facing vs Behind-the-Scenes',
    type: 'scenario',
    text: 'Two job offers: one is a financial analyst role — great firm, excellent training, 60% desk work, slow path to visibility. The other is a junior sports agent role — lower starting salary, immediate client contact, high-stakes communication daily. Which do you take and why?',
    options: [
      'The analyst role — the training and firm name build a foundation I can leverage',
      'The agent role — I\'d rather be in the room now even at lower pay',
      'It depends on the specific firms and the actual growth paths — I need more information',
      'I honestly don\'t know — both appeal to different parts of what I want',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Makes a clear, reasoned choice or asks for more information strategically — demonstrates career decision-making maturity',
      weak: 'Genuinely doesn\'t know — both pull equally, suggesting career identity has not yet differentiated enough to guide a real decision',
      complex: 'Neither choice is wrong; the reasoning is the data — what he prioritizes reveals where his natural career gravity sits',
    },
    redFlags: [
      'Cannot make the decision because both paths appeal equally with no prioritization framework',
      'Chooses based on salary or title rather than work type or growth alignment',
    ],
    followUp: {
      condition: 'Selects "honestly don\'t know"',
      question: 'If the salaries were identical — which would you take? Take money out of it completely.',
    },
  },

  // ─────────────────────────────────────────────
  // 10G — Career Curiosity
  // ─────────────────────────────────────────────
  {
    id: 'ms10_26',
    subsection: '10G',
    subsectionName: 'Career Curiosity',
    type: 'open',
    text: 'Outside of what you\'ve been told you should do — what career or role have you found yourself genuinely curious about that surprised you? Not the obvious answer, the honest one.',
    options: null,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Names something unexpected and specific — reveals underlying interests that may point to the strongest career fit',
      weak: 'Says "nothing" or defaults to the expected answer — either low self-reflection or self-censoring',
      complex: 'The surprise interest often reveals authentic career fit better than the stated interest — look for pattern, not just the role named',
    },
    redFlags: [
      'Cannot name any career interest that wasn\'t directly suggested by family or program — no independent career curiosity developed',
      'Suppresses unexpected interests because they don\'t fit the expected path — premature career identity closure',
    ],
    followUp: {
      condition: 'Gives unexpected or interesting answer',
      question: 'Where did that curiosity come from — was there a specific moment or person that sparked it?',
    },
  },
  {
    id: 'ms10_27',
    subsection: '10G',
    subsectionName: 'Career Curiosity',
    type: 'likert',
    text: 'How actively do you research careers — looking up specific roles, reading about the actual day-to-day, watching interviews with people in those positions?',
    options: [
      'Almost never — I have general ideas but haven\'t dug in',
      'Rarely — I\'ve done some surface research',
      'Sometimes — I look things up when they come up',
      'Often — I research careers I\'m interested in regularly',
      'Very actively — career research is something I do consistently and with real depth',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Active career researcher — knows what the work actually looks like; aligned expectations = better career decisions',
      weak: 'General ideas only — career interest is name-deep, not work-deep; risk of choosing a career based on the title rather than the actual job',
      complex: 'Cross-reference with specific knowledge shown in 10A–10B questions',
    },
    redFlags: [
      'Has done no substantive research into what careers he is pursuing actually look like day-to-day',
      'Career choice based entirely on name recognition or income without understanding the role',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'Name one specific thing you know about what a financial analyst or sports agent actually does on a typical Tuesday — not a big day, a regular one.',
    },
  },
  {
    id: 'ms10_28',
    subsection: '10G',
    subsectionName: 'Career Curiosity',
    type: 'forced_choice',
    text: 'You have 3 hours and no obligations. Which would you most naturally do?',
    options: [
      'Watch market news, read financial analysis, or look up career paths in finance',
      'Research sports deals, agent news, athlete contracts, or front office strategy',
      'Network — text someone I want to learn from or reach out to a contact',
      'None of these — I\'d use the time for something entirely unrelated',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Finance or sports business research chosen naturally — intrinsic pull toward the field',
      weak: 'Would use the time for something entirely unrelated — career interest does not manifest in voluntary attention',
      complex: 'Networking choice is strong for both paths; what matters is whether voluntary attention flows toward either career field at all',
    },
    redFlags: [
      'Free time never goes toward finance or sports business content voluntarily — stated career interest not backed by intrinsic attention',
      'Cannot identify any career-related content he would choose to consume voluntarily',
    ],
    followUp: {
      condition: 'Selects "none of these"',
      question: 'What do you do with free time that could connect to your career goals — even indirectly? Is there anything?',
    },
  },
  {
    id: 'ms10_29',
    subsection: '10G',
    subsectionName: 'Career Curiosity',
    type: 'open',
    text: 'Who is one person — living or dead, famous or not — who built the career you want? Not someone you just admire in general. Someone whose specific career path looks like what you\'re trying to build. What do you know about how they got there?',
    options: null,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Names a specific person with a specific career path and real knowledge of how they built it — career research is active and specific',
      weak: 'Cannot name anyone or names a famous person without knowing how they got there — aspirational without a model',
      complex: 'The level of knowledge about the person\'s path reveals how seriously he\'s researched the field; shallow answers indicate surface-level career exploration',
    },
    redFlags: [
      'Cannot name a single person whose career path they want to study or replicate',
      'Names someone famous but knows nothing about how they built the career — aspiration without model',
    ],
    followUp: {
      condition: 'Names someone but has limited knowledge of their path',
      question: 'What specifically about how they got there are you going to replicate — step by step, not just the destination?',
    },
  },

  // ─────────────────────────────────────────────
  // 10H — Income & Lifestyle Motivation
  // ─────────────────────────────────────────────
  {
    id: 'ms10_30',
    subsection: '10H',
    subsectionName: 'Income & Lifestyle Motivation',
    type: 'slider',
    text: 'On a scale of 1–10, how central is income to your career decision — how much does the money drive which path you pursue?',
    options: null,
    min: 1,
    max: 10,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: '5–7 — income matters but does not override fit or interest; healthy financial ambition paired with career alignment',
      weak: '9–10 — income is the primary driver; will choose paths based on pay rather than fit, leading to misalignment and eventual burnout',
      complex: '1–3 — may undervalue financial planning for lifestyle goals; cross-reference with lifestyle expectations',
    },
    redFlags: [
      'Income is the sole career driver with no consideration of fit, interest, or path sustainability',
      'Low income importance contradicted by high lifestyle expectations — financial planning gap',
    ],
    followUp: {
      condition: 'Scores 9 or 10',
      question: 'If both paths paid the same — finance and sports business — which would you choose and why?',
    },
  },
  {
    id: 'ms10_31',
    subsection: '10H',
    subsectionName: 'Income & Lifestyle Motivation',
    type: 'forced_choice',
    text: 'Which income motivation is most honest for you?',
    options: [
      'I want enough to take care of my mom and never worry about money',
      'I want to build real wealth — not just income, generational assets',
      'I want to live at a level that reflects the work I\'ve put in — premium lifestyle',
      'I want to earn enough to give back to Oakland and fund what matters to me',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Any honest, specific answer — reveals the motivational core that should guide career path recommendation',
      weak: 'Vague or combines all four without prioritization — no clear motivational hierarchy; harder to sustain through difficulty',
      complex: 'Option 1 maps to wealth management / financial planning. Option 2 maps to investment banking / PE. Option 3 maps to client-facing luxury finance or sports agency. Option 4 maps to community-oriented finance or nonprofit sports programs.',
    },
    redFlags: [
      'Cannot prioritize any income motivation — general wealth aspiration without personal connection to what money is for',
      'Income motivation disconnected from personal values or lived experience',
    ],
    followUp: {
      condition: 'Any response',
      question: 'That motivation — is it something you think about regularly, or is it more of a background idea you haven\'t fully connected to your daily decisions yet?',
    },
  },
  {
    id: 'ms10_32',
    subsection: '10H',
    subsectionName: 'Income & Lifestyle Motivation',
    type: 'scenario',
    text: 'You get two job offers at 24 after your MBA: one pays $120K at a prestigious bank with long hours and slow lifestyle. One pays $75K at a sports agency with shorter hours, exciting work, and faster growth toward a partner track. Which do you take?',
    options: [
      'The bank — $120K at 24 is the foundation everything else is built on',
      'The agency — the work I care about and the growth path matter more than the starting number',
      'I negotiate both — I want to understand what\'s behind each offer before I decide',
      'I need more information about the actual work and growth — salary alone doesn\'t decide it',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Negotiates or requests information — sophisticated decision-making that maximizes information before committing',
      weak: 'Chooses purely on salary — income-first decision at the cost of fit and long-term trajectory',
      complex: 'Either path chosen with clear reasoning is valid; the reasoning is the data — what does he prioritize when real trade-offs exist?',
    },
    redFlags: [
      'Chooses bank purely on salary without considering work type, growth path, or fit',
      'Cannot make the decision without external input — lacks decision framework for career trade-offs',
    ],
    followUp: {
      condition: 'Selects bank based purely on salary',
      question: 'The agency track might have you at $200K by 30 and a partner by 35. The bank might have you burned out and switching at 27. What does the 10-year version of each decision look like?',
    },
  },
  {
    id: 'ms10_33',
    subsection: '10H',
    subsectionName: 'Income & Lifestyle Motivation',
    type: 'likert',
    text: 'How much does giving back to Oakland — financially, relationally, as a model — factor into the career you\'re building?',
    options: [
      'It\'s not really a factor — I\'m focused on building my own life first',
      'It\'s in the background — something I think I\'ll do eventually',
      'It\'s a real part of my motivation — I want the career to enable the giving back',
      'It\'s a primary driver — I\'m building the career specifically so I can come back',
      'It\'s the deepest reason I do any of this — Oakland and the people there are my why',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Oakland giving back is a primary or deep driver — connects career ambition to purpose, which sustains through difficulty better than income alone',
      weak: 'Not a factor — career is entirely self-focused; not inherently wrong but loses the purpose anchor Melvin specifically needs',
      complex: 'Cross-reference with his stated identity — the OK program, 100 Black Men, coming back as proof it works — if that\'s genuine, this should score high',
    },
    redFlags: [
      'Giving back to Oakland is stated in identity section but not present in career motivation — identity and motivation are disconnected',
      'Cannot articulate any purpose beyond personal wealth accumulation',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'You\'ve talked about being the proof that the Oakland Kids program works — coming back, 100 Black Men, all of it. How does that connect to the career you\'re building right now?',
    },
  },
  {
    id: 'ms10_34',
    subsection: '10H',
    subsectionName: 'Income & Lifestyle Motivation',
    type: 'open',
    text: 'Describe the life you\'re actually building — not the dream version, the real one you\'re working toward. What does 35-year-old Melvin\'s life look like, specifically?',
    options: null,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Specific, multi-dimensional vision — career level, location, relationships, lifestyle, impact — grounded in the paths he\'s pursuing',
      weak: 'Vague or purely aspirational — "successful, happy, wealthy" without specificity; no connection between current actions and future state',
      complex: 'Cross-reference the vision against the paths he\'s pursuing and the discipline/behavior data from other sections — is this life accessible from where he is now?',
    },
    redFlags: [
      'Cannot describe a specific vision for his life at 35 — future identity not yet formed',
      'Vision is specific but entirely disconnected from either career path or current behavior patterns',
    ],
    followUp: {
      condition: 'Vision is vague or generic',
      question: 'Start with where you\'re living. What city, what kind of place? Then work outward from there.',
    },
  },

  // ─────────────────────────────────────────────
  // Dual-path anchor and hybrid detection questions
  // ─────────────────────────────────────────────
  {
    id: 'ms10_35',
    subsection: '10A',
    subsectionName: 'Finance Interest',
    type: 'slider',
    text: 'On a scale of 1–10, rate your genuine interest in finance and business as a field — independent of the money it can make you.',
    options: null,
    min: 1,
    max: 10,
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: '7+ — intrinsic finance interest; will sustain through the technical and unglamorous parts of the field',
      weak: '1–4 — low intrinsic finance interest; career choice is income-driven rather than interest-driven — high long-term misalignment risk',
      complex: '5–6 — moderate interest; workable but pair with strong skills and clear purpose to sustain',
    },
    redFlags: [
      'Rates 3 or below — finance interest is purely financial, not intellectual or vocational',
      'Cannot explain what interests him about finance beyond the paycheck',
    ],
    followUp: {
      condition: 'Scores 1–4',
      question: 'If finance paid the same as teaching — would you still choose it? What does that answer tell you?',
    },
  },
  {
    id: 'ms10_36',
    subsection: '10B',
    subsectionName: 'Sports Business Interest',
    type: 'slider',
    text: 'On a scale of 1–10, rate your genuine interest in the sports industry as a business — independent of your love of sports as a fan or player.',
    options: null,
    min: 1,
    max: 10,
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: '7+ — can separate sports passion from sports business interest; sustainable professional orientation',
      weak: '1–4 — sports business interest may be primarily fan or player identity rather than genuine business interest',
      complex: 'High sports passion + low business interest = strong signal to redirect toward pure finance track',
    },
    redFlags: [
      'High sports passion but low sports business interest — likely confusing the two',
      'Cannot articulate any business aspect of sports that interests him independent of the sport itself',
    ],
    followUp: {
      condition: 'Scores very differently on this vs. sports passion questions',
      question: 'If sports didn\'t exist and you had to pick a business sector — media, tech, real estate, something else — what would it be? That answer tells you a lot.',
    },
  },
  {
    id: 'ms10_37',
    subsection: '10F',
    subsectionName: 'Public-Facing vs Behind-the-Scenes',
    type: 'open',
    text: 'Which version of you do you think is more impressive to the right people — you in a room making a deal, or you behind the analysis that made the deal possible? Which one actually excites you more?',
    options: null,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can distinguish between impression and genuine preference — self-awareness that leads to authentic career alignment',
      weak: 'Conflates what impresses others with what he actually wants — will choose roles for external validation rather than internal fit',
      complex: 'Melvin\'s recognition motivation is a variable here — he may choose visible roles for the recognition rather than for the fit',
    },
    redFlags: [
      'Cannot separate what impresses others from what he genuinely prefers — recognition-driven career selection',
      'Selects the visible role primarily because it\'s what people will see and acknowledge',
    ],
    followUp: {
      condition: 'Selects visible role for recognition rather than fit',
      question: 'If nobody could see which role you were in — if the recognition was identical either way — which version of the work would you actually choose?',
    },
  },
  {
    id: 'ms10_38',
    subsection: '10G',
    subsectionName: 'Career Curiosity',
    type: 'forced_choice',
    text: 'Hybrid careers exist at the intersection of finance and sports — salary cap analyst, sports private equity, athlete wealth advisor, sports investment banker. On a gut level, does the hybrid path feel more like you than either path alone?',
    options: [
      'Yes — the hybrid is actually the clearest version of what I want',
      'No — I want to go deep on one path, not split between two',
      'Maybe — I haven\'t thought about the hybrid specifically enough to know',
      'I didn\'t know these hybrid roles existed — this changes how I\'m thinking about it',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Hybrid resonates or previous knowledge of hybrid roles — strong indicator for salary cap analyst, athlete wealth advisor, or sports investment banking output',
      weak: 'No knowledge of hybrid roles existed — suggests career research is insufficient for the level of specificity his career aspirations require',
      complex: 'Discovering hybrid roles in this question is not a negative — it opens a path that may be the clearest fit; evaluate his response to the new information',
    },
    redFlags: [
      'Completely unaware that hybrid finance + sports roles exist despite pursuing both interests',
      'Dismisses hybrid path without consideration — may be rigidly attached to one path\'s prestige rather than best fit',
    ],
    followUp: {
      condition: 'Selects "didn\'t know these existed"',
      question: 'Salary cap analyst at an NBA team uses the same financial modeling as investment banking — applied to player contracts and team revenue. Does knowing that change anything for you?',
    },
  },
  {
    id: 'ms10_39',
    subsection: '10H',
    subsectionName: 'Income & Lifestyle Motivation',
    type: 'likert',
    text: 'How clearly do you understand the income trajectory — year by year — of the careers you\'re considering? Not the top number — the full timeline from entry to peak.',
    options: [
      'Not clearly — I know the top number but not the path to get there',
      'Slightly — I have a general sense but it\'s not specific',
      'Somewhat — I understand the rough progression',
      'Clearly — I know the typical timeline, milestones, and inflection points',
      'Very clearly — I\'ve mapped out specific numbers and timelines for each path I\'m considering',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Knows the full income trajectory — realistic expectations prevent the dropout risk when early-career pay doesn\'t match expectations',
      weak: 'Knows only the top number — will be shocked by entry-level reality; high dropout risk when the grind doesn\'t match the dream',
      complex: 'This question directly reveals whether career aspiration is grounded in reality or fueled by top-of-career outcomes',
    },
    redFlags: [
      'Only knows the peak income of his target career, not the 5–10 year trajectory to get there',
      'No realistic understanding of what the first 3 years in finance or sports business actually pay',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'First-year investment banking analysts at major banks make $100–110K. First-year sports agency associates often make $35–55K. Did you know those numbers? Does that change anything?',
    },
  },
  {
    id: 'ms10_40',
    subsection: '10D',
    subsectionName: 'Leadership Style',
    type: 'slider',
    text: 'On a scale of 1–10, how much do you see yourself in a leadership or advisory role — guiding people, influencing decisions, being the person others come to — versus an execution or analytical role?',
    options: null,
    min: 1,
    max: 10,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: '7+ — leadership/advisory orientation; maps to wealth management, sports agency, and client-facing finance',
      weak: '1–4 — execution/analytical orientation; maps to analyst, operations, and data-driven roles in both paths',
      complex: '5–6 — generalist; may do well in associate roles that bridge both; evaluate for which specific environments activate him',
    },
    redFlags: [
      'High leadership orientation paired with no leadership experience or self-awareness — aspiration without foundation',
      'Low leadership orientation paired with stated interest in agent or advisory roles — fundamental mismatch',
    ],
    followUp: {
      condition: 'High score with limited leadership experience',
      question: 'Walk me through a real situation where you were the person people came to for a decision or direction — not because you were assigned to, because they chose you.',
    },
  },
];

// ============================================================
// SECTION 10 SCORING CONFIGURATION
// ============================================================

export const MELVIN_SECTION_10_SCORING = {
  subsections: {
    '10A': {
      name: 'Finance Interest',
      maxWeight: 11.0,
      redFlagThreshold: 2,
      pathSignal: 'finance',
    },
    '10B': {
      name: 'Sports Business Interest',
      maxWeight: 10.0,
      redFlagThreshold: 2,
      pathSignal: 'sports',
    },
    '10C': {
      name: 'Communication Strength',
      maxWeight: 8.0,
      redFlagThreshold: 2,
      pathSignal: 'both',
    },
    '10D': {
      name: 'Leadership Style',
      maxWeight: 8.5,
      redFlagThreshold: 2,
      pathSignal: 'both',
    },
    '10E': {
      name: 'Work Environment Fit',
      maxWeight: 8.5,
      redFlagThreshold: 2,
      pathSignal: 'both',
    },
    '10F': {
      name: 'Public-Facing vs Behind-the-Scenes',
      maxWeight: 7.5,
      redFlagThreshold: 1,
      pathSignal: 'both',
    },
    '10G': {
      name: 'Career Curiosity',
      maxWeight: 8.5,
      redFlagThreshold: 2,
      pathSignal: 'both',
    },
    '10H': {
      name: 'Income & Lifestyle Motivation',
      maxWeight: 10.5,
      redFlagThreshold: 2,
      pathSignal: 'both',
    },
  },

  // Path fit scoring anchors for dual-path comparison
  pathFitAnchors: {
    finance: {
      primary: ['ms10_01', 'ms10_02', 'ms10_03', 'ms10_04', 'ms10_05', 'ms10_35'],
      supporting: ['ms10_11', 'ms10_12', 'ms10_21', 'ms10_20', 'ms10_39'],
      hybridBridge: ['ms10_04', 'ms10_38'],
    },
    sports: {
      primary: ['ms10_06', 'ms10_07', 'ms10_08', 'ms10_09', 'ms10_10', 'ms10_36'],
      supporting: ['ms10_13', 'ms10_14', 'ms10_25', 'ms10_28'],
      hybridBridge: ['ms10_08', 'ms10_38'],
    },
    hybrid: {
      indicators: ['ms10_04', 'ms10_08', 'ms10_38', 'ms10_10'],
      description: 'Sports Finance / Salary Cap Analyst / Athlete Wealth Advisor / Sports Investment Banking',
    },
  },

  globalRedFlags: [
    'Finance interest is entirely income-driven with no intellectual curiosity — will not sustain through technical early-career demands',
    'Sports business interest cannot be separated from sports fandom — business layer is absent',
    'No intrinsic career curiosity demonstrated in either path — stated interests not backed by voluntary attention or research',
    'Requires immediate visibility and recognition — incompatible with analyst or operational roles in either path',
    'Cannot sustain detail-oriented work without immediate results — rules out analyst tracks in both finance and sports',
    'Career choice is pure income-driven without fit consideration — misalignment risk is high',
    'No awareness that hybrid finance + sports roles exist — insufficient career research for his stated dual aspirations',
    'Oakland giving-back motivation is stated in identity but absent from career motivation — purpose disconnect that will weaken long-term drive',
  ],

  contradictionChecks: [
    {
      id: 'contradiction_10_1',
      description: 'Claims high finance interest but income is the sole driver with no intellectual engagement',
      questions: ['ms10_01', 'ms10_05', 'ms10_35', 'ms10_30', 'ms10_02'],
      flag: 'Rates high finance interest (ms10_01, ms10_35) but cannot describe any moment of genuine financial curiosity (ms10_05), income is the primary driver (ms10_30), and cannot identify intrinsic motivation to sustain through grind (ms10_02) — finance interest is income-deep, not field-deep',
    },
    {
      id: 'contradiction_10_2',
      description: 'Wants high-visibility or public-facing career but avoids communication and self-advocacy',
      questions: ['ms10_23', 'ms10_24', 'ms10_11', 'ms10_12', 'ms10_14'],
      flag: 'Prefers visible, client-facing roles (ms10_23, ms10_24) but shows weak persuasion ability (ms10_11), discomfort in high-stakes verbal situations (ms10_12), and poor rapport-building (ms10_14) — public-facing career aspiration is not matched by the communication capability those roles require',
    },
    {
      id: 'contradiction_10_3',
      description: 'Wants high-income elite career but shows low tolerance for the grind and detail work required to get there',
      questions: ['ms10_30', 'ms10_32', 'ms10_21', 'ms10_22', 'ms10_39'],
      flag: 'Income is a primary driver (ms10_30, ms10_32) but cannot sustain detail-oriented behind-the-scenes work (ms10_21), exits when recognition is slow (ms10_22), and does not understand the income timeline to the numbers he wants (ms10_39) — income aspiration is not connected to a realistic path or the daily work required to reach it',
    },
    {
      id: 'contradiction_10_4',
      description: 'Claims sports business interest but cannot articulate business knowledge or separate it from fandom',
      questions: ['ms10_06', 'ms10_09', 'ms10_36', 'ms10_07', 'ms10_10'],
      flag: 'Reports high sports business interest (ms10_06) but has zero knowledge of how sports organizations operate as businesses (ms10_09), low intrinsic sports business curiosity independent of fandom (ms10_36), and cannot think in deal or leverage terms (ms10_07) — sports business interest is fan-based, not field-based',
    },
    {
      id: 'contradiction_10_5',
      description: 'Oakland and legacy are stated as core identity but absent from career motivation and decision-making',
      questions: ['ms10_33', 'ms10_31', 'ms10_34', 'ms10_26'],
      flag: 'Oakland giving-back and legacy are foundational identity statements (Sections 1–2) but appear weakly (ms10_33) or not at all in career motivation (ms10_31), future life vision (ms10_34), and genuine career curiosity (ms10_26) — identity and career motivation are disconnected; the purpose anchor that sustains long-term drive is not integrated into career decision-making',
    },
  ],
};
