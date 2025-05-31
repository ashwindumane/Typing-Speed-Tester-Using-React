import { useContext } from 'react';
import { TypingContext } from '../../context/TypingContext';

export default function Settings() {
  const {
    testMode,
    setTestMode,
    testDuration,
    setTestDuration,
    difficulty,
    setDifficulty,
    theme,
    setTheme
  } = useContext(TypingContext);

  return (
    <div className={`settings-container ${theme}`}>
      <h2>Settings</h2>
      
      <div className="settings-group">
        <h3>Test Mode</h3>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="testMode"
              value="time"
              checked={testMode === 'time'}
              onChange={() => setTestMode('time')}
            />
            Time Mode
          </label>
          <label>
            <input
              type="radio"
              name="testMode"
              value="words"
              checked={testMode === 'words'}
              onChange={() => setTestMode('words')}
            />
            Word Count Mode
          </label>
        </div>
      </div>
      
      <div className="settings-group">
        <h3>Test Duration (seconds)</h3>
        <input
          type="range"
          min="15"
          max="180"
          step="15"
          value={testDuration}
          onChange={(e) => setTestDuration(Number(e.target.value))}
        />
        <span>{testDuration} seconds</span>
      </div>
      
      <div className="settings-group">
        <h3>Difficulty Level</h3>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="difficulty"
              value="easy"
              checked={difficulty === 'easy'}
              onChange={() => setDifficulty('easy')}
            />
            Easy
          </label>
          <label>
            <input
              type="radio"
              name="difficulty"
              value="medium"
              checked={difficulty === 'medium'}
              onChange={() => setDifficulty('medium')}
            />
            Medium
          </label>
          <label>
            <input
              type="radio"
              name="difficulty"
              value="hard"
              checked={difficulty === 'hard'}
              onChange={() => setDifficulty('hard')}
            />
            Hard
          </label>
        </div>
      </div>
      
      <div className="settings-group">
        <h3>Theme</h3>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="theme"
              value="light"
              checked={theme === 'light'}
              onChange={() => setTheme('light')}
            />
            Light
          </label>
          <label>
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={theme === 'dark'}
              onChange={() => setTheme('dark')}
            />
            Dark
          </label>
        </div>
      </div>
    </div>
  );
}

