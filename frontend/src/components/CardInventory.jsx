import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { InventoryContext } from "../context/InventoryContext";
import { Message } from "./Message";
import editIcon from "../../public/icons/edit.svg";
import deleteIcon from "../../public/icons/trash-2.svg";
import { ModalCategory } from "./ModalCategory";
import { ModalDCategory } from "./ModalDCategory";

export const CardInventory = () => {
  const { data, setData } = useContext(InventoryContext);
  const [idEdit, setIdEdit] = useState(null);
  const [idDelete, setIdDelete] = useState(null);

  return (
    <div className="container">
      <ModalCategory id={idEdit} />
      <ModalDCategory id={idDelete} />
      <div className="row justify-content-md-center">
        {data.length > 0 ? (
          data.map((value, index) => {
            return (
              <Link
                title={`Ir a la sección de ${value.name}`}
                className="shadow col-md-auto"
                style={{ textDecoration: "none", margin: 10, padding: 20 }}
                to={"Products/" + value.name}
              >
                <div
                  key={index}
                  id="cardInventory"
                  style={{ width: "14rem", textAlign: "center" }}
                >
                  <div className="card-container-image">
                    <img src={value.imgURL} className="card-img-top" />
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">{"Ver " + value.name}</h5>
                    <p className="card-text">{value.description}</p>
                  </div>
                  <div className="icons-container float-end">
                    <Link
                      onClick={() => setIdEdit(value._id)}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal1"
                      title="Editar categoría"
                    >
                      <img src={editIcon} width={"30px"} />
                    </Link>

                    <Link
                      onClick={() => setIdDelete(value._id)}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal2"
                      title="Eliminar categoría"
                    >
                      <img src={deleteIcon} width={"30px"} />
                    </Link>
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
