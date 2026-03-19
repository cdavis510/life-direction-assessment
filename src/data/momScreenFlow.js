// ============================================================
// MOM'S APP — FULL UI SCREEN FLOW
// Figma-level layout specifications
// 14 screens — design/development handoff ready
// No code — structure, hierarchy, content, and UX only
// ============================================================

export const MOM_SCREEN_FLOW = {

  // ============================================================
  // SCREEN 1: Mom Login Screen
  // ============================================================
  screen1: {
    name: 'Mom Login Screen',
    route: '/mom/login',
    purpose: 'Authenticate Mom into her dedicated experience. Separate from Mekhi and Melvin login. Feels like her own space from the first screen.',

    layout: 'Full-screen centered single-column',

    top: {
      content: [
        'App logo — top center, small',
        'Tagline beneath logo: "Your sons are growing. So are you."',
      ],
    },

    middle: {
      content: [
        'Large greeting headline: "Welcome back."',
        'Subtext: "Your dashboard and your sons\' progress are ready."',
        'Email input field',
        'Password input field',
        'Forgot password link — small, below password field',
      ],
    },

    bottom: {
      content: [
        'Primary CTA button: "Sign In"',
        'Separator line',
        'Secondary option: "First time? Set up your account" — text link',
        'Privacy note: "Your data is private and never shared with your sons."',
      ],
    },

    components: [
      'LogoHeader',
      'InputField (email)',
      'InputField (password)',
      'PrimaryButton',
      'TextLink',
      'PrivacyNote',
    ],

    cta: {
      primary: 'Sign In',
      secondary: 'Set up your account',
    },

    uxNotes: [
      'Warm but not soft — dark background with warm accent color (deep navy or charcoal + gold)',
      'No Mekhi or Melvin branding visible on this screen — this is her space',
      'Login should feel premium and intentional, not clinical',
      'Error states: inline field validation, not a modal',
      'Biometric/Face ID option if on mobile',
    ],
  },

  // ============================================================
  // SCREEN 2: Mom Dashboard
  // ============================================================
  screen2: {
    name: 'Mom Dashboard',
    route: '/mom/dashboard',
    purpose: 'Central command screen for Mom. Shows her sons\' current status, her own assessment state, relationship health indicators, and quick access to insights and actions.',

    layout: 'Scrollable single-column with card grid sections',

    top: {
      content: [
        'Personalized greeting: "Good morning, [Name]." — left aligned',
        'Date and day displayed subtly beneath greeting',
        'Notification bell icon — top right',
        'Profile avatar — top right, next to bell',
      ],
    },

    middle: {
      content: [
        '--- SECTION: Your Sons ---',
        'Two side-by-side son cards (Mekhi | Melvin)',
        'Each son card shows:',
        '  - Son name and age',
        '  - Last assessment date',
        '  - Current alignment status (color indicator: green/amber/red)',
        '  - One-line status summary: e.g. "Motivation drop flagged this week"',
        '  - Tap to expand: opens Relationship Insights for that son',

        '--- SECTION: Your Assessment ---',
        'Progress card showing Mom\'s own assessment completion status',
        'If incomplete: progress bar + "Resume Assessment" CTA',
        'If complete: overall score summary + "View Full Results" CTA',
        'Last completed date',

        '--- SECTION: This Month\'s Focus ---',
        'One highlighted action card from her 30-Day Action Plan',
        'Action title + brief description + son it relates to',
        '"View Full Plan" link',

        '--- SECTION: Relationship Health ---',
        'Two compact health cards — one per son',
        'Each shows: Communication score, Trust score, Accountability score as small bar indicators',
        'Color coded (green/amber/red)',

        '--- SECTION: Quick Actions ---',
        'Row of 3–4 icon buttons:',
        '  - Start Monthly Check-In',
        '  - View AI Coach Summary',
        '  - View Progress History',
        '  - View Blind Spots',
      ],
    },

    bottom: {
      content: [
        'Bottom navigation bar (persistent):',
        '  - Home (dashboard)',
        '  - Assessment',
        '  - Insights',
        '  - Action Plan',
        '  - Settings',
      ],
    },

    components: [
      'GreetingHeader',
      'NotificationBell',
      'SonStatusCard (x2)',
      'AssessmentProgressCard',
      'MonthlyFocusCard',
      'RelationshipHealthCard (x2)',
      'QuickActionBar',
      'BottomNavBar',
    ],

    cta: {
      primary: 'Resume Assessment / View Full Results',
      secondary: 'View Full Plan',
      tertiary: 'Quick action icons',
    },

    uxNotes: [
      'Dashboard must give her the full picture in under 10 seconds — no scrolling required for critical status',
      'Son cards are the first thing she sees — this is a son-first experience',
      'Color indicators should be clear but not alarmist — amber is "attention needed," not "emergency"',
      'If both sons are green, the dashboard should feel celebratory and calm',
      'If a flag has been triggered in either son\'s data, a banner appears at the top: "Something needs your attention"',
      'Bottom nav is persistent across all Mom screens',
    ],
  },

  // ============================================================
  // SCREEN 3: Mom Assessment Intro
  // ============================================================
  screen3: {
    name: 'Mom Assessment Intro',
    route: '/mom/assessment/intro',
    purpose: 'Set the tone for the assessment. Prepare Mom emotionally and practically. Establish trust, honesty, and purpose before the first question.',

    layout: 'Full-screen centered single-column — vertical scroll',

    top: {
      content: [
        'Back arrow — top left',
        'Screen label — small caps: "YOUR ASSESSMENT"',
      ],
    },

    middle: {
      content: [
        'Large headline: "This is for you."',
        'Subheadline: "Not a test. Not a judgment. A mirror."',
        'Paragraph block:',
        '  "This assessment is designed to help you see yourself clearly as a parent — what you\'re doing well, where your blind spots are, and what your sons need from you right now."',
        '  "There are no right answers. There are only honest ones."',
        '  "The more honestly you answer, the more useful your results will be."',

        'Divider',

        'What to expect — 3 bullet cards:',
        '  Card 1: "12 sections covering your communication, relationship, accountability, and more"',
        '  Card 2: "35–50 minutes total. You can pause and return at any time."',
        '  Card 3: "Your results are private. Your sons will never see your answers."',

        'Divider',

        'Tone-setting statement:',
        '"You are already doing something remarkable by being here. The goal is not to be a perfect parent. The goal is to be the parent your sons need right now."',
      ],
    },

    bottom: {
      content: [
        'Primary CTA: "Start Assessment"',
        'Secondary CTA: "Resume where I left off" (conditional — shows only if prior session exists)',
        'Small text: "Your progress saves automatically."',
      ],
    },

    components: [
      'BackArrow',
      'HeadlineBlock',
      'ParagraphBlock',
      'InfoCard (x3)',
      'ToneStatement',
      'PrimaryButton',
      'SecondaryButton (conditional)',
    ],

    cta: {
      primary: 'Start Assessment',
      secondary: 'Resume where I left off',
    },

    uxNotes: [
      'This screen is emotionally important — it sets the tone for everything that follows',
      'Language must be warm but serious — not therapy-speak, not corporate',
      'No son photos or son names on this screen — this moment is about her',
      'Calm, grounded visual design — dark background, clean typography, generous white space',
      'If this is a return visit: lead with "Welcome back" and show progress visually',
    ],
  },

  // ============================================================
  // SCREEN 4: Mom Question Screen
  // ============================================================
  screen4: {
    name: 'Mom Question Screen',
    route: '/mom/assessment/question/:id',
    purpose: 'Deliver each assessment question in a clean, focused, distraction-free format. Support all question types (Likert, slider, forced choice, open).',

    layout: 'Full-screen — question centered, answer below, progress top',

    top: {
      content: [
        'Progress bar — full width, top of screen',
        'Section label — small caps beneath bar: e.g. "SECTION 3 — COMMUNICATION STYLE"',
        'Subsection label: e.g. "Listening Quality"',
        'Question number: "Question 14 of 38"',
        'Exit/pause icon — top right (saves progress)',
      ],
    },

    middle: {
      content: [
        'Question text — large, centered, generous line height',
        'Answer component based on question type:',
        '',
        '  TYPE: Likert',
        '  5 vertically stacked option cards',
        '  Each card: full-width tap target, option text left-aligned',
        '  Selected state: accent color border + filled background',
        '',
        '  TYPE: Slider',
        '  Label: "1 = [weak anchor]   10 = [strong anchor]"',
        '  Large horizontal slider with number display',
        '  Current value displayed prominently above slider',
        '',
        '  TYPE: Forced Choice',
        '  4 vertically stacked option cards',
        '  Same tap-target treatment as Likert',
        '',
        '  TYPE: Open',
        '  Multiline text input',
        '  Character count displayed below field',
        '  Placeholder: "Be honest — this is only for you."',
        '',
        'Follow-up question area (conditional):',
        '  Appears below answer after selection if follow-up is triggered',
        '  Subtle visual separation (divider + slight background shift)',
        '  Follow-up label: "One more thing —"',
        '  Follow-up question text',
        '  Open text input for follow-up response',
      ],
    },

    bottom: {
      content: [
        'Primary CTA: "Next Question" — activates after answer is selected',
        'Back link — small, left: "Previous question"',
        'Skip option — small, right: "Skip" (for open questions only)',
      ],
    },

    components: [
      'ProgressBar',
      'SectionLabel',
      'QuestionText',
      'LikertOptions',
      'SliderInput',
      'ForcedChoiceOptions',
      'OpenTextInput',
      'FollowUpBlock (conditional)',
      'NavigationFooter',
    ],

    cta: {
      primary: 'Next Question',
      secondary: 'Previous question',
      tertiary: 'Skip (open questions only)',
    },

    uxNotes: [
      'One question per screen — never stack multiple questions',
      'Answer must be required before Next activates (except open + skip)',
      'Transition between questions: smooth fade or slide — not jarring',
      'Follow-up appears with a subtle animation — not abrupt',
      'Progress bar fills in real time as questions are answered',
      'Auto-save on every answer — no data loss on exit',
      'Open question keyboard: full-screen keyboard with done button',
      'Accessibility: minimum 44px tap targets on all answer options',
    ],
  },

  // ============================================================
  // SCREEN 5: Mom Break Screen
  // ============================================================
  screen5: {
    name: 'Mom Break Screen',
    route: '/mom/assessment/break',
    purpose: 'Appear between major sections to give Mom a moment to breathe, see her progress, and re-center before continuing.',

    layout: 'Full-screen centered — minimal content, maximum white space',

    top: {
      content: [
        'Section completion indicator: "Section 3 Complete"',
        'Overall progress visual: e.g. "3 of 12 sections done"',
        'Simple circular or linear progress ring',
      ],
    },

    middle: {
      content: [
        'Large acknowledgment headline — rotates per section completed:',
        '  After Section 1: "You\'re seeing clearly."',
        '  After Section 3: "The honest answers are the useful ones."',
        '  After Section 6: "You\'re past the halfway point."',
        '  After Section 9: "Almost there. The hardest part is behind you."',
        '',
        'Brief section summary — 1–2 sentences on what was just covered:',
        '  e.g. "You just completed the Communication Style section. Your answers will help us identify how your sons experience your conversations."',
        '',
        'What\'s next — next section name and brief description:',
        '  e.g. "Next: Boundaries — how your personal limits affect your sons\' independence."',
        '',
        'Optional: Breathing moment prompt:',
        '  "Take a breath. Refill your water. Come back when you\'re ready."',
      ],
    },

    bottom: {
      content: [
        'Primary CTA: "Continue Assessment"',
        'Secondary CTA: "Save and take a break" — saves progress, exits to dashboard',
      ],
    },

    components: [
      'SectionCompleteIndicator',
      'ProgressRing',
      'AcknowledgmentHeadline',
      'SectionSummaryText',
      'NextSectionPreview',
      'BreathingPrompt',
      'PrimaryButton',
      'SecondaryButton',
    ],

    cta: {
      primary: 'Continue Assessment',
      secondary: 'Save and take a break',
    },

    uxNotes: [
      'This screen must feel like a genuine pause — not a loading screen',
      'Tone is warm and grounding — she has been doing something hard',
      'No data, no scores, no previews of results — just acknowledgment and forward momentum',
      'Visual design: calm — minimal elements, generous space, soft animation on progress ring',
      'If she exits here, dashboard shows "Resume Assessment" CTA with section progress shown',
      'Break screen appears after every 2 sections or at natural emotional pivot points',
    ],
  },

  // ============================================================
  // SCREEN 6: Mom Results Main Screen
  // ============================================================
  screen6: {
    name: 'Mom Results Main Screen',
    route: '/mom/results',
    purpose: 'The primary results landing screen. Gives Mom a complete overview of her assessment results before she dives into specific insight categories.',

    layout: 'Scrollable single-column — card-based sections with strong hierarchy',

    top: {
      content: [
        'Results header: "Your Results Are Ready"',
        'Subtext: "Based on your answers — here is what we found."',
        'Completion date — small, beneath subtext',
      ],
    },

    middle: {
      content: [
        '--- SECTION: Overall Profile ---',
        'Large headline profile label — e.g. "The Committed Protector" or "The Emotionally Present Parent"',
        '2–3 sentence profile summary that captures her dominant parenting style',
        '',
        '--- SECTION: Score Overview ---',
        'Score card grid (2-column):',
        '  - Relationship Score (Mekhi)',
        '  - Relationship Score (Melvin)',
        '  - Communication Score',
        '  - Emotional Support Score',
        '  - Accountability Score',
        '  - Consistency Score',
        'Each card: score number + label + color indicator',
        '',
        '--- SECTION: Strengths Snapshot ---',
        'Header: "What You\'re Doing Right"',
        '3 strength pills/tags displayed horizontally',
        '"See Full Strengths" link',
        '',
        '--- SECTION: Patterns to Address ---',
        'Header: "What Needs Your Attention"',
        '3 pattern pills/tags in amber — not red, not alarming',
        '"See Full Blind Spots" link',
        '',
        '--- SECTION: Navigate Your Results ---',
        'Grid of 6 insight navigation cards:',
        '  1. Relationship Insights',
        '  2. Communication Insights',
        '  3. Blind Spots',
        '  4. What Each Son Needs',
        '  5. 30-Day Action Plan',
        '  6. AI Coach Summary',
        'Each card: icon + title + one-line description + arrow',
      ],
    },

    bottom: {
      content: [
        'Primary CTA: "Start With My Action Plan"',
        'Secondary: "View AI Coach Summary"',
        'Bottom nav (persistent)',
      ],
    },

    components: [
      'ResultsHeader',
      'ProfileLabel',
      'ProfileSummary',
      'ScoreCardGrid',
      'StrengthsPills',
      'PatternPills',
      'InsightNavigationGrid',
      'PrimaryButton',
      'SecondaryButton',
      'BottomNavBar',
    ],

    cta: {
      primary: 'Start With My Action Plan',
      secondary: 'View AI Coach Summary',
    },

    uxNotes: [
      'This is the most important screen in the Mom experience — it must feel worth the time investment',
      'Profile label should feel earned and specific — not generic',
      'Score cards use color but not shame — amber is "developing," not "failing"',
      'Strengths come BEFORE patterns — lead with what she\'s doing right',
      'Navigation cards should feel like doors opening, not a checklist',
      'Confetti or subtle celebration animation on first arrival at results',
      'Results are persistent — she can return to this screen at any time',
    ],
  },

  // ============================================================
  // SCREEN 7: Mom Relationship Insights Screen
  // ============================================================
  screen7: {
    name: 'Mom Relationship Insights Screen',
    route: '/mom/results/relationships',
    purpose: 'Deep dive into her relationship quality with each son — separately. What she knows, what she\'s missing, what\'s working, and what needs to shift.',

    layout: 'Tab-based layout — Mekhi tab | Melvin tab — scrollable per tab',

    top: {
      content: [
        'Back arrow — returns to Results Main',
        'Screen title: "Relationship Insights"',
        'Tab bar: "Mekhi" | "Melvin" — full width, toggle between sons',
      ],
    },

    middle: {
      content: [
        '--- PER SON TAB (identical structure, different content) ---',
        '',
        'Relationship Score Card — large, top of tab',
        '  Score: X/10',
        '  Label: e.g. "Strong Connection — Visibility Gap"',
        '  2-sentence summary of what this score means',
        '',
        'Subsection scores — 4 compact horizontal bars:',
        '  - How Well She Knows Him: X/10',
        '  - Emotional Connection: X/10',
        '  - Her Response to His Struggles: X/10',
        '  - Pride vs. Pressure: X/10',
        '',
        'What\'s Working card:',
        '  Header: "What\'s Working"',
        '  2–3 bullet points — specific to this son',
        '',
        'What Needs Attention card:',
        '  Header: "Where to Focus"',
        '  2–3 bullet points — specific to this son',
        '  Language: constructive, not critical',
        '',
        'Insight card: "What He\'s Not Telling You"',
        '  Based on son\'s assessment data (fed from Mekhi/Melvin results)',
        '  Emotionally honest — what her son\'s patterns suggest he\'s suppressing',
        '',
        'One Action card:',
        '  Header: "One Thing to Try This Week"',
        '  Single specific action for this son',
        '  Duration estimate: e.g. "Takes 10 minutes"',
      ],
    },

    bottom: {
      content: [
        'CTA: "Add This to My Action Plan"',
        'Link: "Back to Results"',
        'Bottom nav (persistent)',
      ],
    },

    components: [
      'BackArrow',
      'TabBar (Mekhi | Melvin)',
      'RelationshipScoreCard',
      'SubsectionScoreBars',
      'WhatsWorkingCard',
      'FocusAreaCard',
      'InsightCard',
      'OneActionCard',
      'PrimaryButton',
      'BottomNavBar',
    ],

    cta: {
      primary: 'Add This to My Action Plan',
      secondary: 'Back to Results',
    },

    uxNotes: [
      'Tab switch must be smooth — content loads instantly, no spinner',
      'Each son\'s data is visually distinct — subtle color difference per son if helpful',
      '"What He\'s Not Telling You" card is the most emotionally powerful card on this screen — treat it carefully in copy and design',
      'Insight cards should feel like a trusted friend speaking, not a report',
      'One Action card must be genuinely specific — not "spend more time with him"',
    ],
  },

  // ============================================================
  // SCREEN 8: Mom Communication Insights Screen
  // ============================================================
  screen8: {
    name: 'Mom Communication Insights Screen',
    route: '/mom/results/communication',
    purpose: 'Show her how she communicates, what\'s working, what\'s shutting her sons down, and how to adapt her style for each son.',

    layout: 'Scrollable single-column — section cards stacked',

    top: {
      content: [
        'Back arrow',
        'Screen title: "Communication Insights"',
        'Subtext: "How your sons experience your conversations."',
      ],
    },

    middle: {
      content: [
        'Communication Style Profile Card:',
        '  Style label: e.g. "The Protector Communicator" or "The Directive Parent"',
        '  3-sentence profile description',
        '  Communication Score: X/10',
        '',
        'Subsection Score Cards — 4 cards in 2x2 grid:',
        '  - Default Communication Style: X/10',
        '  - Listening Quality: X/10',
        '  - Communication Under Stress: X/10',
        '  - Son-Specific Adaptation: X/10',
        '',
        'Communication Strengths card:',
        '  Header: "Where You Connect"',
        '  2–3 specific strengths from her communication patterns',
        '',
        'Communication Risks card:',
        '  Header: "What Might Be Closing Them Down"',
        '  2–3 specific patterns — language is neutral and practical',
        '',
        'Son-Specific Guidance — two stacked cards:',
        '  Card 1 — Mekhi:',
        '    "With Mekhi, try:" + 2 specific communication adjustments',
        '  Card 2 — Melvin:',
        '    "With Melvin, try:" + 2 specific communication adjustments',
        '',
        'What To Stop card:',
        '  Header: "Stop Doing This"',
        '  1–2 direct, specific communication behaviors to discontinue',
        '  Framed constructively — not as criticism',
        '',
        'What To Start card:',
        '  Header: "Start Doing This"',
        '  1–2 specific new communication behaviors to adopt',
      ],
    },

    bottom: {
      content: [
        'CTA: "Add Communication Goals to My Plan"',
        'Bottom nav (persistent)',
      ],
    },

    components: [
      'BackArrow',
      'CommunicationProfileCard',
      'SubsectionScoreGrid',
      'StrengthsCard',
      'RisksCard',
      'SonSpecificGuidanceCard (x2)',
      'StopDoingCard',
      'StartDoingCard',
      'PrimaryButton',
      'BottomNavBar',
    ],

    cta: {
      primary: 'Add Communication Goals to My Plan',
    },

    uxNotes: [
      '"Stop Doing This" card must be framed carefully — direct but not shaming',
      'Son-specific guidance cards are the highest-value content on this screen — make them prominent',
      'Communication style profile should feel accurate and recognizable — not generic',
      'Visual: warm neutral palette — this content can trigger defensiveness; design should soften that',
    ],
  },

  // ============================================================
  // SCREEN 9: Mom Blind Spots Screen
  // ============================================================
  screen9: {
    name: 'Mom Blind Spots Screen',
    route: '/mom/results/blind-spots',
    purpose: 'Surface the patterns she cannot see herself — what she is doing that undermines her goals, how she is unintentionally affecting her sons, and where she has the highest-leverage opportunity to grow.',

    layout: 'Scrollable single-column — high-impact card design',

    top: {
      content: [
        'Back arrow',
        'Screen title: "Your Blind Spots"',
        'Subtext: "The patterns that are hardest to see from the inside."',
        'Tone-setting note: "This section is the most valuable part of your results. Read it without judgment."',
      ],
    },

    middle: {
      content: [
        'Primary Blind Spot Card — large, featured:',
        '  Header: "Your Biggest Blind Spot Right Now"',
        '  Large bold label: e.g. "Rescue Before Consequence"',
        '  3–4 sentence explanation of what this pattern is and how it shows up',
        '  Impact statement: "How this is likely affecting [Mekhi/Melvin/both]"',
        '  One shift: "What to try instead"',
        '',
        'Secondary Blind Spots — 2–3 compact cards stacked:',
        '  Each card:',
        '    - Pattern name',
        '    - 2-sentence description',
        '    - Which son it primarily affects (or both)',
        '    - One small action',
        '',
        'Enabling Risk Card (conditional — shows if enabling risk score is high):',
        '  Header: "Enabling Alert"',
        '  Amber visual treatment',
        '  Specific description of enabling pattern detected',
        '  3 specific steps to shift toward empowering',
        '',
        'Parenting Blind Spot vs. Strength comparison:',
        '  Side-by-side visual:',
        '    Left: "What You Think You\'re Doing" — e.g. "Protecting them"',
        '    Right: "What They May Be Experiencing" — e.g. "Being rescued from things they need to face"',
        '  This comparison must feel honest, not harsh',
        '',
        'Reframe card at bottom:',
        '  "A blind spot is not a failure. It\'s a place where your love hasn\'t caught up with what they need yet."',
      ],
    },

    bottom: {
      content: [
        'CTA: "Add This to My 30-Day Plan"',
        'Link: "Back to Results"',
        'Bottom nav (persistent)',
      ],
    },

    components: [
      'BackArrow',
      'ToneNote',
      'PrimaryBlindSpotCard',
      'SecondaryBlindSpotCard (x2–3)',
      'EnablingAlertCard (conditional)',
      'ComparisonVisual',
      'ReframeCard',
      'PrimaryButton',
      'BottomNavBar',
    ],

    cta: {
      primary: 'Add This to My 30-Day Plan',
      secondary: 'Back to Results',
    },

    uxNotes: [
      'This is the most emotionally sensitive screen in the app — design must prevent defensiveness',
      'Amber (not red) for alert states — never shame language',
      'Tone-setting note at top is non-negotiable — sets her emotional frame before reading',
      'Reframe card at bottom closes the screen on an empowering note',
      'Primary blind spot card should have the most visual weight — it is the most actionable finding',
      'Enabling alert card appears only if score threshold is met — not shown for everyone',
    ],
  },

  // ============================================================
  // SCREEN 10: Mom What Each Son Needs Screen
  // ============================================================
  screen10: {
    name: 'Mom What Each Son Needs Screen',
    route: '/mom/results/son-needs',
    purpose: 'Give Mom a clear, specific picture of what each son needs from her right now — based on their assessment results and her own patterns. The most practically useful screen in the app.',

    layout: 'Tab-based — Mekhi | Melvin — scrollable per tab',

    top: {
      content: [
        'Back arrow',
        'Screen title: "What Each Son Needs"',
        'Subtext: "Based on their assessment and yours — here is what matters most right now."',
        'Tab bar: "Mekhi" | "Melvin"',
      ],
    },

    middle: {
      content: [
        '--- PER SON TAB ---',
        '',
        'Son status summary card:',
        '  Son name + current alignment status',
        '  One-line summary of where he is right now',
        '  e.g. "Mekhi is motivated but avoiding structure. He needs direction, not rescue."',
        '',
        'What He Needs Most — top 3 cards, stacked:',
        '  Each card:',
        '    - Need category label: e.g. "Accountability Without Shame"',
        '    - 2–3 sentence explanation of why he needs this specifically',
        '    - What it looks like in practice: 1–2 specific examples',
        '',
        'What He Does NOT Need From You — compact card:',
        '  Header: "What to Ease Back On"',
        '  2–3 specific behaviors to reduce or stop — with brief rationale',
        '  Framed gently: "This doesn\'t mean you stop caring — it means you care differently."',
        '',
        'How to Approach Him — tactical card:',
        '  Header: "How to Talk to Him Right Now"',
        '  3–4 specific sentence starters or communication approaches',
        '  e.g. "Instead of \'Why haven\'t you done X,\' try \'What\'s getting in the way of X?\'"',
        '',
        'Warning Signs to Watch — compact card:',
        '  3 specific behavioral signals to monitor',
        '  Each with: what it looks like + what it may mean + how to respond',
        '',
        'When to Step In vs. Step Back — visual decision guide:',
        '  Two columns: "Step In When..." | "Step Back When..."',
        '  3 examples per column — specific to this son',
      ],
    },

    bottom: {
      content: [
        'CTA: "Add to My Action Plan"',
        'Link: "See His Full Assessment Summary" (if Mom has access)',
        'Bottom nav (persistent)',
      ],
    },

    components: [
      'BackArrow',
      'TabBar (Mekhi | Melvin)',
      'SonStatusCard',
      'NeedCard (x3)',
      'EaseBackCard',
      'CommunicationApproachCard',
      'WarningSigns Card',
      'StepInStepBackGuide',
      'PrimaryButton',
      'BottomNavBar',
    ],

    cta: {
      primary: 'Add to My Action Plan',
      secondary: 'See His Full Assessment Summary',
    },

    uxNotes: [
      'This is the screen Mom will return to most often — design for re-readability',
      '"What He Does NOT Need" card is sensitive — must not read as criticism of her love',
      'Communication approach card should have real, specific sentences she can actually say',
      'Step In vs. Step Back guide is the highest-utility element on this screen — make it scannable',
      'Warning signs must be practical and behavioral — not vague emotional states',
    ],
  },

  // ============================================================
  // SCREEN 11: Mom 30-Day Action Plan Screen
  // ============================================================
  screen11: {
    name: 'Mom 30-Day Action Plan Screen',
    route: '/mom/action-plan',
    purpose: 'Translate all insights into a concrete, weekly action plan for the next 30 days. One screen she can return to daily to stay on track.',

    layout: 'Scrollable single-column — week-by-week accordion structure',

    top: {
      content: [
        'Back arrow',
        'Screen title: "Your 30-Day Plan"',
        'Subtext: "Small, specific actions — one month at a time."',
        'Current week indicator: "Week 2 of 4" + progress bar',
        'Month label: e.g. "March 2026"',
      ],
    },

    middle: {
      content: [
        'This Month\'s Focus card — top, pinned:',
        '  One headline theme for the month',
        '  e.g. "This month: Listening before responding"',
        '  Brief rationale — why this month, why this focus',
        '',
        '--- WEEK 1 CARD (Awareness) ---',
        'Header: "Week 1 — Observe"',
        'Focus description: "Observe without changing. Notice your patterns this week."',
        'Action items — 3 stacked cards:',
        '  - Mekhi action: specific + time estimate',
        '  - Melvin action: specific + time estimate',
        '  - Self action: specific + time estimate',
        'Checkbox per item — tap to mark complete',
        '',
        '--- WEEK 2 CARD (Conversation) ---',
        'Header: "Week 2 — One Conversation"',
        'Focus: highest-priority unfinished or needed conversation',
        'Conversation target: which son, what topic, suggested framing',
        '3 action items with checkboxes',
        '',
        '--- WEEK 3 CARD (Shift) ---',
        'Header: "Week 3 — Shift One Pattern"',
        'Focus: single most impactful behavior to change',
        'Pattern description + specific replacement behavior',
        '3 action items with checkboxes',
        '',
        '--- WEEK 4 CARD (Review) ---',
        'Header: "Week 4 — Review and Reset"',
        'Reflection prompts — 3 questions:',
        '  "What did I notice about Mekhi this month?"',
        '  "What did I notice about Melvin this month?"',
        '  "What did I learn about myself?"',
        'Text input for each prompt (saved to progress history)',
        '',
        'Next Month Preview card:',
        '  Header: "Next Month\'s Focus"',
        '  Brief description of what month 2 will build on',
      ],
    },

    bottom: {
      content: [
        'CTA: "Mark This Week Complete"',
        'Secondary: "Adjust My Plan" (opens edit/feedback flow)',
        'Bottom nav (persistent)',
      ],
    },

    components: [
      'BackArrow',
      'WeekIndicator',
      'ProgressBar',
      'MonthFocusCard',
      'WeekCard (x4)',
      'ActionItem with Checkbox (x3 per week)',
      'ReflectionPrompt (x3 in Week 4)',
      'NextMonthPreviewCard',
      'PrimaryButton',
      'SecondaryButton',
      'BottomNavBar',
    ],

    cta: {
      primary: 'Mark This Week Complete',
      secondary: 'Adjust My Plan',
    },

    uxNotes: [
      'This is her most-used screen — design for daily return visits',
      'Completed items should visually check off and not disappear — she should see her progress',
      'Week cards are accordion-style — current week expanded, past weeks collapsed',
      'Adjust My Plan allows her to swap or modify actions if life changed — prevents plan abandonment',
      'Week 4 reflection inputs are saved and appear in Progress History',
      'Notification system should ping her midweek if no items have been checked',
    ],
  },

  // ============================================================
  // SCREEN 12: Mom AI Coach Summary Screen
  // ============================================================
  screen12: {
    name: 'Mom AI Coach Summary Screen',
    route: '/mom/coach-summary',
    purpose: 'The AI-generated analysis — a personal, direct, emotionally intelligent summary written specifically for her. The closest thing to a professional insight session.',

    layout: 'Full-screen scrollable — long-form reading layout',

    top: {
      content: [
        'Back arrow',
        'Screen title: "Your Coach Summary"',
        'Subtext: "A personal analysis based on everything you shared."',
        'Generation date + "Updated after each assessment"',
      ],
    },

    middle: {
      content: [
        'AI Coach intro — 2 sentences:',
        '  First-person voice, warm but direct',
        '  e.g. "Based on everything you shared, here is what stands out — the truth about where you are, what your sons need, and what this next season of parenting requires from you."',
        '',
        'Section: "Who You Are as a Parent Right Now"',
        '  3–4 paragraph honest profile — not generic',
        '  Names her strengths and the patterns getting in the way',
        '  References her specific answers where relevant',
        '',
        'Section: "What Mekhi Needs From You — Right Now"',
        '  2–3 paragraphs specific to Mekhi\'s current state',
        '  Cross-referenced with Mekhi\'s own assessment if available',
        '',
        'Section: "What Melvin Needs From You — Right Now"',
        '  2–3 paragraphs specific to Melvin\'s transition state',
        '  Direct about the Morehouse transition, basketball ending, dependency risk',
        '',
        'Section: "What You Need to Stop"',
        '  3–5 named behaviors — direct, specific, no softening',
        '',
        'Section: "What You Need to Start"',
        '  3–5 named behaviors or approaches — specific and actionable',
        '',
        'Section: "What the Next 90 Days Require"',
        '  High-level guidance on her parenting focus for the next quarter',
        '  Connected to where each son is in their journey',
        '',
        'Closing paragraph — written directly to her:',
        '  Acknowledges the difficulty of what she is doing',
        '  Connects her effort to her sons\' future',
        '  Ends on purpose, not sentiment',
      ],
    },

    bottom: {
      content: [
        'CTA: "Save to My Dashboard"',
        'Secondary: "Share with a Trusted Person" (optional export)',
        'Tertiary: "Regenerate Summary" (after new assessment)',
        'Bottom nav (persistent)',
      ],
    },

    components: [
      'BackArrow',
      'CoachIntroBlock',
      'NarrativeSectionBlock (x6)',
      'ClosingBlock',
      'PrimaryButton',
      'SecondaryButton',
      'TertiaryButton',
      'BottomNavBar',
    ],

    cta: {
      primary: 'Save to My Dashboard',
      secondary: 'Regenerate Summary',
    },

    uxNotes: [
      'This is the highest-value screen in the entire Mom experience — it must feel worth everything she put in',
      'Typography must support long-form reading — generous line height, readable size, comfortable margins',
      'AI voice: direct, warm, honest — not clinical, not therapy-speak, not generic',
      'Names are used in the copy — personalized feels personal',
      'Loading state: "Generating your summary..." with subtle animation — do not rush this moment',
      'Share option should export as PDF or text — not to social media',
      'Regenerate only available after a new assessment is completed — not on demand',
    ],
  },

  // ============================================================
  // SCREEN 13: Mom Monthly Check-In Screen
  // ============================================================
  screen13: {
    name: 'Mom Monthly Check-In Screen',
    route: '/mom/check-in',
    purpose: 'A short monthly touchpoint (10–15 minutes) that tracks changes in her sons\' behavior and her own parenting patterns — without requiring a full reassessment.',

    layout: 'Full-screen scrollable — short-form question flow within a single screen',

    top: {
      content: [
        'Back arrow',
        'Screen title: "Monthly Check-In"',
        'Subtext: "A quick pulse check. 10–15 minutes."',
        'Month label + check-in number: e.g. "March 2026 — Check-In #2"',
        'Progress bar — fills as she answers',
      ],
    },

    middle: {
      content: [
        '--- SECTION: This Month With Mekhi ---',
        'Header: "Mekhi — This Month"',
        '4–5 quick questions about Mekhi:',
        '  - Communication frequency/quality (Likert)',
        '  - Any notable behavior changes (forced choice)',
        '  - One thing that went well (open)',
        '  - One thing that was hard (open)',
        '  - Accountability: did you follow through on last month\'s Mekhi action? (Yes/Partially/No)',
        '',
        '--- SECTION: This Month With Melvin ---',
        'Same structure as Mekhi section',
        '',
        '--- SECTION: Your Parenting This Month ---',
        '3 reflection questions:',
        '  - Communication adjustment attempted (yes/no + brief note)',
        '  - Blind spot awareness moment this month (open)',
        '  - Self-care/support: did you take care of yourself this month? (Likert)',
        '',
        '--- SECTION: Flags ---',
        'Three quick yes/no questions:',
        '  "Is anything urgent happening with Mekhi that needs attention?"',
        '  "Is anything urgent happening with Melvin that needs attention?"',
        '  "Are you feeling overwhelmed or burned out as a parent right now?"',
        '  (Yes answers trigger a flag in the dashboard and a specific AI response)',
        '',
        'Summary preview — appears after all questions answered:',
        '  Brief auto-generated paragraph: "This month you noticed..."',
        '  Changes in scores vs. last month (up/down indicators)',
      ],
    },

    bottom: {
      content: [
        'CTA: "Submit Check-In"',
        'Secondary: "Save Draft"',
        'Bottom nav (persistent)',
      ],
    },

    components: [
      'BackArrow',
      'ProgressBar',
      'CheckInSectionHeader',
      'LikertQuestion',
      'ForcedChoiceQuestion',
      'OpenTextQuestion',
      'YesNoQuestion',
      'FlagQuestion',
      'SummaryPreviewBlock',
      'PrimaryButton',
      'SecondaryButton',
      'BottomNavBar',
    ],

    cta: {
      primary: 'Submit Check-In',
      secondary: 'Save Draft',
    },

    uxNotes: [
      'Check-in must feel lighter than the full assessment — shorter questions, more space, faster flow',
      'Flag questions are the most important — they trigger dashboard alerts and AI responses',
      'Summary preview after completion gives her immediate feedback before she exits',
      'Check-in data is saved to Progress History for trend tracking',
      'Notification reminder sent on the 1st of each month: "Your monthly check-in is ready"',
      'If she misses a month, a gentle catch-up prompt appears on her next login',
    ],
  },

  // ============================================================
  // SCREEN 14: Mom Progress History Screen
  // ============================================================
  screen14: {
    name: 'Mom Progress History Screen',
    route: '/mom/progress',
    purpose: 'Show Mom her growth over time — how scores have changed, what patterns have shifted, and evidence that what she is doing is working.',

    layout: 'Scrollable single-column — timeline + chart sections',

    top: {
      content: [
        'Back arrow',
        'Screen title: "Your Progress"',
        'Subtext: "A record of your growth — and theirs."',
        'Date range selector: "Last 3 months" | "Last 6 months" | "All time"',
      ],
    },

    middle: {
      content: [
        '--- SECTION: Score Trends ---',
        'Line chart or bar chart — score movement over time:',
        '  Toggle between: Communication | Accountability | Relationship (Mekhi) | Relationship (Melvin)',
        '  X-axis: months',
        '  Y-axis: score (1–10)',
        '  Visual trend: up = green, down = amber',
        '',
        '--- SECTION: Assessment History ---',
        'Timeline list — each assessment or check-in:',
        '  Date + type (Full Assessment / Monthly Check-In)',
        '  Key score snapshot',
        '  Tap to expand: shows that session\'s scores and AI summary excerpt',
        '',
        '--- SECTION: Action Plan History ---',
        'Monthly action plan completion records:',
        '  Month + completion percentage (how many items checked off)',
        '  Reflection notes from Week 4 of each month (if entered)',
        '  Expandable per month',
        '',
        '--- SECTION: Growth Moments ---',
        'Auto-generated highlights — notable improvements flagged by the system:',
        '  e.g. "March: Your communication score with Mekhi improved 2 points"',
        '  e.g. "February: You completed all 12 action items this month"',
        '  Displayed as achievement-style cards — small celebration',
        '',
        '--- SECTION: Consistency Streak ---',
        'Monthly check-in streak indicator:',
        '  e.g. "4 months in a row — consistent"',
        '  Simple visual streak counter',
      ],
    },

    bottom: {
      content: [
        'CTA: "Start This Month\'s Check-In"',
        'Secondary: "Export My Progress" (PDF)',
        'Bottom nav (persistent)',
      ],
    },

    components: [
      'BackArrow',
      'DateRangeSelector',
      'ScoreTrendChart',
      'ChartToggle',
      'AssessmentTimelineList',
      'AssessmentDetailExpander',
      'ActionPlanHistoryList',
      'GrowthMomentCard',
      'ConsistencyStreakIndicator',
      'PrimaryButton',
      'SecondaryButton',
      'BottomNavBar',
    ],

    cta: {
      primary: 'Start This Month\'s Check-In',
      secondary: 'Export My Progress',
    },

    uxNotes: [
      'This screen must make her feel like her effort is visible and accumulating',
      'Growth Moments are critical — the system must celebrate progress, not just flag problems',
      'Chart design must be clean and readable — not data-heavy or overwhelming',
      'Reflection notes from Week 4 appearing here closes the loop between planning and reflection',
      'Export option lets her share progress with a therapist, mentor, or trusted person if she chooses',
      'Empty state (first visit): "Your history starts after your first check-in. Come back next month." + encouragement',
      'Streak counter resets if a month is skipped — but shows prior streak so she can rebuild',
    ],
  },
};
