import React, { createContext, useState } from 'react';

export const ZoomContext = createContext();

export const ZoomProvider = ({ children }) => {
  const [zoomed, setZoomed] = useState(false);

  return (
    <ZoomContext.Provider value={{ zoomed, setZoomed }}>
      {children}
    </ZoomContext.Provider>
  );
};