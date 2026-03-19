// ─── MELVIN SECTION 6 — EXECUTIVE FUNCTION ───────────────────────────────────
// Built for Melvin Jr. — 17, Deep East Oakland, Morehouse-bound, Finance track.
// Probe: Can he plan, organize, start, finish, prioritize, and sustain focus
//        independently — without a coach, a team schedule, or external scaffolding?
//
// Key tensions:
//   → Dyslexia frequently co-occurs with executive function challenges
//     (working memory, planning, initiation) — his 4.2 GPA may have masked these
//   → Basketball coach managed EF externally: practice plans, film schedules,
//     game prep, weekly structure → Melvin showed up to a pre-built system
//   → Morehouse finance: multiple simultaneous deadlines, reading-heavy syllabi,
//     case studies, group projects, internship applications — all self-managed
//   → His compensation strategies (showing up, working hard) may not scale
//     to college-level task volume and complexity
//   → Finance career = one of the highest EF-demand careers: compliance deadlines,
//     simultaneous client files, regulatory reporting, market timing
//
// WHAT THIS SECTION MUST DETERMINE:
//   1. Is his planning skill real or was it externally produced by basketball structure?
//   2. Does dyslexia affect his EF beyond reading — initiation, working memory, sequencing?
//   3. Can he start difficult tasks without external prompt or consequence pressure?
//   4. Does he have any organizational system — digital or physical?
//   5. How does he handle competing priorities — does he choose or does he freeze?
//   6. What is his phone/distraction relationship and can he control it?
// ─────────────────────────────────────────────────────────────────────────────

