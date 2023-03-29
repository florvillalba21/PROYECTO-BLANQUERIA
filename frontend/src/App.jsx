import { useContext, useEffect, useState } from "react";
import { ContextAuth } from "./context/AuthContext";
import { AppRouter } from "./routes/AppRoutes";

function App() {
  
  const user = localStorage.getItem('user')

    
  

  return (
    <ContextAuth.Provider value={{ user }}>
      <AppRouter />
    </ContextAuth.Provider>
  );
}

export default App;
