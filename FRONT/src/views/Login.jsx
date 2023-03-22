import React from "react";

export const Login = () => {
  return (
    <div className="container-fluid">
      <div id="headLogin">
        <h2 id="h2Login">Iniciar Sesión</h2>
      </div>
      <div id="bodyLogin">
        <input id="inpLogin" type="text" placeholder="Ingresa tu nombre de usuario..." className="form-control" />
      </div>
      <div id="endLogin">
        <button id="btnLogin" className="btn btn-primary" type="submit">Ingresar</button>
      </div>
    </div>
  );
};
