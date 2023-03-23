import React from "react";

export const Login = () => {
  return (
    <body id="body">
      <div className="container-fluid shadow bg-body rounded login">
        <div id="headLogin">
          <h2 id="h2Login">Bienvenida al sistema</h2>
        </div>
        <div id="bodyLogin">
          <input
            id="inpLogin"
            type="text"
            placeholder="Ingresa tu nombre de usuario..."
            className="form-control"
          />
        </div>
        <div id="endLogin">
          <button id="btnLogin" className="btn btn-primary" type="submit">
            Ingresar
          </button>
        </div>
      </div>
    </body>
  );
};
