import React ,{ useContext } from "react";
import {Navigate} from 'react-router-dom'
import {ContextAuth } from "../context/AuthContext";

export const PrivateRoutes = ({ children }) => {
    const { token } = useContext(ContextAuth);
  
    return token === null ? (
      <Navigate to="/" />
    ) : (
      children
    );
  };
  