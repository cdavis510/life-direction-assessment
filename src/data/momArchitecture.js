// ============================================================
// MOM'S APP — FULL SECTION ARCHITECTURE
// Assessment: Parenting Effectiveness & Support Quality
// Subject: Mom (parent of Mekhi + Melvin)
// Purpose: Surface blind spots, identify strengths, generate
//          monthly action plan for both sons
// Status: Architecture only — questions NOT yet generated
// ============================================================

export const MOM_APP_ARCHITECTURE = {

  meta: {
    title: "Parent Assessment — Raising Boys to Men",
    subtitle: "An honest look at how you show up for your sons",
    totalSections: 12,
    purpose: "Identify what's working, what needs to shift, and what to do next — specifically for Mekhi and Melvin",
    tone: "Serious, emotionally intelligent, non-judgmental, direct",
    outputTarget: "momAgent.js — feeds into Mom Dashboard and generates dual-son action plan",
  },

  // ============================================================
  // SECTION 1: Relationship with Mekhi
  // ============================================================
  section1: {
    id: 'MOM_S1',
    title: "Relationship with Mekhi",
    purpose: "Assess the quality, honesty, and depth of her current relationship with her older son. Identify patterns that support or undermine his growth.",
    whatItMeasures: [
      "How well she knows who Mekhi actually is right now — not who he was or who she hopes he is",
      "Whether she sees him clearly or through a protective filter",
      "The emotional temperature of their daily relationship",
      "How much real conversation vs. transactional communication exists between them",
      "Whether she is his safe space or his performance anxiety",
      "How she responds to his failures, retreats, and inconsistency",
    ],
    subsections: [
      {
        id: 'MOM_1A',
        name: 'How Well She Knows Him',
        focus: 'Does she know Mekhi\'s actual current state — his mood, his fears, his direction — or is she working from an outdated or idealized picture?',
      },
      {
        id: 'MOM_1B',
        name: 'Emotional Connection',
        focus: 'Is there warmth, safety, and realness in the relationship — or is it functional, transactional, or distant?',
      },
      {
        id: 'MOM_1C',
        name: 'Her Response to His Struggles',
        focus: 'When Mekhi is failing, retreating, or disappointing — how does she respond? Does it help or make it worse?',
      },
      {
        id: 'MOM_1D',
        name: 'Pride vs. Pressure',
        focus: 'Does he feel her love as pride and belief, or as pressure and conditional approval? Does she know which one he\'s receiving?',
      },
    ],
    scoringCategories: [
      'Connection Depth Score',
      'Situational Awareness Score',
      'Response Quality Score',
    ],
    redFlagThemes: [
      'She describes Mekhi primarily through worry, disappointment, or labels ("lazy," "unfocused")',
      'She cannot accurately describe what he is feeling or struggling with right now',
      'Her support in hard moments tends to increase his shame or withdrawal',
      'She is unaware of how her expressions of concern land on him',
    ],
  },

  // ============================================================
  // SECTION 2: Relationship with Melvin
  // ============================================================
  section2: {
    id: 'MOM_S2',
    title: "Relationship with Melvin",
    purpose: "Assess the quality and accuracy of her relationship with her younger son. Identify where her protective instincts may be creating blind spots and where her closeness is an asset.",
    whatItMeasures: [
      "How clearly she sees Melvin\'s post-basketball transition and what it\'s costing him",
      "Whether she reads his emotional containment as strength or as concern",
      "The degree to which she enables his avoidance vs. pushes him forward",
      "How the closeness between them — which is real and genuine — functions: does it support independence or create dependency?",
      "Whether she knows what Melvin doesn\'t tell her",
    ],
    subsections: [
      {
        id: 'MOM_2A',
        name: 'How Well She Knows Him',
        focus: 'Can she read Melvin\'s real state beneath the composed exterior? Does she know the difference between him being okay and him being quiet?',
      },
      {
        id: 'MOM_2B',
        name: 'The Post-Basketball Transition',
        focus: 'How clearly does she see the behavior shift since basketball ended? Does she have a name for it and a plan?',
      },
      {
        id: 'MOM_2C',
        name: 'Closeness vs. Dependency',
        focus: 'Is the deep bond between them building his independence — or is she the scaffolding he hasn\'t been asked to stand without?',
      },
      {
        id: 'MOM_2D',
        name: 'Her Fear for Him',
        focus: 'What specifically does she worry about for Melvin — and does her worry translate into useful action or anxiety that bleeds into the relationship?',
      },
    ],
    scoringCategories: [
      'Perceptual Accuracy Score',
      'Transition Readiness Awareness Score',
      'Dependency Risk Score',
    ],
    redFlagThemes: [
      'She mistakes Melvin\'s composure for contentment — missing what he\'s suppressing',
      'She has not named or addressed the post-basketball behavior shift directly with him',
      'Her closeness with Melvin has not been designed to produce independence — it has been designed for connection only',
      'Her worry for Melvin is vague and unactionable — she knows something is off but doesn\'t know what to do',
    ],
  },

  // ============================================================
  // SECTION 3: Communication Style
  // ============================================================
  section3: {
    id: 'MOM_S3',
    title: "Communication Style",
    purpose: "Identify how she communicates with each son — what she does well, what shuts them down, and whether she has different approaches for different sons.",
    whatItMeasures: [
      "Her default communication register — lecture, dialogue, question, directive, emotional",
      "Whether she listens to understand or listens to respond",
      "How she handles communication when she is worried, disappointed, or frustrated",
      "Whether her sons experience conversations with her as safe or as minefields",
      "Her ability to communicate differently with Mekhi vs. Melvin given their different temperaments",
      "How she follows up after a hard conversation",
    ],
    subsections: [
      {
        id: 'MOM_3A',
        name: 'Default Communication Style',
        focus: 'Is her baseline approach with her sons directive, collaborative, emotional, or transactional?',
      },
      {
        id: 'MOM_3B',
        name: 'Listening Quality',
        focus: 'Does she listen to understand what her sons are actually saying — or to assess, correct, or worry?',
      },
      {
        id: 'MOM_3C',
        name: 'Communication Under Stress',
        focus: 'What does her communication look like when she is afraid for them, angry with them, or exhausted? Does it help or do damage?',
      },
      {
        id: 'MOM_3D',
        name: 'Son-Specific Adaptation',
        focus: 'Does she communicate differently with Mekhi vs. Melvin based on what each needs — or does she use the same approach for both?',
      },
    ],
    scoringCategories: [
      'Communication Register Score',
      'Active Listening Score',
      'Stress Communication Score',
      'Adaptability Score',
    ],
    redFlagThemes: [
      'Conversations regularly end with her sons shutting down or leaving the room',
      'She communicates the same way to both sons despite their very different temperaments',
      'When worried, her communication style escalates in ways that close the son down',
      'She talks more than she listens in most parenting conversations',
    ],
  },

  // ============================================================
  // SECTION 4: Emotional Support Style
  // ============================================================
  section4: {
    id: 'MOM_S4',
    title: "Emotional Support Style",
    purpose: "Understand how she supports her sons emotionally — and whether that support is actually received as support by them.",
    whatItMeasures: [
      "Whether she offers emotional presence or emotional management",
      "How she responds when a son is visibly struggling vs. quietly struggling",
      "Whether she makes space for them to feel difficult things — or works to fix or minimize those feelings",
      "The difference between empathy and sympathy in how she shows up",
      "How she supports them without making them responsible for her emotional state",
      "Whether her support builds their capacity to handle things or creates reliance on her processing",
    ],
    subsections: [
      {
        id: 'MOM_4A',
        name: 'Presence vs. Problem-Solving',
        focus: 'When a son is hurting — does she sit with him in it, or does she immediately move to fixing, explaining, or minimizing?',
      },
      {
        id: 'MOM_4B',
        name: 'Reading Emotional Cues',
        focus: 'Can she tell when Mekhi or Melvin is struggling without being told directly? Does she know how to open the door?',
      },
      {
        id: 'MOM_4C',
        name: 'Her Own Emotional Regulation',
        focus: 'When she is scared for them — does she manage that inside herself before engaging them, or does her fear become their emotional burden?',
      },
      {
        id: 'MOM_4D',
        name: 'Building Emotional Capacity',
        focus: 'Does her emotional support teach them to process and handle difficulty — or does it route all processing through her?',
      },
    ],
    scoringCategories: [
      'Emotional Presence Score',
      'Cue-Reading Score',
      'Self-Regulation Score',
      'Capacity-Building Score',
    ],
    redFlagThemes: [
      'Her sons bring problems to her only as a last resort — not as a first resource',
      'She moves to fixing before fully receiving what they\'re feeling',
      'Her anxiety for them is expressed in ways that make their situations feel more dire',
      'She processes her worry about her sons with her sons rather than separately',
    ],
  },

  // ============================================================
  // SECTION 5: Accountability Style
  // ============================================================
  section5: {
    id: 'MOM_S5',
    title: "Accountability Style",
    purpose: "Assess how she holds her sons accountable — whether it is effective, consistent, and appropriate to their ages and situations.",
    whatItMeasures: [
      "Whether her accountability practices have kept pace with her sons\' ages and developmental stages",
      "How she holds Mekhi accountable differently from Melvin given their different profiles",
      "Whether consequences are connected, proportional, and followed through",
      "How she responds when a son fails to meet expectations",
      "Whether accountability conversations generate shame and defensiveness or ownership and course correction",
      "Her ability to hold the line when they push back",
    ],
    subsections: [
      {
        id: 'MOM_5A',
        name: 'Expectations Clarity',
        focus: 'Are her expectations of each son clearly stated, age-appropriate, and understood — or are they assumed, shifting, or vague?',
      },
      {
        id: 'MOM_5B',
        name: 'Consequence Consistency',
        focus: 'When expectations are not met, does she follow through consistently — or do her consequences shift based on her mood, their pushback, or her guilt?',
      },
      {
        id: 'MOM_5C',
        name: 'Accountability Conversations',
        focus: 'What do her accountability conversations actually sound like — and do they produce ownership in her sons or defensiveness and shutdown?',
      },
      {
        id: 'MOM_5D',
        name: 'Age-Appropriate Evolution',
        focus: 'Has her accountability approach evolved as her sons grew? Is she holding a 17-year-old and an 18-year-old the way those ages require?',
      },
    ],
    scoringCategories: [
      'Expectations Clarity Score',
      'Follow-Through Score',
      'Conversation Effectiveness Score',
      'Developmental Alignment Score',
    ],
    redFlagThemes: [
      'Consequences are frequently not followed through — sons know this',
      'Accountability conversations consistently end in shutdown, argument, or son walking away',
      'She holds them accountable the same way she did when they were 13',
      'She backs down on expectations when she feels guilty about what they\'ve been through',
    ],
  },

  // ============================================================
  // SECTION 6: Boundaries
  // ============================================================
  section6: {
    id: 'MOM_S6',
    title: "Boundaries",
    purpose: "Identify where her boundaries with her sons are clear and functional, where they are missing, and where they are too rigid.",
    whatItMeasures: [
      "Whether she has clear personal limits with each son around her time, emotional labor, and household expectations",
      "How she communicates and enforces limits when they are crossed",
      "Whether her boundaries with each son are appropriate to their age and developmental stage",
      "The role her sons\' pain and history plays in her ability to hold limits",
      "Whether her boundaries support or undermine their independence",
      "How she navigates the boundary between being their mother and being their friend",
    ],
    subsections: [
      {
        id: 'MOM_6A',
        name: 'Personal Limits',
        focus: 'Does she have clear limits around what she will and will not do for each son — and does she hold them?',
      },
      {
        id: 'MOM_6B',
        name: 'The Guilt Factor',
        focus: 'How much does guilt — about their father, about what they\'ve been through, about not being enough — erode her ability to hold limits?',
      },
      {
        id: 'MOM_6C',
        name: 'Independence-Serving Limits',
        focus: 'Are her limits designed to help them become more capable — or to protect herself, or to avoid conflict?',
      },
      {
        id: 'MOM_6D',
        name: 'Mother vs. Friend Line',
        focus: 'Has she maintained the distinction between being their mother and being their friend — and does she know when she\'s crossed it?',
      },
    ],
    scoringCategories: [
      'Limit Clarity Score',
      'Guilt Resistance Score',
      'Independence-Serving Score',
      'Role Clarity Score',
    ],
    redFlagThemes: [
      'She regularly overrides her own limits because of what her sons have been through',
      'Her sons know they can outlast her limits by pushing back or expressing distress',
      'She has become a friend rather than a parent to one or both sons in certain domains',
      'She cannot distinguish between a limit that serves them and a limit that serves her comfort',
    ],
  },

  // ============================================================
  // SECTION 7: Enabling vs. Empowering
  // ============================================================
  section7: {
    id: 'MOM_S7',
    title: "Enabling vs. Empowering",
    purpose: "Identify whether her support practices build her sons\' capacity and independence — or protect them from consequences they need to experience to grow.",
    whatItMeasures: [
      "How often she steps in to remove obstacles her sons should navigate themselves",
      "Whether she completes tasks or solves problems they are capable of handling",
      "How she responds when a son is about to experience a natural consequence",
      "Whether her help creates more capacity in them — or creates dependence on her",
      "The line between compassionate support and soft rescue",
      "How differently she enables or empowers Mekhi vs. Melvin",
    ],
    subsections: [
      {
        id: 'MOM_7A',
        name: 'Problem-Solving Patterns',
        focus: 'When a son has a problem — does she help him solve it, solve it for him, or stand back and let him work through it?',
      },
      {
        id: 'MOM_7B',
        name: 'Consequence Interception',
        focus: 'How often does she intercept natural consequences — by excusing, intervening, or compensating — versus allowing them to land?',
      },
      {
        id: 'MOM_7C',
        name: 'Differentiated Support',
        focus: 'Does she support Mekhi and Melvin differently based on what each actually needs — or does she apply the same approach to both?',
      },
      {
        id: 'MOM_7D',
        name: 'Long-Term vs. Short-Term Help',
        focus: 'Is her help optimizing for their immediate comfort or their long-term capability? Does she know the difference in the moment?',
      },
    ],
    scoringCategories: [
      'Autonomy-Supporting Score',
      'Consequence Allowance Score',
      'Differentiation Score',
      'Long-term Orientation Score',
    ],
    redFlagThemes: [
      'She regularly solves problems her sons should be solving themselves',
      'She intercepts natural consequences because the pain of watching them is too great',
      'She applies the same level of intervention to both sons regardless of their different needs',
      'Her help feels like care in the moment but is creating the dependency she fears',
    ],
  },

  // ============================================================
  // SECTION 8: Consistency
  // ============================================================
  section8: {
    id: 'MOM_S8',
    title: "Consistency",
    purpose: "Evaluate whether her parenting is predictable and reliable — or whether it shifts based on her stress level, mood, or what she senses the son needs in the moment.",
    whatItMeasures: [
      "Whether her expectations are consistent week to week and month to month",
      "How much her emotional state drives changes in how she parents on a given day",
      "Whether her sons can predict how she will respond — or whether her variability creates anxiety and strategic behavior in them",
      "Her consistency between what she says she will do and what she actually does",
      "Whether she is consistent across both sons or visibly different with each",
    ],
    subsections: [
      {
        id: 'MOM_8A',
        name: 'Expectation Consistency',
        focus: 'Are the rules, expectations, and standards the same this month as they were last month — or do they shift without explanation?',
      },
      {
        id: 'MOM_8B',
        name: 'Mood-Driven Parenting',
        focus: 'How much does her own stress, exhaustion, or emotional state change how she parents on a given day?',
      },
      {
        id: 'MOM_8C',
        name: 'Word to Action Consistency',
        focus: 'When she says she will do something — follow up, enforce a consequence, have a conversation — does she do it?',
      },
      {
        id: 'MOM_8D',
        name: 'Cross-Son Consistency',
        focus: 'Are her standards visibly different between Mekhi and Melvin in ways that one or both sons notice and respond to?',
      },
    ],
    scoringCategories: [
      'Structural Consistency Score',
      'Emotional Stability Score',
      'Word-Action Alignment Score',
      'Fairness Perception Score',
    ],
    redFlagThemes: [
      'Her sons have learned to approach her at specific times based on her mood — they are managing her',
      'Consequences and expectations frequently shift, which has trained her sons not to take initial responses seriously',
      'She follows through on positive commitments but not on accountability-related commitments',
      'One son receives visibly more flexibility than the other in ways neither fully understands',
    ],
  },

  // ============================================================
  // SECTION 9: Hard Conversations
  // ============================================================
  section9: {
    id: 'MOM_S9',
    title: "Hard Conversations",
    purpose: "Assess her ability and willingness to have the conversations her sons need — even when those conversations are uncomfortable, risky, or unresolved.",
    whatItMeasures: [
      "Her history with hard conversations — does she initiate them or wait for situations to force them",
      "What topics she avoids with each son and why",
      "How she prepares for hard conversations — or whether she goes in without preparation",
      "How she handles it when a hard conversation doesn\'t go well",
      "Whether she can hold a hard conversation to completion or lets it dissolve when it gets emotional",
      "Specific conversations she knows she needs to have and hasn\'t",
    ],
    subsections: [
      {
        id: 'MOM_9A',
        name: 'Conversation Initiation',
        focus: 'Does she initiate hard conversations proactively — or does she wait until a situation forces the conversation?',
      },
      {
        id: 'MOM_9B',
        name: 'Avoidance Patterns',
        focus: 'What topics does she consistently avoid with each son — and what is the real reason she avoids them?',
      },
      {
        id: 'MOM_9C',
        name: 'Conversation Completion',
        focus: 'When a hard conversation gets emotional or a son shuts down — can she hold the conversation open, or does she let it dissolve?',
      },
      {
        id: 'MOM_9D',
        name: 'Unfinished Business',
        focus: 'What conversations does she know she needs to have with Mekhi or Melvin that she has not had? What is stopping her?',
      },
    ],
    scoringCategories: [
      'Initiation Score',
      'Avoidance Risk Score',
      'Completion Score',
      'Unfinished Business Score',
    ],
    redFlagThemes: [
      'She has a pattern of starting hard conversations and backing off when they get uncomfortable',
      'There are topics she has never discussed with her sons despite their clear relevance (their father, addiction, money, their futures)',
      'She waits for crises to force conversations that should have been preventive',
      'She has unfinished conversations with both sons that have been open for more than six months',
    ],
  },

  // ============================================================
  // SECTION 10: Conflict Patterns
  // ============================================================
  section10: {
    id: 'MOM_S10',
    title: "Conflict Patterns",
    purpose: "Identify how conflict with each son is triggered, handled, and resolved — and whether her conflict patterns are building or eroding the relationship.",
    whatItMeasures: [
      "What triggers conflict with each son and how predictable those triggers are",
      "Her default conflict behavior — escalation, withdrawal, over-explaining, shutdown",
      "Whether conflict with her sons gets resolved or left in a state of mutual withdrawal",
      "How long conflict affects the relationship — and who typically re-opens the connection",
      "Whether her sons experience conflict with her as safe and productive or as something to avoid",
      "Her ability to repair after a conflict without minimizing what happened",
    ],
    subsections: [
      {
        id: 'MOM_10A',
        name: 'Conflict Triggers',
        focus: 'What specifically triggers conflict with each son — and does she see the pattern or is she surprised each time?',
      },
      {
        id: 'MOM_10B',
        name: 'Her Conflict Behavior',
        focus: 'What does she actually do when conflict with a son escalates — and does that behavior de-escalate or intensify?',
      },
      {
        id: 'MOM_10C',
        name: 'Resolution Patterns',
        focus: 'How do conflicts with each son typically resolve — and is the resolution real or just a return to surface calm?',
      },
      {
        id: 'MOM_10D',
        name: 'Repair Quality',
        focus: 'After a conflict — does she repair the relationship in a way that strengthens it, or does she move past it without addressing the damage?',
      },
    ],
    scoringCategories: [
      'Trigger Awareness Score',
      'De-escalation Score',
      'Resolution Quality Score',
      'Repair Score',
    ],
    redFlagThemes: [
      'Conflicts with her sons frequently end in mutual withdrawal with no real resolution',
      'She escalates rather than de-escalates when a son becomes defensive or shut down',
      'Repair after conflict is surface-level — things go back to normal without examining what happened',
      'Conflict with one son is significantly more frequent or more damaging than with the other',
    ],
  },

  // ============================================================
  // SECTION 11: Support Under Pressure
  // ============================================================
  section11: {
    id: 'MOM_S11',
    title: "Support Under Pressure",
    purpose: "Assess how her parenting holds up when she is under personal stress — financial, emotional, relational — and whether her sons bear the weight of her stress.",
    whatItMeasures: [
      "Whether her parenting quality is consistent regardless of her personal circumstances",
      "How she manages her own grief, financial stress, isolation, and exhaustion in relation to her sons",
      "Whether her sons adapt their behavior to manage her emotional state — and whether she knows this",
      "How she asks for and receives support for herself",
      "Whether she has the personal infrastructure (support system, outlets, processing) to sustain her parenting long-term",
    ],
    subsections: [
      {
        id: 'MOM_11A',
        name: 'Stress Spillover',
        focus: 'When she is under significant personal stress — does it visibly change how she shows up for her sons, and does she know it?',
      },
      {
        id: 'MOM_11B',
        name: 'Sons Managing Her',
        focus: 'Have her sons developed patterns of managing her emotional state — walking on eggshells, withholding information, or performing for her comfort?',
      },
      {
        id: 'MOM_11C',
        name: 'Her Own Support System',
        focus: 'Does she have people and practices that support her — separate from her sons — so she\'s not parenting from empty?',
      },
      {
        id: 'MOM_11D',
        name: 'Grief and Loss Processing',
        focus: 'How has she processed the loss of her sons\' father — and is that processing ongoing and separate from her parenting, or is it bleeding into both?',
      },
    ],
    scoringCategories: [
      'Stress Containment Score',
      'Emotional Burden Transfer Score',
      'Personal Support Score',
      'Grief Processing Score',
    ],
    redFlagThemes: [
      'Her sons are managing her emotional state more than she is managing theirs',
      'She does not have a functional support system outside of her sons',
      'Her grief is unprocessed or actively interfering with her ability to parent forward',
      'She parents differently — more reactively, more permissively, or more harshly — depending on her personal stress level',
    ],
  },

  // ============================================================
  // SECTION 12: Growth as a Mother & Monthly Action Planning
  // ============================================================
  section12: {
    id: 'MOM_S12',
    title: "Growth as a Mother & Monthly Action Planning",
    purpose: "Close the assessment by identifying what she recognizes about her own parenting growth, what she wants to change, and translate all findings into a concrete, personalized monthly plan.",
    whatItMeasures: [
      "Her self-awareness about her own parenting patterns — honest, not performative",
      "What she has already changed or tried to change in her parenting",
      "What she believes is her single biggest blind spot as a parent",
      "What she most wants to be able to say is true of her relationship with each son in 12 months",
      "Her readiness to take specific action on the findings from this assessment",
    ],
    subsections: [
      {
        id: 'MOM_12A',
        name: 'Parenting Self-Assessment',
        focus: 'What does she honestly believe she is doing well and what does she know needs work — without a prompt?',
      },
      {
        id: 'MOM_12B',
        name: 'What She Wants to Change',
        focus: 'If she could change one pattern in how she parents each son — what would it be and why hasn\'t she changed it yet?',
      },
      {
        id: 'MOM_12C',
        name: '12-Month Relationship Vision',
        focus: 'What does she want her relationship with Mekhi and with Melvin to look like in 12 months — specifically?',
      },
      {
        id: 'MOM_12D',
        name: 'Monthly Action Planning',
        focus: 'Convert the full assessment into specific, manageable monthly actions — what to do, with whom, by when.',
      },
    ],
    scoringCategories: [
      'Self-Awareness Score',
      'Change Readiness Score',
      'Vision Clarity Score',
    ],
    redFlagThemes: [
      'She cannot name her own blind spot — suggests assessment engagement is surface-level',
      'What she wants to change is other people\'s behavior, not her own — external locus of change',
      'Her 12-month vision for the relationship is vague or dependent on the sons changing, not her',
      'She exits the assessment with good feelings but no concrete actions',
    ],
  },

  // ============================================================
  // OUTPUT CATEGORIES FOR MOM'S RESULTS
  // ============================================================
  outputCategories: {

    scores: {
      relationshipScores: {
        mekhiRelationshipScore: 'X/10 — quality, accuracy, and safety of relationship with Mekhi',
        melvinRelationshipScore: 'X/10 — quality, accuracy, and safety of relationship with Melvin',
      },
      parentingStyleScores: {
        communicationScore: 'X/10',
        emotionalSupportScore: 'X/10',
        accountabilityScore: 'X/10',
        boundaryScore: 'X/10',
        consistencyScore: 'X/10',
      },
      riskScores: {
        enablingRisk: 'X/10 — higher = more enabling patterns present',
        stressSpilloverRisk: 'X/10 — higher = more personal stress leaking into parenting',
        conflictDamageRisk: 'X/10 — higher = conflict patterns are more damaging than constructive',
        blindSpotRisk: 'X/10 — higher = more unidentified patterns that undermine her goals',
      },
    },

    narrativeOutputs: {
      strengthsSection: {
        label: 'What You Are Doing Right',
        description: '3–5 specific genuine strengths from her assessment — tied to evidence, not generic praise',
      },
      patternsToAddressSection: {
        label: 'Patterns to Address',
        description: '3–5 specific patterns that are undermining her goals with one or both sons — named directly without shame',
      },
      mekhiInsightSection: {
        label: 'What Mekhi Needs From You Right Now',
        description: 'Specific, actionable guidance on how to show up for Mekhi given his current profile and their relationship patterns',
      },
      melvinInsightSection: {
        label: 'What Melvin Needs From You Right Now',
        description: 'Specific, actionable guidance on how to show up for Melvin given his Morehouse transition, post-basketball state, and their relationship dynamics',
      },
      hardConversationsSection: {
        label: 'Conversations You Need to Have',
        description: 'Named list of specific conversations she should have with each son — with suggested framing and timing',
      },
      blindSpotSection: {
        label: 'Your Biggest Blind Spot',
        description: 'One clear, specific pattern she is not currently seeing that is affecting her sons\' trajectory',
      },
    },

    monthlyActionPlan: {
      label: 'Your 30-Day Action Plan',
      structure: {
        week1: {
          focus: 'Awareness — observe without changing; notice patterns she identified in the assessment',
          mekhiAction: 'One specific action with Mekhi this week',
          melvinAction: 'One specific action with Melvin this week',
          selfAction: 'One action for her own support or processing',
        },
        week2: {
          focus: 'One conversation — have the highest-priority conversation identified in Section 9',
          mekhiAction: 'Specific conversation or check-in with Mekhi',
          melvinAction: 'Specific conversation or check-in with Melvin',
          selfAction: 'One boundary or limit to establish or reinforce',
        },
        week3: {
          focus: 'Shift one pattern — pick the single most impactful pattern to change and practice it',
          mekhiAction: 'Specific behavior change in how she shows up for Mekhi',
          melvinAction: 'Specific behavior change in how she shows up for Melvin',
          selfAction: 'One support structure to activate or strengthen for herself',
        },
        week4: {
          focus: 'Review and reset — what worked, what didn\'t, what carries into next month',
          mekhiAction: 'One thing she noticed or learned about Mekhi this month',
          melvinAction: 'One thing she noticed or learned about Melvin this month',
          selfAction: 'Assessment of her own growth this month — honest, specific',
        },
      },
      nextMonthFocus: 'One theme to build on in month 2 based on month 1 outcomes',
    },

    agentOutputTriggers: {
      description: 'Conditions that trigger specific outputs in momAgent.js',
      triggers: [
        { condition: 'High enabling risk + low consequence consistency', output: 'Enabling Alert — specific reframe and action plan' },
        { condition: 'High stress spillover + no personal support system', output: 'Sustainability Warning — self-care urgency and resource list' },
        { condition: 'Unfinished conversations identified in Section 9', output: 'Conversation Guide — specific scripts and framing for each named conversation' },
        { condition: 'Melvin post-basketball behavioral shift unaddressed', output: 'Melvin Transition Alert — immediate action guidance' },
        { condition: 'Mekhi shutdown pattern linked to her communication style', output: 'Communication Recalibration — specific script changes for Mekhi interactions' },
        { condition: 'Grief unprocessed or bleeding into parenting', output: 'Support Urgency — external resource recommendation' },
        { condition: 'Sons managing her emotional state', output: 'Role Reversal Flag — specific steps to restore appropriate dynamic' },
      ],
    },
  },

  // ============================================================
  // SECTION SEQUENCE & FLOW
  // ============================================================
  assessmentFlow: {
    estimatedTime: '35–50 minutes',
    questionFormat: 'Mix of Likert (1–5), slider (1–10), scenario (4 options), open (free text)',
    order: [
      'MOM_S1 — Relationship with Mekhi',
      'MOM_S2 — Relationship with Melvin',
      'MOM_S3 — Communication Style',
      'MOM_S4 — Emotional Support Style',
      'MOM_S5 — Accountability Style',
      'MOM_S6 — Boundaries',
      'MOM_S7 — Enabling vs. Empowering',
      'MOM_S8 — Consistency',
      'MOM_S9 — Hard Conversations',
      'MOM_S10 — Conflict Patterns',
      'MOM_S11 — Support Under Pressure',
      'MOM_S12 — Growth & Monthly Action Planning',
    ],
    scoringEngine: 'momAgent.js processes all section scores, generates dual-son insights, named conversation list, blind spot identification, and 30-day action plan',
    dashboardFeed: 'Outputs feed Mom Dashboard component with son-specific panels and monthly planning module',
  },
};
