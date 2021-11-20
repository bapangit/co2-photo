import axios from 'axios';
import React, { useEffect } from 'react'
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const Container = styled.div`
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`
export default function Login() {
    const navigate = useNavigate()
    const responseSuccessGoogle = (response) => {
        axios({
            method: "POST"
            , url: "http://localhost:5000/googlelogin"
            , data: { tokenId: response.tokenId }
        }).then(
        res=>{
            localStorage.setItem("tokens", JSON.stringify(res.data));
            navigate('/')
        },
        err=>{console.log("error"+err)}
        )
    }
    const responseFailedGoogle = (response) => {
        console.log(response);
    }

    useEffect(()=>{
        
    },[])

    return (
        <Container>
            <GoogleLogin
                clientId="750954656780-ake4tf418u0l4in49c0cs58f7aotu6fu.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseFailedGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </Container>
    )
}
