import { useNavigate } from "react-router-dom"
import eventBus from "./eventBus"

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
            <button className=" rounded mb-3 mr-7 bg-red-800 px-5 md:px-7 py-2 border-1 sm:text-base text-xs  cursor-pointer border-slate-400 text-slate-100" onClick={TerminarSessao}>Terminar Sessão</button>
        </div>
        
    )
}
export default BtnTerminarSessao