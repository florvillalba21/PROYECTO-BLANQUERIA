import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardProduct } from "../components/CardProduct";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";

export const Products = () => {
  let {filter} = useParams();
  //instanciamos un state vacio, que cuando se renderice la pagina, contendrá los productos que tengan la categoria que coincidad con la prop recibida

  const [products, setProducts] = useState([]);
  const url = `http://localhost:3000/ProductsF/${filter}`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <>
  <Navbar/>
  <div className="card-group" style={{margin: "50px", width: "auto"}}>
    {products.map((value,index)=>{
      return(
      <div key={index} style={{padding: "10px"}}>
        <CardProduct
        title={value.name}
        costPrice={value.costPrice}
        img={value.imgURL}/>
        

      </div>)
    })}
  </div>
  <Footer/>
  </>;
};
