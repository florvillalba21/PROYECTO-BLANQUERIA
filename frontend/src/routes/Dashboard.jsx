import React from "react";
import { Route, Routes } from "react-router-dom";
import { AddProductos } from "../views/AddProductos";
import { BedsheetsInterface } from "../views/BedsheetsInterface";
import { Home } from "../views/Home";
import { Inventory } from "../views/Inventory";
import { PillowInterface } from "../views/PillowInterface";
import { TableclothsInterface } from "../views/TableclothsInterface";
import { TowelInterface } from "../views/TowelInterface";

export const Dashboard = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="home/inventory" element={<Inventory />} />
        <Route path="home/addProducto" element={<AddProductos />} />
        <Route path="home/inventory/towels" element={<TowelInterface/>}/>
        <Route path="home/inventory/pillows" element={<PillowInterface/>}/>
        <Route path="home/inventory/bedsheets" element={<BedsheetsInterface/>}/>
        <Route path="home/inventory/tablecloths" element={<TableclothsInterface/>}/>

      </Routes>
    </>
  );
};
