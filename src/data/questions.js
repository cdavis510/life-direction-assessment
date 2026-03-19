// ─── MEKHI-SPECIFIC SECTION IMPORTS (500-question bank) ──────────────────────
import { MEKHI_SECTION_1 }  from './mekhiSection1.js';
import { MEKHI_SECTION_2 }  from './mekhiSection2.js';
import { MEKHI_SECTION_3 }  from './mekhiSection3.js';
import { MEKHI_SECTION_4 }  from './mekhiSection4.js';
import { MEKHI_SECTION_5 }  from './mekhiSection5.js';
import { MEKHI_SECTION_6 }  from './mekhiSection6.js';
import { MEKHI_SECTION_7 }  from './mekhiSection7.js';
import { MEKHI_SECTION_8 }  from './mekhiSection8.js';
import { MEKHI_SECTION_9 }  from './mekhiSection9.js';
import { MEKHI_SECTION_10 } from './mekhiSection10.js';

// Wrap Mekhi raw arrays in section objects
const MK1  = { id: 'mekhi_section1',  title: 'Self-Awareness & Current Reality',       questions: MEKHI_SECTION_1  };
const MK2  = { id: 'mekhi_section2',  title: 'Ownership & Accountability',              questions: MEKHI_SECTION_2  };
const MK3  = { id: 'mekhi_section3',  title: 'Habits & Consistency',                    questions: MEKHI_SECTION_3  };
const MK4  = { id: 'mekhi_section4',  title: 'Time, Focus & Follow-Through',            questions: MEKHI_SECTION_4  };
const MK5  = { id: 'mekhi_section5',  title: 'Academic Recovery & Learning Behaviors',  questions: MEKHI_SECTION_5  };
const MK6  = { id: 'mekhi_section6',  title: 'Emotional Regulation & Stress',           questions: MEKHI_SECTION_6  };
const MK7  = { id: 'mekhi_section7',  title: 'Support, Communication & Boundaries',     questions: MEKHI_SECTION_7  };
const MK8  = { id: 'mekhi_section8',  title: 'Resilience & Change Readiness',           questions: MEKHI_SECTION_8  };
const MK9  = { id: 'mekhi_section9',  title: 'Future Vision, Purpose & Motivation',     questions: MEKHI_SECTION_9  };
const MK10 = { id: 'mekhi_section10', title: 'Integrity, Honesty & Contradiction Checks', questions: MEKHI_SECTION_10 };

// ─── MELVIN-SPECIFIC SECTION IMPORTS ─────────────────────────────────────────
import { MELVIN_SECTION_1 } from './melvinQuestions.js';
import { MELVIN_SECTION_2 } from './melvinSection2.js';
import { MELVIN_SECTION_3 } from './melvinSection3.js';
import { MELVIN_SECTION_4 } from './melvinSection4.js';
import { MELVIN_SECTION_5 } from './melvinSection5.js';
import { MELVIN_SECTION_6 } from './melvinSection6.js';
import { MELVIN_SECTION_7 } from './melvinSection7.js';
import { MELVIN_SECTION_8 } from './melvinSection8.js';
import { MELVIN_SECTION_9 } from './melvinSection9.js';
import { MELVIN_SECTION_10 } from './melvinSection10.js';
import { MELVIN_SECTION_11 } from './melvinSection11.js';

// Sections 7–11 export raw question arrays — wrap them in section objects
const MS7 = { id: 'melvin_section7',  title: 'Communication & Self-Advocacy', questions: MELVIN_SECTION_7 };
const MS8 = { id: 'melvin_section8',  title: 'Social Judgment & Environment',  questions: MELVIN_SECTION_8 };
const MS9 = { id: 'melvin_section9',  title: 'College Readiness & Independence', questions: MELVIN_SECTION_9 };
const MS10 = { id: 'melvin_section10', title: 'Career Alignment',               questions: MELVIN_SECTION_10 };
const MS11 = { id: 'melvin_section11', title: 'Life Vision & Blueprint',         questions: MELVIN_SECTION_11 };

// ─── SHARED QUESTIONS (used by both Mekhi and Melvin) ───────────────────────

export const SECTION_1 = {
  id: 'section1',
  title: 'Foundation: Self Awareness',
  subtitle: 'Identity, Confidence & Emotional Regulation',
  subsections: ['Identity & Values', 'Confidence & Self-Belief', 'Emotional Regulation'],
  questions: [
    // 1A — Identity & Values
    {
      id: 's1_01', subsection: '1A', type: 'text',
      text: 'Who are you beyond school and your career goals? Describe yourself — not your resume, but who you actually are as a person.',
    },
    {
      id: 's1_02', subsection: '1A', type: 'text',
      text: 'What do you value most in life right now? List the top 3 things that matter to you more than anything else.',
    },
    {
      id: 's1_03', subsection: '1A', type: 'text',
      text: 'What kind of person do you want to be known as in 10 years? Not what career you want — what kind of human.',
    },
    {
      id: 's1_04', subsection: '1A', type: 'text',
      text: 'When do you feel most like yourself — most alive, most natural, most at ease? Describe that situation.',
    },
    {
      id: 's1_05', subsection: '1A', type: 'text',
      text: 'If you had to describe yourself honestly in 3 words — not the version you show the world, but the real you — what would those words be?',
    },
    {
      id: 's1_06', subsection: '1A', type: 'multiple',
      text: 'When you think about your future, which feeling comes up most?',
      options: ['Excited and motivated', 'Anxious and uncertain', 'Hopeful but unsure', 'Disconnected — I try not to think about it'],
    },
    {
      id: 's1_07', subsection: '1A', type: 'text',
      text: 'What is something you believe about yourself that most people who know you probably don\'t know?',
    },
    {
      id: 's1_08', subsection: '1A', type: 'multiple',
      text: 'Which of these best describes how you see yourself right now?',
      options: ['I know who I am and where I\'m going', 'I have a general idea but I\'m still figuring it out', 'I\'m confused about who I am most of the time', 'I\'ve never really thought deeply about this'],
    },
    {
      id: 's1_09', subsection: '1A', type: 'text',
      text: 'What is one thing you wish more people understood about you?',
    },
    {
      id: 's1_10', subsection: '1A', type: 'text',
      text: 'Describe a moment in your life — big or small — where you felt genuinely proud of yourself.',
    },
    {
      id: 's1_11', subsection: '1A', type: 'multiple',
      text: 'Which of these statements feels most true to you right now?',
      options: ['I have a clear sense of purpose', 'I have goals but lack direction', 'I have direction but lack goals', 'I feel lost right now'],
    },
    {
      id: 's1_12', subsection: '1A', type: 'text',
      text: 'What is one thing you believe about life that most people your age don\'t seem to understand yet?',
    },
    {
      id: 's1_13', subsection: '1A', type: 'text',
      text: 'If money wasn\'t a factor, how would you spend your time every day? Be specific.',
    },
    {
      id: 's1_14', subsection: '1A', type: 'multiple',
      text: 'How do you feel about who you are right now?',
      options: ['I like who I am and I\'m growing', 'I\'m okay with myself most days', 'I often don\'t like who I am', 'I feel disconnected from who I want to be'],
    },
    {
      id: 's1_15', subsection: '1A', type: 'text',
      text: 'What is one value you hold that you would never compromise on, no matter what?',
    },
    {
      id: 's1_16', subsection: '1A', type: 'text',
      text: 'When you imagine the best version of yourself — who is that person? What do they do differently than you do right now?',
    },
    {
      id: 's1_17', subsection: '1A', type: 'multiple',
      text: 'How often do your actions match your values?',
      options: ['Almost always', 'Most of the time', 'Sometimes', 'Rarely — there\'s usually a gap'],
    },
    {
      id: 's1_18', subsection: '1A', type: 'text',
      text: 'What part of your identity are you still trying to figure out?',
    },
    {
      id: 's1_19', subsection: '1A', type: 'text',
      text: 'What has shaped who you are more than anything else — an experience, a person, or a moment?',
    },
    {
      id: 's1_20', subsection: '1A', type: 'multiple',
      text: 'When it comes to fitting in vs. standing out, which do you tend to prioritize?',
      options: ['I prioritize fitting in — it feels safer', 'I try to stand out and be myself', 'It depends on the situation', 'I haven\'t thought much about this'],
    },

    // 1B — Confidence & Self-Belief
    {
      id: 's1_21', subsection: '1B', type: 'slider',
      text: 'On a scale of 1–10, how much do you genuinely believe in your own ability to succeed in the life you want?',
      min: 1, max: 10,
    },
    {
      id: 's1_22', subsection: '1B', type: 'text',
      text: 'That number you just gave — what is the main thing holding it back from being a 10?',
    },
    {
      id: 's1_23', subsection: '1B', type: 'multiple',
      text: 'When something gets hard — school, a goal, a relationship — what do you usually do?',
      options: ['Push through it no matter what', 'Take a break and come back to it', 'Ask someone for help', 'Avoid it and hope it goes away'],
    },
    {
      id: 's1_24', subsection: '1B', type: 'slider',
      text: 'How much do you believe you deserve good things to happen to you — success, love, opportunity?',
      min: 1, max: 10,
    },
    {
      id: 's1_25', subsection: '1B', type: 'text',
      text: 'What is one thing about yourself you are proud of, even if no one else knows about it or gives you credit for it?',
    },
    {
      id: 's1_26', subsection: '1B', type: 'multiple',
      text: 'When someone criticizes you, how do you usually respond — inside, not just on the surface?',
      options: ['I take it in and reflect honestly', 'I get defensive and push back mentally', 'I shut down and pull away', 'I agree with them even when I shouldn\'t'],
    },
    {
      id: 's1_27', subsection: '1B', type: 'text',
      text: 'Describe a time when you surprised yourself — when you did something better than you thought you could.',
    },
    {
      id: 's1_28', subsection: '1B', type: 'multiple',
      text: 'How often do you compare yourself to others?',
      options: ['Almost never — I focus on my own path', 'Sometimes — it motivates me', 'Often — and it usually makes me feel worse', 'Constantly — I can\'t help it'],
    },
    {
      id: 's1_29', subsection: '1B', type: 'text',
      text: 'What is one compliment someone has given you that you had a hard time believing?',
    },
    {
      id: 's1_30', subsection: '1B', type: 'slider',
      text: 'How confident are you in social situations — meeting new people, speaking up, or being in groups?',
      min: 1, max: 10,
    },
    {
      id: 's1_31', subsection: '1B', type: 'text',
      text: 'What is one thing you avoid doing because you\'re afraid you\'ll fail or look bad?',
    },
    {
      id: 's1_32', subsection: '1B', type: 'multiple',
      text: 'When you set a goal and don\'t reach it, what do you usually tell yourself?',
      options: ['I need to try a different approach', 'I\'m just not cut out for this', 'I\'ll do better next time', 'I stop thinking about it — I move on'],
    },
    {
      id: 's1_33', subsection: '1B', type: 'text',
      text: 'If confidence wasn\'t a barrier for you — if you truly believed in yourself — what would you do differently right now?',
    },
    {
      id: 's1_34', subsection: '1B', type: 'slider',
      text: 'How much do you trust your own judgment when making important decisions?',
      min: 1, max: 10,
    },
    {
      id: 's1_35', subsection: '1B', type: 'text',
      text: 'What would it take for you to feel genuinely confident — not just on the outside, but on the inside?',
    },

    // 1C — Emotional Regulation
    {
      id: 's1_36', subsection: '1C', type: 'text',
      text: 'How do you honestly handle stress? Walk me through what actually happens — in your body and your behavior.',
    },
    {
      id: 's1_37', subsection: '1C', type: 'multiple',
      text: 'When you\'re overwhelmed, what do you typically do?',
      options: ['Shut down — I go quiet and withdraw', 'Act out — I get irritable or reactive', 'Talk to someone I trust', 'Push through and pretend I\'m fine'],
    },
    {
      id: 's1_38', subsection: '1C', type: 'text',
      text: 'What emotion do you feel most often that you wish you felt less of? Don\'t overthink it — just name it.',
    },
    {
      id: 's1_39', subsection: '1C', type: 'multiple',
      text: 'Have you ever avoided something important — a class, a conversation, a responsibility — because it made you anxious or uncomfortable?',
      options: ['Yes, this happens a lot', 'Yes, occasionally', 'Rarely', 'No, I push through anxiety'],
    },
    {
      id: 's1_40', subsection: '1C', type: 'slider',
      text: 'On a scale of 1–10, how well do you manage your emotions day to day — staying regulated, not spiraling?',
      min: 1, max: 10,
    },
    {
      id: 's1_41', subsection: '1C', type: 'text',
      text: 'When something bad happens — a disappointment, a failure, a conflict — how long does it typically take you to recover emotionally?',
    },
    {
      id: 's1_42', subsection: '1C', type: 'multiple',
      text: 'What do you do when you\'re in a really bad headspace?',
      options: ['I reach out to someone', 'I isolate until I feel better', 'I distract myself with phone, games, or TV', 'I try to work through it myself'],
    },
    {
      id: 's1_43', subsection: '1C', type: 'text',
      text: 'Have you ever felt like your emotions were controlling you instead of the other way around? Describe what that looks like for you.',
    },
    {
      id: 's1_44', subsection: '1C', type: 'slider',
      text: 'How often do you feel genuinely okay — not just managing, but actually okay?',
      min: 1, max: 10,
    },
    {
      id: 's1_45', subsection: '1C', type: 'text',
      text: 'What helps you the most when you\'re struggling emotionally? What actually works — not what you think should work?',
    },
    {
      id: 's1_46', subsection: '1C', type: 'multiple',
      text: 'How do you feel most mornings when you wake up?',
      options: ['Motivated and ready', 'Okay — neutral', 'Heavy and unmotivated', 'Anxious about the day ahead'],
    },
    {
      id: 's1_47', subsection: '1C', type: 'text',
      text: 'Is there something emotional you\'ve been carrying for a long time that you haven\'t fully dealt with?',
    },
    {
      id: 's1_48', subsection: '1C', type: 'multiple',
      text: 'When you\'re feeling low, how likely are you to reach out to someone?',
      options: ['Very likely — I have people I trust', 'Somewhat likely — if it gets bad enough', 'Unlikely — I handle it alone', 'Never — I don\'t want to be a burden'],
    },
    {
      id: 's1_49', subsection: '1C', type: 'text',
      text: 'What is one coping strategy you use that you know isn\'t actually helping you — but you keep doing it anyway?',
    },
    {
      id: 's1_50', subsection: '1C', type: 'text',
      text: 'If you could change one thing about how you handle your emotions, what would it be?',
    },
    {
      id: 's1_51', subsection: '1C', type: 'slider',
      text: 'How often do you feel genuine hope about your future?',
      min: 1, max: 10,
    },
    {
      id: 's1_52', subsection: '1C', type: 'multiple',
      text: 'When a difficult emotion hits — sadness, fear, anger — how long does it usually take before you deal with it?',
      options: ['Right away — I face it', 'A few hours or a day', 'Days or weeks', 'I usually never fully deal with it'],
    },
    {
      id: 's1_53', subsection: '1C', type: 'text',
      text: 'What is something that brings you genuine joy — even on a hard day?',
    },
    {
      id: 's1_54', subsection: '1C', type: 'text',
      text: 'On your hardest days, what keeps you going?',
    },
    {
      id: 's1_55', subsection: '1C', type: 'multiple',
      text: 'How do you feel about asking for mental health support — therapy, counseling, or similar?',
      options: ['I\'m open to it and have used it', 'I\'m open to it but haven\'t tried it', 'I\'m unsure — it feels uncomfortable', 'I don\'t think I need it'],
    },
    {
      id: 's1_56', subsection: '1C', type: 'text',
      text: 'What does "taking care of yourself" actually mean to you — not the Instagram version, but what it genuinely looks like in your life?',
    },
    {
      id: 's1_57', subsection: '1C', type: 'slider',
      text: 'How connected do you feel to other people in your life right now — like you truly belong somewhere?',
      min: 1, max: 10,
    },
    {
      id: 's1_58', subsection: '1C', type: 'text',
      text: 'Is there a version of you that you\'re afraid might be true — a fear about who you might be? You don\'t have to share it if it\'s too personal, but if you\'re willing, it\'s worth naming.',
    },
    {
      id: 's1_59', subsection: '1C', type: 'multiple',
      text: 'How often do you feel genuinely understood by the people around you?',
      options: ['Often — I have people who get me', 'Sometimes', 'Rarely', 'Almost never — I feel misunderstood most of the time'],
    },
    {
      id: 's1_60', subsection: '1C', type: 'text',
      text: 'If you could say one thing to yourself that you wish someone had told you earlier in life, what would it be?',
    },
  ],
};

