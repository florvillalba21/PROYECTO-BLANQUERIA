import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ContextAuth } from "../context/AuthContext";
import { Navbar } from "../components/layout/Navbar";
import { Link, useLocation } from "react-router-dom";
import { Message } from "../components/Message";
import { format } from "date-fns";
import esLocale from "date-fns/locale/es";
import Pagination from "../components/Pagination";

export const Funds = () => {
  const { token } = useContext(ContextAuth);
  const { state } = useLocation();
  const { year, month } = state;
  const [funds, setFunds] = useState([]);
  const [amountFund, setAmountFund] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Cantidad de elementos por página
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
      .get("http://localhost:3000/getFundDate", config)
      .then((res) => {
        setFunds(res.data.filterFunds.toReversed());
        setAmountFund(res.data.totalAmount);
        // console.log(res.data.totalAmountFunds);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const currentPageData = funds?.slice(startIndex, endIndex);

  if (funds) {
    return (
      <div className="main-content">
        <Navbar />

        <div>
          <Link
            to={"/home/summary"}
            style={{ textDecoration: "none", color: "#2f3559", margin: 15 }}
          >
            Volver atras
          </Link>
        </div>

        <div id="monto">
          <h5>Monto total que se ha retirado: {amountFund}</h5>
        </div>

        <div id="container-table">
          <table id="tableSales" className="table shadow">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Fecha</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.map((value, index) => {
                const date = new Date(value.date);
                const formatedDate = format(
                  date,
                  "EEEE, dd 'de' MMMM 'de' yyyy",
                  { locale: esLocale }
                );

                return (
                  <tr key={index}>
                    <td>{value.user.username}</td>
                    <td> {formatedDate}</td>
                    <td> {value.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Pagination
          pageCount={Math.ceil(funds.length / pageSize)}
          onPageChange={handlePageChange}
        />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Message />
    </>
  );
};
