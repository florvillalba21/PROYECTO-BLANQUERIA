import { useContext, useEffect, useState } from "react";
import { ContextAuth } from "../context/AuthContext";
import axios from "axios";
import Alert from "./Alert";

export const ModalDCategory = ({ id }) => {
  const { token } = useContext(ContextAuth);
  const [showAlert, setShowAlert] = useState(false);
  const [res, setRes] = useState({});

  const config = {
    headers: {
      "content-type": "application/json",
      "x-access-token": token,
    },
  };

  const savedChanges = () => {
    axios
      .delete(`http://localhost:3000/delCategory/${id}`, config)
      .then((res) => {
        setRes(res.data.ok);
        setShowAlert(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Eliminar producto
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <h3>¿Desea eliminar la categoria?</h3>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button type="button" id="btn" onClick={savedChanges}>
                Eliminar
              </button>
            </div>
            <br />
            <div>
              {showAlert && res === true ? (
                <Alert
                  showAlert={showAlert}
                  type={"alert alert-success"}
                  message={"Se ha registrado correctamente"}
                />
              ) : (
                <Alert
                  showAlert={showAlert}
                  type={"alert alert-danger"}
                  message={"Ha ocurrido un error. Verifique los campos."}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
