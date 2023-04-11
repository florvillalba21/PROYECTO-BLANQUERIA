import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { InventoryContext } from "../context/InventoryContext";

export const CardInventory = () => {
  const {data, setData} = useContext(InventoryContext)
  return (
    <div
      className="card-group justify-content-md-center" style={{marginLeft: "350px", width: "50%"}}
    >
      {data.map((value, index) => {
        return (
          <div key={index} className="card shadow rounded col-md-auto" id="cardInventory" style={{width: "18rem"}}>

            <img src={value.imgURL} className="card-img-top"/>
            <div className="card-body" id="card-body-inventory">
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
  );
};
