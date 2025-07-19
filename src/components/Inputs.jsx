import { useEffect, useState } from "react"
import BtnSave from "./BtnSave"
import BtnUpdate from "./BtnUpdate"
import eventBus from "./eventBus"

function Inputs(){

  // useState that save the value of input FirstName
  const [FirstName,setFirstName]=useState("")
  const [LastName,setLastName]=useState("")
  const [Age,setAge]=useState("")
  const [Email,setEmail]=useState("")
  const [Password,setPassword]=useState("")
  const [id,setId]=useState(-1)

  function GetUserDateOnTable(id,firstname,lastname,age,email,password){
    try {
    
    setId(id)
    setFirstName(firstname)
    setLastName(lastname)
    setAge(age)
    setEmail(email)
    setPassword(password)
     
    eventBus.emit("ActiveSms","Dados de usuário selecionado com sucesso, agora edite e salve ou cancele a operação","positivo")
      
    } catch (error) {
       eventBus.emit("ActiveSms","Ups! Ocorreu um erro ao Seleccionar os dados para poder editar","negativo")
      
    }
  }

  useEffect(()=>{
    eventBus.on("PassarDadosParaAlterar",GetUserDateOnTable)
 
    //Create function to clean the inputs:
    eventBus.on("CleanTheInputs",()=>{
      setFirstName("")
      setLastName("")
      setAge("")
      setEmail("")
      setPassword("")

    })

   },[])

 return(
  <div>
    <div className="transicaoletra3 border-2 rounded-4xl border-slate-400 px-9 lg:flex lg:justify-center">
    <div className=" flex-col items-center justify-center my-9">
      <div className="transicao mb-2 transicao">
        <input name="nome" value={FirstName} onChange={(e) => setFirstName(e.target.value)} id="firstName" type="txt" placeholder="Digite o nome do usuário" className=" transicao text-center text-[80%] sm:text-[100%] w-[85%] sm:w-[50%] md:w-100 lg:w-109  h-8 md:h-9 lg:h-10 border-2 border-slate-600  mx-2 rounded-2xl text-slate-50"/>
      </div>
      <div className="transicao mb-2">
        <input name="lastname" value={LastName} onChange={(e) => setLastName(e.target.value)} id="lastName" type="txt" placeholder="Digite o último nome do usuário" className=" transicao text-center text-[80%] sm:text-[100%] w-[85%] sm:w-[50%] md:w-100 lg:w-109  h-8 md:h-9 lg:h-10 border-2 border-slate-600  mx-2 rounded-2xl text-slate-50"/>
      </div>
      <div className="transicao px-21 ">
        <input name="age" value={Age} onChange={(e) => setAge(e.target.value)} id="age" type="number" placeholder=" idade( de 1 até 10 )" className="transicao text-center text-[70%] sm:text-[100%] w-[85%] sm:w-50 h-8 md:h-9 border-2 border-slate-600  mx-2 rounded-2xl text-slate-50"/>
      </div>
       
      </div>
<div className="flex-col items-center justify-center my-9 mb-18 ">

  <div className="transicao mb-2 ">
   <input name="email" value={Email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="Digite um email válido" required className=" transicao text-center text-[80%] sm:text-[100%] w-[85%] sm:w-[50%] md:w-100 lg:h-10  h-8 md:h-9 border-2 border-slate-600  mx-2 rounded-2xl text-slate-50"/>
  </div>

  <div className="transicao">
  
   <input name="password" value={Password} onChange={(e) => setPassword(e.target.value)} id="password" type="txt" placeholder="Digite uma senha segura" required className="transicao text-center text-[80%] sm:text-[100%] w-[85%] sm:w-[50%] md:w-100 lg:w-109  h-8 md:h-9 lg:h-10  border-2 border-slate-600  mx-2 rounded-2xl text-slate-50"/>
  </div>
  <a href="https://gerador-de-senhas-three-ebon.vercel.app/" className=' transicao text-blue-300' target="_blank">Busque uma password mais segura</a>
      </div>
      </div>
      {/*Calling  btnSave element here */}
        <BtnSave FirstName={FirstName} LastName={LastName} Age={Age} Email={Email} Password={Password}/>
        <BtnUpdate Id={id} FirstName={FirstName} LastName={LastName} Age={Age} Email={Email} Password={Password}/>
    </div>
 )
}
export default Inputs