import axios from "axios";
import { useContext, useState } from "react";
import { ContextAuth } from "../context/AuthContext";

export const FormCard = () => {
  const { token } = useContext(ContextAuth);
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
    axios.post("http://localhost:3000/sendFund", data, config)
    .then(res =>console.log(res.data))
  };
  return (
    <div className="row justify-content-md-center">
      <div className="card col-md-auto">
        <div className="card-header">Retiro de dinero</div>
        <div className="card-body" style={{ height: "10rem" }}>
          <p className="card-text">
            Escribe el monto que has de retirar para registrarlo y tenerlo en
            cuenta en el resumen mensual.
          </p>
          <div>
            <form>
              <div>
                <input type="number" name="amount" id="" onChange={handleInput}/>
              </div>
            </form>
            <button id="btn" onClick={sendForm}>
              Registrar retiro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
