import { DEFAULT_WORD_COUNT } from "./constants";
import { wordStore } from "./wordStore";

const RandomWordsGenerator = (count = DEFAULT_WORD_COUNT) => {
  const arr = [...wordStore];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
};

export default RandomWordsGenerator;
