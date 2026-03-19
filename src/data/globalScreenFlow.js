// ============================================================
// GLOBAL SYSTEM SCREEN FLOW — Full App
// All 3 users: Mom / Mekhi / Melvin / Admin
// 16 screen definitions — design/development handoff ready
// No code — structure, routing, access, components only
// ============================================================

export const GLOBAL_SCREEN_FLOW = {

  // ============================================================
  // SCREEN 1: Welcome Home Page
  // ============================================================
  screen1: {
    name: 'Welcome Home Page',
    route: '/',
    purpose: 'First impression. Sets the tone for the entire app. Converts a new visitor into a user and routes returning users to login. Must communicate seriousness, purpose, and premium quality in under 5 seconds.',
    access: ['Public — no auth required'],

    layout: 'Full-screen hero — single column, centered content, scroll-optional',

    top: {
      content: [
        'App logo — top left',
        'Nav bar — top right: "Sign In" link only (no clutter)',
      ],
    },

    middle: {
      content: [
        'Hero headline — large, bold, centered:',
        '  "Know where you\'re going. Know who you\'re becoming."',
        '',
        'Subheadline:',
        '  "A private assessment system for your family — built around real goals, real behavior, and real growth."',
        '',
        'Three value proposition cards — horizontal row:',
        '  Card 1: "For Mekhi" — icon + 1-line: "Your path. Your goals. Your blueprint."',
        '  Card 2: "For Melvin" — icon + 1-line: "Two paths. One decision. Full picture."',
        '  Card 3: "For Mom" — icon + 1-line: "Stronger support. Clearer vision. Better communication."',
        '',
        'Social proof or trust line (optional):',
        '  "Private. Secure. Built for your family only."',
      ],
    },

    bottom: {
      content: [
        'Primary CTA: "Get Started" — routes to User Role Selection',
        'Secondary CTA: "Sign In" — routes to Main Login Screen',
        'Small text: "Already have an account? Sign in above."',
      ],
    },

    components: [
      'AppLogo',
      'NavBar (minimal)',
      'HeroHeadline',
      'SubHeadline',
      'ValuePropCard (x3)',
      'TrustLine',
      'PrimaryButton',
      'SecondaryButton',
    ],

    cta: {
      primary: 'Get Started → /role-select',
      secondary: 'Sign In → /login',
    },

    routing: {
      'Get Started': '/role-select',
      'Sign In': '/login',
      'Already have account': '/login',
    },

    uxNotes: [
      'Dark premium design — not a school app, not a therapy app, not a game',
      'Hero headline must work without the subheadline — it is the whole message in one line',
      'Value prop cards are not clickable — they are informational only',
      'No photos of real people — abstract or geometric visual system only',
      'Mobile-first — the hero fits on one screen without scrolling',
      'Returning users who land here see a "Welcome back — Sign In" prompt at top if cookie exists',
    ],
  },

  // ============================================================
  // SCREEN 2: Main Login Screen
  // ============================================================
  screen2: {
    name: 'Main Login Screen',
    route: '/login',
    purpose: 'Authenticate any user into the app. Routes to the correct experience based on their role after login. Single login screen for all three users.',
    access: ['Public — no auth required'],

    layout: 'Full-screen centered — single column, clean form',

    top: {
      content: [
        'App logo — top center',
        'Back arrow — top left (returns to Welcome)',
      ],
    },

    middle: {
      content: [
        'Screen headline: "Sign In"',
        'Email input field',
        'Password input field',
        'Forgot password link — below password field, right-aligned',
        '',
        'Error state (inline): "Incorrect email or password. Try again."',
      ],
    },

    bottom: {
      content: [
        'Primary CTA: "Sign In"',
        'Divider with text: "New here?"',
        'Secondary CTA: "Create your account" — routes to role selection + account creation',
        'Privacy note: "Your information is private and never shared."',
      ],
    },

    components: [
      'AppLogo',
      'BackArrow',
      'InputField (email)',
      'InputField (password)',
      'ForgotPasswordLink',
      'InlineError (conditional)',
      'PrimaryButton',
      'Divider',
      'SecondaryButton',
      'PrivacyNote',
    ],

    cta: {
      primary: 'Sign In → /dashboard-router (role-based redirect)',
      secondary: 'Create your account → /role-select',
    },

    routing: {
      'Successful login — Mom': '/mom/dashboard',
      'Successful login — Mekhi': '/mekhi/dashboard',
      'Successful login — Melvin': '/melvin/dashboard',
      'Successful login — Admin': '/admin/dashboard',
      'Forgot password': '/forgot-password',
      'Create account': '/role-select',
    },

    uxNotes: [
      'One login screen for all users — role is determined by the account, not the screen',
      'Biometric login (Face ID / Touch ID) supported on mobile',
      'Loading state: button shows spinner, inputs disabled',
      'After login, role is read from user record in Firestore — no role selection needed for returning users',
      'Session persists unless manually signed out',
    ],
  },

  // ============================================================
  // SCREEN 3: User Role Selection
  // ============================================================
  screen3: {
    name: 'User Role Selection',
    route: '/role-select',
    purpose: 'New user account creation flow — step 1. User selects who they are before entering profile and account details. Sets the role stored in Firestore.',
    access: ['Public — new users only'],

    layout: 'Full-screen centered — role selection cards, single column',

    top: {
      content: [
        'Back arrow — returns to Welcome or Login',
        'Screen headline: "Who are you setting this up for?"',
        'Subtext: "Each experience is built specifically for you."',
      ],
    },

    middle: {
      content: [
        'Three large role selection cards — stacked vertically:',
        '',
        'Card 1 — Mekhi',
        '  Name: "I\'m Mekhi"',
        '  Description: "I want to understand my path, my goals, and what I need to do next."',
        '  Icon: directional/arrow motif',
        '',
        'Card 2 — Melvin',
        '  Name: "I\'m Melvin"',
        '  Description: "I want to understand my two career paths and what my future looks like."',
        '  Icon: dual-path/fork motif',
        '',
        'Card 3 — Mom',
        '  Name: "I\'m their Mom"',
        '  Description: "I want to become a better communicator and stronger support for my sons."',
        '  Icon: shield/protection motif',
        '',
        'Selected state: card highlights with accent border and check',
      ],
    },

    bottom: {
      content: [
        'Primary CTA: "Continue" — activates after selection',
        'Small note: "This determines your experience. You can\'t switch roles after account creation."',
      ],
    },

    components: [
      'BackArrow',
      'HeadlineBlock',
      'RoleSelectionCard (x3)',
      'SelectionIndicator',
      'PrimaryButton (disabled until selection)',
      'RoleNote',
    ],

    cta: {
      primary: 'Continue → /create-account/:role',
    },

    routing: {
      'Mekhi selected → Continue': '/create-account/mekhi',
      'Melvin selected → Continue': '/create-account/melvin',
      'Mom selected → Continue': '/create-account/mom',
    },

    uxNotes: [
      'Role cards must feel meaningfully different — each speaks directly to that person',
      'Only one card can be selected at a time',
      'Role is stored immediately in account creation and cannot be changed without admin access',
      'If an Admin account is needed, it is created via Firestore directly — not through this screen',
      'Mobile: cards are full-width, large tap targets',
    ],
  },

  // ============================================================
  // SCREEN 4: Main Dashboard Router
  // ============================================================
  screen4: {
    name: 'Main Dashboard Router',
    route: '/dashboard',
    purpose: 'Invisible routing layer. Reads user role from Firestore auth record and redirects immediately to the correct dashboard. Never renders visibly — just routes.',
    access: ['Mekhi', 'Melvin', 'Mom', 'Admin'],

    layout: 'No visible layout — loading state only',

    top: { content: ['App logo centered — brief loading state'] },
    middle: { content: ['Subtle loading animation — spinner or pulsing logo'] },
    bottom: { content: ['No content'] },

    components: [
      'LoadingSpinner',
      'AppLogo (centered)',
    ],

    cta: {
      primary: 'None — auto-routes',
    },

    routing: {
      'role === mom': '/mom/dashboard',
      'role === mekhi': '/mekhi/dashboard',
      'role === melvin': '/melvin/dashboard',
      'role === admin': '/admin/dashboard',
      'no auth / expired session': '/login',
    },

    uxNotes: [
      'This screen should resolve in under 500ms — it is a technical redirect, not a user experience',
      'Loading state shows only if Firestore role read takes longer than expected',
      'If role is undefined or corrupt, route to /login with session cleared',
      'This is the protected route wrapper — all authenticated routes pass through here on cold start',
    ],
  },

  // ============================================================
  // SCREEN 5: Profile Switcher
  // ============================================================
  screen5: {
    name: 'Profile Switcher',
    route: '/switch-profile',
    purpose: 'Allows Mom (and Admin) to switch between viewing Mekhi\'s data and Melvin\'s data within her dashboard context. Does NOT allow switching user roles — only switching which son\'s data is in focus.',
    access: ['Mom', 'Admin'],

    layout: 'Bottom sheet modal — slides up over current screen',

    top: {
      content: [
        'Modal handle bar at top',
        'Title: "Switch View"',
        'Close X — top right',
      ],
    },

    middle: {
      content: [
        'Currently viewing indicator:',
        '  "Currently viewing: Mekhi\'s profile"',
        '',
        'Son selection cards — 2 stacked:',
        '  Card 1 — Mekhi:',
        '    Name, last active date, current alignment status',
        '    Active state if currently selected',
        '',
        '  Card 2 — Melvin:',
        '    Name, last active date, current alignment status',
        '    Active state if currently selected',
        '',
        'Divider',
        '',
        'Your Profile card:',
        '  "Back to Your Dashboard"',
        '  Returns to Mom\'s own results and action plan',
      ],
    },

    bottom: {
      content: [
        'CTA: "Switch to [Son Name]"',
        'Cancel link',
      ],
    },

    components: [
      'BottomSheetHandle',
      'CurrentlyViewingLabel',
      'SonProfileCard (x2)',
      'MomProfileCard',
      'PrimaryButton',
      'CancelLink',
    ],

    cta: {
      primary: 'Switch to [Son Name] → updates dashboard context',
      secondary: 'Back to Your Dashboard',
    },

    routing: {
      'Switch to Mekhi': '/mom/dashboard?view=mekhi',
      'Switch to Melvin': '/mom/dashboard?view=melvin',
      'Back to Your Dashboard': '/mom/dashboard',
      'Cancel': 'dismiss modal',
    },

    uxNotes: [
      'Profile switcher is triggered by a persistent icon in Mom\'s navigation — accessible from any screen',
      'Switching son context updates the dashboard to show that son\'s data without losing her place',
      'Admin sees all three profiles plus a system overview option',
      'Visual distinction between "Mom\'s view" and "son-focused view" — header changes color or label',
      'Mekhi and Melvin never see this screen — it is Mom and Admin only',
    ],
  },

  // ============================================================
  // SCREEN 6: Assessment Hub
  // ============================================================
  screen6: {
    name: 'Assessment Hub',
    route: '/:user/assessment',
    purpose: 'Central access point for all assessment-related activity for the active user. Shows current assessment state, section progress, and entry points for starting, resuming, or reviewing.',
    access: ['Mekhi', 'Melvin', 'Mom'],

    layout: 'Scrollable single-column — card sections',

    top: {
      content: [
        'Back arrow',
        'Screen title: "Assessment"',
        'User-specific subtext:',
        '  Mekhi: "Your self-assessment. Take it seriously."',
        '  Melvin: "Know yourself. Know your path."',
        '  Mom: "An honest look at how you show up."',
      ],
    },

    middle: {
      content: [
        '--- STATUS CARD ---',
        'Assessment status:',
        '  Not started: "You haven\'t started yet. This is where it begins."',
        '  In progress: progress bar + "Section X of Y complete" + last saved timestamp',
        '  Complete: completion date + overall score + "Retake Assessment" option',
        '',
        '--- SECTION PROGRESS (if in progress or complete) ---',
        'Section-by-section progress list:',
        '  Each section shown as a row:',
        '    Section name | Status (Complete / In Progress / Locked) | Score (if complete)',
        '  Completed sections: green check',
        '  Current section: accent highlight',
        '  Locked sections: grey with lock icon (unlocked sequentially)',
        '',
        '--- ASSESSMENT DETAILS ---',
        'Info cards — 3 horizontal:',
        '  Total sections count',
        '  Estimated time remaining',
        '  Last saved',
        '',
        '--- RETAKE / HISTORY ---',
        'Previous assessment records (if any):',
        '  Date + completion status + link to results',
        '  "Start Fresh" option — resets current session, archives prior',
      ],
    },

    bottom: {
      content: [
        'Primary CTA: "Start Assessment" / "Resume Assessment" / "View Results"',
        'Secondary: "View Previous Results" (if prior sessions exist)',
        'Bottom nav (persistent)',
      ],
    },

    components: [
      'BackArrow',
      'AssessmentStatusCard',
      'ProgressBar',
      'SectionProgressList',
      'AssessmentInfoCards (x3)',
      'PreviousSessionList (conditional)',
      'PrimaryButton',
      'SecondaryButton',
      'BottomNavBar',
    ],

    cta: {
      primary: 'Start / Resume / View Results → /:user/assessment/question/:id',
      secondary: 'View Previous Results → /results-hub',
    },

    routing: {
      'Start Assessment': '/:user/assessment/intro',
      'Resume Assessment': '/:user/assessment/question/:lastQuestionId',
      'View Results': '/:user/results',
      'Previous session': '/:user/results/:sessionId',
    },

    uxNotes: [
      'Section list unlocks sequentially — users cannot skip sections',
      'Auto-save means resume always picks up at the exact last question answered',
      '"Start Fresh" requires a confirmation modal — destructive action warning',
      'Assessment hub is the same structure for all 3 users — content and sections differ',
    ],
  },

  // ============================================================
  // SCREEN 7: Weekly Reset Hub
  // ============================================================
  screen7: {
    name: 'Weekly Reset Hub',
    route: '/:user/weekly-reset',
    purpose: 'A short weekly touchpoint (5–10 minutes) that checks in on the user\'s current week — mood, progress, blockers, and one commitment for next week. Keeps users engaged between full assessments.',
    access: ['Mekhi', 'Melvin', 'Mom'],

    layout: 'Scrollable single-column — guided single-page flow',

    top: {
      content: [
        'Back arrow',
        'Screen title: "Weekly Reset"',
        'Week indicator: "Week of March 17, 2026"',
        'Subtext: "5 minutes. One honest check-in."',
        'Progress bar — fills as questions answered',
      ],
    },

    middle: {
      content: [
        '--- THIS WEEK SECTION ---',
        'Header: "This Week"',
        '3–4 quick questions:',
        '  Q1: Overall week rating (slider 1–10)',
        '  Q2: Did you complete your one focus from last week? (Yes / Partially / No)',
        '  Q3: What got in the way this week? (forced choice: Energy / Focus / Environment / People / Other)',
        '  Q4: One thing you\'re proud of this week (open — brief)',
        '',
        '--- NEXT WEEK SECTION ---',
        'Header: "Next Week"',
        '2 questions:',
        '  Q5: One specific thing you commit to doing next week (open)',
        '  Q6: Rate your readiness for next week (slider 1–10)',
        '',
        '--- ALIGNMENT CHECK (Mekhi/Melvin only) ---',
        'Header: "Alignment Check"',
        '1 question:',
        '  Q7: How aligned do you feel with your goals right now? (slider 1–10)',
        '  If score drops 2+ points from prior week — flag triggered',
        '',
        '--- MOM-SPECIFIC ADDITION ---',
        'Header: "Your Sons This Week"',
        '2 questions:',
        '  Q7: Any notable changes in Mekhi this week? (forced choice)',
        '  Q8: Any notable changes in Melvin this week? (forced choice)',
        '',
        'Weekly summary preview — auto-generated after final question:',
        '  "This week: [X]. Next week: [Y]. Trend: [improving/stable/declining]"',
      ],
    },

    bottom: {
      content: [
        'Primary CTA: "Submit Weekly Reset"',
        'Secondary: "Save Draft — finish later"',
        'Bottom nav (persistent)',
      ],
    },

    components: [
      'BackArrow',
      'WeekIndicator',
      'ProgressBar',
      'SectionHeader',
      'SliderQuestion',
      'YesPartialNoQuestion',
      'ForcedChoiceQuestion',
      'OpenTextQuestion',
      'WeeklySummaryPreview',
      'PrimaryButton',
      'SecondaryButton',
      'BottomNavBar',
    ],

    cta: {
      primary: 'Submit Weekly Reset → updates dashboard streak + flags',
      secondary: 'Save Draft',
    },

    routing: {
      'Submit': '/:user/dashboard (with weekly streak updated)',
      'Save Draft': '/:user/dashboard (draft saved)',
    },

    uxNotes: [
      'Weekly reset is triggered by a notification every Monday morning',
      'Must be completable in one sitting — no pagination, no breaks',
      'Alignment score drop of 2+ points triggers a flag on the dashboard and an AI nudge',
      'Streak counter on dashboard increments when weekly reset is submitted on time',
      'If skipped more than 2 weeks: gentle re-engagement prompt on dashboard',
      'Mom\'s son-specific questions feed into her dashboard relationship health scores',
    ],
  },

  // ============================================================
  // SCREEN 8: Monthly Mini Assessment Hub
  // ============================================================
  screen8: {
    name: 'Monthly Mini Assessment Hub',
    route: '/:user/monthly-check-in',
    purpose: 'A structured monthly check-in (10–15 minutes) that tracks progress, updates scores, and generates a refreshed AI summary. Lighter than the full assessment but more structured than the weekly reset.',
    access: ['Mekhi', 'Melvin', 'Mom'],

    layout: 'Scrollable single-column — section-based short assessment',

    top: {
      content: [
        'Back arrow',
        'Screen title: "Monthly Check-In"',
        'Month + year: "March 2026"',
        'Check-in number: "Check-In #3"',
        'Subtext: "10–15 minutes. Tracks your growth."',
        'Progress bar',
      ],
    },

    middle: {
      content: [
        '--- SECTION: THIS MONTH\'S HIGHLIGHTS ---',
        '3 quick questions on what happened this month',
        '  Biggest win (open)',
        '  Biggest challenge (open)',
        '  Did you complete last month\'s action? (Yes / Partially / No + note)',
        '',
        '--- SECTION: DOMAIN PULSE (5 questions — one per key area) ---',
        '5 slider questions (1–10):',
        '  Discipline this month',
        '  Communication this month',
        '  Focus on goals this month',
        '  Emotional state this month',
        '  Confidence this month',
        '',
        '--- SECTION: SCORE COMPARISON ---',
        'Auto-generated after domain pulse:',
        '  This month vs. last month — visual delta per domain',
        '  Up arrows (green) / down arrows (amber) per area',
        '',
        '--- SECTION: NEXT MONTH FOCUS ---',
        '2 questions:',
        '  Which area needs the most focus next month? (forced choice — from 5 domains)',
        '  One specific commitment for next month (open)',
        '',
        '--- FLAG QUESTIONS (3 yes/no) ---',
        '  "Is anything urgent happening in my life right now that I haven\'t addressed?"',
        '  "Am I at risk of falling off my path?"',
        '  "Do I need to talk to someone about something?"',
        '  (Yes answers trigger AI coach response + dashboard flag)',
      ],
    },

    bottom: {
      content: [
        'Primary CTA: "Submit Check-In"',
        'Secondary: "Save and Return Later"',
        'Bottom nav (persistent)',
      ],
    },

    components: [
      'BackArrow',
      'MonthLabel',
      'CheckInNumber',
      'ProgressBar',
      'SectionHeader',
      'OpenTextQuestion',
      'SliderQuestion (x5)',
      'ScoreComparisonBlock',
      'ForcedChoiceQuestion',
      'FlagQuestion (x3)',
      'PrimaryButton',
      'SecondaryButton',
      'BottomNavBar',
    ],

    cta: {
      primary: 'Submit Check-In → updates scores + regenerates AI summary excerpt',
      secondary: 'Save and Return Later',
    },

    routing: {
      'Submit': '/:user/dashboard (scores updated)',
      'Save': '/:user/dashboard (draft persisted)',
    },

    uxNotes: [
      'Monthly check-in notification sent on 1st of each month',
      'Flag questions are highest priority — any "yes" triggers immediate AI response card on dashboard',
      'Score comparison block appears inline after domain pulse — immediate feedback before submission',
      'Check-in data feeds Progress History chart with new data points',
      'Missing a month prompts a gentle catch-up offer: "Want to do a quick check-in for last month?"',
    ],
  },

  // ============================================================
  // SCREEN 9: Results Hub
  // ============================================================
  screen9: {
    name: 'Results Hub',
    route: '/:user/results',
    purpose: 'Central hub for all results — current session and historical. Entry point to all specific insight screens. Adapts content and labels based on active user.',
    access: ['Mekhi', 'Melvin', 'Mom'],

    layout: 'Scrollable single-column — overview + navigation cards',

    top: {
      content: [
        'Back arrow',
        'Screen title: "Your Results"',
        'Session selector: "Current | Previous Sessions" — tab or dropdown',
      ],
    },

    middle: {
      content: [
        '--- CURRENT SESSION ---',
        'Assessment completion date',
        'Overall profile label — large, prominent',
        '2–3 sentence profile summary',
        '',
        'Score Overview Grid (2-column):',
        '  All major category scores',
        '  Color indicators per score',
        '',
        'Strengths Snapshot:',
        '  3 strength tags',
        '  "See Full Analysis" link',
        '',
        'Patterns to Address:',
        '  3 pattern tags (amber)',
        '  "See Full Blind Spots" link',
        '',
        'Navigation Card Grid — links to all insight sections:',
        '  USER-SPECIFIC CARDS:',
        '  Mekhi: Career Matches | Life Blueprint | Behavior Alert | Coach Summary | Progress',
        '  Melvin: Finance Path | Sports Path | Hybrid Path | Life Blueprint | Coach Summary | Progress',
        '  Mom: Relationship Insights | Communication | Blind Spots | Son Needs | Action Plan | Coach Summary',
        '',
        '--- PREVIOUS SESSIONS (tab) ---',
        'List of prior assessments:',
        '  Date | Completion | Key score | "View" link',
      ],
    },

    bottom: {
      content: [
        'Primary CTA: User-specific — "View My Career Matches" / "Start My Action Plan" / "View Coach Summary"',
        'Bottom nav (persistent)',
      ],
    },

    components: [
      'BackArrow',
      'SessionSelector',
      'ProfileLabel',
      'ProfileSummary',
      'ScoreGrid',
      'StrengthTags',
      'PatternTags',
      'InsightNavigationGrid (user-specific)',
      'PreviousSessionList (conditional)',
      'PrimaryButton',
      'BottomNavBar',
    ],

    cta: {
      primary: 'User-specific primary action',
      secondary: 'View Previous Session',
    },

    routing: {
      'Mekhi — Career Matches': '/mekhi/career-matches',
      'Mekhi — Life Blueprint': '/mekhi/life-blueprint',
      'Melvin — Finance Path': '/melvin/career-matches?path=finance',
      'Melvin — Sports Path': '/melvin/career-matches?path=sports',
      'Mom — Relationship Insights': '/mom/results/relationships',
      'Mom — Action Plan': '/mom/action-plan',
      'Previous session': '/:user/results/:sessionId',
    },

    uxNotes: [
      'Results Hub is the same route structure for all users — content is entirely role-driven',
      'Navigation cards are the single most important element — they must be visually clear and inviting',
      'Previous sessions tab should be collapsed by default — current session is primary',
      'If no assessment completed: empty state with CTA to start assessment',
    ],
  },

  // ============================================================
  // SCREEN 10: Career Matches Hub
  // ============================================================
  screen10: {
    name: 'Career Matches Hub',
    route: '/:user/career-matches',
    purpose: 'Displays the AI-generated career match output. For Mekhi: single-path matches. For Melvin: dual-path matches (Finance + Sports) with comparison engine. Mom does not access this screen directly.',
    access: ['Mekhi', 'Melvin'],

    layout: 'Scrollable single-column — career cards + comparison section',

    top: {
      content: [
        'Back arrow',
        'Screen title: "Career Matches"',
        'Melvin only — path filter tabs: "All" | "Finance" | "Sports" | "Hybrid"',
        'Mekhi — no tabs, single path',
      ],
    },

    middle: {
      content: [
        '--- BEST FIT BANNER ---',
        'Header: "Your Best Fit Path"',
        'Large bold path label: e.g. "Finance / Corporate" or "Hybrid: Sports Finance"',
        '2-sentence reasoning from AI',
        '',
        '--- CAREER MATCH CARDS (4 total for Melvin, 3–4 for Mekhi) ---',
        'Each Career Card contains:',
        '  Path badge: "Finance" / "Sports" / "Hybrid" (color coded)',
        '  Job title — large',
        '  Why It Fits — 2–3 sentences',
        '  Entry Role',
        '  Salary range: Entry → Mid → High',
        '  Bachelor path at Morehouse (Melvin) or college (Mekhi)',
        '  Master path (if applicable)',
        '  Growth ladder — 4 steps',
        '  Course roadmap — collapsible list by year',
        '  Real job link — "See a Real Job" → external link badge',
        '  Expand/collapse toggle for full detail',
        '',
        '--- MELVIN ONLY: COMPARISON ENGINE ---',
        'Header: "Finance vs. Sports — Side by Side"',
        'Comparison table:',
        '  Row 1: Income Timeline',
        '  Row 2: Lifestyle Window',
        '  Row 3: Discipline Required',
        '  Row 4: Suits Your Personality',
        '  Row 5: Oakland/Legacy Fit',
        '  Column 1: Finance | Column 2: Sports | Column 3: Hybrid',
        '  Visual indicator per row: checkmark / partial / dash',
        '',
        '--- HYBRID SPOTLIGHT (Melvin only, conditional) ---',
        'Header: "The Hybrid Option"',
        'Description of hybrid role (e.g. Salary Cap Analyst, Athlete Wealth Advisor)',
        'Why it uniquely fits Melvin',
        'Entry path + income + growth',
      ],
    },

    bottom: {
      content: [
        'Primary CTA: "Save My Top Match" — pins to dashboard',
        'Secondary: "View Life Blueprint for This Path"',
        'Bottom nav (persistent)',
      ],
    },

    components: [
      'BackArrow',
      'PathFilterTabs (Melvin only)',
      'BestFitBanner',
      'CareerMatchCard (x3–4)',
      'CareerCardExpander',
      'RealJobLinkBadge',
      'ComparisonTable (Melvin only)',
      'HybridSpotlightCard (Melvin only, conditional)',
      'PrimaryButton',
      'SecondaryButton',
      'BottomNavBar',
    ],

    cta: {
      primary: 'Save My Top Match',
      secondary: 'View Life Blueprint for This Path',
    },

    routing: {
      'View Life Blueprint': '/:user/life-blueprint?career=:careerTitle',
      'Real Job Link': 'external (opens in browser)',
      'Save Top Match': 'saves to user profile → updates dashboard',
    },

    uxNotes: [
      'Career cards must be scannable at collapsed state — title + path badge + salary range visible without expanding',
      'Real job links open in external browser — tagged as external clearly',
      'Comparison table is Melvin-only — do not show for Mekhi',
      'Hybrid spotlight card is conditional — shows only if hybrid indicator questions were scored highly',
      'Career cards should feel like opportunities, not reports — design with ambition',
    ],
  },

  // ============================================================
  // SCREEN 11: Life Blueprint Hub
  // ============================================================
  screen11: {
    name: 'Life Blueprint Hub',
    route: '/:user/life-blueprint',
    purpose: 'Visualizes the user\'s financial and lifestyle vision — income tiers, monthly budget breakdown, lifestyle goals mapped to career paths. Makes the connection between ambition and daily behavior concrete.',
    access: ['Mekhi', 'Melvin'],

    layout: 'Scrollable single-column — tiered visual sections',

    top: {
      content: [
        'Back arrow',
        'Screen title: "Life Blueprint"',
        'Subtext: "What your goals cost. What your path pays. The gap between them."',
        'Career context: "Based on: [Selected Career Match]" — small badge',
      ],
    },

    middle: {
      content: [
        '--- LIFESTYLE BUDGET REALITY ---',
        'Header: "The Life You Described"',
        'Monthly cost breakdown — card with line items:',
        '  Housing: $X',
        '  Car + insurance: $X',
        '  Food: $X',
        '  Travel: $X',
        '  Family support: $X',
        '  Savings: $X',
        '  Other: $X',
        '  TOTAL: $X/month',
        '  Required Annual Income: $X',
        '',
        'Gap statement — prominent:',
        '  "Your target career produces $X at year 5. You need $X. Gap: $X."',
        '  Or: "Your target career exceeds this lifestyle by year 3. You\'re on track."',
        '',
        '--- LIFESTYLE TIERS ---',
        'Header: "4 Lifestyle Tiers — Where Does Your Path Land?"',
        '4 tier cards — stacked:',
        '',
        'Tier 1 — Basic ($45K–$60K/yr):',
        '  What this looks like — vivid 2–3 sentence description',
        '  Monthly budget breakdown',
        '  Which career path / which year',
        '  Gap statement',
        '',
        'Tier 2 — Comfortable ($80K–$110K/yr):',
        '  Same structure',
        '',
        'Tier 3 — Luxury ($150K–$200K/yr):',
        '  Same structure',
        '',
        'Tier 4 — Elite ($250K+/yr):',
        '  Same structure',
        '  Highlighted if this is his stated target',
        '',
        '--- MOREHOUSE PLAN (Melvin only) ---',
        'Header: "Your Morehouse Roadmap"',
        'Year-by-year plan card:',
        '  Year 1: Major, key courses, clubs, IEP setup, first internship target',
        '  Year 2: Internship, network building, certifications',
        '  Year 3: Summer analyst program target, leadership roles',
        '  Year 4: Senior year, full-time offer target',
        '  Grad: MBA or Masters path if applicable',
        '',
        '--- BEHAVIOR ALERT ---',
        'Header: "Behavior vs. Dream"',
        'Two indicators:',
        '  Career Ambition Level: High / Medium / Low (from assessment)',
        '  Current Daily Effort: High / Medium / Low (from assessment)',
        '  Gap visual: matching or misaligned',
        '  1–2 sentence honest statement about the alignment',
      ],
    },

    bottom: {
      content: [
        'Primary CTA: "Save This Blueprint"',
        'Secondary: "Adjust My Career Match"',
        'Bottom nav (persistent)',
      ],
    },

    components: [
      'BackArrow',
      'CareerContextBadge',
      'LifestyleBudgetCard',
      'GapStatement',
      'TierCard (x4)',
      'MorehouseRoadmapCard (Melvin only)',
      'BehaviorAlertBlock',
      'PrimaryButton',
      'SecondaryButton',
      'BottomNavBar',
    ],

    cta: {
      primary: 'Save This Blueprint → pins to dashboard',
      secondary: 'Adjust My Career Match → /career-matches',
    },

    routing: {
      'Save Blueprint': 'saves to user profile',
      'Adjust Career Match': '/:user/career-matches',
    },

    uxNotes: [
      'Gap statement must be honest — if the math doesn\'t work, say so clearly without shame',
      'Lifestyle tier that matches his stated target should be visually highlighted',
      'Behavior alert block must be prominent — it is the most actionable element on this screen',
      'Morehouse roadmap is Melvin-specific — Mekhi sees a generalized college/post-secondary plan instead',
      'Numbers in budget breakdown are AI-generated based on assessment answers — they will vary per user',
    ],
  },

  // ============================================================
  // SCREEN 12: Notification Center
  // ============================================================
  screen12: {
    name: 'Notification Center',
    route: '/:user/notifications',
    purpose: 'Central inbox for all system notifications — weekly reset reminders, monthly check-in prompts, AI flags, alignment drops, action plan reminders, and milestone celebrations.',
    access: ['Mekhi', 'Melvin', 'Mom', 'Admin'],

    layout: 'Scrollable list — chronological, newest first',

    top: {
      content: [
        'Back arrow',
        'Screen title: "Notifications"',
        '"Mark all read" — top right',
        'Filter tabs: "All" | "Alerts" | "Reminders" | "Milestones"',
      ],
    },

    middle: {
      content: [
        'Notification list — each item:',
        '  Type icon (alert / reminder / milestone / flag)',
        '  Notification title — bold',
        '  Brief description — 1 line',
        '  Timestamp — relative: "2 hours ago" / "Monday"',
        '  Unread indicator — accent dot',
        '  Tap to expand or navigate to relevant screen',
        '',
        'NOTIFICATION TYPES:',
        '',
        'ALERT — Red/Amber dot:',
        '  "Alignment drop detected — Mekhi\'s weekly score dropped significantly"',
        '  "Flag triggered — Melvin indicated something urgent this week"',
        '  "Mom flag: Melvin\'s post-basketball pattern needs attention"',
        '',
        'REMINDER — Blue dot:',
        '  "Your weekly reset is ready — Monday, March 17"',
        '  "Monthly check-in — March 2026 is ready"',
        '  "Action plan item due this week"',
        '',
        'MILESTONE — Gold dot:',
        '  "4-week streak — you\'ve completed every weekly reset this month"',
        '  "Assessment complete — your results are ready"',
        '  "Action plan complete — all items checked off"',
        '',
        'AI NUDGE — Purple dot:',
        '  "Your coach has a new insight based on this week\'s check-in"',
        '  "A new career match is available based on your updated scores"',
      ],
    },

    bottom: {
      content: [
        'No primary CTA — list is the interface',
        'Bottom nav (persistent)',
      ],
    },

    components: [
      'BackArrow',
      'FilterTabs',
      'NotificationItem',
      'NotificationTypeIcon',
      'UnreadDot',
      'MarkAllReadButton',
      'EmptyState (if no notifications)',
      'BottomNavBar',
    ],

    cta: {
      primary: 'Tap notification → routes to relevant screen',
    },

    routing: {
      'Alert notification': '/:user/results or /:user/dashboard (flag section)',
      'Reminder notification': '/:user/weekly-reset or /:user/monthly-check-in',
      'Milestone notification': '/:user/progress',
      'AI nudge': '/:user/coach-summary',
    },

    uxNotes: [
      'Notification bell in nav bar shows unread count badge',
      'Alerts are visually distinct from reminders — different icon and color',
      'Empty state: "No new notifications. You\'re all caught up." — should feel positive',
      'Push notifications (if mobile) deep-link directly to the relevant screen',
      'Admin sees system-level notifications about data issues or user flags across all accounts',
    ],
  },

  // ============================================================
  // SCREEN 13: Progress History
  // ============================================================
  screen13: {
    name: 'Progress History',
    route: '/:user/progress',
    purpose: 'Shows the user\'s growth over time across all assessments, weekly resets, and monthly check-ins. Makes progress visible, concrete, and motivating.',
    access: ['Mekhi', 'Melvin', 'Mom'],

    layout: 'Scrollable single-column — charts + timeline + milestones',

    top: {
      content: [
        'Back arrow',
        'Screen title: "Your Progress"',
        'Date range selector: "3 months" | "6 months" | "All time"',
      ],
    },

    middle: {
      content: [
        '--- SCORE TRENDS ---',
        'Line chart — score movement over time',
        'Toggle between key categories (user-specific):',
        '  Mekhi: Goal Alignment | Responsibility | Confidence | Commitment',
        '  Melvin: Finance Path Fit | Sports Path Fit | Independence | Discipline',
        '  Mom: Relationship (Mekhi) | Relationship (Melvin) | Communication | Accountability',
        'X-axis: months | Y-axis: score 1–10',
        'Trend indicators: up arrow (green) / flat (grey) / down (amber)',
        '',
        '--- ASSESSMENT TIMELINE ---',
        'Chronological list:',
        '  Full assessments — date + overall score',
        '  Monthly check-ins — date + domain scores',
        '  Weekly resets — date + alignment score (collapsed by default)',
        '  Tap any entry to view that session\'s snapshot',
        '',
        '--- STREAK TRACKER ---',
        'Weekly reset streak: "X weeks in a row"',
        'Monthly check-in streak: "X months in a row"',
        'Visual streak counter — flame or calendar motif',
        '',
        '--- GROWTH MOMENTS ---',
        'Auto-generated highlight cards:',
        '  "February: Communication score improved 3 points"',
        '  "March: First complete month — all action items checked"',
        '  "January: Biggest alignment jump — +2.5 points"',
        '  Gold/accent visual treatment',
        '',
        '--- REFLECTION ARCHIVE ---',
        'Week 4 reflections from action plan (Mom)',
        'Weekly reset notes (brief open answers)',
        'Displayed as a timeline — expandable per entry',
      ],
    },

    bottom: {
      content: [
        'Primary CTA: "Start This Week\'s Reset" / "Start Monthly Check-In" (whichever is due)',
        'Secondary: "Export My Progress" — PDF download',
        'Bottom nav (persistent)',
      ],
    },

    components: [
      'BackArrow',
      'DateRangeSelector',
      'ScoreTrendChart',
      'ChartCategoryToggle',
      'AssessmentTimeline',
      'StreakTracker',
      'GrowthMomentCard',
      'ReflectionArchive',
      'PrimaryButton',
      'SecondaryButton',
      'BottomNavBar',
    ],

    cta: {
      primary: 'Start Weekly Reset / Monthly Check-In',
      secondary: 'Export My Progress',
    },

    routing: {
      'Start Weekly Reset': '/:user/weekly-reset',
      'Start Monthly Check-In': '/:user/monthly-check-in',
      'Export': 'generates PDF',
      'Session tap': '/:user/results/:sessionId',
    },

    uxNotes: [
      'Growth moments are the most motivating element — show them prominently',
      'Chart must be readable on mobile — limit data density per view',
      'Export as PDF allows sharing with a counselor, mentor, or coach',
      'Empty state (new user): "Your history starts here. Complete your first check-in to see progress."',
      'Streak reset does not delete streak history — shows "previous streak: X"',
    ],
  },

  // ============================================================
  // SCREEN 14: Settings
  // ============================================================
  screen14: {
    name: 'Settings',
    route: '/:user/settings',
    purpose: 'Account management, notification preferences, privacy controls, and app configuration. Clean and functional — not a dumping ground.',
    access: ['Mekhi', 'Melvin', 'Mom', 'Admin'],

    layout: 'Scrollable single-column — grouped settings list',

    top: {
      content: [
        'Back arrow',
        'Screen title: "Settings"',
      ],
    },

    middle: {
      content: [
        '--- ACCOUNT ---',
        'Profile info: Name | Email | Role (read-only)',
        'Change password',
        'Update email',
        '',
        '--- NOTIFICATIONS ---',
        'Weekly reset reminder: toggle on/off + time preference',
        'Monthly check-in reminder: toggle on/off',
        'AI nudge notifications: toggle on/off',
        'Alert notifications: toggle on/off (cannot be fully disabled)',
        '',
        '--- PRIVACY ---',
        'Data privacy statement — link',
        'What your sons can see (Mom only): settings for data visibility',
        'Delete my data — destructive, requires confirmation',
        '',
        '--- APP ---',
        'Theme: System / Light / Dark',
        'Text size: Standard / Large',
        'Language: English (only option for now)',
        '',
        '--- SUPPORT ---',
        'Help center — link',
        'Send feedback — opens brief form',
        'Report a problem — opens brief form',
        'App version — small text at bottom of section',
        '',
        '--- ACCOUNT ACTIONS ---',
        'Sign out — prominent but not alarming',
        'Delete account — small, bottom, requires confirmation modal',
      ],
    },

    bottom: {
      content: [
        'No primary CTA — settings are self-contained',
        'Bottom nav (persistent)',
      ],
    },

    components: [
      'BackArrow',
      'SettingsGroup',
      'SettingsRow',
      'Toggle',
      'TextLink',
      'DestructiveAction',
      'ConfirmationModal (for destructive actions)',
      'BottomNavBar',
    ],

    cta: {
      primary: 'None',
      secondary: 'Sign Out',
      destructive: 'Delete Account (behind confirmation)',
    },

    routing: {
      'Sign out': '/login (session cleared)',
      'Delete account': 'confirmation modal → account deletion → /welcome',
    },

    uxNotes: [
      'Settings are grouped — no flat unorganized lists',
      'Destructive actions (delete data, delete account) require a typed confirmation: "Type DELETE to confirm"',
      '"What your sons can see" is Mom-only — she controls whether her sons\' results are cross-referenced',
      'Sign out is visible but not prominent — this is not the dominant action on this screen',
      'App version shown for support debugging purposes',
    ],
  },

  // ============================================================
  // SCREEN 15: Admin Dashboard
  // ============================================================
  screen15: {
    name: 'Admin Dashboard',
    route: '/admin/dashboard',
    purpose: 'Internal-only screen for app administration, environment management, user oversight, and system health monitoring. Never visible to Mekhi, Melvin, or Mom.',
    access: ['Admin only'],

    layout: 'Scrollable single-column — system status + user management',

    top: {
      content: [
        'Admin badge — clear visual indicator this is the admin view',
        'Screen title: "Admin Dashboard"',
        'Environment indicator: "PRODUCTION" or "STAGING" — prominent, color-coded',
        'Last system check timestamp',
      ],
    },

    middle: {
      content: [
        '--- SYSTEM STATUS ---',
        'Firebase connection: Active / Error',
        'Anthropic API: Active / Error + last call timestamp',
        'Netlify functions: Active / Error',
        'Environment variables: Set / Missing — list of required vars with status',
        '',
        '--- USER ACCOUNTS ---',
        'User list:',
        '  Each user: Name | Role | Last login | Assessment status | Account status',
        '  Actions per user: View data | Reset assessment | Disable account',
        '',
        '--- FLAGS & ALERTS ---',
        'Active flags across all users:',
        '  User name | Flag type | Date triggered | Status (open/resolved)',
        '  Tap to view flag details',
        '',
        '--- ASSESSMENT DATA ---',
        'Total assessments completed',
        'Average completion rate',
        'Sections with highest dropout rate',
        '',
        '--- ENVIRONMENT NOTES ---',
        'Required env vars checklist:',
        '  VITE_FIREBASE_API_KEY: Set ✓',
        '  ANTHROPIC_API_KEY: Set ✓',
        '  TEXTBELT_API_KEY: Set / Missing',
        '  SENDGRID_API_KEY: Set / Missing',
        '  SITE_URL: Set ✓',
        '',
        'Deployment notes:',
        '  Build command: npm run build',
        '  Publish directory: dist',
        '  Functions directory: netlify/functions',
        '  Current deploy: timestamp + status',
        '',
        '--- SYSTEM ACTIONS ---',
        'Clear all sessions (nuclear — requires confirmation)',
        'Trigger test notification',
        'View error logs',
        'Export all user data (GDPR)',
      ],
    },

    bottom: {
      content: [
        'Admin sign out',
        'No bottom nav — admin has its own minimal nav',
      ],
    },

    components: [
      'EnvironmentBadge',
      'SystemStatusCard',
      'EnvVarChecklist',
      'UserManagementTable',
      'FlagList',
      'AssessmentMetrics',
      'DeploymentNotesCard',
      'AdminActionButtons',
      'AdminNavBar',
    ],

    cta: {
      primary: 'None — admin is a monitoring and management view',
      destructive: 'Clear all sessions (behind confirmation)',
    },

    routing: {
      'View user data': '/admin/user/:userId',
      'Sign out': '/login',
    },

    uxNotes: [
      'Admin screen must never be accessible via URL manipulation by non-admin users — Firestore role check required',
      'Environment indicator is the most important visual element — PRODUCTION should be red, STAGING should be amber',
      'Env var checklist catches configuration issues before deployment',
      'User management table allows resetting a son\'s assessment without deleting their account',
      'Flag list shows all triggered assessment flags across all users — primary monitoring tool',
    ],
  },

  // ============================================================
  // SCREEN 16: Error / Empty / Loading States
  // ============================================================
  screen16: {
    name: 'Error / Empty / Loading States',
    route: 'N/A — component-level states across all screens',
    purpose: 'Define consistent visual treatment for all non-content states across the app. Prevents blank screens, broken experiences, and user confusion.',
    access: ['Mekhi', 'Melvin', 'Mom', 'Admin'],

    layout: 'Full-screen centered or inline — context-dependent',

    states: {

      loading: {
        name: 'Loading State',
        when: 'Data is being fetched, AI is generating, or a screen is transitioning',
        layout: 'Centered — logo or spinner + brief message',
        content: [
          'App logo or subtle animated logo mark',
          'Spinner — clean, not flashy',
          'Contextual message:',
          '  General: "Loading..."',
          '  AI generation: "Generating your results..." or "Building your summary..."',
          '  Assessment save: "Saving your answer..."',
        ],
        uxNotes: [
          'Never show a blank screen — loading state must appear within 100ms',
          'AI generation loading should feel intentional — this is worth waiting for',
          'Skeleton screens preferred over spinners for list content',
        ],
      },

      error: {
        name: 'Error State',
        when: 'An API call fails, a network error occurs, or data cannot be retrieved',
        layout: 'Full-screen centered or inline card — depends on severity',
        content: [
          'Error icon — subtle, not alarming',
          'Error headline:',
          '  Network: "Something went wrong. Check your connection."',
          '  API failure: "We couldn\'t generate your results. Try again."',
          '  Auth error: "Your session expired. Sign in again."',
          'Brief explanation — 1 sentence, plain language',
          'CTA: "Try Again" or "Go Back" or "Sign In"',
        ],
        uxNotes: [
          'Never show raw error codes or stack traces to users',
          'Error messages must tell them what to do, not just what went wrong',
          'Critical errors (auth, data corruption) full-screen; minor errors (load failure) inline card',
          'Retry button should attempt the failed action — not reload the full page',
        ],
      },

      empty: {
        name: 'Empty State',
        when: 'A list, chart, or data section has no content yet',
        layout: 'Inline — within the section that is empty',
        content: [
          'Simple illustration or icon — not a stock photo',
          'Empty state headline — specific to the section:',
          '  No notifications: "You\'re all caught up."',
          '  No progress history: "Your history starts after your first check-in."',
          '  No career matches: "Complete your assessment to see your matches."',
          '  No results: "Start your assessment to see your results here."',
          'CTA where applicable: "Start Assessment" / "Complete Check-In" / etc.',
        ],
        uxNotes: [
          'Empty states must feel encouraging, not deficient',
          'Every empty state should have a clear path to filling it',
          'Do not show empty state components that are not relevant to the user\'s current stage',
        ],
      },

      notFound: {
        name: '404 / Not Found State',
        when: 'User navigates to a route that does not exist or a resource that has been deleted',
        layout: 'Full-screen centered',
        content: [
          'Large "404" or "Not Found" — minimal, clean',
          'Headline: "This page doesn\'t exist."',
          'Subtext: "It may have been moved or the link is broken."',
          'CTA: "Go to Dashboard"',
        ],
        uxNotes: [
          'Do not show the full nav bar on 404 — keep it minimal',
          '"Go to Dashboard" should route to the user\'s role-appropriate dashboard if authenticated, or /login if not',
        ],
      },

      unauthorized: {
        name: 'Unauthorized State',
        when: 'A user attempts to access a screen they do not have permission to view (e.g., Mekhi trying to access Mom\'s results)',
        layout: 'Full-screen centered',
        content: [
          'Lock icon',
          'Headline: "You don\'t have access to this."',
          'Subtext: "This section is for a different user."',
          'CTA: "Go to Your Dashboard"',
        ],
        uxNotes: [
          'Never show the content even partially — full block',
          'Route to the user\'s own dashboard, not the login screen (they are authenticated)',
          'Log unauthorized access attempts in Firestore for admin visibility',
        ],
      },

      offlineState: {
        name: 'Offline / No Connection State',
        when: 'Device has no internet connection',
        layout: 'Banner at top of screen (non-blocking) or full-screen if critical action blocked',
        content: [
          'Banner: "You\'re offline. Some features may be unavailable."',
          'Full-screen (if assessment blocked): "No connection detected. Your progress is saved. Reconnect to continue."',
          'CTA: "Try Again"',
        ],
        uxNotes: [
          'Assessment answers are saved locally if possible — do not lose progress on connection drop',
          'Read-only content (results, history) should still be viewable offline if cached',
          'Banner dismisses automatically when connection is restored',
        ],
      },
    },

    components: [
      'LoadingSpinner',
      'SkeletonScreen',
      'ErrorCard',
      'EmptyStateBlock',
      'NotFoundScreen',
      'UnauthorizedScreen',
      'OfflineBanner',
      'RetryButton',
    ],
  },
};
