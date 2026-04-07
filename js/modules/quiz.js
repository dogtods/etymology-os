// ============================================
// Etymology OS Engine — Quiz Module
// ============================================

import { WORDS } from '../data/words.js';
import { ROOTS, PREFIXES, SUFFIXES } from '../data/roots.js';
import {
  updateWordMastery, updateRootMastery, updateScore,
  addQuizResult, loadState, getWordMasteryLevel, getAiMode, setAiMode
} from '../utils/storage.js';
import { shuffleArray, launchConfetti, showToast, delay, randomPick } from '../utils/ui.js';
import { generateUnknownWord } from './api.js';

let quizState = {
  currentWord: null,
  currentWordData: null,
  step: 0,        // 0=prefix, 1=root, 2=definition
  score: 0,
  streak: 0,
  totalQuestions: 0,
  stepResults: [],
  isAnswered: false
};

export function initQuiz() {
  document.getElementById('quiz-start-btn')?.addEventListener('click', startQuiz);
  document.getElementById('quiz-next-btn')?.addEventListener('click', nextQuestion);
  document.getElementById('quiz-skip-btn')?.addEventListener('click', skipQuestion);
  
  const toggle = document.getElementById('ai-mode-toggle');
  if (toggle) {
    toggle.checked = getAiMode();
    toggle.addEventListener('change', (e) => setAiMode(e.target.checked));
  }
  
  updateQuizDisplay();
}

function startQuiz() {
  const state = loadState();
  quizState.score = state.quizScore || 0;
  quizState.streak = state.streak || 0;
  quizState.totalQuestions = 0;
  
  document.getElementById('quiz-intro').style.display = 'none';
  document.getElementById('quiz-area').style.display = 'block';
  
  nextQuestion();
}

function getNextWord() {
  const allWords = Object.keys(WORDS).filter(w => {
    const data = WORDS[w];
    // Must have at least a root
    return data.decomposition.root;
  });

  // Prioritize words with lower mastery
  const scored = allWords.map(word => {
    const mastery = getWordMasteryLevel(word);
    // Weight: lower mastery = higher priority
    // Also add some randomness
    const priority = (1 - mastery) + Math.random() * 0.3;
    return { word, priority };
  });

  scored.sort((a, b) => b.priority - a.priority);
  return scored[0]?.word || randomPick(allWords);
}

export async function nextQuestion() {
  // Check AI mode
  const isAiMode = getAiMode();
  const startBtn = document.getElementById('quiz-start-btn');
  const nextBtn = document.getElementById('quiz-next-btn');
  const prevBtnText = nextBtn ? nextBtn.textContent : '';
  
  if (isAiMode) {
    // Show loading state
    document.getElementById('quiz-feedback-area').innerHTML = `
      <div class="animate-pulse" style="text-align: center; margin: var(--sp-4) 0;">
        <span style="font-size: 2rem;">🤖</span>
        <div style="font-size: var(--text-sm); color: var(--text-muted); margin-top: var(--sp-2);">Gemini が未知の単語を生成中...</div>
      </div>
    `;
    if (nextBtn) {
      nextBtn.disabled = true;
      nextBtn.textContent = "生成中...";
    }
    
    try {
      const generatedData = await generateUnknownWord();
      quizState.currentWord = generatedData.word.toLowerCase();
      quizState.currentWordData = generatedData;
      
      // If AI mode, we use the generated word directly instead of from WORDS db.
      setupQuestionEnvironment();
      
    } catch (error) {
      showToast(error.message, 'error', 5000);
      document.getElementById('quiz-feedback-area').innerHTML = `
        <div style="color: var(--color-wrong); text-align: center; font-size: var(--text-sm);">
          エラーが発生しました。設定からAPIキーを確認するか、基本モードに戻してください。
        </div>
      `;
      if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.textContent = prevBtnText;
      }
      return; 
    }
  } else {
    // Basic mode
    const word = getNextWord();
    const wordData = WORDS[word];
    quizState.currentWord = word;
    quizState.currentWordData = wordData;
    setupQuestionEnvironment();
  }
}

function setupQuestionEnvironment() {
  const nextBtn = document.getElementById('quiz-next-btn');
  if (nextBtn) {
    nextBtn.disabled = false;
    nextBtn.textContent = "次の問題 →";
  }

  quizState.step = 0;
  quizState.stepResults = [];
  quizState.isAnswered = false;
  quizState.totalQuestions++;

  document.getElementById('quiz-next-btn').style.display = 'none';
  document.getElementById('quiz-skip-btn').style.display = 'inline-flex';
  document.getElementById('quiz-feedback-area').innerHTML = '';

  renderCurrentStep();
  updateQuizDisplay();
}

