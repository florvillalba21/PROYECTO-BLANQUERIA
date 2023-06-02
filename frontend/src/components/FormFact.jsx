import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { ContextAuth } from "../context/AuthContext";
import Alert from "./Alert";

export const FormFact = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [res, setRes] = useState({});
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [detCart, setDet] = useState([]);
  const { token } = useContext(ContextAuth);
  let [amount, setAmount] = useState(0);
  let [adv, setAdv] = useState("primary");

  const inpDetails = useRef();
  const selectMethod = useRef();
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      "x-access-token": token,
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/Categories", config)
      .then((res) => {
        if (res.data[0]) {
          setCategories(res.data);
          setFilter(res.data[0].name);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (filter != "") {
      axios
        .get(`http://localhost:3000/ProductsF/${filter}`, config)
        .then((res) => setProducts(res.data));
    }
  }, [filter]);

  const addToCart = (product) => {
    setCart((items) => [...items, product]);
  };

  useEffect(() => {
    let aux = 0;
    detCart.map((value, index) => {
      return (aux += value.quantity * value.sellPrice);
    });
    setAmount(aux);
  }, [detCart]);

  useEffect(() => {
    setDet(
      cart.reduce((products, product) => {
        const { _id, name, sellPrice,costPrice, 
          productOwner
           } = product;
        const existingProduct = products.find((p) => p._id === _id);
        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          products.push({ _id, name, quantity: 1, sellPrice,costPrice, productOwner });
        }
        return products;
      }, [])
    );
  }, [cart]);

  const addSell = () => {
    const url = "http://localhost:3000/newSale";
    const config = {
      headers: {
        "content-type": "application/json",
        "x-access-token": token,
      },
    };
    console.log(detCart);

    const data = {
      products: detCart,
      date: new Date(),
      paymentMethod: selectMethod.current.value,
      totalAmount: amount,
    };

    axios
      .post(url, data, config)
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setRes(res.data.ok);
          setShowAlert(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="row" style={{ margin: "20px", color: "#2f3559" }}>
      <div className="col">
        <b>Selecciona la categoria del producto:</b>
        <select
          className="form-select"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        >
          {categories.length > 0 &&
            categories.map((value, index) => {
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
                if (value.stock > 0) {
                  return (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-start"
                      onClick={() => {
                        addToCart(value);
                      }}
                    >
                      {value.name}
                      <span
                        className={`badge rounded-pill ${
                          value.stock === 1 ? "bg-danger" : "bg-secondary"
                        }`}
                      >
                        {value.stock}
                      </span>
                    </li>
                  );
                }
              })
            : ""}
        </div>
        <br />
{/* 
        <div>
          <b>Detalla la venta:</b>
          <textarea
            ref={inpDetails}
            className="form-control"
            placeholder="Si desea, puede escribir detalles puntuales de la venta para tenerlo registrado"
          />
        </div>

        <br /> */}
        <div className="row">
          <div className="col">
            <b>Monto total:</b>

            <input
              type="number"
              disabled
              placeholder="total"
              value={amount}
              className="form-control"
            />
          </div>
          <div className="col">
            <b>Medio de Pago:</b>
            <select className="form-select" ref={selectMethod}>
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia</option>
            </select>
          </div>
          <br />
          <div className="d-grid gap-2">
            <br />
            <button
              onClick={addSell}
              className="btn btn-primary"
              type="button"
              style={{
                backgroundColor: "#c6e5d9",
                border: "0",
                color: "#2f3559",
              }}
            >
              Registrar la venta
            </button>
          </div>
        </div>
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

      <div className="col border" id="fact">
        <div className="row">
          <i className="d-flex flex-row" style={{ margin: "10px" }}>
            <img
              src="../../public/icons/shopping-cart (1).svg"
              width={"30px"}
            />
          </i>

          <table>
            <thead>
              <tr>
                <th className="col">Productos</th>
                <th className="col">Cantidad</th>
                <th className="col">Presupuesto</th>
              </tr>
            </thead>
            <tbody>
              {detCart &&
                detCart.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <p>{value.name}</p>
                      </td>
                      <td>
                        <p>{value.quantity}</p>
                      </td>
                      <td>
                        <p>{value.quantity * value.sellPrice}</p>
                      </td>
                      <td>
                        <i
                          onClick={() => {
                            let nuevoDetCart = detCart.map((objeto) => {
                              if (objeto._id === value._id) {
                                objeto.quantity -= 1;
                              }
                              return objeto;
                            });

                            // Eliminar el producto si la cantidad llega a cero
                            nuevoDetCart = nuevoDetCart.filter(
                              (objeto) => objeto.quantity > 0
                            );

                            setDet(nuevoDetCart);
                          }}
                        >
                          <img src="../../public/icons/minus.svg"></img>
                        </i>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
