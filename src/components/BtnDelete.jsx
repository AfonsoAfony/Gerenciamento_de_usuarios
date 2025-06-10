import { X } from "lucide-react"
import eventBus from "./eventBus";
import { useNavigate } from "react-router-dom";


function BtnDelete({id}) {
    
    //Calling useNavigate
const navigate=useNavigate()

    /*Creating function to save the data of user on Data base 
      Note: the data won´t be saved in the server it just simulate the Post inside database through the API */
function DeleteUser(){
         if(localStorage.getItem("autenticacao")==null && localStorage.getItem("autenticacao")!="autenticado"){
                                                                                        navigate('/login')
                                                                                        return;
                                                                                                            }
        else{
            eventBus.emit("GetOnWaitingIcon")
            
        fetch(`https://dummyjson.com/users/${id}`,{
            method:'DELETE',
            }) 
       
        .then(res=>{
            
                //make a Select of all data of users:
                try {
                    GetData()
                } catch (error) {
                    eventBus.emit("GetOffWaitingIcon")

                    eventBus.emit("ActiveSms","Erro ao Requisitar todos dados após a Exclusão de um usuário","negativo")
                    console.log("Erro de Requisição de dados: ",error)
                }
                eventBus.emit("GetOffWaitingIcon")

                eventBus.emit("ActiveSms","Dados do usuário Deletados com Sucesso","positivo") 

                //Calling function that clean all inputs:
                 eventBus.emit("CleanTheInputs")
                 
               // returning the json data
             return res.json()
        })
        .then(data => console.log(data))
         
        .catch(error => console.log("Erro ao Cadastrar novo usuário ",error)) 
    }
}
    function GetData(){
        eventBus.emit("executarFuncao",'https://dummyjson.com/users?limit=20')
       
    }
    return(
        <button className="btnDeletar z-0 rounded px-0.5 py-0.5 sm:px-3 sm:py-3  border-2 m-3 cursor-pointer border-red-400 text-red-400" onClick={DeleteUser}><X/></button>
    )
}
export default BtnDelete