import { useEffect, useState } from "react";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import axios from "axios";
import { Message } from "../components/Message";
import { Searcher } from "../components/layout/Searcher";
import { SearchContext } from "../context/SearchContext";
import { useContext } from "react";
import { ContextAuth } from "../context/AuthContext";

export const Summary = () => {
  const { token } = useContext(ContextAuth);
  const [sales, setSales] = useState([]);
  const [total, setTotal] = useState({});
  const [search, setSearch] = useState("");
  const [res, setRes] = useState({});

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
        setSales(res.data.allSales);
        setTotal(res.data.salesAmount);
      })
      .catch((err) => console.log(err));
  }, []);


  
  if (res.filterSales) {
    return (
      <>
        <Navbar />
        <SearchContext.Provider
          value={{ search, setSearch, res, setRes, sales }}
        >
          <Searcher />
        </SearchContext.Provider>
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
        <Footer />
      </>
    );
  }
  if (sales.length > 0) {
    return (
      <>
        <Navbar />
        <SearchContext.Provider
          value={{ search, setSearch, res, setRes, sales }}
        >
          <Searcher />
        </SearchContext.Provider>
        <table id="tableSales" className="table">
          <thead>
            <tr>
              <th>Numero de serie</th>
              <th>Fecha</th>
              <th>Monto total</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {sales.map((value, index) => {
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
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Message />
      <Footer />
    </>
  );
};
