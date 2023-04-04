import axios from "axios";
import React, { useEffect, useState } from "react";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";

export const Products = ({ category }) => {
  console.log(category)
  //instanciamos un state vacio, que cuando se renderice la pagina, contendrá los productos que tengan la categoria que coincidad con la prop recibida

  const [products, setProducts] = useState([]);
  const url = "http://localhost:3000/Products";

  useEffect(() => {
    axios
      .get(url, {
        params: {
          filter: { category },
        },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <>
  <Navbar/>
  <div>
    <ul>
    {products.map((value,index)=>{
      return(
        <li key={value._id}>{value.name}</li>
      )
    })}
    </ul>
  </div>
  <Footer/>
  </>;
};
