import { useContext } from 'react';
import { TypingContext } from '../../context/TypingContext';

export default function Stats() {
  const { history, theme } = useContext(TypingContext);

  if (history.length === 0) {
    return (
      <div className={`stats-container ${theme}`}>
        <h2>No statistics yet</h2>
        <p>Complete some typing tests to see your progress</p>
      </div>
    );
  }

  const averageWPM = Math.round(history.reduce((sum, test) => sum + test.wpm, 0) / history.length);
  const averageAccuracy = Math.round(history.reduce((sum, test) => sum + test.accuracy, 0) / history.length);
  const bestWPM = Math.max(...history.map(test => test.wpm));

  return (
    <div className={`stats-container ${theme}`}>
      <h2>Your Statistics</h2>
      
      <div className="overview-cards">
        <div className="overview-card">
          <h3>Tests Completed</h3>
          <p className="big-number">{history.length}</p>
        </div>
        
        <div className="overview-card">
          <h3>Average WPM</h3>
          <p className="big-number">{averageWPM}</p>
        </div>
        
        <div className="overview-card">
          <h3>Average Accuracy</h3>
          <p className="big-number">{averageAccuracy}%</p>
        </div>
        
        <div className="overview-card">
          <h3>Best WPM</h3>
          <p className="big-number">{bestWPM}</p>
        </div>
      </div>
      
      <div className="history-chart">
        <h3>Progress Over Time</h3>
        <div className="chart-container">
          {history.map((test, index) => (
            <div key={index} className="chart-bar-container">
              <div 
                className="chart-bar wpm-bar" 
                style={{ height: `${(test.wpm / bestWPM) * 100}%` }}
                title={`${test.wpm} WPM`}
              ></div>
              <div 
                className="chart-bar accuracy-bar" 
                style={{ height: `${test.accuracy}%` }}
                title={`${test.accuracy}% Accuracy`}
              ></div>
              <div className="chart-label">{index + 1}</div>
            </div>
          ))}
        </div>
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-color wpm-color"></div>
            <span>WPM</span>
          </div>
          <div className="legend-item">
            <div className="legend-color accuracy-color"></div>
            <span>Accuracy</span>
          </div>
        </div>
      </div>
    </div>
  );
}