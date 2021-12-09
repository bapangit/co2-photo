import { createContext, useState } from "react";

export const MyPhotosContext = createContext()
export const MyPhotosProvider = props => {
    const [myPhotos,setMyPhotos] = useState([])
    return (
        <MyPhotosContext.Provider value={{myPhotos,setMyPhotos}}>
            {props.children}
        </MyPhotosContext.Provider>
    )
}