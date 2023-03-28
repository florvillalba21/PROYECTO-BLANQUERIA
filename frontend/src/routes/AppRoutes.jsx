import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AddProductos } from "../views/AddProductos";
import { Home } from "../views/Home";
import { Inventory } from "../views/Inventory";
import { Login } from "../views/Login";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/inventory" element={<Inventory />}/>
        <Route path="/addProducto" element={<AddProductos />}/>
      </Routes>
    </BrowserRouter>
  );
};
