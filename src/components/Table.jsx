import { useEffect, useState } from "react"
import eventBus from "./eventBus";
import BtnDelete from "./BtnDelete"
import { useNavigate } from "react-router-dom";

function Table() {
  
  //Calling useNavigate
const navigate=useNavigate()

const [arrayData,setArrayUsers]=useState([])
console.log(arrayData)

function GetData(api){
 
fetch(api)
     .then(res=> res.json()) //to Convert response to json
     .then(data=>{setArrayUsers(data.users)})
          
      .catch(error => console.error("Erro ao buscar dados: ", error))
  
}


function GetSearch(filtrados){
   if(localStorage.getItem("autenticacao")==null && localStorage.getItem("autenticacao")!="autenticado"){
                                                                                        navigate('/login')
                                                                                        return;
                                                                                                            }
        else{
          
  setArrayUsers(filtrados)
        }
}

//Execute the function getData When in the Start
//useEffect(GetData,[])


useEffect(() => {
  //EventBus is a js code that help me to use function of a component in other component
  // events: on(event, callback) - to send the functio or let already to be used in other components where the eventBus from "./eventBus"; is imported
  // emit(event, data) - to get the function
  eventBus.on("executarFuncao", GetData);

  // to get filtered date of compoSearch with eventBus
  eventBus.on('executarSearch',GetSearch)
}, []);


    return(
        <div className=" border-slate-500 flex justify-center ">
     <table className="border-2 w-full rounded">
  <thead>
    <tr className="text-sm lg:text-xl bg-slate-900  text-slate-500">
      <th className="py-2 ">Id</th>
      <th>Nome</th>
      <th>Último Nome</th>
      <th>Idade</th>
      <th>Email</th>
      <th>Deletar</th>
    </tr>
  </thead>
  <tbody >
  
    
      {
       arrayData.map((user,thekey)=>(
       <tr className="trData text-xs sm:text-sm" onClick={()=>{

           if(localStorage.getItem("autenticacao")==null && localStorage.getItem("autenticacao")!="autenticado"){
                                                                                        navigate('/login')
                                                                                        return;
                                                                                                            }
        else{
        //Execute function of input:
        // eventBus.on("PassarDadosParaAlterar",GetUserDateOnTable)
        
         eventBus.emit("PassarDadosParaAlterar",user.id,user.firstName,user.lastName,user.age,user.email,user.password)

        /* Execute this function of BtnUpdate
        //create function for active BtnUpdate in click of tr of table
         eventBus.on("ActivarEDesactivarBtnUpDate",()=>{
          if(ActivarEDesactivarBtnUpDate==false){
            setActivarEDesactivarBtnUpDate(true)
          }
        })  
          else{
             setActivarEDesactivarBtnUpDate("desactivo")
          }
        })
        */
       eventBus.emit("ActivarEDesactivarBtnUpDate")
      }
             }} id={thekey} key={thekey}>
        <td className="py-3"> {user.id} </td>
        <td >{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.age}</td>
        <td >{user.email}</td>
        
        <td><BtnDelete id={user.id}/></td>
        
        </tr>
     ))
     }

  </tbody>
</table>

    </div>

    )
}
export default Table