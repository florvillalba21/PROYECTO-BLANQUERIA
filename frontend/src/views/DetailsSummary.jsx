import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { format } from "date-fns";
import esLocale from "date-fns/locale/es";
import { ContextAuth } from "../context/AuthContext";
import { Navbar } from "../components/layout/Navbar";
import { Searcher } from "../components/layout/Searcher";
import { Message } from "../components/Message";
import Pagination from "../components/Pagination";
import backIcon from "../../public/icons/arrow-left.svg";

export const DetailsSummary = () => {
  const { state } = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
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

  const pageSize = 10; // Cantidad de elementos por página

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/salesForDate", config)
      .then((res) => {
        if (res.data.filterSales.length > 0) {
          setFilterSales(res.data.filterSales.toReversed());
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Calcula los índices de inicio y fin de los elementos en la página actual
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  // Obtiene los elementos correspondientes a la página actual
  const currentPageData = filterSales?.slice(startIndex, endIndex);

  return (
    <>
      <Navbar />
      <div>
          <Link
            to={"/home/summary"}
            style={{ textDecoration: "none", color: "#2f3559", marginTop: 70 }}
          >
            <img src={backIcon} width={30} />
          </Link>
        </div>
      <div className="row justify-content-center">

          <div className="card shadow cards-funds col-md-auto" >
            <h6>AÑO</h6>
            <h5>{year}</h5>
          </div>

          <div className="card shadow cards-funds col-md-auto">
            <h6>MES</h6>
            <h5>{month}</h5>
          </div>

          <div className="card shadow cards-funds col-md-auto">
            <h6>CANTIDAD</h6>
            <h5>{filterSales.length}</h5>
          </div>
        </div>

      {currentPageData.length > 0 ? (
        <div id="container-table">
          <table id="tableSales" className="table shadow">
            <thead>
              <tr>
                <th>Titular</th>
                <th>Fecha</th>
                <th>Productos</th>
                <th>Metodo de pago</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.map((value, index) => {
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
        </div>
      ) : (
        <Message />
      )}
      {filterSales.length > pageSize && (
        <Pagination
          pageCount={Math.ceil(filterSales.length / pageSize)}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};