export const MELVIN_SECTION_6 = {
  id: 'melvin_section6',
  title: 'Executive Function',
  subtitle: 'Planning, Organization, Initiation, Completion, Priority & Attention',
  userId: 'melvin',
  subsections: [
    'Planning',
    'Organization',
    'Task Initiation',
    'Task Completion',
    'Prioritization',
    'Attention Control',
  ],
  questions: [

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 6A — PLANNING
    // Target: Does he plan ahead or react? Are plans specific or aspirational?
    // Probe: Short-term planning (today, this week) vs. long-range planning
    //        (Morehouse prep). Does planning translate to execution?
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms6_01',
      subsection: '6A',
      subsectionName: 'Planning',
      type: 'open',
      text: 'How do you plan your week — walk me through your actual process, not what you think it should look like. Do you use anything, write anything down, or does it mostly stay in your head?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Has a specific process — uses a calendar, a list, a phone app, something external. Can describe the process and when it happens.',
        weak: '"I just know what I have to do" — entirely mental planning with no external system. Relies on memory and implicit awareness of deadlines.',
        complex: 'For dyslexic learners, working memory is often a challenge — this makes external planning systems more important, not less. An all-mental system that works in high school often fails under college load.',
      },
      redFlags: [
        '"I just keep it in my head"',
        '"I don\'t really plan — I just do what comes up"',
        'No external planning tool named',
      ],
      followUp: {
        condition: 'no external planning system described',
        question: 'At Morehouse, you\'ll have multiple classes, multiple professors\' deadlines, internship application windows, and advisor check-ins all running simultaneously. What system handles all of that?',
      },
    },

    {
      id: 'ms6_02',
      subsection: '6A',
      subsectionName: 'Planning',
      type: 'forced_choice',
      text: 'When you have something important coming up — a test, a deadline, a meeting — how far in advance do you typically start preparing?',
      options: [
        'Well in advance — I give myself a runway and work toward it in stages',
        'A few days before — I know it\'s coming but I tend to prep close to the deadline',
        'The day before or the night before — I work best under deadline pressure',
        'When I have to — when the deadline is real and unavoidable',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A: runway planning — most effective for dyslexia reading workload that requires more time than average',
        weak: 'Option D: deadline-activation only — high-risk for dyslexic learner because reading-heavy material cannot be compressed into a last-minute sprint',
        complex: 'Option C is very common and not catastrophic for some content. For dyslexia + reading-heavy finance coursework, deadline-night prep is structurally insufficient.',
      },
      redFlags: [
        'Option D — activation only at hard deadline',
        'Option C combined with dyslexia and reading-heavy coursework',
      ],
      followUp: {
        condition: 'answer is Option C or D',
        question: 'Your dyslexia means reading takes significantly longer than average. How does deadline-night prep work when a reading assignment that takes others 40 minutes takes you 3 hours?',
      },
    },

    {
      id: 'ms6_03',
      subsection: '6A',
      subsectionName: 'Planning',
      type: 'scenario',
      text: 'It\'s the first week of September at Morehouse. Your professor hands out the syllabus for Intro to Finance. It has six major assignments, two midterms, and a final project due across 15 weeks. Walk me through exactly what you do with that syllabus in the next 48 hours.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Puts all due dates into a calendar or planner immediately. Works backward from major deadlines to identify prep start dates. Notes which assignments require extended time for reading. Identifies the highest-weight items.',
        weak: '"I\'d look at it and keep track of what\'s coming up." No calendar entry, no backward planning, no tool used. Syllabus as reference document rather than planning input.',
        complex: 'The syllabus-to-calendar behavior in week one is one of the strongest predictors of semester success. Students who don\'t system-ize the syllabus in week one typically encounter deadlines as surprises.',
      },
      redFlags: [
        'No calendar or planner entry described',
        '"I\'d keep it and refer back to it"',
        'No backward planning from deadlines',
        '"I\'d remember the important ones"',
      ],
      followUp: {
        condition: 'no calendar action described',
        question: 'What planning tool — phone calendar, physical planner, app — would you use for that? Do you have one now?',
      },
    },

    {
      id: 'ms6_04',
      subsection: '6A',
      subsectionName: 'Planning',
      type: 'likert',
      text: 'My plans tend to match my execution — when I plan to do something, I actually do it at the time I planned.',
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
        strong: 'Agree with behavioral evidence — plans convert to completed actions with high regularity',
        weak: 'Strongly Disagree: significant plan-to-execution gap — plans exist but don\'t reliably produce action',
        complex: 'For many people, planning is emotionally satisfying as an activity but doesn\'t reliably produce execution. The plan-to-execution gap is a distinct EF variable from planning quality.',
      },
      redFlags: ['Strongly Disagree — plans exist but don\'t convert to action'],
      followUp: {
        condition: 'answer in ["Strongly Disagree", "Disagree"]',
        question: 'Where does the plan usually break down — is it the plan itself that\'s unrealistic, or is something happening between the plan and the follow-through?',
      },
    },

    {
      id: 'ms6_05',
      subsection: '6A',
      subsectionName: 'Planning',
      type: 'open',
      text: 'Right now — today — what is your plan for the next 30 days? What specifically needs to happen between now and then, and in what order?',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Can articulate a 30-day plan with specific items, approximate sequence, and some sense of priority. Plan is realistic.',
        weak: 'Cannot articulate a 30-day plan. Or plan is aspirational without specific steps.',
        complex: 'This is a live planning test. Not what he plans about Morehouse abstractly — what the actual next 30 days look like in his mind right now.',
      },
      redFlags: [
        'Cannot name more than 2 specific things in the next 30 days',
        '"I\'ll figure it out as it comes"',
        'No Morehouse preparation items in a 30-day window 5 months from enrollment',
      ],
      followUp: {
        condition: 'no Morehouse prep in 30-day plan',
        question: 'What\'s the first Morehouse-specific thing that should be in that 30-day plan — IEP outreach, financial aid review, advisor contact, orientation registration?',
      },
    },

    {
      id: 'ms6_06',
      subsection: '6A',
      subsectionName: 'Planning',
      type: 'slider',
      text: 'How strong is your planning ability right now — your ability to look ahead, map out what needs to happen, and build toward it?',
      min: 1,
      max: 10,
      weight: 1.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: '7–10 with external planning system and behavioral evidence',
        weak: '1–4: significant planning gap — needs tools and structure before Morehouse',
        complex: 'Cross-reference with ms6_01 and ms6_03. If no external planning tool exists, the score should not exceed 6.',
      },
      redFlags: ['8–10 with no planning system described in ms6_01 or ms6_03'],
      followUp: {
        condition: 'score >= 7 with no planning tool described',
        question: 'What specific tool or system are you using that makes you confident in that score?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 6B — ORGANIZATION
    // Target: Is his environment and information organized — or improvised?
    // Probe: Physical organization, digital organization, document management
    //        Can he find what he needs when he needs it?
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms6_07',
      subsection: '6B',
      subsectionName: 'Organization',
      type: 'open',
      text: 'Describe the state of your school materials right now — notes, assignments, handouts. If you needed to find something from two weeks ago, could you? Where would it be?',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Has a system — binder, folders, digital notes, organized by class. Can describe where materials live and how they\'re organized.',
        weak: '"Probably in my backpack somewhere" — no system, locating materials requires searching',
        complex: 'Organization of school materials is a direct predictor of study efficiency. For a dyslexic learner who already spends more time on materials, disorganization compounds the time cost.',
      },
      redFlags: [
        '"I\'d have to look for it"',
        'Materials described as scattered or in a backpack pile',
        'No organizational system described',
      ],
      followUp: {
        condition: 'no system described',
        question: 'At Morehouse, each class will have notes, readings, assignments, professor slides, and a syllabus. What system will you use to keep all of that organized across six or seven classes?',
      },
    },

    {
      id: 'ms6_08',
      subsection: '6B',
      subsectionName: 'Organization',
      type: 'forced_choice',
      text: 'When you have multiple things to do — assignments, tasks, commitments — how do you keep track of them?',
      options: [
        'I use a system — a list, an app, a planner — and I keep it updated',
        'I keep a mental list and usually remember what I need to do',
        'I rely on reminders, notifications, or other people to keep me on track',
        'I handle things as they come up and hope I don\'t miss anything important',
      ],
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A: external capture system — most reliable for managing multi-task load',
        weak: 'Option D: reactive task management — cannot handle Morehouse concurrent deadline load',
        complex: 'Option B is common in high school where the task volume is lower and routine is predictable. It fails under college volume where tasks are heterogeneous and deadlines are professor-specific.',
      },
      redFlags: [
        'Option D — reactive task management as primary system',
        'Option B at college task volume — mental list insufficient for concurrent course deadlines',
      ],
      followUp: {
        condition: 'answer is Option B, C, or D',
        question: 'At Morehouse you\'ll have six classes simultaneously, each with their own assignment schedule. A mental list works for one or two things — what handles six concurrent syllabi?',
      },
    },

    {
      id: 'ms6_09',
      subsection: '6B',
      subsectionName: 'Organization',
      type: 'likert',
      text: 'I know where my important documents are — school records, financial aid information, IEP documentation — and I can access them when I need them.',
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
        strong: 'Agree: organized document access — particularly important for IEP transfer to Morehouse which requires specific documentation',
        weak: 'Disagree/Strongly Disagree: document disorganization — an IEP that cannot be found cannot be submitted to Morehouse disability services',
        complex: 'This is functionally critical: the Morehouse IEP setup requires him to submit his existing IEP documentation. If he can\'t locate it, the accommodation setup is blocked.',
      },
      redFlags: [
        'Disagree or Strongly Disagree — especially regarding IEP documentation',
        '"My mom handles most of that stuff"',
      ],
      followUp: {
        condition: 'answer in ["Disagree", "Strongly Disagree"] or mom-dependency detected',
        question: 'Your IEP documentation needs to go to Morehouse disability services. Who has that document right now and how do you get a copy of it?',
      },
    },

    {
      id: 'ms6_10',
      subsection: '6B',
      subsectionName: 'Organization',
      type: 'scenario',
      text: 'It\'s October at Morehouse. You have three classes meeting today, two assignments due this week, and an advisor check-in tomorrow. You\'re in the dining hall. Walk me through how you know what you need to do today and in what order.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Opens a planner, calendar app, or task list. Has today\'s tasks already mapped. Can sequence them by priority and time. System is portable and accessible.',
        weak: '"I\'d just think through it." No external tool. Information lives entirely in memory. Under stress or fatigue, this system fails.',
        complex: 'The dining hall test is a portability and accessibility test. Organization systems that only exist in a fixed location (bedroom desk) don\'t work in a mobile college environment.',
      },
      redFlags: [
        '"I\'d just think through what I need to do"',
        'No external tool accessed',
        'Cannot sequence the tasks without the system failing under pressure',
      ],
      followUp: {
        condition: 'mental-only tracking described',
        question: 'That approach works when you\'re rested, not stressed, and nothing is overlapping. When all three break down at once — what does your organization system look like then?',
      },
    },

    {
      id: 'ms6_11',
      subsection: '6B',
      subsectionName: 'Organization',
      type: 'open',
      text: 'What would someone see if they looked at your bedroom, your backpack, and your phone right now in terms of organization? Be honest.',
      options: null,
      weight: 1.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Honest description with specific detail. Some systems present even if imperfect.',
        weak: 'Defensive or evasive. Or describes ideal state rather than actual state.',
        complex: 'Physical and digital environment organization often mirrors internal organization. This isn\'t deterministic, but it\'s informative.',
      },
      redFlags: ['"It\'s fine" with no specifics', 'Describes ideal rather than actual'],
      followUp: {
        condition: 'disorganization is described',
        question: 'At Morehouse you\'re in a small dorm room, potentially with a roommate. What system keeps your academic materials organized in a shared space?',
      },
    },

    {
      id: 'ms6_12',
      subsection: '6B',
      subsectionName: 'Organization',
      type: 'slider',
      text: 'How organized are you — your materials, your schedule, your information — on a scale of 1 to 10?',
      min: 1,
      max: 10,
      weight: 1.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: '7–10 with specific systems described in ms6_07 through ms6_10',
        weak: '7–10 with no described system — confidence without infrastructure',
        complex: 'Cross-reference throughout 6B. Organization self-ratings are frequently inflated.',
      },
      redFlags: ['8–10 with no external system described anywhere in 6B'],
      followUp: {
        condition: 'score >= 7 with no system evidence',
        question: 'What specifically is organized — walk me through one concrete example of your system in action.',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 6C — TASK INITIATION
    // Target: How easily does he start tasks — especially hard, unpleasant, or large ones?
    // Probe: Initiation gap for reading-heavy work (dyslexia + EF),
    //        procrastination patterns, what prompts the start
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms6_13',
      subsection: '6C',
      subsectionName: 'Task Initiation',
      type: 'open',
      text: 'When you have a reading-heavy assignment — a chapter to read, a report to study, something dense — how long does it typically take from when you know it\'s due to when you actually start it?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Starts it early — same day or next day after assignment. Accounts for the extra time dyslexia adds. Doesn\'t defer until pressure.',
        weak: 'Defers until the night before or the day of. Reading tasks in particular have high initiation barriers for dyslexic learners — the anticipation of difficulty creates avoidance.',
        complex: 'Task initiation for reading is a specific EF variable for dyslexia. The anticipation of a long, difficult reading task creates a disproportionate avoidance response. Understanding his initiation gap for reading specifically predicts one of his key Morehouse risks.',
      },
      redFlags: [
        'Consistently starts reading tasks the night before',
        '"I usually wait until I have to"',
        'Cannot start reading tasks without an immediate deadline',
      ],
      followUp: {
        condition: 'deferred initiation described',
        question: 'With your dyslexia adding significant time to reading tasks — what happens to a reading assignment you defer until the night before?',
      },
    },

    {
      id: 'ms6_14',
      subsection: '6C',
      subsectionName: 'Task Initiation',
      type: 'forced_choice',
      text: 'When a task feels big, overwhelming, or unpleasant — your first instinct is:',
      options: [
        'Break it into smaller pieces and start the first piece immediately',
        'Do the easy parts first to build momentum, then tackle the hard part',
        'Delay starting until I feel more ready or motivated',
        'Find something else to do — the task stays in the back of my mind but I don\'t start',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A: decomposition and immediate start — high EF initiation skill',
        weak: 'Option D: task deferral through displacement — avoidance disguised as productivity',
        complex: 'Option C (waiting until motivated) is the most common procrastination pattern. The problem: motivation follows action more reliably than it precedes it. Waiting for motivation before starting is a low-yield initiation strategy.',
      },
      redFlags: [
        'Option D — displacement avoidance',
        'Option C combined with dyslexia reading tasks — waiting for motivation on hard reading tasks means not starting',
      ],
      followUp: {
        condition: 'answer is Option C or D',
        question: 'What specifically does it feel like in the moment right before you delay — what\'s happening internally?',
      },
    },

    {
      id: 'ms6_15',
      subsection: '6C',
      subsectionName: 'Task Initiation',
      type: 'scenario',
      text: 'You have a 10-page finance paper due in two weeks. You\'ve never written a college-level finance paper. It requires reading three academic articles — dense economic theory. It\'s Sunday morning and you have the whole day free. Do you start today? Walk me through what actually happens.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Starts today — reads one article, outlines a structure, makes progress. Uses the runway. Doesn\'t treat two weeks as infinite space.',
        weak: '"I\'d start next week — I have time." Two-week runway treated as sufficient without a start plan. Initiation deferred without a specific start date.',
        complex: 'The Sunday morning free day is the initiation test. No deadline pressure. No external prompt. Just the task and a free morning. What he does tells you whether initiation is externally or internally activated.',
      },
      redFlags: [
        '"I\'d start next week"',
        '"Two weeks is plenty of time"',
        'No article reading initiated today',
        '"I\'d use today to relax first"',
      ],
      followUp: {
        condition: 'doesn\'t start today',
        question: 'If you don\'t start today, when specifically will you start? What day, what time, and what will be the trigger?',
      },
    },

    {
      id: 'ms6_16',
      subsection: '6C',
      subsectionName: 'Task Initiation',
      type: 'likert',
      text: 'I have a tendency to put off starting tasks I find difficult or unpleasant — even when I know it costs me later.',
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
        strong: 'Strongly Disagree with behavioral evidence — task initiation is not a consistent struggle',
        weak: 'Agree/Strongly Agree: honest identification of procrastination tendency — critical to address before Morehouse',
        complex: 'Agreeing here is honest self-awareness. The question is whether naming it produces change. Cross-reference with ms6_15 scenario.',
      },
      redFlags: ['Agree or Strongly Agree — particularly for reading-heavy tasks given dyslexia'],
      followUp: {
        condition: 'answer in ["Agree", "Strongly Agree"]',
        question: 'You just named that pattern. At Morehouse, reading-heavy finance assignments arrive every week. What specifically changes about how you handle initiation there?',
      },
    },

    {
      id: 'ms6_17',
      subsection: '6C',
      subsectionName: 'Task Initiation',
      type: 'open',
      text: 'What is the hardest type of task for you to start — not finish, just start? What does the experience of not starting feel like?',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Can identify a specific task type and describe the internal experience of deferral. Shows metacognitive access to his own initiation barriers.',
        weak: '"I don\'t really have a problem starting things" — inability to identify initiation barrier when behavioral data suggests one exists',
        complex: 'The description of what deferral feels like is the most useful data in 6C. Understanding whether it\'s anxiety, boredom, overwhelm, or anticipatory fatigue determines the right intervention.',
      },
      redFlags: ['"I just start things when I need to — I don\'t really have that problem"'],
      followUp: {
        condition: 'reading or dense material named as hardest to start',
        question: 'Given your dyslexia, that makes complete sense — reading tasks have a higher internal cost. What accommodation or strategy specifically addresses that initiation barrier?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 6D — TASK COMPLETION
    // Target: Does he finish what he starts — at full quality, not just minimum?
    // Probe: Abandonment patterns, minimum viable completion vs. full quality,
    //        what causes tasks to be left unfinished
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms6_18',
      subsection: '6D',
      subsectionName: 'Task Completion',
      type: 'open',
      text: 'Walk me through a recent academic task that you didn\'t complete — or completed at less than your actual ability. What happened?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names a specific task honestly. Can trace the sequence from start to non-completion. Shows self-awareness about what caused the breakdown.',
        weak: '"I usually complete things" with no example. Or: names a completion but not a non-completion — avoids the uncomfortable answer.',
        complex: 'The willingness to name an incomplete task is itself data. Someone who can\'t name one has either an unusually clean record (possible given his 4.2) or an inability to access self-critical information.',
      },
      redFlags: [
        '"I don\'t really leave things incomplete"',
        'Only names something trivial',
        'Cannot trace the sequence of why it happened',
      ],
      followUp: {
        condition: 'specific incomplete named',
        question: 'At what point did you know it wasn\'t going to get done — or wasn\'t going to be your best? What was happening internally?',
      },
    },

    {
      id: 'ms6_19',
      subsection: '6D',
      subsectionName: 'Task Completion',
      type: 'forced_choice',
      text: 'When you finish an assignment or task, it\'s usually:',
      options: [
        'Done to the best of my ability — I don\'t submit something I\'m not satisfied with',
        'Done well enough — I meet the requirements but I know I could have done more',
        'Done to the minimum — I do what I need to pass and move on',
        'Variable — sometimes my best, sometimes barely done, depending on my motivation',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A: quality-standard completion — consistent with his 4.2 GPA track record',
        weak: 'Option D: motivation-contingent quality — inconsistent completion standard creates unpredictable academic performance',
        complex: 'Option B is intellectually honest and not necessarily problematic. Option C at Morehouse level coursework will produce poor outcomes.',
      },
      redFlags: [
        'Option D — quality tied to motivation (which is currently low)',
        'Option C — minimum viable product orientation in finance coursework',
      ],
      followUp: {
        condition: 'answer is Option D',
        question: 'With your motivation currently lower than usual — what does that mean for the quality of what you\'re turning in right now?',
      },
    },

    {
      id: 'ms6_20',
      subsection: '6D',
      subsectionName: 'Task Completion',
      type: 'scenario',
      text: 'You\'re halfway through a major assignment. It\'s harder than you expected. It\'s taking longer than you planned. You have other things to do. You\'re tired. What happens to the assignment?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Pushes through. Has a system for when tasks are harder than expected — takes a break and returns, breaks it into the next smaller step, seeks help on the hard part.',
        weak: 'Stops for the night and doesn\'t return with full energy. Does the minimum to submit. Lets it sit unfinished until deadline pressure.',
        complex: 'This scenario tests midpoint abandonment — a specific EF variable distinct from initiation. Someone who starts well can still fail at the midpoint when the difficulty reveals itself.',
      },
      redFlags: [
        '"I\'d finish the parts I know and submit what I have"',
        '"I\'d come back to it but honestly I might not get back to it"',
        '"I\'d power through even if it\'s not my best"',
      ],
      followUp: {
        condition: 'midpoint struggle is named',
        question: 'What would make you ask for help at the midpoint rather than pushing through solo at lower quality?',
      },
    },

    {
      id: 'ms6_21',
      subsection: '6D',
      subsectionName: 'Task Completion',
      type: 'likert',
      text: 'Once I start something, I see it through to completion — I don\'t abandon tasks partway through.',
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
        strong: 'Agree with basketball and 4.2 GPA as behavioral evidence — completion is a track record',
        weak: 'Strongly Agree with no nuance given current motivation drop — overconfident completion claim',
        complex: 'His track record (basketball full season, honor roll) supports Agree for his high-stakes commitments. The question is whether that extends to lower-stakes or difficult-format tasks.',
      },
      redFlags: ['Strongly Agree with motivation-contingent quality named in ms6_19'],
      followUp: null,
    },

    {
      id: 'ms6_22',
      subsection: '6D',
      subsectionName: 'Task Completion',
      type: 'open',
      text: 'Is there anything you\'ve started in the last few months — a goal, a habit, a project — that you haven\'t finished and probably won\'t? What happened?',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Can name something honestly. Shows self-awareness about the completion gap without excessive shame.',
        weak: '"I finish what I start" with nothing named. Given the current behavioral picture, this is almost certainly inaccurate.',
        complex: 'The post-basketball drift period is likely to have generated incomplete goals — fitness goals, academic goals, preparation goals. Can he name them?',
      },
      redFlags: ['"I always finish what I start" — contradicted by behavioral data elsewhere'],
      followUp: {
        condition: 'something named',
        question: 'What would it take to finish it — or to make a conscious decision to stop rather than just let it sit incomplete?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 6E — PRIORITIZATION
    // Target: Can he sequence competing demands correctly?
    // Probe: High-stakes vs. urgent vs. easy; does he default to easy tasks?
    //        What happens when everything feels important?
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms6_23',
      subsection: '6E',
      subsectionName: 'Prioritization',
      type: 'scenario',
      text: 'It\'s Wednesday at Morehouse. You have: a finance reading due Thursday (40 pages — takes you roughly 3 hours), a group project meeting Friday afternoon you haven\'t prepared for, an email from your advisor requesting a check-in this week, and your mom calling tonight. How do you sequence Wednesday and Thursday?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Wednesday: reads finance material (starts immediately given dyslexia time cost), replies to advisor to schedule meeting, sets a 30-minute prep block for group project. Thursday: completes reading if needed, prepares for Friday meeting. Mom call: tonight, while doing something low-cognitive.',
        weak: 'Does the easy things first (email, mom call), delays the reading, hopes three hours somehow becomes available Thursday night. Or: freezes and doesn\'t prioritize — does random tasks.',
        complex: 'The correct prioritization puts the highest time-cost item (reading with dyslexia) first because it has the least flexibility. Everything else can compress. The reading cannot.',
      },
      redFlags: [
        'Finance reading pushed to Thursday night given 3-hour dyslexia time cost',
        'Easy tasks completed first without sequencing by time cost',
        '"I\'d figure it out" without a specific Wednesday/Thursday plan',
      ],
      followUp: {
        condition: 'reading deferred to Thursday',
        question: 'The reading takes you 3 hours with your dyslexia. Thursday evening — after classes, dinner, and fatigue — what does that 3-hour window actually look like?',
      },
    },

    {
      id: 'ms6_24',
      subsection: '6E',
      subsectionName: 'Prioritization',
      type: 'forced_choice',
      text: 'When you have multiple things to do and limited time, you tend to do:',
      options: [
        'The most important thing first — highest stakes, then next highest',
        'The quickest thing first — I clear small items to feel momentum',
        'The thing I\'m most comfortable with or interested in',
        'Whatever feels most urgent in the moment — urgency drives the sequence',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A: importance-based sequencing — most aligned with finance career demands where high-stakes items always take priority',
        weak: 'Option C: comfort-based sequencing — avoids the hardest task (often reading with dyslexia) in favor of more comfortable work',
        complex: 'Option B is common and not necessarily wrong for small tasks. The issue is when quick-task clearing becomes a mechanism to defer the most important (and often most difficult) task.',
      },
      redFlags: [
        'Option C — comfort sequencing particularly when reading is the avoided task',
        'Option D — urgency-only sequencing misses important non-urgent tasks',
      ],
      followUp: {
        condition: 'answer is Option B or C',
        question: 'What happens to the hard task — the long reading, the difficult assignment — while you\'re doing the quick or comfortable things first?',
      },
    },

    {
      id: 'ms6_25',
      subsection: '6E',
      subsectionName: 'Prioritization',
      type: 'open',
      text: 'Between finishing high school strong, preparing for Morehouse, managing your mental and emotional health, maintaining your family relationships, and taking care of your daily habits — how are you currently prioritizing all of that? What\'s getting the most attention and what\'s being neglected?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Honest and specific answer. Can name what\'s getting attention and what isn\'t. Shows awareness of the prioritization choices being made — including the ones by default.',
        weak: '"I try to balance everything." Vague prioritization claim without specific awareness of what\'s being neglected.',
        complex: 'The honest answer based on behavioral data: daily habits and Morehouse preparation are being neglected in favor of unstructured downtime. Can he name that?',
      },
      redFlags: [
        '"I\'m doing okay with all of it"',
        'Cannot identify anything being neglected',
        '"I try to keep everything balanced"',
      ],
      followUp: {
        condition: 'specific neglect named',
        question: 'What would it take to move [the neglected thing] higher in your priority — specifically, what changes?',
      },
    },

    {
      id: 'ms6_26',
      subsection: '6E',
      subsectionName: 'Prioritization',
      type: 'likert',
      text: 'When I\'m overwhelmed by how much I have to do, I can still identify what matters most and start there.',
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
        strong: 'Agree: priority-stable under overwhelm — high EF resilience',
        weak: 'Strongly Disagree: overwhelm disrupts prioritization — responds to overwhelm by freezing or doing nothing',
        complex: 'For dyslexic learners, overwhelm can be disproportionate — the task volume at Morehouse may feel impossible to sequence. Knowing whether he can prioritize under pressure determines whether he needs an external prioritization structure.',
      },
      redFlags: ['Strongly Disagree — overwhelm-driven prioritization collapse'],
      followUp: {
        condition: 'answer in ["Strongly Disagree", "Disagree"]',
        question: 'When overwhelm hits and you can\'t identify what to start — what does that look like? What do you end up doing?',
      },
    },

    {
      id: 'ms6_27',
      subsection: '6E',
      subsectionName: 'Prioritization',
      type: 'scenario',
      text: 'It\'s November at Morehouse. Midterms are next week. You also have a group project due Friday. Your mom calls and she\'s struggling — financially and emotionally. You have 48 hours. What do you do and in what order?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Calls Mom for a meaningful conversation. Establishes she\'s not in crisis. Then studies for midterms as the highest academic-stakes item. Communicates with group project partners about his availability. Makes a plan rather than paralysis.',
        weak: 'Drops academic work to focus entirely on Mom (protective instinct overrides academic priority — sustainable short-term, not long-term). Or: ignores Mom to study (emotional compartmentalization without check). Or: paralysis — can\'t sequence when family and academics collide.',
        complex: 'This scenario tests the highest-stakes prioritization collision in Melvin\'s life: his mom vs. his academic performance. His fierce protectiveness of her is both a strength and a potential academic risk factor.',
      },
      redFlags: [
        'Complete academic suspension to focus on Mom with no time-bounding of the emotional response',
        'Paralysis — cannot sequence when family and academics collide',
        'No communication with group project partners',
      ],
      followUp: {
        condition: 'paralysis or full academic suspension named',
        question: 'Your mom\'s wellbeing and your academic performance are both things you\'re responsible for. What does it look like to handle both without sacrificing either?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 6F — ATTENTION CONTROL
    // Target: Can he sustain focus on difficult tasks — especially reading?
    // Probe: Phone distraction, context-switching costs, sustained attention
    //        for long reading tasks, studying environment control
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms6_28',
      subsection: '6F',
      subsectionName: 'Attention Control',
      type: 'open',
      text: 'When you sit down to study or do schoolwork, how long can you go before your attention breaks — you check your phone, get up, or think about something else?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: '45–90 minutes of sustained focus before a deliberate break — productive work cycle',
        weak: 'Under 15 minutes before attention breaks — significant sustained attention challenge for a reading-heavy college curriculum',
        complex: 'For dyslexic learners, sustained reading attention has an additional cognitive cost — it requires more effort than for non-dyslexic readers. A short attention window on top of a slow reading rate creates a compounding problem.',
      },
      redFlags: [
        'Under 20 minutes before attention breaks',
        '"I check my phone pretty often while studying"',
        '"I usually have something on in the background"',
      ],
      followUp: {
        condition: 'short attention window named',
        question: 'If you lose focus every 15 minutes and reading already takes you three times longer than average — what does a study session actually look like in terms of usable output?',
      },
    },

    {
      id: 'ms6_29',
      subsection: '6F',
      subsectionName: 'Attention Control',
      type: 'forced_choice',
      text: 'When you\'re studying and your phone buzzes or a notification comes in, what usually happens?',
      options: [
        'I ignore it — I finish what I\'m doing before I check',
        'I check it quickly and get back to work within a minute',
        'I check it and sometimes get pulled into a conversation or scroll',
        'I have my phone nearby and check it frequently while studying — it\'s always a presence',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A: distraction-resistant focus — phone does not interrupt work cycle',
        weak: 'Option D: constant phone presence during study — the attention fragmenting pattern that most severely impacts reading comprehension',
        complex: 'Options B and C are common. Option C is the most realistic problem case — the "quick check" that becomes 20 minutes. For dyslexic learners, any attention break during reading means re-reading to find the thread, which compounds the time cost.',
      },
      redFlags: [
        'Option D — phone as constant study presence',
        'Option C — "quick checks" that extend',
      ],
      followUp: {
        condition: 'answer is Option C or D',
        question: 'When you lose the thread in a dense reading because of a phone break — what\'s the cost in terms of having to re-read or re-orient?',
      },
    },

    {
      id: 'ms6_30',
      subsection: '6F',
      subsectionName: 'Attention Control',
      type: 'scenario',
      text: 'You need to read 30 pages of dense economic theory for your finance class. It\'s going to take you about 2.5 hours given your reading pace. You sit down to start. Your phone is next to you. Your roommate is in the room. Describe what you do to actually get through 30 pages with comprehension.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Phone away or on Do Not Disturb. Headphones or noise-canceling for focus. Specific study location if roommate is distracting. Uses text-to-speech or audio format for the reading. Takes notes. Builds in one deliberate break at the halfway mark.',
        weak: '"I\'d just read it." No environmental setup, no distraction control, no format strategy. Assumes the reading happens by willing it.',
        complex: 'This scenario is a Morehouse reading survival test. The setup decisions — phone, environment, format, breaks — determine whether 2.5 hours produces comprehension or just eye movement across pages.',
      },
      redFlags: [
        'No phone management described',
        'No environmental control described',
        'No text-to-speech or format alternative for the reading',
        '"I\'d just sit down and read it"',
      ],
      followUp: {
        condition: 'no environmental setup described',
        question: 'What does your ideal study environment look like — specifically, what\'s in it and what isn\'t?',
      },
    },

    {
      id: 'ms6_31',
      subsection: '6F',
      subsectionName: 'Attention Control',
      type: 'likert',
      text: 'I can control my attention — when I need to focus, I can block out distractions and stay on task.',
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
        strong: 'Agree with environmental control strategies described — attention control as an active practice',
        weak: 'Strongly Agree without environmental setup — believes attention is willpower-based rather than environment-based',
        complex: 'Attention control is largely environmental — most people cannot out-will a buzzing phone. Strong self-raters here often confuse "I want to focus" with "I actually focus reliably."',
      },
      redFlags: ['Strongly Agree combined with phone proximity during study in ms6_29'],
      followUp: {
        condition: 'Strongly Agree with phone distraction elsewhere',
        question: 'You said you can control your attention — but you also said you check your phone during study. How do those two things fit together?',
      },
    },

    {
      id: 'ms6_32',
      subsection: '6F',
      subsectionName: 'Attention Control',
      type: 'open',
      text: 'What is your relationship with your phone during school hours and study time — honest version? How much of your attention does it take?',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Honest self-assessment that includes how much the phone pulls attention during work. Has some awareness of the attention cost.',
        weak: '"I usually keep it away when I study" — not supported by common behavioral patterns. Or: dismisses phone as a meaningful attention factor.',
        complex: 'This is the attention audit question. Phone use during study is one of the most common and most costly academic attention leaks. His honest answer reveals how much of his study time is genuinely productive.',
      },
      redFlags: ['"I don\'t really use it much during school" when earlier answers contradict this'],
      followUp: {
        condition: 'significant phone presence admitted',
        question: 'At Morehouse, you\'ll be trying to get through readings that already take 3x longer because of your dyslexia. What changes about your phone relationship to make that work?',
      },
    },

    {
      id: 'ms6_33',
      subsection: '6F',
      subsectionName: 'Attention Control',
      type: 'scenario',
      text: 'You\'re studying at the Morehouse library. You\'ve been going for 45 minutes. Your mind starts to wander — you\'re thinking about your brother, about whether you made the right choice to be here, about your mom. The reading is still in front of you. What do you do?',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Takes a deliberate 10-minute break to process the distraction rather than fighting it. Returns to the reading with a reset. Or: recognizes the mental noise and has a strategy for clearing it before continuing.',
        weak: 'Continues attempting to read while mentally absent — produces the form of studying without the substance. Hours pass, content doesn\'t land.',
        complex: 'Mental intrusions during study are attention control events. His strategy for handling them determines whether his study time is effective. For someone carrying the emotional load he carries (brother, mom, dad\'s memory), intrusions will be frequent.',
      },
      redFlags: [
        '"I\'d push through it"',
        'Continues reading while mentally absent with no strategy',
        'No acknowledgment that mental intrusions affect study quality',
      ],
      followUp: {
        condition: 'pushes-through response',
        question: 'If you\'re thinking about your brother or your mom while your eyes are moving across finance theory — how much of that content is actually landing?',
      },
    },

    {
      id: 'ms6_34',
      subsection: '6F',
      subsectionName: 'Attention Control',
      type: 'slider',
      text: 'How well do you control your attention during study and work — not your intention to focus, but your actual focus in practice?',
      min: 1,
      max: 10,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: '7–10 with environmental control strategies and behavioral evidence',
        weak: '7–10 with phone distraction, short attention windows, and no environmental setup described elsewhere in 6F',
        complex: 'Attention control self-ratings are among the most inflated in EF self-assessment. Cross-reference heavily with ms6_28, ms6_29, and ms6_30.',
      },
      redFlags: ['8–10 with short attention window, phone distraction, and no study environment setup described'],
      followUp: {
        condition: 'score >= 7 with attention issues elsewhere',
        question: 'Rate your attention in your last actual study session — phone nearby, reading dense material, how long before something broke your focus?',
      },
    },

  ],
};

