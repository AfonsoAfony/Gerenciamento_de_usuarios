import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx'

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './Login.jsx';
import Verifier from './Verifier.jsx';
import LoginGoogle from './LoginGoogle.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Verifier/>,
  },
  {
    path: "login",
    element: <Login/>
  },
  {
    path: "usuarios",
    element: <App/>
  }
  
]);

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="410368789410-eu7c0s80f765uep3dm6bjtbvtngcm0e5.apps.googleusercontent.com">
    <RouterProvider router={router} />
 </GoogleOAuthProvider>
)
