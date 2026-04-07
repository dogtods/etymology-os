// ============================================
// Etymology OS Engine — Decomposition Module
// ============================================

import { WORDS } from '../data/words.js';
import { ROOTS, PREFIXES, SUFFIXES } from '../data/roots.js';
import { debounce } from '../utils/ui.js';

let currentWord = null;

export function initDecomposition() {
  const input = document.getElementById('decompose-input');
  const resultArea = document.getElementById('decompose-result');
  const suggestionsEl = document.getElementById('decompose-suggestions');

  if (!input) return;

  // Debounced search for suggestions
  const handleInput = debounce((value) => {
    const query = value.trim().toLowerCase();
    if (query.length < 2) {
      suggestionsEl.innerHTML = '';
      suggestionsEl.style.display = 'none';
      return;
    }

    const matches = Object.keys(WORDS).filter(w => w.startsWith(query)).slice(0, 8);
    if (matches.length > 0) {
      suggestionsEl.style.display = 'flex';
      suggestionsEl.innerHTML = matches.map(w =>
        `<button class="suggestion-chip" data-word="${w}">${w}</button>`
      ).join('');
    } else {
      suggestionsEl.style.display = 'none';
      suggestionsEl.innerHTML = '';
    }
  }, 200);

  input.addEventListener('input', (e) => handleInput(e.target.value));

  // Handle suggestion clicks
  suggestionsEl.addEventListener('click', (e) => {
    const chip = e.target.closest('.suggestion-chip');
    if (chip) {
      const word = chip.dataset.word;
      input.value = word;
      suggestionsEl.style.display = 'none';
      decomposeWord(word);
    }
  });

  // Handle enter key
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const word = input.value.trim().toLowerCase();
      if (word) {
        suggestionsEl.style.display = 'none';
        decomposeWord(word);
      }
    }
  });

  // Render popular roots as quick-access chips
  renderQuickAccess();
}

function renderQuickAccess() {
  const container = document.getElementById('quick-access-roots');
  if (!container) return;

  const popularRoots = ['port', 'struct', 'dict', 'spec', 'ject', 'vert', 'form', 'rupt', 'tract', 'duc'];

  container.innerHTML = popularRoots.map(root => {
    const data = ROOTS[root];
    return `<button class="root-chip" data-root="${root}" title="${data.meaning} (${data.meaningJa})">
      ${root}
    </button>`;
  }).join('');

  container.addEventListener('click', (e) => {
    const chip = e.target.closest('.root-chip');
    if (chip) {
      const root = chip.dataset.root;
      const words = ROOTS[root]?.relatedWords || [];
      if (words.length > 0) {
        const word = words.find(w => WORDS[w]) || words[0];
        document.getElementById('decompose-input').value = word;
        decomposeWord(word);
      }
    }
  });
}

function decomposeWord(word) {
  const resultArea = document.getElementById('decompose-result');
  currentWord = word.toLowerCase();

  const wordData = WORDS[currentWord];

  if (wordData) {
    renderDecomposition(wordData, currentWord);
  } else {
    // Try heuristic decomposition
    const heuristic = heuristicDecompose(currentWord);
    if (heuristic) {
      renderHeuristicResult(heuristic, currentWord);
    } else {
      renderNotFound(currentWord);
    }
  }
}

