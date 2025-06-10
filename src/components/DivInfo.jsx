import { useEffect, useState } from "react"
import eventBus from "./eventBus"

function DivInfo(params) {

    const [smsActived,setSmsActived]=useState(false)
    const [sms, setSms]=useState("")
    const [smsType, setSmsType]=useState("")

    function ActiveSms(sms,type){
        if(!smsActived){
            setSmsActived(true)
            setSms(sms)

            if(type=='positivo'){
                setSmsType("positivo")
            }
            else{
                setSmsType("negativo")
            }
            
        }
    }
   
        eventBus.on("ActiveSms", ActiveSms)

   useEffect(()=>{
        setTimeout(()=>{
            setSmsActived(false)
        },18000)
   },[smsActived])
   

    return(
        <div className={smsActived ? "Mostrar flex justify-center mt-3" : "NaoMostrar"}>
        <div className="border-2 rounded-2xl border-slate-400 px-5 py-2 justify-center">
            <p className={smsType=="positivo" ? "smsPositiva" : "smsNegativa"}>{sms}</p>
        </div>
        </div>
    )
}
export default DivInfo