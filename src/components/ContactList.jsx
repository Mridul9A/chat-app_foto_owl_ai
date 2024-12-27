import React from 'react';
import { useAppContext } from '../context/AppContext';

function ContactList() {
  const { state, dispatch } = useAppContext();
  const { contacts } = state;

  const handleContactClick = (contact) => {
    dispatch({ type: 'SET_SELECTED_CONTACT', payload: contact });
  };

  return (
    <div className="ContactList">
      <h2>Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id} onClick={() => handleContactClick(contact)}>
            {contact.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
