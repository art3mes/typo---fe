import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import CountdownTimer from "./CountDownTimer";
import InputArea from "./InputArea";
import ScoreCard from "../score/RenderScoreCard";
import RenderTypingPrompt from "./RenderTypingPrompt";
import { setPrompt } from "../../store/actions/typingActions";
import { COUNTDOWN } from "../../utils/constants";
import { flattenWordsToChars, generateRandomWords } from "../../utils/helper";

const TypingArea = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(true);

  useEffect(() => {
    const words = generateRandomWords();
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
    <div className="flex flex-col items-center gap-10 w-[90%]">
      <div className="flex flex-row gap-4">
        <div className="">
          <CountdownTimer duration={COUNTDOWN} />
        </div>
        <div
          onMouseDown={handlePromptMouseDown}
          className={`transition-all ${isFocused ? "opacity-100" : "opacity-70 blur-xs"}`}
        >
          <RenderTypingPrompt />
        </div>
        <InputArea ref={inputRef} />
      </div>
      <ScoreCard />
    </div>
  );
};

export default TypingArea;
