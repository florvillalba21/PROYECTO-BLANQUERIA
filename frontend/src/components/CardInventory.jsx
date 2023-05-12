import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { InventoryContext } from "../context/InventoryContext";
import { Message } from "./Message";

export const CardInventory = () => {
  const { data, setData } = useContext(InventoryContext);

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        {data.length >0 ? (
          data.map((value, index) => {
            return (
              <Link
                className="shadow col-md-auto"
                style={{ textDecoration: "none", margin: 10, padding: 20 }}
                to={"Products/" + value.name}
              >
                <div key={index} id="cardInventory" style={{ width: "14rem", textAlign: 'center' }}>
                  <img src={value.imgURL} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{"Ver " + value.name}</h5>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <Message />
        )}
      </div>
    </div>
  );
};
