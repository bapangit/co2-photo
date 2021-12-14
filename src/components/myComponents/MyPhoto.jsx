import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { client } from '../../apiClients/apiClient'
import { MdDelete } from 'react-icons/md'
import { useEffect } from 'react'
import { AppDataContext } from '../../contexts/AppDataContext'
const Wrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
    
`
const Card = styled.div`
    box-shadow: 0px 2px 4px #d6c2c2;
    border-radius: 5px;
    padding: 5px;
    margin-top: 10px;
    margin-bottom: 5px;
width: 576px;
min-height: 160px;
@media (max-width: 767px) {
    width:90%
    }
    position: relative;
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
    .delete-icon{
        font-size: 24px;
        color: gray;
        cursor: pointer;
        :hover{
            color: orangered;
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
    const {deletedList,setDeletedList} = useContext(AppDataContext)
    const deletePhoto = () => {
        client.post("deletephoto", { _id }).then(
            res => { },
            err => { console.log("err"); }
        )
    }
    useEffect(() => {
        if (deletedList.includes(index)) {
            setDeletePhotoState(true)
        }
    }, [deletedList])
    return (
        <>
            <Wrapper>
                <Card>
                    <Image src={photoUrl} onLoad={() => {
                        if (lastImgUrl === photoUrl) {
                            setPhotosLoaded(true)
                        }
                    }} onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = photoUrl
                    }}
                        onClick={deletePhoto} />
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
                {deletePhotoState ? <ToolBar></ToolBar> :
                    <ToolBar>
                        <MdDelete className='delete-icon' onClick={() => { setDeletePanel(true) }} />
                    </ToolBar>
                }
            </Wrapper>

        </>
    )
}
