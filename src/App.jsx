
import './App.css'

import Inputs from './components/Inputs'
import CompoSearch from "./components/CompoSearch"
import Table from './components/Table'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import eventBus from './components/eventBus'
import BtnTerminarSessao from './components/btnTerminarSessao'
import { Users } from 'lucide-react'
function App() {

  const navigate=useNavigate()
  //Create a verifier of auntentication
  function VerificarAuntenticacao(){

    if(localStorage.getItem("autenticacao")==null && localStorage.getItem("autenticacao")!="autenticado"){
      navigate('/login')
      return;//Para a execução aki
    }

  }

useEffect(()=>{
  VerificarAuntenticacao()
  eventBus.on('VerificarAuntenticacao',VerificarAuntenticacao)
},
[])

  return (
    <div>

    <div className='bg-slate-900 rounded top-0 py-2 mb-8 flex justify-between'>
      <a href='http://localhost:5173/' className='text-[150%] md:text-5xl text-slate-400 flex  ml-7'> <h1> Gest<span className='text-blue-400'>Users</span></h1></a>
      <BtnTerminarSessao/> 
    </div>
      <div className='sections'> 
        
        
        <Inputs/>
        <CompoSearch/>
        <Table/>
      </div>

      </div>
  )
}

export default App
