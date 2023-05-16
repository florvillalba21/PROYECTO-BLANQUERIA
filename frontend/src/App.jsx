import { useContext, useEffect, useState } from "react";
import { ContextAuth } from "./context/AuthContext";
import { AppRouter } from "./routes/AppRoutes";
import { getToken, getUser } from "./utils/getData";

function App() {
  // const [token, setToken] = useState(getToken());
  // const [user, setUser] = useState(getUser());

  // useEffect(() => {
  //   setToken(getToken());
  //   setUser(getUser());
  //   console.log('a');
  // }, []);
  const [authState, setAuthState] = useState({
    token: getToken(),
    user: getUser(),
  });

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
    setAuthState({ token, user });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthState({ token: null, user: null });
  };

  return (
    //proveyendo la informacion de la variable user a toda nuestra app con el contexto
    <ContextAuth.Provider
      value={{
        token: authState.token,
        user: authState.user,
        login: login,
        logout: logout,
      }}
    >
      <AppRouter />
    </ContextAuth.Provider>
  );
}

export default App;
