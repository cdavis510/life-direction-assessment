// ─── CAREER BLUEPRINT DATA ────────────────────────────────────────────────────
// Full career blueprints for sports careers — USA + Canada
// Includes: job description, day-to-day, salary, perks, promotion path,
// required degree, semester-by-semester undergraduate plan, masters path.
// ─────────────────────────────────────────────────────────────────────────────

export const CAREER_BLUEPRINTS = {

  // ── 1. SPORTS DATA ANALYST ────────────────────────────────────────────────
  sportsAnalytics: {
    id: 'sportsAnalytics',
    title: 'Sports Data Analyst',
    alternativeTitles: ['Sports Intelligence Analyst', 'Performance Data Scientist', 'Sports Betting Analyst', 'Player Evaluation Analyst'],

    whyThisFits: "Your sports betting brain is a real analytical skill. Reading odds, patterns, and probability naturally — that IS the job. This career takes that same instinct and pays you six figures to apply it professionally for teams, networks, and sports betting platforms.",

    usCompanies: [
      { name: 'ESPN Analytics', location: 'Bristol, CT', type: 'Sports Network', url: 'jobs.disneycareers.com' },
      { name: 'DraftKings', location: 'Boston, MA (remote-friendly)', type: 'Sports Betting', url: 'draftkings.com/careers' },
      { name: 'FanDuel', location: 'New York, NY (hybrid)', type: 'Sports Betting', url: 'fanduel.com/careers' },
      { name: 'NFL Analytics Department', location: 'New York, NY', type: 'Professional League', url: 'nfl.com/careers' },
      { name: 'Sportradar', location: 'New York, NY (remote)', type: 'Sports Data Provider', url: 'sportradar.com/careers' },
      { name: 'Golden State Warriors — Analytics', location: 'San Francisco, CA', type: 'NBA Team', url: 'nba.com/warriors/careers' },
      { name: 'The Athletic', location: 'Remote', type: 'Sports Media', url: 'theathletic.com/jobs' },
      { name: 'Second Spectrum', location: 'Los Angeles, CA', type: 'NBA/Sports AI', url: 'secondspectrum.com/careers' },
    ],

    canadaCompanies: [
      { name: 'Toronto Raptors — Analytics', location: 'Toronto, ON', type: 'NBA Team', url: 'nba.com/raptors/careers' },
      { name: 'Maple Leaf Sports & Entertainment (MLSE)', location: 'Toronto, ON', type: 'Multi-team org (Raptors, Leafs, TFC)', url: 'mlse.com/careers' },
      { name: 'Canadian Football League (CFL) — Data Division', location: 'Toronto, ON', type: 'Professional League', url: 'cfl.ca/careers' },
      { name: 'PointsBet Canada', location: 'Toronto, ON', type: 'Sports Betting Platform', url: 'pointsbet.ca/careers' },
      { name: 'Sportlogiq', location: 'Montreal, QC', type: 'Hockey Analytics AI Company', url: 'sportlogiq.com/careers' },
    ],

    jobDescription: "Sports Data Analysts collect, process, and analyze data to give teams, networks, and betting platforms a competitive edge. You turn raw statistics into decisions, predictions, and strategies that drive multi-million dollar outcomes — from which player to draft to which odds to set.",

    dayToDay: [
      'Build and maintain databases that track player performance across seasons',
      'Create real-time visual dashboards that coaches and front office review before games',
      'Run probability models to predict game outcomes and optimal betting lines',
      'Present findings to coaches, executives, broadcast teams, or editorial staff',
      'Write automated scripts that update stats dashboards during live games',
      'Evaluate player performance against market value for contract negotiations',
      'Collaborate with software engineers to build and maintain data pipelines',
    ],

    salary: {
      entry: { title: 'Junior Data Analyst', range: '$45,000 – $55,000', years: '0–2 years' },
      mid: { title: 'Sports Analytics Analyst', range: '$70,000 – $95,000', years: '3–5 years' },
      senior: { title: 'Senior Analytics Manager', range: '$110,000 – $155,000', years: '6–10 years' },
      executive: { title: 'VP of Analytics / Head of Data Science', range: '$175,000 – $350,000+', years: '10+ years' },
    },

    perks: [
      'Season tickets or full game access — all home games for your team or network',
      'Press box access and behind-the-scenes team facility access',
      'Conference travel: Sloan Sports Analytics Conference, MIT Sloan, industry summits',
      'Team gear and merchandise allowance every season',
      'Remote/hybrid work options — most data roles work flexible schedules',
      'Stock options or equity at tech-adjacent companies (DraftKings, FanDuel, Sportradar)',
      'Access to proprietary player tracking data that the public never sees',
    ],

    promotionPath: [
      { level: 1, title: 'Analytics Intern', when: 'Junior or Senior year of college', salary: '$18–22/hr' },
      { level: 2, title: 'Junior Data Analyst', when: 'Year 1–2 post-graduation', salary: '$45,000 – $55,000' },
      { level: 3, title: 'Sports Analytics Analyst', when: 'Year 3–5', salary: '$70,000 – $95,000' },
      { level: 4, title: 'Senior Analytics Manager', when: 'Year 6–10', salary: '$110,000 – $155,000' },
      { level: 5, title: 'Director of Analytics', when: 'Year 10–14', salary: '$160,000 – $220,000' },
      { level: 6, title: 'VP / Head of Data Science', when: 'Year 15+', salary: '$200,000 – $350,000+' },
    ],

    requiredDegree: {
      undergraduate: 'B.S. in Statistics, Mathematics, or Sports Analytics',
      alternates: ['B.S. in Computer Science (Data Science track)', 'B.S. in Data Science', 'B.A. in Sports Management with Analytics concentration'],
      certifications: ['Google Data Analytics Certificate (free, 6 months)', 'Excel Financial Modeling', 'Tableau Desktop Specialist', 'Python for Data Science (Coursera/edX)'],
    },

    undergraduatePlan: {
      degree: 'B.S. in Statistics / Sports Analytics',
      totalCredits: 120,
      semesters: [
        {
          term: 'Year 1 — Fall Semester',
          focus: 'Build the math and writing foundation',
          courses: ['Introduction to Statistics', 'College Writing & Composition', 'Introduction to Sports Management', 'Calculus I', 'Computer Applications for Business'],
          credits: 15,
        },
        {
          term: 'Year 1 — Spring Semester',
          focus: 'Start coding — this is when the work gets real',
          courses: ['Calculus II or Applied Math', 'Introduction to Programming (Python basics)', 'Sports in American Society', 'English or Humanities elective', 'Public Speaking'],
          credits: 15,
        },
        {
          term: 'Year 2 — Fall Semester',
          focus: 'Real statistics work begins here',
          courses: ['Statistics I: Probability & Inference', 'Introduction to Data Science', 'Sports Marketing', 'Microeconomics', 'Sports History & Business'],
          credits: 15,
        },
        {
          term: 'Year 2 — Spring Semester',
          focus: 'SQL and Python — the two tools every job will require',
          courses: ['Statistics II: Regression Analysis', 'Python for Data Analysis', 'Database Design & SQL', 'Sports Finance', 'Research Methods'],
          credits: 15,
        },
        {
          term: 'Year 3 — Fall Semester',
          focus: 'Sports analytics gets specific — this is where it gets fun',
          courses: ['Sports Analytics I: Performance Metrics', 'Machine Learning Fundamentals', 'Data Visualization (Tableau/Power BI)', 'Sports Law & Ethics', 'Probability & Betting Markets (elective)'],
          credits: 15,
        },
        {
          term: 'Year 3 — Spring Semester',
          focus: 'Build your portfolio — internship season starts NOW',
          courses: ['Sports Analytics II: Predictive Modeling', 'Applied Machine Learning', 'Advanced SQL & Data Engineering', 'Sports Media & Communications', 'Internship Preparation Seminar'],
          credits: 15,
        },
        {
          term: 'Year 4 — Fall Semester',
          focus: 'Capstone + job applications — finish strong',
          courses: ['Sports Analytics Capstone Project (full semester)', 'Business Intelligence & Dashboards', 'Sports Operations Management', 'Sports Entrepreneurship', 'Fantasy Sports & Gambling Economics (elective)'],
          credits: 15,
        },
        {
          term: 'Year 4 — Spring Semester',
          focus: 'Graduate employed — convert your internship to an offer',
          courses: ['Analytics Capstone Presentation', 'Professional Development in Sports', 'Contract & Salary Negotiation (elective)', 'Advanced Analytics Seminar', 'Career Transition: Internship → Full-Time'],
          credits: 15,
        },
      ],
    },

    mastersPath: {
      degree: 'M.S. in Sports Analytics or Data Science',
      duration: '1.5 – 2 years',
      whyGetIt: 'The masters opens Director and VP doors. Without it you can reach Senior Analyst — with it you can run an entire analytics department.',
      topPrograms: [
        'Northwestern University — M.S. in Sports Administration (analytics track)',
        'Columbia University — M.S. in Sports Management with Data concentration',
        'University of Michigan — M.S. in Sport Management',
        'Drexel University — M.S. in Sport Management',
        'MIT Sloan School of Management — M.B.A. with sports analytics focus',
      ],
      rolesUnlocked: [
        { title: 'Director of Analytics', salary: '$160,000 – $220,000' },
        { title: 'VP of Research & Analytics', salary: '$220,000 – $300,000' },
        { title: 'Chief Data Officer (sports org)', salary: '$300,000 – $500,000+' },
      ],
      semesterPlan: [
        { term: 'Masters Year 1 — Fall', courses: ['Advanced Statistical Modeling', 'Machine Learning for Sports', 'Sports Data Engineering & Architecture', 'Research Design & Graduate Methods'] },
        { term: 'Masters Year 1 — Spring', courses: ['Predictive Analytics & AI in Sports', 'Sports Business Strategy', 'Advanced Data Visualization', 'Graduate Research Project I'] },
        { term: 'Masters Year 2 — Fall', courses: ['Deep Learning & Neural Networks Applied to Sport', 'Sports Market Analysis', 'Leadership in Sports Organizations', 'Graduate Research Project II'] },
        { term: 'Masters Year 2 — Spring', courses: ['Thesis/Capstone: Live Analytics Project with Real Team or Company', 'Senior Role Negotiation Seminar', 'Advanced Sports Finance', 'Graduate'] },
      ],
    },
  },

  // ── 2. SPORTS OPERATIONS COORDINATOR ─────────────────────────────────────
  sportsOperations: {
    id: 'sportsOperations',
    title: 'Sports Operations Coordinator',
    alternativeTitles: ['Team Operations Manager', 'Player Personnel Coordinator', 'Event Operations Director', 'Stadium Operations Manager'],

    whyThisFits: "You thrive in structured, task-oriented environments where execution matters — you have proven that at the car shop. Operations is the engine room of every professional team. No stage, no spotlight — just the real work that makes everything run.",

    usCompanies: [
      { name: 'Golden State Warriors', location: 'San Francisco, CA', type: 'NBA Team', url: 'nba.com/warriors/careers' },
      { name: 'Oakland A\'s (Las Vegas relocation)', location: 'Las Vegas, NV', type: 'MLB Team', url: 'mlb.com/athletics/careers' },
      { name: 'Sacramento Kings', location: 'Sacramento, CA', type: 'NBA Team', url: 'nba.com/kings/careers' },
      { name: 'San Francisco 49ers', location: 'Santa Clara, CA', type: 'NFL Team', url: 'sforce.com/careers' },
      { name: 'Nike — Sports Business Operations', location: 'Beaverton, OR (remote options)', type: 'Global Sportswear Brand', url: 'jobs.nike.com' },
      { name: 'NFL League Operations', location: 'New York, NY', type: 'Professional League', url: 'nfl.com/careers' },
      { name: 'AEG (Anschutz Entertainment Group)', location: 'Los Angeles, CA', type: 'Global Sports & Events', url: 'aegworldwide.com/careers' },
      { name: 'Live Nation Sports', location: 'Beverly Hills, CA', type: 'Live Events & Sports', url: 'livenation.com/careers' },
    ],

    canadaCompanies: [
      { name: 'Toronto Blue Jays', location: 'Toronto, ON', type: 'MLB Team', url: 'mlb.com/blue-jays/careers' },
      { name: 'Vancouver Canucks', location: 'Vancouver, BC', type: 'NHL Team', url: 'nhl.com/canucks/careers' },
      { name: 'Maple Leaf Sports & Entertainment (MLSE)', location: 'Toronto, ON', type: 'Raptors / Leafs / TFC / Argos', url: 'mlse.com/careers' },
      { name: 'Ottawa Senators', location: 'Ottawa, ON', type: 'NHL Team', url: 'nhl.com/senators/careers' },
      { name: 'Edmonton Elks (CFL)', location: 'Edmonton, AB', type: 'CFL Team', url: 'cfl.ca/careers' },
    ],

    jobDescription: "Sports Operations Coordinators manage the logistics, scheduling, travel, facilities, and player support systems that keep professional sports organizations running at peak performance. Every department leans on you to execute.",

    dayToDay: [
      'Coordinate all team travel: commercial and charter flights, hotels, ground transport, meal logistics for 50+ people',
      'Manage equipment orders, inventory, and coordination with gear vendors',
      'Book and manage facility schedules: practice courts, film rooms, weight rooms',
      'Track league compliance with rules, salary cap, and collective bargaining agreements',
      'Support player onboarding: housing, car arrangements, airport pickups, paperwork',
      'Serve as communication hub between coaching staff, front office, and players',
      'Manage budgets for the operations department — track every dollar',
    ],

    salary: {
      entry: { title: 'Operations Coordinator', range: '$38,000 – $52,000', years: '0–2 years' },
      mid: { title: 'Operations Manager', range: '$60,000 – $82,000', years: '3–6 years' },
      senior: { title: 'Director of Team Operations', range: '$90,000 – $135,000', years: '7–12 years' },
      executive: { title: 'VP of Basketball / Football Operations', range: '$200,000 – $600,000+', years: '15+ years' },
    },

    perks: [
      'Full season access — every home AND away game you travel with the team',
      'Playoff travel: you go everywhere the team goes including championships',
      'Team gear, locker room access, and equipment every season',
      'Access to player facilities, training staff, and medical staff',
      'Direct working relationships with coaches, GMs, and athletes',
      'Priority access to league events, draft nights, and championships in an official capacity',
      'Expense account for team operations purchases',
    ],

    promotionPath: [
      { level: 1, title: 'Operations Intern', when: 'Junior or Senior year', salary: '$15–18/hr (sometimes unpaid)' },
      { level: 2, title: 'Operations Coordinator', when: 'Year 1–3', salary: '$38,000 – $52,000' },
      { level: 3, title: 'Operations Manager', when: 'Year 4–7', salary: '$60,000 – $82,000' },
      { level: 4, title: 'Director of Team Operations', when: 'Year 8–12', salary: '$90,000 – $135,000' },
      { level: 5, title: 'VP of Operations', when: 'Year 13–18', salary: '$150,000 – $300,000' },
      { level: 6, title: 'General Manager / President of Operations', when: 'Year 18+', salary: '$500,000 – $5,000,000+' },
    ],

    requiredDegree: {
      undergraduate: 'B.S. in Sports Management or Business Administration',
      alternates: ['B.S. in Recreation & Event Management', 'B.A. in Communications with Sports Management minor', 'B.B.A. in Business Administration'],
      certifications: ['Project Management Professional (PMP)', 'Sports Business Certificate (IMG Academy)', 'CPR/First Aid (often required)', 'Event Management Certificate'],
    },

    undergraduatePlan: {
      degree: 'B.S. in Sports Management',
      totalCredits: 120,
      semesters: [
        {
          term: 'Year 1 — Fall Semester',
          focus: 'Foundation — understand what the business of sports actually is',
          courses: ['Introduction to Sports Management', 'College Writing & Composition', 'Introduction to Business', 'General Psychology', 'Physical Education & Wellness'],
          credits: 15,
        },
        {
          term: 'Year 1 — Spring Semester',
          focus: 'Communication and management skills — you will use these every single day',
          courses: ['Principles of Management', 'Sports in American Society', 'Public Speaking', 'Introduction to Marketing', 'Math for Business'],
          credits: 15,
        },
        {
          term: 'Year 2 — Fall Semester',
          focus: 'Events and operations coursework begins — this is where it gets real',
          courses: ['Sports Event Management', 'Sports Marketing', 'Organizational Behavior', 'Sports Law & Ethics', 'Business Communications'],
          credits: 15,
        },
        {
          term: 'Year 2 — Spring Semester',
          focus: 'Money, facilities, and people — the three things operations controls',
          courses: ['Sports Finance & Budgeting', 'Facilities Management', 'Human Resources in Sports', 'Microeconomics', 'Research Methods'],
          credits: 15,
        },
        {
          term: 'Year 3 — Fall Semester',
          focus: 'Operational specifics — how teams actually function day to day',
          courses: ['Team Operations & Logistics', 'Sports Broadcasting & Media Relations', 'Contracts & Collective Bargaining in Sports', 'Project Management', 'Leadership Development'],
          credits: 15,
        },
        {
          term: 'Year 3 — Spring Semester',
          focus: 'Get the internship — this is the most important semester for your career',
          courses: ['Sports Operations Practicum', 'International Sports Business', 'Risk Management & Insurance in Sport', 'Advanced Sports Marketing', 'Internship Application Seminar'],
          credits: 15,
        },
        {
          term: 'Year 4 — Fall Semester',
          focus: 'Convert your internship — start negotiating your first real offer',
          courses: ['Senior Capstone: Operations Case Study (real org)', 'Sports Agency & Player Representation', 'Sports Entrepreneurship', 'Advanced Leadership in Organizations', 'Job Search Strategy Seminar'],
          credits: 15,
        },
        {
          term: 'Year 4 — Spring Semester',
          focus: 'Graduate employed',
          courses: ['Capstone Presentation & Defense', 'Professional Development in Sports', 'Venue Management (elective)', 'Independent Study or Second Internship', 'Career Transition Planning'],
          credits: 15,
        },
      ],
    },

    mastersPath: {
      degree: 'M.S. in Sports Administration or M.B.A. with Sports concentration',
      duration: '2 years',
      whyGetIt: 'The M.S. or MBA unlocks VP and GM tracks. Without it you top out at Director. With it, you compete for the roles that run entire organizations.',
      topPrograms: [
        'Ohio University — Master of Sports Administration (historically #1 ranked)',
        'University of Southern California (USC) — M.S. in Sport Business',
        'Georgetown University — Sports Industry Management (M.P.S.)',
        'York University (Canada) — M.A. in Kinesiology & Health Science (Sport Management)',
        'University of Toronto — M.S. in Sport Management',
      ],
      rolesUnlocked: [
        { title: 'Director of Operations (league level)', salary: '$130,000 – $185,000' },
        { title: 'VP of Team Operations', salary: '$200,000 – $450,000' },
        { title: 'General Manager', salary: '$500,000 – $5,000,000+' },
      ],
      semesterPlan: [
        { term: 'Masters Year 1 — Fall', courses: ['Strategic Management in Sport', 'Sport Finance & Revenue Generation', 'Leadership & Organizational Behavior', 'Research Methods in Sport Management'] },
        { term: 'Masters Year 1 — Spring', courses: ['Sport Law & Risk Management', 'Sport Facility Planning & Management', 'Human Resource Strategy in Sport', 'Practicum: Embedded with a professional team'] },
        { term: 'Masters Year 2 — Fall', courses: ['Global Sport Management', 'Advanced Sport Marketing & Sponsorship', 'Labor Relations in Professional Sport', 'Graduate Thesis/Project I'] },
        { term: 'Masters Year 2 — Spring', courses: ['Thesis Defense or Capstone with Real Org', 'Executive Leadership Seminar', 'Internship with League or Team Operations Division', 'Graduate'] },
      ],
    },
  },

  // ── 3. SPORTS BROADCAST PRODUCER ─────────────────────────────────────────
  broadcastProduction: {
    id: 'broadcastProduction',
    title: 'Sports Broadcast Producer',
    alternativeTitles: ['Digital Content Producer', 'Sports Video Editor', 'Sports Media Coordinator', 'Social Media Content Director'],

    whyThisFits: "You love sports deeply and see the stories in every game. Broadcast production lets you tell those stories without standing in front of the camera. Behind the lens, you control what millions of fans see and feel — and that is real creative power.",

    usCompanies: [
      { name: 'ESPN / Disney Sports', location: 'Bristol, CT / Los Angeles, CA', type: 'Largest sports network in the world', url: 'disneycareers.com' },
      { name: 'NBC Sports', location: 'Stamford, CT / Remote', type: 'Major sports network', url: 'nbcunicareers.com' },
      { name: 'Bleacher Report', location: 'Atlanta, GA / Remote', type: 'Digital sports media brand', url: 'bleacherreport.com/jobs' },
      { name: 'The Undefeated (ESPN Black)', location: 'Remote', type: 'Black culture & sports media', url: 'theundefeated.com' },
      { name: 'Overtime Sports', location: 'New York, NY / Remote', type: 'Youth-focused digital sports media', url: 'overtime.tv/jobs' },
      { name: 'Turner Sports / TNT', location: 'Atlanta, GA', type: 'Major sports broadcaster (NBA on TNT)', url: 'warnermedia.com/careers' },
      { name: 'Amazon Prime Video Sports', location: 'Seattle, WA (remote)', type: 'Streaming sports broadcasting', url: 'amazon.jobs' },
      { name: 'DAZN', location: 'Chicago, IL / New York, NY', type: 'Global sports streaming platform', url: 'dazn.com/en-US/careers' },
    ],

    canadaCompanies: [
      { name: 'TSN (The Sports Network)', location: 'Toronto, ON', type: "Canada's ESPN — #1 sports network", url: 'tsn.ca/careers' },
      { name: 'Sportsnet (Rogers Media)', location: 'Toronto, ON', type: 'National sports network (NHL, MLB)', url: 'sportsnet.ca/careers' },
      { name: 'CBC Sports', location: 'Toronto, ON', type: 'Public national broadcaster — Olympics, hockey', url: 'cbc.ca/careers' },
      { name: 'DAZN Canada', location: 'Toronto, ON', type: 'Sports streaming (boxing, football)', url: 'dazn.com/careers' },
      { name: 'The Score (Score Media)', location: 'Toronto, ON', type: 'Digital sports media + betting', url: 'scoremediaandgaming.com/careers' },
    ],

    jobDescription: "Sports Broadcast Producers plan, direct, and assemble sports content — from live game broadcasts to documentary series to viral social reels. You decide what story gets told, how it gets told, and how the world experiences sports through a screen.",

    dayToDay: [
      'Plan pre-game show segments: which stories air, in what order, with what graphics',
      'Direct camera operators, graphics teams, and on-air talent during live broadcasts',
      'Review and cut game footage into highlight packages for broadcast and social media',
      'Write and coordinate rundown scripts with analysts and play-by-play talent',
      'Manage the social media content calendar for a team, network, or league account',
      'Pitch long-form documentary story ideas to editorial leadership',
      'Coordinate with post-production: color correction, sound design, graphics overlays',
    ],

    salary: {
      entry: { title: 'Production Assistant / Junior Producer', range: '$40,000 – $56,000', years: '0–2 years' },
      mid: { title: 'Associate Producer / Producer', range: '$65,000 – $90,000', years: '3–6 years' },
      senior: { title: 'Senior Producer / Segment Director', range: '$95,000 – $145,000', years: '7–12 years' },
      executive: { title: 'Executive Producer / Head of Content', range: '$180,000 – $400,000+', years: '12+ years' },
    },

    perks: [
      'Press credentials to any game you cover — courtside, sideline, or press box access',
      'Travel to major events: playoffs, Super Bowl, NBA Finals, World Series, World Cup — all paid',
      'Equipment stipend and access to cutting-edge production technology',
      'Direct access to athlete interviews and behind-the-scenes footage no fan ever sees',
      'Creative control — you shape the narrative of the sport',
      'Remote and hybrid options for post-production and editing roles',
      'Your work is seen by millions — your name in the credits of major productions',
    ],

    promotionPath: [
      { level: 1, title: 'Production Intern', when: 'Junior or Senior year', salary: '$15–20/hr' },
      { level: 2, title: 'Production Assistant', when: 'Year 1–2', salary: '$40,000 – $50,000' },
      { level: 3, title: 'Associate Producer', when: 'Year 3–5', salary: '$65,000 – $80,000' },
      { level: 4, title: 'Producer', when: 'Year 5–8', salary: '$85,000 – $115,000' },
      { level: 5, title: 'Senior Producer / Segment Director', when: 'Year 9–13', salary: '$120,000 – $165,000' },
      { level: 6, title: 'Executive Producer / Head of Content', when: 'Year 14+', salary: '$200,000 – $450,000+' },
    ],

    requiredDegree: {
      undergraduate: 'B.A. in Mass Communications, Broadcast Journalism, or Film & TV Production',
      alternates: ['B.A. in Sports Journalism', 'B.F.A. in Film & Television Production', 'B.A. in Digital Media & Communications'],
      certifications: ['Adobe Premiere Pro Certificate (industry standard)', 'Adobe After Effects — Motion Graphics', 'Final Cut Pro (Apple ecosystem)', 'Sports Broadcast Boot Camp (ESPN and industry programs offer these)'],
    },

    undergraduatePlan: {
      degree: 'B.A. in Mass Communications / Broadcast Journalism',
      totalCredits: 120,
      semesters: [
        {
          term: 'Year 1 — Fall Semester',
          focus: 'Learn the media landscape — understand who does what and why',
          courses: ['Introduction to Mass Communications', 'College Writing & Composition I', 'Fundamentals of Storytelling', 'Digital Tools for Media (Adobe intro)', 'Sports History & Culture'],
          credits: 15,
        },
        {
          term: 'Year 1 — Spring Semester',
          focus: 'Get a camera in your hand — start making things immediately',
          courses: ['Introduction to Journalism', 'College Writing & Composition II', 'Photography & Visual Storytelling', 'Introduction to Video Production', 'Sports in America (elective)'],
          credits: 15,
        },
        {
          term: 'Year 2 — Fall Semester',
          focus: 'Editing skills — the most important technical semester of your degree',
          courses: ['Broadcast Journalism I', 'Video Editing: Adobe Premiere Pro', 'Sports Reporting & Writing', 'Introduction to Sports Media Business', 'Media Law & Ethics'],
          credits: 15,
        },
        {
          term: 'Year 2 — Spring Semester',
          focus: 'Build your reel — everything you make this semester is a portfolio piece',
          courses: ['Broadcast Journalism II', 'Advanced Video Production', 'Social Media Strategy for Sports Brands', 'Audio Production & Podcast Fundamentals', 'Sports Marketing'],
          credits: 15,
        },
        {
          term: 'Year 3 — Fall Semester',
          focus: 'Long-form storytelling — the skill that separates you from every other producer',
          courses: ['Sports Broadcasting Production (live TV)', 'Motion Graphics & Visual Effects: After Effects', 'Long-Form Documentary Production', 'Sports Media Business & Revenue Models', 'Diversity in Sports Media'],
          credits: 15,
        },
        {
          term: 'Year 3 — Spring Semester',
          focus: 'Get the internship — ESPN, Bleacher Report, or a local sports network',
          courses: ['Live Production & Directing (real broadcast simulations)', 'Digital Media Strategy & Analytics', 'Sports Photojournalism', 'Media Entrepreneurship', 'Internship Application Seminar'],
          credits: 15,
        },
        {
          term: 'Year 4 — Fall Semester',
          focus: 'Your capstone IS your job application — make something you are proud of',
          courses: ['Senior Capstone: Original Sports Documentary or Pilot Series', 'Advanced Sports Broadcasting', 'Sponsorship & Brand Integration in Media', 'Career Portfolio Development', 'Media Leadership'],
          credits: 15,
        },
        {
          term: 'Year 4 — Spring Semester',
          focus: 'Graduate with a reel, references, and an offer already in hand',
          courses: ['Capstone Screening & Industry Presentation', 'Professional Development in Media', 'Pitch Workshop: Sell your ideas to networks', 'Transition to Industry Seminar', 'Final Portfolio Review'],
          credits: 15,
        },
      ],
    },

    mastersPath: {
      degree: 'M.A. in Sports Journalism or M.F.A. in Film & Television Production',
      duration: '2 years',
      whyGetIt: 'The M.A. or M.F.A. opens Executive Producer and Head of Content doors. It also gives you access to the major network relationships you need to pitch your own shows.',
      topPrograms: [
        'Northwestern University Medill — M.S. in Journalism (Sports Media focus)',
        'Syracuse University Newhouse — M.A. in Broadcast & Digital Journalism',
        'USC School of Cinematic Arts — M.F.A. in Film & Television Production',
        'Boston University — M.S. in Journalism (Sports concentration)',
        'Ryerson University (Canada, now TMU) — M.J. in Journalism with Sports track',
      ],
      rolesUnlocked: [
        { title: 'Senior Producer at Major Network', salary: '$130,000 – $180,000' },
        { title: 'Director of Content Strategy', salary: '$165,000 – $240,000' },
        { title: 'Executive Producer — Original Series', salary: '$250,000 – $500,000+' },
      ],
      semesterPlan: [
        { term: 'Masters Year 1 — Fall', courses: ['Advanced Documentary Production', 'Media Business & Revenue Models', 'Storytelling for Streaming Platforms (Netflix/ESPN+)', 'Research in Sports Media'] },
        { term: 'Masters Year 1 — Spring', courses: ['Long-Form Series Development & Pitching', 'Sports Media Rights Law', 'Leadership in Creative Organizations', 'Industry Practicum: Shadow a Senior Producer at a real network'] },
        { term: 'Masters Year 2 — Fall', courses: ['Advanced Production Management', 'Content Monetization & Streaming Strategy', 'Emerging Technologies: VR/AR in Sports Broadcasting', 'Thesis/Capstone Project I'] },
        { term: 'Masters Year 2 — Spring', courses: ['Thesis: Original Series Pilot or Feature Documentary', 'Executive Pitch Workshop: Pitch to real networks', 'Streaming & Network Partnership Strategy', 'Graduate'] },
      ],
    },
  },

  // ── 4. SPORTS AGENT / AGENCY OPERATIONS ──────────────────────────────────
  sportsAgencyOps: {
    id: 'sportsAgencyOps',
    title: 'Sports Agent / Agency Operations',
    alternativeTitles: ['Athlete Representative', 'Sports Marketing Agent', 'Contract Negotiations Specialist', 'Client Relations Manager'],

    whyThisFits: "You understand athletes from the inside — the pressure, the stakes, the sacrifices, the loyalty. Sports agency is where you use that understanding to protect athletes' careers and their money. Early-career roles are behind the scenes — you learn the business before you become the face.",

    usCompanies: [
      { name: 'Wasserman Media Group', location: 'Los Angeles, CA', type: 'Top global sports agency', url: 'teamwass.com/careers' },
      { name: 'CAA Sports (Creative Artists Agency)', location: 'Los Angeles / New York', type: 'One of the most powerful agencies in sports', url: 'caa.com/careers' },
      { name: 'Excel Sports Management', location: 'New York, NY', type: 'Elite athletes across NFL, NBA, MLB, golf', url: 'excelsm.com' },
      { name: 'Roc Nation Sports (Jay-Z)', location: 'New York, NY', type: 'Celebrity-backed, culture-forward agency', url: 'rocnation.com/careers' },
      { name: 'Klutch Sports Group (Rich Paul)', location: 'Los Angeles, CA', type: 'Elite Black-owned sports agency', url: 'klutchsports.com' },
      { name: 'WME Sports (Endeavor)', location: 'Beverly Hills, CA', type: 'Global sports and entertainment powerhouse', url: 'endeavorco.com/careers' },
      { name: 'Octagon Sports', location: 'Norwalk, CT', type: 'Global sports marketing and athlete management', url: 'octagon.com/careers' },
    ],

    canadaCompanies: [
      { name: 'Newport Sports Management', location: 'Toronto, ON', type: 'Premier hockey and multi-sport agency', url: 'newportsports.com' },
      { name: 'Orr Hockey Group', location: 'Toronto, ON', type: 'Elite NHL player representation', url: 'orrhockeygroup.com' },
      { name: 'Octagon Canada', location: 'Toronto, ON', type: 'Global sports marketing (Canadian division)', url: 'octagon.com' },
      { name: 'IMG Canada', location: 'Toronto, ON', type: 'International sports management and media', url: 'img.com/careers' },
      { name: 'TLA Worldwide Canada', location: 'Toronto, ON', type: 'Hockey player agency + brand deals', url: 'tlaworldwide.com' },
    ],

    jobDescription: "Sports agents and agency operations staff represent professional athletes in contract negotiations, marketing deals, endorsement arrangements, and long-term career planning. Operations roles manage the business infrastructure that supports agents and their athlete clients — making deals actually happen.",

    dayToDay: [
      'Research upcoming draft classes: evaluate player stats, market value, team needs',
      'Prepare detailed contract comparison reports to use as leverage in negotiations',
      'Coordinate athlete appearances: speaking engagements, endorsement events, media days',
      'Manage client communications and follow up on pending contract offers',
      'Review marketing proposals, brand deals, and sponsorship agreements',
      'Track league contract databases, free-agency timelines, and salary cap space',
      'Build and maintain relationships with GMs, coaches, and team front offices',
    ],

    salary: {
      entry: { title: 'Agency Operations Assistant', range: '$40,000 – $58,000', years: '0–2 years' },
      mid: { title: 'Associate Agent / Client Relations Manager', range: '$65,000 – $100,000', years: '3–6 years' },
      senior: { title: 'Certified Agent / Senior Client Manager', range: '$100,000 – $250,000', years: '7–12 years' },
      executive: { title: 'Partner / Head of Basketball or Football Division', range: '$300,000 – $2,000,000+ (commission-based)', years: '12+ years' },
    },

    perks: [
      'VIP game access — courtside seats, field-level, private owner suites',
      'Travel with clients to games, drafts, award shows, and celebrity appearances',
      'Commission structure — you earn more as your clients earn more (% of contracts)',
      'Access to athlete inner circles: private events, team facilities, training camps',
      'Network at the highest levels: team owners, GMs, league commissioners',
      'Attend NFL Draft, NBA Draft, MLB Draft, and NHL Draft in official capacity',
      'Potential to represent athletes worth tens or hundreds of millions of dollars',
    ],

    promotionPath: [
      { level: 1, title: 'Agency Intern', when: 'Junior or Senior year (often unpaid)', salary: 'Unpaid / $15–18/hr if paid' },
      { level: 2, title: 'Operations Assistant', when: 'Year 1–2', salary: '$40,000 – $58,000' },
      { level: 3, title: 'Associate Agent', when: 'Year 3–5', salary: '$65,000 – $100,000' },
      { level: 4, title: 'Certified Agent (licensed)', when: 'Year 5–9', salary: '$100,000 – $250,000+' },
      { level: 5, title: 'Senior Agent / Director', when: 'Year 10–15', salary: '$200,000 – $600,000' },
      { level: 6, title: 'Partner / Division Head', when: 'Year 15+', salary: '$500,000 – $2,000,000+ (commission)' },
    ],

    requiredDegree: {
      undergraduate: 'B.S. in Sports Management, Business Administration, or Pre-Law',
      alternates: ['B.A. in Communications with Business or Pre-Law minor', 'B.S. in Marketing with Sports Management focus'],
      certifications: ['NFLPA Certified Contract Advisor (required to represent NFL players)', 'NBPA Registration (required for NBA players)', 'State-specific sports agent registration (most states require this)', 'Bar Exam / J.D. strongly preferred at top agencies'],
    },

    undergraduatePlan: {
      degree: 'B.S. in Sports Management / Business Administration (Pre-Law track)',
      totalCredits: 120,
      semesters: [
        {
          term: 'Year 1 — Fall Semester',
          focus: 'Business and law foundation — this career is built on both equally',
          courses: ['Introduction to Sports Management', 'Business Law I', 'College Writing & Composition', 'Principles of Business', 'Introduction to Marketing'],
          credits: 15,
        },
        {
          term: 'Year 1 — Spring Semester',
          focus: 'Communication and legal thinking — your two most important skills',
          courses: ['Business Law II', 'Macroeconomics', 'Sports in Society', 'Public Speaking', 'Computer Applications for Business'],
          credits: 15,
        },
        {
          term: 'Year 2 — Fall Semester',
          focus: 'Contract law is where the money lives — master this now',
          courses: ['Sports Law & Ethics', 'Contract Law', 'Sports Marketing', 'Organizational Behavior', 'Financial Accounting'],
          credits: 15,
        },
        {
          term: 'Year 2 — Spring Semester',
          focus: 'Negotiation — the skill that separates good agents from great ones',
          courses: ['Labor Law & Collective Bargaining in Sports', 'Sports Finance', 'Negotiation & Conflict Resolution', 'Sports Media & Publicity Relations', 'Research Methods'],
          credits: 15,
        },
        {
          term: 'Year 3 — Fall Semester',
          focus: 'Agent-specific coursework — this is your lane, get deep into it',
          courses: ['Athlete Representation & Agent Law', 'Sports Salary Arbitration', 'Endorsement & Sponsorship Law', 'Sports Business Strategy', 'Leadership Development'],
          credits: 15,
        },
        {
          term: 'Year 3 — Spring Semester',
          focus: 'Get the agency internship — this is the foot in the door that changes everything',
          courses: ['Advanced Contract Negotiations', 'Risk Management in Sports', 'International Sports Business', 'Sports Entrepreneurship', 'Internship Application Seminar'],
          credits: 15,
        },
        {
          term: 'Year 4 — Fall Semester',
          focus: 'Start building your network NOW — relationships are your inventory',
          courses: ['Senior Capstone: Mock Contract Negotiation & Agency Business Plan', 'Professional Sports Labor Relations', 'Brand Management for Athletes', 'Social Media Strategy for Athlete Brands', 'Career Strategy in Sports Agency'],
          credits: 15,
        },
        {
          term: 'Year 4 — Spring Semester',
          focus: 'Graduate with certifications started and your first relationships established',
          courses: ['Capstone Presentation', 'Agent Certification Preparation', 'Sports Business Ethics Seminar', 'State Agent Registration Workshop', 'Professional Networking in Sports'],
          credits: 15,
        },
      ],
    },

    mastersPath: {
      degree: 'J.D. (Law Degree) with Sports Law focus — OR — M.S. in Sports Administration',
      duration: '3 years for J.D. / 2 years for M.S.',
      whyGetIt: 'A J.D. is the gold standard for top-tier agents. It lets you negotiate contracts at the highest levels and represent your clients in arbitration. The M.S. is faster and gets you to Director-level operations without passing the bar.',
      topPrograms: [
        'Tulane University School of Law — J.D. with Sports Law Certificate',
        'Marquette University Law School — J.D. with National Sports Law Institute',
        'Fordham University School of Law — Sports Law',
        'University of Ottawa (Canada) — J.D. with Sports Law concentration',
        'Ohio University — M.S. in Sports Administration (if not pursuing J.D.)',
      ],
      rolesUnlocked: [
        { title: 'Certified Agent (NFL/NBA/MLB)', salary: '$150,000 – $600,000 (commission-based)' },
        { title: 'Director of Contract Negotiations', salary: '$200,000 – $400,000' },
        { title: 'Partner / Division Head', salary: '$500,000 – $2,000,000+' },
      ],
      semesterPlan: [
        { term: 'Law School Year 1 — Fall', courses: ['Contracts', 'Torts', 'Civil Procedure', 'Legal Research & Writing'] },
        { term: 'Law School Year 1 — Spring', courses: ['Criminal Law', 'Property Law', 'Constitutional Law', 'Legal Writing II'] },
        { term: 'Law School Year 2 — Fall', courses: ['Sports Law I: Athlete Representation', 'Labor Relations in Professional Sports', 'Entertainment Law', 'Business Organizations'] },
        { term: 'Law School Year 2 — Spring', courses: ['Sports Law II: Contract Negotiations', 'Federal Income Tax (athletes have complex tax situations)', 'Arbitration & Dispute Resolution', 'Sports Law Clinic: Real client work with supervision'] },
        { term: 'Law School Year 3 — Fall', courses: ['Advanced Sports Contract Law', 'International Sports Law', 'Sports Law Journal (editorial leadership role)', 'Agent Certification Preparation'] },
        { term: 'Law School Year 3 — Spring', courses: ['Bar Exam Preparation', 'Capstone: Real Negotiation Simulation', 'Final Electives in Sports & Entertainment Law', 'Graduate — Pass Bar — Get Licensed'] },
      ],
    },
  },
};

// ─── Helper: Get blueprint by career track id ─────────────────────────────────
export function getCareerBlueprint(trackId) {
  return CAREER_BLUEPRINTS[trackId] || null;
}

// ─── All four blueprints as ordered array ─────────────────────────────────────
export const ALL_CAREER_BLUEPRINTS = [
  CAREER_BLUEPRINTS.sportsAnalytics,
  CAREER_BLUEPRINTS.sportsOperations,
  CAREER_BLUEPRINTS.broadcastProduction,
  CAREER_BLUEPRINTS.sportsAgencyOps,
];
