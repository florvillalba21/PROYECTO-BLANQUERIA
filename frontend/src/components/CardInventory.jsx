import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { InventoryContext } from "../context/InventoryContext";

export const CardInventory = () => {
  const { data, setData } = useContext(InventoryContext);
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        {data.map((value, index) => {
          return (
            <div
              key={index}
              className="card shadow rounded col-md-auto"
              id="cardInventory"
              style={{ width: "18rem", margin: "20px" }}
            >
              <img src={value.imgURL} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{value.name}</h5>
                <p className="card-text">{value.description}</p>
              </div>

              <div id="divbtn">
                <Link id="btn" to={"Products/" + value.name}>
                  Ver
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
