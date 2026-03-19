// ============================================================
// MELVIN — SECTION 9: College Readiness & Independence
// Subsections: 9A Independent Living Readiness | 9B Personal Discipline |
//              9C Decision Readiness | 9D Resource Utilization |
//              9E Recovery Ability | 9F Separation Readiness
// Total Questions: 38
// ============================================================

export const MELVIN_SECTION_9 = [

  // ─────────────────────────────────────────────
  // 9A — Independent Living Readiness
  // ─────────────────────────────────────────────
  {
    id: 'ms9_01',
    subsection: '9A',
    subsectionName: 'Independent Living Readiness',
    type: 'likert',
    text: 'Right now, without your mom reminding you — how consistently do you handle your own basic responsibilities: laundry, food, finances, appointments?',
    options: [
      'I rely on my mom for most of it — she handles the bulk',
      'I do some but need reminders or she steps in regularly',
      'I handle most of it but drop things when I get busy or stressed',
      'I handle all of it most of the time with minimal reminders',
      'I run all of it independently — she doesn\'t need to be involved',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Handles all basic responsibilities independently — demonstrated readiness for dormitory life with no support structure',
      weak: 'Still dependent on mother for basic logistics — will struggle significantly without her daily presence at Morehouse',
      complex: 'Stress-triggered drop-off is a real pattern to flag — Morehouse will be high-stress by design',
    },
    redFlags: [
      'Still relies on mom for basic daily logistics like laundry, food, or scheduling',
      'Responsibilities drop when stressed — exactly when Morehouse pressure will hit hardest',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'At Morehouse, nobody is going to remind you to eat, do laundry, or show up. Walk me through what your first month looks like if nothing changes.',
    },
  },
  {
    id: 'ms9_02',
    subsection: '9A',
    subsectionName: 'Independent Living Readiness',
    type: 'scenario',
    text: 'It\'s your third week at Morehouse. You\'re behind on laundry, out of money on your meal plan, and have a paper due in two days. No one is going to notice unless you tell them. What do you do?',
    options: [
      'Call my mom — she\'ll help me figure it out',
      'Push through alone and deal with each thing as it comes',
      'Prioritize the paper, handle the laundry and food issue with whatever resources I can find on campus',
      'Let the small stuff slide and focus on the paper — the rest can wait',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Prioritizes strategically and uses available campus resources — evidence of independent problem-solving under pressure',
      weak: 'Immediately calls mom or lets everything slide without a triage plan — dependence or avoidance when overwhelmed',
      complex: 'Calling mom for advice is fine; calling her to fix it is the flag. Pushing through alone without any resource use is also a flag.',
    },
    redFlags: [
      'First response to overwhelm is to call mom for solutions rather than problem-solving independently',
      'Lets all three issues slide simultaneously with no triage — avoidance under pressure',
    ],
    followUp: {
      condition: 'Selects "call my mom" as primary response',
      question: 'What\'s the version of that where you handle it yourself? Walk me through what you\'d actually do.',
    },
  },
  {
    id: 'ms9_03',
    subsection: '9A',
    subsectionName: 'Independent Living Readiness',
    type: 'likert',
    text: 'How much experience do you have managing your own money — budget, expenses, savings — without someone overseeing it?',
    options: [
      'None — money has always been handled for me',
      'Very little — I\'ve managed small amounts but nothing real',
      'Some — I\'ve managed my own money in limited situations',
      'A fair amount — I\'ve had to budget and manage expenses independently',
      'Significant — I\'ve been managing my own finances in a meaningful way for a while',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Has real money management experience — critical given finance career aspirations and likely limited Morehouse budget',
      weak: 'No money management experience — high risk of financial mismanagement in college, which directly contradicts finance career track',
      complex: 'Given his finance ambitions, inability to manage personal money is a particularly sharp contradiction',
    },
    redFlags: [
      'Has never managed his own money in any meaningful way',
      'Finance career aspiration paired with zero personal financial management experience — major contradiction',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'You want to work in finance. How does someone who hasn\'t managed their own money yet get to the point where they\'re managing other people\'s?',
    },
  },
  {
    id: 'ms9_04',
    subsection: '9A',
    subsectionName: 'Independent Living Readiness',
    type: 'forced_choice',
    text: 'You get sick at Morehouse — nothing serious, but bad enough that you can\'t go to class for two days. Who handles it, and how?',
    options: [
      'I call my mom and she guides me through what to do',
      'I push through and show up anyway — I don\'t miss class',
      'I find the campus health center, let my professors know, and rest',
      'I stay in my room and hope it passes — I\'ll figure out the class stuff later',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Uses campus resources, communicates with professors, manages recovery — independent adult response',
      weak: 'Pushes through when sick (risk of worsening + poor performance) or hides in room with no communication — both patterns harm academic standing',
      complex: 'Calling mom for emotional support is fine; calling her to handle logistics is the flag',
    },
    redFlags: [
      'No awareness of how to navigate campus health systems independently',
      'Does not communicate with professors during illness — academic consequence accumulates silently',
    ],
    followUp: {
      condition: 'Selects "push through" or "stay in room"',
      question: 'If you miss two days of class and don\'t contact your professors — what happens to your grade? Do you know?',
    },
  },
  {
    id: 'ms9_05',
    subsection: '9A',
    subsectionName: 'Independent Living Readiness',
    type: 'slider',
    text: 'On a scale of 1–10, how ready are you right now to live completely independently — no mom, no home, no familiar structure — and function at a high level?',
    options: null,
    min: 1,
    max: 10,
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: '7+ — genuine confidence in independent functioning with evidence to support it',
      weak: '1–4 — significant self-assessed unreadiness; particularly important given move to Atlanta in August',
      complex: '5–6 — partial readiness; check which domains are ready vs. which need work before departure',
    },
    redFlags: [
      'Rates 4 or below — significant independence gap with less than 5 months until Morehouse',
      'Rates high but contradicted by behavioral dependence in other questions',
    ],
    followUp: {
      condition: 'Scores 1–5',
      question: 'Name the one area of independent living that worries you most. What would it take to close that gap before August?',
    },
  },
  {
    id: 'ms9_06',
    subsection: '9A',
    subsectionName: 'Independent Living Readiness',
    type: 'open',
    text: 'What\'s one thing about living on your own at Morehouse — something practical — that you genuinely don\'t know how to do yet?',
    options: null,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Names a specific gap with self-awareness — honesty that allows targeted preparation',
      weak: 'Says "nothing" or "I\'ll figure it out" — performance of readiness that masks genuine preparation gaps',
      complex: 'The specificity of the gap named is more informative than whether the gap exists; everyone has gaps',
    },
    redFlags: [
      'Claims no practical gaps in independent living readiness — almost certainly inaccurate',
      'Cannot engage with the question seriously — defensive avoidance of the topic',
    ],
    followUp: {
      condition: 'Gives dismissive answer',
      question: 'Walk me through a week at Morehouse — Monday to Sunday. What happens on each day, and where do you hit a wall?',
    },
  },

  // ─────────────────────────────────────────────
  // 9B — Personal Discipline
  // ─────────────────────────────────────────────
  {
    id: 'ms9_07',
    subsection: '9B',
    subsectionName: 'Personal Discipline',
    type: 'likert',
    text: 'When you have no external accountability — no coach, no mom checking in, no teacher following up — how consistent is your output?',
    options: [
      'Very low — I need external accountability to function',
      'Low — I do some things but drift significantly without structure',
      'Moderate — I maintain most things but slip in certain areas',
      'High — I keep my output consistent whether or not anyone is watching',
      'Very high — external accountability doesn\'t change how I operate',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Internal accountability — operates at the same level regardless of external monitoring; critical for college success',
      weak: 'Requires external accountability to function — will struggle severely in college where no one is watching',
      complex: 'The post-basketball drop (missing school, staying up late) is direct evidence — cross-reference with this answer',
    },
    redFlags: [
      'Explicitly requires external accountability to maintain output',
      'Current behavior (post-basketball attendance drop) already demonstrates reduced output without accountability',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'Since basketball ended — no coach, no daily structure — has your output stayed the same or changed? Be honest.',
    },
  },
  {
    id: 'ms9_08',
    subsection: '9B',
    subsectionName: 'Personal Discipline',
    type: 'scenario',
    text: 'It\'s a Tuesday night at Morehouse. You have a paper due Thursday, a test Friday, and your boys are going out tonight. You don\'t have a strict rule against going — it\'s your call. What do you do?',
    options: [
      'Go out — I can catch up tomorrow, I work better under pressure anyway',
      'Go for a few hours and come back early — I can manage both',
      'Stay in — Thursday and Friday deadlines don\'t leave room for Tuesday nights',
      'Go out but set a hard return time and stick to it',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Stays in or sets and holds a firm limit — prioritizes academic obligations without external enforcement',
      weak: 'Goes out with a vague plan to "catch up" — self-deception pattern; relying on pressure to perform is not a strategy',
      complex: '"Go for a few hours with a hard return" is workable only if the return time is actually kept — cross-reference with follow-through patterns from Section 3',
    },
    redFlags: [
      '"I work better under pressure" as a justification for avoidance — rationalized procrastination',
      'Cannot self-enforce a return time — sets limits he doesn\'t keep',
    ],
    followUp: {
      condition: 'Selects "go out" or "few hours with no guarantee"',
      question: 'The last time you told yourself you\'d come back early from something — did you? What happened?',
    },
  },
  {
    id: 'ms9_09',
    subsection: '9B',
    subsectionName: 'Personal Discipline',
    type: 'likert',
    text: 'How well do you currently manage sleep — getting to bed at a reasonable time and waking up without needing someone else to get you moving?',
    options: [
      'Very poorly — I stay up late most nights and struggle to get up',
      'Poorly — inconsistent sleep, often need help getting up',
      'Somewhat — mostly consistent but breaks down on weekends',
      'Well — I get to bed and wake up consistently without help',
      'Very well — my sleep schedule is one of the most disciplined parts of my life',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Self-managed sleep — no alarm dependence on others; critical given his profile notes staying up too late post-basketball',
      weak: 'Poor sleep management with external wake-up dependence — will arrive late to class, miss early obligations, accumulate sleep debt',
      complex: 'His profile already flags staying up too late since basketball ended — this directly validates or contradicts that observation',
    },
    redFlags: [
      'Stays up late regularly and needs external help to wake up — pattern already established and worsening',
      'Sleep schedule breakdowns on weekends that bleed into weekday performance',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'What time did you go to sleep last night? What time did you wake up? What would you rate that for a college student?',
    },
  },
  {
    id: 'ms9_10',
    subsection: '9B',
    subsectionName: 'Personal Discipline',
    type: 'likert',
    text: 'How disciplined are you with your phone — being able to put it down when you have something important to do?',
    options: [
      'Very undisciplined — my phone interrupts almost everything',
      'Undisciplined — I know it\'s a problem but I don\'t control it well',
      'Somewhat disciplined — I manage it better in some situations than others',
      'Disciplined — I can put it down when I need to without much struggle',
      'Very disciplined — phone management is not an issue for me',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Can manage phone use without external structure — critical for independent study in college',
      weak: 'Phone is a constant distraction — significant threat to academic performance without a parent or coach enforcing boundaries',
      complex: 'Self-report here should be checked against late-night behavior and school attendance patterns',
    },
    redFlags: [
      'Phone regularly interrupts important work with no self-correction',
      'Cannot study or complete tasks without phone as a distractor',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'When\'s the last time you put your phone face-down for two hours and didn\'t check it? What were you doing?',
    },
  },
  {
    id: 'ms9_11',
    subsection: '9B',
    subsectionName: 'Personal Discipline',
    type: 'open',
    text: 'Describe your current daily routine on a school day — from the time you wake up to the time you go to sleep. Be specific and honest.',
    options: null,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Clear, specific routine with structured blocks — evidence that discipline is practiced, not just described',
      weak: 'Vague, reactive, or disorganized daily pattern — no structure to transfer to college environment',
      complex: 'Look for intentionality: are blocks of time protected, or does the day just happen to him?',
    },
    redFlags: [
      'No describable daily structure — each day is reactive rather than planned',
      'Routine described but inconsistent with attendance and motivation data from other sections',
    ],
    followUp: {
      condition: 'Response is vague or inconsistent',
      question: 'If I asked your mom to describe your typical school day right now — would it match what you just told me?',
    },
  },
  {
    id: 'ms9_12',
    subsection: '9B',
    subsectionName: 'Personal Discipline',
    type: 'slider',
    text: 'On a scale of 1–10, how much has your discipline level changed since your last high school basketball game ended?',
    options: null,
    min: 1,
    max: 10,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Low number (1–3) = honest acknowledgment of post-basketball discipline drop; self-awareness is the first step to correction',
      weak: 'High number (7–10) when other data points suggest a drop = denial or unawareness; contradicts observable behavior',
      complex: 'This is one of the most important questions in the section — basketball was his structure; what replaced it?',
    },
    redFlags: [
      'Reports discipline unchanged or improved after basketball ended, contradicted by attendance and motivation data',
      'Reports significant discipline drop with no plan or awareness of what to replace the structure with',
    ],
    followUp: {
      condition: 'Any response',
      question: 'Basketball gave you a schedule, a team, accountability, a reason to show up. What\'s filling that role right now?',
    },
  },

  // ─────────────────────────────────────────────
  // 9C — Decision Readiness
  // ─────────────────────────────────────────────
  {
    id: 'ms9_13',
    subsection: '9C',
    subsectionName: 'Decision Readiness',
    type: 'likert',
    text: 'How often do you make important decisions — about your life, your future, your direction — without checking in with your mom first?',
    options: [
      'Almost never — she\'s involved in most of my important decisions',
      'Rarely — I usually check in even if I don\'t always follow her input',
      'Sometimes — for medium decisions I\'ll go on my own',
      'Often — I make most decisions independently and tell her after',
      'Almost always — my major decisions are mine; she\'s informed, not involved',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Makes major decisions independently and communicates them — healthy adult functioning while maintaining relationship',
      weak: 'Requires mom\'s involvement in all important decisions — will be structurally unready for the independence college demands',
      complex: 'Given his closeness with his mother, some check-in is expected and healthy; total dependence is the flag',
    },
    redFlags: [
      'Cannot make important decisions without mom\'s involvement — over-reliance at 17 heading into college',
      'Defers all major decisions to mother even when he disagrees with her input',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'At Morehouse, you\'re going to face decisions where you can\'t call her — timing won\'t allow it. What does that look like for you?',
    },
  },
  {
    id: 'ms9_14',
    subsection: '9C',
    subsectionName: 'Decision Readiness',
    type: 'scenario',
    text: 'You\'re at Morehouse and you have a choice: take an elective class that interests you but doesn\'t fit the finance track, or stick strictly to your planned major coursework. Nobody tells you what to do. What do you choose and why?',
    options: [
      'Stick to the track — I\'m here with a plan and I don\'t deviate',
      'Take the elective — college is supposed to broaden you',
      'Research whether the elective has any career value before I decide',
      'Call my mom and ask what she thinks',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Research and then decide — informed independent choice; values both direction and curiosity',
      weak: 'Calls mom for a minor course decision — over-dependence on external input for low-stakes decisions',
      complex: 'Strict adherence to plan or pure curiosity-following are both valid; what matters is whether there\'s reasoning behind it',
    },
    redFlags: [
      'Calls mom for a routine academic elective decision — dependence threshold is too low',
      'Cannot articulate any reasoning for the choice — decisions are not connected to a framework',
    ],
    followUp: {
      condition: 'Selects "call my mom"',
      question: 'What would it feel like to make that call yourself, without her input? What would you lose?',
    },
  },
  {
    id: 'ms9_15',
    subsection: '9C',
    subsectionName: 'Decision Readiness',
    type: 'likert',
    text: 'When you make a decision and it turns out to be wrong, how quickly can you recognize it and pivot without falling apart?',
    options: [
      'Very slowly — I struggle to admit when I\'ve made the wrong call',
      'Slowly — I usually know but take a long time to act on it',
      'Moderately — I can recognize it eventually and adjust',
      'Fairly quickly — I catch wrong decisions and correct without much drama',
      'Very quickly — I treat wrong decisions as information and move fast',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Can recognize and pivot rapidly — agility in decision correction is critical for college and career environments',
      weak: 'Slow to recognize or act on wrong decisions — losses accumulate while he delays course correction',
      complex: 'Pride and stubbornness can slow recognition; cross-reference with accountability data from Section 3',
    },
    redFlags: [
      'Pride prevents timely acknowledgment of wrong decisions',
      'Decision errors compound before he acts on them — slow correction cycle',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'Think of a decision you knew was wrong but took too long to change. What made it hard to pivot sooner?',
    },
  },
  {
    id: 'ms9_16',
    subsection: '9C',
    subsectionName: 'Decision Readiness',
    type: 'forced_choice',
    text: 'You get a call that there\'s a family situation at home — your mom needs you. You also have a midterm tomorrow you haven\'t finished studying for. What do you do?',
    options: [
      'Go home immediately — family comes first, no question',
      'Call to assess how serious it is before deciding',
      'Talk to my professor first, then decide based on what I learn',
      'Manage both — study materials come with me if I go',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Assesses severity first or manages both — demonstrates mature decision-making under competing obligations',
      weak: 'Goes home immediately without assessing severity — emotional reactivity overrides strategic thinking in high-stakes moments',
      complex: 'For Melvin specifically — his fierce protectiveness of his mom is a real variable; this is the most emotionally loaded decision in the section',
    },
    redFlags: [
      'Cannot make a reasoned decision when family and academics conflict — emotional reactivity takes over completely',
      'Has no framework for managing competing high-stakes obligations',
    ],
    followUp: {
      condition: 'Any answer',
      question: 'Your mom would want you to finish Morehouse. If the situation wasn\'t life-threatening — would going home actually serve her long-term?',
    },
  },
  {
    id: 'ms9_17',
    subsection: '9C',
    subsectionName: 'Decision Readiness',
    type: 'open',
    text: 'What\'s the most important decision you\'ve made completely on your own in the last year — not consulted anyone, just made the call? What was it and how did it go?',
    options: null,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can name a specific independent decision with real weight — demonstrates that he operates with personal agency',
      weak: 'Cannot name a single significant independent decision — has been operating within others\' decision structures',
      complex: 'The weight of the decision matters; choosing a playlist is not the same as a life decision',
    },
    redFlags: [
      'Cannot name any significant decision made completely independently',
      'All significant decisions in the past year were made with or by his mother',
    ],
    followUp: {
      condition: 'Names a minor or trivial decision',
      question: 'Something with real stakes — where the outcome actually mattered. What was yours?',
    },
  },

  // ─────────────────────────────────────────────
  // 9D — Resource Utilization
  // ─────────────────────────────────────────────
  {
    id: 'ms9_18',
    subsection: '9D',
    subsectionName: 'Resource Utilization',
    type: 'likert',
    text: 'When you\'re struggling with something at school — academically, emotionally, practically — how quickly do you seek out available resources like counselors, tutors, or support programs?',
    options: [
      'Almost never — I handle things alone or not at all',
      'Rarely — only in extreme situations',
      'Sometimes — if the resource is easy to access',
      'Often — I know what\'s available and I use it',
      'Almost always — I\'ve learned that using resources is a strength, not a weakness',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Actively uses available resources — critical for Morehouse success given dyslexia, first-generation-style transition, and academic rigor increase',
      weak: 'Avoids resources and handles things alone or not at all — will underperform in environments with abundant support that goes unused',
      complex: 'Easy-access-only resource use is better than nothing but will fail when resources require initiative to access',
    },
    redFlags: [
      'Does not use available support resources even when struggling significantly',
      'Views help-seeking as weakness — will create artificial ceiling on performance at Morehouse',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'Morehouse has tutoring, financial aid counselors, mental health support, academic advisors — all paid for. If you don\'t use them, who does? And what does that cost you?',
    },
  },
  {
    id: 'ms9_19',
    subsection: '9D',
    subsectionName: 'Resource Utilization',
    type: 'scenario',
    text: 'You\'re two weeks into Morehouse and struggling with a finance class. The professor is fast, the textbook is dense, and you\'re behind. You haven\'t failed anything yet, but you can see it coming. What do you do?',
    options: [
      'Keep going and hope I catch up on my own before it gets bad',
      'Go to office hours and ask the professor to slow down or clarify',
      'Find a study group or a tutor through the academic resource center',
      'Contact my IEP coordinator to make sure my accommodations are in place and actively being used',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Goes to professor, finds a tutor, or activates IEP accommodations — proactive resource use before failure occurs',
      weak: 'Waits and hopes — allows predictable failure to arrive rather than intercepting it; exact pattern to watch given his profile',
      complex: 'Any resource-using option is strong; the IEP activation answer shows the highest level of self-advocacy sophistication',
    },
    redFlags: [
      'Waits for actual failure before seeking help — reactive rather than proactive pattern',
      'Does not connect academic struggle to available IEP accommodations',
    ],
    followUp: {
      condition: 'Selects "keep going and hope"',
      question: 'By the time you know you\'ve failed — what has it cost you? And was the hope worth it?',
    },
  },
  {
    id: 'ms9_20',
    subsection: '9D',
    subsectionName: 'Resource Utilization',
    type: 'likert',
    text: 'How much do you know about what Morehouse offers — academically, financially, mentally, and professionally — that you can use when you get there?',
    options: [
      'Very little — I haven\'t researched it',
      'Some basics — I know a few things exist but don\'t know the details',
      'Moderate — I know the main programs and services',
      'A lot — I\'ve researched the specific resources I plan to use',
      'Comprehensively — I know what\'s available, how to access it, and I have a plan',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Has researched and planned resource use before arrival — maximum readiness posture',
      weak: 'Has not researched available resources — will arrive at a resource-rich institution and not use what\'s available',
      complex: 'Partial knowledge is workable if paired with curiosity and willingness to ask; total unawareness is the flag',
    },
    redFlags: [
      'Has not researched Morehouse resources despite accepting and having months to prepare',
      'Plans to "figure it out when I get there" for a resource-access issue that requires advance knowledge',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'Name one resource at Morehouse — one specific thing — that you know exists and plan to use.',
    },
  },
  {
    id: 'ms9_21',
    subsection: '9D',
    subsectionName: 'Resource Utilization',
    type: 'forced_choice',
    text: 'You\'re running low on money mid-semester at Morehouse. Your meal plan is running out and you have 3 weeks until the next disbursement. What\'s your move?',
    options: [
      'Call my mom and ask her to send money',
      'Find out if Morehouse has emergency financial aid or a food pantry',
      'Ask a friend and pay them back later',
      'Cut my spending and stretch what I have — I\'ll manage',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Researches institutional resources first — demonstrates financial self-sufficiency and institutional knowledge',
      weak: 'Calls mom immediately for financial solutions — over-dependence on family financial support in a crisis',
      complex: 'Asking a friend is a social resource — workable; cutting spending shows self-management; the flag is if mom is always the first call for financial problems',
    },
    redFlags: [
      'Mom is first resource for financial crisis — does not consider institutional resources',
      'No awareness that colleges have emergency financial support structures',
    ],
    followUp: {
      condition: 'Selects "call my mom"',
      question: 'What if she can\'t send it? What\'s the next move — the one that doesn\'t involve her?',
    },
  },
  {
    id: 'ms9_22',
    subsection: '9D',
    subsectionName: 'Resource Utilization',
    type: 'open',
    text: 'The Oakland Kids program has been in your life since 6th grade. How have you actually used it — not just attended, but used the mentors, the network, the resources? What have you gotten from it beyond showing up?',
    options: null,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can name specific resources, mentors, or skills extracted from OK — evidence that he actively leverages programs rather than just attending',
      weak: 'Attended but didn\'t actively utilize — passive participant pattern; will replicate this at Morehouse',
      complex: 'Even if utilization was limited, awareness of what he could have used more suggests capacity for growth',
    },
    redFlags: [
      'Has been in OK since 6th grade but cannot name any specific way he\'s leveraged the program beyond attendance',
      'Passive participation pattern in programs — shows up but doesn\'t extract value intentionally',
    ],
    followUp: {
      condition: 'Response is vague or attendance-focused',
      question: 'Is there a mentor in OK you\'ve never really used — someone you could have called on but didn\'t? What stopped you?',
    },
  },

  // ─────────────────────────────────────────────
  // 9E — Recovery Ability
  // ─────────────────────────────────────────────
  {
    id: 'ms9_23',
    subsection: '9E',
    subsectionName: 'Recovery Ability',
    type: 'likert',
    text: 'When you experience a real setback — a failure, a loss, a rejection — how long does it typically take you to get back to full functioning?',
    options: [
      'A long time — setbacks knock me off my rhythm for weeks',
      'A while — I recover but it takes longer than I\'d like',
      'A reasonable amount of time — a few days to a week',
      'Fairly quickly — I bounce back within a day or two',
      'Very quickly — I process and get back to work almost immediately',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Fast recovery cycle — critical for college where setbacks come frequently and compound quickly',
      weak: 'Long recovery periods — a bad grade, a social conflict, or a missed opportunity can knock him out of rhythm for too long',
      complex: 'His response to not being named a starter (the one time he cried) is direct evidence — evaluate recovery speed from that specific event',
    },
    redFlags: [
      'Setbacks remove him from productive functioning for weeks at a time',
      'Recovery requires external intervention rather than internal processing',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'When you weren\'t named a starter this season — how long did it take you to fully reset and function at your normal level?',
    },
  },
  {
    id: 'ms9_24',
    subsection: '9E',
    subsectionName: 'Recovery Ability',
    type: 'scenario',
    text: 'You fail your first college exam at Morehouse. It\'s a 58. You\'ve never failed a test before. It\'s Monday. What do you do by Friday?',
    options: [
      'Spiral — a 58 when I\'ve never failed before would shake me hard',
      'Analyze what went wrong, go to office hours, and make a recovery plan',
      'Talk to my mom about it first, then figure out next steps',
      'Accept it, understand it\'s just one grade, and focus on the next assessment',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Analyzes, seeks help, and makes a recovery plan — proactive failure response with specific actions',
      weak: 'Spirals — the first failure could be devastating given his identity is tied to academic excellence and GPA',
      complex: 'Talking to mom before acting is a support move, not necessarily dependence — evaluate if it\'s support or problem-solving outsourcing',
    },
    redFlags: [
      'First college failure triggers a spiral that removes him from productive functioning',
      'No structured recovery plan — accepts failure passively or reacts emotionally without action',
    ],
    followUp: {
      condition: 'Selects "spiral" or "accept it without a plan"',
      question: 'Your entire identity includes being the 4.2 GPA guy. What happens to who you are when that number drops? What do you do with that?',
    },
  },
  {
    id: 'ms9_25',
    subsection: '9E',
    subsectionName: 'Recovery Ability',
    type: 'likert',
    text: 'How well do you handle things not going according to plan — when the structure you expected falls apart and you have to adapt on the fly?',
    options: [
      'Very poorly — I need things to go according to plan',
      'Poorly — I can adapt but it stresses me significantly',
      'Moderately — I get through it but it throws me off',
      'Well — I adapt without too much disruption',
      'Very well — flexibility and adjustment are strengths of mine',
    ],
    weight: 1.5,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'High adaptability — can function when circumstances shift; critical for college where plans rarely survive contact with reality',
      weak: 'Low adaptability — relies on structure that won\'t exist at Morehouse in the same form',
      complex: 'His basketball structure ending is a live test of this — current behavior is the answer, not the self-report',
    },
    redFlags: [
      'Requires rigid structure to function — will be significantly destabilized by college\'s inherent unpredictability',
      'Self-report of adaptability contradicted by observable behavioral disruption when structure is removed',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'Basketball season ending removed a major structure from your life. Has your adaptability been tested since then? How have you done?',
    },
  },
  {
    id: 'ms9_26',
    subsection: '9E',
    subsectionName: 'Recovery Ability',
    type: 'forced_choice',
    text: 'You have a bad week at Morehouse — two things go wrong at once, socially and academically. What\'s your recovery pattern?',
    options: [
      'I shut down for a while — I need space to process before I can function',
      'I call my mom and talk it through until I feel better',
      'I identify what went wrong in each area and address one at a time',
      'I work harder — a bad week motivates me to come back stronger',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Analyzes and addresses systematically or channels adversity into effort — structured recovery with agency',
      weak: 'Shuts down — a pattern Melvin\'s profile shows (post-basketball shutdown behavior); or exclusively seeks external processing without internal action',
      complex: 'Talking to mom to process is healthy; if it replaces action entirely it becomes the flag',
    },
    redFlags: [
      'Shutdown is the primary recovery response — already evidenced in post-basketball behavior pattern',
      'Recovery depends entirely on external emotional processing with no internal mechanism',
    ],
    followUp: {
      condition: 'Selects "shut down"',
      question: 'That shutdown — how long does it usually last? And when you come out of it, what gets you moving again?',
    },
  },
  {
    id: 'ms9_27',
    subsection: '9E',
    subsectionName: 'Recovery Ability',
    type: 'open',
    text: 'Basketball being over — the last game you\'ll ever play competitively — how are you doing with that? Really. Not the answer you give when someone asks casually.',
    options: null,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can speak honestly about the loss — has processed it emotionally and has a framework for what comes next',
      weak: 'Dismisses it, minimizes it, or cannot articulate how he\'s doing — emotional suppression pattern that will erupt under academic stress',
      complex: 'Melvin holds his emotions privately; a composed answer here is not necessarily denial — look for specificity and honesty',
    },
    redFlags: [
      'Cannot or will not engage honestly with the loss of basketball — emotional suppression risk',
      'Basketball ending is contributing to current behavioral decline (school attendance, motivation drop) without him acknowledging the connection',
    ],
    followUp: {
      condition: 'Gives a composed or dismissive answer',
      question: 'The first practice you weren\'t at — when you knew the season was over. What did that day feel like?',
    },
  },
  {
    id: 'ms9_28',
    subsection: '9E',
    subsectionName: 'Recovery Ability',
    type: 'slider',
    text: 'On a scale of 1–10, how resilient do you feel right now — your ability to take a hit and keep moving without it derailing your path?',
    options: null,
    min: 1,
    max: 10,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: '7+ with behavioral evidence — current functioning under pressure supports the self-assessment',
      weak: '1–4 — low self-assessed resilience; or high rating contradicted by current behavioral disruption post-basketball',
      complex: 'Cross-reference with actual behavioral data: attendance drop, motivation, sleep patterns — resilience is shown, not self-reported',
    },
    redFlags: [
      'Rates high but current behavioral pattern shows disruption — resilience claim not matched by observable response',
      'Rates low with no recovery plan or awareness of how to build resilience before August',
    ],
    followUp: {
      condition: 'High rating with behavioral contradictions',
      question: 'Your attendance has dropped since basketball ended. If that\'s resilience — what does it look like when you\'re not resilient?',
    },
  },

  // ─────────────────────────────────────────────
  // 9F — Separation Readiness
  // ─────────────────────────────────────────────
  {
    id: 'ms9_29',
    subsection: '9F',
    subsectionName: 'Separation Readiness',
    type: 'likert',
    text: 'How do you feel about being physically away from your mom for an extended period — months at a time with limited visits?',
    options: [
      'I haven\'t really thought about it yet — it doesn\'t feel real',
      'I\'m anxious about it — she\'s my anchor and I rely on her heavily',
      'I\'m okay with it — I love her but I know I need to grow independently',
      'I\'m ready — I\'ve been building toward this and I know she\'ll be there',
      'I feel good about it — I\'m excited for what separation means for my independence',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Ready with acknowledged love — healthy separation that doesn\'t require emotional severance',
      weak: 'Anxious with heavy reliance — may not have emotionally processed the reality of the separation; or has not thought about it at all (avoidance)',
      complex: 'Excitement without acknowledging love or difficulty is also worth exploring — may be performing readiness',
    },
    redFlags: [
      'Has not thought about the separation at all — emotional avoidance of a major transition arriving in months',
      'Describes mom as his anchor with no indication of preparation for functioning without her physically present',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'When you picture her dropping you off at Morehouse and driving away — what goes through your mind?',
    },
  },
  {
    id: 'ms9_30',
    subsection: '9F',
    subsectionName: 'Separation Readiness',
    type: 'scenario',
    text: 'It\'s 11pm on a Thursday at Morehouse. You\'re stressed, behind on work, and feeling alone in a new city. Your mom isn\'t awake. What do you do?',
    options: [
      'Wait until she wakes up and call her in the morning',
      'Text her now even though she\'s asleep — I need to tell someone',
      'Find something to do to distract myself until morning',
      'Use the moment to sit with it and figure out what I actually need — then act on it',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Sits with discomfort and identifies what he actually needs — self-regulation without external scaffolding',
      weak: 'Texts mom at 11pm or waits passively — cannot self-soothe or self-mobilize without her as a resource',
      complex: 'Finding a distraction is avoidance but less dependent than needing mom; look for what replaces her as a coping resource',
    },
    redFlags: [
      'Mom is the only identified resource for late-night emotional distress — no peer support or self-regulation strategy',
      'Cannot sit with negative emotional states without immediate external relief',
    ],
    followUp: {
      condition: 'Selects texting mom or waiting for her',
      question: 'If she wasn\'t reachable for 48 hours — what would you do with that feeling?',
    },
  },
  {
    id: 'ms9_31',
    subsection: '9F',
    subsectionName: 'Separation Readiness',
    type: 'likert',
    text: 'How well developed is your relationship with your brother Mekhi as a real support — someone you\'d actually lean on when things get hard?',
    options: [
      'Not developed — we coexist but I wouldn\'t lean on him',
      'Slightly — we\'re close in proximity but not in that way',
      'Somewhat — there\'s something there but it\'s not a deep support resource',
      'Well developed — he\'s someone I could actually turn to',
      'Very well developed — he\'s one of my real resources',
    ],
    weight: 1.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Has a genuine support relationship with his brother — rare given profile description of emotional distance between them',
      weak: 'No meaningful support relationship with Mekhi — leaves only mom as family resource when separated by distance',
      complex: 'His profile notes they share a room, are 13 months apart, and have never argued — but also never show affection or brotherhood; honest assessment of this is the goal',
    },
    redFlags: [
      'No support relationship with Mekhi — only family resource at a distance will be mom',
      'Cannot identify any family member he would lean on other than his mother',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'You and Mekhi grew up in the same room, went through the same things. Is there a version of him being someone you could actually call when things get hard — or is that not the relationship?',
    },
  },
  {
    id: 'ms9_32',
    subsection: '9F',
    subsectionName: 'Separation Readiness',
    type: 'open',
    text: 'What does your relationship with your mom look like when you\'re at Morehouse — how often do you talk, what do you talk about, what stays the same and what has to change?',
    options: null,
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can envision a healthy recalibrated relationship — frequent emotional connection with reduced logistical dependence',
      weak: 'Envisions same daily dependence from a distance — phone as a lifeline that replaces developing independence',
      complex: 'Daily calls for connection are healthy; daily calls to process every decision or crisis are a flag',
    },
    redFlags: [
      'Envisions calling mom multiple times daily for decisions, logistics, and emotional regulation',
      'Cannot envision the relationship changing — expects Morehouse to replicate the home dynamic at distance',
    ],
    followUp: {
      condition: 'Describes high-frequency logistical dependence from a distance',
      question: 'What does she need from you at Morehouse — not just what you need from her. What does this look like for her?',
    },
  },
  {
    id: 'ms9_33',
    subsection: '9F',
    subsectionName: 'Separation Readiness',
    type: 'likert',
    text: 'How prepared are you to build a new community from scratch at Morehouse — new friends, new mentors, new networks — without your existing relationships as a safety net?',
    options: [
      'Not prepared — I\'m relying on figuring it out when I get there',
      'Slightly prepared — I know it\'s coming but I have no real plan',
      'Somewhat prepared — I have some ideas but I\'m not confident',
      'Prepared — I have a general plan for how I\'ll build community early',
      'Very prepared — I have specific people, programs, and clubs I\'m targeting',
    ],
    weight: 2.0,
    scoringDirection: 'strong',
    scoringNotes: {
      strong: 'Has specific targets and a community-building plan — proactive social architecture before arrival',
      weak: 'Plans to figure it out on arrival — will spend the first critical months adrift without community, increasing homesickness and isolation risk',
      complex: 'Given his network-is-net-worth mindset, lack of community-building preparation is particularly inconsistent',
    },
    redFlags: [
      'No community-building plan for Morehouse despite arrival in months',
      'Relying entirely on organic connection at a new institution — community formation is a skill, not a passive event',
    ],
    followUp: {
      condition: 'Scores 1 or 2',
      question: 'Name one specific group, program, or type of person at Morehouse you plan to connect with in the first two weeks.',
    },
  },
  {
    id: 'ms9_34',
    subsection: '9F',
    subsectionName: 'Separation Readiness',
    type: 'open',
    text: 'In your own words — what does success at Morehouse look like for you? Not grades alone, not career alone — the full picture. What does winning the Morehouse chapter of your life actually mean?',
    options: null,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Specific, multi-dimensional vision — academic, relational, identity, and career growth all represented; includes giving back dimension',
      weak: 'Vague or single-dimensional — "graduate" or "get good grades" without connection to identity, network, legacy, or purpose',
      complex: 'Given his motivation by recognition, legacy, and coming back to Oakland — look for whether those values appear in his Morehouse success definition',
    },
    redFlags: [
      'Cannot articulate a meaningful vision for Morehouse beyond basic graduation',
      'Success definition is entirely externally oriented — grades, money — with no identity or relational dimension',
    ],
    followUp: {
      condition: 'Response is vague or single-dimensional',
      question: 'You want to come back to Oakland as the proof that the Oakland Kids program works. What does the version of you that does that look like when he leaves Morehouse?',
    },
  },
  {
    id: 'ms9_35',
    subsection: '9F',
    subsectionName: 'Separation Readiness',
    type: 'slider',
    text: 'On a scale of 1–10, how much do you believe you are ready — not just excited, but ready — for everything that Morehouse is going to ask of you?',
    options: null,
    min: 1,
    max: 10,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: '7+ with evidence across the section — genuine multi-domain readiness supported by behavioral and preparation data',
      weak: '1–4 — significant self-assessed unreadiness months before departure; or 7+ contradicted by dependence, unpreparedness, and behavioral disruption data',
      complex: 'This is the section\'s anchor question — it should be cross-referenced with every subsection score to validate or flag the self-assessment',
    },
    redFlags: [
      'High rating contradicted by dependence patterns, preparation gaps, and post-basketball behavioral decline across the section',
      'Low rating with no acknowledged plan to close the gap before August',
    ],
    followUp: {
      condition: 'Any response',
      question: 'What would have to be true about the version of you in August for that number to be a 10?',
    },
  },

  // ─────────────────────────────────────────────
  // Additional anchor questions across subsections
  // ─────────────────────────────────────────────
  {
    id: 'ms9_36',
    subsection: '9A',
    subsectionName: 'Independent Living Readiness',
    type: 'forced_choice',
    text: 'Which of these is most likely to be your biggest independent living challenge at Morehouse?',
    options: [
      'Managing money and not overspending',
      'Waking up and getting to class without anyone pushing me',
      'Cooking, feeding myself, and staying healthy',
      'Managing time across school, social life, and everything else',
    ],
    weight: 1.5,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can honestly name a specific challenge — self-awareness that enables preparation',
      weak: 'Says "none of these" or refuses to identify a challenge — defensive self-protection that prevents preparation',
      complex: 'The specific challenge named is less important than his willingness to engage honestly and his awareness of what it requires',
    },
    redFlags: [
      'Claims no significant independent living challenges — near-certain overconfidence',
      'Names a challenge but has no plan or awareness of how to address it',
    ],
    followUp: {
      condition: 'Any honest answer',
      question: 'What\'s one specific thing you can do before August to shrink that challenge?',
    },
  },
  {
    id: 'ms9_37',
    subsection: '9B',
    subsectionName: 'Personal Discipline',
    type: 'scenario',
    text: 'You have three weeks until finals at Morehouse. You have no external deadline pressure yet — just the knowledge that it\'s coming. What does your study behavior look like over those three weeks?',
    options: [
      'I\'ll start studying in the last week when the pressure kicks in',
      'I\'ll study when I feel like it — probably inconsistently',
      'I\'ll build a study schedule and stick to it across all three weeks',
      'I\'ll work with a study group and let the group schedule keep me on track',
    ],
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Builds and follows a personal schedule — self-imposed structure without external deadlines; critical for dyslexia management at college level',
      weak: 'Waits for last-minute pressure — will systematically underperform in college where last-minute studying is significantly less effective, especially for reading-heavy material',
      complex: 'Study group dependency is better than nothing — evaluate if he can contribute to or if he entirely relies on the group',
    },
    redFlags: [
      'Consistent last-minute study pattern at college level with dyslexia — high failure risk',
      'No self-imposed study structure when external deadlines are absent',
    ],
    followUp: {
      condition: 'Selects last-minute or inconsistent option',
      question: 'Finance coursework at Morehouse is going to require 3–4 hours of reading per class per week. Last-minute isn\'t a strategy for that. What is?',
    },
  },
  {
    id: 'ms9_38',
    subsection: '9E',
    subsectionName: 'Recovery Ability',
    type: 'open',
    text: 'What\'s the hardest thing you\'ve come back from in your life — not basketball, not grades — something that tested whether you could keep going. What happened, and how did you get through it?',
    options: null,
    weight: 2.0,
    scoringDirection: 'complex',
    scoringNotes: {
      strong: 'Can name a specific hard thing with an honest account of recovery — evidence that resilience is real and has been tested',
      weak: 'Cannot name a real difficulty or defaults to surface answers — either sheltered from genuine adversity (unlikely given his background) or emotional suppression preventing honest engagement',
      complex: 'His father\'s death and the family rejection they\'ve experienced is likely here — the quality of his engagement with it is the data',
    },
    redFlags: [
      'Cannot engage with the question honestly — deflects to sports or grades rather than real life adversity',
      'Has experienced significant loss (father\'s death, family rejection) but has not processed how he got through it',
    ],
    followUp: {
      condition: 'Deflects to sports or grades',
      question: 'Your dad died when you were 15. That\'s not a small thing. How did you keep going after that?',
    },
  },
];

