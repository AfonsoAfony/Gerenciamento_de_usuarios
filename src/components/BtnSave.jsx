import { Save } from "lucide-react"
import eventBus from "./eventBus";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function BtnSave({FirstName,LastName,Age,Email,Password}) {

//Calling useNavigate
const navigate=useNavigate()
    
    const [ActivarEDesactivarBtnSave,setActivarEDesactivarBtnSave]=useState(true)
    
         //create function to hide BtnSave in click of tr of table
             eventBus.on("DesactivarBtnSave",()=>{
              if(ActivarEDesactivarBtnSave){
                setActivarEDesactivarBtnSave(false)
              }
            })  
            //create function to show BtnSave in click of tr of table
            eventBus.on("ActivarBtnSave",()=>{
              if(!ActivarEDesactivarBtnSave){
                setActivarEDesactivarBtnSave(true)
              }
            }) 

    /*Creating function to save the data of user on Data base 
      Note: the data won´t be saved in the server it just simulate the Post inside database through the API */

function saveUser(){
        if(localStorage.getItem("autenticacao")==null && localStorage.getItem("autenticacao")!="autenticado"){
                                                                                        navigate('/login')
                                                                                        return;
                                                                                                            }
        else{
        eventBus.emit("GetOnWaitingIcon")
        if(FirstName=="" || LastName=="" || Age=="" || Email=="" || Password=="" || Age>100 ||Age<5 ){
        eventBus.emit("GetOffWaitingIcon")
        eventBus.emit("ActiveSms"," Todos os campos devem ser devidamente preenchidos","negativo")
    }
    else{
        fetch("https://dummyjson.com/users/add",{
            method:'post',
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
                    eventBus.emit("ActiveSms","Ups! Erro ao Requisitar todos dados após a inserção de novo usuário","negativo")
                    console.log("Erro de Requisição de dados: ",error)
                }
               
            eventBus.emit("GetOffWaitingIcon")
            eventBus.emit("ActiveSms","Novo Usuário Cadastrado com Sucesso","positivo")
            
            //Calling function that clean all inputs:
            eventBus.emit("CleanTheInputs")
            
            // returning the json data
             return res.json()    
           
        })
        .then(data => console.log(data))
         
        .catch(error =>{
            eventBus.emit("GetOffWaitingIcon")
            eventBus.emit("ActiveSms","OPS! Ocorreu um problema ao inserir os dados do usuário, porfavor actualize a página e tente novamente","negativo")
            console.log("Erro ao Cadastrar novo usuário ",error)
        } ) 
    } 
    }
}
    function GetData(){
        eventBus.emit("executarFuncao",'https://dummyjson.com/users?limit=20')
       
    }
    return(
        <div className= {ActivarEDesactivarBtnSave ? "activo -mt-5 " : "inactivo"}>
            <button className=" rounded-4xl bg-sky-950  px-19 py-2 border-3 cursor-pointer border-slate-400 text-slate-400" onClick={saveUser}><Save/></button>
        </div>
       
    )
}
export default BtnSave