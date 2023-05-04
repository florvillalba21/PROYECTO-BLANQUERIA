import { useEffect, useState } from "react";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import axios from "axios";
import { Message } from "../components/Message";
import { Searcher } from "../components/layout/Searcher";
import { SearchContext } from "../context/SearchContext";
import { useContext } from "react";
import { ContextAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export const Summary = () => {
  const { token } = useContext(ContextAuth);
  const [sales, setSales] = useState([]);
  const [total, setTotal] = useState({});
  const [search, setSearch] = useState("");
  const [res, setRes] = useState({});
  const [mySales, setMySales] = useState([]);
 

  const config = {
    headers: {
      "content-type": "application/json",
      "x-access-token": token,
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/allSales", config)
      .then((res) => {
        if (res.data.allSales) {
          setSales(res.data.allSales);
          setTotal(res.data.salesAmount);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const clear = () => {
    setRes({});
    setMySales([]);
  };

  const getMySales = () => {
    axios
      .get("http://localhost:3000/sales", config)
      .then((res) => {
        if (res.data.filterSales) {
          setMySales(res.data.filterSales);
        }
      })
      .catch((err) => console.log(err));
  };

  

  if (res.filterSales) {
    return (
      <>
        <Navbar />
        <SearchContext.Provider
          value={{ search, setSearch, res, setRes, sales }}
        >
          <Searcher />
        </SearchContext.Provider>
        <div>
          <Link
            style={{ textDecoration: "none", color: "#2f3559", margin: 15 }}
            onClick={clear}
          >
            Ver todas las ventas
          </Link>
          <Link
            style={{ textDecoration: "none", color: "#2f3559", margin: 15 }}
            onClick={getMySales}
          >
            Ver mis ventas
          </Link>
          <Link
            style={{ textDecoration: "none", color: "#2f3559", margin: 15 }}
            to='funds/'
          >
            Ver retiros de fondos
          </Link>
        </div>
        <table id="tableSales" className="table">
          <thead>
            <tr>
              <th>Numero de serie</th>
              <th>Fecha</th>
              <th>Monto total</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {res.filterSales.length === 0 ? (
              <tr>
                <td colSpan="3">
                  No se encuentran coincidencias con la fecha solicitada
                </td>
              </tr>
            ) : (
              res.filterSales.map((value, index) => {
                return (
                  <tr key={index}>
                    <td> {value.serialNumber}</td>
                    <td> {value.date}</td>
                    <td> {value.totalAmount}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        <div id="monto">
          <h4>Monto de ventas: {res.amount}</h4>
        </div>
      </>
    );
  } else if (sales.length > 0) {
    return (
      <>
        <Navbar />
        <SearchContext.Provider
          value={{ search, setSearch, res, setRes, sales }}
        >
          <Searcher />
        </SearchContext.Provider>
        <div>
          <Link
            style={{ textDecoration: "none", color: "#2f3559", margin: 15 }}
            onClick={clear}
          >
            Ver todas las ventas
          </Link>
          <Link
            style={{ textDecoration: "none", color: "#2f3559", margin: 15 }}
            onClick={getMySales}
          >
            Ver mis ventas
          </Link>
          <Link
            style={{ textDecoration: "none", color: "#2f3559", margin: 15 }}
            to='funds/'
          >
            Ver retiros de fondos
          </Link>
        </div>
        <table id="tableSales" className="table">
          <thead>
            <tr>
              <th>Numero de serie</th>
              <th>Fecha</th>
              <th>Monto total</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {mySales.length > 0
              ? mySales.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td> {value.serialNumber}</td>
                      <td> {value.date}</td>
                      <td> {value.totalAmount}</td>
                    </tr>
                  );
                })
              : sales.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td> {value.serialNumber}</td>
                      <td> {value.date}</td>
                      <td> {value.totalAmount}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
        <div id="monto">
          <h4>Monto de ventas: {total}</h4>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Message />
    </>
  );
};
