import styled from 'styled-components';
import { useState } from 'react';
import { client } from '../apiClients/client'
import { GrAdd } from 'react-icons/gr'
import { MdOutlineDone } from 'react-icons/md'
import defImg from '../assets/img/upload_image.png'
var isUploading = false;
const Wrapper = styled.div`
    margin-top: 50px;
`
const UploadSection = styled.div`
    height: 360px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0px 2px 4px #d6c2c2;
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
    const [uploaded,setUploaded] = useState(false)
    const [isUploadSection,setUploadSection] = useState(true)
    console.log(process.env.HEROKU_BASE_URL);
    const uploadImage = () => {
        if (!isUploading) {
            isUploading = true;
            const data = new FormData()
            data.append('image', imageFile)
            client.post('uploadimage', data, {})
                .then(res => {console.log(res); isUploading = false; setUploaded(true) })
                .catch(err => { console.log(err); isUploading = false })
        }
    }

    return (
        <Wrapper>
            {isUploadSection?<>
                <div style={{cursor:"pointer",margin:"8px",width:"fit-content"}} onClick={() => {setUploadSection(false)}}>Close</div>
            <UploadSection>
                <label htmlFor={"id-upload"}> <GrAdd className="icon" /> </label>
                <input type="file" id={"id-upload"} hidden={true} accept={"image/*"} onChange={event => {
                    if (event.target.files.length > 0){
                        setImageFile(event.target.files[0])
                        setUploaded(false)
                    }
                }} />
                <img id={"target"} className="image" src={imageFile ? URL.createObjectURL(imageFile) : defImg} alt="add" style={imageFile?{}:{maxHeight:"60px",maxWidth:"60px"}} />
                <MdOutlineDone  style={uploaded ? { color: "grey" } : { color: "green" }} className="icon" onClick={(imageFile && !uploaded) ? uploadImage : null} />
            </UploadSection>
            </>
            : <div style={{cursor:"pointer",margin:"8px",width:"fit-content"}} onClick={() => {setUploadSection(true)}}>Upload Image</div>
        }
        <div>This is a div</div>
        </Wrapper>
    )
}
