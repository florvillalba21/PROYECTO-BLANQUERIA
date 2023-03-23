import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "../views/Home";
import { Inventory } from "../views/Inventory";
import {Login} from "../views/Login";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/inventory" element={<Inventory/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};
