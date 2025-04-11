import { ID_TEXT_AREA } from '../config/ids.config';
import words from '../config/words.config';
import { TimerStore } from './timer.store';
import { createSelector } from 'better-zustand-selector';
import { create } from 'zustand';

export const engineStore = create((set, get) => ({
    text: [],
    textString: '',
    caretPosition: { x: 0, y: 0 },
    userInput: '',
    textAreaFocus: true,

    setTextAreaFocus: (textAreaFocus) => {
        TimerStore.store.getState().pauseTimer();
        set({ textAreaFocus });
    },

    setCaretPosition: (caretPosition) => {
        set({ caretPosition });
    },

    setUserInput: (userInput) => {
        set({ userInput });
    },

    setText: (text) => {
        set({ text, textString: text.join(' ') });
    },

    restart: () => {
        const { focusTextArea, setUserInput, setCaretPosition } = get();

        focusTextArea();
        setUserInput('');
        setCaretPosition({ x: 0, y: 0 });

        TimerStore.store.getState().resetTimer();
    },

    generateText: () => {
        const { focusTextArea, restart, setText } = get();
        const { resetTimer } = TimerStore.store.getState();

        focusTextArea();
        TimerStore.set({ hasTimerEnded: false });
        resetTimer();

        const currText = [];

        while (currText.length < 45) {
            const index = (Math.random() * (words.length - 1)) >> 0;
            currText.push(words[index]);
        }

        restart();
        setText(currText);
    },

    appendText: () => {
        const { text, setText } = get();
        const newWords = [...text];

        while (newWords.length < text.length + 45) {
            const index = (Math.random() * words.length) >> 0;
            newWords.push(words[index]);
        }

        setText(newWords);
    },

    focusTextArea: () => document.getElementById(ID_TEXT_AREA)?.focus(),
}));

export const useEngine = createSelector(engineStore);
