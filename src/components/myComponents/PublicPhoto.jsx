import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
width: 100%;
display: flex;
justify-content: center;
background-color: #000000;
`
const Image = styled.img`
width:100%;
max-height:75vh;
object-fit:contain;
margin: 20px;
`
export default function PublicPhoto({ val }) {
    return (
        <Wrapper >
            <Image src={val.photoUrl} alt=""  />
        </Wrapper>
    )
}
