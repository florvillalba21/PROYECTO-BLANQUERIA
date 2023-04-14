import React, { useCallback, useEffect, useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

export const Sell = () => {
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [detCart, setDet] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3000/Categories")
      .then((res) => {
        setCategories(res.data);
        setFilter(res.data[0].name);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (filter != "") {
      axios
        .get(`http://localhost:3000/ProductsF/${filter}`)
        .then((res) => setProducts(res.data));
    }
  }, [filter]);

  const addToCart = (product) => {
    setCart((items) => [...items, product]);

  };

  useEffect(()=>{
    setDet(cart.reduce((prev, cur) => {
      prev[cur.name] = (prev[cur.name] || 0) + 1;
      return prev;
    }, {}));
    
  },[cart])

  useEffect(()=>{
    console.log(detCart)
    // Object.entries(resultado).forEach(([key, value]) => {
    //   let obj = {}
    //   obj.prod= key
    //   obj.cant = value
    //   let array =[]
    //   array.push(obj)
      
    //   console.log(obj)
    //   array
    // });
  },[detCart])
  return (
    <div>
      <Navbar />
      <div className="row" style={{ margin: "20px", color: "#2f3559" }}>
        <div className="col">
          <b>Selecciona la categoria del producto:</b>
          <select
            className="form-select"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            {categories.map((value, index) => {
              return (
                <option key={index} value={value.name}>
                  {value.name}
                </option>
              );
            })}
          </select>
          <br />
          <div className="list-group">
            <b>Elige el producto a vender:</b>
            {products
              ? products.map((value, index) => {
                  return (
                    <li
                      key={index}
                      className="list-group-item list-group-item-action"
                      onClick={() => {
                        addToCart(value);
                      }}
                    >
                      {value.name}
                    </li>
                  );
                })
              : ""}
          </div>
          <br />

          <div>
            <b>Detalla la venta:</b>
            <textarea
              className="form-control"
              placeholder="Si desea, puede escribir detalles puntuales de la venta para tenerlo registrado"
            />
          </div>

          <br />
          <div className="row">
            <div className="col">
              <b>Monto total:</b>
              <input
                type="number"
                placeholder="total"
                className="form-control"
              />
            </div>
            <div className="col">
              <b>Medio de Pago:</b>
              <select className="form-select">
                <option value="Efectivo">Efectivo</option>
                <option value="Transferencia">Transferencia</option>
              </select>
            </div>
            <br />
            <div className="d-grid gap-2">
              <br />
              <button className="btn btn-primary" type="button" style={{backgroundColor: "#cea9ca", border: "0"}}>
                Button
              </button>
            </div>
          </div>
        </div>

        <div className="col border" id="fact">
          <div className="row">
            {cart.map((value, index) => {
              return (
                <div className="row" key={index}>
                  <b>Detalles de la venta:</b>
                  <div className="col">
                    <h6>Producto</h6>
                    <p>{value.name}</p>
                  </div>
                  <div className="col">
                    <h6>precio</h6>
                    <p>{value.sellPrice}</p>
                  </div>
                  <div className="col">
                    <h6>cantidad</h6>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