function renderCurrentStep() {
  const { currentWord, currentWordData, step } = quizState;
  const decomp = currentWordData.decomposition;

  // Update word display
  document.getElementById('quiz-current-word').textContent = currentWord;

  // Update progress dots
  updateProgressDots();

  let stepLabel = '';
  let questionText = '';
  let options = [];
  let correctAnswer = '';

  if (step === 0 && decomp.prefix) {
    // Step 1: Identify prefix meaning
    stepLabel = 'STEP 1 — 接頭辞の意味';
    questionText = `「${decomp.prefix.morpheme}-」の意味は？`;
    correctAnswer = PREFIXES[decomp.prefix.morpheme]?.meaningJa || decomp.prefix.meaning;

    const allPrefixMeanings = Object.values(PREFIXES).map(p => p.meaningJa);
    const distractors = shuffleArray(
      allPrefixMeanings.filter(m => m !== correctAnswer)
    ).slice(0, 3);
    options = shuffleArray([correctAnswer, ...distractors]);
  } else if ((step === 0 && !decomp.prefix) || step === 1) {
    // Step 2: Identify root meaning
    if (step === 0 && !decomp.prefix) {
      quizState.step = 1;
    }
    stepLabel = decomp.prefix ? 'STEP 2 — 語根の意味' : 'STEP 1 — 語根の意味';
    questionText = `「${decomp.root.morpheme}」の意味は？`;
    correctAnswer = ROOTS[decomp.root.morpheme]?.meaningJa || decomp.root.meaning || "不明";

    const allRootMeanings = Object.values(ROOTS).map(r => r.meaningJa);
    const distractors = shuffleArray(
      allRootMeanings.filter(m => m !== correctAnswer).concat(["測定する", "場所", "切る"]) // Add some fallbacks just in case
    ).slice(0, 3);
    options = shuffleArray([correctAnswer, ...distractors]);
  } else if (step === 2) {
    // Step 3: Guess the definition
    stepLabel = decomp.prefix ? 'STEP 3 — 意味を推測' : 'STEP 2 — 意味を推測';
    questionText = `この単語の意味は？`;
    correctAnswer = currentWordData.modernDefinitionJa;

    const allDefinitions = Object.values(WORDS).map(w => w.modernDefinitionJa);
    const distractors = shuffleArray(
      allDefinitions.filter(d => d !== correctAnswer)
    ).slice(0, 3);
    options = shuffleArray([correctAnswer, ...distractors]);
  }

  // Render
  const stepLabelEl = document.getElementById('quiz-step-label');
  const questionEl = document.getElementById('quiz-question');
  const optionsEl = document.getElementById('quiz-options');

  stepLabelEl.textContent = stepLabel;
  stepLabelEl.className = 'quiz-step-label animate-fade-in';
  questionEl.textContent = questionText;
  questionEl.className = 'quiz-question text-ja animate-fade-in';

  optionsEl.innerHTML = '';
  options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = `quiz-option animate-fade-in-up stagger-${i + 1}`;
    btn.textContent = opt;
    btn.dataset.answer = opt;
    btn.dataset.correct = (opt === correctAnswer) ? 'true' : 'false';
    btn.addEventListener('click', () => handleAnswer(btn, opt, correctAnswer));
    optionsEl.appendChild(btn);
  });

  quizState.isAnswered = false;
}

