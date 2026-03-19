// ─── MELVIN SECTION 5 — ATTENDANCE & DAILY DISCIPLINE ────────────────────────
// Built for Melvin Jr. — 17, Deep East Oakland, Morehouse-bound, Finance track.
// Probe: Is his discipline a character trait or was it basketball-dependent?
//        What does his day actually look like without external structure?
//
// Key tensions:
//   → Basketball required daily structure: practice, film, conditioning, schedule
//     → Basketball ended 2 weeks ago → immediate drift: late nights, missed days
//   → 4.2 GPA required consistent attendance → current absences contradict this
//   → Identity as someone with standards vs. current routine that doesn't match
//   → Staying up late: is it avoidance, habit, grief, or just freed schedule?
//   → Morehouse reality: no coach, no team, no mom's morning knock — 100% self-generated
//
// WHAT THIS SECTION MUST DETERMINE:
//   1. Was his discipline external (basketball structure) or internal (his own system)?
//   2. What is his actual current daily routine — morning to night?
//   3. Is the sleep disruption avoidance, grief, or simply unstructured time?
//   4. Can he build and maintain a routine without external accountability?
//   5. What daily discipline infrastructure exists that will survive the move to Atlanta?
// ─────────────────────────────────────────────────────────────────────────────

export const MELVIN_SECTION_5 = {
  id: 'melvin_section5',
  title: 'Attendance & Daily Discipline',
  subtitle: 'Habits, Routine, Sleep, Time Use, Consistency & Structure',
  userId: 'melvin',
  subsections: [
    'Attendance Habits',
    'Morning Routine',
    'Sleep Discipline',
    'Time Use',
    'Consistency',
    'Daily Structure',
  ],
  questions: [

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 5A — ATTENDANCE HABITS
    // Target: Real frequency and pattern of absences — not intended behavior
    // Probe: Which days? What triggers? Does he track his own attendance?
    //        Is it fatigue, avoidance, or deliberate choice?
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms5_01',
      subsection: '5A',
      subsectionName: 'Attendance Habits',
      type: 'open',
      text: 'This semester, how many days of school have you actually missed? Give me the real number — not an estimate that makes it sound better.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Knows the specific number. Has tracked it. Shows he\'s monitoring his own attendance.',
        weak: '"A few" or "not that many" without a real number — distance from the actual picture',
        complex: 'The number itself matters, but so does whether he knows it. Not knowing reveals disengagement from his own academic accountability.',
      },
      redFlags: [
        '"I\'m not sure exactly"',
        '"Not many — just a couple"',
        'Clear undercount given behavioral data',
      ],
      followUp: {
        condition: 'doesn\'t know the number',
        question: 'When did you last check your attendance record in the school portal?',
      },
    },

    {
      id: 'ms5_02',
      subsection: '5A',
      subsectionName: 'Attendance Habits',
      type: 'forced_choice',
      text: 'When you miss a school day this semester, what\'s most often the real reason — be honest, not the reason you\'d give a teacher?',
      options: [
        'I\'m genuinely sick or dealing with something I can\'t control',
        'I\'m tired and the motivation to go isn\'t there',
        'I don\'t see the point of going on days that feel low-stakes',
        'I stayed up too late and couldn\'t get up in time',
      ],
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A: absences are legitimately unavoidable — rare for a pattern, not a trend',
        weak: 'Options B, C, or D: motivation-driven, avoidance-driven, or sleep-driven absences — all behavioral and correctable',
        complex: 'This question separates discipline from fatigue from avoidance. Each has a different intervention. Motivation-driven (B) = structure problem. Low-stakes perception (C) = consequence awareness problem. Sleep-driven (D) = daily habit problem.',
      },
      redFlags: [
        'Option C — "low-stakes" framing of school before Morehouse enrollment',
        'Option D — sleep dysregulation as attendance cause',
        'Any answer combined with minimization of frequency in ms5_01',
      ],
      followUp: {
        condition: 'answer is Option B, C, or D',
        question: 'That reason — how long has it been the reason? Was it ever the reason during basketball season?',
      },
    },

    {
      id: 'ms5_03',
      subsection: '5A',
      subsectionName: 'Attendance Habits',
      type: 'open',
      text: 'During basketball season — when you had practice and a team counting on you — how many days of school did you miss? Compare that to now.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Clear comparison that names the difference honestly. Recognizes basketball as external structure that produced attendance discipline.',
        weak: '"I was basically the same" — denies or minimizes the structural role basketball played in driving consistency',
        complex: 'This is the central question of Section 5A. If basketball season = near-zero absences and post-basketball = multiple absences, the data shows discipline was structure-dependent, not character-based. That\'s not a judgment — it\'s a preparation gap for Morehouse.',
      },
      redFlags: [
        'Denies meaningful difference between in-season and current attendance',
        '"I\'m still basically the same" when behavioral data says otherwise',
      ],
      followUp: {
        condition: 'clear difference acknowledged',
        question: 'At Morehouse there\'s no coach, no practice schedule, no team holding you accountable. What replaces basketball as the structure that gets you to class?',
      },
    },

    {
      id: 'ms5_04',
      subsection: '5A',
      subsectionName: 'Attendance Habits',
      type: 'likert',
      text: 'When I miss a day of school, I feel accountable — it bothers me and I make sure not to let it happen again soon.',
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
        strong: 'Agree with behavioral evidence — absences are rare and followed by self-correction',
        weak: 'Agree here but multiple absences this semester without self-correction — contradiction between stated accountability and actual pattern',
        complex: 'The follow-up on Agree is critical. If he says he feels accountable but misses again anyway, the accountability feeling isn\'t translating to behavioral change.',
      },
      redFlags: ['Agree/Strongly Agree combined with multiple absences and no self-correction pattern'],
      followUp: {
        condition: 'answer is "Agree" or "Strongly Agree"',
        question: 'If missing school bothers you — what happened after the first missed day this semester? What changed in your behavior?',
      },
    },

    {
      id: 'ms5_05',
      subsection: '5A',
      subsectionName: 'Attendance Habits',
      type: 'scenario',
      text: 'It\'s 7:15am on a Tuesday. You\'re supposed to be at school by 8:00. You slept poorly. You don\'t feel like going. Nothing critical is due today. Walk me through what actually happens — not what you wish happened.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Gets up. Goes. The decision to go isn\'t fully contingent on motivation or sleep quality.',
        weak: 'Stays home. Or: gets up, says he\'ll go, doesn\'t. Or: the decision is highly contingent on whether there\'s something "important" that day.',
        complex: 'The "nothing critical is due today" qualifier is intentional — it removes the external consequence as the driver and isolates internal discipline. What he actually does in that moment is behavioral data about character vs. circumstance.',
      },
      redFlags: [
        'Decision to go is contingent on whether something important is happening',
        'Has stayed home in this exact scenario this semester',
        '"It depends on how bad I feel"',
      ],
      followUp: {
        condition: 'admits to staying home in this scenario',
        question: 'At Morehouse, every class will have days that feel like that Tuesday. What changes about how you make that decision when it\'s Atlanta, not Oakland?',
      },
    },

    {
      id: 'ms5_06',
      subsection: '5A',
      subsectionName: 'Attendance Habits',
      type: 'slider',
      text: 'On a scale of 1–10, how strong is your attendance discipline right now — this semester, not historically?',
      min: 1,
      max: 10,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: '7–10 with behavioral evidence to support it — few to no absences',
        weak: '7–10 with multiple documented absences — overrated self-assessment',
        complex: '4–6 is the honest range given what we know. Cross-reference with ms5_01.',
      },
      redFlags: ['8–10 with multiple absences confirmed — significant self-assessment gap'],
      followUp: {
        condition: 'score is 7+ with absences confirmed',
        question: 'You rated yourself [X], but you\'ve missed [Y] days. How do you reconcile those two things?',
      },
    },

    {
      id: 'ms5_07',
      subsection: '5A',
      subsectionName: 'Attendance Habits',
      type: 'open',
      text: 'At Morehouse, missing class has a direct grade impact — many professors count attendance in the grade. Beyond the grade, what does missing a class actually cost you in a finance program?',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Can articulate the compound cost: missed content, missed networking with professor, missed participation grade, missed peer relationships. Shows awareness of the multi-layer cost.',
        weak: '"I\'d just catch up on what I missed" — views attendance as access to information only, not as relationship-building or culture-integration',
        complex: 'In finance specifically, professor relationships from class are a pipeline to research opportunities, recommendations, and industry connections. Someone who only sees class as information delivery misses most of the value.',
      },
      redFlags: ['"I\'d just get the notes from a classmate"'],
      followUp: {
        condition: 'only information cost named',
        question: 'What does missing class cost you in terms of the professor knowing your name, your face, and your seriousness — before you ever need a recommendation?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 5B — MORNING ROUTINE
    // Target: What does his actual morning look like right now?
    // Probe: Was morning discipline basketball-driven? What\'s the current trigger?
    //        Is there a routine or is each morning improvised?
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms5_08',
      subsection: '5B',
      subsectionName: 'Morning Routine',
      type: 'open',
      text: 'Walk me through your actual morning right now — from when you wake up to when you leave for school. Not the ideal morning. What actually happens.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Specific and honest account with a clear sequence. Some structure exists even if imperfect.',
        weak: 'Vague or clearly improvised — wakes up late, rushes, or describes inconsistency as the norm. No repeatable sequence.',
        complex: 'The specificity is the signal. A routine is repeatable and describable. An improvised morning cannot be described with specifics because it\'s different every day.',
      },
      redFlags: [
        '"It depends on the day"',
        'Morning described as reactive — waking to the last possible moment',
        'Phone use as first activity before getting ready',
        'No fixed wake time named',
      ],
      followUp: {
        condition: 'morning is improvised or reactive',
        question: 'During basketball season — what did your morning look like then? How is it different now?',
      },
    },

    {
      id: 'ms5_09',
      subsection: '5B',
      subsectionName: 'Morning Routine',
      type: 'forced_choice',
      text: 'When you wake up in the morning, your first 15 minutes are usually:',
      options: [
        'On task — I get up, get ready, and start moving without delay',
        'Slow to start — I lay there a bit before I actually get up',
        'On my phone — I check notifications, scroll, then eventually get up',
        'Inconsistent — some mornings I\'m up fast, some mornings I barely get there',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A: morning momentum — fast transitions into action',
        weak: 'Option C: phone-first morning — dopamine before task orientation disrupts activation energy for the day',
        complex: 'Option D is the most common honest answer and the most revealing. Inconsistency in the first 15 minutes maps to inconsistency across the day.',
      },
      redFlags: [
        'Option C — phone as first activity',
        'Option D combined with multiple absences — inconsistency as norm',
      ],
      followUp: {
        condition: 'answer is Option C or D',
        question: 'What time do you actually get out of bed on a school day right now — not your alarm time, the time you physically get up?',
      },
    },

    {
      id: 'ms5_10',
      subsection: '5B',
      subsectionName: 'Morning Routine',
      type: 'slider',
      text: 'How consistent is your morning routine right now — do you do roughly the same things in the same order each morning?',
      min: 1,
      max: 10,
      weight: 1.0,
      scoringDirection: 'strong',
      scoringNotes: {
        strong: '7–10: consistent morning sequence — strong predictor of daily discipline',
        weak: '1–4: highly variable mornings — each day starts improvised, which creates a compounding discipline gap across the week',
        complex: 'Morning consistency is one of the strongest behavioral predictors of academic consistency. At Morehouse with 8am classes, this score matters.',
      },
      redFlags: ['score 1–4 combined with reported school absences'],
      followUp: {
        condition: 'score <= 4',
        question: 'What would a consistent morning look like — what time, what steps, in what order?',
      },
    },

    {
      id: 'ms5_11',
      subsection: '5B',
      subsectionName: 'Morning Routine',
      type: 'scenario',
      text: 'It\'s your first week at Morehouse. Your first class is at 8am Monday, Wednesday, Friday. Your dorm is a 12-minute walk. You don\'t know the neighborhood yet. Describe your exact plan for those first three mornings — what time you set your alarm, when you get up, when you leave, what you do before you go.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Has a specific, detailed plan. Accounts for the walk time and buffer. Has thought about what he eats, what he brings, what time gets him there early. Shows he\'s rehearsed the logistics.',
        weak: '"I\'d set an alarm for 7 and head out." No buffer, no plan for the new environment, no breakfast consideration, no specifics about what happens if something goes wrong.',
        complex: 'The quality of this plan predicts whether he arrives at Morehouse with a morning system or improvises one under pressure.',
      },
      redFlags: [
        'No buffer time planned',
        'No mention of preparation the night before',
        'Alarm time leaves less than 30 minutes before departure',
        '"I\'ll figure it out when I get there"',
      ],
      followUp: {
        condition: 'plan is thin or vague',
        question: 'What happens on the morning where the alarm doesn\'t go off or you stayed up too late the night before — what\'s the backup?',
      },
    },

    {
      id: 'ms5_12',
      subsection: '5B',
      subsectionName: 'Morning Routine',
      type: 'open',
      text: 'What does your morning look like on a day you missed school this semester — what actually happened from the night before through the morning?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Specific and honest account that traces the sequence — stayed up until [time], alarm went off, made a decision to stay, or woke up and felt [state]. Shows self-awareness about the sequence.',
        weak: '"I was just tired" with no detail about the night before or the morning decision. Collapses a sequence into a single vague cause.',
        complex: 'The night-before context is critical. Understanding whether the morning absence was caused by sleep timing, emotional state, deliberate choice, or external factor determines the intervention.',
      },
      redFlags: [
        'No night-before context',
        '"I just wasn\'t feeling it" with no further detail',
        'Unable to recall the specific sequence',
      ],
      followUp: {
        condition: 'night-before context is named',
        question: 'At what point the night before did you know you probably weren\'t going to school the next day?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 5C — SLEEP DISCIPLINE
    // Target: What is actually happening with sleep — timing, quality, pattern?
    // Probe: Staying up late is documented. What\'s he doing? Why?
    //        Is it avoidance, grief, habit, entertainment, or lost structure?
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms5_13',
      subsection: '5C',
      subsectionName: 'Sleep Discipline',
      type: 'open',
      text: 'What time are you actually going to sleep most nights right now? And what are you doing in the hours before that?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Knows the real time. Can describe the pre-sleep activity honestly. Not defensive about the answer.',
        weak: '"It varies" or "not that late" — vagueness about a pattern that is documented as a concern',
        complex: 'The pre-sleep activity matters as much as the time. Anime, phone, music — these are different from lying awake unable to sleep. The activity reveals whether this is entertainment drift or something deeper.',
      },
      redFlags: [
        '"It varies a lot" when a pattern clearly exists',
        'Sleep time later than 1am combined with school absences',
        'Pre-sleep activity described as phone or social media scrolling with no wind-down',
      ],
      followUp: {
        condition: 'sleep time is consistently late',
        question: 'During basketball season, what time were you going to sleep? What\'s the gap between then and now?',
      },
    },

    {
      id: 'ms5_14',
      subsection: '5C',
      subsectionName: 'Sleep Discipline',
      type: 'forced_choice',
      text: 'The later sleep schedule since basketball ended — what\'s the main driver?',
      options: [
        'Freedom — I don\'t have practice at 6am anymore so I\'m using the extra time',
        'I stay up because I\'m not tired — my body hasn\'t adjusted yet',
        'I\'m watching something, gaming, or on my phone and I lose track of time',
        'I don\'t always want to go to sleep — being awake late feels easier than whatever the alternative is',
      ],
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A or B: structural/physiological cause — correctable with scheduling intention',
        weak: 'Option D: sleep as avoidance — staying awake to not have to be still, not have to feel the end of basketball, not have to face what\'s next. This is a grief and transition signal.',
        complex: 'Option C is the most common honest answer. Option D is the most significant. If he chooses D, it opens a window into what\'s underneath the late nights.',
      },
      redFlags: ['Option D — sleep avoidance as emotional regulation strategy'],
      followUp: {
        condition: 'answer is Option D',
        question: 'What is it about being awake late that feels easier — easier than what?',
      },
    },

    {
      id: 'ms5_15',
      subsection: '5C',
      subsectionName: 'Sleep Discipline',
      type: 'likert',
      text: 'My sleep schedule is something I control — I choose when I go to sleep and when I get up.',
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
        strong: 'Agree: sleep schedule is experienced as a choice — means he can choose to change it',
        weak: 'Strongly Disagree: sleep is experienced as something that happens to him — removes agency and therefore responsibility to change it',
        complex: 'The agency framing is the key. If sleep is a choice, it can be changed by choice. If it\'s experienced as something he can\'t control, intervention requires a different approach.',
      },
      redFlags: ['Strongly Disagree — sleep experienced as uncontrollable'],
      followUp: {
        condition: 'answer is "Agree" or "Strongly Agree"',
        question: 'If your sleep is a choice — what would it take to choose a schedule that supports getting to school every day?',
      },
    },

    {
      id: 'ms5_16',
      subsection: '5C',
      subsectionName: 'Sleep Discipline',
      type: 'slider',
      text: 'How many hours of sleep are you actually getting on a typical night right now?',
      min: 1,
      max: 12,
      weight: 1.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: '7–9 hours: adequate for cognitive function and emotional regulation',
        weak: 'Under 6 hours: chronic sleep deprivation — affects motivation, emotional regulation, and academic performance',
        complex: 'Cross-reference with ms5_13 sleep time and ms5_08 morning routine. If he\'s going to sleep at 2am and waking at 7am — that\'s five hours, which explains multiple behavioral symptoms.',
      },
      redFlags: ['Under 6 hours consistently'],
      followUp: {
        condition: 'score under 6',
        question: 'Chronic sleep under six hours affects your mood, motivation, and cognitive performance. How much of what you\'re calling "low motivation" might actually be sleep deprivation?',
      },
    },

    {
      id: 'ms5_17',
      subsection: '5C',
      subsectionName: 'Sleep Discipline',
      type: 'scenario',
      text: 'It\'s 11:30pm. You have school tomorrow at 8am. You\'re not tired. You\'re watching an anime you\'re into, or you\'re on your phone. What actually happens?',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Puts the phone down or finishes an episode with intent to stop. Has a self-imposed cutoff that he actually follows.',
        weak: '"I\'d just keep going until I was tired" — passive sleep schedule with no cutoff discipline',
        complex: 'This is the most behaviorally specific sleep question. It removes abstractions and puts him in the actual moment. What he actually does is the data.',
      },
      redFlags: [
        '"I\'d keep watching until I got tired"',
        'No cutoff time named',
        '"I can\'t really sleep until later anyway"',
      ],
      followUp: {
        condition: 'no cutoff discipline named',
        question: 'At Morehouse with 8am classes, that 11:30pm decision has direct attendance consequences. What would make you make a different choice in that moment?',
      },
    },

    {
      id: 'ms5_18',
      subsection: '5C',
      subsectionName: 'Sleep Discipline',
      type: 'open',
      text: 'During basketball season, what time were you going to sleep and what time were you waking up? What made that schedule work?',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Specific times named. Can identify what made the schedule work — external requirement (practice), consequence (being tired at practice), team accountability.',
        weak: 'Vague or can\'t remember. Or: deflects — "it was just different then."',
        complex: 'What made the basketball sleep schedule work is the diagnostic. If it was entirely external (coach required it, practice started at 6am) — the structure is gone. If there was any internal component — that can be rebuilt.',
      },
      redFlags: ['"It just worked because I had to" with no internal component identified'],
      followUp: {
        condition: 'entirely external drivers identified',
        question: 'Morehouse doesn\'t have a coach waking you up. What\'s the internal reason to maintain the sleep schedule you\'re going to need there?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 5D — TIME USE
    // Target: How does he actually spend his unstructured time?
    // Probe: Is drift = avoidance, entertainment, or just absence of structure?
    //        What is the real daily time budget?
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms5_19',
      subsection: '5D',
      subsectionName: 'Time Use',
      type: 'open',
      text: 'Walk me through yesterday — from when you woke up to when you went to sleep. How did you actually spend your time? Be specific.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Specific and honest account. Can name activities with approximate time blocks. Some productive activity present alongside downtime.',
        weak: 'Vague — "I went to school, came home, relaxed, went to sleep." No specificity about what "relaxed" looked like or how long each thing took.',
        complex: 'Yesterday is concrete and recent enough to describe accurately. Vagueness about yesterday is itself data — if he doesn\'t know how he spent his time, it means time is not being managed actively.',
      },
      redFlags: [
        'Cannot describe yesterday with specificity',
        'Hours unaccounted for — large blocks with no content',
        'No productive activity between school dismissal and sleep',
      ],
      followUp: {
        condition: 'large unaccounted blocks',
        question: 'Those [X] hours in the afternoon — where did that time actually go?',
      },
    },

    {
      id: 'ms5_20',
      subsection: '5D',
      subsectionName: 'Time Use',
      type: 'forced_choice',
      text: 'The time between getting home from school and going to sleep — how is it mostly spent right now?',
      options: [
        'Productively — homework, working on skills, reading, something with a purpose',
        'A mix — some productive time, some downtime, roughly balanced',
        'Mostly downtime — phone, anime, music, gaming, relaxing',
        'I don\'t really track it — time moves and before I know it the day is over',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A or B: time has purposeful structure even in unstructured hours',
        weak: 'Option D: time blindness — a common post-structure phenomenon where hours disappear without intentional use',
        complex: 'Option C is honest and not inherently problematic — rest is legitimate. The issue is the proportion and whether it\'s chosen or defaulted into.',
      },
      redFlags: [
        'Option D — time blindness combined with academic drift',
        'Option C when academic catch-up or Morehouse prep work is pending',
      ],
      followUp: {
        condition: 'answer is Option C or D',
        question: 'In a typical week right now, how many hours would you say go to something that is building toward who you want to be — versus how many just pass?',
      },
    },

    {
      id: 'ms5_21',
      subsection: '5D',
      subsectionName: 'Time Use',
      type: 'slider',
      text: 'On a scale of 1–10, how intentionally do you use your time right now — are you making deliberate choices about how you spend it, or does it mostly just happen?',
      min: 1,
      max: 10,
      weight: 1.5,
      scoringDirection: 'strong',
      scoringNotes: {
        strong: '7–10: active time allocation — time is assigned before it passes',
        weak: '1–4: passive time use — time passes, then he accounts for it rather than planning it',
        complex: 'Cross-reference with ms5_19 and ms5_20. If yesterday had large unaccounted blocks, the score here should reflect that.',
      },
      redFlags: ['8–10 with unaccounted time blocks in ms5_19'],
      followUp: {
        condition: 'score <= 5',
        question: 'What would intentional time use actually look like for your day between now and August?',
      },
    },

    {
      id: 'ms5_22',
      subsection: '5D',
      subsectionName: 'Time Use',
      type: 'scenario',
      text: 'You have four hours free on a Saturday with no obligations. Nothing is due. No one is watching. What actually happens — walk me through those four hours in real time.',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Some mix of genuine rest, something productive, something connecting. Not four hours of passive consumption. Can describe the sequence.',
        weak: 'Entirely passive — anime, phone, music, sleep — four hours gone with no choice made about any of them',
        complex: 'Unstructured free time reveals default behavior. This is what Morehouse weekends will look like. The default behavior travels.',
      },
      redFlags: [
        'Four hours described as entirely passive consumption',
        '"I\'d just chill and see where the day goes"',
        'No mention of anything with intentional value',
      ],
      followUp: {
        condition: 'passive consumption described',
        question: 'Is that four hours genuinely restful — do you feel better after it? Or does time just pass?',
      },
    },

    {
      id: 'ms5_23',
      subsection: '5D',
      subsectionName: 'Time Use',
      type: 'open',
      text: 'Between now and August, there are roughly 20 weeks. What specifically are you doing in those 20 weeks to be ready for Morehouse — academically, financially, and in terms of daily habits?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Has specific plans: IEP outreach, financial prep, Morehouse orientation registration, building a sleep schedule, identifying study tools for dyslexia, connecting with OK Program alums at Morehouse.',
        weak: '"I\'ll get ready when it gets closer" — deferred preparation with no concrete current activity',
        complex: 'This is the time use question that links to everything else. How he uses the next 20 weeks is the most predictive data point for how he arrives at Morehouse.',
      },
      redFlags: [
        '"I\'ll start getting ready in July"',
        'No specific preparation activities named',
        '"I\'m basically ready"',
      ],
      followUp: {
        condition: 'preparation is vague or deferred',
        question: 'What specifically could you do this week — one concrete thing — that begins the preparation? Not the whole plan, just the first step.',
      },
    },

    {
      id: 'ms5_24',
      subsection: '5D',
      subsectionName: 'Time Use',
      type: 'likert',
      text: 'At the end of most days, I feel like I used my time well.',
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
        strong: 'Agree with behavioral specificity in ms5_19 to support it',
        weak: 'Strongly Disagree: low end-of-day satisfaction — dissatisfaction with time use that isn\'t translating to behavioral change',
        complex: 'Disagreeing here is honest and important — it means he\'s aware the days aren\'t going well. The question is whether that awareness produces any change.',
      },
      redFlags: ['Strongly Disagree combined with no described time-change strategy'],
      followUp: {
        condition: 'answer in ["Strongly Disagree", "Disagree"]',
        question: 'You know most days aren\'t going well. What hasn\'t made you change it yet?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 5E — CONSISTENCY
    // Target: Is his consistency a trait or was it externally produced?
    // Probe: In-season vs. off-season gap, what sustains consistency without a team
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms5_25',
      subsection: '5E',
      subsectionName: 'Consistency',
      type: 'open',
      text: 'Describe the most consistent you\'ve ever been in your life — a period where your habits, attendance, effort, and follow-through were all high. What was happening during that period that made it work?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names a specific period (basketball season, a particular academic year) and can identify the specific conditions that enabled the consistency.',
        weak: 'Names a period but can\'t identify why it worked — "I was just more motivated" — without naming the structural conditions',
        complex: 'What made the consistency work is the diagnostic. If the answer is entirely external (coach, team, schedule), the consistency is structure-dependent. If he can name any internal component, that\'s what to build from.',
      },
      redFlags: [
        'Can\'t name a period',
        '"I\'m pretty consistent generally" when behavioral data says otherwise',
        'Names a period but attributes success entirely to external conditions with no internal component',
      ],
      followUp: {
        condition: 'conditions identified are entirely external',
        question: 'Those external conditions — they\'re gone now, and they won\'t be there in the same way at Morehouse. What\'s the internal version of those conditions that you can create yourself?',
      },
    },

    {
      id: 'ms5_26',
      subsection: '5E',
      subsectionName: 'Consistency',
      type: 'forced_choice',
      text: 'When you\'re consistent — really showing up every day, following through, staying on task — what is most responsible for that?',
      options: [
        'A clear commitment I\'ve made to myself that I hold regardless of conditions',
        'An external structure — practice schedule, team, someone who holds me accountable',
        'The stakes feeling real — when the consequences are visible I stay consistent',
        'My mood and energy — on good days I\'m consistent, on hard days less so',
      ],
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A: internally-driven consistency — most durable for an independent college environment',
        weak: 'Option B: structure-dependent consistency — the basketball-to-Morehouse gap risk in a single answer',
        complex: 'Option C is function-appropriate — consequences matter. Option D is honest — mood-contingent consistency is the most fragile form.',
      },
      redFlags: [
        'Option B as primary driver — structure-dependent consistency confirms basketball dependency',
        'Option D — mood-contingent consistency cannot sustain Morehouse performance',
      ],
      followUp: {
        condition: 'answer is Option B or D',
        question: 'At Morehouse, external structure will be minimal and consequences won\'t always be visible until it\'s too late. What can you build right now that replaces what\'s currently making you consistent?',
      },
    },

    {
      id: 'ms5_27',
      subsection: '5E',
      subsectionName: 'Consistency',
      type: 'likert',
      text: 'The person I am during basketball season and the person I am right now are equally disciplined and consistent.',
      options: [
        'Strongly Disagree',
        'Disagree',
        'Neutral',
        'Agree',
        'Strongly Agree',
      ],
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Strongly Disagree or Disagree: honest acknowledgment of the in-season/off-season gap — the most accurate and useful answer for building a Morehouse preparation plan',
        weak: 'Strongly Agree: denial of a documented gap — prevents identifying the missing structural component',
        complex: 'This is the most direct contradiction test in Section 5E. The behavioral data (absences, late nights, motivation drop post-basketball) strongly suggests Disagree is accurate. If he says Agree, probe specifically.',
      },
      redFlags: ['Strongly Agree — denial of gap that behavioral data confirms'],
      followUp: {
        condition: 'answer in ["Agree", "Strongly Agree"]',
        question: 'In-season: how many school days did you miss? This semester, post-basketball: how many? What does that comparison tell you?',
      },
    },

    {
      id: 'ms5_28',
      subsection: '5E',
      subsectionName: 'Consistency',
      type: 'scenario',
      text: 'It\'s week three at Morehouse. No team, no coach, no mom. You\'ve been consistent for two weeks. Week three hits and your motivation dips — the newness is wearing off, the work is harder than expected, you\'re tired. What keeps you consistent that week?',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names a specific internal mechanism: the legacy vision, the dad comparison, not letting his mom down, the okP program promise, a commitment to himself. Something that doesn\'t require external activation.',
        weak: '"I\'d just push through it." Willpower-only answer with no named source — willpower is finite and undirected.',
        complex: 'Week three is the critical test period for college freshmen. The novelty is gone, the real difficulty arrives, the social structures aren\'t built yet. What he names as his week-three sustainer is his most important consistency resource.',
      },
      redFlags: [
        '"I\'d just push through it" with no source named',
        '"I\'d call my mom" without an internal driver underneath it',
        'Can\'t name anything specific',
      ],
      followUp: {
        condition: 'internal driver is named',
        question: 'That thing you just named — how present is it in your daily life right now? Is it active or theoretical?',
      },
    },

    {
      id: 'ms5_29',
      subsection: '5E',
      subsectionName: 'Consistency',
      type: 'slider',
      text: 'How consistent are you right now — this week, these days — in your habits and follow-through? Rate yourself honestly.',
      min: 1,
      max: 10,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: '7–10 with behavioral evidence',
        weak: '1–4: significant consistency deficit — needs to be addressed before Morehouse',
        complex: '4–6 is the likely honest range. Cross-reference with attendance and sleep data throughout Section 5.',
      },
      redFlags: ['8–10 with multiple absences and late nights documented throughout Section 5'],
      followUp: {
        condition: 'score <= 5',
        question: 'What would need to change — specifically — for that to be a 7 or 8 by August?',
      },
    },

    {
      id: 'ms5_30',
      subsection: '5E',
      subsectionName: 'Consistency',
      type: 'open',
      text: 'What\'s the longest you\'ve maintained a new habit or routine on your own — without someone requiring it of you? What happened?',
      options: null,
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names a specific habit, a real duration, and can describe what made it stick or what ended it.',
        weak: 'Cannot name an example. Or the habit was always externally required — not genuinely self-generated.',
        complex: 'This question probes whether he has ever successfully built a routine independently. If the answer is no — he has no evidence of self-generated consistency — that\'s the core Morehouse risk.',
      },
      redFlags: [
        'Cannot name a self-generated habit with duration',
        '"I don\'t really make habits for myself"',
        'All examples are externally required (school, basketball, parents)',
      ],
      followUp: {
        condition: 'no self-generated habit named',
        question: 'Between now and August — what\'s one habit you could build on your own, without anyone requiring it, to prove to yourself you can do it?',
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSECTION 5F — DAILY STRUCTURE
    // Target: Does he have any self-generated structure in place right now?
    // Probe: Can he design and maintain a daily schedule without external mandate?
    //        Will he arrive at Morehouse with a system or improvise one under pressure?
    // ─────────────────────────────────────────────────────────────────────────

    {
      id: 'ms5_31',
      subsection: '5F',
      subsectionName: 'Daily Structure',
      type: 'open',
      text: 'Do you have any kind of daily structure right now — a routine, a schedule, a set of things you do in a particular order each day? Describe it.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Yes — specific, describable routine even if imperfect. Some predictable sequence to the day.',
        weak: '"Not really — every day is different" — no self-generated structure exists post-basketball',
        complex: 'The existence of ANY self-generated structure is the indicator. Structure doesn\'t have to be rigid or perfect. The question is whether he has built anything on his own.',
      },
      redFlags: [
        '"Every day is different"',
        '"I just go with the flow"',
        'Cannot describe a repeatable daily sequence',
      ],
      followUp: {
        condition: 'no structure described',
        question: 'The structure you had during basketball season — that was built around basketball. Without it, what would a structure built around Morehouse preparation look like?',
      },
    },

    {
      id: 'ms5_32',
      subsection: '5F',
      subsectionName: 'Daily Structure',
      type: 'forced_choice',
      text: 'When you think about your daily schedule, which of these best describes how you operate right now?',
      options: [
        'I have a rough plan for each day and I follow it most of the time',
        'I have a general sense of what I should do but I mostly react to what comes up',
        'I don\'t plan much — I handle things as they arrive',
        'Structure feels constraining — I prefer to keep my days open and flexible',
      ],
      weight: 1.5,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Option A: planned and executed — active structure with follow-through',
        weak: 'Option D: structure-avoidant framing — the most concerning for Morehouse because the framing makes structure itself the problem',
        complex: 'Options B and C are common and workable as starting points. The question is whether he can see the limitation when Morehouse demands more structure than he currently has.',
      },
      redFlags: ['Option D — structure as constraining identity'],
      followUp: {
        condition: 'answer is Option D',
        question: 'Finance is one of the most structured careers that exists — markets, compliance timelines, reporting deadlines. What does your preference for flexibility mean for that environment?',
      },
    },

    {
      id: 'ms5_33',
      subsection: '5F',
      subsectionName: 'Daily Structure',
      type: 'scenario',
      text: 'Design your ideal daily structure for your first semester at Morehouse — from wake-up to sleep. Be specific: times, activities, what class time looks like, what evening looks like, when you study, when you eat, when you rest.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Specific, realistic schedule with actual time blocks. Accounts for class schedule, study time (extended for dyslexia workload), meals, rest, and some social time. Includes disability services and office hours.',
        weak: 'Vague — "I\'d wake up, go to class, study in the evening, sleep." No specific times, no accounting for dyslexia reading time, no office hours, no advisor check-in.',
        complex: 'The quality of this schedule reveals whether he has thought through the Morehouse day concretely. A vague schedule is an improvised one. An improvised schedule at Morehouse fails by week three.',
      },
      redFlags: [
        'No specific times named',
        'No extended study time accounting for dyslexia reading load',
        'No office hours or advisor time blocked',
        '"I\'ll figure out the schedule when I get there"',
      ],
      followUp: {
        condition: 'schedule is vague',
        question: 'If dyslexia means reading takes you three times as long as a classmate — how many hours per day do you need to block specifically for reading and coursework?',
      },
    },

    {
      id: 'ms5_34',
      subsection: '5F',
      subsectionName: 'Daily Structure',
      type: 'likert',
      text: 'I could build and maintain a daily routine on my own — without a coach, a team, or my mom — for a full semester.',
      options: [
        'Strongly Disagree',
        'Disagree',
        'Neutral',
        'Agree',
        'Strongly Agree',
      ],
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Agree with self-generated structure evidence from ms5_31 and ms5_30',
        weak: 'Agree without evidence — confidence claim without behavioral support',
        complex: 'Strongly Disagree is honest if he recognizes the basketball dependency. This is not a failure — it\'s a preparation signal. If he disagrees, the question becomes: what structure will you put in place?',
      },
      redFlags: ['Strongly Agree with no self-generated structure evident throughout Section 5'],
      followUp: {
        condition: 'answer is "Agree" or "Strongly Agree" without structural evidence',
        question: 'You\'re going to Morehouse in five months. What self-generated routine are you building right now to prove to yourself you can do it independently?',
      },
    },

    {
      id: 'ms5_35',
      subsection: '5F',
      subsectionName: 'Daily Structure',
      type: 'open',
      text: 'What is one specific change to your daily routine — starting this week, not in August — that would make you more ready for the discipline Morehouse requires? Name it and tell me why you haven\'t made it yet.',
      options: null,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: 'Names a specific, actionable change. Can honestly explain why it hasn\'t happened yet — and the explanation doesn\'t dismiss the urgency.',
        weak: '"I\'ll start adjusting when I get there." Defers the change to a future context rather than building the muscle now.',
        complex: 'This is both an assessment and an intervention question. What he names tells us where his awareness lives. Why he hasn\'t made the change yet tells us the barrier.',
      },
      redFlags: [
        '"I\'ll start getting ready when I get closer to August"',
        'Cannot name a specific change',
        '"I\'m basically already ready"',
      ],
      followUp: {
        condition: 'change is named and barrier is named',
        question: 'The barrier you just named — what would it take to remove it this week?',
      },
    },

    {
      id: 'ms5_36',
      subsection: '5F',
      subsectionName: 'Daily Structure',
      type: 'slider',
      text: 'How prepared is your current daily discipline — your actual habits right now — to survive the independence of Morehouse without external structure?',
      min: 1,
      max: 10,
      weight: 2.0,
      scoringDirection: 'complex',
      scoringNotes: {
        strong: '7–10 with behavioral evidence supporting it — genuinely prepared daily discipline',
        weak: '1–4: honest self-assessment of unpreparedness — important data that should drive the next five months',
        complex: '5–7: the realistic zone. The honest question is whether his current habits — not his intentions — are ready for an unsupervised Morehouse environment.',
      },
      redFlags: [
        '8–10 with no self-generated structure, late nights, and school absences documented throughout Section 5',
        '1–3 without any plan to close the gap before August',
      ],
      followUp: {
        condition: 'score is 4–6',
        question: 'You have five months. What would it take to get that to a 7 or 8 before you get on the plane to Atlanta?',
      },
    },

  ],
};

