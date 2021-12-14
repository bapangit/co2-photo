import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import { client } from '../apiClients/apiClient'
import { GrAdd } from 'react-icons/gr'
import { MdOutlineDone } from 'react-icons/md'
import defImg from '../assets/img/upload_image.png'
import InfiniteScroll from 'react-infinite-scroll-component';
import MyPhoto from '../components/myComponents/MyPhoto';
import { MyPhotosContext } from '../contexts/MyPhotos';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { AppDataContext } from '../contexts/AppDataContext';
var page = 0
const loadingAmount = 4
const Wrapper = styled.div`
    margin-top: 50px;
`
const UploadSection = styled.div`
    height: 360px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0px 2px 4px #d6c2c2;
    background-color: #f0f0f0;
    padding: 20px;
    .icon{
        min-height: 36px;
        min-width: 36px;
        border-radius: 18px;
        &:hover{
            border: 2px solid black;
        }
    }
    .image{
        height: 320px;
        width: 320px;
        object-fit: scale-down;
    @media (max-width: 576px) {
        height: 160px;
        width: 160px;
        }
    }
`

export default function MyPhotos() {
    const [imageFile, setImageFile] = useState()
    const [uploaded, setUploaded] = useState(false)
    const [isUploadSection, setUploadSection] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [isUploading, setUploading] = useState(false)
    const { myPhotos, setMyPhotos } = useContext(MyPhotosContext)
    const [isPhotosLoaded, setPhotosLoaded] = useState(true)
    const {setDeletedList} = useContext(AppDataContext)
    const uploadImage = () => {
        if (!isUploading) {
            setUploading(true)
            const data = new FormData()
            data.append('image', imageFile)
            client.post('uploadimage', data, {})
                .then(res => {
                    setUploading(false)
                    setUploaded(true)
                    setUploadSection(false)
                    refresh()
                })
                .catch(err => {
                    setUploading(false)
                    console.log(err);
                })
        }
    }

    const loadMore = () => {
        if (isPhotosLoaded) {
            client.post("/myphotos", { p: page }).then(
                res => {
                    if (res.data.length < loadingAmount && navigator.onLine) {
                        setHasMore(false)
                    }
                    setMyPhotos([...myPhotos, ...res.data])
                    page++
                    setPhotosLoaded(false)
                },
                err => {
                    window.addEventListener('online', () => {
                        loadMore()
                    });
                    console.log(err)
                }
            )
        }
    }

    const refresh = () => {
        setDeletedList([])
        page = 0
        setMyPhotos([])
    }



    const UploadPart = () => {
        return <>
            {
                isUploadSection ? <div style={{ cursor: "pointer", margin: "8px", width: "fit-content" }} onClick={() => { setUploadSection(false) }}>Close</div>
                    : <div style={{ cursor: "pointer", margin: "8px", width: "fit-content" }} onClick={() => { setUploadSection(true) }}>Upload Image</div>
            }
            {
                isUploadSection ?
                    <UploadSection>
                        <label htmlFor={"id-upload"}> <GrAdd className="icon" /> </label>
                        <input type="file" id={"id-upload"} hidden={true} accept={"image/*"} onChange={event => {
                            if (event.target.files.length > 0) {
                                setImageFile(event.target.files[0])
                                setUploaded(false)
                            }
                        }} />
                        <div style={{ position: "relative" }}>
                            {isUploading ? <div style={{ position: "absolute", height: "100%", width: "100%", top: "0", left: "0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Loader
                                    type="Circles"
                                    color="#00BFFF"
                                />
                            </div> : null}
                            <img id={"target"} className="image" src={imageFile ? URL.createObjectURL(imageFile) : defImg} alt="add" style={imageFile ? {} : { maxHeight: "60px", maxWidth: "60px" }} />
                        </div>
                        <MdOutlineDone style={imageFile ? (isUploading ? { color: "orange" } : (uploaded ? { color: "grey" } : { color: "green" })) : (isUploading ? { color: "red" } : { color: "grey" })} className="icon" onClick={(imageFile && !uploaded) ? uploadImage : null} />
                    </UploadSection> : null
            }
        </>


    }
    const ScrollPart = () => {
        return <InfiniteScroll style={{ marginTop: "18px" }}
            dataLength={myPhotos.length} //This is important field to render the next data
            next={loadMore}
            hasMore={hasMore}
            loader={
                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40px", marginBottom: "20px" }}>
                    <Loader
                        type="TailSpin"
                        height={40}
                        width={40}
                        color="#00BFFF" />
                </div>
            }
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {myPhotos.map((val, key) => {
                    return <MyPhoto val={val} lastImgUrl={myPhotos[myPhotos.length - 1].photoUrl} setPhotosLoaded={setPhotosLoaded} key={key} index={key} />
                })}
            </div>
        </InfiniteScroll>
    }
    useEffect(() => {
        console.log(myPhotos);
        if (myPhotos.length === 0) {
            loadMore()
        }
    }, [myPhotos])

    return (
        <Wrapper>
            <UploadPart />
            <div style={{ borderBottom: "1px #999 solid" }}></div>
            <ScrollPart />
        </Wrapper>
    )
}
