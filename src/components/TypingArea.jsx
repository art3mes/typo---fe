import { useDispatch } from "react-redux";
import { flattenWordsToChars } from "../utils/Helper";
import RandomWordsGenerator from "../utils/RandomWordsGenerator";
import CountdownTimer from "./CountDownTimer";
import InputArea from "./InputArea";
import RenderTypingPrompt from "./RenderTypingPrompt";
import Reset from "./Reset";
import { setPrompt } from "../store/actions/typingActions";
import Refresh from "./Refresh";
import ScoreCard from "./ScoreCard";
import { useEffect, useRef, useState } from "react";

const TypingArea = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(true);

  useEffect(() => {
    const words = RandomWordsGenerator();
    const promptChars = flattenWordsToChars(words);
    dispatch(setPrompt(promptChars));
  }, [dispatch]);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);

    return () => {
      input.removeEventListener("focus", handleFocus);
      input.removeEventListener("blur", handleBlur);
    };
  }, []);

  const handlePromptMouseDown = (e) => {
    e.preventDefault();
    inputRef.current?.focus();
  };

  return (
    <div>
      <CountdownTimer duration={60} />
      <div
        onMouseDown={handlePromptMouseDown}
        className={`transition-all ${isFocused ? "opacity-100" : "opacity-50 blur-sm"}`}
      >
        <RenderTypingPrompt />
      </div>
      <InputArea ref={inputRef} />
      <Reset /> <Refresh /> <ScoreCard />
    </div>
  );
};

export default TypingArea;
