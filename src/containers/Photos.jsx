import { useState } from 'react'
import styled from 'styled-components'
import { openClient } from '../apiClients/openClient'

const Wrapper = styled.div`
margin-top: 60px;
`
export default function Photos() {
    const[text,setText] = useState("click here")
    var callFunction = () => {
        openClient.post("greet").then(
            res => {
                setText(res.data)
            },
            err => {
                console.log(err)
            }
        )
    }
    
    return (
        <>
            <Wrapper><div style={{cursor:"pointer"}} onClick={()=>{callFunction()}}>{text}</div></Wrapper>
        </>
    )
}
