import { useEffect, useState } from 'react'
import '../Login.css'
import { useNavigate } from 'react-router-dom'
import DivInfo from './DivInfo';
import Waiting from './Waiting';
import eventBus from './eventBus';
import LoginGoogle from '../LoginGoogle';

function InputLogin() {
    const navigate=useNavigate();

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    
    
useEffect(()=>{
if(localStorage.getItem("autenticacao")!=null || localStorage.getItem("autenticacao")=="autenticado"){
        navigate('/')
    }
},[])
function VerificarEmailSenha(){
    eventBus.emit("GetOnWaitingIcon")
    
    //Validate formulários
    if(email=="" || password==""){
        eventBus.emit("GetOffWaitingIcon")
        eventBus.emit("ActiveSms"," Os campos de Email e Senha devem ser devidamente preenchidos use: emily.johnson@x.dummyjson.com  e senha: emilyspass ","positivo")
    }
    else{
        fetch('https://dummyjson.com/users')
    .then(res => res.json())
    .then(data=>{
        const filtrados = data.users.filter(user => 
             user.email===email && user.password===password
                  );

           
           console.log(filtrados.length)
           
           if(filtrados.length>0){
                localStorage.setItem('autenticacao','autenticado')
                navigate("/")

                //Stop Waiting
                eventBus.emit("GetOffWaitingIcon")
           }
           else{
                //Stop Waiting
               eventBus.emit("GetOffWaitingIcon")
               //Showing message Error
                eventBus.emit("ActiveSms","Ups! Email ou Senha está errado, tente novamente","negativo")
           }
            
   })
}
      
}

    return(
<div className=' backdrop-blur-xl w-80'>
    
        <div className=" transicao border-2 rounded-3xl w-80 px-5 py-5 flex justify-center flex-col">
        <label htmlFor="*email" className='letra1_2 transicao text-amber-50'>E-mail:</label>
        <input className=" rounded text-slate-900 transicao text-center bg-slate-300 h-9 mb-6 mt-3" type="Email"  name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Digite o seu mail por favor" required />
                
        <label htmlFor="password" className='letra1_2 transicao text-amber-50'>Senha:</label>
        <input className=" rounded transicao text-slate-900 text-center bg-slate-300 h-9 mb-2 mt-3" type="text" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite a sua senha por favor" required />
        
       
        <button onClick={VerificarEmailSenha} className='letra1_2 text-bold transicao btnLogin'>Entrar na conta</button>

         <LoginGoogle/>
         <div id="lembrar">
                 <label className='text-slate-400'>
                   <input className="checkbox" type="checkbox" checked="checked" name="remember"/> Lembre de mim                  
                </label><br/><br/>
                <a href="https://dummyjson.com/users" target="_blank" className='text-blue-300'>Pegue um email aqui: https://dummyjson.com/users</a>
      </div>
       {/*calling function that give a sms for user */}
        <div className=' flex h-0 justify-center mb-5 pt-7  border-t-2'>
            <Waiting/>
           
        </div>
           
        </div>
         <DivInfo/>
         </div>
    )
}
export default InputLogin