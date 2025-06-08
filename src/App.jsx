
import './App.css'

import Inputs from './components/Inputs'
import CompoSearch from "./components/CompoSearch"
import Table from './components/Table'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import eventBus from './components/eventBus'
import BtnTerminarSessao from './components/btnTerminarSessao'
function App() {

  const navigate=useNavigate()
  //Creat a verifier of auntentication
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
        
        <BtnTerminarSessao/> 
        <Inputs/>
        <CompoSearch/>
        <Table/>
      </div>
  )
}

export default App
