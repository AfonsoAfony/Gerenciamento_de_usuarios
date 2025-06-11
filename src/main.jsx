import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './Login.jsx';
import Verifier from './Verifier.jsx';


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
    <RouterProvider router={router} />
 
)
