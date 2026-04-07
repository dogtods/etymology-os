// ============================================
// Etymology OS Engine — localStorage Manager
// ============================================

const STORAGE_KEY = 'etymology-os';

const defaultState = {
  quizScore: 0,
  streak: 0,
  bestStreak: 0,
  totalAnswered: 0,
  totalCorrect: 0,
  wordMastery: {},   // { word: { correct: n, attempts: n, lastSeen: timestamp } }
  rootMastery: {},   // { root: { correct: n, attempts: n } }
  quizHistory: [],   // [{ word, stepResults: [...], timestamp }]
  settings: {
    showHints: true,
    difficulty: 'all',  // 'all', 1, 2, 3, 4, 5
    aiMode: false,
    apiKey: ''
  }
};

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultState };
    const parsed = JSON.parse(raw);
    return { ...defaultState, ...parsed };
  } catch (e) {
    console.warn('Failed to load state:', e);
    return { ...defaultState };
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save state:', e);
  }
}

export function updateWordMastery(word, correct) {
  const state = loadState();
  if (!state.wordMastery[word]) {
    state.wordMastery[word] = { correct: 0, attempts: 0, lastSeen: null };
  }
  state.wordMastery[word].attempts += 1;
  if (correct) state.wordMastery[word].correct += 1;
  state.wordMastery[word].lastSeen = Date.now();
  saveState(state);
  return state.wordMastery[word];
}

export function updateRootMastery(root, correct) {
  const state = loadState();
  if (!state.rootMastery[root]) {
    state.rootMastery[root] = { correct: 0, attempts: 0 };
  }
  state.rootMastery[root].attempts += 1;
  if (correct) state.rootMastery[root].correct += 1;
  saveState(state);
  return state.rootMastery[root];
}

export function getWordMasteryLevel(word) {
  const state = loadState();
  const mastery = state.wordMastery[word];
  if (!mastery || mastery.attempts === 0) return 0;
  return mastery.correct / mastery.attempts;
}

export function getRootMasteryLevel(root) {
  const state = loadState();
  const mastery = state.rootMastery[root];
  if (!mastery || mastery.attempts === 0) return 0;
  return mastery.correct / mastery.attempts;
}

export function addQuizResult(result) {
  const state = loadState();
  state.quizHistory.push({ ...result, timestamp: Date.now() });
  // Keep last 500 entries
  if (state.quizHistory.length > 500) {
    state.quizHistory = state.quizHistory.slice(-500);
  }
  saveState(state);
}

export function updateScore(points) {
  const state = loadState();
  state.quizScore += points;
  state.totalAnswered += 1;
  if (points > 0) {
    state.totalCorrect += 1;
    state.streak += 1;
    if (state.streak > state.bestStreak) {
      state.bestStreak = state.streak;
    }
  } else {
    state.streak = 0;
  }
  saveState(state);
  return state;
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
  return { ...defaultState };
}

export function getStats() {
  const state = loadState();
  const wordsStudied = Object.keys(state.wordMastery).length;
  const accuracy = state.totalAnswered > 0
    ? Math.round((state.totalCorrect / state.totalAnswered) * 100)
    : 0;
  return {
    score: state.quizScore,
    streak: state.streak,
    bestStreak: state.bestStreak,
    wordsStudied,
    totalAnswered: state.totalAnswered,
    accuracy,
    settings: state.settings
  };
}

export function getApiKey() {
  const state = loadState();
  return state.settings?.apiKey || '';
}

export function setApiKey(key) {
  const state = loadState();
  if (!state.settings) state.settings = {};
  state.settings.apiKey = key;
  saveState(state);
}

export function getAiMode() {
  const state = loadState();
  return state.settings?.aiMode || false;
}

export function setAiMode(enabled) {
  const state = loadState();
  if (!state.settings) state.settings = {};
  state.settings.aiMode = enabled;
  saveState(state);
}
