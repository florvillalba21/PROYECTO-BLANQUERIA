import React, { useContext } from "react";
import { CardHome } from "../components/CardHome";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";

export const Home = () => {
  return (
    <>
      <Navbar />
      <div
        className="card-group row justify-content-center"
        style={{ margin: "50px" }}
      >
        <CardHome
          tittle={"Realizar una venta"}
          description={"Si tienes que realizar una venta, ingresa aqui."}
          action={"Registrar venta"}
          url={"sell/"}
          img='../../public/icons/shopping-cart (1).svg'
  
        />

        <CardHome
          tittle={"Ver stock"}
          description={"¿Quieres ver tu inventario? Ingresa aquí."}
          action={"Abrir inventario"}
          url={"inventory/"}
          img='../../public/icons/shopping-bag.svg'
        />

        <CardHome
          tittle={"Cargar nuevos productos"}
          description={"Puedes agregar nuevos productos"}
          action={"Ir"}
          url={"addProducto/"}
          img='../../public/icons/tag.svg'
        />

        <CardHome
          tittle={"Cargar nuevas categorias"}
          description={
            "Las categorias definen el ambiente o tipo de producto que estás vendiendo"
          }
          action={"Ir"}
          url={"addCategory/"}
          img='../../public/icons/filter.svg'
        />

        <CardHome
          tittle={"Ver ventas"}
          description={"Aqui podrás ver las ventas realizadas de este mes."}
          action={"Ir"}
          url={"summary/"}
          img='../../public/icons/file-text.svg'
        />

        <CardHome
          tittle={"Retiro de fondos"}
          description={"¿Quieres retirar dinero del local? Registralo aqui para tenerlo en cuenta en el resumen mensual."}
          action={"Ir"}
          url={'withdrawals/'}
          img='../../public/icons/dollar-sign (1).svg'
        />
      </div>
      <Footer />
    </>
  );
};
