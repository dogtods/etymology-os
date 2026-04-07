// ============================================
// Etymology OS Engine — Semantic Drift Module
// ============================================

import { WORDS } from '../data/words.js';
import { getDriftCategory } from '../utils/ui.js';

let currentFilter = 'all'; // 'all', 'high', 'medium', 'low'
let currentPage = 0;
const PAGE_SIZE = 6;

export function initDrift() {
  renderDriftControls();
  renderDriftCards();
}

function renderDriftControls() {
  const controls = document.getElementById('drift-controls');
  if (!controls) return;

  controls.innerHTML = `
    <div style="display: flex; gap: var(--sp-2); flex-wrap: wrap;">
      <button class="btn btn-secondary drift-filter active" data-filter="all">📊 すべて</button>
      <button class="btn btn-secondary drift-filter" data-filter="high">🔴 大きな変化</button>
      <button class="btn btn-secondary drift-filter" data-filter="medium">🟡 中程度</button>
      <button class="btn btn-secondary drift-filter" data-filter="low">🟢 ほぼ一致</button>
    </div>
  `;

  controls.addEventListener('click', (e) => {
    const btn = e.target.closest('.drift-filter');
    if (btn) {
      controls.querySelectorAll('.drift-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      currentPage = 0;
      renderDriftCards();
    }
  });
}

function getFilteredWords() {
  return Object.entries(WORDS)
    .map(([word, data]) => ({
      word,
      ...data,
      driftCategory: getDriftCategory(data.semanticDrift)
    }))
    .filter(item => {
      if (currentFilter === 'all') return true;
      return item.driftCategory.level === currentFilter;
    })
    .sort((a, b) => b.semanticDrift - a.semanticDrift);
}

function renderDriftCards() {
  const container = document.getElementById('drift-cards');
  if (!container) return;

  const items = getFilteredWords();
  const paged = items.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(items.length / PAGE_SIZE);

  if (paged.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📭</div>
        <div class="empty-state-text">該当する単語がありません。</div>
      </div>
    `;
    return;
  }

  container.innerHTML = paged.map((item, i) => renderSingleDriftCard(item, i)).join('');

  // Pagination
  const paginationEl = document.getElementById('drift-pagination');
  if (paginationEl && totalPages > 1) {
    paginationEl.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; gap: var(--sp-3); margin-top: var(--sp-6);">
        <button class="btn btn-ghost" id="drift-prev" ${currentPage === 0 ? 'disabled' : ''}>← 前へ</button>
        <span style="font-size: var(--text-sm); color: var(--text-muted);">${currentPage + 1} / ${totalPages}</span>
        <button class="btn btn-ghost" id="drift-next" ${currentPage >= totalPages - 1 ? 'disabled' : ''}>次へ →</button>
      </div>
    `;

    document.getElementById('drift-prev')?.addEventListener('click', () => {
      if (currentPage > 0) { currentPage--; renderDriftCards(); }
    });
    document.getElementById('drift-next')?.addEventListener('click', () => {
      if (currentPage < totalPages - 1) { currentPage++; renderDriftCards(); }
    });
  }

  // Stats summary
  const statsEl = document.getElementById('drift-stats');
  if (statsEl) {
    const highCount = Object.values(WORDS).filter(w => w.semanticDrift >= 0.6).length;
    const medCount = Object.values(WORDS).filter(w => w.semanticDrift >= 0.3 && w.semanticDrift < 0.6).length;
    const lowCount = Object.values(WORDS).filter(w => w.semanticDrift < 0.3).length;

    statsEl.innerHTML = `
      <div style="display: flex; gap: var(--sp-6); font-size: var(--text-sm);">
        <div><span style="color: var(--color-wrong);">●</span> 大変化: <strong>${highCount}</strong></div>
        <div><span style="color: hsl(45, 80%, 55%);">●</span> 中程度: <strong>${medCount}</strong></div>
        <div><span style="color: var(--color-correct);">●</span> 一致: <strong>${lowCount}</strong></div>
        <div style="color: var(--text-muted);">計 ${items.length} 語表示中</div>
      </div>
    `;
  }
}

function renderSingleDriftCard(item, index) {
  const category = item.driftCategory;
  const driftPercent = Math.round(item.semanticDrift * 100);

  return `
    <div class="glass-card drift-card animate-fade-in-up stagger-${Math.min(index + 1, 5)}" style="margin-bottom: var(--sp-4);">
      <!-- Word header -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--sp-4);">
        <div>
          <span class="text-mono" style="font-size: var(--text-xl); font-weight: 700; color: var(--text-primary);">${item.word}</span>
          <span style="font-size: var(--text-xs); color: var(--text-muted); margin-left: var(--sp-2);">Lv.${item.difficulty}</span>
        </div>
        <div style="display: flex; align-items: center; gap: var(--sp-2);">
          <span class="drift-value" style="color: ${category.color};">${driftPercent}%</span>
          <span style="font-size: var(--text-xs); color: ${category.color};">${category.labelJa}</span>
        </div>
      </div>

      <!-- Drift meter -->
      <div class="drift-meter drift-${category.level}">
        <div class="drift-meter-fill" style="width: ${driftPercent}%;"></div>
      </div>

      <!-- Comparison -->
      <div class="drift-comparison">
        <div class="drift-side etymological">
          <div class="drift-side-label">📜 語源的意味</div>
          <div style="font-size: var(--text-sm); color: var(--text-primary); margin-bottom: var(--sp-1);">${item.etymologicalMeaning}</div>
          <div style="font-size: var(--text-sm); color: var(--text-secondary);">${item.etymologicalMeaningJa}</div>
        </div>
        <div class="drift-arrow">
          <span style="font-size: var(--text-2xl);">→</span>
        </div>
        <div class="drift-side modern">
          <div class="drift-side-label">📖 現代の定義</div>
          <div style="font-size: var(--text-sm); color: var(--text-primary); margin-bottom: var(--sp-1);">${item.modernDefinition}</div>
          <div style="font-size: var(--text-sm); color: var(--text-secondary);">${item.modernDefinitionJa}</div>
        </div>
      </div>

      ${item.mnemonicStory ? `
        <div class="mnemonic-card">
          <div class="mnemonic-label">💡 記憶ストーリー</div>
          <div class="mnemonic-text">${item.mnemonicStory}</div>
        </div>
      ` : ''}
    </div>
  `;
}
