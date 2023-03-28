import React from "react";
import { Route, Routes } from "react-router-dom";
import { AddProductos } from "../views/AddProductos";
import { Home } from "../views/Home";
import { Inventory } from "../views/Inventory";

export const Dashboard = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/addProducto" element={<AddProductos />} />
      </Routes>
    </>
  );
};
