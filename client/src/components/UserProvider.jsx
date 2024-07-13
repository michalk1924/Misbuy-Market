import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("currentUser");
        console.log(savedUser);
        if (savedUser) {
            setUserId(savedUser);
        }
    }, [])

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};
