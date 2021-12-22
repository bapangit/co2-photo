import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { openClient } from '../apiClients/apiClient'
import InfiniteScroll from 'react-infinite-scroll-component';
import PublicPhoto from '../components/myComponents/PublicPhoto';
var page = 0;

const Wrapper = styled.div`
margin-top: 45px;
background-color: #161616;
`
export default function PhotosToday() {
    const [photos, setPhotos] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const getPhotos = () => {
        openClient.get("photostoday?page=" + page).then(
            res => {
                console.log(res.data);
                setPhotos([...photos, ...res.data])
                page++
                setHasMore(res.data.length === 4)
            },
            err => console.log(err)
        )
    }

    useEffect(() => {
        page = 0
        if (photos.length === 0) {
            getPhotos()
        }
    }, [])

    return (
        <Wrapper>
            <InfiniteScroll
                dataLength={photos.length} //This is important field to render the next data
                next={getPhotos}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center', marginTop: "25px" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                style={{ minHeight: "100vh" }}
            >
                {photos.map((val, key) => {
                    return <PublicPhoto key={key} val={val} />
                })}
            </InfiniteScroll>
        </ Wrapper>
    )
}
