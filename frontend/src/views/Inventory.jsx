import React, { useContext, useEffect, useState } from "react";
import { CardInventory } from "../components/CardInventory";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import axios from "axios";
import { InventoryContext } from "../context/InventoryContext";
import { Description } from "../components/Description";
import { ContextAuth } from "../context/AuthContext";

export const Inventory = () => {
  const {token} = useContext(ContextAuth)
  //se traen todas las categorias para mostrarlas en el inventario
  const [data, setData] = useState([]);

  const config = {
    headers: {
      "content-type": "application/json",
      "x-access-token": token,
    },
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/Categories", config)
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
