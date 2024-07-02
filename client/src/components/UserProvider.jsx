import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("currentUser"));
        if (savedUser) {
            setUserId(savedUser);
        }
    }, [])

    useEffect(() => {
        return () => {
            window.addEventListener("beforeunload", function (e) {
                localStorage.setItem("currentUser", null)
                let confirmationMessage = "o/";
                (e || window.event).returnValue = confirmationMessage; //Gecko + IE
                return confirmationMessage; //Webkit, Safari, Chrome
            });
        }
    });

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};
