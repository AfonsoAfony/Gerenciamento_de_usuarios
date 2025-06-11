import { UserPen, UserRoundX } from "lucide-react"
import eventBus from "./eventBus";
import "../App.css/"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BtnUpdate({Id,FirstName,LastName,Age,Email,Password}) {
   //Calling useNavigate
const navigate=useNavigate()

    const [ActivarEDesactivarBtnUpDate,setActivarEDesactivarBtnUpDate]=useState(false)

     //create function for active BtnUpdate in click of tr of table
         eventBus.on("ActivarEDesactivarBtnUpDate",()=>{
          if(!ActivarEDesactivarBtnUpDate){
            setActivarEDesactivarBtnUpDate(true)
            eventBus.emit("DesactivarBtnSave")
          }
        })   
   
    
  
    
    /*Creating function to save the data of user on Data base 
      Note: the data won´t be saved in the server it just simulate the Post inside database through the API */
function updateUser(){
         if(localStorage.getItem("autenticacao")==null && localStorage.getItem("autenticacao")!="autenticado"){
                                                                                        navigate('/login')
                                                                                        return;
                                                                                                            }
        else{
            eventBus.emit("GetOnWaitingIcon")

        fetch(`https://dummyjson.com/users/${Id}`,{
            method:'put',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                firstName:FirstName,
                lastName:LastName,
                age:Age,
                email:Email,
                password:Password
                }
                
            )
            
        }) 
       
        .then(res=>{
            
                //make a Select of all data of users:
                try {
                    GetData()
                } catch (error) {
                    eventBus.emit("GetOffWaitingIcon")
                     eventBus.emit("ActiveSms","OPS! Ocorreu um problema ao Renderizar todos os dados de usuários na tela após a actualização","negativo")
                    console.log("Erro de Requisição de dados: ",error)
                }
               
               setActivarEDesactivarBtnUpDate(false)
                eventBus.emit("ActivarBtnSave")

               eventBus.emit("GetOffWaitingIcon")
               eventBus.emit("ActiveSms","Dados do usuário actualizado com sucesso!","positivo")

             // returning the json data
              return res.json()    
           
        })
        .then(data => console.log(data))
         
        .catch(error => {
            eventBus.emit("GetOffWaitingIcon")

            eventBus.emit("ActiveSms","OPS! Ocorreu um problema ao Actualizar os dados do usuário, porfavor actualize a página e tente novamente","negativo")

            console.log("Erro ao Actualizar dados de usuário ",error)
    }) 
    }
}
    function GetData(){
       
        eventBus.emit("executarFuncao",'https://dummyjson.com/users?limit=20')
    }
    //function that cancel option Update user data 
    function CancelUpdate(){
        try {
            
            
            eventBus.emit("ActiveSms","Operação de actualização Cancelada","positivo") 
            setActivarEDesactivarBtnUpDate(false)
            eventBus.emit("ActivarBtnSave")
         } catch (error) {
            console.log("Erro do botão cancela edição: ", error)
            eventBus.emit("ActiveSms","Erro ao cancelar a operação de actualização. Actualize a página por favor","negativo") 
        }
    }
    return(
        <div className={ActivarEDesactivarBtnUpDate ? "activo  -mt-5 " : "inactivo"}>
        <button className=" rounded-4xl bg-sky-950 mx-2 px-13 md:px-19 lg:px-19 xl:px-19 py-2 border-3 cursor-pointer border-slate-400 text-slate-400" onClick={updateUser}><UserPen/></button>
        <button className=" rounded-4xl  bg-red-500 mx-2 px-13 md:px-19 lg:px-19 xl:px-19 py-2 border-3 cursor-pointer border-slate-400 text-slate-100" onClick={CancelUpdate}><UserRoundX/></button>
        </div>
    )
}
export default BtnUpdate