import React, { useContext } from "react";
import { CardHome } from "../components/CardHome";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { ContextAuth } from "../context/AuthContext";

export const Home = () => {

  return (
    <>
      <Navbar />
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
          url={"inventory/"}
        />

        <CardHome
          tittle={"Cargar nuevos productos"}
          description={"Puedes agregar nuevos productos"}
          action={"Ir"}
          url={"addProducto/"}
        />

        <CardHome
          tittle={"Cargar nuevas categorias"}
          description={"Las categorias definen el ambiente o tipo de producto que estás vendiendo"}
          action={"Ir"}
          url={"addCategory/"}
        />

        <CardHome
          tittle={"Ver ventas"}
          description={"Aqui podrás ver las ventas realizadas de este mes."}
          action={"Ir"}
        />
      </div>
      <Footer />
    </>
  );
};