export const SECTION_2 = {
  id: 'section2',
  title: 'Vision: Future Direction',
  subtitle: 'Life Vision, Career Exploration & Financial Goals',
  subsections: ['Life Vision', 'Career Exploration', 'Lifestyle & Financial Goals'],
  questions: [
    // 2A — Life Vision
    {
      id: 's2_01', subsection: '2A', type: 'text',
      text: 'Where do you see yourself living at age 30? What does that environment look like — city, lifestyle, energy?',
    },
    {
      id: 's2_02', subsection: '2A', type: 'text',
      text: 'Describe your ideal day at age 30 — not just work, but everything. Morning to night. Be specific.',
    },
    {
      id: 's2_03', subsection: '2A', type: 'multiple',
      text: 'What income range do you want to be earning by age 25?',
      options: ['$40,000–$60,000/year', '$60,000–$100,000/year', '$100,000–$150,000/year', '$150,000+/year'],
    },
    {
      id: 's2_04', subsection: '2A', type: 'multiple',
      text: 'What income range do you want to be earning by age 30?',
      options: ['$60,000–$100,000/year', '$100,000–$150,000/year', '$150,000–$250,000/year', '$250,000+/year'],
    },
    {
      id: 's2_05', subsection: '2A', type: 'text',
      text: 'What do you want people to say about you at your funeral — not your accomplishments, but who you were as a person?',
    },
    {
      id: 's2_06', subsection: '2A', type: 'text',
      text: 'What does "success" look like to you specifically — not in general terms, but what your version of success actually is?',
    },
    {
      id: 's2_07', subsection: '2A', type: 'multiple',
      text: 'Which of these matters most to you in your future life?',
      options: ['Financial security and stability', 'Fame, recognition, and influence', 'Doing work that feels meaningful', 'Freedom and flexibility to live how I want'],
    },
    {
      id: 's2_08', subsection: '2A', type: 'text',
      text: 'What would your life look like if everything went exactly right? Paint that picture.',
    },
    {
      id: 's2_09', subsection: '2A', type: 'multiple',
      text: 'How important is it to you to be able to help your family financially one day?',
      options: ['It\'s one of my biggest motivators', 'Important but not my primary driver', 'Somewhat important', 'Not a major factor for me'],
    },
    {
      id: 's2_10', subsection: '2A', type: 'text',
      text: 'What is one dream you\'ve had for your life that you\'ve never told anyone about?',
    },
    {
      id: 's2_11', subsection: '2A', type: 'slider',
      text: 'How clear is your vision of the future you want — on a scale of 1 (completely foggy) to 10 (crystal clear)?',
      min: 1, max: 10,
    },
    {
      id: 's2_12', subsection: '2A', type: 'text',
      text: 'If you could design your life with no limitations — money, location, education — what would it look like?',
    },

    // 2B — Career Exploration
    {
      id: 's2_13', subsection: '2B', type: 'text',
      text: 'What careers have you thought about — even ones you quickly dismissed or thought were unrealistic? List all of them.',
    },
    {
      id: 's2_14', subsection: '2B', type: 'text',
      text: 'What would you do every day, even if you were never paid for it? This is often a clue to your real calling.',
    },
    {
      id: 's2_15', subsection: '2B', type: 'multiple',
      text: 'In your ideal career, where would you rather be?',
      options: ['In front of people — visible, public-facing', 'Behind the scenes — making things work', 'Both — I want to do both', 'I\'m not sure yet'],
    },
    {
      id: 's2_16', subsection: '2B', type: 'slider',
      text: 'How important is status, recognition, and being known for what you do — in your career?',
      min: 1, max: 10,
    },
    {
      id: 's2_17', subsection: '2B', type: 'multiple',
      text: 'What kind of work environment do you thrive in?',
      options: ['Fast-paced, high energy, always moving', 'Structured and predictable', 'Creative and flexible', 'Independent — I work best alone'],
    },
    {
      id: 's2_18', subsection: '2B', type: 'text',
      text: 'What skills do you have right now — even informal ones — that could be valuable in a career?',
    },
    {
      id: 's2_19', subsection: '2B', type: 'multiple',
      text: 'When it comes to your main career interest, how committed are you to it right now?',
      options: ['100% — this is what I\'m built for', 'Mostly committed but open to pivoting', 'Still exploring — not locked in', 'Honestly not sure anymore'],
    },
    {
      id: 's2_20', subsection: '2B', type: 'text',
      text: 'What is one thing about your dream career that excites you the most — what specifically draws you to it?',
    },
    {
      id: 's2_21', subsection: '2B', type: 'text',
      text: 'Have you done anything — internship, project, job, volunteer work — even loosely related to the career you want? If so, what did you learn?',
    },
    {
      id: 's2_22', subsection: '2B', type: 'multiple',
      text: 'How do you prefer to learn new skills?',
      options: ['Hands-on — doing it myself', 'Watching and observing others', 'Taking courses or reading', 'Trial and error'],
    },
    {
      id: 's2_23', subsection: '2B', type: 'text',
      text: 'Who is someone — famous or not — whose career path you admire? What specifically about their path resonates with you?',
    },
    {
      id: 's2_24', subsection: '2B', type: 'text',
      text: 'What would you do if your primary career goal didn\'t work out? Do you have a backup, or would you figure it out then?',
    },
    {
      id: 's2_25', subsection: '2B', type: 'multiple',
      text: 'Are you willing to start at entry level — low pay, grunt work — to break into the field you want?',
      options: ['Yes — I understand that\'s how it works', 'Yes but I\'d want to move up quickly', 'Probably, but it\'s hard to think about', 'Honestly, that sounds really discouraging'],
    },

    // 2C — Lifestyle & Financial Goals
    {
      id: 's2_26', subsection: '2C', type: 'multiple',
      text: 'Do you want to own your own home one day?',
      options: ['Yes — it\'s a major goal', 'Probably, but it\'s not urgent', 'I\'m not sure', 'Not a priority for me'],
    },
    {
      id: 's2_27', subsection: '2C', type: 'slider',
      text: 'How important is financial independence to you — not depending on anyone else for money?',
      min: 1, max: 10,
    },
    {
      id: 's2_28', subsection: '2C', type: 'text',
      text: 'What does "making it" look like to you personally? Not the general idea — your specific definition.',
    },
    {
      id: 's2_29', subsection: '2C', type: 'multiple',
      text: 'How do you currently manage money when you have it?',
      options: ['I save intentionally and spend carefully', 'I save some and spend some', 'I spend most of it and save what\'s left', 'I usually spend it all'],
    },
    {
      id: 's2_30', subsection: '2C', type: 'text',
      text: 'What kind of lifestyle do you want to live — travel, home environment, experiences? Give me the real picture.',
    },
    {
      id: 's2_31', subsection: '2C', type: 'multiple',
      text: 'How important is work-life balance to you in your future career?',
      options: ['Critical — I want a full life outside work too', 'Important but I\'m willing to grind first', 'I\'ll figure it out once I\'m successful', 'I\'m okay with work being my main thing for now'],
    },
    {
      id: 's2_32', subsection: '2C', type: 'text',
      text: 'Are there any specific things you want to be able to afford or provide for others? What motivates your financial goals most?',
    },
    {
      id: 's2_33', subsection: '2C', type: 'slider',
      text: 'How financially literate do you feel right now — do you understand budgets, credit, investing, taxes?',
      min: 1, max: 10,
    },
    {
      id: 's2_34', subsection: '2C', type: 'text',
      text: 'Have you ever thought about investing, building wealth, or creating multiple income streams? What do you know about it?',
    },
    {
      id: 's2_35', subsection: '2C', type: 'multiple',
      text: 'If you had $5,000 right now with no obligations, what would you do with it?',
      options: ['Invest or save it', 'Split it — some saved, some spent', 'Buy things I want or need', 'Give some to family and keep the rest'],
    },
    {
      id: 's2_36', subsection: '2C', type: 'text',
      text: 'What financial mistakes or patterns have you seen in your family or community that you want to avoid?',
    },
    {
      id: 's2_37', subsection: '2C', type: 'text',
      text: 'What financial habits do you already have or want to build?',
    },
    {
      id: 's2_38', subsection: '2C', type: 'multiple',
      text: 'How much pressure do you feel around money right now?',
      options: ['A lot — it\'s a constant stress', 'Some — it\'s in the back of my mind', 'A little — I\'m mostly okay', 'Not much — it\'s not a current stressor'],
    },
    {
      id: 's2_39', subsection: '2C', type: 'text',
      text: 'What does financial freedom mean to you, in your own words?',
    },
    {
      id: 's2_40', subsection: '2C', type: 'slider',
      text: 'How motivated are you — right now, today — to build the financial future you described?',
      min: 1, max: 10,
    },
  ],
};

