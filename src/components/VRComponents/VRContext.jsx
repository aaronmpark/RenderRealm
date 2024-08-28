import React, { createContext, useState } from 'react';

export const VRContext = createContext();

export const VRProvider = ({ children }) => {
    const [game, setGame] = useState(false);

    return (
        <VRContext.Provider value={{ game, setGame }}>
            {children}
        </VRContext.Provider>
    );
};