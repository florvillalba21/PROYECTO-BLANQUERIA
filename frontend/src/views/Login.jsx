import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const inpUsername = useRef();

  //Funcion para loguear
  const loguear = async (e) => {
    e.preventDefault;

    //instanciamos los datos que utilizaremos en la peticion con axios
    const url = "http://localhost:3000/signin";
    const data = {
      username: inpUsername.current.value,
    };
    

    //se intenta la peticion, y si sale todo ok y devuelve el token del usuario, nos redirigimos a la pag principal, y sino, ocurre un error
    try {
      const res = await axios.post(url, data);
      const userT = res.data.token;

      if (userT) {
        navigate("/home");
        localStorage.setItem("user", userT);
      }

    } catch (error) {
      console.log("mensaje de error", error);
    }
  };

  return (
    <>
      <div className="container-fluid shadow bg-body rounded login">
        <div id="headLogin">
          <h2 id="h2Login">Bienvenida al sistema</h2>
        </div>
        <div id="bodyLogin">
          <input
            ref={inpUsername}
            id="inpLogin"
            type="text"
            placeholder="Ingresa tu nombre de usuario..."
            className="form-control"
          />
          <div id="endLogin">
            <button
              id="btnLogin"
              onClick={loguear}
              className="btn btn-primary"
              type="submit"
            >
              Ingresar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
