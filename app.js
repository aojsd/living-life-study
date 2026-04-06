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

    // Verses hard state
    hardAnswers: [],
    hardFeedback: null,
    hardSubmitted: false,

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
      this.hardAnswers = [];
      this.hardFeedback = null;
      this.hardSubmitted = false;
      this.resultSections = [];
      this.allResults = [];
      this.totalEarned = 0;
      this.totalPossible = 0;
    },

    startSection(mode) {
      this.resetAll();
      this.mode = mode;
      if (mode === 'full') {
        this.sectionQueue = ['fitb', 'tf', 'verses_text', 'verses_ref'];
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
      } else if (sectionType === 'verses_text') {
        this.currentQuestions = shuffle(VERSES.map(v => ({ ...v, mode: 'text' })));
      } else if (sectionType === 'verses_ref') {
        this.currentQuestions = shuffle(VERSES.map(v => ({ ...v, mode: 'ref' })));
      } else if (sectionType === 'verses_hard') {
        this.currentQuestions = VERSES.map(v => ({ ...v, mode: 'hard' }));
        this.hardAnswers = Array.from({ length: 12 }, () => ({ ref: '', text: '' }));
        this.hardFeedback = null;
        this.hardSubmitted = false;
        this.screen = 'verses_hard';
        return;
      }
      this.screen = 'quiz';
    },

    currentQ() {
      return this.currentQuestions[this.currentIndex] || {};
    },

    currentSectionLabel() {
      const labels = { fitb: 'Fill in the Blank', tf: 'True or False', verses_text: 'Verses', verses_ref: 'References', verses_hard: 'Verses (Hard)' };
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
      } else if (type === 'verses_text') {
        this.submitVerse(idx, q);
        return; // verse text submission may not finalize (hints)
      } else if (type === 'verses_ref') {
        this.submitVerseRef(idx, q);
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
        if (part.altAnswers) {
          return part.altAnswers.some(alt => lenientMatch(userVal, alt));
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

    submitVerseRef(idx, q) {
      const userRef = (this.answers[idx] || '').trim();
      const correct = normalizeText(userRef) === normalizeText(q.reference);
      this.feedback[idx] = correct;
      this.scores[idx] = correct ? 1 : 0;
      this.submitted[idx] = true;
    },

    submitVerseHard(idx, q) {
      const userAnswers = this.answers[idx] || {};
      const refCorrect = normalizeText(userAnswers.ref || '') === normalizeText(q.reference);

      // Word-by-word comparison for verse text
      const userText = (userAnswers.text || '').trim();
      const expectedWords = wordsOf(q.text);
      const userWords = wordsOf(userText);
      const maxLen = Math.max(expectedWords.length, userWords.length);
      const wordFeedback = [];
      let textCorrect = true;

      for (let i = 0; i < maxLen; i++) {
        const expected = expectedWords[i] || '';
        const got = userWords[i] || '';
        const correct = normalizeText(got) === normalizeText(expected);
        if (!correct) textCorrect = false;
        wordFeedback.push({ word: expected, correct, got, expected });
      }

      this.verseFeedback[idx] = wordFeedback;
      this.feedback[idx] = { ref: refCorrect, text: textCorrect };
      this.scores[idx] = (refCorrect && textCorrect) ? 1 : 0;
      this.submitted[idx] = true;
    },

    // Grade a user answer against a specific verse, returning feedback object
    gradeVerseHardRow(ua, v) {
      const refCorrect = normalizeText(ua.ref || '') === normalizeText(v.reference);
      const userText = (ua.text || '').trim();
      const expectedWords = wordsOf(v.text);
      const userWords = wordsOf(userText);
      const maxLen = Math.max(expectedWords.length, userWords.length);
      const wordFeedback = [];
      let textCorrect = true;
      let correctWordCount = 0;

      for (let j = 0; j < maxLen; j++) {
        const expected = expectedWords[j] || '';
        const got = userWords[j] || '';
        const correct = normalizeText(got) === normalizeText(expected);
        if (!correct) textCorrect = false;
        else correctWordCount++;
        wordFeedback.push({ word: expected, correct, got, expected });
      }

      return { ref: refCorrect, text: textCorrect, wordFeedback, correctWordCount, maxLen };
    },

    isRowBlank(ua) {
      return !(ua.ref || '').trim() && !(ua.text || '').trim();
    },

    submitAllVersesHard() {
      const results = Array(12).fill(null);
      let earned = 0;
      const claimed = new Set(); // which VERSES indices are claimed
      const wrong = [];

      // Separate blank vs non-blank rows
      const nonBlankRows = [];
      const blankRows = [];
      this.hardAnswers.forEach((ua, i) => {
        if (this.isRowBlank(ua)) blankRows.push(i);
        else nonBlankRows.push(i);
      });

      // Pass 1: match non-blank rows by reference to the FIRST unclaimed verse with that reference
      // This ensures duplicates only claim one verse each
      for (const ri of nonBlankRows) {
        const ua = this.hardAnswers[ri];
        const userRef = normalizeText(ua.ref || '');
        let matchIdx = -1;
        for (let vi = 0; vi < VERSES.length; vi++) {
          if (claimed.has(vi)) continue;
          if (normalizeText(VERSES[vi].reference) === userRef) {
            matchIdx = vi;
            break;
          }
        }
        if (matchIdx !== -1) {
          // Reference matched an unclaimed verse — grade text against it
          claimed.add(matchIdx);
          const grade = this.gradeVerseHardRow(ua, VERSES[matchIdx]);
          const pass = grade.ref && grade.text;
          if (pass) earned++;
          results[ri] = { ...grade, matchedVerse: VERSES[matchIdx], status: 'graded' };
        }
      }

      // Pass 2: non-blank rows with no reference match (wrong ref or duplicate)
      // Mark as incorrect, show the correct verse they should have written
      // Match by text similarity to help show the most relevant correction
      for (const ri of nonBlankRows) {
        if (results[ri]) continue;
        const ua = this.hardAnswers[ri];
        let bestIdx = -1;
        let bestScore = -1;
        for (let vi = 0; vi < VERSES.length; vi++) {
          if (claimed.has(vi)) continue;
          const grade = this.gradeVerseHardRow(ua, VERSES[vi]);
          if (grade.correctWordCount > bestScore) {
            bestScore = grade.correctWordCount;
            bestIdx = vi;
          }
        }
        if (bestIdx !== -1) {
          claimed.add(bestIdx);
          const grade = this.gradeVerseHardRow(ua, VERSES[bestIdx]);
          results[ri] = { ...grade, matchedVerse: VERSES[bestIdx], status: 'wrong' };
        } else {
          // All verses claimed — this is a pure duplicate, mark failed with no match
          results[ri] = { ref: false, text: false, wordFeedback: [], matchedVerse: null, status: 'duplicate' };
        }
      }

      // Pass 3: blank rows — reveal the unclaimed verses, no feedback
      const unclaimed = VERSES.filter((_, vi) => !claimed.has(vi));
      let unclaimedIdx = 0;
      for (const ri of blankRows) {
        const verse = unclaimed[unclaimedIdx] || null;
        unclaimedIdx++;
        results[ri] = { ref: false, text: false, wordFeedback: [], matchedVerse: verse, status: 'blank' };
      }

      // Build wrong list for results screen
      for (let i = 0; i < 12; i++) {
        const r = results[i];
        if (r.status !== 'graded' || !(r.ref && r.text)) {
          if (r.status === 'graded') {
            // Ref matched but text wrong
            wrong.push({ id: r.matchedVerse.id, reference: r.matchedVerse.reference, text: r.matchedVerse.text, mode: 'hard' });
          } else if (r.matchedVerse) {
            wrong.push({ id: r.matchedVerse.id, reference: r.matchedVerse.reference, text: r.matchedVerse.text, mode: 'hard' });
          }
        }
      }

      this.hardFeedback = results;
      this.hardSubmitted = true;

      this.allResults.push({
        type: 'verses_hard',
        label: 'Verses (Hard)',
        earned,
        total: 12,
        wrong
      });
    },

    finishVersesHard() {
      this.sectionQueue = [];
      this.showResults();
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
        } else if (type === 'verses_text' || type === 'verses_ref') {
          totalPossible += 1;
          const earned = this.scores[idx] || 0;
          totalEarned += earned;
          if (earned === 0) {
            wrong.push({ id: q.id, reference: q.reference, text: q.text, mode: q.mode });
          }
        }
      });

      const labels = { fitb: 'Fill in the Blank', tf: 'True or False', verses_text: 'Verses', verses_ref: 'References', verses_hard: 'Verses (Hard)' };
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
