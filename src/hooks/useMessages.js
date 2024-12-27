
import { useState, useEffect } from "react";
import { InstantDB } from "@instantdb/react";
import { useAppContext } from "../context/AppContext";
import { useIndexedDB } from "react-indexed-db";

const db = new InstantDB({
  appId: process.env.VITE_APP_ID,
});

const useMessages = (contactId) => {
  const { state, dispatch } = useAppContext();
  const { getAll, add } = useIndexedDB("messages");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (contactId) {
      // Fetch messages from InstantDB (real-time database)
      db.getMessages(contactId).then((msg) => {
        dispatch({ type: "SET_MESSAGES", payload: msg });
        setMessages(msg);
      });

      // Fetch messages from IndexedDB for offline support
      getAll().then((msgs) => {
        const filteredMsgs = msgs.filter((msg) => msg.contactId === contactId);
        setMessages(filteredMsgs);
      });
    }
  }, [contactId]);

  const sendMessage = (message) => {
    // Send message to InstantDB
    db.sendMessage(contactId, message).then(() => {
      add({ contactId, message, timestamp: Date.now() });
      setMessages((prev) => [...prev, { message, timestamp: Date.now() }]);
    });
  };

  return {
    messages,
    sendMessage,
  };
};

export default useMessages;

