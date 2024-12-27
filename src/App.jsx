import React from 'react';
import ContactList from './components/ContactList';
import ChatWindow from './components/ChatWindow';
import './styles.css'; 

function App() {
  return (
    <div className="App">
      <div className="AppLayout">
        <div className="LeftPanel">
          <ContactList />
        </div>
        <div className="RightPanel">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}

export default App;

