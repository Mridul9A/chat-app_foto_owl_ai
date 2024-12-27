import React, { createContext, useReducer, useContext } from 'react';

const AppContext = createContext();

const initialState = {
  contacts: [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Robert Johnson' },
  ],
  messages: {
    1: [{ from: 'John Doe', text: 'Hello, how are you?' }],
    2: [{ from: 'Jane Smith', text: 'Hey, let\'s catch up soon!' }],
    3: [{ from: 'Robert Johnson', text: 'Yo, what\'s up?' }],
  },
  selectedContact: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONTACTS':
      return { ...state, contacts: action.payload };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'SET_SELECTED_CONTACT':
      return { ...state, selectedContact: action.payload };
    default:
      return state;
  }
};

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

