const RenderTypingPrompt = ({ words }) => {
    const renderSpans = () => {
        const spans = [];
        console.log("ender", words)

        words.forEach((word, wordIndex) => {
            for (let char of word) {
                spans.push(<span key={spans.length}>{char}</span>);
            }
            if (wordIndex !== words.length - 1) {
                spans.push(<span key={spans.length}> </span>);
            }
        });

        return spans;
    };

    return renderSpans();
};

export default RenderTypingPrompt;
