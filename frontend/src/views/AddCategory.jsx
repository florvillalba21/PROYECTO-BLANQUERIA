import axios from "axios";

import React, { useContext, useRef, useState } from "react";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { ContextAuth } from "../context/AuthContext";

export const AddCategory = () => {
  //instanciamos lasvariables donde almacenaremos los datos del formulario
  const [image, setImage] = useState(null);
  const { user } = useContext(ContextAuth);
  const inpName = useRef();
  const inpDescription = useRef();
  const inpSubcategories = useRef();

  //funcion para subir una nueva categoria
  const upload = async (e) => {
    e.preventDefault();

    //config de la peticion
    const url = "http://localhost:3000/Categories";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "x-access-token": user,
      },
    };

    //data de la peticion que enviaremos
    let formData = new FormData(); //formdata object

    formData.append("name", inpName.current.value); //append the values with key, value pair
    formData.append("description", inpDescription.current.value);
    formData.append("subCategories", inpSubcategories.current.value);
    formData.append("image", image[0]);

    console.log(formData);

    try {
      const res = await axios.post(url, formData, config);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div id="cardFormProduct">
        <div id="tittleFormProduct">
          <h2>Detalla la nueva categoria</h2>
        </div>

        <form action="">
          <div id="divForm">
            <input
              ref={inpName}
              className="form-control"
              type="text"
              id="nameProduct"
              placeholder="Nombre de la categoría. Ej: Toallas"
            />
          </div>

          <div id="divForm">
            <input
              ref={inpDescription}
              className="form-control"
              type="text"
              placeholder="Aqui puede describir la categoria..."
            />
          </div>

          <div id="divForm">
            <input
              ref={inpSubcategories}
              className="form-control"
              type="text"
              id="nameProduct"
              placeholder="Ej:De baño, etc..."
            />
          </div>

          <div id="divForm">
            <input
              type="file"
              className="form-control"
              name="image"
              onChange={(e) => {
                setImage(e.target.files);
              }}
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
