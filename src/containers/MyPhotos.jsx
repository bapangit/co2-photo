import styled from 'styled-components';
import { openClient } from '../apiClients/openClient'

const Wrapper = styled.div`
    margin-top: 60px;
`
export default function MyPhotos() {
    const test = () => {
        openClient.post("greet").then(
            res => {
                console.log(res.data)
            },
            err => {
                console.log(err)
            }
        )
    }
    return (
        <Wrapper >
            <h3 onClick={()=>{test()}}>My Photos</h3>
        </Wrapper>
    )
}
