import React, { useEffect, useState } from "react";
import { CardInventory } from "../components/CardInventory";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import axios from "axios";
import { Products } from "./Products";

export const Inventory = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/Categories")
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  return (
    <>
      <Navbar />
      <div className="container container-intentory card-group">
        {data.map((value, index) => {
          return (
            <div style={{width: "30%", margin: "0 auto"}}>
              <CardInventory
                key={index}
                title={value.name}
                description={value.description}
                image={value.imgURL}
                
              />
              {<Products category={value.name} />}
            </div>
          );
        })}
      </div>
      <Footer/>
    </>
  );
};
