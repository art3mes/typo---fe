import RandomWordsGenerator from "../utils/RandomWordsGenerator";
import RenderTypingPrompt from "./RenderTypingPrompt";

const TypingArea = () => {
    const words = [
        "skivvying",
        "undercarriage",
        "mir",
        "ruminative",
        "rabble",
        "mohair",
        "isoforms",
        "cairn",
        "ovality",
        "vacuolated",
        "feasances",
        "atonic",
        "riboflavin",
        "vilifications",
        "sisterly",
        "subserviently",
        "carbuncled",
        "dressmakers",
        "remade",
        "antepasts",
        "whizzing",
        "narc",
        "epizootiology",
        "nitrosyl",
        "shrievalties",
        "shepherds"];
    return (<RenderTypingPrompt words={words} />);
};

export default TypingArea;
