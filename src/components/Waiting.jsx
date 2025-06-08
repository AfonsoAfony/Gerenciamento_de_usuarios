import {useEffect, useState } from "react"
import eventBus from "./eventBus"

function Waiting() {

    const [waitingIconActived,setWaitingIconActived]=useState(false)

    useEffect(()=>{
         eventBus.on("GetOnWaitingIcon", ()=>{
            setWaitingIconActived(true)
        })
         eventBus.on("GetOffWaitingIcon", ()=>{
            setWaitingIconActived(false)
        })
    },[])
       

        

    return(
        <div className={waitingIconActived ? "Mostrar" : "NaoMostrar"}>
            <div className="border-t-4 border-blue-500 border-solid rounded-full w-8 h-8 animate-spin"></div>
        </div>
    )
}
export default Waiting