export const SECTION_3 = {
  id: 'section3',
  title: 'Reality: Career & Education Path',
  subtitle: 'Career Awareness & Education Pathway',
  subsections: ['Career Reality Awareness', 'Education Pathway'],
  questions: [
    // 3A — Career Reality Awareness
    {
      id: 's3_01', subsection: '3A', type: 'multiple',
      text: 'Do you know what someone in your dream career actually does day to day — not the highlight reel, but the real work?',
      options: ['Yes — I\'ve researched it in depth', 'I have a general idea', 'I know the basics but not the details', 'Honestly, not really'],
    },
    {
      id: 's3_02', subsection: '3A', type: 'multiple',
      text: 'Have you ever looked up the average salary for the career you want?',
      options: ['Yes, and I know the numbers', 'I\'ve looked it up casually', 'Not really', 'No, I haven\'t'],
    },
    {
      id: 's3_03', subsection: '3A', type: 'multiple',
      text: 'Do you personally know anyone who works in the field you want to enter?',
      options: ['Yes — I\'ve talked to them about it', 'I know someone but haven\'t really talked', 'Not personally, but I follow people online', 'No'],
    },
    {
      id: 's3_04', subsection: '3A', type: 'text',
      text: 'What is one thing about your dream career that actually scares you — something you\'re not sure you can handle?',
    },
    {
      id: 's3_05', subsection: '3A', type: 'text',
      text: 'If your first career choice completely didn\'t work out — what would your plan B be? Be honest if you don\'t have one.',
    },
    {
      id: 's3_06', subsection: '3A', type: 'text',
      text: 'What specific skills, certifications, or experiences do you know you\'ll need to break into your career field?',
    },
    {
      id: 's3_07', subsection: '3A', type: 'slider',
      text: 'How realistic do you think your career goals are, given where you are right now?',
      min: 1, max: 10,
    },
    {
      id: 's3_08', subsection: '3A', type: 'multiple',
      text: 'Have you taken any concrete steps toward your career — research, outreach, internships, side projects?',
      options: ['Yes — I\'ve taken several real steps', 'A few small steps', 'Not really', 'No concrete action yet'],
    },
    {
      id: 's3_09', subsection: '3A', type: 'text',
      text: 'What is the most competitive part of the field you want to enter — and what would make you stand out?',
    },
    {
      id: 's3_10', subsection: '3A', type: 'text',
      text: 'Is there a specific company, team, or organization you want to work for? Name it — and what do you know about getting in?',
    },
    {
      id: 's3_11', subsection: '3A', type: 'multiple',
      text: 'How often do you actually work on skills related to your career goal?',
      options: ['Every day or almost every day', 'A few times a week', 'Occasionally', 'Rarely or never'],
    },
    {
      id: 's3_12', subsection: '3A', type: 'text',
      text: 'What would someone who has succeeded in your field tell you to start doing right now?',
    },
    {
      id: 's3_13', subsection: '3A', type: 'slider',
      text: 'How prepared do you actually feel for the career you want right now?',
      min: 1, max: 10,
    },
    {
      id: 's3_14', subsection: '3A', type: 'multiple',
      text: 'Do you have a portfolio, demo reel, project, or anything that showcases your skills or interest in your field?',
      options: ['Yes — I have concrete work to show', 'I\'m building something', 'Not yet but I know I need one', 'I don\'t have anything yet'],
    },
    {
      id: 's3_15', subsection: '3A', type: 'text',
      text: 'What\'s one thing you could start building, creating, or doing this week to move toward your career goal?',
    },

    // 3B — Education Pathway
    {
      id: 's3_16', subsection: '3B', type: 'multiple',
      text: 'Do you believe a college degree is necessary for the career you want?',
      options: ['Yes — it\'s required or highly preferred', 'It helps but isn\'t strictly necessary', 'It\'s about skills, not a degree', 'I\'m not sure'],
    },
    {
      id: 's3_17', subsection: '3B', type: 'multiple',
      text: 'How are you currently performing academically — be honest with yourself?',
      options: ['Strong — I\'m doing well', 'Okay — could be better', 'Struggling — things have slipped', 'Poorly — I\'m not where I need to be'],
    },
    {
      id: 's3_18', subsection: '3B', type: 'text',
      text: 'What subjects or areas of study are you actually good at — where things seem to click for you?',
    },
    {
      id: 's3_19', subsection: '3B', type: 'text',
      text: 'What would make school feel worth it to you — what would need to be different for you to actually want to show up and try?',
    },
    {
      id: 's3_20', subsection: '3B', type: 'multiple',
      text: 'Have you ever gotten real, consistent academic support for the way your brain works?',
      options: ['Yes — and it made a real difference', 'Some support, not consistently', 'Rarely', 'No — I\'ve mostly been on my own'],
    },
    {
      id: 's3_21', subsection: '3B', type: 'text',
      text: 'What is your biggest academic obstacle right now — be specific and honest?',
    },
    {
      id: 's3_22', subsection: '3B', type: 'multiple',
      text: 'When you\'re in school and falling behind, what do you typically do?',
      options: ['Get help immediately', 'Try to catch up on my own', 'Hope things improve on their own', 'Check out mentally and stop trying'],
    },
    {
      id: 's3_23', subsection: '3B', type: 'slider',
      text: 'How motivated are you to pursue higher education or professional training right now?',
      min: 1, max: 10,
    },
    {
      id: 's3_24', subsection: '3B', type: 'text',
      text: 'If you could design your ideal educational path — with any combination of school, training, or experience — what would it look like?',
    },
    {
      id: 's3_25', subsection: '3B', type: 'multiple',
      text: 'Have you ever been in a learning environment that felt specifically designed to help you succeed?',
      options: ['Yes — and that\'s when I thrived', 'A few moments but not consistently', 'Rarely', 'No — I\'ve usually had to adapt to the environment'],
    },
    {
      id: 's3_26', subsection: '3B', type: 'text',
      text: 'What kind of support or accommodations would help you succeed academically — what does your brain actually need to perform well?',
    },
    {
      id: 's3_27', subsection: '3B', type: 'multiple',
      text: 'How do you feel about the idea of asking for academic accommodations or academic help?',
      options: ['Comfortable — I advocate for myself', 'Somewhat comfortable but it feels awkward', 'Uncomfortable — I don\'t like asking', 'I\'ve never considered it or tried'],
    },
    {
      id: 's3_28', subsection: '3B', type: 'text',
      text: 'What is one thing you wish your teachers or professors understood about how you learn?',
    },
    {
      id: 's3_29', subsection: '3B', type: 'slider',
      text: 'How connected do you feel to the school or program you\'re currently in (or planning to enter)?',
      min: 1, max: 10,
    },
    {
      id: 's3_30', subsection: '3B', type: 'text',
      text: 'What would it take for you to truly succeed in school — not just pass, but thrive?',
    },
    {
      id: 's3_31', subsection: '3B', type: 'multiple',
      text: 'Have you ever had an IEP, 504 plan, or any documented academic support plan?',
      options: ['Yes — and it was helpful', 'Yes — but it wasn\'t well implemented', 'I had one that got lost or wasn\'t followed', 'No'],
    },
    {
      id: 's3_32', subsection: '3B', type: 'text',
      text: 'Looking back at your school experience so far — what do you wish had been different?',
    },
    {
      id: 's3_33', subsection: '3B', type: 'multiple',
      text: 'What is your primary education goal for the next 2 years?',
      options: ['Finish a 4-year degree', 'Complete a community college program', 'Get a trade or professional certification', 'I\'m still figuring it out'],
    },
    {
      id: 's3_34', subsection: '3B', type: 'text',
      text: 'Is there an alternative path — trade school, certification, apprenticeship, or self-education — that might work better for how you learn? Have you considered it?',
    },
    {
      id: 's3_35', subsection: '3B', type: 'slider',
      text: 'How confident are you that your current educational path is the right one for your specific career goal?',
      min: 1, max: 10,
    },
    {
      id: 's3_36', subsection: '3B', type: 'text',
      text: 'What does graduating or completing your program mean to you — beyond just getting a piece of paper?',
    },
    {
      id: 's3_37', subsection: '3B', type: 'multiple',
      text: 'How important is your school\'s name and reputation to your career goals?',
      options: ['Critical — it opens specific doors', 'Important but not everything', 'Not very important — skills matter more', 'I haven\'t thought about it much'],
    },
    {
      id: 's3_38', subsection: '3B', type: 'text',
      text: 'Is there anyone at your school — advisor, professor, counselor — who you trust and can turn to when you\'re struggling?',
    },
    {
      id: 's3_39', subsection: '3B', type: 'text',
      text: 'What\'s one thing about your academic situation right now that you haven\'t told anyone but you know needs to change?',
    },
    {
      id: 's3_40', subsection: '3B', type: 'slider',
      text: 'Right now, how ready are you to fully commit to your educational path — showing up, doing the work, asking for help?',
      min: 1, max: 10,
    },
  ],
};

