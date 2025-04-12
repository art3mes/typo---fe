export const flattenWordsToChars = (words) => {
  const chars = [];

  words.forEach((word, index) => {
    for (let char of word) {
      chars.push(char);
    }
    if (index !== words.length - 1) {
      chars.push(" ");
    }
  });

  return chars;
};

export const highlightPromptChar = (index, type) => {
  const el = document.getElementById(`prompt-${index}`);
  if (!el) return;

  const highlightClasses = ["correct-char", "incorrect-char", "current-char"];
  el.classList.remove(...highlightClasses);

  if (type && type !== "reset") {
    el.classList.add(`${type}-char`);
  }
};

export const getTimerTime = (startTime) => {
  return Math.floor((new Date() - startTime) / 1000);
};

export const calculateWPM = (charCount, startTime) => {
  const now = Date.now();
  const elapsedTimeInMinutes = (now - startTime) / 1000 / 60;

  if (elapsedTimeInMinutes <= 0 || charCount === 0) return 0;

  const wordsTyped = charCount / 5;
  const wpm = wordsTyped / elapsedTimeInMinutes;

  return Math.round(wpm);
};

export const calculateAccuracy = (correctCount, errorCount) => {
  console.log(correctCount, errorCount);
  if (correctCount > 0)
    return Math.round((correctCount / (correctCount + errorCount)) * 100);

  return 0;
};
