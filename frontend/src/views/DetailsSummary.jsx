import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ContextAuth } from "../context/AuthContext";
import { Navbar } from "../components/layout/Navbar";
import { Searcher } from "../components/layout/Searcher";
import { Footer } from "../components/layout/Footer";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import esLocale from "date-fns/locale/es";

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
        res.data.filterSales.length > 0 && setFilterSales( res.data.filterSales.toReversed());
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
              <th>Fecha</th>
              <th>Productos</th>
              <th>Metodo de pago</th>
              <th>Monto</th>
              
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {filterSales &&
              filterSales.map((value, index) => {
                const date = new Date(value.date);
                const formatedDate = format(
                  date,
                  "EEEE, dd 'de' MMMM 'de' yyyy",
                  { locale: esLocale }
                );
                return (
                  <tr key={index}>
                    <td>{value.serialNumber}</td>
                    <td>{formatedDate}</td>
                    <td>
                      {value.products.map((value, key) => (
                        <ul key={key}>
                          <li className="list-group-item d-flex justify-content-between align-items-start">
                            {value.name}{" "}
                            <span className="badge bg-secondary rounded-pill">
                              {value.quantity}
                            </span>
                          </li>
                        </ul>
                      ))}
                    </td>
                    <td>{value.paymentMethod}</td>
                    <td>${value.totalAmount}</td>
                    
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div id="monto">{/* <h4>Monto de ventas: {total}</h4> */}</div>

     
      </div>
    </>
  );
};
