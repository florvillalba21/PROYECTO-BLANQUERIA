import React from "react";
import { Link } from "react-router-dom";

export const CardProduct = ({title, costPrice, img}) => {
  return (
    <>
      <div className="card cardProduct" style={{width: "14rem"}}>
        <img src={img} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            Precio de costo: ${costPrice}
          </p>
        </div>
      </div>
    </>
  );
};
