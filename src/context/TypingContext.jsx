import { createContext, useState, useEffect, useCallback } from 'react';

export const TypingContext = createContext();

export function TypingProvider({ children }) {
  const [testStarted, setTestStarted] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [testDuration, setTestDuration] = useState(60);
  const [testText, setTestText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [stats, setStats] = useState(null);
  const [testMode, setTestMode] = useState('time');
  const [difficulty, setDifficulty] = useState('medium');
  const [theme, setTheme] = useState('light');
  const [history, setHistory] = useState([]);

  const generateTestText = useCallback(() => {
    const easyTexts = [
      "The quick brown fox jumps over the lazy dog.",
      "Programming is fun when you understand the basics.",
      "React makes it easy to create interactive UIs."
    ];
    
    const mediumTexts = [
      "The ability to type quickly and accurately is an essential skill in today's digital world.",
      "JavaScript is a versatile language that powers the modern web applications.",
      "Clean code is not written by following rules but by constant practice and refinement."
    ];
    
    const hardTexts = [
      "The phenomenological approach to understanding consciousness posits that subjective experience cannot be fully explained by objective analysis alone.",
      "Quantum computing leverages quantum-mechanical phenomena such as superposition and entanglement to perform calculations.",
      "Type systems in programming languages serve as a formal framework for preventing certain classes of errors and enforcing abstraction boundaries."
    ];
    
    const texts = difficulty === 'easy' ? easyTexts : 
                 difficulty === 'hard' ? hardTexts : mediumTexts;
    
    return texts[Math.floor(Math.random() * texts.length)];
  }, [difficulty]);

  const calculateStats = useCallback(() => {
    const timeTaken = testDuration - timeLeft;
    const totalChars = userInput.length;
    
    let correctChars = 0;
    for (let i = 0; i < Math.min(testText.length, userInput.length); i++) {
      if (testText[i] === userInput[i]) correctChars++;
    }
    
    const incorrectChars = totalChars - correctChars;
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
    
    const cpm = timeTaken > 0 ? Math.round((correctChars / timeTaken) * 60) : 0;
    const wpm = Math.round(cpm / 5);
    
    const testWords = testText.split(/\s+/);
    const userWords = userInput.split(/\s+/);
    let correctWords = 0;
    
    for (let i = 0; i < Math.min(testWords.length, userWords.length); i++) {
      if (testWords[i] === userWords[i]) correctWords++;
    }
    
    const wordCount = userWords.length;
    const incorrectWords = wordCount - correctWords;
    
    return {
      wpm,
      cpm,
      accuracy,
      correctChars,
      incorrectChars,
      totalChars,
      timeTaken,
      testDuration,
      wordCount,
      correctWords,
      incorrectWords
    };
  }, [testText, userInput, timeLeft, testDuration]);

  const startTest = useCallback(() => {
    setTestStarted(true);
    setTestFinished(false);
    setUserInput('');
    setTestText(generateTestText());
    setTimeLeft(testDuration);
    setStats(null);
  }, [generateTestText, testDuration]);

  const endTest = useCallback(() => {
    setTestStarted(false);
    setTestFinished(true);
    const newStats = calculateStats();
    setStats(newStats);
    setHistory(prev => {
      const updatedHistory = [newStats, ...prev].slice(0, 10);
      localStorage.setItem('typingHistory', JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  }, [calculateStats]);

  useEffect(() => {
    if (!testStarted || timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, testStarted, endTest]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('typingHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const value = {
    testStarted,
    testFinished,
    timeLeft,
    testDuration,
    testText,
    userInput,
    setUserInput,
    stats,
    startTest,
    endTest,
    testMode,
    setTestMode,
    difficulty,
    setDifficulty,
    theme,
    setTheme,
    history,
    setTestDuration
  };

  return (
    <TypingContext.Provider value={value}>
      {children}
    </TypingContext.Provider>
  );
}