import React, { createContext, useState } from 'react';

export const VRContext = createContext();

export const VRProvider = ({ children }) => {
    const [game, setGame] = useState(false);
    const [about, setAbout] = useState(false);

    return (
        <VRContext.Provider value={{ game, setGame, about, setAbout }}>
            {children}
        </VRContext.Provider>
    );
};