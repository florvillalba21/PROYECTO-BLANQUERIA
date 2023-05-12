import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ContextAuth } from "../context/AuthContext";
import { Navbar } from "../components/layout/Navbar";
import { Searcher } from "../components/layout/Searcher";
import { Footer } from "../components/layout/Footer";
import { useLocation } from "react-router-dom";

export const DetailsSummary = () => {
  const { state } = useLocation();
  const [filterSales, setFilterSales] = useState([]);
  const { year, month } = state;
  const { token } = useContext(ContextAuth);
  const config = {
    headers: {
      "content-type": "application/json",
      "x-access-token": token,
    },
    params: {
      year: year,
      month: month,
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/salesForDate", config)
      .then((res) => {
        res.data.filterSales.length > 0 && (
            setFilterSales(res.data.filterSales))
            console.log(res.data.filterSales);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="main-content">
        <Navbar />
        <Searcher />
        <table id="tableSales" className="table">
          <thead>
            <tr>
              <th>Numero serial</th>
              <th>Productos</th>
              <th>Detalles</th>
              <th>Metodo de pago</th>
              <th>Monto</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {filterSales &&
              filterSales.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{value.serialNumber}</td>
                    <td>
                      {value.products.map((value, key) => (
                        <tr key={key}>
                          <td>{value.name}</td>
                          <td>{value.quantity}</td>
                        </tr>
                      ))}
                    </td>
                    <td>{value.details}</td>
                    <td>{value.paymentMethod}</td>
                    <td>{value.totalAmount}</td>
                    <td>{value.date}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div id="monto">{/* <h4>Monto de ventas: {total}</h4> */}</div>

        <Footer />
      </div>
    </>
  );
};