export const SECTION_4 = {
  id: 'section4',
  title: 'Execution: Daily Behavior & Discipline',
  subtitle: 'Academic Habits, Time Management, Responsibility & Accountability',
  subsections: ['Academic Habits', 'Time Management', 'Responsibility & Follow-Through', 'Honesty & Accountability'],
  questions: [
    // 4A — Academic Habits
    {
      id: 's4_01', subsection: '4A', type: 'multiple',
      text: 'On a typical school day, what time do you wake up?',
      options: ['Before 7am', '7am–8am', '8am–10am', 'Later than 10am or I don\'t have a consistent time'],
    },
    {
      id: 's4_02', subsection: '4A', type: 'multiple',
      text: 'How often do you complete assignments before the deadline?',
      options: ['Almost always — I stay ahead', 'Usually — I finish on time', 'Sometimes — I often rush at the end', 'Rarely — I miss deadlines a lot'],
    },
    {
      id: 's4_03', subsection: '4A', type: 'multiple',
      text: 'When you don\'t understand something in class or an assignment, what do you do?',
      options: ['I ask for help right away', 'I try to figure it out myself first, then ask', 'I look it up online or watch videos', 'I usually skip it or just leave it'],
    },
    {
      id: 's4_04', subsection: '4A', type: 'multiple',
      text: 'Do you ask for help when you need it, or do you try to figure it out alone?',
      options: ['I ask for help regularly', 'I try alone first but will ask if stuck', 'I almost always try to handle it alone', 'I struggle alone rather than ask'],
    },
    {
      id: 's4_05', subsection: '4A', type: 'slider',
      text: 'How consistent are you with attending class or showing up to your commitments?',
      min: 1, max: 10,
    },
    {
      id: 's4_06', subsection: '4A', type: 'text',
      text: 'Describe your typical study or work routine. Be honest — not what you think it should be, but what it actually is.',
    },
    {
      id: 's4_07', subsection: '4A', type: 'multiple',
      text: 'When you miss a class or fall behind, what do you usually do next?',
      options: ['Catch up immediately', 'Catch up eventually, but slowly', 'Keep falling further behind', 'Stop going altogether'],
    },
    {
      id: 's4_08', subsection: '4A', type: 'slider',
      text: 'How much effort are you currently putting into your academics — 1 being none, 10 being everything you have?',
      min: 1, max: 10,
    },
    {
      id: 's4_09', subsection: '4A', type: 'text',
      text: 'What is the biggest thing that gets in the way of your academic performance? Be specific.',
    },
    {
      id: 's4_10', subsection: '4A', type: 'multiple',
      text: 'Do you use any tools to stay on top of assignments and deadlines — a planner, a portal, an app?',
      options: ['Yes — I have a system and use it consistently', 'I use something but not consistently', 'I try but it doesn\'t stick', 'No — I don\'t use any system'],
    },
    {
      id: 's4_11', subsection: '4A', type: 'text',
      text: 'Is there a class or subject you are completely checked out from right now? What happened, and why?',
    },
    {
      id: 's4_12', subsection: '4A', type: 'slider',
      text: 'How honest are you being right now about your academic situation — with yourself and with your family?',
      min: 1, max: 10,
    },
    {
      id: 's4_13', subsection: '4A', type: 'text',
      text: 'What would your academic performance look like if someone was actively checking in on you and helping you every week?',
    },
    {
      id: 's4_14', subsection: '4A', type: 'multiple',
      text: 'Do you know how to navigate your school\'s online systems — portals, LMS, financial aid?',
      options: ['Yes — I navigate it well', 'I know the basics', 'I struggle with it', 'I barely know how to use it'],
    },
    {
      id: 's4_15', subsection: '4A', type: 'text',
      text: 'What would need to change — specifically — for your academic performance to improve significantly?',
    },

    // 4B — Time Management
    {
      id: 's4_16', subsection: '4B', type: 'multiple',
      text: 'Do you use a planner, calendar, or any system to organize your time?',
      options: ['Yes — and I use it consistently', 'I have one but rarely use it', 'I\'ve tried but it never sticks', 'No system at all'],
    },
    {
      id: 's4_17', subsection: '4B', type: 'multiple',
      text: 'How often do you start things you don\'t finish?',
      options: ['Rarely — I follow through', 'Sometimes', 'Often', 'Very often — it\'s a real pattern'],
    },
    {
      id: 's4_18', subsection: '4B', type: 'text',
      text: 'What is the thing you waste the most time on? Be honest — don\'t just say "phone."',
    },
    {
      id: 's4_19', subsection: '4B', type: 'multiple',
      text: 'How many hours a day are you spending on your phone — really?',
      options: ['Less than 2 hours', '2–4 hours', '4–6 hours', 'More than 6 hours'],
    },
    {
      id: 's4_20', subsection: '4B', type: 'slider',
      text: 'How well do you manage your time overall — planning, prioritizing, and executing?',
      min: 1, max: 10,
    },
    {
      id: 's4_21', subsection: '4B', type: 'text',
      text: 'If you tracked your time for a full week — every hour — what do you think you\'d discover about where it actually goes?',
    },
    {
      id: 's4_22', subsection: '4B', type: 'multiple',
      text: 'When you have a free day with no obligations, how do you typically spend it?',
      options: ['Productively — I work on goals or projects', 'Mixed — some productivity, some rest', 'Mostly resting, watching content, or gaming', 'I have no routine and just drift'],
    },
    {
      id: 's4_23', subsection: '4B', type: 'text',
      text: 'What is one thing you want to do every day that you keep not doing? Why haven\'t you built that habit?',
    },
    {
      id: 's4_24', subsection: '4B', type: 'multiple',
      text: 'When you have multiple things due at once, what do you do?',
      options: ['Prioritize and work through them', 'Do the easiest ones first', 'Panic and freeze', 'Ignore them and hope things work out'],
    },
    {
      id: 's4_25', subsection: '4B', type: 'slider',
      text: 'How disciplined are you when no one is watching — when there\'s no accountability from others?',
      min: 1, max: 10,
    },
    {
      id: 's4_26', subsection: '4B', type: 'text',
      text: 'What does your sleep schedule actually look like — when do you go to sleep and wake up?',
    },
    {
      id: 's4_27', subsection: '4B', type: 'multiple',
      text: 'How much does procrastination affect your life?',
      options: ['Minimal — I stay ahead of things', 'Some — I procrastinate occasionally', 'Significant — it\'s a real problem', 'Severe — it affects almost everything I do'],
    },

    // 4C — Responsibility & Follow-Through
    {
      id: 's4_28', subsection: '4C', type: 'text',
      text: 'Name one specific thing you said you would do in the last month that you didn\'t do. What got in the way?',
    },
    {
      id: 's4_29', subsection: '4C', type: 'multiple',
      text: 'When you make a commitment to someone — a promise, a plan, a deadline — how often do you follow through?',
      options: ['Almost always', 'Most of the time', 'Sometimes', 'I struggle to follow through consistently'],
    },
    {
      id: 's4_30', subsection: '4C', type: 'multiple',
      text: 'When something goes wrong in your life — a failure, a missed opportunity — what is your first instinct?',
      options: ['Own it and figure out what to do differently', 'Reflect on it but also acknowledge external factors', 'Look for reasons why it wasn\'t my fault', 'Avoid thinking about it entirely'],
    },
    {
      id: 's4_31', subsection: '4C', type: 'text',
      text: 'Has anyone ever told you that you\'re unreliable, flaky, or hard to count on? What do you think about that when you\'re honest with yourself?',
    },
    {
      id: 's4_32', subsection: '4C', type: 'slider',
      text: 'How responsible do you feel you are — really — compared to the responsibility you want to have in your future?',
      min: 1, max: 10,
    },
    {
      id: 's4_33', subsection: '4C', type: 'text',
      text: 'What is one responsibility in your life right now that you are not fully showing up for — even if you haven\'t said it out loud?',
    },
    {
      id: 's4_34', subsection: '4C', type: 'multiple',
      text: 'When you face a difficult task or an uncomfortable responsibility, what do you do?',
      options: ['Face it head-on even if it\'s hard', 'Face it, but slowly and reluctantly', 'Avoid it until I have no choice', 'Avoid it entirely when I can'],
    },
    {
      id: 's4_35', subsection: '4C', type: 'text',
      text: 'Describe a time when you took real responsibility for something — when you owned a mistake or followed through on something hard.',
    },
    {
      id: 's4_36', subsection: '4C', type: 'slider',
      text: 'How much do you trust yourself — your own follow-through and your own word?',
      min: 1, max: 10,
    },
    {
      id: 's4_37', subsection: '4C', type: 'text',
      text: 'What is one commitment you are willing to make right now — to yourself, not to anyone else?',
    },

    // 4D — Honesty & Accountability
    {
      id: 's4_38', subsection: '4D', type: 'text',
      text: 'Is there something important in your life right now that you have been avoiding — a conversation, a responsibility, a truth?',
    },
    {
      id: 's4_39', subsection: '4D', type: 'multiple',
      text: 'Have you ever let someone close to you believe something about your situation that wasn\'t fully true?',
      options: ['Yes — it\'s something I do sometimes', 'It\'s happened, but rarely', 'Very rarely', 'No — I\'m always straightforward'],
    },
    {
      id: 's4_40', subsection: '4D', type: 'slider',
      text: 'On a scale of 1–10, how honest are you with the people who love you — really honest, not just surface honest?',
      min: 1, max: 10,
    },
    {
      id: 's4_41', subsection: '4D', type: 'text',
      text: 'What is one thing you know you need to change in your life but haven\'t done anything about yet? What\'s stopping you?',
    },
    {
      id: 's4_42', subsection: '4D', type: 'multiple',
      text: 'When you hide something from family or people who care about you, what is the main reason?',
      options: ['I don\'t want to disappoint them', 'I\'m embarrassed or ashamed', 'I think I can handle it myself', 'I\'m not sure — it\'s just easier'],
    },
    {
      id: 's4_43', subsection: '4D', type: 'text',
      text: 'Is there anything going on in your life right now that you wish someone knew about but haven\'t said? You don\'t have to give details — just acknowledge it.',
    },
    {
      id: 's4_44', subsection: '4D', type: 'slider',
      text: 'How honest are you being with yourself — about your situation, your habits, your actual effort?',
      min: 1, max: 10,
    },
    {
      id: 's4_45', subsection: '4D', type: 'multiple',
      text: 'When someone checks in on you — parent, mentor, advisor — how do you typically respond?',
      options: ['Openly and honestly', 'Mostly honest but I leave some things out', 'I tell them what they want to hear', 'I shut down or give minimal answers'],
    },
    {
      id: 's4_46', subsection: '4D', type: 'text',
      text: 'What would your life look like if you were fully honest — with yourself and everyone around you — about everything?',
    },
    {
      id: 's4_47', subsection: '4D', type: 'text',
      text: 'What do you need someone to hold you accountable for — something you keep telling yourself you\'ll do but haven\'t?',
    },
    {
      id: 's4_48', subsection: '4D', type: 'multiple',
      text: 'How do you feel about accountability — someone consistently checking in on your progress?',
      options: ['I welcome it — it helps me', 'I\'m okay with it if it\'s done respectfully', 'I feel uncomfortable with it', 'I resist it — it feels like pressure'],
    },
    {
      id: 's4_49', subsection: '4D', type: 'text',
      text: 'What would change in your life if someone held you to the standard you say you want for yourself?',
    },
    {
      id: 's4_50', subsection: '4D', type: 'text',
      text: 'What is one truth about your situation right now that you\'ve been afraid to say out loud?',
    },
    {
      id: 's4_51', subsection: '4D', type: 'multiple',
      text: 'If someone who loves you read every text message you\'ve sent in the last month and watched everything you\'ve done — would they see what you\'ve been telling them?',
      options: ['Yes — my actions match my words', 'Mostly — with a few gaps', 'Not really — there\'s a clear disconnect', 'No — there\'s a significant gap'],
    },
    {
      id: 's4_52', subsection: '4D', type: 'text',
      text: 'If you could go back one month and do one thing differently, what would it be?',
    },
    {
      id: 's4_53', subsection: '4D', type: 'slider',
      text: 'How ready are you, right now, to be held fully accountable for the life you say you want?',
      min: 1, max: 10,
    },
    {
      id: 's4_54', subsection: '4D', type: 'text',
      text: 'What does accountability look like when it\'s done in a way that actually motivates you rather than shuts you down?',
    },
    {
      id: 's4_55', subsection: '4D', type: 'multiple',
      text: 'Are you willing to be completely honest in this assessment — even about things that make you uncomfortable?',
      options: ['Yes — I\'m going all in', 'Mostly — some things are hard to say', 'I\'ll try but some things I\'ll keep private', 'I\'m not sure'],
    },
    {
      id: 's4_56', subsection: '4D', type: 'text',
      text: 'What do you wish the people who love you understood about why it\'s sometimes hard to be fully honest with them?',
    },
    {
      id: 's4_57', subsection: '4D', type: 'text',
      text: 'What would it take for you to feel safe enough to be completely honest with your mom about how things are actually going?',
    },
    {
      id: 's4_58', subsection: '4D', type: 'slider',
      text: 'Right now — in this moment — how honest were you throughout this section?',
      min: 1, max: 10,
    },
    {
      id: 's4_59', subsection: '4D', type: 'text',
      text: 'If there\'s anything you held back in any part of this assessment — anything you couldn\'t bring yourself to fully say — this is your space. You can say it here.',
    },
    {
      id: 's4_60', subsection: '4D', type: 'text',
      text: 'What is one step toward honesty and accountability you are willing to take in the next 24 hours?',
    },
  ],
};

export const SECTION_5 = {
  id: 'section5',
  title: 'Communication & Support Systems',
  subtitle: 'How You Communicate and What You Need',
  subsections: ['Communication Style', 'Support Needs'],
  questions: [
    // 5A — Communication Style
    {
      id: 's5_01', subsection: '5A', type: 'multiple',
      text: 'When something is bothering you — stress, worry, frustration — do you bring it up or hold it in?',
      options: ['I usually bring it up pretty quickly', 'I hold it until it gets really bad', 'I hold it in and rarely say anything', 'I depend on who it is — some people I tell, others I don\'t'],
    },
    {
      id: 's5_02', subsection: '5A', type: 'multiple',
      text: 'How do you prefer people to give you feedback — especially about something you could improve?',
      options: ['Direct and honest — just tell me', 'Honest but gentle — with kindness first', 'Through examples, not just criticism', 'I prefer to discover it myself'],
    },
    {
      id: 's5_03', subsection: '5A', type: 'multiple',
      text: 'Do you feel like the people around you really hear you when you talk?',
      options: ['Yes — I feel genuinely heard', 'Sometimes', 'Rarely', 'No — I feel unheard most of the time'],
    },
    {
      id: 's5_04', subsection: '5A', type: 'text',
      text: 'When was the last time you told someone you trusted that you were struggling — not just surface level, but really struggling?',
    },
    {
      id: 's5_05', subsection: '5A', type: 'multiple',
      text: 'When you\'re in conflict with someone, what do you typically do?',
      options: ['Address it directly', 'Wait until they bring it up', 'Pull back and go silent', 'Avoid conflict at all costs'],
    },
    {
      id: 's5_06', subsection: '5A', type: 'text',
      text: 'Is there something you\'ve been wanting to say to someone close to you that you haven\'t been able to? What\'s stopped you?',
    },
    {
      id: 's5_07', subsection: '5A', type: 'multiple',
      text: 'When you need to share something important or difficult with family, how do you usually do it?',
      options: ['Face to face — directly', 'Text or written message first', 'Wait for the right moment and hope it comes up', 'I usually don\'t bring it up at all'],
    },
    {
      id: 's5_08', subsection: '5A', type: 'slider',
      text: 'How comfortable are you expressing your real feelings to your mom?',
      min: 1, max: 10,
    },
    {
      id: 's5_09', subsection: '5A', type: 'text',
      text: 'What does a "good conversation" feel like to you — describe the environment and energy that makes you open up?',
    },
    {
      id: 's5_10', subsection: '5A', type: 'multiple',
      text: 'When your mom expresses concern or worry about you, how do you usually respond?',
      options: ['I open up and share what\'s really going on', 'I tell her some things but not everything', 'I reassure her without fully engaging', 'I shut down or deflect'],
    },
    {
      id: 's5_11', subsection: '5A', type: 'text',
      text: 'What makes it hard to communicate with the people you love about the things that really matter?',
    },
    {
      id: 's5_12', subsection: '5A', type: 'text',
      text: 'Is there a way of communicating — a format, a timing, an approach — that helps you open up more than usual?',
    },
    {
      id: 's5_13', subsection: '5A', type: 'slider',
      text: 'How well do you feel you communicate your needs to the people who care about you?',
      min: 1, max: 10,
    },
    {
      id: 's5_14', subsection: '5A', type: 'text',
      text: 'What do you wish you were better at when it comes to communication?',
    },

    // 5B — Support Needs
    {
      id: 's5_15', subsection: '5B', type: 'multiple',
      text: 'What kind of support helps you most when you\'re going through something hard?',
      options: ['Space — let me process alone', 'Encouragement — remind me of my strengths', 'Structure — help me make a concrete plan', 'Accountability — check in and keep me on track'],
    },
    {
      id: 's5_16', subsection: '5B', type: 'multiple',
      text: 'When you need help, do you feel comfortable asking for it?',
      options: ['Yes — asking for help is strength', 'Usually, but it\'s not always easy', 'It feels uncomfortable — like weakness', 'I almost never ask for help'],
    },
    {
      id: 's5_17', subsection: '5B', type: 'text',
      text: 'Who is one person in your life — right now — who you can be completely and fully honest with? Why them?',
    },
    {
      id: 's5_18', subsection: '5B', type: 'text',
      text: 'What do you need from your mom right now that you haven\'t said out loud yet?',
    },
    {
      id: 's5_19', subsection: '5B', type: 'text',
      text: 'What do you wish she understood about you that she currently might not?',
    },
    {
      id: 's5_20', subsection: '5B', type: 'multiple',
      text: 'When your mom tries to help or check in, how does it usually feel?',
      options: ['Supportive and welcome', 'Good but sometimes overwhelming', 'Like pressure or stress', 'Like she doesn\'t fully understand me'],
    },
    {
      id: 's5_21', subsection: '5B', type: 'text',
      text: 'What kind of check-in from your mom would actually feel helpful — not stressful — on a regular basis?',
    },
    {
      id: 's5_22', subsection: '5B', type: 'slider',
      text: 'How supported do you feel right now — by family, friends, or anyone — in working toward your goals?',
      min: 1, max: 10,
    },
    {
      id: 's5_23', subsection: '5B', type: 'text',
      text: 'If you could design the perfect support system for yourself — who\'s in it, what do they do, how often do they show up?',
    },
    {
      id: 's5_24', subsection: '5B', type: 'multiple',
      text: 'What does love and support feel like to you — what\'s the action that makes you feel most cared for?',
      options: ['Words of encouragement and affirmation', 'Someone spending time with me', 'Practical help — solving problems together', 'Giving me space and trusting me'],
    },
    {
      id: 's5_25', subsection: '5B', type: 'text',
      text: 'Is there anything you need right now that you haven\'t gotten — from anyone? This is a safe space to name it.',
    },
    {
      id: 's5_26', subsection: '5B', type: 'multiple',
      text: 'Do you have a mentor, advisor, or trusted adult outside of your family who you can go to?',
      options: ['Yes — and I use that relationship', 'I have someone but rarely reach out', 'I don\'t have one but want one', 'No, and I haven\'t thought about it'],
    },
    {
      id: 's5_27', subsection: '5B', type: 'text',
      text: 'What is the most important thing you want your family to know about what kind of support actually helps you?',
    },
    {
      id: 's5_28', subsection: '5B', type: 'slider',
      text: 'How much do you actually want help right now — on a scale of 1 (I\'m good) to 10 (I really need it)?',
      min: 1, max: 10,
    },
    {
      id: 's5_29', subsection: '5B', type: 'text',
      text: 'What is one thing you\'ve been afraid to ask for that you actually really need?',
    },
    {
      id: 's5_30', subsection: '5B', type: 'text',
      text: 'If this assessment reached the right person and they responded with exactly what you needed — what would they say or do?',
    },
  ],
};

