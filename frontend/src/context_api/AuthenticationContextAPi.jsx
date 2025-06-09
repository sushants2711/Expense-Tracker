import React, { useState } from "react";
import { createContext } from "react";

export const AuthenticationContextAPi = createContext();

export const AuthenticationContextAPiProvider = ({ children }) => {

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const fetchUserName = () => {
        const name = localStorage.getItem("name");
        const email = localStorage.getItem("email");

        setUserName(name);
        setUserEmail(email);
    };

    const removeUserName = () => {
        localStorage.removeItem("name");
        localStorage.removeItem("email");

        setUserName("");
        setUserEmail("");
    }
    return (
        <AuthenticationContextAPi.Provider value={{ userName, setUserName, userEmail, setUserEmail, fetchUserName, removeUserName }}>
            {children}
        </AuthenticationContextAPi.Provider>
    );
};

