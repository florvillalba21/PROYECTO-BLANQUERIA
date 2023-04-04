import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login } from "../views/Login";
import { Dashboard } from "./Dashboard";
import { PrivateRoutes } from "./PrivateRoutes";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* se define que todo lo q se escriba despues de la barra en la url va a ser una ruta privada, en este caso el dashboard */}
        <Route
          path="/*"
          element={
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
