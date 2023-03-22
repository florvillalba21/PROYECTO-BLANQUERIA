import React from "react";
import { CardHome } from "../components/CardHome";
import { Navbar } from "../components/layout/Navbar";

export const Home = () => {
  return (
    
    <body>
      <Navbar/>
      <div className="card-group">
        <CardHome
          tittle={"Realizar una venta"}
          description={"Si tienes que realizar una venta, ingresa aqui."}
          action={"Registrar venta"}
        />

        <CardHome
          tittle={"Ver stock"}
          description={"¿Quieres ver tu inventario? Ingresa aquí."}
          action={"Abrir inventario"}
        />

        <CardHome
          tittle={"Cargar nuevos productos"}
          description={"Puedes agregar nuevos productos"}
          action={"Ir"}
        />

        <CardHome
          tittle={"Ver ventas"}
          description={"Aqui podrás ver las ventas realizadas de este mes."}
          action={"Ir"}
        />
      </div>
    </body>
  );
};
