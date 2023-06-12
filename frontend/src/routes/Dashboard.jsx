import React from "react";
import { Route, Routes } from "react-router-dom";
import { AddCategory } from "../views/AddCategory";
import { AddProducts } from "../views/AddProducts";
import { Home } from "../views/Home";
import { Inventory } from "../views/Inventory";
import { Products } from "../views/Products";
import { Sell } from "../views/Sell";
import { Summary } from "../views/Summary";
import { Withdrawals } from "../views/Withdrawals";
import { Funds } from "../views/Funds";
import { DetailsSummary } from "../views/DetailsSummary";
import { DetailsMySales } from "../views/DetailsMySales";


export const Dashboard = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="home/inventory" element={<Inventory />} />
        <Route path="home/sell" element={<Sell />} />
        <Route path="home/summary" element={<Summary />} />
        <Route path="home/summary/detailsSummary" element={<DetailsSummary/>} />
        <Route path="home/summary/detailsMySales" element={<DetailsMySales/>} />
        <Route path="home/summary/detailsFunds" element={<Funds />} />
        <Route path="home/withdrawals" element={<Withdrawals/>} />
        <Route path="home/addProduct" element={<AddProducts />} />
        <Route path="home/addCategory" element={<AddCategory/>} />
        <Route path="home/inventory/Products/:filter" element={<Products/>}/>
        
        

      </Routes>
    </>
  );
};
