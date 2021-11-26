import React,{useContext} from 'react'
import styled from 'styled-components';
import { AuthContext } from '../../../contexts/AuthContext';
import { LogoutDialogContext } from '../../../contexts/LogoutDialogContext';
import Dialog from './Dialog';

const ButtonBar = styled.div`
width: fit-content;
margin-top: 25px;
display: flex;
justify-content: space-between;
align-items: center;
.button{
    cursor: pointer;
    margin-right: 50px;
    &:hover{
        color: #e2594f;
    }
}
`
export default function LogOutDialog() {
    const { isOpen, setOpen } = useContext(LogoutDialogContext)
    const {setAuth} = useContext(AuthContext)
    const logOut = () => {
        setAuth(false)
        localStorage.setItem("token", "")
        localStorage.setItem("refresh_token", "")
        setOpen(false)
    }
    return (
        <div>
            <Dialog isOpen={isOpen} onClose={() => { setOpen(false) }}>Are you sure ?
                <ButtonBar>
                    <div className="button" onClick={() => { setOpen(false) }}>CANCEL</div>
                    <div className="button" onClick={logOut}>LOGOUT</div>
                </ButtonBar>
            </Dialog>
        </div>
    )
}
