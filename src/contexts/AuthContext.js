import { createContext, useState } from "react";

export const AuthContext = createContext()
export const AuthProvider = props => {
    const [auth,setAuth] = useState(()=>{
      return localStorage.getItem("refresh_token")?true:false
    })
    return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {props.children}
        </AuthContext.Provider>
    )
}