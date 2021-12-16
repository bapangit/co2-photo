import { createContext, useState } from "react";

export const PublicPhotoContext = createContext()
export const PublicPhotoProvider = props => {
    const [publicPhoto,setPublicPhoto] = useState("null")
    return (
        <PublicPhotoContext.Provider value={{publicPhoto,setPublicPhoto}}>
            {props.children}
        </PublicPhotoContext.Provider>
    )
}