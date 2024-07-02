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

    useEffect(() => {
        return () => {
            window.addEventListener("beforeunload", function (e) {
                localStorage.setItem("token", null)
                let confirmationMessage = "o/";
                (e || window.event).returnValue = confirmationMessage; //Gecko + IE
                return confirmationMessage; //Webkit, Safari, Chrome
            });
        }
    });

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
};
