import React, { createContext, useEffect, useState } from 'react';

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {

    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
          setToken(savedToken);
        }
    }, [])

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
};
