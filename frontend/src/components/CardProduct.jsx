import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";

export const CardProduct = () => {
  const {products, setProducts} = useContext(ProductsContext);
  return (
    <>
      <div className="row justify-content-md-center" >
        <h2>Productos</h2>
        {products.map((value, index) => {
          return (
            <div
              key={index}
              className="card col-md-auto"
              style={{ width: "18rem", marginTop: "50px" }}
            >
              <img src={value.imgURL} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{value.name}</h5>
                <p className="card-text">Precio de costo: ${value.costPrice}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
