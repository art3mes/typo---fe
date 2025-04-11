import RandomWordsGenerator from "../utils/RandomWordsGenerator";
import InputArea from "./InputArea";
import RenderTypingPrompt from "./RenderTypingPrompt";

const TypingArea = () => {

    const words = RandomWordsGenerator(10);

    return (<div>
        <RenderTypingPrompt words={words} />
        <InputArea /></div>);
};

export default TypingArea;
