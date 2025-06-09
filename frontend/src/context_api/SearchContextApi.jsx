import React, { createContext, useState } from 'react'

export const SearchContextApi = createContext();

export const SearchContextApiProvider = ({ children }) => {

    const[searchData, setSearchData] = useState([]);

    return(
       <SearchContextApi.Provider value={{ searchData, setSearchData }}>
        { children }
       </SearchContextApi.Provider>
    )
}
