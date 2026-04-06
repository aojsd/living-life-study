// Living Life Study - Quiz App Logic

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalizeText(s) {
  return s.trim().toLowerCase().replace(/[–—]/g, '-').replace(/[^\w\s'-]/g, '').replace(/\s+/g, ' ');
}

// Strip leading articles for lenient comparison
function stripArticles(s) {
  return s.replace(/^(the|a|an)\s+/i, '');
}

// Normalize range separators: "genesis - deuteronomy" and "genesis to deuteronomy" match
function normalizeRange(s) {
  return s.replace(/\s*[-–—]\s*/g, ' to ');
}

function lenientMatch(userVal, answer) {
  const u = normalizeRange(stripArticles(normalizeText(userVal)));
  const a = normalizeRange(stripArticles(normalizeText(answer)));
  return u === a;
}

// For questions where any order is acceptable, check if user answers
// are a permutation of the expected answers (ignoring order of parts)
const ANY_ORDER_QUESTIONS = new Set([1, 2, 6]);

function wordsOf(text) {
  return text.split(/\s+/).filter(w => w.length > 0);
}

document.addEventListener('alpine:init', () => {
  Alpine.data('quiz', () => ({
    screen: 'menu',

    // Quiz state
    mode: null,           // 'fitb', 'tf', 'verses', 'full'
    sectionQueue: [],     // for full test: ['fitb', 'tf', 'verses']
    currentSectionType: null,
    currentQuestions: [],
    currentIndex: 0,
    answers: {},
    submitted: {},
    feedback: {},         // fitb: {idx: [bool per part]}, tf: {idx: bool}, verses: {idx: bool}
    scores: {},           // {idx: points earned}
    verseFeedback: {},    // {idx: [{word, correct, got, expected}]}
    verseHints: {},       // {idx: [{word, revealed}]}
    verseAttempts: {},    // {idx: number}
    verseFailed: {},      // {idx: bool} — failed due to hint or error

    // Results
    resultSections: [],
    totalEarned: 0,
    totalPossible: 0,

    // Accumulated results across sections (for full test)
    allResults: [],

    resetAll() {
      this.mode = null;
      this.sectionQueue = [];
      this.currentSectionType = null;
      this.currentQuestions = [];
      this.currentIndex = 0;
      this.answers = {};
      this.submitted = {};
      this.feedback = {};
      this.scores = {};
      this.verseFeedback = {};
      this.verseHints = {};
      this.verseAttempts = {};
      this.verseFailed = {};
      this.resultSections = [];
      this.allResults = [];
      this.totalEarned = 0;
      this.totalPossible = 0;
    },

    startSection(mode) {
      this.resetAll();
      this.mode = mode;
      if (mode === 'full') {
        this.sectionQueue = ['fitb', 'tf', 'verses'];
      } else {
        this.sectionQueue = [mode];
      }
      this.loadNextSection();
    },

    loadNextSection() {
      if (this.sectionQueue.length === 0) {
        this.showResults();
        return;
      }
      const sectionType = this.sectionQueue.shift();
      this.currentSectionType = sectionType;
      this.currentIndex = 0;
      this.answers = {};
      this.submitted = {};
      this.feedback = {};
      this.scores = {};
      this.verseFeedback = {};
      this.verseHints = {};
      this.verseAttempts = {};
      this.verseFailed = {};

      if (sectionType === 'fitb') {
        // Exclude Q12 (spiritual gifts — personal answer)
        this.currentQuestions = shuffle(FILL_IN_THE_BLANK.filter(q => q.id !== 12));
      } else if (sectionType === 'tf') {
        this.currentQuestions = shuffle(TRUE_FALSE);
      } else if (sectionType === 'verses') {
        this.currentQuestions = shuffle(VERSES);
      }
      this.screen = 'quiz';
    },

    currentQ() {
      return this.currentQuestions[this.currentIndex] || {};
    },

    currentSectionLabel() {
      const labels = { fitb: 'Fill in the Blank', tf: 'True or False', verses: 'Memory Verses' };
      return labels[this.currentSectionType] || '';
    },

    isLastQuestion() {
      return this.currentIndex >= this.currentQuestions.length - 1;
    },

    handleSubmitOrNext() {
      if (this.submitted[this.currentIndex]) {
        this.nextQuestion();
      } else {
        this.submitAnswer();
      }
    },

    submitAnswer() {
      const idx = this.currentIndex;
      const q = this.currentQ();
      const type = this.currentSectionType;

      if (type === 'fitb') {
        this.submitFITB(idx, q);
      } else if (type === 'tf') {
        this.submitTF(idx, q);
      } else if (type === 'verses') {
        this.submitVerse(idx, q);
        return; // verse submission may not finalize (hints)
      }
    },

    submitFITB(idx, q) {
      const userAnswers = this.answers[idx] || [];

      // For any-order questions, match user answers as a permutation
      if (ANY_ORDER_QUESTIONS.has(q.id)) {
        const remaining = q.parts.map(p => p.answer);
        const partResults = q.parts.map((_, pi) => {
          const idx2 = remaining.findIndex(a => lenientMatch(userAnswers[pi] || '', a));
          if (idx2 !== -1) {
            remaining.splice(idx2, 1);
            return true;
          }
          return false;
        });
        this.feedback[idx] = partResults;
        const allCorrect = partResults.every(r => r);
        this.scores[idx] = allCorrect ? q.points : 0;
        this.submitted[idx] = true;
        return;
      }

      const partResults = q.parts.map((part, pi) => {
        const userVal = (userAnswers[pi] || '').trim();
        if (part.answer === '__tribe__') {
          return TWELVE_TRIBES.includes(normalizeText(userVal));
        }
        return lenientMatch(userVal, part.answer);
      });

      // Check for duplicate tribes
      if (q.id === 11) {
        const tribeIndices = q.parts.reduce((acc, p, i) => p.answer === '__tribe__' ? [...acc, i] : acc, []);
        const givenTribes = tribeIndices.map(i => normalizeText(userAnswers[i] || ''));
        const uniqueTribes = new Set(givenTribes.filter(t => t.length > 0));
        if (uniqueTribes.size < givenTribes.filter(t => t.length > 0).length) {
          tribeIndices.forEach(i => partResults[i] = false);
        }
      }

      this.feedback[idx] = partResults;
      const allCorrect = partResults.every(r => r);
      this.scores[idx] = allCorrect ? q.points : 0;
      this.submitted[idx] = true;
    },

    submitTF(idx, q) {
      if (this.answers[idx] === undefined) return;
      const correct = this.answers[idx] === q.answer;
      this.feedback[idx] = correct;
      this.scores[idx] = correct ? 1 : 0;
      this.submitted[idx] = true;
    },

    submitVerse(idx, q) {
      const userText = (this.answers[idx] || '').trim();
      const attempts = this.verseAttempts[idx] || 0;

      // If submission is blank, show hints (max 3 rounds = 75% revealed)
      if (userText === '' && attempts < 3) {
        this.verseAttempts[idx] = attempts + 1;
        this.verseFailed[idx] = true; // any hint = fail
        this.revealHints(idx, q, this.verseAttempts[idx]);
        return;
      }

      // Compare word by word
      const expectedWords = wordsOf(q.text);
      const userWords = wordsOf(userText);
      const maxLen = Math.max(expectedWords.length, userWords.length);
      const wordFeedback = [];
      let allCorrect = true;

      for (let i = 0; i < maxLen; i++) {
        const expected = expectedWords[i] || '';
        const got = userWords[i] || '';
        const correct = normalizeText(got) === normalizeText(expected);
        if (!correct) allCorrect = false;
        wordFeedback.push({ word: expected, correct, got, expected });
      }

      this.verseFeedback[idx] = wordFeedback;

      // Credit only if perfect on first try with no hints
      const failed = this.verseFailed[idx] || false;
      this.scores[idx] = (allCorrect && !failed) ? 1 : 0;
      this.submitted[idx] = true;
    },

    revealHints(idx, q, attemptNum) {
      const words = wordsOf(q.text);
      const totalWords = words.length;
      // Each attempt reveals 25% of total words (at least 1), capped so we never exceed 75%
      const perStep = Math.max(1, Math.ceil(totalWords * 0.25));
      const targetRevealed = Math.min(perStep * attemptNum, Math.ceil(totalWords * 0.75));

      // Build or update hint array
      let hints = this.verseHints[idx];
      if (!hints) {
        hints = words.map(w => ({ word: w, revealed: false }));
      }

      // Pick random unrevealed indices to reveal
      const alreadyRevealed = hints.filter(h => h.revealed).length;
      const toRevealCount = targetRevealed - alreadyRevealed;
      const unrevealed = hints.reduce((acc, h, i) => h.revealed ? acc : [...acc, i], []);
      const toReveal = shuffle(unrevealed).slice(0, toRevealCount);
      toReveal.forEach(i => hints[i].revealed = true);

      this.verseHints[idx] = [...hints]; // trigger reactivity
    },

    hintsRemaining() {
      const idx = this.currentIndex;
      const attempts = this.verseAttempts[idx] || 0;
      return 3 - attempts;
    },

    partFeedbackClass(pi) {
      const idx = this.currentIndex;
      if (!this.submitted[idx]) return '';
      if (!this.feedback[idx]) return '';
      return this.feedback[idx][pi] ? 'part-correct' : 'part-incorrect';
    },

    nextQuestion() {
      if (this.isLastQuestion()) {
        this.finishSection();
      } else {
        this.currentIndex++;
      }
    },

    finishSection() {
      const type = this.currentSectionType;
      const questions = this.currentQuestions;
      let totalPossible = 0;
      let totalEarned = 0;
      const wrong = [];

      questions.forEach((q, idx) => {
        if (type === 'fitb') {
          totalPossible += q.points;
          const earned = this.scores[idx] || 0;
          totalEarned += earned;
          if (earned === 0) {
            const userAnswers = this.answers[idx] || [];
            const wrongParts = q.parts.map((p, pi) => ({
              label: p.label,
              yours: userAnswers[pi] || '',
              answer: p.answer === '__tribe__' ? '(any tribe)' : p.answer
            })).filter((_, pi) => !this.feedback[idx]?.[pi]);
            wrong.push({ id: q.id, question: q.question, wrongParts });
          }
        } else if (type === 'tf') {
          totalPossible += 1;
          const earned = this.scores[idx] || 0;
          totalEarned += earned;
          if (earned === 0) {
            wrong.push({ id: q.id, statement: q.statement, yours: this.answers[idx], answer: q.answer });
          }
        } else if (type === 'verses') {
          totalPossible += 1;
          const earned = this.scores[idx] || 0;
          totalEarned += earned;
          if (earned === 0) {
            wrong.push({ id: q.id, reference: q.reference, text: q.text });
          }
        }
      });

      const labels = { fitb: 'Fill in the Blank', tf: 'True or False', verses: 'Memory Verses' };
      this.allResults.push({
        type,
        label: labels[type],
        earned: totalEarned,
        total: totalPossible,
        wrong
      });

      // Load next section or show results
      this.loadNextSection();
    },

    showResults() {
      this.resultSections = this.allResults;
      this.totalEarned = this.allResults.reduce((s, r) => s + r.earned, 0);
      this.totalPossible = this.allResults.reduce((s, r) => s + r.total, 0);
      this.screen = 'results';
    },

    confirmQuit() {
      if (confirm('Quit this test? Progress will be lost.')) {
        // If in full test and have completed sections, show partial results
        if (this.mode === 'full' && this.allResults.length > 0) {
          this.finishSection();
        } else {
          this.screen = 'menu';
          this.resetAll();
        }
      }
    }
  }));
});
