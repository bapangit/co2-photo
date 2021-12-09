import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import MenuButton from '../Buttons/MenuButton'
import { AiFillHome } from 'react-icons/ai';
import { MdNoAccounts, MdAccountCircle } from 'react-icons/md'
import { LogoutDialogContext } from '../../contexts/LogoutDialogContext'

const Wrapper = styled.div`
    background-color: #ffd6c7;
    padding: 10px;
    height: 45px;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: 0px 1px 4px #af9d9d;
`
const LogoBox = styled.div`
    font-size: large;
    min-width: 75px;
    color: #2e2a2a;
    padding: 3px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    transition: all .15s ease-in-out;
    &:hover{
        color: #ce355b;
        transform: scale(1.07);
    }
    ${({ highlight }) => {
        return highlight ? true && css`color: #ce355b; transform: scale(1.07);` : true && css``
    }}
`
const LogoName = styled.div`
display: block;
@media (max-width: 480px) {
        display: none;
        }
`
const MenuBox = styled.div`
    display: flex;
    align-items: center;
    width: auto;
    margin-left: 15px;
    justify-content: space-around;
`
const EndBox = styled.div`
    flex: 1;
    display: flex;
    justify-content: end;
`
const LogoutButton = styled.div`
    color: #424242;
    cursor: pointer;
    font-size: smaller;
    display: flex;
    align-items: center;
    font-weight: 400;
    transition: all .15s ease-in-out;
    &:hover{
        transform: translateX(5px);
    }
    /* :active{
        color: #ff3300;
    } */
    .icon{
        transform: scale(1.8);
        margin-right: 10px;
        ${({ auth }) => {
        return auth ? true && css`color: #5a915a` : true && css`color: #d64b4b;`
    }}
    }
    .text{
@media (max-width: 576px) {
        display: none;
        }
    }
`
const menuObjs = [
    { name: "New Photos", path: "/newphotos" },
    { name: "My Photos", path: "/myphotos" },
    { name: "Reported", path: "/reported" }
]
export default function NavigationBar() {
    const { auth } = useContext(AuthContext)
    const { setOpen } = useContext(LogoutDialogContext)
    const navigate = useNavigate()
    const location = useLocation()
    const loging = () => {
        if (auth) {
            setOpen(true)
        } else {
            if (location.pathname !== "/login")
                navigate("/login")
        }
    }
    return (
        <Wrapper className="fixed-top">
            <Link style={{ textDecoration: "none" }} to="/">
                <LogoBox highlight={location.pathname === "/"}>
                    <AiFillHome className="icon-style" />
                    <LogoName>Photos Today</LogoName>
                </LogoBox></Link>
            <MenuBox>
                {menuObjs.map((val, key) => {
                    return <MenuButton name={val.name} path={val.path} icon={val.VscReport} highlight={(location.pathname === val.path)} key={key} />
                })}
            </MenuBox>
            <EndBox>
                <LogoutButton auth={auth} onClick={() => { loging() }}>
                    {auth? <MdAccountCircle className="icon"/> : <MdNoAccounts className="icon"/>}
                    <div>
                        {auth ? "LOGOUT" : "LOGIN"}
                    </div>
                </LogoutButton>
            </EndBox>
        </Wrapper>
    )
}
