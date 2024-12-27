import { InstantDBProvider, useInstantDB } from '@instantdb/react';



const db = new InstantDB('chatApp', { messages: [] });

export const saveMessageToDB = (message) => {
  db.push('messages', message);
};

export const getMessagesFromDB = (contactId) => {
  return db.get('messages').filter((msg) => msg.contactId === contactId);
};