export const SECTION_6 = {
  id: 'section6',
  title: 'Readiness: Independence & Life Skills',
  subtitle: 'Are You Ready to Navigate Life on Your Own?',
  subsections: ['Independence Readiness', 'Life Skills'],
  questions: [
    {
      id: 's6_01', subsection: '6A', type: 'slider',
      text: 'On a scale of 1–10, how ready are you to live completely independently — managing your own schedule, finances, health, and responsibilities?',
      min: 1, max: 10,
    },
    {
      id: 's6_02', subsection: '6A', type: 'multiple',
      text: 'Can you manage your own daily schedule without reminders from someone else?',
      options: ['Yes — I\'m self-directed', 'Mostly, but I miss things sometimes', 'I struggle without reminders', 'No — I need consistent reminders'],
    },
    {
      id: 's6_03', subsection: '6A', type: 'multiple',
      text: 'Do you know how to schedule and navigate your own medical or health appointments?',
      options: ['Yes — I handle this independently', 'I can with some guidance', 'I\'ve never really had to do this', 'No — someone else handles this for me'],
    },
    {
      id: 's6_04', subsection: '6A', type: 'multiple',
      text: 'When a problem comes up that you don\'t know how to solve — billing issue, conflict, scheduling problem — what do you do?',
      options: ['Research it and figure it out', 'Ask someone for help right away', 'Ask for help if I can\'t figure it out', 'Wait and hope it resolves itself'],
    },
    {
      id: 's6_05', subsection: '6A', type: 'multiple',
      text: 'Have you ever had to advocate for yourself in a school or work setting — asking for accommodations, correcting an error, or speaking up for your needs?',
      options: ['Yes — I advocate for myself regularly', 'I have, but it was hard', 'I haven\'t but I could if I needed to', 'No — I avoid those situations'],
    },
    {
      id: 's6_06', subsection: '6A', type: 'text',
      text: 'How do you handle it when no one is watching or checking on you — does your behavior change? Be honest.',
    },
    {
      id: 's6_07', subsection: '6A', type: 'text',
      text: 'What is one life skill you know you still need to develop — something that adults are expected to handle that you\'re not fully comfortable with yet?',
    },
    {
      id: 's6_08', subsection: '6A', type: 'multiple',
      text: 'Do you feel like you\'re mature enough to handle the real consequences of your own decisions right now?',
      options: ['Yes — I take ownership of my choices', 'Mostly — I\'m still developing this', 'Not fully — I know I\'m still growing', 'Not yet — I\'m not there'],
    },
    {
      id: 's6_09', subsection: '6A', type: 'text',
      text: 'What does "being an adult" mean to you — and how close are you to that right now?',
    },
    {
      id: 's6_10', subsection: '6A', type: 'multiple',
      text: 'Can you cook for yourself, manage basic hygiene, and handle daily self-care independently?',
      options: ['Yes — fully independent in these areas', 'Mostly — with some gaps', 'Partially — I rely on others for some of this', 'I depend on others for most of this'],
    },
    {
      id: 's6_11', subsection: '6A', type: 'multiple',
      text: 'Do you know how to manage basic finances — paying bills on time, not overdrafting, budgeting for the month?',
      options: ['Yes — I handle this well', 'I know the basics but haven\'t fully practiced', 'I understand it in theory but struggle in practice', 'No — I\'m not confident here at all'],
    },
    {
      id: 's6_12', subsection: '6A', type: 'text',
      text: 'When you were living away from home or more independently — what was hardest? What surprised you about how much responsibility was involved?',
    },
    {
      id: 's6_13', subsection: '6A', type: 'slider',
      text: 'How confident are you in your ability to ask for help when you\'re in over your head?',
      min: 1, max: 10,
    },
    {
      id: 's6_14', subsection: '6A', type: 'multiple',
      text: 'When you\'re in a new or unfamiliar environment — new school, new city, new people — how do you handle it?',
      options: ['I adapt quickly and make the most of it', 'I take time but eventually settle in', 'I struggle and tend to withdraw', 'I find it really difficult and overwhelming'],
    },
    {
      id: 's6_15', subsection: '6A', type: 'text',
      text: 'What\'s one area of your life where you feel genuinely independent and capable?',
    },
    {
      id: 's6_16', subsection: '6A', type: 'text',
      text: 'What\'s one area where you know you still need significant support or growth before you\'re truly ready to be on your own?',
    },
    {
      id: 's6_17', subsection: '6A', type: 'multiple',
      text: 'Do you know how to navigate online academic systems — your school\'s LMS, email, financial aid portal?',
      options: ['Yes — I\'m comfortable with these', 'I know basics but struggle with details', 'I need help with these regularly', 'No — I avoid them or don\'t use them'],
    },
    {
      id: 's6_18', subsection: '6A', type: 'text',
      text: 'If you were completely on your own right now — no family support, no financial help — what would be your biggest challenge?',
    },
    {
      id: 's6_19', subsection: '6A', type: 'slider',
      text: 'How ready do you feel — emotionally, practically, mentally — to take on the next phase of your life?',
      min: 1, max: 10,
    },
    {
      id: 's6_20', subsection: '6A', type: 'multiple',
      text: 'What does having a "support system" mean to you — is it something you have, something you need, or both?',
      options: ['I have a strong support system', 'I have some support but need more', 'I need to build one', 'I prefer to operate independently'],
    },
    {
      id: 's6_21', subsection: '6A', type: 'text',
      text: 'What is one thing you\'ve figured out about yourself through experience — something you know you need in order to succeed?',
    },
    {
      id: 's6_22', subsection: '6A', type: 'multiple',
      text: 'Do you know how to use professional communication — how to email a professor, call an office, or write a formal letter?',
      options: ['Yes — I do this comfortably', 'I can but it\'s uncomfortable', 'I know how but avoid it', 'No — I don\'t know how to do this well'],
    },
    {
      id: 's6_23', subsection: '6A', type: 'text',
      text: 'What do you think is the biggest gap between where you are now and where you need to be to truly succeed independently?',
    },
    {
      id: 's6_24', subsection: '6A', type: 'slider',
      text: 'On a scale of 1–10, how much do you want to grow in your independence and self-management — not because someone told you to, but for yourself?',
      min: 1, max: 10,
    },
    {
      id: 's6_25', subsection: '6A', type: 'text',
      text: 'What is one specific independence skill you are committing to developing starting this week?',
    },
    {
      id: 's6_26', subsection: '6A', type: 'multiple',
      text: 'Do you have a plan for your health — knowing your medications, insurance, how to see a doctor when needed?',
      options: ['Yes — I manage this independently', 'Somewhat — with help', 'Not really — someone else handles it', 'No plan at all'],
    },
    {
      id: 's6_27', subsection: '6A', type: 'text',
      text: 'What does it mean to truly grow up — not the age, but the actual shift? And where are you on that journey?',
    },
    {
      id: 's6_28', subsection: '6A', type: 'multiple',
      text: 'When life gets hard — really hard — what do you do?',
      options: ['Face it head-on and problem-solve', 'Lean on people I trust', 'Shut down and go internal', 'Avoid it until forced to deal with it'],
    },
    {
      id: 's6_29', subsection: '6A', type: 'text',
      text: 'What would the most independent, capable version of you look like — and what would it take to close that gap?',
    },
    {
      id: 's6_30', subsection: '6A', type: 'slider',
      text: 'How honestly did you answer the questions in this section — really?',
      min: 1, max: 10,
    },
    {
      id: 's6_31', subsection: '6A', type: 'multiple',
      text: 'Do you know your own strengths — what you\'re genuinely good at — and are you using them intentionally?',
      options: ['Yes — I know them and leverage them', 'I know some but don\'t fully apply them', 'I\'m not sure what my real strengths are', 'No — I\'ve never thought about it this way'],
    },
    {
      id: 's6_32', subsection: '6A', type: 'text',
      text: 'What do you want your independence to look like in 1 year? What would be different about your daily life?',
    },
    {
      id: 's6_33', subsection: '6A', type: 'multiple',
      text: 'Do you feel like you know how to navigate conflict with adults — professors, employers, advisors — in a professional way?',
      options: ['Yes — I handle it well', 'I manage it but it\'s uncomfortable', 'I avoid conflict with adults when possible', 'I struggle significantly in these situations'],
    },
    {
      id: 's6_34', subsection: '6A', type: 'text',
      text: 'What is one thing you need someone to teach you — a practical skill, a system, or a process — that would make you significantly more capable?',
    },
    {
      id: 's6_35', subsection: '6A', type: 'slider',
      text: 'Overall — how ready are you, right now, to handle real adult responsibilities independently?',
      min: 1, max: 10,
    },
    {
      id: 's6_36', subsection: '6A', type: 'multiple',
      text: 'If something went seriously wrong — academically, financially, health-related — would you know who to call and what to do?',
      options: ['Yes — I\'d know exactly what to do', 'I\'d figure it out', 'I\'d call family immediately', 'I\'d probably freeze and not know what to do'],
    },
    {
      id: 's6_37', subsection: '6A', type: 'text',
      text: 'What\'s one responsibility you\'ve been avoiding that you need to face in the next 7 days?',
    },
    {
      id: 's6_38', subsection: '6A', type: 'text',
      text: 'What is one thing you admire about how someone else handles their life — something you want to model?',
    },
    {
      id: 's6_39', subsection: '6A', type: 'multiple',
      text: 'How do you feel about where you are in your life right now — overall?',
      options: ['I\'m on track and growing', 'I\'m okay but know I can do better', 'I\'m behind where I want to be', 'I feel stuck or lost'],
    },
    {
      id: 's6_40', subsection: '6A', type: 'text',
      text: 'What is the most honest thing you can say about your readiness for the next chapter of your life?',
    },
  ],
};

export const SECTION_7 = {
  id: 'section7',
  title: 'Commitment & Growth',
  subtitle: 'What You\'re Willing to Do to Build the Life You Want',
  subsections: ['Growth Commitment'],
  questions: [
    {
      id: 's7_01', subsection: '7A', type: 'slider',
      text: 'On a scale of 1–10, how committed are you right now to building the life you described in this assessment?',
      min: 1, max: 10,
    },
    {
      id: 's7_02', subsection: '7A', type: 'text',
      text: 'What has gotten in the way of your growth in the past — be specific, not generic?',
    },
    {
      id: 's7_03', subsection: '7A', type: 'text',
      text: 'What would need to change — in your actual daily habits — for you to get where you say you want to go?',
    },
    {
      id: 's7_04', subsection: '7A', type: 'multiple',
      text: 'Are you willing to do things that are uncomfortable, difficult, or frustrating to grow?',
      options: ['Yes — I understand growth requires discomfort', 'Probably — when it matters enough', 'I want to be, but I struggle with it', 'Honestly, I tend to avoid discomfort'],
    },
    {
      id: 's7_05', subsection: '7A', type: 'text',
      text: 'What is one specific thing you are willing to commit to starting this week — something real, not vague?',
    },
    {
      id: 's7_06', subsection: '7A', type: 'text',
      text: 'If you could go back and give your younger self one piece of advice, what would it be?',
    },
    {
      id: 's7_07', subsection: '7A', type: 'text',
      text: 'What does success feel like to you — not look like on the outside, but what would it feel like in your body and your soul?',
    },
    {
      id: 's7_08', subsection: '7A', type: 'multiple',
      text: 'What is the biggest thing holding you back right now from growing?',
      options: ['Fear of failure', 'Lack of discipline and consistency', 'Feeling overwhelmed and not knowing where to start', 'Lack of support or resources'],
    },
    {
      id: 's7_09', subsection: '7A', type: 'text',
      text: 'Who is someone in your life — or someone you admire from a distance — who has done something similar to what you want to do? What can you learn from their path?',
    },
    {
      id: 's7_10', subsection: '7A', type: 'slider',
      text: 'How patient are you with the process of growth — the slow, unglamorous, everyday work?',
      min: 1, max: 10,
    },
    {
      id: 's7_11', subsection: '7A', type: 'text',
      text: 'What does it mean to you to keep going when everything in you wants to stop?',
    },
    {
      id: 's7_12', subsection: '7A', type: 'multiple',
      text: 'When you imagine yourself 5 years from now, having done the work — what does that version of you feel?',
      options: ['Proud and fulfilled', 'Relieved — glad I pushed through', 'Surprised — I didn\'t think I\'d get here', 'I honestly have trouble imagining it'],
    },
    {
      id: 's7_13', subsection: '7A', type: 'text',
      text: 'What is the one thing you\'re afraid of losing if you fully commit to your growth? What would have to change about how you live?',
    },
    {
      id: 's7_14', subsection: '7A', type: 'text',
      text: 'What would it mean to your family — especially your mom — to see you step fully into your potential?',
    },
    {
      id: 's7_15', subsection: '7A', type: 'slider',
      text: 'How serious are you right now — in this moment, in this season of your life — about doing what it takes?',
      min: 1, max: 10,
    },
    {
      id: 's7_16', subsection: '7A', type: 'text',
      text: 'What is one habit, pattern, or behavior you know you need to permanently leave behind to become who you want to be?',
    },
    {
      id: 's7_17', subsection: '7A', type: 'text',
      text: 'Write a message to yourself — what do you want to remember from this assessment? What do you want the next version of you to know?',
    },
    {
      id: 's7_18', subsection: '7A', type: 'multiple',
      text: 'Are you willing to use this assessment as a starting point — and come back to track your growth?',
      options: ['Yes — absolutely', 'Yes — if I have support', 'I\'m not sure yet', 'That feels hard to commit to right now'],
    },
    {
      id: 's7_19', subsection: '7A', type: 'text',
      text: 'If nothing changes in the next 6 months — your habits, your effort, your honesty — where will you be? Is that acceptable to you?',
    },
    {
      id: 's7_20', subsection: '7A', type: 'text',
      text: 'What is the one thing — the single most important thing — you are taking away from this assessment right now?',
    },
    {
      id: 's7_21', subsection: '7A', type: 'multiple',
      text: 'After everything you\'ve reflected on in this assessment — do you believe you can build the life you described?',
      options: ['Yes — completely', 'Yes — with help and structure', 'I hope so, but I\'m not fully sure', 'I\'m scared it might not happen'],
    },
    {
      id: 's7_22', subsection: '7A', type: 'text',
      text: 'If you had one wish for your future — something you deeply hope happens — what would it be?',
    },
    {
      id: 's7_23', subsection: '7A', type: 'text',
      text: 'Final question: If someone who loves you — who believed in you completely — read every answer you gave in this assessment, what would you want them to know about you that the answers alone might not fully show?',
    },
  ],
};

