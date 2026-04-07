// ============================================
// Etymology OS Engine — App Controller
// ============================================

import { initDecomposition, decomposeFromExternal } from './modules/decomposition.js';
import { initNetwork, navigateToRoot } from './modules/network.js';
import { initQuiz } from './modules/quiz.js';
import { initDrift } from './modules/drift.js';
import { getStats, getApiKey, setApiKey } from './utils/storage.js';

let currentTab = 'decompose';
const tabs = ['decompose', 'network', 'quiz', 'drift'];

export function initApp() {
  initTabNavigation();
  initSettingsModal();
  updateStatsBar();

  // Initialize the default tab
  switchTab('decompose');

  // Listen for cross-module navigation
  document.addEventListener('navigate-decompose', (e) => {
    const { word } = e.detail;
    switchTab('decompose');
    setTimeout(() => decomposeFromExternal(word), 100);
  });

  document.addEventListener('navigate-network', (e) => {
    const { root } = e.detail;
    switchTab('network');
    setTimeout(() => navigateToRoot(root), 100);
  });

  // Periodic stats update
  setInterval(updateStatsBar, 5000);
}

function initTabNavigation() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      if (tab) switchTab(tab);
    });
  });
}

function initSettingsModal() {
  const settingsBtn = document.getElementById('settings-btn');
  const modal = document.getElementById('settings-modal');
  const closeBtn = document.getElementById('settings-close');
  const saveBtn = document.getElementById('settings-save-btn');
  const inputEl = document.getElementById('settings-api-key');

  if (!modal) return;

  function openModal() {
    inputEl.value = getApiKey();
    modal.classList.add('active');
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  settingsBtn?.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  
  saveBtn?.addEventListener('click', () => {
    setApiKey(inputEl.value.trim());
    closeModal();
    // Optional: show a toast here if we export showToast from ui.js
  });

  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

function switchTab(tabId) {
  if (!tabs.includes(tabId)) return;
  currentTab = tabId;

  // Update nav buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  // Show/hide sections
  document.querySelectorAll('.section').forEach(sec => {
    sec.classList.toggle('active', sec.id === `section-${tabId}`);
  });

  // Lazy-initialize modules
  initModuleIfNeeded(tabId);

  updateStatsBar();
}

const initializedModules = new Set();

function initModuleIfNeeded(tabId) {
  if (initializedModules.has(tabId)) return;
  initializedModules.add(tabId);

  switch (tabId) {
    case 'decompose':
      initDecomposition();
      break;
    case 'network':
      // Small delay to ensure DOM is visible for sizing
      setTimeout(() => initNetwork(), 50);
      break;
    case 'quiz':
      initQuiz();
      break;
    case 'drift':
      initDrift();
      break;
  }
}

function updateStatsBar() {
  const stats = getStats();

  const scoreEl = document.getElementById('stat-score');
  const wordsEl = document.getElementById('stat-words');
  const accuracyEl = document.getElementById('stat-accuracy');
  const streakEl = document.getElementById('stat-streak');

  if (scoreEl) scoreEl.textContent = stats.score;
  if (wordsEl) wordsEl.textContent = stats.wordsStudied;
  if (accuracyEl) accuracyEl.textContent = `${stats.accuracy}%`;
  if (streakEl) streakEl.textContent = stats.bestStreak;
}

// Boot
document.addEventListener('DOMContentLoaded', initApp);
