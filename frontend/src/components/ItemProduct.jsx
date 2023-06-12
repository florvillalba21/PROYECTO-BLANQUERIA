import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import { ModalEdit } from "./ModalEdit";
import { ModalDelete } from "./ModalDelete";
import { Message } from "./Message";
import editIcon from "../../public/icons/edit.svg";
import deleteIcon from "../../public/icons/trash-2.svg";

export const ItemProduct = () => {
  const { products, setProducts } = useContext(ProductsContext);
  const [idEdit, setIdEdit] = useState(null);
  const [idDelete, setIdDelete] = useState(null);

  return (
    <>
      <ModalEdit id={idEdit} />
      <ModalDelete id={idDelete} />
      <table id="tableSales" className="table">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Producto</th>
            <th>Precio de costo</th>
            <th>Precio de venta</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products ? (
            products.map((value, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img src={value.imgURL} width="150px" />
                  </td>
                  <td>{value.name}</td>
                  <td>{"$"+value.costPrice}</td>
                  <td>{"$"+value.sellPrice}</td>
                  <td>{value.stock}</td>
                  <td>
                    <Link
                      onClick={() => setIdEdit(value._id)}
                    
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal1"
                    >
                      <img src={editIcon} width={'40px'}/>
                    </Link>
                   
                    <Link
                      onClick={() => setIdDelete(value._id)}
                    
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal2"
                    >
                    <img src={deleteIcon} width={'40px'}/>
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <Message />
          )}
        </tbody>
      </table>
    </>
  );
};
