import React ,{ useContext } from "react";
import {Navigate} from 'react-router-dom'
import {ContextAuth } from "../context/AuthContext";

export const PrivateRoutes = ({children})=>{
    const {user}= useContext(ContextAuth)
 
  

    return !user
    ?<Navigate to='/'/> 
    : children; 
}