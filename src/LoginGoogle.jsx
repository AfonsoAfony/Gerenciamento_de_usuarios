import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import eventBus from './components/eventBus';

function LoginGoogle() {
    //Calling useNavigate
const navigate=useNavigate()
    
    const [ user, setUser ] = useState([]);

            const login = useGoogleLogin({
            onSuccess: (codeResponse) => setUser(codeResponse),
            onError: (error) => console.log('Login Failed:', error),
            
            });
    

    useEffect(
        () => {
            if (user) {
                    axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        //Create code to navigate into the page if the email != null
                        if(res.data.email != null){
                            localStorage.setItem('autenticacao','autenticado')
                            localStorage.setItem('googleLogin','true')
                            navigate('/')
                        }
                        else{
                            alert("Email Nulo")
                        }
                    })
                    .catch((err) => console.log(err));
                    
                }
        }, [ user ]
       
    );
 
    // log out function to log the user out of google and set the profile array to null
    eventBus.on("CloseGoogleSession",()=>{
        googleLogout();
        
        localStorage.removeItem('autenticacao')
        localStorage.removeItem('googleLogin')
    })
        

    return (
        <button type="button" onClick={login} className="btnLoginGoogle cursor-pointer"><img src="src/img/icon.svg" alt=""/>Ou faça login com o Google</button>

    );
}
export default LoginGoogle;