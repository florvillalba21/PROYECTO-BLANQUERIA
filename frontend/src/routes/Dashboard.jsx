import React from "react";
import { Route, Routes } from "react-router-dom";
import { AddCategory } from "../views/AddCategory";
import { AddProducts } from "../views/AddProducts";
import { Home } from "../views/Home";
import { Inventory } from "../views/Inventory";
import { Products } from "../views/Products";


export const Dashboard = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="home/inventory" element={<Inventory />} />
        <Route path="home/addProducto" element={<AddProducts />} />
        <Route path="home/addCategory" element={<AddCategory/>} />
        <Route path="home/inventory/Products/:filter" element={<Products/>}/>
        
        

      </Routes>
    </>
  );
};
