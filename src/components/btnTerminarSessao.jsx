import { useNavigate } from "react-router-dom"
import eventBus from "./eventBus"
import { DoorOpen } from "lucide-react"

function BtnTerminarSessao(){

    const navigate=useNavigate()
    
  
    function TerminarSessao(){

        try {
            eventBus.emit("GetOnWaitingIcon")
            localStorage.removeItem("autenticacao")
            navigate('/login')
            eventBus.emit("GetOffWaitingIcon")
        } catch (error) {
             eventBus.emit("GetOffWaitingIcon")
             eventBus.emit("ActiveSms","Ocorreu um erro ao Terminar Sessão","negativo")
                  
        }
        

    }
    return(
        <div className="flex justify-end">
            <button className=" rounded  mr-7 px-5 md:px-7 py-2 border-1 sm:text-base text-xs  cursor-pointer hover:bg-red-800 border-red-400 hover:border-slate-400 text-red-400 hover:text-slate-200 " onClick={TerminarSessao}><DoorOpen/></button>
        </div>
        
    )
}
export default BtnTerminarSessao