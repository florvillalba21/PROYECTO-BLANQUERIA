import React ,{ useContext } from "react";
import {Navigate} from 'react-router-dom'
import {ContextAuth } from "../context/AuthContext";

export const PrivateRoutes = ({children})=>{
    //requerimos el contexto que contiene el token del usuario
    const {token}= useContext(ContextAuth)
 
  
    //si no existe el token, nos redirige al login, de lo contrario podemos acceder a las otras rutas
    return !token
    ?<Navigate to='/'/> 
    : children; 
}