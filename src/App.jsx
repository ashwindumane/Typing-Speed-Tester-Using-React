import { useState } from 'react';
import { TypingProvider } from './context/TypingContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import TestArea from './components/TypingTest/TestArea';
import Results from './components/TypingTest/Results';
import Stats from './components/TypingTest/Stats';
import Settings from './components/TypingTest/Settings';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('test');

  return (
    <TypingProvider>
      <div className="app-container">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="main-content">
          {activeTab === 'test' && <TestArea />}
          {activeTab === 'results' && <Results />}
          {activeTab === 'stats' && <Stats />}
          {activeTab === 'settings' && <Settings />}
        </main>
        
        <Footer />
      </div>
    </TypingProvider>
  );
}

export default App;