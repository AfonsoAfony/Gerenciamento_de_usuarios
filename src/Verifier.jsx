import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Verifier() {
   
        
   
      const navigate=useNavigate()
try {
    useEffect(()=>{
    if(localStorage.getItem("autenticacao")==null || localStorage.getItem("autenticacao")!="autenticado"){
        navigate('login')
    }
    else{
        navigate('usuarios')
    }
    }
    
    ,[])
    
} 
catch (error) {console.log(error) }

}
export default Verifier