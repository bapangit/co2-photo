import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function MyPhoto({ val }) {
    const { photoUrl } = val
    return (
        <div style={{width:"100vw",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div style={{position:"relative",width:"fit-content"}}>
            <div style={{position:"absolute",height:"100%",width:"100%",top:"0",left:"0",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Loader
                    type="TailSpin"
                    color="#00BFFF"
                    height={80}
                    width={80}
                    timeout={500}
                />
            </div>
            <img style={{ maxHeight: "280px", margin: "40px",maxWidth:"80vw"}} src={photoUrl} alt="myphoto" />
        </div>
        </div>
    )
}
