import React, { useContext, useState } from 'react'
import styled, { css } from 'styled-components'
import { client } from '../../apiClients/apiClient'
import { MdDelete } from 'react-icons/md'
import { useEffect } from 'react'
import { AppDataContext } from '../../contexts/AppDataContext'
import { BiShow } from 'react-icons/bi'
import { PublicPhotoContext } from '../../contexts/PublicPhotoContext'

const Wrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
width: 100%;
`
const Card = styled.div`
    border-radius: 5px;
    padding: 5px;
    margin-top: 10px;
    margin-bottom: 5px;
    width: 576px;
    min-height: 160px;
    cursor: pointer;
    position: relative;
    @media (max-width: 767px) {
        width:90%
        }
    ${({published})=>{return published? true && css`box-shadow: 0px 4px 7px #3976fa;`: true && css`box-shadow: 0px 2px 4px #d6c2c2;`}}
`
const DeletePanel = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #80808076;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .button{
        margin: 5px;
        padding: 2px;
        padding-left: 15px;
        padding-right: 15px;
        cursor: pointer;
        border-radius: 5px;
        border: 2px solid grey;
        width: 120px;
        text-align: center;
    :hover{
        background-color: #d3d3d36a;
    }
    }
    .delete{
        :hover{
        border: 2px solid orangered;

        }
    }
    .cancel{
        :hover{
            border: 2px solid lightgreen;
        }
    }
`

const Image = styled.img`
    width:100%;
    max-height:75vh;
    object-fit:contain;
`
const ToolBar = styled.div`
    width: 576px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    height: 30px;
    .icon{
        font-size: 24px;
        color: gray;
        cursor: pointer;
        margin-left: 10px;
    }
    .delete{
        :hover{
            color: orangered;
        }
    }
    .publish{
        :hover{
            color: #5c5cff;
        }
    }
    @media (max-width: 767px) {
    width:90%
    }
`


export default function MyPhoto({ val, lastImgUrl, setPhotosLoaded, index }) {
    const [deletePanel, setDeletePanel] = useState(false)
    const [deletePhotoState, setDeletePhotoState] = useState(false)
    const { photoUrl, _id } = val
    const { deletedList, setDeletedList } = useContext(AppDataContext)
    const { publicPhoto, setPublicPhoto } = useContext(PublicPhotoContext) 
    const [toolbarState, setToolbarState] = useState(false)
    const deletePhoto = () => {
        client.post("deletephoto", { _id }).then(
            res => { },
            err => { console.log("err"); }
        )
    }
    const publishPhoto = () => {
        client.post("publish", { _id }).then(
            (res) => {
                setPublicPhoto(res.data.published)
            },
            (err) => { }
        )
    }
    const unPublishPhoto = () => {
        client.post("unpublish").then(
            (res) => {
                setPublicPhoto("null")
            },
            (err) => { }
        )
    }
    useEffect(() => {
        if (deletedList.includes(index)) {
            setDeletePhotoState(true)
            setToolbarState(false)
        }
    }, [deletedList])
    return (
        <>
            <Wrapper onMouseLeave={() => { setToolbarState(false) }}>
                <Card published={(publicPhoto === _id)}>
                    <Image src={photoUrl} onLoad={() => {
                        if (lastImgUrl === photoUrl) {
                            setPhotosLoaded(true)
                        }
                    }} onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = photoUrl
                    }}
                        onClick={() => { setToolbarState(!toolbarState) }}
                    />
                    {deletePhotoState ? <DeletePanel><div style={{ width: "120px", border: "2px solid grey", borderRadius: "5px", textAlign: "center" }}>Deleted</div></DeletePanel> : null}
                    {deletePanel ? <DeletePanel>
                        <div className='button delete' onClick={() => {
                            setDeletePanel(false)
                            deletePhoto()
                            setDeletedList([...deletedList, index])
                        }}>DELETE</div>
                        <div className='button cancel' onClick={() => { setDeletePanel(false) }}>CANCEL</div>
                    </DeletePanel> : null}
                </Card>
                {(toolbarState && !deletePanel) ?
                    <ToolBar>
                        <MdDelete className='icon delete' onClick={() => { setDeletePanel(true) }} />
                        <BiShow className='icon publish' style={publicPhoto === _id? {color:"#5c5cff"} : {color:"gray"}} onClick={publicPhoto === _id? unPublishPhoto : publishPhoto} />
                    </ToolBar>
                    : <ToolBar></ToolBar>
                }
            </Wrapper>

        </>
    )
}
