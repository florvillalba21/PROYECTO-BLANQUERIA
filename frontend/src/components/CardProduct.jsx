import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";

export const CardProduct = () => {
  const {products, setProducts} = useContext(ProductsContext);
  return (
    <>
      <div className="row justify-content-md-center" >
        
        {products.map((value, index) => {
          return (
            <div
              key={index}
              className="card col-md-auto"
              style={{ width: "16rem", margin: "20px" }}
            >
              <img src={value.imgURL} className="card-img-top" />
              <div className="card-body prod ">
                <h5 className="card-title">{value.name}</h5>
              </div>
              <div className=" row justify-content-md-center" style={{padding:"4px"}}>
                <button className="col">Editar</button>
                <button className="col">Eliminar</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