// ─── MEKHI-ONLY: COLLEGE RETURN DECISION ────────────────────────────────────

export const MEKHI_COLLEGE_SECTION = {
  id: 'section_college',
  title: 'College Readiness & Return Decision',
  subtitle: 'A Special Reflection Just for You',
  subsections: ['College Experience & Readiness'],
  mekhiOnly: true,
  questions: [
    {
      id: 'mc_01', subsection: 'college', type: 'text',
      text: 'How do you honestly feel about Clark Atlanta University right now — not what you\'ve been telling people, but how you actually feel when you think about it?',
    },
    {
      id: 'mc_02', subsection: 'college', type: 'multiple',
      text: 'When you imagine going back to campus, what\'s the first feeling that comes up?',
      options: ['Excited — I want to go back and do it right', 'Anxious — it feels overwhelming', 'Dread — I don\'t want to go back', 'Confused — I don\'t know how I feel'],
    },
    {
      id: 'mc_03', subsection: 'college', type: 'multiple',
      text: 'This semester, how often are you actually going to class?',
      options: ['Every class — I haven\'t missed any', 'Most of them — just a few missed', 'Some — I miss more than I attend', 'Rarely or never — I\'ve stopped going'],
    },
    {
      id: 'mc_04', subsection: 'college', type: 'multiple',
      text: 'How comfortable are you navigating Canvas — your school\'s online system for assignments and grades?',
      options: ['Very comfortable — I use it regularly', 'Somewhat — I know the basics', 'I struggle with it', 'I barely know how to log in'],
    },
    {
      id: 'mc_05', subsection: 'college', type: 'multiple',
      text: 'Do you have people at Clark Atlanta — a friend, advisor, RA, or anyone — you can go to when you\'re struggling?',
      options: ['Yes — I have people I\'d go to', 'One person, maybe', 'I haven\'t connected with anyone like that', 'No — I\'m going through it alone'],
    },
    {
      id: 'mc_06', subsection: 'college', type: 'multiple',
      text: 'When things get hard at school — academically or personally — what do you usually do?',
      options: ['Reach out for help', 'Try to push through alone', 'Withdraw — go quiet and stop engaging', 'Leave the situation — stop going'],
    },
    {
      id: 'mc_07', subsection: 'college', type: 'slider',
      text: 'How ready do you honestly feel to live away from home and manage college independently right now?',
      min: 1, max: 10,
    },
    {
      id: 'mc_08', subsection: 'college', type: 'text',
      text: 'What would need to be different — in your support system, your structure, or your environment — for college to actually work for you?',
    },
    {
      id: 'mc_09', subsection: 'college', type: 'text',
      text: 'If you could choose your next step with absolutely no judgment from anyone — your mom, your family, anyone — what would you choose?',
    },
    {
      id: 'mc_10', subsection: 'college', type: 'slider',
      text: 'On a scale of 1–10 — how honest have you been with your mom about how school is actually going this semester?',
      min: 1, max: 10,
    },
    {
      id: 'mc_11', subsection: 'college', type: 'text',
      text: 'Is there something about your school situation right now that you haven\'t told anyone? This is a private space — no one is judging. You can say it here.',
    },
    {
      id: 'mc_12', subsection: 'college', type: 'multiple',
      text: 'What do you feel like you need most right now?',
      options: ['A plan and structure — clear next steps', 'Time and space to figure myself out', 'More support — people checking in', 'To feel like I\'m not failing'],
    },
    {
      id: 'mc_13', subsection: 'college', type: 'text',
      text: 'What would you want your mom to understand about what you\'ve been going through at Clark Atlanta?',
    },
    {
      id: 'mc_14', subsection: 'college', type: 'multiple',
      text: 'If someone sat down with you and helped you figure out a real plan — no shame, no judgment — would you be open to that?',
      options: ['Yes — I want that more than anything', 'Yes — if it doesn\'t feel like a lecture', 'I think so, but I\'m scared', 'I\'m not sure'],
    },
    {
      id: 'mc_15', subsection: 'college', type: 'text',
      text: 'What is the one thing about your future that still gives you hope right now — even in the middle of all of this?',
    },
  ],
};

// ─── PAUSE MESSAGES ──────────────────────────────────────────────────────────

export const PAUSE_MESSAGES = [
  "You're doing great. Take a breath. There are no right answers here — only honest ones.",
  "Halfway through. Before the next section, take 30 seconds and just breathe. This is your time.",
  "The fact that you're still here and thinking about your future means something. Keep going.",
  "These questions are hard because they're real. That's what makes your answers valuable.",
  "You're not being judged. You're being understood.",
  "Every answer you give here is one step closer to clarity. Keep going.",
  "You've made it this far. That takes courage. Don't stop now.",
  "Take a moment. You're doing something most people never do — looking honestly at your own life.",
  "The hard questions are worth it. What you discover here is yours to keep.",
  "You're building your blueprint. One question at a time.",
];

// ─── SECTION A: LIFE VISION ASSESSMENT ───────────────────────────────────────

export const SECTION_A = {
  id: 'sectionA',
  title: 'Life Vision',
  subtitle: 'Define the life you want — career, lifestyle, and identity',
  subsections: ['Career Vision', 'Lifestyle Vision', 'Identity Vision'],
  questions: [
    // Career Vision
    {
      id: 'sa_01', subsection: 'A1', type: 'text',
      text: 'What is the job title you want most — the one that, when you imagine having it, makes you feel like you made it?',
    },
    {
      id: 'sa_02', subsection: 'A1', type: 'text',
      text: 'Name two backup careers — jobs you could see yourself doing and being proud of if your first choice didn\'t happen.',
    },
    {
      id: 'sa_03', subsection: 'A1', type: 'text',
      text: 'Why do you want this career? Not the resume answer — the real reason.',
    },
    {
      id: 'sa_04', subsection: 'A1', type: 'text',
      text: 'What specifically excites you about it? What part of that career would make you actually want to go to work?',
    },
    {
      id: 'sa_05', subsection: 'A1', type: 'multiple',
      text: 'Which of these best describes where you want to be in your career by age 30?',
      options: ['Established in my field — building my reputation', 'Just getting started — still learning', 'Running my own business or brand', 'I honestly don\'t know yet'],
    },
    {
      id: 'sa_06', subsection: 'A1', type: 'text',
      text: 'Who is someone — famous or not — who has a career similar to what you want? What about their path do you respect?',
    },
    {
      id: 'sa_07', subsection: 'A1', type: 'multiple',
      text: 'How competitive are you willing to be to get into your career field?',
      options: ['Very — I will outwork everyone', 'Moderately — I\'ll compete but I have limits', 'I\'m not sure I know how competitive it is', 'I\'m worried I\'m not competitive enough'],
    },
    {
      id: 'sa_08', subsection: 'A1', type: 'multiple',
      text: 'Are you willing to work nights, weekends, or unconventional hours if your career requires it — especially early on?',
      options: ['Yes — I understand that\'s part of it', 'Probably — depending on the circumstances', 'I\'d prefer not to, but I could', 'That\'s a dealbreaker for me'],
    },

    // Lifestyle Vision
    {
      id: 'sa_09', subsection: 'A2', type: 'multiple',
      text: 'How much money do you want to earn per year by age 30?',
      options: ['$50,000–$75,000', '$75,000–$120,000', '$120,000–$200,000', '$200,000+'],
    },
    {
      id: 'sa_10', subsection: 'A2', type: 'text',
      text: 'What city or region do you want to live in? Be specific — don\'t just say "a big city."',
    },
    {
      id: 'sa_11', subsection: 'A2', type: 'multiple',
      text: 'What kind of home do you want to live in?',
      options: ['A house I own — single family home', 'A condo or townhouse I own', 'A luxury apartment', 'I don\'t care about housing — I care more about experiences'],
    },
    {
      id: 'sa_12', subsection: 'A2', type: 'text',
      text: 'What kind of car do you want to drive? Be real — what\'s the dream, and what\'s the realistic version?',
    },
    {
      id: 'sa_13', subsection: 'A2', type: 'multiple',
      text: 'How important is travel in the life you want?',
      options: ['Very — I want to travel multiple times a year', 'Important — a few trips a year', 'Occasionally — once a year or so', 'Not a priority for me'],
    },
    {
      id: 'sa_14', subsection: 'A2', type: 'multiple',
      text: 'What kind of family life do you want?',
      options: ['Married with kids — that\'s the plan', 'Maybe — I\'m open to it', 'I want to focus on my career first', 'I don\'t see myself with a traditional family'],
    },
    {
      id: 'sa_15', subsection: 'A2', type: 'multiple',
      text: 'How important is financial security — having savings, no debt, a cushion — to the life you want?',
      options: ['Critical — I want to be fully financially secure', 'Very important — I want stability', 'Somewhat — I want to enjoy life too', 'I\'ll figure it out as I go'],
    },
    {
      id: 'sa_16', subsection: 'A2', type: 'text',
      text: 'Describe your ideal Saturday at age 30 — not a workday. What does your free time look like in the life you\'re building?',
    },

    // Identity Vision
    {
      id: 'sa_17', subsection: 'A3', type: 'text',
      text: 'What kind of man do you want to be known as — not your title or your money, but your character? What do people say about you?',
    },
    {
      id: 'sa_18', subsection: 'A3', type: 'text',
      text: 'What values matter most to you — the things you would never compromise on no matter how successful you become?',
    },
    {
      id: 'sa_19', subsection: 'A3', type: 'text',
      text: 'Who do you admire most — in your life or in the world — and what specific qualities do you want to have that they have?',
    },
    {
      id: 'sa_20', subsection: 'A3', type: 'text',
      text: 'What do you want your relationship with your mom to look like at age 25? What do you want to be able to say to her by then?',
    },
    {
      id: 'sa_21', subsection: 'A3', type: 'text',
      text: 'If everything goes right — you build the life you just described — how do you feel on the inside? Not what does it look like. How does it FEEL?',
    },
  ],
};

// ─── SECTION B: LIFESTYLE BUDGET REALITY ─────────────────────────────────────