function renderDecomposition(wordData, word) {
  const resultArea = document.getElementById('decompose-result');
  const { decomposition, etymologicalMeaning, etymologicalMeaningJa, modernDefinition, modernDefinitionJa } = wordData;

  let morphemeHTML = '<div class="morpheme-display">';

  // Prefix
  if (decomposition.prefix) {
    morphemeHTML += `
      <div class="morpheme-part prefix animate-split-left stagger-1">
        <span class="morpheme-label">接頭辞 PREFIX</span>
        <span class="morpheme-text">${decomposition.prefix.morpheme}-</span>
        <span class="morpheme-meaning">${decomposition.prefix.meaning}</span>
        <span class="morpheme-meaning">${getPrefixJa(decomposition.prefix.morpheme)}</span>
      </div>
      <span class="morpheme-connector animate-fade-in stagger-2">+</span>
    `;
  }

  // Root
  morphemeHTML += `
    <div class="morpheme-part root animate-split-center stagger-2">
      <span class="morpheme-label">語根 ROOT</span>
      <span class="morpheme-text">${decomposition.root.morpheme}</span>
      <span class="morpheme-meaning">${decomposition.root.meaning}</span>
      <span class="morpheme-meaning">${getRootJa(decomposition.root.morpheme)}</span>
    </div>
  `;

  // Suffix
  if (decomposition.suffix) {
    morphemeHTML += `
      <span class="morpheme-connector animate-fade-in stagger-3">+</span>
      <div class="morpheme-part suffix animate-split-right stagger-3">
        <span class="morpheme-label">接尾辞 SUFFIX</span>
        <span class="morpheme-text">-${decomposition.suffix.morpheme}</span>
        <span class="morpheme-meaning">${decomposition.suffix.meaning}</span>
        <span class="morpheme-meaning">${getSuffixJa(decomposition.suffix.morpheme)}</span>
      </div>
    `;
  }

  morphemeHTML += '</div>';

  // Full word display
  const fullHTML = `
    <div class="decompose-word-display animate-fade-in">
      <h2 class="decompose-word-title text-mono">${word}</h2>
    </div>
    ${morphemeHTML}
    <div class="definition-card animate-fade-in-up stagger-3">
      <div class="definition-label">語源的意味 ETYMOLOGICAL MEANING</div>
      <div class="definition-text">${etymologicalMeaning}</div>
      <div class="definition-text-ja">${etymologicalMeaningJa}</div>
    </div>
    <div class="definition-card animate-fade-in-up stagger-4" style="border-left-color: var(--color-suffix);">
      <div class="definition-label">現代の定義 MODERN DEFINITION</div>
      <div class="definition-text">${modernDefinition}</div>
      <div class="definition-text-ja">${modernDefinitionJa}</div>
    </div>
    ${wordData.semanticDrift >= 0.4 && wordData.mnemonicStory ? `
      <div class="mnemonic-card animate-fade-in-up stagger-5">
        <div class="mnemonic-label">💡 記憶ストーリー</div>
        <div class="mnemonic-text">${wordData.mnemonicStory}</div>
      </div>
    ` : ''}
  `;

  resultArea.innerHTML = fullHTML;
  resultArea.style.display = 'block';
}

function renderHeuristicResult(result, word) {
  const resultArea = document.getElementById('decompose-result');

  let morphemeHTML = '<div class="morpheme-display">';

  if (result.prefix) {
    morphemeHTML += `
      <div class="morpheme-part prefix animate-split-left stagger-1">
        <span class="morpheme-label">接頭辞 PREFIX</span>
        <span class="morpheme-text">${result.prefix.morpheme}-</span>
        <span class="morpheme-meaning">${result.prefix.meaning}</span>
        <span class="morpheme-meaning">${result.prefix.meaningJa}</span>
      </div>
      <span class="morpheme-connector animate-fade-in stagger-2">+</span>
    `;
  }

  if (result.root) {
    morphemeHTML += `
      <div class="morpheme-part root animate-split-center stagger-2">
        <span class="morpheme-label">語根 ROOT</span>
        <span class="morpheme-text">${result.root.morpheme}</span>
        <span class="morpheme-meaning">${result.root.meaning}</span>
        <span class="morpheme-meaning">${result.root.meaningJa}</span>
      </div>
    `;
  } else {
    morphemeHTML += `
      <div class="morpheme-part root animate-split-center stagger-2">
        <span class="morpheme-label">語根 ROOT</span>
        <span class="morpheme-text">${result.remaining || word}</span>
        <span class="morpheme-meaning">（未登録）</span>
      </div>
    `;
  }

  if (result.suffix) {
    morphemeHTML += `
      <span class="morpheme-connector animate-fade-in stagger-3">+</span>
      <div class="morpheme-part suffix animate-split-right stagger-3">
        <span class="morpheme-label">接尾辞 SUFFIX</span>
        <span class="morpheme-text">-${result.suffix.morpheme}</span>
        <span class="morpheme-meaning">${result.suffix.meaning}</span>
        <span class="morpheme-meaning">${result.suffix.meaningJa}</span>
      </div>
    `;
  }

  morphemeHTML += '</div>';

  resultArea.innerHTML = `
    <div class="decompose-word-display animate-fade-in">
      <h2 class="decompose-word-title text-mono">${word}</h2>
      <span class="heuristic-badge">🔍 推定分解</span>
    </div>
    ${morphemeHTML}
    <div class="definition-card animate-fade-in-up stagger-4" style="border-left-color: var(--text-muted);">
      <div class="definition-label">ℹ️ 注意</div>
      <div class="definition-text-ja">この単語はデータベースに未登録です。接辞と語根のパターンマッチングによる推定結果を表示しています。</div>
    </div>
  `;
  resultArea.style.display = 'block';
}

