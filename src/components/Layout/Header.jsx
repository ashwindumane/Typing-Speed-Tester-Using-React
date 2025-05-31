import { useContext } from 'react';
import { TypingContext } from '../../context/TypingContext';

export default function Header({ activeTab, setActiveTab }) {
  const { theme } = useContext(TypingContext);

  return (
    <header className={`app-header ${theme}`}>
      <div className="header-container fancy-header">
        <div className="logo-container">
          <h1 className="fancy-logo">💻 Typing Speed Tester</h1>
        </div>
        
        <nav className="nav-tabs">
          {['test', 'results', 'stats', 'settings'].map((tab) => (
            <button
              key={tab}
              className={`tab-button fancy-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
