import {client} from '../apiClient/client'

export default function Photos() {
    var callFunction = () => {
        client.post("greet").then(
            res => {
                console.log(res.data)
            },
            err => {
                console.log("error")
                console.log(err)
            }
        )
    }
    
    
    return (
        <>
            <div onClick={()=>{callFunction()}}>photos</div>
        </>
    )
}
