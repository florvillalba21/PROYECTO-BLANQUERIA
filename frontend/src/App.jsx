import { useContext, useEffect, useState } from "react";
import { ContextAuth } from "./context/AuthContext";
import { AppRouter } from "./routes/AppRoutes";

function App() {
  let [user , setUser] = useState();

    
  

  return (
    <ContextAuth.Provider value={{ user }}>
      <AppRouter />
    </ContextAuth.Provider>
  );
}

export default App;
