import { useContext, useEffect, useState } from "react";
import { ContextAuth } from "./context/AuthContext";
import { AppRouter } from "./routes/AppRoutes";

const getToken=()=> {
  return localStorage.getItem('token') || null;
}


function App() {
  const [token, setToken] = useState(getToken());
  
 
  return (
    //proveyendo la informacion de la variable user a toda nuestra app con el contexto
    <ContextAuth.Provider value={{ token }}>
      <AppRouter />
    </ContextAuth.Provider>
  );
}

export default App;
