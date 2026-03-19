// ============================================================
// MELVIN — SECTION 11: Life Vision & Blueprint
// Subsections: 11A Money Vision | 11B Lifestyle Goals |
//              11C Housing Vision | 11D Car & Status Vision |
//              11E Family & Provider Vision | 11F Wealth & Financial Mindset
// Total Questions: 38
// ============================================================

export const MELVIN_SECTION_11 = [

  // ─────────────────────────────────────────────
  // 11A — Money Vision
  // ─────────────────────────────────────────────
  {
    id: 'ms11_01',
    subsection: '11A',
    subsectionName: 'Money Vision',
    type: 'open',
    text: 'By age 30, what is the specific number you want in your bank account — not what you hope for, the number you are actually building toward?',
    options: null,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Names a specific number with some awareness of how to reach it — vision is concrete and connected to a path',
      weak: 'Vague answer ("a lot," "comfortable," "enough") — no specific financial target; aspiration without architecture',
      complex: 'The number itself is less important than the specificity and whether it connects to a path. A $500K answer with no savings plan is less useful than a $250K answer with a specific career timeline.',
    },
    redFlags: [
      'Cannot name a specific financial target — aspiration is entirely abstract',
      'Names a number that is completely disconnected from any career path he is pursuing',
    ],
    followUp: {
      condition: 'Vague answer or no specific number',
      question: 'Stop. Pick a number. Not the biggest one you can imagine — the real one you\'re working toward. What is it?',
    },
  },
  {
    id: 'ms11_02',
    subsection: '11A',
    subsectionName: 'Money Vision',
    type: 'forced_choice',
    text: 'When you think about your financial life at 35, which picture is most honest?',
    options: [
      'High income, high spending — I want to live at the level I earn, fully',
      'High income, disciplined spending — I want to earn a lot and keep most of it',
      'Moderate income, smart investing — I\'d rather build wealth than show it',
      'High income, split between living well and building long-term assets',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Any specific answer that aligns income behavior with stated career path and discipline levels — internal consistency',
      weak: 'High income + high spending with low current discipline — the lifestyle is built on an income that his current behavior pattern will not produce',
      complex: 'Option 2 or 4 maps cleanest to finance and wealth-building goals. Option 1 creates a fragile financial picture regardless of income level.',
    },
    redFlags: [
      'High income + high spending as the primary model with no savings or wealth-building component',
      'Income picture is not connected to any specific career path that produces it',
    ],
    followUp: {
      condition: 'Selects high income + high spending',
      question: 'If your income drops 30% one year — market downturn, job transition, whatever — what happens to that lifestyle?',
    },
  },
  {
    id: 'ms11_03',
    subsection: '11A',
    subsectionName: 'Money Vision',
    type: 'slider',
    text: 'On a scale of 1–10, how specifically do you understand how your target career gets you to the financial life you want — not just that it pays well, but the actual steps?',
    options: null,
    min: 1,
    max: 10,
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: '7+ — knows the career income trajectory and has mapped it to his lifestyle goals',
      weak: '1–4 — career path and financial vision are floating separately with no connecting architecture',
      complex: 'This is the bridge question between Section 10 career alignment and Section 11 financial vision — the two must connect',
    },
    redFlags: [
      'Financial vision and career path exist independently with no mapped connection between them',
      'Cannot explain how his target career produces the financial life he described',
    ],
    followUp: {
      condition: 'Scores 1–4',
      question: 'Walk me through it — year by year from Morehouse graduation to the financial life you described. What happens in each phase?',
    },
  },
  {
    id: 'ms11_04',
    subsection: '11A',
    subsectionName: 'Money Vision',
    type: 'likert',
    text: 'How comfortable are you with the idea that building real wealth takes 10–15 years of disciplined financial behavior — and the lifestyle you want is at the end of that timeline, not the beginning?',
    options: [
      'Very uncomfortable — I expect to live well from early in my career',
      'Uncomfortable — I know it takes time but the waiting is hard to accept',
      'Neutral — I understand it but haven\'t fully sat with what that means',
      'Comfortable — I\'m building toward something and I can delay gratification',
      'Very comfortable — I\'m already thinking in 10–15 year timelines, not months',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Genuine long-term orientation with delayed gratification tolerance — foundational for both finance career grind and wealth-building',
      weak: 'Expects early lifestyle payoff — will be disappointed by entry-level finance reality and may make spending decisions that undermine wealth accumulation',
      complex: 'Given Melvin\'s motivation by recognition and accolades, delayed gratification is a real test — early career visibility and income are both low',
    },
    redFlags: [
      'Expects significant lifestyle at the start of his career — timeline is unrealistic and will create financial and motivational problems',
      'Cannot accept that wealth-building and lifestyle lag behind income in any serious financial plan',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'At 23, fresh out of Morehouse, what do you expect your financial life to look like? Be specific — rent, car, savings, spending.',
    },
  },
  {
    id: 'ms11_05',
    subsection: '11A',
    subsectionName: 'Money Vision',
    type: 'scenario',
    text: 'It\'s your first year out of Morehouse. You\'re making $65,000. After taxes, rent, food, and basic expenses, you have $800 left per month. What do you do with it?',
    options: [
      'Save most of it — build the emergency fund and start investing early',
      'Split it — some saved, some for quality of life because $65K is tight',
      'Use it to upgrade my life — nice clothes, going out, building the image',
      'Send some home to my mom first, then figure out the rest',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Saves or invests the majority — demonstrates financial discipline at the entry level where habits are formed',
      weak: 'Lifestyle spending at $800/month margin — builds zero wealth foundation at entry level; lifestyle image over financial architecture',
      complex: 'Sending to mom first shows provider instinct; the question is whether it\'s planned or reactive. Splitting is workable if the savings portion is substantial.',
    },
    redFlags: [
      'Uses $800/month margin on lifestyle spending at entry-level income — wealth cannot be built on this pattern',
      'No mention of savings, investing, or financial planning at any income level',
    ],
    followUp: {
      condition: 'Selects "upgrade my life" or lifestyle-forward response',
      question: 'At 35, what is the compound difference between investing $500/month for 12 years versus spending it? Do you know what that number is?',
    },
  },
  {
    id: 'ms11_06',
    subsection: '11A',
    subsectionName: 'Money Vision',
    type: 'open',
    text: 'What does being financially free mean to you — specifically? Not the phrase, the reality. What does a day in your life look like when you\'re financially free?',
    options: null,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Specific, vivid description of financial freedom as a state of life — what he does, who he supports, what he no longer worries about',
      weak: 'Vague or aspirational without substance — "not worrying about money" without any picture of what that life looks like',
      complex: 'Financial freedom is a motivation anchor — the clearer it is, the more it can sustain him through difficulty; vagueness suggests the vision hasn\'t been built yet',
    },
    redFlags: [
      'Cannot describe a specific picture of financial freedom beyond abstract concepts',
      'Financial freedom vision is entirely consumer-oriented with no asset, giving, or independence component',
    ],
    followUp: {
      condition: 'Vague or consumer-only response',
      question: 'Financial freedom means you could stop working and your money works for you. What needs to be true financially for that day to exist?',
    },
  },

  // ─────────────────────────────────────────────
  // 11B — Lifestyle Goals
  // ─────────────────────────────────────────────
  {
    id: 'ms11_07',
    subsection: '11B',
    subsectionName: 'Lifestyle Goals',
    type: 'forced_choice',
    text: 'Which best describes the lifestyle you\'re actually building toward — be honest, not aspirational?',
    options: [
      'Comfortable — stable, no debt, can travel occasionally, solid savings',
      'Premium — nice apartment, quality car, regular travel, investing consistently',
      'Luxury — high-end everything, multiple properties, wealth visible in how I live',
      'Elite — generational wealth, properties, philanthropy, legacy at scale',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Clear tier selection matched to a realistic career path and current discipline level',
      weak: 'Elite lifestyle goal paired with low current discipline and no concrete financial plan — disconnected aspiration',
      complex: 'Any lifestyle goal is valid if connected to a realistic path; the flag is when the goal has no viable bridge from current reality',
    },
    redFlags: [
      'Elite lifestyle goal with no realistic financial plan, career path, or current discipline to support it',
      'Cannot connect the lifestyle they want to the income and behavior required to produce it',
    ],
    followUp: {
      condition: 'Selects luxury or elite',
      question: 'What income do you need monthly to live that life — specifically? And which career path gets you there, and when?',
    },
  },
  {
    id: 'ms11_08',
    subsection: '11B',
    subsectionName: 'Lifestyle Goals',
    type: 'scenario',
    text: 'You\'re 28. You just got your first big promotion — you\'re now making $130,000. What changes in how you live, and what stays the same?',
    options: [
      'A lot changes — this is the money I\'ve been waiting to spend on how I want to live',
      'Some things change — I upgrade selectively, but I also increase savings and investing',
      'Very little changes day-to-day — I mostly increase what I\'m saving and investing',
      'I first cover anyone I\'m responsible for, then reassess what the rest goes toward',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Selective lifestyle upgrade with significant savings increase — income growth deployed to build wealth, not just lifestyle',
      weak: 'All income deployed to lifestyle — lifestyle inflation pattern; will never build wealth regardless of income level',
      complex: 'Covering family first shows provider instinct; the question is whether it\'s strategic or reactive. The ideal combines family, lifestyle, and savings.',
    },
    redFlags: [
      'Significant lifestyle inflation immediately with every income increase — wealth cannot accumulate on this pattern',
      'No savings or investment behavior at $130K — the same pattern at higher income just costs more',
    ],
    followUp: {
      condition: 'Selects "a lot changes"',
      question: 'Lifestyle inflation is the #1 reason high earners don\'t build wealth. What specifically would you do differently at $130K versus $65K — beyond spending more?',
    },
  },
  {
    id: 'ms11_09',
    subsection: '11B',
    subsectionName: 'Lifestyle Goals',
    type: 'likert',
    text: 'How important is it to you that your lifestyle is visible — that people can see you\'re doing well from how you dress, where you go, what you drive?',
    options: [
      'Very important — my success needs to be visible to matter to me',
      'Important — I care about appearance and what it signals',
      'Moderate — I want quality but not necessarily visibility',
      'Low — I\'d rather build quietly and let results speak eventually',
      'Not important — I\'m completely indifferent to external signals of success',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Low-to-moderate visibility importance — wealth builds in the background; status spending is the enemy of net worth',
      weak: 'High visibility requirement — will spend on status symbols before building wealth; particularly risky given Melvin\'s recognition motivation',
      complex: 'Some visibility is culturally meaningful and not inherently a problem; the flag is when visibility spending precedes or replaces wealth building',
    },
    redFlags: [
      'Success is only valid when visible — status spending will systematically undermine wealth accumulation',
      'Visible success is the primary financial motivation — income will go to image before assets',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'If you had $500,000 in investments but drove a 2016 Camry and lived in a modest apartment — would that feel like success? Be honest.',
    },
  },
  {
    id: 'ms11_10',
    subsection: '11B',
    subsectionName: 'Lifestyle Goals',
    type: 'open',
    text: 'Describe a specific day in your ideal life at 35 — from waking up to going to sleep. Where are you, what do you do, who is around you, what does the day feel like?',
    options: null,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Specific, multi-dimensional vision — location, people, work, activities, purpose all present; vivid and personally authentic',
      weak: 'Vague or entirely consumer-focused — the day is only possessions and status, not relationships, purpose, or work satisfaction',
      complex: 'The presence or absence of family, Oakland, community, and career purpose in this vision is highly diagnostic',
    },
    redFlags: [
      'Day at 35 is described entirely through possessions and spending — no relationships, purpose, or contribution',
      'Cannot construct a specific vision for a day in his ideal life — future identity not yet formed',
    ],
    followUp: {
      condition: 'Vision is vague or consumer-only',
      question: 'Put the things aside. What are you working on that day? What problem are you solving, and why does it matter to you?',
    },
  },
  {
    id: 'ms11_11',
    subsection: '11B',
    subsectionName: 'Lifestyle Goals',
    type: 'likert',
    text: 'How realistic is your current lifestyle vision — do you genuinely believe you can achieve it, or is it a hope you hold loosely?',
    options: [
      'It\'s mostly a hope — I want it but I\'m not sure how realistic it is',
      'I believe it\'s possible for someone, but I\'m not confident for myself',
      'I think it\'s realistic if things go reasonably well',
      'I believe it\'s realistic and I\'m actively working toward it',
      'I\'m certain it will happen — I\'m already on the path',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Realistic and working toward it — agency and action connected to vision',
      weak: 'Hope without confidence — vision is aspirational but not owned; or false certainty with no concrete plan',
      complex: 'Certainty without a plan is as concerning as hope without action — look for whether confidence is grounded in real steps',
    },
    redFlags: [
      'Vision is held as a hope, not a plan — no personal agency connected to achieving it',
      'Certainty about achieving the vision with no concrete steps, discipline evidence, or realistic timeline',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'What would have to be different — about you, not the world — for this lifestyle to be real?',
    },
  },

  // ─────────────────────────────────────────────
  // 11C — Housing Vision
  // ─────────────────────────────────────────────
  {
    id: 'ms11_12',
    subsection: '11C',
    subsectionName: 'Housing Vision',
    type: 'forced_choice',
    text: 'What does your housing look like at 30 — be specific and honest?',
    options: [
      'Renting a solid apartment in a city I want to be in — building my career first',
      'Owning a condo or townhouse — first property, building equity',
      'Renting a luxury apartment in a top city — I\'d rather rent premium than own average',
      'Owning a house — I want space, ownership, and something to build on',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Any answer connected to a realistic income plan — housing vision matched to career trajectory',
      weak: 'Luxury rental or ownership aspiration with no financial plan to support it — housing vision floats above reality',
      complex: 'Renting strategically in a high-opportunity city is financially sound; the flag is spending on luxury housing before building any investment base',
    },
    redFlags: [
      'Luxury housing expectation at 30 with no mapped income or savings plan to support it',
      'No consideration of equity, ownership, or wealth building in housing decisions',
    ],
    followUp: {
      condition: 'Selects luxury rental or ownership without mapped plan',
      question: 'What income do you need to qualify for that — and what does the down payment look like if you\'re buying? Do you know those numbers?',
    },
  },
  {
    id: 'ms11_13',
    subsection: '11C',
    subsectionName: 'Housing Vision',
    type: 'likert',
    text: 'How important is it to you to own property — not just for status, but as a wealth-building and generational asset?',
    options: [
      'Not very important — I\'d rather rent and keep flexibility',
      'Slightly important — it\'s something I think I should do eventually',
      'Moderately important — I want to own property as part of my financial plan',
      'Very important — property ownership is a core part of how I plan to build wealth',
      'Critical — real estate is central to my long-term wealth strategy',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Property ownership as a wealth-building strategy — demonstrates financial sophistication beyond income and spending',
      weak: 'No interest in property ownership — long-term wealth building is limited without equity accumulation',
      complex: 'Strategic renting in early career is valid; permanent renters with no asset-building plan are leaving wealth on the table',
    },
    redFlags: [
      'No interest in property ownership or alternative asset-building strategy',
      'Property is seen only as status rather than a wealth-building vehicle',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'If you never own property, what\'s your plan for building generational wealth — what does the asset look like?',
    },
  },
  {
    id: 'ms11_14',
    subsection: '11C',
    subsectionName: 'Housing Vision',
    type: 'scenario',
    text: 'You\'re 27, making $95,000. You can afford to rent a luxury apartment for $3,200/month or a solid apartment for $1,800/month. Which do you choose, and what do you do with the difference?',
    options: [
      'Luxury apartment — at $95K I should be living well, that\'s what I\'m working for',
      'Solid apartment — the $1,400/month difference goes toward savings and investing',
      'Solid apartment now — I\'m saving for a down payment on property within 2 years',
      'Solid apartment — I want to send some home and still build my own foundation',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Chooses strategic housing and deploys the difference into savings, investment, or property down payment — wealth-building decision at the critical early accumulation window',
      weak: 'Chooses luxury rental at $95K — $38,400/year to a landlord with no equity, while missing the prime wealth-building window in his 20s',
      complex: 'Sending home to mom before building his own foundation is noble but creates a structural problem if it prevents investment; look for balance',
    },
    redFlags: [
      'Chooses luxury rental without any savings or investment plan at $95K income',
      'Views $95K as the level where lifestyle entitlement begins rather than the level where wealth accumulation begins',
    ],
    followUp: {
      condition: 'Selects luxury apartment',
      question: 'If you spend $3,200 on rent at 27 versus $1,800, and invest the $1,400 difference — at 45, what is the difference in your net worth? Do you know that number?',
    },
  },
  {
    id: 'ms11_15',
    subsection: '11C',
    subsectionName: 'Housing Vision',
    type: 'open',
    text: 'Do you want to come back to Oakland? What does your relationship with Oakland look like when you\'re successful — do you live there, invest there, give back there, or does it become the place you came from?',
    options: null,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Specific vision of Oakland relationship — whether he returns, invests, or maintains deep ties; either direction with intention is strong',
      weak: 'Oakland becomes simply a place he escaped — no active relationship or investment in the community that shaped him',
      complex: 'This question connects life vision to identity and purpose; his OK program legacy goal should appear here if it\'s genuine',
    },
    redFlags: [
      'Oakland becomes entirely the past with no active future relationship — identity stated as Oakland-connected but behavior pattern says otherwise',
      'No awareness that his success could be deployed back into Oakland through investment, mentorship, or community building',
    ],
    followUp: {
      condition: 'Oakland appears as only the past',
      question: 'The OK program made you. Who are you making when you\'re successful? What does that look like specifically?',
    },
  },

  // ─────────────────────────────────────────────
  // 11D — Car & Status Vision
  // ─────────────────────────────────────────────
  {
    id: 'ms11_16',
    subsection: '11D',
    subsectionName: 'Car & Status Vision',
    type: 'forced_choice',
    text: 'At 28, what do you see yourself driving?',
    options: [
      'Something reliable and practical — I care about function, not the brand',
      'A nice car that fits where I am in my career — respectable but not flashy',
      'Something premium — BMW, Mercedes, Audi — I\'ve earned it by then',
      'Something luxury or exotic — a car that says exactly who I am',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Reliable/practical or career-appropriate premium — spending is calibrated to wealth-building stage',
      weak: 'Luxury or exotic at 28 on early-career income — high depreciating asset cost during the prime wealth-building window; status spending competes directly with investing',
      complex: 'Premium at 28 is achievable; exotic or luxury is typically a wealth-trap at this stage unless income is significantly above average',
    },
    redFlags: [
      'Exotic or top-luxury car at 28 on typical early-career finance or sports business income',
      'Car is a status signal before it is a transportation solution — indicates spending hierarchy that harms wealth accumulation',
    ],
    followUp: {
      condition: 'Selects premium luxury or exotic',
      question: 'A BMW 5 Series at 28 costs roughly $900/month after financing and insurance. At that stage of your career — what does that $900 cost you in long-term wealth? Have you thought about it that way?',
    },
  },
  {
    id: 'ms11_17',
    subsection: '11D',
    subsectionName: 'Car & Status Vision',
    type: 'likert',
    text: 'How important are status symbols — clothes brands, cars, watches, travel — to how you feel about your own success?',
    options: [
      'They\'re central — status symbols are how I measure and show success',
      'They\'re important — I want nice things and I\'m honest about that',
      'They matter some — I appreciate quality but I\'m not driven by brands',
      'They matter little — I\'d rather have the net worth than the look of it',
      'They don\'t matter to me — I\'m indifferent to what success looks like externally',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Status symbols are low priority — spending energy goes toward wealth building, not image signaling',
      weak: 'Status symbols are central — this is the single biggest predictor of wealth never being built regardless of income; Melvin\'s recognition motivation makes this a critical watch area',
      complex: 'Appreciating quality is not the same as needing status — the flag is when the brand matters more than the function or the wealth cost',
    },
    redFlags: [
      'Status symbols are a primary measure of personal success — spending will consistently outpace saving',
      'Cannot separate self-worth from external success signals — financially dangerous pattern at any income level',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'If you had $2M in investments and drove a Toyota — would people know you were successful? Would you care?',
    },
  },
  {
    id: 'ms11_18',
    subsection: '11D',
    subsectionName: 'Car & Status Vision',
    type: 'scenario',
    text: 'You\'re 30, making $120,000, and your finance advisor tells you that if you put $2,000/month into index funds for 20 years you\'ll have $1.8M by 50. But that same $2,000 could go toward the car and the lifestyle you\'ve always wanted. What do you do?',
    options: [
      'Invest — the $1.8M at 50 is the clearer win, no question',
      'Split — invest some, use some for lifestyle; I\'m not waiting 20 years to live',
      'Use it on the lifestyle — I\'ll invest more when I earn more',
      'Depends on where I am in life — too many variables to decide now',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Invests or splits with a specific plan — understands that lifestyle costs compound negatively just as investments compound positively',
      weak: '"I\'ll invest more when I earn more" — classic wealth destruction pattern; people who don\'t invest at $120K don\'t start at $150K',
      complex: 'Splitting is workable if the investment portion is substantial and specific; the flag is deferring investment to a future income level',
    },
    redFlags: [
      'Defers investing to a future income level — this pattern replays at every income level and wealth is never built',
      'Lifestyle spending is treated as the reward and investing as what\'s left over — inverted priority structure',
    ],
    followUp: {
      condition: 'Selects "when I earn more" or lifestyle priority',
      question: 'At $65K you said you\'d invest when you made more. At $120K you\'re saying the same thing. At what number does the investing start?',
    },
  },
  {
    id: 'ms11_19',
    subsection: '11D',
    subsectionName: 'Car & Status Vision',
    type: 'open',
    text: 'Your dad had addiction problems and financial instability. What specific things did you watch happen to him financially — and what have you decided you will never let happen to you?',
    options: null,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can name specific financial patterns he observed and specific decisions he\'s made to counter them — turned painful observation into protective financial values',
      weak: 'Dismisses the question or cannot connect his father\'s financial destruction to his own financial decisions — major unprocessed variable in his money story',
      complex: 'This is one of the most important questions in the section — his father\'s pattern is the clearest negative financial model in his life; whether he\'s learned from it determines much of his financial future',
    },
    redFlags: [
      'Cannot connect his father\'s financial destruction to specific decisions in his own life',
      'Has no explicit "never will I" commitments from observing what happened to his dad',
    ],
    followUp: {
      condition: 'Dismisses or cannot engage specifically',
      question: 'Your dad had money problems that shaped everything for your family. What was the most damaging financial thing you watched happen — and what does it teach you about your own money?',
    },
  },

  // ─────────────────────────────────────────────
  // 11E — Family & Provider Vision
  // ─────────────────────────────────────────────
  {
    id: 'ms11_20',
    subsection: '11E',
    subsectionName: 'Family & Provider Vision',
    type: 'open',
    text: 'Your mom has sacrificed a lot. What specifically do you want to be able to do for her financially — and by when?',
    options: null,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Specific financial commitment with a realistic timeline — buy her a house, pay off debt, cover her living expenses by X age; grounded in a real plan',
      weak: 'Vague ("take care of her," "make sure she\'s good") — provider intention without financial architecture',
      complex: 'The specificity reveals whether this is an emotional commitment or a financial plan; emotional commitment without a number or timeline is not a plan',
    },
    redFlags: [
      'Provider intention for mom is vague with no specific dollar amount, timeline, or career milestone attached',
      'No awareness of what it would actually cost to provide for his mother financially at the level he intends',
    ],
    followUp: {
      condition: 'Vague response',
      question: 'Name a specific thing you want to be able to do for her. One thing, specific. What does it cost, and what year in your career does that become possible?',
    },
  },
  {
    id: 'ms11_21',
    subsection: '11E',
    subsectionName: 'Family & Provider Vision',
    type: 'likert',
    text: 'How clear are you on what it actually costs to financially support someone else — your mom, a future family — beyond your own expenses?',
    options: [
      'Not clear at all — I haven\'t thought through the actual numbers',
      'Slightly clear — I have a vague sense but no real numbers',
      'Somewhat clear — I understand the basics but haven\'t mapped it specifically',
      'Clear — I have a realistic sense of what supporting others costs',
      'Very clear — I\'ve thought through the numbers and built them into my financial plan',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Has mapped the cost of supporting others into his financial plan — provider vision is grounded in financial reality',
      weak: 'Provider intention without any financial awareness of the cost — will be surprised by what it takes to support others while building his own life',
      complex: 'Supporting mom on entry-level finance pay while also saving and investing requires specific planning — vague provider intentions create financial chaos',
    },
    redFlags: [
      'Strong provider intention with no financial awareness of what it costs',
      'Has not factored family support into any financial planning — will create financial strain when the commitment becomes real',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'If you\'re sending your mom $800/month and paying your own rent, car, food, and student loans — what does the math look like on a $65K salary? Have you run those numbers?',
    },
  },
  {
    id: 'ms11_22',
    subsection: '11E',
    subsectionName: 'Family & Provider Vision',
    type: 'forced_choice',
    text: 'When you think about your own family — kids, a partner, a home — how central is that to the life you\'re building?',
    options: [
      'It\'s not on my radar right now — I\'m focused on career and finances first',
      'It\'s in the future — something I want, but not what I\'m planning around now',
      'It\'s part of the plan — I\'m building a life that includes a family, not just a career',
      'It\'s a primary motivator — building for my future family is part of why I work this hard',
    ],
    weight: 1.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Any answer that is honest and self-aware — knowing where family falls in his current priority stack is itself useful information',
      weak: 'Family as primary motivator at 17 with no career or financial foundation — puts family aspiration ahead of the structure needed to support it',
      complex: 'Career-first is appropriate at this stage; the question is whether family eventually factors in as a motivating force for wealth-building',
    },
    redFlags: [
      'Family is primary current motivator but no financial plan exists to support family formation',
      'Family is completely absent from vision — may indicate unprocessed fear of replicating his father\'s pattern',
    ],
    followUp: {
      condition: 'Family is absent from vision',
      question: 'Do you see yourself having a family someday? If not, is that a choice or something you haven\'t thought through yet?',
    },
  },
  {
    id: 'ms11_23',
    subsection: '11E',
    subsectionName: 'Family & Provider Vision',
    type: 'likert',
    text: 'How much does not wanting to repeat your father\'s patterns — financially, with addiction, with family — drive how you make decisions?',
    options: [
      'Very little — I don\'t think about his patterns when I make decisions',
      'A little — it\'s in the back of my mind but doesn\'t actively drive things',
      'Somewhat — it shapes certain decisions but not all',
      'Significantly — his patterns are one of the clearest guides I use',
      'Profoundly — not becoming him is one of the deepest things that motivates me',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Father\'s patterns are an active guide — turned grief and loss into behavioral boundaries; powerful protective motivator',
      weak: 'Father\'s patterns are not a factor — may not have processed the loss, or has created a false separation between his story and his own risks',
      complex: 'This is the most emotionally loaded question in the section — the answer reveals how much he has processed his father\'s death and its meaning for his own life',
    },
    redFlags: [
      'Father\'s financial and addiction patterns have not been consciously processed as relevant to his own decisions',
      'Dismisses the connection between his father\'s story and his own risk profile',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'Your father started a path that ended in addiction and death. You grew up watching it. Is that completely separate from who you are and how you make decisions? How?',
    },
  },
  {
    id: 'ms11_24',
    subsection: '11E',
    subsectionName: 'Family & Provider Vision',
    type: 'scenario',
    text: 'You\'re 32 and your mom needs $15,000 for a major medical expense insurance won\'t cover. You have $22,000 in savings — your emergency fund and the beginning of an investment account. What do you do?',
    options: [
      'Give her the $15,000 immediately — she comes first, no question',
      'Give her what I can without completely draining my emergency fund',
      'Research every other option first — payment plans, hospital assistance, loans — before I touch savings',
      'Split between giving her money and helping her access other resources',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Researches all options before touching savings or splits strategically — serves her while protecting his own financial foundation',
      weak: 'Immediately drains savings without exploring alternatives — emotional provider response that destroys his own financial stability',
      complex: 'Melvin\'s fierce protectiveness of his mom makes this a real emotional test — the goal is both to serve her AND maintain his financial foundation; these don\'t have to conflict',
    },
    redFlags: [
      'Would immediately drain savings without researching any alternatives — emotional reactivity over financial strategy',
      'No awareness that financial hospitals, payment plans, and other resources exist before personal savings',
    ],
    followUp: {
      condition: 'Selects "give her $15,000 immediately"',
      question: 'After you give her $15,000 you have $7,000 left. Now you\'re one unexpected expense away from zero. What happens next time something comes up — for her or for you?',
    },
  },
  {
    id: 'ms11_25',
    subsection: '11E',
    subsectionName: 'Family & Provider Vision',
    type: 'open',
    text: 'What kind of provider do you want to be — not just financially, but for everyone in your life? What does that responsibility look like for you at 35?',
    options: null,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Multi-dimensional provider vision — financial, emotional, present, and community-oriented; connected to his OK program legacy',
      weak: 'Provider vision is purely financial — reduces care to money; or entirely absent',
      complex: 'Given his family\'s history of financial instability and emotional abandonment, his provider vision will likely compensate in specific directions — those directions are diagnostic',
    },
    redFlags: [
      'Provider vision is only financial with no relational or presence component — may replicate the transactional family dynamic he grew up with',
      'Cannot articulate what kind of provider he wants to be beyond "take care of people financially"',
    ],
    followUp: {
      condition: 'Response is purely financial',
      question: 'Money can be given without presence. Your dad was physically present sometimes and absent others — in different ways. What does being there look like for you beyond writing a check?',
    },
  },

  // ─────────────────────────────────────────────
  // 11F — Wealth & Financial Mindset
  // ─────────────────────────────────────────────
  {
    id: 'ms11_26',
    subsection: '11F',
    subsectionName: 'Wealth & Financial Mindset',
    type: 'forced_choice',
    text: 'What is your honest relationship with money right now?',
    options: [
      'I don\'t have much and I haven\'t had to think hard about managing it',
      'I spend what I have and don\'t save — money doesn\'t last long with me',
      'I\'m careful with money — I track what I have and I don\'t waste it',
      'I already have habits around saving and thinking about money long-term',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Already has saving habits or careful management — early financial behavior predicts adult financial behavior',
      weak: 'Money doesn\'t last or has never had to think about it — no financial habits formed; these patterns intensify with more money, not less',
      complex: 'The behavior at low income is a better predictor than stated plans at high income — what he does now with limited money is what he\'ll do with $100K',
    },
    redFlags: [
      'Money doesn\'t last with him at any income level — behavior at low income predicts behavior at high income',
      'No financial habits formed at 17 — leaving for college with no money management foundation',
    ],
    followUp: {
      condition: 'Selects "spend what I have" or "haven\'t had to think hard"',
      question: 'When you get your first paycheck from a real job — and nobody is telling you what to do with it — what happens to it in the first 30 days?',
    },
  },
  {
    id: 'ms11_27',
    subsection: '11F',
    subsectionName: 'Wealth & Financial Mindset',
    type: 'likert',
    text: 'How much do you actually know about investing — index funds, compound interest, Roth IRA, diversification — not in theory, but as tools you could use?',
    options: [
      'Almost nothing — I know investing exists but I don\'t know how to do it',
      'Very little — I\'ve heard terms but couldn\'t explain or use them',
      'Some — I understand the basics but couldn\'t manage anything independently',
      'A fair amount — I understand the tools and could get started',
      'Significant — I have working knowledge and have already started or plan to start',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Working knowledge of investing tools — particularly ironic and important given finance career aspirations',
      weak: 'No working investment knowledge at 17 heading into a finance degree — will enter Morehouse behind in foundational financial literacy',
      complex: 'Finance career aspirations + zero personal investing knowledge = significant gap; this should be an immediate priority',
    },
    redFlags: [
      'Pursuing a finance degree and career with no working knowledge of basic personal investing',
      'Cannot explain what compound interest or a Roth IRA does — foundational financial literacy gap',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'You want to work in finance managing other people\'s money. How does that start with not yet knowing how to manage your own? What\'s the plan to close that gap?',
    },
  },
  {
    id: 'ms11_28',
    subsection: '11F',
    subsectionName: 'Wealth & Financial Mindset',
    type: 'scenario',
    text: 'You get a $5,000 cash gift at graduation — no strings attached. What do you actually do with it, honestly?',
    options: [
      'Spend a meaningful portion on something I\'ve wanted — I\'ve earned a celebration',
      'Put most of it into savings or a Roth IRA immediately',
      'Split it — some saved, some spent on something specific',
      'Give some to my mom, save the rest',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Saves or invests the majority — spontaneous windfall behavior reveals true financial priorities when no one is watching',
      weak: 'Primarily spends on lifestyle — windfall money goes to consumption rather than wealth building',
      complex: 'A celebration component is not wrong; the proportion matters. Giving to mom first is provider instinct — check if the rest is saved or spent.',
    },
    redFlags: [
      'Windfall money goes primarily to lifestyle spending — no savings reflex even with unexpected income',
      'Has no idea what a Roth IRA is or that this would be an optimal moment to start one',
    ],
    followUp: {
      condition: 'Primarily spends or no savings response',
      question: '$5,000 in a Roth IRA at 22 — compounded over 40 years at 8% average returns — is roughly $108,000 at retirement. Does that change how you think about the $5,000?',
    },
  },
  {
    id: 'ms11_29',
    subsection: '11F',
    subsectionName: 'Wealth & Financial Mindset',
    type: 'likert',
    text: 'How serious are you about building generational wealth — creating assets that outlive you and benefit people after you?',
    options: [
      'Not very serious — I\'m focused on my own financial life',
      'Slightly serious — it\'s something I think is a good idea eventually',
      'Moderately serious — it\'s part of my long-term thinking',
      'Very serious — generational wealth is a real and active part of my plan',
      'Extremely serious — leaving assets and a foundation for those after me is one of my core financial goals',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Generational wealth is an active goal connected to Oakland, family, and OK program legacy — his stated why requires this orientation',
      weak: 'Generational wealth is abstract or absent — inconsistent with stated legacy goals around the 100 Black Men and OK program',
      complex: 'His stated identity (poster boy of OK, 100 Black Men, coming back to Oakland) requires generational wealth orientation — if it\'s absent here, the identity statement may be performative',
    },
    redFlags: [
      'Legacy-oriented identity stated in earlier sections but generational wealth is not a financial priority — identity and financial behavior are disconnected',
      'Cannot articulate what generational wealth looks like or how to build it',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'You want to be the proof that Oakland Kids works — you want to come back and give back. What does that require financially? Is that a personal wealth project or just an income project?',
    },
  },
  {
    id: 'ms11_30',
    subsection: '11F',
    subsectionName: 'Wealth & Financial Mindset',
    type: 'open',
    text: 'What is your biggest financial fear — the thing you are most afraid of happening to your financial life?',
    options: null,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Names a specific, honest fear grounded in his actual life experience — reveals what\'s driving his financial motivation at the deepest level',
      weak: 'Says "nothing" or gives a generic answer — no financial fear awareness despite significant financial instability in his family history',
      complex: 'His father\'s financial destruction, his family\'s instability, his mother\'s sacrifice — these should produce a very specific financial fear if he\'s processed them',
    },
    redFlags: [
      'No financial fears despite living in the aftermath of financial destruction on both sides of his family',
      'Financial fear is entirely consumer-oriented ("not having nice things") rather than stability or security-oriented',
    ],
    followUp: {
      condition: 'No fear or consumer-oriented fear',
      question: 'Your dad ran out of money and options. Your family experienced what financial collapse looks like up close. What does the version of that story that involves you look like — and how do you make sure it doesn\'t happen?',
    },
  },
  {
    id: 'ms11_31',
    subsection: '11F',
    subsectionName: 'Wealth & Financial Mindset',
    type: 'slider',
    text: 'On a scale of 1–10, how financially disciplined are you right now — not in the future, today — with the money and resources you actually have?',
    options: null,
    min: 1,
    max: 10,
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: '7+ with behavioral evidence — current money behavior is consistent with stated financial goals',
      weak: '1–4 — low financial discipline at the stage where habits are formed; these patterns compound with more money',
      complex: 'Cross-reference with windfall scenario (ms11_28), first paycheck question, and money relationship answer — behavior tells the real story',
    },
    redFlags: [
      'Low financial discipline at 17 heading into college and a finance career — habits don\'t change with income, they scale',
      'High financial discipline self-rating contradicted by behavioral evidence in this section',
    ],
    followUp: {
      condition: 'Scores 1–4',
      question: 'The person who\'s going to manage Goldman Sachs clients\' portfolios at 32 — is that the same person who can\'t manage money at 17? What changes, and when?',
    },
  },
  {
    id: 'ms11_32',
    subsection: '11F',
    subsectionName: 'Wealth & Financial Mindset',
    type: 'forced_choice',
    text: 'Which best describes how you currently think about money?',
    options: [
      'Money is for spending — you can\'t take it with you',
      'Money is for security — I want to be safe and not have to worry',
      'Money is a tool — I use it to build the life and legacy I want',
      'Money is for showing — what\'s the point if people can\'t see it',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: '"Money is a tool" — instrumental relationship with money that serves wealth building and purpose',
      weak: '"Money is for spending" or "for showing" — consumption or status orientation; neither builds wealth',
      complex: '"Money is for security" is good but passive — may not produce the investment behavior needed to build meaningful wealth',
    },
    redFlags: [
      'Money is for showing — status as primary money purpose; wealth cannot accumulate when money is a signal rather than a tool',
      'Money is for spending — consumption orientation at 17 heading into a career path requiring delayed gratification',
    ],
    followUp: {
      condition: 'Selects "for spending" or "for showing"',
      question: 'The people managing the most money in finance — how do most of them think about their own money? And how does that differ from what you just said?',
    },
  },
  {
    id: 'ms11_33',
    subsection: '11F',
    subsectionName: 'Wealth & Financial Mindset',
    type: 'open',
    text: 'Compare the two paths — finance corporate track vs. sports business track — in terms of what each one means for your financial life. Income ceiling, timeline, lifestyle fit, and ability to give back. Which one actually builds the life you described in this section?',
    options: null,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can compare both paths specifically across financial dimensions — income trajectory, lifestyle compatibility, wealth-building potential; clear-eyed analysis that leads to a reasoned preference',
      weak: 'Cannot compare the paths financially — vague response or simply restates preference without financial reasoning',
      complex: 'This is the section\'s anchor question — it forces integration of everything in Section 11 with the dual-path framework from Section 10; the quality of analysis determines final career match output',
    },
    redFlags: [
      'Cannot financially compare the two career paths he is considering — career aspiration is not connected to financial modeling',
      'Compares paths only on prestige or excitement — no income, wealth-building, or lifestyle compatibility analysis',
    ],
    followUp: {
      condition: 'Response is thin or preference-based without financial reasoning',
      question: 'Let\'s be concrete — at 35, what does your net worth look like on each path? What\'s the number, and what does each path require to get there?',
    },
  },
  {
    id: 'ms11_34',
    subsection: '11A',
    subsectionName: 'Money Vision',
    type: 'slider',
    text: 'On a scale of 1–10, how connected do you feel right now between your daily behavior and the financial life you want to have?',
    options: null,
    min: 1,
    max: 10,
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: '7+ — daily behavior and financial vision are aligned; what he does today is building what he wants at 35',
      weak: '1–4 — daily behavior and financial vision are disconnected; he\'s describing a destination while walking in the wrong direction',
      complex: 'This is the section\'s north star question — the entire section builds to whether vision and behavior are connected or floating separately',
    },
    redFlags: [
      'Rates low — significant gap between described financial vision and current daily behavior',
      'Rates high but behavioral evidence across this section contradicts alignment',
    ],
    followUp: {
      condition: 'Any score',
      question: 'Name one specific thing you do today — regularly, not once — that is directly building the financial life you described. Just one.',
    },
  },
  {
    id: 'ms11_35',
    subsection: '11E',
    subsectionName: 'Family & Provider Vision',
    type: 'slider',
    text: 'On a scale of 1–10, how strong is your drive to be the financial backbone for your family — the person they can count on when things go wrong?',
    options: null,
    min: 1,
    max: 10,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: '7+ — strong provider drive; this is likely one of his deepest motivators and should be connected to career and wealth building',
      weak: '1–4 — low provider drive; inconsistent with his stated commitment to his mom; worth exploring',
      complex: 'Very high provider drive (9–10) without financial planning creates emotional burden and financial fragility; the drive needs to be paired with a plan',
    },
    redFlags: [
      'Very high provider drive with no financial plan to support it — will be overwhelmed when provider responsibilities arrive',
      'Provider drive is low or absent — inconsistent with his stated identity as his mother\'s protector and family backbone',
    ],
    followUp: {
      condition: 'Very high score (9–10) without a financial plan',
      question: 'You want to be the backbone. What does the financial architecture behind that backbone look like — specifically?',
    },
  },
  {
    id: 'ms11_36',
    subsection: '11B',
    subsectionName: 'Lifestyle Goals',
    type: 'forced_choice',
    text: 'If you had to choose one thing your money will be most known for in your life — what do you want it to be?',
    options: [
      'The way I lived — the experiences, the quality, the life I built for myself',
      'What I gave — the people I supported, the community I funded',
      'What I left — the assets, the foundation, what my kids inherit',
      'What I built — the businesses, the investments, the institutions I created',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Giving, leaving, or building — purpose-oriented money legacy that connects to his stated Oakland and OK program goals',
      weak: 'Exclusively "the way I lived" — consumer orientation as the ultimate money goal; inconsistent with generational wealth and legacy aspirations',
      complex: 'Any answer is honest data; the alignment between this answer and his stated identity is the key indicator',
    },
    redFlags: [
      'Living well is the sole legacy — entirely consumer orientation with no giving, building, or leaving component',
      'Answer contradicts his stated legacy goals around Oakland and the OK program',
    ],
    followUp: {
      condition: 'Selects "the way I lived" exclusively',
      question: 'When you\'re gone — when it\'s over — what do you want the people you leave behind to have because of you?',
    },
  },
  {
    id: 'ms11_37',
    subsection: '11C',
    subsectionName: 'Housing Vision',
    type: 'likert',
    text: 'How early do you plan to start building credit, saving a down payment, and positioning yourself to own property?',
    options: [
      'I haven\'t thought about it — that feels far away',
      'Eventually — after I get established in my career',
      'In my late 20s — I want to be ready to buy by 28–30',
      'Starting now — I know what I need to build and I\'m already setting it up',
      'Already started — I\'ve taken specific steps toward property ownership',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Already started or actively planning — property readiness is a long-term project that starts with credit and savings early',
      weak: 'Has not thought about it or planning to defer — will arrive at 28 without the credit, savings, or financial history needed for a mortgage',
      complex: 'Starting at 17–18 means arriving at Morehouse already credit-aware and savings-focused; this is the difference between buying at 28 and buying at 35',
    },
    redFlags: [
      'Property ownership is a stated goal but no steps toward credit or savings have begun',
      'Assumes property readiness will happen naturally without planning',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'To buy a home at 28, you need 3–5 years of credit history, a down payment, and a clean financial record. That clock starts now. What\'s step one?',
    },
  },
  {
    id: 'ms11_38',
    subsection: '11F',
    subsectionName: 'Wealth & Financial Mindset',
    type: 'open',
    text: 'In one paragraph, describe the full financial picture of your life at 40 — income, assets, what you own, who you support, what you\'ve built. Make it specific and make it real.',
    options: null,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Specific, multi-dimensional financial vision — income source, asset types, giving structure, property, investment base — connected to either or both career paths',
      weak: 'Vague or consumer-only ("I\'m rich, I have a nice house") — no financial architecture behind the aspiration',
      complex: 'This is the section\'s final anchor — cross-reference against every answer in Section 11 to assess coherence between vision and behavior pattern',
    },
    redFlags: [
      'Cannot produce a specific financial picture of life at 40 — vision is entirely aspirational without structure',
      'Financial picture at 40 has no connection to either career path being considered — vision floats above reality',
    ],
    followUp: {
      condition: 'Vague or consumer-only response',
      question: 'Start with your income source at 40. What are you doing, what does it pay, and what have you built with the money between 25 and 40?',
    },
  },
];

