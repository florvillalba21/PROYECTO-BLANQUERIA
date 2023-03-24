import React from "react";
import { Navbar } from "../components/layout/Navbar";

export const AddProductos = () => {
  return (
    <div>
      <Navbar />
      <div id="cardFormProduct">
        <div id="tittleFormProduct">
          <h2>Detalla tu nuevo producto</h2>
        </div>

        <form action="">
          <div id="divForm">
            <input
              className="form-control"
              type="text"
              name=""
              id="nameProduct"
              placeholder="Nombre del producto."
            />
          </div>
          <div id="divForm">
            <select className="form-select" aria-label="Default select example">
              <option selected>Seleccione a qué categoria pertenece</option>
              <option value="1">Toallas</option>
              <option value="2">Sabanas</option>
              <option value="3">Manteles</option>
            </select>
          </div>
          <div id="divForm">
            <input
              type="number"
              className="form-control"
              placeholder="Ingresa el precio de costo"
            />
          </div>
          <div id="divForm">
            <input
              type="number"
              className="form-control"
              placeholder="Ingresa el precio de venta"
            />
          </div>
          <div id="divForm">
            <input type="file" className="form-control" />
          </div>
          <div id="divForm">
            <input
              type="number"
              className="form-control"
              placeholder="Ingresa las cantidades que han ingresado"
            />
          </div>
          <div id="divbtn">
            <button id="btn" type="submit">Cargar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
