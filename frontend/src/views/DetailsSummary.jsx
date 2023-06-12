import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ContextAuth } from "../context/AuthContext";
import { Navbar } from "../components/layout/Navbar";
import { Searcher } from "../components/layout/Searcher";
import { Footer } from "../components/layout/Footer";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import esLocale from "date-fns/locale/es";
import { Message } from "../components/Message";

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
    
        if (res.data.filterSales.length > 0) {
          setFilterSales(res.data.filterSales);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  if (filterSales.length > 0) {
    return (
      <div className="main-content">
        <Navbar />
        <Searcher />
        <table id="tableSales" className="table">
          <thead>
            <tr>
              <th>Titular</th>
              <th>Fecha</th>
              <th>Productos</th>
              <th>Metodo de pago</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {filterSales.map((value, index) => {
              const date = new Date(value.sale.date);
              const formatedDate = format(
                date,
                "EEEE, dd 'de' MMMM 'de' yyyy",
                { locale: esLocale }
              );
              return (
                <tr key={index}>
                  <td>{value.sale.userVenta.username}</td>
                  <td>{formatedDate}</td>
                  <td>
                    {value.sale.products.map((value, key) => (
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
                  <td>{value.sale.paymentMethod}</td>
                  <td>${value.sale.totalAmount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div id="monto">{/* <h4>Monto de ventas: {total}</h4> */}</div>
      </div>
    );
  } else {
    return (
      <>
        <Navbar />
        <Message />
      </>
    );
  }
};
