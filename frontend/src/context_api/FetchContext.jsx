import React, { useState } from 'react'
import { createContext } from 'react'
import { handleSuccess } from '../toast_message/successMessage';
import { handleError } from '../toast_message/errorMessage';

export const FetchContext = createContext();

export const FetchContextProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [received, setReceived] = useState(0);
    const [spent, setSpent] = useState(0);
    const [remaining, setRemaining] = useState(0);

    const fetchAlways = async () => {
        try {
            const url = `http://localhost:1200/api/expense/fetch-all`;

            const response = await fetch(url, {
                method: "GET",
                credentials: "include"
            });

            const result = await response.json();
            
            const { success, message, data, received, remainingAmount, spent , error} = result;

            if(success) {
                // handleSuccess(message);
                setData(data);
                setReceived(received);
                setRemaining(remainingAmount);
                setSpent(spent);
            }else {
                handleError(message)  || handleError(error);
            };
        } catch (error) {
            handleError(error.message);
        };
    };

    return (
        <FetchContext.Provider value={{ data, fetchAlways, received, spent, remaining }}>
            {children}
        </FetchContext.Provider>
    )
}