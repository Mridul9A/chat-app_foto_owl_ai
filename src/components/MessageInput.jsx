import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

function MessageInput({ contactId }) {
  const [messageText, setMessageText] = useState('');
  const { state, dispatch } = useAppContext();

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        from: 'You',
        text: messageText,
      };

      dispatch({
        type: 'SET_MESSAGES',
        payload: {
          ...state.messages,
          [contactId]: [...(state.messages[contactId] || []), newMessage],
        },
      });

      setMessageText('');
    }
  };

  return (
    <div className="MessageInput">
      <input
        type="text"
        placeholder="Type a message"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default MessageInput;