async function handleAnswer(btn, selected, correct) {
  if (quizState.isAnswered) return;
  quizState.isAnswered = true;

  const isCorrect = selected === correct;
  const { step, currentWord, currentWordData } = quizState;
  const decomp = currentWordData.decomposition;

  // Mark buttons
  const optionsEl = document.getElementById('quiz-options');
  optionsEl.querySelectorAll('.quiz-option').forEach(b => {
    if (b.dataset.correct === 'true') {
      b.classList.add('correct');
    } else if (b === btn && !isCorrect) {
      b.classList.add('wrong');
    }
    b.classList.add('disabled');
  });

  // Calculate points
  let points = 0;
  let feedbackType = 'wrong';
  let feedbackText = '';

  const actualStep = quizState.step;

  if (actualStep === 0 && decomp.prefix) {
    // Prefix step
    if (isCorrect) {
      points = 2;
      feedbackType = 'correct';
      feedbackText = `正解！「${decomp.prefix.morpheme}-」= ${PREFIXES[decomp.prefix.morpheme]?.meaningJa || decomp.prefix.meaning}`;
    } else {
      feedbackText = `残念！正解は「${correct}」でした。`;
    }
  } else if (actualStep === 1 || (actualStep === 0 && !decomp.prefix)) {
    // Root step (most important)
    if (isCorrect) {
      points = 3;
      feedbackType = 'correct';
      feedbackText = `素晴らしい！語根「${decomp.root.morpheme}」= ${ROOTS[decomp.root.morpheme]?.meaningJa || decomp.root.meaning}`;
      updateRootMastery(decomp.root.morpheme, true);
    } else {
      feedbackText = `惜しい！「${decomp.root.morpheme}」の意味は「${correct}」です。`;
      updateRootMastery(decomp.root.morpheme, false);
    }
  } else if (actualStep === 2) {
    // Definition step
    if (isCorrect) {
      points = 1;
      feedbackType = 'correct';
      feedbackText = `完璧！語源の知識が活きましたね。`;
    } else {
      // If they got root correct earlier, partial credit
      const rootCorrect = quizState.stepResults.some(r => r.step === 'root' && r.correct);
      if (rootCorrect) {
        points = 0;
        feedbackText = `語根の理解はできています！定義は「${correct}」でした。`;
      } else {
        feedbackText = `正解は「${correct}」でした。語源から推測する練習を続けましょう！`;
      }
    }
  }

  // Record step result
  const stepName = actualStep === 0 && decomp.prefix ? 'prefix' : actualStep <= 1 ? 'root' : 'definition';
  quizState.stepResults.push({ step: stepName, correct: isCorrect, points });

  // Update score
  if (points > 0) {
    const state = updateScore(points);
    quizState.score = state.quizScore;
    quizState.streak = state.streak;
  } else if (!isCorrect) {
    const state = updateScore(0);
    quizState.streak = state.streak;
  }

  // Show feedback
  const feedbackArea = document.getElementById('quiz-feedback-area');
  feedbackArea.innerHTML = `
    <div class="quiz-feedback ${feedbackType} animate-fade-in">
      ${isCorrect ? '✅' : '❌'} ${feedbackText}
      ${points > 0 ? `<span style="float:right; font-weight:700;">+${points}pt</span>` : ''}
    </div>
  `;

  // Animate score
  if (isCorrect) {
    const scoreEl = document.getElementById('quiz-score-value');
    if (scoreEl) {
      scoreEl.textContent = quizState.score;
      scoreEl.classList.add('animate-score-pop');
      setTimeout(() => scoreEl.classList.remove('animate-score-pop'), 300);
    }
  } else {
    // Shake the option
    btn.classList.add('animate-shake');
  }

  // Confetti on streak milestones
  if (quizState.streak > 0 && quizState.streak % 5 === 0 && isCorrect) {
    launchConfetti();
    showToast(`🔥 ${quizState.streak}連続正解！`, 'success');
  }

  updateQuizDisplay();

  // Determine next step or next word
  await delay(800);

  if (isCorrect || actualStep >= 2) {
    // Move to next step
    quizState.step++;
    const hasPrefix = decomp.prefix;
    const maxStep = hasPrefix ? 3 : 2;

    if (quizState.step >= maxStep || (quizState.step === 1 && !hasPrefix && actualStep === 1)) {
      // Word complete
      await delay(400);
      showWordSummary();
    } else {
      // Skip prefix step if not applicable
      if (quizState.step === 1 && !hasPrefix) {
        quizState.step = 2;
      } else if (quizState.step === 0 && !hasPrefix) {
        quizState.step = 1;
      }
      quizState.isAnswered = false;
      renderCurrentStep();
    }
  } else {
    // Wrong answer: still move to next step (learning mode)
    quizState.step++;
    const hasPrefix = decomp.prefix;
    const maxStep = hasPrefix ? 3 : 2;

    if (quizState.step >= maxStep) {
      await delay(400);
      showWordSummary();
    } else {
      quizState.isAnswered = false;
      renderCurrentStep();
    }
  }
}

