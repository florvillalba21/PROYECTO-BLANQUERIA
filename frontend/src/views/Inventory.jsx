import React from "react";
import { CardInventory } from "../components/CardInventory";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";

export const Inventory = () => {
  return (
    <div>
      <Navbar />
      <div className="container container-intentory card-group">
        <CardInventory
          tittle={"Toallas"}
          description={"Controla tu stock de toallas aqui"}
          image={"../../public/images/toalla.jpg"}
          url={"towels/"}
        />

        <CardInventory
          tittle={"Almohadas"}
          description={"Controla tu stock de almohadas aqui"}
          image={"../../public/images/almohada.jpg"}
          url={"pillows/"}
        />

        <CardInventory
          tittle={"Sabanas"}
          description={"Controla tu stock de sabanas aqui"}
          image={"../../public/images/sabana.png"}
        />

        <CardInventory
          tittle={"Manteles"}
          description={"Controla tu stock de manteles aqui"}
          image={"../../public/images/mantel.jpg"}
        />
      </div>
     
    </div>
  );
};
