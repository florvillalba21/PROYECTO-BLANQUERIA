import React from "react";
import { Link } from "react-router-dom";

export const CardInventory = ({ tittle, description, image, url }) => {
  return (
    <div className="card shadow rounded" id="cardInventory">
      <img src={image} className="card-img-top" alt="..." />
      <div className="card-body" id="card-body-inventory">
        <h5 className="card-title">{tittle}</h5>
        <p className="card-text">{description}</p>
      </div>
      <div id="divbtn">
        <Link id="btn" to={url}>
          Ver
        </Link>
      </div>
    </div>
  );
};