// ─── SCORING CONFIGURATION ───────────────────────────────────────────────────

export const MELVIN_SECTION_6_SCORING = {
  subsections: {
    '6A': { name: 'Planning', maxWeight: 10.5, redFlagThreshold: 2 },
    '6B': { name: 'Organization', maxWeight: 9.0, redFlagThreshold: 2 },
    '6C': { name: 'Task Initiation', maxWeight: 9.5, redFlagThreshold: 2 },
    '6D': { name: 'Task Completion', maxWeight: 9.0, redFlagThreshold: 2 },
    '6E': { name: 'Prioritization', maxWeight: 10.5, redFlagThreshold: 2 },
    '6F': { name: 'Attention Control', maxWeight: 10.0, redFlagThreshold: 3 },
  },
  globalRedFlags: [
    'No external planning system exists — mental-only planning insufficient for college concurrent deadline load (6A)',
    'Reading-heavy task initiation is deferred — dyslexia time cost + initiation barrier = compounding Morehouse risk (6C)',
    'Document organization insufficient — IEP documentation access uncertain, needed for Morehouse accommodation setup (6B)',
    'Attention control self-rated high but phone distraction, short focus windows, and no study environment setup contradict it (6F)',
    'Priority collapse when family crisis and academics collide simultaneously — Mom welfare overrides academic prioritization (6E)',
    'Motivation-contingent task completion quality — low motivation period produces lower completion standard (6D)',
    'No syllabus-to-calendar behavior described — deadlines managed reactively rather than proactively planned (6A)',
    'Mental intrusion during study (family worry) has no named management strategy — emotional load affects study effectiveness (6F)',
  ],
  contradictionChecks: [
    {
      id: 'contradiction_6_1',
      description: 'Planning confidence vs. no external planning system',
      questions: ['ms6_01', 'ms6_04', 'ms6_06'],
      flag: 'Rates planning ability at 7+ but uses mental-only tracking with no calendar, planner, or app — confidence without infrastructure',
    },
    {
      id: 'contradiction_6_2',
      description: 'Organization self-rating vs. described organizational reality',
      questions: ['ms6_07', 'ms6_08', 'ms6_12'],
      flag: 'Rates organization at 6+ but cannot describe where school materials are, uses mental task tracking, and has no multi-class system',
    },
    {
      id: 'contradiction_6_3',
      description: 'Completion identity vs. motivation-contingent quality',
      questions: ['ms6_19', 'ms6_21', 'ms6_22'],
      flag: 'Claims to always finish what he starts but names motivation-contingent quality — completes at minimum viable level when motivation is low',
    },
    {
      id: 'contradiction_6_4',
      description: 'Attention control self-rating vs. actual attention behavior',
      questions: ['ms6_28', 'ms6_29', 'ms6_31', 'ms6_34'],
      flag: 'Rates attention control highly but describes phone proximity during study, sub-20-minute focus windows, and no environmental setup strategy',
    },
    {
      id: 'contradiction_6_5',
      description: 'Task initiation self-assessment vs. deferral behavior',
      questions: ['ms6_13', 'ms6_15', 'ms6_16'],
      flag: 'Minimizes procrastination tendency but defers reading-heavy tasks to deadline night and doesn\'t start two-week assignments on free Sunday mornings',
    },
  ],
};
