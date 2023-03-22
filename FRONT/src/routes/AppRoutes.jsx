import { Routes, Route, BrowserRouter } from "react-router-dom";
import {Login} from "../views/Login";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
