import React, { useEffect, useState } from "react";
import { CardInventory } from "../components/CardInventory";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import axios from "axios";
import { InventoryContext } from "../context/InventoryContext";
import { Description } from "../components/Description";

export const Inventory = () => {
  //se traen todas las categorias para mostrarlas en el inventario
  const [data, setData] = useState([]);

  
  useEffect(() => {
    axios
      .get("http://localhost:3000/Categories")
      .then((result) => {
        setData(result.data)
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  

  
  return (
    <div className="main-content">
      <Navbar />
      <Description text ='En esta sección puedes ver la categorías de tus productos, para una forma más organizada de presentación.'/>
      <InventoryContext.Provider value={{data, setData}}>
          <CardInventory/>
      </InventoryContext.Provider>
      <Footer/>
    </div>
  );
};