// ============================================================
// SECTION 9 SCORING CONFIGURATION
// ============================================================

export const MELVIN_SECTION_9_SCORING = {
  subsections: {
    '9A': {
      name: 'Independent Living Readiness',
      maxWeight: 10.5,
      redFlagThreshold: 2,
    },
    '9B': {
      name: 'Personal Discipline',
      maxWeight: 11.5,
      redFlagThreshold: 2,
    },
    '9C': {
      name: 'Decision Readiness',
      maxWeight: 9.0,
      redFlagThreshold: 2,
    },
    '9D': {
      name: 'Resource Utilization',
      maxWeight: 8.5,
      redFlagThreshold: 2,
    },
    '9E': {
      name: 'Recovery Ability',
      maxWeight: 11.5,
      redFlagThreshold: 2,
    },
    '9F': {
      name: 'Separation Readiness',
      maxWeight: 11.5,
      redFlagThreshold: 2,
    },
  },

  globalRedFlags: [
    'Still relies on mother for basic daily logistics — will arrive at Morehouse without functional independence',
    'Discipline collapses when external accountability is removed — already evidenced post-basketball',
    'First response to any crisis (financial, emotional, academic) is to contact mom rather than solve independently or use campus resources',
    'No structured recovery mechanism when setbacks occur — shutdown is the primary response',
    'Finance career aspiration contradicted by zero personal money management experience',
    'Has not emotionally processed the end of basketball as a structure, identity, and purpose loss',
    'No plan for community-building at Morehouse — will arrive without a social architecture strategy',
    'Self-assessed readiness significantly contradicted by behavioral evidence across multiple domains',
  ],

  contradictionChecks: [
    {
      id: 'contradiction_9_1',
      description: 'Claims independence but relies on mom for decisions, logistics, and emotional regulation',
      questions: ['ms9_05', 'ms9_01', 'ms9_13', 'ms9_17', 'ms9_30'],
      flag: 'Rates independence highly (ms9_05) but relies on mom for basic logistics (ms9_01), involves her in routine decisions (ms9_13), cannot name independent decisions (ms9_17), and reaches for her in emotional distress (ms9_30) — independence self-assessment is inflated across multiple behavioral indicators',
    },
    {
      id: 'contradiction_9_2',
      description: 'Claims personal discipline but shows post-basketball behavioral decline and last-minute study patterns',
      questions: ['ms9_07', 'ms9_12', 'ms9_09', 'ms9_37', 'ms9_11'],
      flag: 'Self-reports high personal discipline (ms9_07) but acknowledges discipline drop since basketball ended (ms9_12), poor sleep management (ms9_09), last-minute study pattern (ms9_37), and daily routine is unstructured (ms9_11) — discipline exists only when externally structured, not internally driven',
    },
    {
      id: 'contradiction_9_3',
      description: 'Finance career aspirations contradicted by no personal money management and low resource utilization',
      questions: ['ms9_03', 'ms9_18', 'ms9_20', 'ms9_22'],
      flag: 'Aspires to finance career but has never managed his own money (ms9_03), avoids using available support resources (ms9_18), has not researched Morehouse resources (ms9_20), and was a passive participant in Oakland Kids despite years of membership (ms9_22) — career ambition is not matched by behavior patterns that lead to that career',
    },
    {
      id: 'contradiction_9_4',
      description: 'Claims resilience but shows shutdown pattern after setbacks and avoids processing major losses',
      questions: ['ms9_28', 'ms9_23', 'ms9_26', 'ms9_27', 'ms9_38'],
      flag: 'Self-reports high resilience (ms9_28) but recovers slowly from setbacks (ms9_23), shuts down as primary recovery response (ms9_26), cannot engage honestly with the loss of basketball (ms9_27), and deflects from major life adversity (ms9_38) — resilience claim is self-protective framing, not behavioral evidence',
    },
    {
      id: 'contradiction_9_5',
      description: 'Claims Morehouse readiness but has no community plan, no resource knowledge, and unresolved separation anxiety',
      questions: ['ms9_35', 'ms9_33', 'ms9_20', 'ms9_29', 'ms9_32'],
      flag: 'Rates overall Morehouse readiness high (ms9_35) but has no community-building plan (ms9_33), has not researched available resources (ms9_20), has not processed the separation from mom (ms9_29), and envisions the same dependent relationship from a distance (ms9_32) — readiness claim is aspirational, not grounded in preparation',
    },
  ],
};
