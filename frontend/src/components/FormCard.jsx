import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ContextAuth } from "../context/AuthContext";
import Alert from "./Alert";

export const FormCard = () => {
  const { token } = useContext(ContextAuth);
  const [showAlert, setShowAlert] = useState(false);
  const [res, setRes] = useState({});
  const [data, setData] = useState({
    amount: null,
    date: new Date().toLocaleDateString("es-es", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  });
  const config = {
    headers: {
      "content-type": "application/json",
      "x-access-token": token,
    },
  };
  const handleInput = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

 
  const sendForm = () => {
    axios.post("http://localhost:3000/sendFund", data, config).
    then((res) => {
      if (res.data) {
        setRes(res.data.ok);
        setShowAlert(true);
      }
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="row justify-content-md-center">
      <div className="card col-md-auto" id="card-fund">
        <div className="" style={{textAlign: 'center'}}>
            <h4>Retiro de fondos</h4>
        </div>
        <div className="card-body" style={{ height: "14rem" }}>
          <p className="card-text">
            Escribe el monto que has de retirar para registrarlo y tenerlo en
            cuenta en el resumen mensual.
          </p>
          <div>
            <form>
              <div className="input-group mb-3">
                <span className="input-group-text" style={{backgroundColor: '#ebe7e0'}}>$</span>
                <input
                name="amount"
                  type="number"
                  className="form-control"
                  aria-label="Amount (to the nearest dollar)"
                  onChange={handleInput}
                />
                <span className="input-group-text" style={{backgroundColor: '#ebe7e0'}}>.00</span>
              </div>

            </form>
            <div id="divbtn">
              <button id="btn" onClick={sendForm}>
                Registrar retiro
              </button>
            </div>

            <br />
          </div>
        </div>
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
  );
};