function showWordSummary() {
  const { currentWord, currentWordData, stepResults } = quizState;
  const totalPoints = stepResults.reduce((sum, r) => sum + r.points, 0);
  const allCorrect = stepResults.every(r => r.correct);

  // Update word mastery
  updateWordMastery(currentWord, allCorrect);

  // Record quiz result
  addQuizResult({
    word: currentWord,
    stepResults,
    totalPoints
  });

  // Show summary
  const optionsEl = document.getElementById('quiz-options');
  const stepLabelEl = document.getElementById('quiz-step-label');
  const questionEl = document.getElementById('quiz-question');

  stepLabelEl.textContent = '結果';

  const stepsHtml = stepResults.map(r => {
    const icon = r.correct ? '✅' : '❌';
    const stepName = r.step === 'prefix' ? '接頭辞' : r.step === 'root' ? '語根' : '定義';
    return `<span>${icon} ${stepName} ${r.correct ? `(+${r.points})` : ''}</span>`;
  }).join(' ');

  questionEl.innerHTML = `
    <div class="animate-pop-in" style="text-align: center;">
      <div style="font-size: var(--text-3xl); margin-bottom: var(--sp-2);">
        ${allCorrect ? '🎉' : totalPoints > 0 ? '💪' : '📚'}
      </div>
      <div style="font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: var(--sp-3);">${stepsHtml}</div>
      <div style="font-family: var(--font-mono); font-size: var(--text-xl); font-weight: 700; color: var(--color-root);">
        +${totalPoints} ポイント
      </div>
      ${allCorrect ? '<div style="color: var(--color-correct); margin-top: var(--sp-2);">完璧です！</div>' : ''}
    </div>
  `;

  optionsEl.innerHTML = '';

  // Show etymology breakdown
  const feedbackArea = document.getElementById('quiz-feedback-area');
  const decomp = currentWordData.decomposition;
  let breakdownParts = [];
  if (decomp.prefix) breakdownParts.push(`<span style="color: var(--color-prefix)">${decomp.prefix.morpheme}</span>`);
  breakdownParts.push(`<span style="color: var(--color-root)">${decomp.root.morpheme}</span>`);
  if (decomp.suffix) breakdownParts.push(`<span style="color: var(--color-suffix)">${decomp.suffix.morpheme}</span>`);

  feedbackArea.innerHTML = `
    <div class="glass-card glass-card-sm animate-fade-in-up" style="text-align: center; margin-top: var(--sp-4);">
      <div style="font-family: var(--font-mono); font-size: var(--text-lg); margin-bottom: var(--sp-2);">
        ${breakdownParts.join(' + ')} = <strong>${currentWord}</strong>
      </div>
      <div style="font-size: var(--text-sm); color: var(--text-secondary);">${currentWordData.etymologicalMeaningJa}</div>
      <div style="font-size: var(--text-sm); margin-top: var(--sp-2);">${currentWordData.modernDefinitionJa}</div>
      ${currentWordData.mnemonicStory ? `
        <div style="margin-top: var(--sp-3); padding-top: var(--sp-3); border-top: 1px solid var(--glass-border); font-size: var(--text-sm); color: var(--accent);">
          💡 ${currentWordData.mnemonicStory}
        </div>
      ` : ''}
    </div>
  `;

  // Show next button
  document.getElementById('quiz-next-btn').style.display = 'inline-flex';
  document.getElementById('quiz-skip-btn').style.display = 'none';

  if (allCorrect) {
    launchConfetti();
  }
}

function skipQuestion() {
  updateWordMastery(quizState.currentWord, false);
  nextQuestion();
}

function updateProgressDots() {
  const dotsEl = document.getElementById('quiz-progress-dots');
  if (!dotsEl) return;

  const decomp = quizState.currentWordData.decomposition;
  const hasPrefix = decomp.prefix;
  const totalSteps = hasPrefix ? 3 : 2;
  const currentAdjusted = hasPrefix ? quizState.step : quizState.step - (quizState.step > 0 ? 0 : 0);

  let html = '';
  const stepNames = hasPrefix ? ['接頭辞', '語根', '定義'] : ['語根', '定義'];

  for (let i = 0; i < totalSteps; i++) {
    const result = quizState.stepResults[i];
    let cls = 'quiz-progress-step';
    if (result) {
      cls += result.correct ? ' complete' : ' wrong-step';
    } else if (i === quizState.stepResults.length) {
      cls += ' active';
    }
    html += `<div class="${cls}" title="${stepNames[i]}"></div>`;
  }

  dotsEl.innerHTML = html;
}

function updateQuizDisplay() {
  const scoreEl = document.getElementById('quiz-score-value');
  const streakEl = document.getElementById('quiz-streak-value');

  if (scoreEl) scoreEl.textContent = quizState.score;
  if (streakEl) {
    streakEl.textContent = quizState.streak;
    const streakBadge = document.getElementById('quiz-streak-badge');
    if (streakBadge) {
      streakBadge.style.display = quizState.streak > 0 ? 'flex' : 'none';
    }
  }
}
