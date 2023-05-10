import React ,{ useContext } from "react";
import {Navigate} from 'react-router-dom'
import {ContextAuth } from "../context/AuthContext";

export const PrivateRoutes = ({ children }) => {
    const { token, user } = useContext(ContextAuth);
  
    return !token || !user ? (
      <Navigate to="/" />
    ) : (
      children
    );
  };
  