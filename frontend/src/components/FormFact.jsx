import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { ContextAuth } from "../context/AuthContext";

export const FormFact = () => {
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [detCart, setDet] = useState([]);
  let [amount, setAmount] = useState(0);
  const { token } = useContext(ContextAuth);

  const inpDetails = useRef();
  const selectMethod = useRef();

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
    console.log(products)
  }, [products])

  useEffect(() => {
    setDet(
      cart.reduce((products, product) => {
        const { _id, name, sellPrice } = product;
        const existingProduct = products.find((p) => p._id === _id);
        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          products.push({ _id, name, quantity: 1, sellPrice });
        }
        return products;
      }, [])
    );
  }, [cart]);

  useEffect(() => {
    detCart.map((value) => {
      console.log(detCart)
      setAmount(amount + value.sellPrice);
    });
  }, [detCart]);

  const addSell = () => {
    const url = "http://localhost:3000/newSale";
    const config = {
      headers: {
        "content-type": "application/json",
        "x-access-token": token,
      },
    };
    const data = {
      products: detCart,
      details: inpDetails.current.value,
      date: new Date().toLocaleDateString("es-es", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      paymentMethod: selectMethod.current.value,
      totalAmount: amount,
    };
    axios
      .post(url, data, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
            ref={inpDetails}
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
              style={{ backgroundColor: "#cea9ca", border: "0" }}
            >
              Registrar la venta
            </button>
          </div>
        </div>
      </div>
      <div className="col border" id="fact">
        <div className="row">
          <b>Detalles de la venta:</b>
          <table>
            <thead>
              <tr>
                <th className="col">Producto</th>
                <th className="col">Cantidad</th>
                <th className="col">Presupuesto</th>
              </tr>
            </thead>
            <tbody>
              {detCart.map((value, index) => {
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
