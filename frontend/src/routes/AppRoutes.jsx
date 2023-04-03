import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login } from "../views/Login";
import { Dashboard } from "./Dashboard";
import { PrivateRoutes } from "./PrivateRoutes";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
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
