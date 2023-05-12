import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { ContextAuth } from "../context/AuthContext";
import Alert from "../components/Alert";
import { Description } from "../components/Description";

export const AddProducts = () => {
  const [data, setData] = useState([]);
  const [image, setImage] = useState([]);
  const { token } = useContext(ContextAuth);
  const inpName = useRef();
  const selectCategory = useRef();
  const inpCostPrice = useRef();
  const inpSellPrice = useRef();
  const inpStock = useRef();
  const [showAlert, setShowAlert] = useState(false);
  const [res, setRes] = useState({});

  const upload = async (e) => {
    e.preventDefault();

    //configuracion para la peticion
    const url = "http://localhost:3000/Products";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "x-access-token": token,
      },
    };

    //se define los campos y su valores q se enviarán en la peticion con el FormData
    let formData = new FormData(); //formdata object

    formData.append("name", inpName.current.value); //append the values with key, value pair
    formData.append("category", selectCategory.current.value);
    formData.append("costPrice", inpCostPrice.current.value);
    formData.append("sellPrice", inpSellPrice.current.value);
    formData.append("stock", inpStock.current.value);
    if (image.length > 0) {
      formData.append("image", image[0]);
    }

    axios
      .post(url, formData, config)
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setRes(res.data.ok);
          setShowAlert(true);
        }
      })
      .catch((error) => console.log(error));
  };

  //realizamos una peticion solicitando todas las catregorias para el select
  useEffect(() => {
    axios
      .get("http://localhost:3000/Categories")
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="main-content">
      <Navbar />
      <Description text="En esta sección dispones de un formulario para cargar un nuevo producto." />
      <br />
      <div id="cardFormProduct" className=" shadow">
        <div id="tittleFormProduct">
          <h2>
            Detalla tu nuevo producto{" "}
            <img src="../../public/icons/tag.svg" width="40px" />
          </h2>
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
              {data.length > 0 &&
                data.map((value, index) => {
                  return (
                    <option key={index} value={value.name}>
                      {value.name}
                    </option>
                  );
                })}
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
              onChange={(e) => {
                setImage(e.target.files);
              }}
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
        <br />
        <div>
          {showAlert && res === true ? (
            <Alert
              showAlert={showAlert}
              type={"alert alert-success"}
              message={"Se ha registrado correctamente"}
            />
          ) : (
            <Alert
              showAlert={showAlert}
              type={"alert alert-danger"}
              message={"Ha ocurrido un error. Verifique los campos."}
            />
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};
