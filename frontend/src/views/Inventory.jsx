import React, { useEffect, useState } from "react";
import { CardInventory } from "../components/CardInventory";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import axios from "axios";
import { Products } from "./Products";

export const Inventory = () => {
  //se traen todas las categorias para mostrarlas en el inventario
  const [data, setData] = useState([]);
  const [category, setCategory]= useState('')
  useEffect(() => {
    axios
      .get("http://localhost:3000/Categories")
      .then((result) => {
        setData(result.data);
        setCategory(data.name)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
<Products category={category}/>
  
  return (
    <>
      <Navbar />
      <div className="container container-intentory card-group" style={{width: "auto",margin: "0 auto"}}>
        {data.map((value, index) => {
          return (
            <div key={index} style={{width: "30%"}}>
              <CardInventory
                
                title={value.name}
                description={value.description}
                image={value.imgURL}
                
              />
              
            </div>
          );
        })}
      </div>
      <Footer/>
    </>
  );
};
