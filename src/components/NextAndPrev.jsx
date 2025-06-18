import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import { useEffect, useState } from "react";
import eventBus from "./eventBus";
import { useNavigate } from "react-router-dom";

function NextAndPrev({temDadosDeUsuarios}){
    
    const navigate=useNavigate()

const [numberUsers,setNumberUsers]=useState(0)

const [numberPag,setNumberPag]=useState(1)

//Function for Next Pag
function NextTenUsers(){
 
     if(localStorage.getItem("autenticacao")==null && localStorage.getItem("autenticacao")!="autenticado"){
                                                                                        navigate('/login')
                                                                                        return;
                                                                                                            }
        else{
              try {

   eventBus.emit("GetOnWaitingIcon")
    if(temDadosDeUsuarios){
         console.log(temDadosDeUsuarios)

        setNumberUsers(numberUsers+30)
         setNumberPag(numberPag+1)
       
    }
    else{
         console.log(temDadosDeUsuarios)
         setNumberUsers(0)
         setNumberPag(1)
         
    }
     
   } catch (error) {
    eventBus.emit("GetOffWaitingIcon")
    console.log("Erro ao mudar pra próxima página de usuários: ", error)
    eventBus.emit("ActiveSms","Erro ao mudar para a próxima página de usuários . Actualize a página por favor e tente novamente","negativo") 
   }
   finally{
    eventBus.emit("GetOffWaitingIcon")
   }
}
}

//Function for PrevPag

function PrevTenUsers(){
 
     if(localStorage.getItem("autenticacao")==null && localStorage.getItem("autenticacao")!="autenticado"){
                                                                                        navigate('/login')
                                                                                        return;
                                                                                                            }
        else{
              try {

   eventBus.emit("GetOnWaitingIcon")
    if(numberPag>1){
        setNumberUsers(numberUsers-30)
         setNumberPag(numberPag-1)
       
    }
     
   } catch (error) {
    eventBus.emit("GetOffWaitingIcon")
    console.log("Erro ao retroceder de página de usuários: ", error)
    eventBus.emit("ActiveSms","Erro ao retroceder para a página anterior . Actualize a página por favor e tente novamente","negativo") 
   }
   finally{
    eventBus.emit("GetOffWaitingIcon")
   }
}
}


//Execute fexh when numberPag or numberUsers be updated
useEffect(()=> eventBus.emit("executarFuncao",`https://dummyjson.com/users?limit=30&skip=${numberUsers}`),[numberPag,numberUsers])

    return (
        <div className="flex justify-center my-5 ">
            
            <ArrowBigLeftDash onClick={PrevTenUsers} className="md:size-8 hover:text-blue-800 cursor-pointer"/>
           <span className="md:text-2xl mx-5 text-slate-400">{numberPag}</span>
            <ArrowBigRightDash onClick={NextTenUsers} className="md:size-8 hover:text-blue-800 cursor-pointer"/>
        </div>
        
    )
}
export default NextAndPrev;