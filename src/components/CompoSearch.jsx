import {Search} from 'lucide-react'
import {useState,useEffect} from 'react'
import eventBus from "./eventBus";
import DivInfo from './DivInfo';
import Waiting from './Waiting';

function CompoSearch() {

const [textSearch,setTextSearch]=useState("")  

useEffect(SearchUser,[textSearch])

   function SearchUser(){
    try {
      eventBus.emit("GetOnWaitingIcon")

    fetch('https://dummyjson.com/users')
    .then(res => res.json())
    .then(data=>{
        const filtrados = data.users.filter(user => 
            user.firstName.toUpperCase().includes(textSearch.toUpperCase()) || 
            user.lastName.toUpperCase().includes(textSearch.toUpperCase()) ||
             user.email.toUpperCase().includes(textSearch.toUpperCase()) || 
             user.password.toUpperCase().includes(textSearch.toUpperCase()) || 
             user.age===(parseInt(textSearch))
                  );

           //executing function GetSearch of Table.jsx
           //Execute the function When in begenning
           eventBus.emit("GetOffWaitingIcon")
           eventBus.emit('executarSearch',filtrados) 
            
   })
     
    } 
    catch (error) {
        console.log(error)
        eventBus.emit("GetOffWaitingIcon")
        eventBus.emit("ActiveSms","OPS! Ocorreu um problema ao Pesquisar dados dos usuário, porfavor actualize a página e tente novamente","negativo")
    }   
}

  
return(
        <div  className=" mt-14 mb-5 flex-col items-center justify-between my-3 ">
           
            <Waiting/>
            <DivInfo/>
        <div className='flex justify-center lg:justify-end'>
             <input name="search" type="txt" value={textSearch} onChange={(e)=>setTextSearch(e.target.value)}  placeholder="Buscar por" className=" text-center text-[80%] sm:text-[100%] mt-5 w-[60%] md:w-[30%] h-10 border-2 border-slate-600  mx-2 rounded-2xl text-slate-50"/>
            
        </div>
           
        </div>
    )
}
export default CompoSearch