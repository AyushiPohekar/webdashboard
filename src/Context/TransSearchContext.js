import { createContext, useState } from 'react';

export const TransSearchContext = createContext();

export const TransSearchProvider = ({ children }) => {
  const [transsearchQuery, setTransSearchQuery] = useState('');

  return (
    <TransSearchContext.Provider value={{ transsearchQuery, setTransSearchQuery }}>
      {children}
    </TransSearchContext.Provider>
  );
};
