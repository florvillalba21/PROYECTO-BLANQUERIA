import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import { ModalEdit } from "./ModalEdit";
import { ModalDelete } from "./ModalDelete";

export const CardProduct = () => {
  const { products, setProducts } = useContext(ProductsContext);
  const [idEdit, setIdEdit] = useState(null);
  const [idDelete, setIdDelete] = useState(null);


  return (
    <>
      <ModalEdit id={idEdit}/>
      <ModalDelete id={idDelete} />


      <div className="row justify-content-md-center">
        {products.map((value, index) => {
          return (
            <div
              key={index}
              className="card col-md-auto"
              style={{ width: "16rem" }}
            >
              <img src={value.imgURL} className="card-img-top" />
              <div className="card-body prod ">
                <h5 className="card-title">{value.name}</h5>
              </div>
              <div
                className=" row justify-content-md-center"
                style={{ padding: "4px" }}
              >
                <button
                  onClick={() => setIdEdit(value._id)}
                  className="col"
                  id="btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal1"
                >
                  Editar
                </button>
                <button
                  onClick={() => setIdDelete(value._id)}
                  id="btn"
                  className="col"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal2"
                >
                  Eliminar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
