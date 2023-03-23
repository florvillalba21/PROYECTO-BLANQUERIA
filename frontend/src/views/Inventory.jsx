import React from "react";
import { CardInventory } from "../components/CardInventory";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";

export const Inventory = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="container container-intentory card-group">
        <CardInventory
          tittle={"Toallas"}
          description={"Controla tu stock de toallas aqui"}
          image={"./public/images/toalla.jpg"}
        />

        <CardInventory
          tittle={"Almohadas"}
          description={"Controla tu stock de toallas aqui"}
          image={"./public/images/almohada.jpg"}
        />

        <CardInventory
          tittle={"Sabanas"}
          description={"Controla tu stock de toallas aqui"}
          image={""}
        />

        <CardInventory
          tittle={"Manteles"}
          description={"Controla tu stock de toallas aqui"}
          image={""}
        />
      </div>
     
    </div>
  );
};
