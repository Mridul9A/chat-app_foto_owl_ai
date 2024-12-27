import React from 'react';
import { useAppContext } from '../context/AppContext';
import Message from './Message';
import MessageInput from './MessageInput';

function ChatWindow() {
  const { state, dispatch } = useAppContext();
  const { selectedContact, messages } = state;

  if (!selectedContact) {
    return <div className="ChatWindow">Select a contact to start chatting.</div>;
  }

  const chatMessages = messages[selectedContact.id] || [];

  return (
    <div className="ChatWindow">
      <h3>{selectedContact.name}</h3>
      <div className="Messages">
        {chatMessages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
      </div>
      <MessageInput contactId={selectedContact.id} />
    </div>
  );
}

export default ChatWindow;

