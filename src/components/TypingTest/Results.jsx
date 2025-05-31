import { useContext } from 'react';
import { TypingContext } from '../../context/TypingContext';

export default function Results() {
  const { stats, history, theme } = useContext(TypingContext);

  if (!stats) {
    return (
      <div className={`results-container ${theme}`}>
        <h2>No test results yet</h2>
        <p>Complete a typing test to see your results</p>
      </div>
    );
  }

  return (
    <div className={`results-container ${theme}`}>
      <h2>Your Results</h2>
      
      <div className="result-cards">
        <div className="result-card">
          <h3>Speed</h3>
          <p className="big-number">{stats.wpm} <span>WPM</span></p>
          <p className="subtext">{stats.cpm} CPM</p>
        </div>
        
        <div className="result-card">
          <h3>Accuracy</h3>
          <p className="big-number">{stats.accuracy}%</p>
          <p className="subtext">{stats.correctChars} correct</p>
        </div>
        
        <div className="result-card">
          <h3>Time</h3>
          <p className="big-number">{stats.timeTaken}s</p>
          <p className="subtext">{stats.testDuration}s test</p>
        </div>
      </div>
      
      <div className="detailed-stats">
        <h3>Detailed Statistics</h3>
        <div className="stats-grid">
          <div>
            <p>Characters: {stats.totalChars}</p>
            <p>Correct: {stats.correctChars}</p>
            <p>Incorrect: {stats.incorrectChars}</p>
          </div>
          <div>
            <p>Words: {stats.wordCount}</p>
            <p>Correct Words: {stats.correctWords}</p>
            <p>Incorrect Words: {stats.incorrectWords}</p>
          </div>
        </div>
      </div>
      
      {history.length > 0 && (
        <div className="history-section">
          <h3>Recent Tests</h3>
          <div className="history-grid">
            {history.map((test, index) => (
              <div key={index} className="history-item">
                <p>{test.wpm} WPM</p>
                <p>{test.accuracy}%</p>
                <p>{test.timeTaken}s</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}