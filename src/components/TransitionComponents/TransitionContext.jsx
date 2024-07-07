import React, { createContext, useState } from 'react';

export const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
  const [transitioned, setTransitioned] = useState(false);

  return (
    <TransitionContext.Provider value={{ transitioned, setTransitioned }}>
      {children}
    </TransitionContext.Provider>
  );
};