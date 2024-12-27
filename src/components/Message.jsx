
import React from 'react';

function Message({ message }) {
  return (
    <div className="Message">
      <strong>{message.from}:</strong> {message.text}
    </div>
  );
}

export default Message;
