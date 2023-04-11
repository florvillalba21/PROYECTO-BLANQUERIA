import { useContext, useEffect, useState } from "react";
import { ContextAuth } from "./context/AuthContext";
import { AppRouter } from "./routes/AppRoutes";

function App() {
  //instanciando una variable donde se almacena el token del user, trayendolo desde el local storage
  const token = localStorage.getItem('token')
 
  return (
    //proveyendo la informacion de la variable user a toda nuestra app con el contexto
    <ContextAuth.Provider value={{ token }}>
      <AppRouter />
    </ContextAuth.Provider>
  );
}

export default App;