// ─── SCORING CONFIGURATION ───────────────────────────────────────────────────

export const MELVIN_SECTION_5_SCORING = {
  subsections: {
    '5A': { name: 'Attendance Habits', maxWeight: 12.5, redFlagThreshold: 3 },
    '5B': { name: 'Morning Routine', maxWeight: 10.5, redFlagThreshold: 2 },
    '5C': { name: 'Sleep Discipline', maxWeight: 10.5, redFlagThreshold: 2 },
    '5D': { name: 'Time Use', maxWeight: 10.5, redFlagThreshold: 2 },
    '5E': { name: 'Consistency', maxWeight: 11.5, redFlagThreshold: 3 },
    '5F': { name: 'Daily Structure', maxWeight: 12.5, redFlagThreshold: 3 },
  },
  globalRedFlags: [
    'Attendance discipline confirmed as basketball-dependent — no self-generated attendance driver named (5A + 5E)',
    'Sleep schedule after midnight combined with school absences — causal chain confirmed (5C + 5A)',
    'No self-generated daily structure exists post-basketball — improvised days as norm (5F)',
    'Time blindness confirmed — hours pass without intentional allocation (5D)',
    'Consistency rated as character trait but identified as externally-produced (5E)',
    'Morehouse daily schedule vague or unplanned — no concrete preparation for independence (5F)',
    'No self-generated habit successfully maintained — independence readiness unproven (5E)',
    'Sleep avoidance pattern (staying awake to avoid stillness) combined with unprocessed post-basketball grief (5C)',
  ],
  contradictionChecks: [
    {
      id: 'contradiction_5_1',
      description: 'Consistency identity vs. basketball dependency',
      questions: ['ms5_03', 'ms5_26', 'ms5_27'],
      flag: 'Identifies as consistent and disciplined but in-season vs. off-season data shows consistency was externally produced by basketball structure',
    },
    {
      id: 'contradiction_5_2',
      description: 'Self-assessed discipline vs. actual attendance',
      questions: ['ms5_01', 'ms5_04', 'ms5_06'],
      flag: 'Rates own attendance discipline at 7+ but documented absences and inability to name the number contradict the self-rating',
    },
    {
      id: 'contradiction_5_3',
      description: 'Morning consistency self-rating vs. described morning behavior',
      questions: ['ms5_08', 'ms5_09', 'ms5_10'],
      flag: 'Rates morning routine as consistent but describes improvised, reactive mornings with no repeatable sequence',
    },
    {
      id: 'contradiction_5_4',
      description: 'Intentional time use rating vs. described daily time',
      questions: ['ms5_19', 'ms5_20', 'ms5_21'],
      flag: 'Rates time intentionality at 6+ but cannot describe yesterday specifically and names passive consumption as primary afternoon activity',
    },
    {
      id: 'contradiction_5_5',
      description: 'Morehouse readiness self-rating vs. current discipline infrastructure',
      questions: ['ms5_34', 'ms5_36', 'ms5_31', 'ms5_30'],
      flag: 'Rates Morehouse discipline readiness at 7+ but has no self-generated daily structure, no self-generated maintained habit, and a late sleep schedule',
    },
  ],
};
