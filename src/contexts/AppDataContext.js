import { createContext, useState } from "react";

export const AppDataContext = createContext()
export const AppDataProvider = props => {
    const [deletedList,setDeletedList] = useState([])
    const [hasMore,setHasMore] = useState(true)
    return (
        <AppDataContext.Provider value={{deletedList,setDeletedList,hasMore,setHasMore}}>
            {props.children}
        </AppDataContext.Provider>
    )
}