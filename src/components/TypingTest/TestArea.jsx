import { useContext, useEffect, useRef } from 'react';
import { TypingContext } from '../../context/TypingContext';

export default function TestArea() {
  const {
    testStarted,
    testFinished,
    timeLeft,
    testText,
    userInput,
    setUserInput,
    startTest,
    endTest,
    testMode,
    difficulty,
    theme
  } = useContext(TypingContext);
  
  const inputRef = useRef(null);

  useEffect(() => {
    if (testStarted) {
      inputRef.current.focus();
    }
  }, [testStarted]);

  const handleInputChange = (e) => {
    if (!testStarted && e.target.value.length > 0) {
      startTest();
    }
    setUserInput(e.target.value);
    
    if (testMode === 'words' && e.target.value.length >= testText.length) {
      endTest();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      endTest();
    }
  };

  const renderTextWithHighlighting = () => {
    return testText.split('').map((char, index) => {
      let className = '';
      if (index < userInput.length) {
        className = char === userInput[index] ? 'correct' : 'incorrect';
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className={`typing-test-container ${theme}`}>
      <div className="test-info">
        <div className="time-left">Time Left: {timeLeft}s</div>
        <div className="mode-indicator">{testMode} mode | {difficulty}</div>
      </div>
      
      <div className="text-display">
        {renderTextWithHighlighting()}
      </div>
      
      <textarea
        ref={inputRef}
        className="typing-input"
        value={userInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={testFinished}
        placeholder={testStarted ? '' : 'Start typing to begin the test...'}
      />
      
      {testFinished && (
        <button className="restart-button" onClick={startTest}>
          Try Again
        </button>
      )}
    </div>
  );
}