import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemProduct } from "../components/ItemProduct";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { ProductsContext } from "../context/ProductsContext";
import { Tab } from "../components/layout/Tab";
import { Message } from "../components/Message";

export const Products = () => {
  const { filter } = useParams();

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
  }, [filter]);

  return (
    <div className="main-content">
      <Navbar />
      <Tab />
      {products.length >0 ? (
        <ProductsContext.Provider value={{ products, setProducts }}>
          <ItemProduct />
        </ProductsContext.Provider>
      ) : (
        <Message />
      )}

      <Footer />
    </div>
  );
};
