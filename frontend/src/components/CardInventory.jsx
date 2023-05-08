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
            <Link className="card col-md-auto" style={{textDecoration:'none', margin: 10}} to={"Products/" + value.name}>
              <div
                key={index}
                
                id="cardInventory"
                style={{ width: "14rem"}}
              >
                <img src={value.imgURL} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{value.name}</h5>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
