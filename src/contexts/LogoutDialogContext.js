import { createContext, useState } from "react";

export const LogoutDialogContext = createContext()
export const LogOutDialogProvider = props => {
    const [isOpen,setOpen] = useState(false)
    return (
        <LogoutDialogContext.Provider value={{isOpen,setOpen}}>
            {props.children}
        </LogoutDialogContext.Provider>
    )
}