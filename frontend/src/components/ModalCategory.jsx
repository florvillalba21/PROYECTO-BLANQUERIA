import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { ContextAuth } from "../context/AuthContext";
import Alert from "./Alert";

export const ModalCategory = ({ id }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [res, setRes] = useState({});
  const { token } = useContext(ContextAuth);
  const [category, setCategory] = useState({
    _id: "",
    name: "",
    description: ''
  });

  const config = {
    headers: {
      "content-type": "application/json",
      "x-access-token": token,
    },
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/getCategoryForId/${id}`,config)
      .then((res) => {
        if (res.data[0]) {
          setCategory({
            _id: res.data[0]._id,
            name: res.data[0].name,
            description: res.data[0].description
          });
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleInput = (event) => {
    setCategory({
      ...category,
      [event.target.name]: event.target.value,
    });
  };

  const savedChanges = () => {
    axios
      .put(`http://localhost:3000/updateCategory/${id}`, category, config)
      .then((res) => {
        setRes(res.data.ok);
        setShowAlert(true);
        setTimeout(()=>{window.location.reload()}, 1000)

      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div
        className="modal fade row justify-content-md-center"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content " style={{ padding: "10px" }}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Actualizar producto
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
                <form>
                  {category && (
                    <>
                      <div>
                        <label htmlFor="">ID</label>
                        <input type="text" value={category._id} disabled className="form-control" />
                      </div>
                      <br />
                      <div>
                        <label htmlFor="">Nombre del producto</label>
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          value={category.name}
                          onChange={handleInput}
                        />
                      </div>
                      <br />
                      <div>
                        <label htmlFor="">Precio de costo</label>
                        <input
                          className="form-control"
                          type="text"
                          name="costPrice"
                          value={category.description}
                          onChange={handleInput}
                        />
                      </div>
                      <br />
                    </>
                  )}
                </form>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" id="btn" onClick={savedChanges}>
                Save changes
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
