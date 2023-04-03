import axios from "axios";

import React, { useContext, useRef, useState } from "react";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { ContextAuth } from "../context/AuthContext";

export const AddProducts = () => {
  const [image, setImage] = useState(null)
  const { user } = useContext(ContextAuth);
  const inpName = useRef();
  const inpDescription = useRef();
  const inpSubcategories = useRef();

  

  const upload = async (e) => {
    e.preventDefault();

    const url = "http://localhost:3000/newCategory";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "x-access-token": user,
      },
    };
    let formData = new FormData(); //formdata object

    formData.append("name", inpName.current.value); //append the values with key, value pair
    formData.append("description", inpDescription.current.value);
    formData.append("subcategories", inpSubcategories.current.value);
    formData.append("image", image[0]);

 console.log(formData)

    const res = await axios.post(url, formData, config);
    console.log(res);
  };

  return (
    <>
      <Navbar />
      <div id="cardFormProduct">
        <div id="tittleFormProduct">
          <h2>Detalla tu nuevo producto</h2>
        </div>

        <form action="">
          <div id="divForm">
            <input
              ref={inpName}
              className="form-control"
              type="text"
              id="nameProduct"
              placeholder="Nombre del producto."
            />
          </div>
          <div id="divForm">
            <select
              ref={selectCategory}
              className="form-select"
              aria-label="Default select example"
            >
              <option selected>Seleccione a qué categoria pertenece</option>
              <option value="1">Toallas</option>
              <option value="2">Sabanas</option>
              <option value="3">Manteles</option>
            </select>
          </div>
          <div id="divForm">
            <input
              ref={inpCostPrice}
              type="number"
              className="form-control"
              placeholder="Ingresa el precio de costo"
            />
          </div>
          <div id="divForm">
            <input
              ref={inpSellPrice}
              type="number"
              className="form-control"
              placeholder="Ingresa el precio de venta"
            />
          </div>
          <div id="divForm">
            <input
             
              type="file"
              className="form-control"
              name="image"
              onChange={(e)=>{setImage(e.target.files)}}
            />
          </div>
          <div id="divForm">
            <input
              ref={inpStock}
              type="number"
              className="form-control"
              placeholder="Ingresa las cantidades que han ingresado"
            />
          </div>
          <div id="divbtn">
            <button id="btn" type="submit" onClick={upload}>
              Cargar
            </button>
          </div>
        </form>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};
