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

  if (type && type !== "reset" && highlightClasses.includes(`${type}-char`)) {
    el.classList.add(`${type}-char`);
  }
};

export const getTimerTime = (startTime) => {
  return Math.floor((new Date() - startTime) / 1000);
};
