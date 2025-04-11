import { useDispatch, useSelector } from "react-redux";
import { appendChar, removeLastChar } from "../store/actions/typingActions";

const InputArea = () => {
    const dispatch = useDispatch();
    const typedText = useSelector((state) => state.typing.typedText);

    const handleKeyDown = (e) => {
        if (e.key === "Backspace") {
            dispatch(removeLastChar());
        } else if (e.key.length === 1) {
            dispatch(appendChar(e.key));
        }
    };

    return (
        <div className="p-4">
            <textarea
                className="w-full h-40 p-2 border border-gray-300 rounded"
                value={typedText}
                onKeyDown={handleKeyDown}
                onChange={() => { }}
                placeholder="Type something..."
            />
        </div>
    );
};

export default InputArea;
