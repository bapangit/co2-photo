import { createContext, useState } from "react";

export const AppDataContext = createContext()
export const AppDataProvider = props => {
    const [deletedList,setDeletedList] = useState([])
    return (
        <AppDataContext.Provider value={{deletedList,setDeletedList}}>
            {props.children}
        </AppDataContext.Provider>
    )
}