import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPrompt } from "../store/actions/typingActions";
import { flattenWordsToChars } from "../utils/Helper";

const RenderTypingPrompt = ({ words }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const promptChars = flattenWordsToChars(words);
        dispatch(setPrompt(promptChars));
    }, [words, dispatch]);

    const renderSpans = () => {
        const spans = flattenWordsToChars(words).map((char, index) => (
            <span id={`prompt-${index}`} key={index}>{char}</span>
        ));
        return spans;
    };

    return <div>{renderSpans()}</div>;
};

export default RenderTypingPrompt;