export const SECTION_B = {
  id: 'sectionB',
  title: 'Lifestyle Budget Reality',
  subtitle: 'Design the life you want — then see what it actually costs',
  subsections: ['Design Your Life', 'Understand the Cost'],
  questions: [
    {
      id: 'sb_01', subsection: 'B1', type: 'multiple',
      text: 'What is your target annual income — what you want to be earning by age 30?',
      options: ['$50,000–$75,000/year', '$75,000–$120,000/year', '$120,000–$200,000/year', '$200,000+/year'],
    },
    {
      id: 'sb_02', subsection: 'B1', type: 'multiple',
      text: 'What kind of housing do you want at age 30?',
      options: ['Own a house (~$2,000–$3,500/mo mortgage)', 'Own a condo (~$1,500–$2,500/mo)', 'Rent a nice apartment (~$1,200–$2,500/mo)', 'Rent a basic apartment (~$800–$1,500/mo)'],
    },
    {
      id: 'sb_03', subsection: 'B1', type: 'multiple',
      text: 'What kind of car do you want at age 30?',
      options: ['Luxury car ($700–$1,200/mo payment)', 'Nice car ($400–$700/mo payment)', 'Reliable used car ($200–$400/mo payment)', 'Whatever I can afford'],
    },
    {
      id: 'sb_04', subsection: 'B1', type: 'multiple',
      text: 'What is your expected family situation at age 30?',
      options: ['Single — living alone', 'In a relationship — partner contributes to expenses', 'Married — dual income household', 'Married with kids'],
    },
    {
      id: 'sb_05', subsection: 'B1', type: 'multiple',
      text: 'How often do you want to travel at age 30?',
      options: ['Multiple times a year (~$5,000–$10,000/year)', 'Once or twice a year (~$2,000–$5,000/year)', 'Occasionally (~$500–$2,000/year)', 'Travel is not a priority'],
    },
    {
      id: 'sb_06', subsection: 'B1', type: 'multiple',
      text: 'How important is saving and investing money each month?',
      options: ['Critical — I want to save $1,000+ per month', 'Important — I want to save $500–$1,000/month', 'Somewhat — I\'ll save what\'s left', 'I\'ll figure that out later'],
    },
    {
      id: 'sb_07', subsection: 'B1', type: 'multiple',
      text: 'Do you plan to financially support your family — your mom, siblings, or relatives — at any point?',
      options: ['Yes — that\'s a major goal of mine', 'Probably some help when I can', 'Maybe, depending on my situation', 'No — I need to focus on myself first'],
    },
    {
      id: 'sb_08', subsection: 'B2', type: 'slider',
      text: 'Right now — how well do you understand the actual monthly cost of the lifestyle you just described?',
      min: 1, max: 10,
    },
    {
      id: 'sb_09', subsection: 'B2', type: 'multiple',
      text: 'When you imagined the life you want — the car, the house, the travel — did you think about what income is required to actually pay for it?',
      options: ['Yes — I have a realistic sense of it', 'Somewhat — I have a rough idea', 'Not really — I just knew I wanted it', 'No — I\'ve never connected the two'],
    },
    {
      id: 'sb_10', subsection: 'B2', type: 'text',
      text: 'Now that you\'ve thought about it — is the income you said you want actually enough to pay for the life you described? What do you think?',
    },
    {
      id: 'sb_11', subsection: 'B2', type: 'multiple',
      text: 'If reaching your income goal requires 4–6 years of school, internships, and entry-level work — are you willing to delay the lifestyle to build it properly?',
      options: ['Yes — absolutely. Long game is worth it.', 'Probably — it\'s hard to think about but I understand it', 'I struggle with delayed gratification honestly', 'That feels really far away and discouraging'],
    },
    {
      id: 'sb_12', subsection: 'B2', type: 'text',
      text: 'What does this reality check make you think or feel about the work that\'s ahead of you?',
    },
  ],
};

// ─── SECTION C: CAREER REALITY ASSESSMENT ────────────────────────────────────

export const SECTION_C = {
  id: 'sectionC',
  title: 'Career Reality Check',
  subtitle: 'What your dream career actually requires',
  subsections: ['Career Requirements', 'Your Readiness'],
  questions: [
    {
      id: 'sc_01', subsection: 'C1', type: 'multiple',
      text: 'Do you know what degree or education your primary career goal typically requires?',
      options: ['Yes — I know specifically', 'I have a general idea', 'Not really', 'I haven\'t looked into it'],
    },
    {
      id: 'sc_02', subsection: 'C1', type: 'multiple',
      text: 'Do you know the typical starting salary for the career you want?',
      options: ['Yes — I know the range', 'I have a rough idea', 'I\'ve never actually looked it up', 'I assumed it would be high'],
    },
    {
      id: 'sc_03', subsection: 'C1', type: 'multiple',
      text: 'How competitive is the field you want to enter?',
      options: ['Extremely competitive — thousands of people want this job', 'Competitive but there are openings', 'Moderately competitive', 'I don\'t know how competitive it is'],
    },
    {
      id: 'sc_04', subsection: 'C1', type: 'multiple',
      text: 'Does your career path typically require internships before you can get hired?',
      options: ['Yes — internships are almost required', 'They help significantly', 'They help but aren\'t required', 'I don\'t know'],
    },
    {
      id: 'sc_05', subsection: 'C1', type: 'text',
      text: 'Name one specific company, team, or organization where you would want to work in your career. What do you know about how people actually get hired there?',
    },
    {
      id: 'sc_06', subsection: 'C1', type: 'multiple',
      text: 'How long does it typically take — from starting college — to reach a good salary in your field?',
      options: ['2–3 years after graduation', '3–5 years after graduation', '5–8 years after graduation', 'I honestly don\'t know'],
    },
    {
      id: 'sc_07', subsection: 'C2', type: 'slider',
      text: 'How willing are you to do the boring, hard, unglamorous early work — internships, entry level, proving yourself — to build toward the career you want?',
      min: 1, max: 10,
    },
    {
      id: 'sc_08', subsection: 'C2', type: 'multiple',
      text: 'Are you willing to compete — against hundreds or thousands of other qualified candidates — for the career you want?',
      options: ['Yes — competition motivates me', 'Yes — though it intimidates me', 'I\'m not sure I know how to compete in this field', 'Honestly, that sounds overwhelming'],
    },
    {
      id: 'sc_09', subsection: 'C2', type: 'text',
      text: 'What is the one skill you know you need to develop that stands between you and the career you want? Be specific.',
    },
    {
      id: 'sc_10', subsection: 'C2', type: 'multiple',
      text: 'Have you started building anything related to your career — a portfolio, a project, a network connection, any experience at all?',
      options: ['Yes — I have concrete things to show', 'I\'ve started something small', 'Not yet but I know what I need to build', 'No — I haven\'t started anything'],
    },
    {
      id: 'sc_11', subsection: 'C2', type: 'text',
      text: 'What is the most realistic obstacle between you and your career — not a generic answer, but your specific situation?',
    },
    {
      id: 'sc_12', subsection: 'C2', type: 'text',
      text: 'If you could shadow someone in your dream career for one week — just watch and learn — what is the one thing you\'d most want to understand about how they got there?',
    },
  ],
};

// ─── SECTION D: MOTIVATION ALIGNMENT ─────────────────────────────────────────

export const SECTION_D = {
  id: 'sectionD',
  title: 'Motivation Alignment',
  subtitle: 'Are your daily actions matching your goals?',
  subsections: ['Goal vs. Behavior'],
  questions: [
    {
      id: 'sd_01', subsection: 'D1', type: 'multiple',
      text: 'How often do you attend class or show up to your commitments?',
      options: ['Every time — I don\'t miss', 'Most of the time', 'Sometimes — I miss more than I should', 'I\'ve been checked out — I\'m not showing up'],
    },
    {
      id: 'sd_02', subsection: 'D1', type: 'multiple',
      text: 'When an assignment or task is difficult or confusing, what do you do?',
      options: ['Push through and figure it out', 'Ask for help', 'Do part of it and stop', 'Avoid it and hope it goes away'],
    },
    {
      id: 'sd_03', subsection: 'D1', type: 'multiple',
      text: 'How often do you finish assignments, even when they are hard?',
      options: ['Almost always', 'Usually', 'Sometimes', 'Rarely — if it\'s hard I usually don\'t finish'],
    },
    {
      id: 'sd_04', subsection: 'D1', type: 'multiple',
      text: 'How often do you ask for help when you\'re confused — from a teacher, tutor, or classmate?',
      options: ['Regularly — I ask when I need to', 'Occasionally', 'Rarely — I try to figure it out alone', 'Never — I don\'t ask for help'],
    },
    {
      id: 'sd_05', subsection: 'D1', type: 'multiple',
      text: 'How serious is your procrastination problem?',
      options: ['Minimal — I stay on top of things', 'Some — I procrastinate occasionally', 'Significant — it affects most of my work', 'Severe — almost everything gets delayed'],
    },
    {
      id: 'sd_06', subsection: 'D1', type: 'slider',
      text: 'On a scale of 1–10, how much real effort are you putting into your education or career right now?',
      min: 1, max: 10,
    },
    {
      id: 'sd_07', subsection: 'D1', type: 'slider',
      text: 'How big is the gap between the life you want and the effort you are currently putting in?',
      min: 1, max: 10,
      note: '1 = Almost no gap, 10 = Massive gap',
    },
    {
      id: 'sd_08', subsection: 'D1', type: 'multiple',
      text: 'If someone tracked your daily habits for the last 30 days — your attendance, your effort, your follow-through — would those habits produce the career you described?',
      options: ['Yes — I\'m putting in real work', 'Mostly — with some gaps', 'No — there\'s a clear gap', 'Definitely not — I know I\'m not where I need to be'],
    },
    {
      id: 'sd_09', subsection: 'D1', type: 'text',
      text: 'The life you described — the career, the income, the lifestyle — what would your daily routine need to look like to actually get there? Describe it honestly.',
    },
    {
      id: 'sd_10', subsection: 'D1', type: 'text',
      text: 'What is the single biggest thing getting in the way of your effort right now — the real answer, not the easy one?',
    },
    {
      id: 'sd_11', subsection: 'D1', type: 'multiple',
      text: 'Do you still want the life you described at the beginning of this assessment?',
      options: ['Yes — 100%. That\'s the life I want.', 'Yes — but I\'m scared I won\'t get there', 'I\'m not sure anymore', 'I described what I thought I should say — I\'m still figuring out what I actually want'],
    },
    {
      id: 'sd_12', subsection: 'D1', type: 'text',
      text: 'Is the life you want worth the effort it will take to get there? Answer that honestly — not the answer you think you should give.',
    },
  ],
};

// ─── SECTION E: RESPONSIBILITY & MATURITY ────────────────────────────────────

export const SECTION_E = {
  id: 'sectionE',
  title: 'Responsibility & Maturity',
  subtitle: 'Honesty, discipline, follow-through, and independence',
  subsections: ['Honesty', 'Discipline', 'Follow-Through', 'Independence', 'Problem Solving'],
  questions: [
    // Honesty
    {
      id: 'se_01', subsection: 'E1', type: 'slider',
      text: 'How honest are you — really — with the people who love you about what\'s actually going on in your life?',
      min: 1, max: 10,
    },
    {
      id: 'se_02', subsection: 'E1', type: 'multiple',
      text: 'When you are behind, failing, or struggling — what do you do?',
      options: ['I tell someone immediately', 'I wait until it gets bad, then tell someone', 'I hide it and try to fix it alone', 'I hide it and do nothing'],
    },
    {
      id: 'se_03', subsection: 'E1', type: 'multiple',
      text: 'Have you ever let someone believe something about your situation that wasn\'t true?',
      options: ['Yes — it\'s a real pattern for me', 'It\'s happened but it\'s not a habit', 'Very rarely', 'No — I\'m always honest'],
    },
    {
      id: 'se_04', subsection: 'E1', type: 'text',
      text: 'What is one thing happening in your life right now that you haven\'t been fully honest about — with yourself or someone else?',
    },
    // Discipline
    {
      id: 'se_05', subsection: 'E2', type: 'slider',
      text: 'How disciplined are you when nobody is watching — when there\'s no accountability, no one checking?',
      min: 1, max: 10,
    },
    {
      id: 'se_06', subsection: 'E2', type: 'multiple',
      text: 'How consistent are you with daily habits — sleep schedule, showing up on time, completing tasks?',
      options: ['Very consistent — I have a real routine', 'Mostly consistent', 'Inconsistent — my habits change a lot', 'I have no real routine right now'],
    },
    {
      id: 'se_07', subsection: 'E2', type: 'multiple',
      text: 'How do you handle money when you have it?',
      options: ['I budget and save intentionally', 'I save some and spend some', 'I spend most of it', 'It\'s usually gone quickly'],
    },
    {
      id: 'se_08', subsection: 'E2', type: 'slider',
      text: 'How well do you manage your time — planning, prioritizing, and executing?',
      min: 1, max: 10,
    },
    // Follow-Through
    {
      id: 'se_09', subsection: 'E3', type: 'multiple',
      text: 'When you make a commitment — to yourself or someone else — how often do you follow through?',
      options: ['Almost always', 'Most of the time', 'Sometimes', 'I struggle with follow-through consistently'],
    },
    {
      id: 'se_10', subsection: 'E3', type: 'text',
      text: 'Name one thing you said you would do in the last 60 days that you didn\'t do. What got in the way?',
    },
    {
      id: 'se_11', subsection: 'E3', type: 'multiple',
      text: 'When something gets hard or confusing, what is your most common response?',
      options: ['I push through it', 'I get help', 'I delay it', 'I stop and move on'],
    },
    {
      id: 'se_12', subsection: 'E3', type: 'slider',
      text: 'How much do you trust your own word — when you say you\'ll do something, how confident are you that you\'ll actually do it?',
      min: 1, max: 10,
    },
    // Independence
    {
      id: 'se_13', subsection: 'E4', type: 'slider',
      text: 'How independent are you right now — managing your own schedule, responsibilities, finances, and health without being reminded?',
      min: 1, max: 10,
    },
    {
      id: 'se_14', subsection: 'E4', type: 'multiple',
      text: 'How well can you navigate systems you\'re not familiar with — online portals, financial aid, medical appointments?',
      options: ['Very well — I figure it out', 'Okay — I manage with some effort', 'I struggle with unfamiliar systems', 'I usually avoid them or ask someone else'],
    },
    {
      id: 'se_15', subsection: 'E4', type: 'multiple',
      text: 'When you don\'t understand how to do something important, what do you do?',
      options: ['Research it and figure it out', 'Ask someone right away', 'Try for a while then ask', 'Avoid it until forced to deal with it'],
    },
    // Problem Solving
    {
      id: 'se_16', subsection: 'E5', type: 'multiple',
      text: 'When something goes wrong in your life — a failure, a missed deadline, a mistake — what is your first instinct?',
      options: ['Own it and figure out what to change', 'Reflect on it, then move forward', 'Look for reasons it wasn\'t my fault', 'Avoid thinking about it'],
    },
    {
      id: 'se_17', subsection: 'E5', type: 'slider',
      text: 'How resilient are you — when things fall apart, how well do you bounce back?',
      min: 1, max: 10,
    },
    {
      id: 'se_18', subsection: 'E5', type: 'text',
      text: 'Describe a time when you faced a real problem and handled it well. What did you do?',
    },
    {
      id: 'se_19', subsection: 'E5', type: 'text',
      text: 'What is one area of your life where you know you need to be more responsible — and what specifically needs to change?',
    },
    {
      id: 'se_20', subsection: 'E5', type: 'slider',
      text: 'Overall — how mature and responsible do you think you are right now compared to where you need to be for the life you want?',
      min: 1, max: 10,
    },
  ],
};

