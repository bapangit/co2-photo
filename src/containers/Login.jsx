import React, { useContext, useEffect } from 'react'
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { openClient } from '../apiClients/apiClient';
import { AuthContext } from '../contexts/AuthContext';

const Container = styled.div`
margin-top: 200px;
display: flex;
justify-content: center;
align-items: center;
`
export default function Login() {
    const navigate = useNavigate()
    const { setAuth } = useContext(AuthContext)
    const responseSuccessGoogle = (response) => {
        openClient.post("googlelogin",{ tokenId: response.tokenId }).then(
            res => {
                localStorage.setItem("token", res.data.accessToken);
                localStorage.setItem("refresh_token", res.data.refreshToken);
                localStorage.setItem("email", res.data.email);
                if (res.data.accessToken) {
                    setAuth(true)
                    navigate(-2,{replace:true})
                    
                }
            },
            err => { console.log(err) }
        )
    }
    const responseFailedGoogle = (response) => {
        console.log(response);
    }

    useEffect(() => {

    }, [])

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