// ============================================================
// SECTION 11 SCORING CONFIGURATION
// ============================================================

export const MELVIN_SECTION_11_SCORING = {
  subsections: {
    '11A': {
      name: 'Money Vision',
      maxWeight: 11.0,
      redFlagThreshold: 2,
    },
    '11B': {
      name: 'Lifestyle Goals',
      maxWeight: 8.5,
      redFlagThreshold: 2,
    },
    '11C': {
      name: 'Housing Vision',
      maxWeight: 7.0,
      redFlagThreshold: 1,
    },
    '11D': {
      name: 'Car & Status Vision',
      maxWeight: 7.5,
      redFlagThreshold: 2,
    },
    '11E': {
      name: 'Family & Provider Vision',
      maxWeight: 10.0,
      redFlagThreshold: 2,
    },
    '11F': {
      name: 'Wealth & Financial Mindset',
      maxWeight: 13.0,
      redFlagThreshold: 2,
    },
  },

  // Path financial alignment anchors for career comparison output
  pathFinancialAlignment: {
    finance: {
      incomeTimeline: 'Entry $100–110K (IB), $150–200K by year 5, $250K+ with MD track',
      lifestyleWindow: 'Lifestyle viable from year 3–4 onward; early years require significant lifestyle restraint',
      wealthBuildingFit: 'Highest long-term wealth ceiling; requires 2–3 years of significant grind before payoff',
      providerCapability: 'Can support mom meaningfully by year 3–4; significant capacity by year 7+',
      oaklandLegacyFit: 'Financial scale enables large giving back; timeline is longer before that scale is reached',
    },
    sports: {
      incomeTimeline: 'Entry $35–55K (agency), $75–120K by year 4–5, partner track $200K+',
      lifestyleWindow: 'More balanced early lifestyle; lower starting income means slower wealth accumulation',
      wealthBuildingFit: 'Slower initial accumulation; agent/partner track can match or exceed finance at 10+ years',
      providerCapability: 'Can support mom modestly earlier; significant capacity takes longer',
      oaklandLegacyFit: 'Sports relationships + Oakland community = natural fit; giving back possible earlier through relationships vs. money',
    },
    hybrid: {
      incomeTimeline: 'Salary cap/athlete wealth: $65–90K entry, $130–180K mid, $250K+ senior',
      lifestyleWindow: 'Balanced; neither the extreme grind of IB nor the lean early years of agency',
      wealthBuildingFit: 'Strong — combines financial discipline skills with sports relationships for client acquisition',
      providerCapability: 'Mid-range timeline to meaningful provider capacity — approximately year 4–6',
      oaklandLegacyFit: 'Natural bridge — Oakland athletes need financial advisors who understand their world',
    },
  },

  globalRedFlags: [
    'Financial vision is entirely abstract with no specific numbers, timelines, or mapped career connection',
    'High status spending orientation — car, clothes, visible success — before any wealth-building foundation is established',
    'Lifestyle inflation pattern: expects to spend all income increases rather than deploy them toward wealth accumulation',
    'Father\'s financial destruction and addiction patterns not integrated into personal financial decision-making',
    'Provider intention for mom is emotionally driven with no financial plan — will create crisis when the responsibility becomes real',
    'No working knowledge of basic investment tools despite pursuing a finance career',
    'Daily behavior is completely disconnected from stated financial vision — the life described cannot be built from current patterns',
    'Legacy and giving-back goals stated as identity but absent from financial motivation and planning — purpose disconnect',
  ],

  contradictionChecks: [
    {
      id: 'contradiction_11_1',
      description: 'Wants wealth but current financial behavior is consumption-oriented with no savings or investment pattern',
      questions: ['ms11_26', 'ms11_27', 'ms11_28', 'ms11_31', 'ms11_34'],
      flag: 'Describes significant wealth goals but money doesn\'t last (ms11_26), no investment knowledge (ms11_27), windfall would be spent (ms11_28), low financial discipline (ms11_31), and daily behavior is disconnected from financial vision (ms11_34) — wealth aspiration exists only in the future tense; current behavior does not produce it',
    },
    {
      id: 'contradiction_11_2',
      description: 'Wants luxury lifestyle but avoids the discipline and timeline required to earn it',
      questions: ['ms11_07', 'ms11_04', 'ms11_09', 'ms11_17', 'ms11_18'],
      flag: 'Selects luxury or elite lifestyle goal (ms11_07) but is uncomfortable with 10–15 year delayed gratification (ms11_04), requires visible status signals (ms11_09, ms11_17), and would defer investing for lifestyle spending (ms11_18) — the lifestyle target requires the exact financial behaviors he is currently avoiding',
    },
    {
      id: 'contradiction_11_3',
      description: 'Strong provider intention for mom but no financial plan to support it alongside personal wealth building',
      questions: ['ms11_20', 'ms11_21', 'ms11_24', 'ms11_35', 'ms11_05'],
      flag: 'High provider drive for mom (ms11_35) but no specific plan (ms11_20), no awareness of the cost (ms11_21), would drain savings without exploring alternatives (ms11_24), and $800/month margin at entry income would go to spending rather than savings (ms11_05) — provider intention is emotionally real but financially unplanned; will create crisis rather than stability',
    },
    {
      id: 'contradiction_11_4',
      description: 'Father\'s financial patterns acknowledged but not integrated into financial decision-making',
      questions: ['ms11_19', 'ms11_23', 'ms11_30', 'ms11_32'],
      flag: 'Father\'s financial destruction is visible in his life history but he cannot name specific financial decisions his father\'s pattern has changed (ms11_19), it doesn\'t actively guide decisions (ms11_23), no financial fear grounded in what he witnessed (ms11_30), and money relationship does not reflect protective boundaries from observed patterns (ms11_32) — his father\'s story has not yet become a financial operating system',
    },
    {
      id: 'contradiction_11_5',
      description: 'Oakland legacy and giving-back identity stated throughout but absent from financial vision and planning',
      questions: ['ms11_29', 'ms11_33', 'ms11_15', 'ms11_36', 'ms11_06'],
      flag: 'Oakland, OK program, and 100 Black Men are stated as core identity but generational wealth is not a serious priority (ms11_29), cannot compare paths on giving-back capacity (ms11_33), Oakland relationship is undefined (ms11_15), money legacy is self-oriented rather than community-oriented (ms11_36), and financial freedom vision has no giving component (ms11_06) — the identity narrative and the financial plan are not yet the same story',
    },
  ],
};
