import { db } from '../firebase';
import {
  doc,
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore';

// ─── Sessions ─────────────────────────────────────────────────────────────────

export async function createSession(userId) {
  const sessionsRef = collection(db, 'users', userId, 'sessions');
  const sessionDoc = await addDoc(sessionsRef, {
    createdAt: serverTimestamp(),
    status: 'in_progress',
    currentSection: 0,
    currentQuestion: 0,
  });
  return sessionDoc.id;
}

export async function updateSessionProgress(userId, sessionId, data) {
  const sessionRef = doc(db, 'users', userId, 'sessions', sessionId);
  await updateDoc(sessionRef, { ...data, updatedAt: serverTimestamp() });
}

export async function completeSession(userId, sessionId, results) {
  const sessionRef = doc(db, 'users', userId, 'sessions', sessionId);
  await updateDoc(sessionRef, {
    status: 'complete',
    completedAt: serverTimestamp(),
    results,
    updatedAt: serverTimestamp(),
  });
}

export async function getSession(userId, sessionId) {
  const sessionRef = doc(db, 'users', userId, 'sessions', sessionId);
  const snap = await getDoc(sessionRef);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function getAllSessions(userId) {
  const sessionsRef = collection(db, 'users', userId, 'sessions');
  const q = query(sessionsRef, orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getLatestCompletedSession(userId) {
  const sessionsRef = collection(db, 'users', userId, 'sessions');
  const q = query(sessionsRef, orderBy('createdAt', 'desc'), limit(10));
  const snap = await getDocs(q);
  const completed = snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .filter(s => s.status === 'complete');
  return completed[0] || null;
}

// ─── Answers ──────────────────────────────────────────────────────────────────

export async function saveAnswer(userId, sessionId, questionId, answer) {
  const answerRef = doc(db, 'users', userId, 'sessions', sessionId, 'answers', questionId);
  await setDoc(answerRef, {
    questionId,
    answer,
    savedAt: serverTimestamp(),
  });
}

export async function getAllAnswers(userId, sessionId) {
  const answersRef = collection(db, 'users', userId, 'sessions', sessionId, 'answers');
  const snap = await getDocs(answersRef);
  const answers = {};
  snap.docs.forEach(d => {
    answers[d.data().questionId] = d.data().answer;
  });
  return answers;
}

// ─── Daily Check-Ins ──────────────────────────────────────────────────────────

export async function saveDailyCheckin(userId, answers) {
  const checkinRef = collection(db, 'users', userId, 'checkins');
  await addDoc(checkinRef, {
    answers,
    createdAt: serverTimestamp(),
  });
}

export async function getRecentCheckins(userId, count = 7) {
  const checkinRef = collection(db, 'users', userId, 'checkins');
  const q = query(checkinRef, orderBy('createdAt', 'desc'), limit(count));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export function subscribeToCheckins(userId, callback) {
  const checkinRef = collection(db, 'users', userId, 'checkins');
  const q = query(checkinRef, orderBy('createdAt', 'desc'), limit(7));
  return onSnapshot(q, snap => {
    const checkins = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(checkins);
  });
}

// ─── Mom Dashboard ────────────────────────────────────────────────────────────

export async function saveMomDashboard(content) {
  const dashRef = doc(db, 'momDashboard', 'overview');
  await setDoc(dashRef, {
    content,
    updatedAt: serverTimestamp(),
  });
}

export async function getMomDashboardData() {
  const dashRef = doc(db, 'momDashboard', 'overview');
  const snap = await getDoc(dashRef);
  return snap.exists() ? snap.data() : null;
}

// ─── Mom Son Scripts ──────────────────────────────────────────────────────────
// Firestore path: momScripts/{userId}

export async function saveMomScript(userId, scriptData) {
  const ref = doc(db, 'momScripts', userId);
  await setDoc(ref, { ...scriptData, updatedAt: serverTimestamp() });
}

export async function getMomScript(userId) {
  const ref = doc(db, 'momScripts', userId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

// ─── User Profile ─────────────────────────────────────────────────────────────

export async function saveUserProfile(userId, profile) {
  const profileRef = doc(db, 'users', userId, 'meta', 'profile');
  await setDoc(profileRef, { ...profile, updatedAt: serverTimestamp() }, { merge: true });
}

export async function getUserProfile(userId) {
  const profileRef = doc(db, 'users', userId, 'meta', 'profile');
  const snap = await getDoc(profileRef);
  return snap.exists() ? snap.data() : null;
}

// ─── Session Scores ───────────────────────────────────────────────────────────

export async function saveSessionScores(userId, sessionId, scores) {
  const scoresRef = doc(db, 'users', userId, 'sessions', sessionId, 'meta', 'scores');
  await setDoc(scoresRef, { ...scores, savedAt: serverTimestamp() });
}

export async function getSessionScores(userId, sessionId) {
  const scoresRef = doc(db, 'users', userId, 'sessions', sessionId, 'meta', 'scores');
  const snap = await getDoc(scoresRef);
  return snap.exists() ? snap.data() : null;
}

// ─── Weekly Resets ────────────────────────────────────────────────────────────

export async function saveWeeklyReset(userId, resetData) {
  const ref = collection(db, 'users', userId, 'weeklyResets');
  await addDoc(ref, { ...resetData, createdAt: serverTimestamp() });
}

export async function getWeeklyResets(userId, count = 4) {
  const ref = collection(db, 'users', userId, 'weeklyResets');
  const q = query(ref, orderBy('createdAt', 'desc'), limit(count));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ─── Non-blocking session completion ─────────────────────────────────────────
// Call this immediately when the user finishes the assessment,
// before AI generation starts. Marks status=complete so mom can see it instantly.

export async function completeSessionImmediate(userId, sessionId) {
  const sessionRef = doc(db, 'users', userId, 'sessions', sessionId);
  await updateDoc(sessionRef, {
    status: 'complete',
    analysisStatus: 'pending',
    blueprintStatus: 'pending',
    completedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

// ─── Write AI generation result back to Firebase ──────────────────────────────
// fields: { analysis, analysisStatus, blueprintStatus, analysisError, analysisCompletedAt }

export async function saveAnalysisResult(userId, sessionId, fields) {
  const sessionRef = doc(db, 'users', userId, 'sessions', sessionId);
  // Also mirror to legacy `results` field so existing mom-dashboard reads still work
  const payload = { ...fields, updatedAt: serverTimestamp() };
  if (fields.analysis) payload.results = fields.analysis;
  await updateDoc(sessionRef, payload);
}

// ─── Last Activity ────────────────────────────────────────────────────────────

export async function getLastActivity(userId) {
  const sessions = await getAllSessions(userId);
  if (sessions.length === 0) return null;
  const latest = sessions[0];
  const ts = latest.updatedAt || latest.createdAt;
  if (!ts) return null;
  return ts.toDate ? ts.toDate() : new Date(ts);
}
