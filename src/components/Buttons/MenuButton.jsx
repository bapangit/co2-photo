import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { VscGistSecret } from 'react-icons/vsc'
import { MdOutlineWallpaper } from 'react-icons/md'
import { VscReport } from 'react-icons/vsc'


const Button = styled.div`
font-size: smaller;
padding: 3px;
color: #224238;
display: flex;
flex-direction: row;
min-width: 36px;
transition: all .2s ease-in-out;
&:hover{
        color: #851313;
        transform: scale(1.06);
    }
${({ highlight }) => {
        return highlight ? true && css`color: #851313; transform: scale(1.06);` : true && css``
    }}
`
const Icon = styled.div`
    margin-right: 5px;
    display: flex;
    align-items: center;
    @media (max-width: 576px) {
        transform: scale(1.25);
        }
`
const Name = styled.div`
display: block;
@media (max-width: 576px) {
        display: none;
        }
`
export default function MenuButton({ path, name, highlight }) {
    return (
        <Link className="menu-button" to={path}>
            <Button highlight={highlight}>
                <Icon>
                    {(path === "/myphotos") ? <VscGistSecret /> : (path === "/newphotos") ? <MdOutlineWallpaper /> : <VscReport />}
                </Icon>
                <Name>{name}</Name>
            </Button>
        </Link>
    )
}