function renderNotFound(word) {
  const resultArea = document.getElementById('decompose-result');
  resultArea.innerHTML = `
    <div class="empty-state animate-fade-in">
      <div class="empty-state-icon">🔎</div>
      <div class="empty-state-text">
        「<strong class="text-mono">${word}</strong>」のパターンが見つかりませんでした。<br>
        データベースに登録されている単語を試してみてください。
      </div>
    </div>
  `;
  resultArea.style.display = 'block';
}

// Heuristic decomposition for unknown words
function heuristicDecompose(word) {
  let remaining = word;
  let foundPrefix = null;
  let foundSuffix = null;
  let foundRoot = null;

  // Try to find prefix (longest match first)
  const sortedPrefixes = Object.keys(PREFIXES).sort((a, b) => b.length - a.length);
  for (const prefix of sortedPrefixes) {
    if (remaining.startsWith(prefix) && remaining.length > prefix.length + 2) {
      foundPrefix = { morpheme: prefix, ...PREFIXES[prefix] };
      remaining = remaining.slice(prefix.length);
      break;
    }
  }

  // Try to find suffix (longest match first)
  const sortedSuffixes = Object.keys(SUFFIXES).sort((a, b) => b.length - a.length);
  for (const suffix of sortedSuffixes) {
    if (remaining.endsWith(suffix) && remaining.length > suffix.length + 2) {
      foundSuffix = { morpheme: suffix, ...SUFFIXES[suffix] };
      remaining = remaining.slice(0, remaining.length - suffix.length);
      break;
    }
  }

  // Try to find root in remaining
  const sortedRoots = Object.keys(ROOTS).sort((a, b) => b.length - a.length);
  for (const root of sortedRoots) {
    if (remaining.includes(root) && root.length >= 3) {
      foundRoot = { morpheme: root, ...ROOTS[root] };
      break;
    }
  }

  if (foundPrefix || foundSuffix || foundRoot) {
    return { prefix: foundPrefix, root: foundRoot, suffix: foundSuffix, remaining };
  }
  return null;
}

// Helpers to get Japanese meanings
function getPrefixJa(morpheme) {
  return PREFIXES[morpheme]?.meaningJa || '';
}

function getRootJa(morpheme) {
  return ROOTS[morpheme]?.meaningJa || '';
}

function getSuffixJa(morpheme) {
  return SUFFIXES[morpheme]?.meaningJa || '';
}

// Public API to decompose from other modules
export function decomposeFromExternal(word) {
  const input = document.getElementById('decompose-input');
  if (input) {
    input.value = word;
  }
  decomposeWord(word);
}