// ─── SECTION F: CONFIDENCE & EMOTIONAL READINESS ─────────────────────────────

export const SECTION_F = {
  id: 'sectionF',
  title: 'Confidence & Emotional Readiness',
  subtitle: 'How you handle pressure, fear, and hard moments',
  subsections: ['Confidence', 'Fear & Avoidance', 'Stress & Support'],
  questions: [
    {
      id: 'sf_01', subsection: 'F1', type: 'slider',
      text: 'How confident are you in your ability to succeed in school right now?',
      min: 1, max: 10,
    },
    {
      id: 'sf_02', subsection: 'F1', type: 'slider',
      text: 'How confident are you in your ability to build the career you described?',
      min: 1, max: 10,
    },
    {
      id: 'sf_03', subsection: 'F1', type: 'multiple',
      text: 'How often does fear of failing stop you from trying something?',
      options: ['Rarely — I try even when I might fail', 'Sometimes — I hesitate but usually try', 'Often — fear of failing holds me back regularly', 'Very often — I don\'t try things I might fail at'],
    },
    {
      id: 'sf_04', subsection: 'F1', type: 'multiple',
      text: 'When you\'re overwhelmed by a task or situation, what do you usually do?',
      options: ['Break it into steps and start', 'Ask for help', 'Procrastinate until I have no choice', 'Shut down and disengage completely'],
    },
    {
      id: 'sf_05', subsection: 'F1', type: 'slider',
      text: 'How comfortable are you asking for help when you don\'t understand something — in school, at home, or anywhere?',
      min: 1, max: 10,
    },
    {
      id: 'sf_06', subsection: 'F2', type: 'multiple',
      text: 'How much does social anxiety affect your daily life?',
      options: ['Minimal — I\'m generally comfortable around people', 'Some — certain situations are hard', 'Significant — social situations are consistently difficult', 'Severe — I avoid most social situations'],
    },
    {
      id: 'sf_07', subsection: 'F2', type: 'multiple',
      text: 'How often do you avoid something important because it makes you anxious?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very often — avoidance is a real pattern for me'],
    },
    {
      id: 'sf_08', subsection: 'F2', type: 'text',
      text: 'What is the thing you avoid most often because it makes you anxious, uncomfortable, or afraid? Name it specifically.',
    },
    {
      id: 'sf_09', subsection: 'F2', type: 'slider',
      text: 'How well do you handle stress before it becomes overwhelming?',
      min: 1, max: 10,
    },
    {
      id: 'sf_10', subsection: 'F3', type: 'multiple',
      text: 'When you are struggling — really struggling — what do you actually do?',
      options: ['Talk to someone I trust', 'Try to handle it alone', 'Withdraw and go quiet', 'Distract myself with phone or entertainment'],
    },
    {
      id: 'sf_11', subsection: 'F3', type: 'text',
      text: 'Have you ever not done something — stopped going, stopped trying — because you got overwhelmed and didn\'t know how to ask for help? Describe it.',
    },
    {
      id: 'sf_12', subsection: 'F3', type: 'slider',
      text: 'How supported do you feel right now — like someone has your back and is in your corner?',
      min: 1, max: 10,
    },
    {
      id: 'sf_13', subsection: 'F3', type: 'text',
      text: 'What would make you feel more confident right now — not in a vague way, but specifically? What would change?',
    },
    {
      id: 'sf_14', subsection: 'F3', type: 'multiple',
      text: 'Do you believe you are capable of achieving the life you described in this assessment?',
      options: ['Yes — completely', 'Yes — with the right support', 'I hope so but I\'m not sure', 'I\'m scared it won\'t happen for me'],
    },
  ],
};

// ─── SECTION G: PARENT SUPPORT NEEDS ─────────────────────────────────────────

export const SECTION_G = {
  id: 'sectionG',
  title: 'What I Need From Mom',
  subtitle: 'Help her understand how to support you the right way',
  subsections: ['Communication', 'Support Style'],
  note: 'Your answers in this section go directly to your mom — privately. This is your chance to tell her what actually helps.',
  questions: [
    {
      id: 'sg_01', subsection: 'G1', type: 'multiple',
      text: 'What kind of reminders help you most?',
      options: ['A text — short and simple', 'A phone call to check in', 'A conversation in person', 'No reminders — they add pressure'],
    },
    {
      id: 'sg_02', subsection: 'G1', type: 'multiple',
      text: 'What kind of conversations from your mom shut you down — make you go quiet or pull away?',
      options: ['When she brings up failures or mistakes', 'When she asks too many questions at once', 'When she sounds disappointed or frustrated', 'When I feel like I have to explain myself'],
    },
    {
      id: 'sg_03', subsection: 'G1', type: 'text',
      text: 'Describe the way your mom talks to you that makes you feel most heard and supported — even if it doesn\'t happen often.',
    },
    {
      id: 'sg_04', subsection: 'G1', type: 'multiple',
      text: 'When do you most need encouragement from her?',
      options: ['When I\'m overwhelmed and shutting down', 'When I\'ve made a mistake', 'When I\'m about to do something hard', 'I don\'t really need encouragement — I need space'],
    },
    {
      id: 'sg_05', subsection: 'G1', type: 'multiple',
      text: 'What does support from your mom look like when it actually helps you?',
      options: ['She gives me space and trusts me', 'She checks in but doesn\'t pressure me', 'She helps me make a plan', 'She just listens without trying to fix it'],
    },
    {
      id: 'sg_06', subsection: 'G2', type: 'text',
      text: 'What do you wish your mom understood about why it\'s hard for you to talk to her sometimes?',
    },
    {
      id: 'sg_07', subsection: 'G2', type: 'text',
      text: 'What is one thing you need from her right now that you haven\'t been able to say out loud?',
    },
    {
      id: 'sg_08', subsection: 'G2', type: 'multiple',
      text: 'How often would you want your mom to check in on your progress?',
      options: ['Every day', 'A few times a week', 'Once a week', 'Only when I reach out'],
    },
    {
      id: 'sg_09', subsection: 'G2', type: 'text',
      text: 'If your mom could change one thing about how she communicates with you — what would you ask her to change?',
    },
    {
      id: 'sg_10', subsection: 'G2', type: 'text',
      text: 'What do you want her to know about who you are — something she might not fully see yet?',
    },
  ],
};

// ─── SECTION H: ACCOUNTABILITY COMMITMENT ────────────────────────────────────

export const SECTION_H = {
  id: 'sectionH',
  title: 'Accountability Commitment',
  subtitle: 'Are you willing to commit to change?',
  subsections: ['Commitment'],
  questions: [
    {
      id: 'sh_01', subsection: 'H1', type: 'multiple',
      text: 'Are you willing to ask for help immediately when you are confused — in school, in a task, or in life — instead of going silent?',
      options: ['Yes — I commit to this', 'I want to but it\'s hard for me', 'I\'m not sure I can do this consistently', 'No — I\'m not ready for this'],
    },
    {
      id: 'sh_02', subsection: 'H1', type: 'multiple',
      text: 'Are you willing to be honest when you fall behind — with your mom, your advisor, or whoever is supporting you — instead of hiding it?',
      options: ['Yes — I commit to this', 'I want to but honesty is hard for me', 'I\'m working on it', 'I\'m not confident I can do this yet'],
    },
    {
      id: 'sh_03', subsection: 'H1', type: 'multiple',
      text: 'Are you willing to follow a structured weekly plan — showing up, completing tasks, hitting check-in points — even when you don\'t feel like it?',
      options: ['Yes — I\'m ready for structure', 'Probably — with the right support', 'I\'ll try but I struggle with structure', 'Structure has never worked for me'],
    },
    {
      id: 'sh_04', subsection: 'H1', type: 'multiple',
      text: 'Are you willing to accept accountability — someone checking your grades, your attendance, your follow-through — without shutting down or getting defensive?',
      options: ['Yes — I welcome it', 'Yes — if it\'s done with respect', 'I\'m uncomfortable with it but I\'ll try', 'That feels like too much pressure right now'],
    },
    {
      id: 'sh_05', subsection: 'H1', type: 'slider',
      text: 'On a scale of 1–10, how committed are you right now to doing what it takes to build the life you described?',
      min: 1, max: 10,
    },
    {
      id: 'sh_06', subsection: 'H1', type: 'text',
      text: 'What is one specific commitment you are willing to make right now — something real and actionable, not vague?',
    },
    {
      id: 'sh_07', subsection: 'H1', type: 'multiple',
      text: 'What is the biggest reason you might not follow through on what you just committed to?',
      options: ['Getting overwhelmed and shutting down', 'Losing motivation when things get hard', 'Not having enough structure or accountability', 'Fear of failing even when I try'],
    },
    {
      id: 'sh_08', subsection: 'H1', type: 'text',
      text: 'What would need to be in place — what support, what structure, what change — for you to actually keep the commitment you just made?',
    },
  ],
};

// ─── SECTION I: WORDS TO MY FUTURE SELF ──────────────────────────────────────

export const SECTION_I = {
  id: 'sectionI',
  title: 'Words to My Future Self',
  subtitle: 'A message from who you are now to who you\'re becoming',
  subsections: ['Future Self Letter'],
  questions: [
    {
      id: 'si_01', subsection: 'I1', type: 'text',
      text: 'What do you want to remember about this moment — right now, where you are, what you\'re feeling — that future you should never forget?',
    },
    {
      id: 'si_02', subsection: 'I1', type: 'text',
      text: 'What do you want to say to yourself at age 25? Write it like a letter — not a list, a real message.',
    },
    {
      id: 'si_03', subsection: 'I1', type: 'text',
      text: 'What is the one thing you are most afraid of? And what would you say to yourself when that fear shows up?',
    },
    {
      id: 'si_04', subsection: 'I1', type: 'text',
      text: 'If future you — the version who made it — could send one message back to you right now, what do you think they would say?',
    },
    {
      id: 'si_05', subsection: 'I1', type: 'text',
      text: 'What do you want to prove — to yourself, not to anyone else?',
    },
    {
      id: 'si_06', subsection: 'I1', type: 'text',
      text: 'Write the last line of your story — the one sentence about your life that you want to be true when you look back at 50.',
    },
  ],
};

// ─── MINI ASSESSMENT (Monthly — 16th of each month) ──────────────────────────

export const MINI_ASSESSMENT = {
  id: 'mini',
  title: 'Monthly Check-In',
  subtitle: 'A quick pulse on where you are this month',
  questions: [
    {
      id: 'mi_01', type: 'slider',
      text: 'This month — how motivated are you toward your goals right now?',
      min: 1, max: 10,
    },
    {
      id: 'mi_02', type: 'multiple',
      text: 'Do you still want the life you described in your last assessment?',
      options: ['Yes — 100%', 'Yes but my thinking has evolved', 'I\'m questioning some of it', 'I want to update my goals'],
    },
    {
      id: 'mi_03', type: 'slider',
      text: 'How aligned is your daily effort with your goals this month?',
      min: 1, max: 10,
    },
    {
      id: 'mi_04', type: 'multiple',
      text: 'How is your emotional state this month — overall?',
      options: ['Good — I feel positive and energized', 'Okay — getting through it', 'Struggling — things feel heavy', 'Really hard — I need support'],
    },
    {
      id: 'mi_05', type: 'text',
      text: 'What is the most important thing that happened this month — good or bad — related to your goals?',
    },
    {
      id: 'mi_06', type: 'text',
      text: 'What is one thing you want to do differently next month?',
    },
    {
      id: 'mi_07', type: 'slider',
      text: 'How close do you feel to the career vision you described in your last full assessment?',
      min: 1, max: 10,
    },
    {
      id: 'mi_08', type: 'text',
      text: 'What do you need from your support system right now that you\'re not getting?',
    },
  ],
};

// ─── SECTION MANIFEST BY USER ────────────────────────────────────────────────

export const USER_SECTIONS = {
  mekhi: [
    MK1, MK2, MK3, MK4, MK5,
    MK6, MK7, MK8, MK9, MK10,
  ],
  melvin: [
    MELVIN_SECTION_1,
    MELVIN_SECTION_2,
    MELVIN_SECTION_3,
    MELVIN_SECTION_4,
    MELVIN_SECTION_5,
    MELVIN_SECTION_6,
    MS7, MS8, MS9, MS10, MS11,
  ],
};

