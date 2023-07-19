import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ContextAuth } from "../context/AuthContext";
import { Navbar } from "../components/layout/Navbar";
import { Link, useLocation } from "react-router-dom";
import { Message } from "../components/Message";
import Pagination from "../components/Pagination";
import { format } from "date-fns";
import esLocale from "date-fns/locale/es";
import backIcon from "../../public/icons/arrow-left.svg";

export const DetailsMySales = () => {
  const { state } = useLocation();
  const { year, month } = state;
  const [myProducts, setMyProducts] = useState([]);
  const { token } = useContext(ContextAuth);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Cantidad de elementos por página
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const [totalInvested, setInvested] = useState(0)
  const [totalIncome, setIncome] = useState(0)


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
      .get("http://localhost:3000/salesForUser", config)
      .then((res) => {
        // res.data.result[0].products.length > 0 && setMyProducts(res.data.result[0].products)
        res.data.result.length > 0 &&
          setMyProducts(res.data.result[0].products.toReversed());
        return res.data.result[0].products;
      })
      .then((res) => {
        let totalInvestedAmount = 0;
        let totalIncomeAmount = 0;
  
        for (let i = 0; i < res.length; i++) {
          totalInvestedAmount += res[i].costPriceAmount;
          totalIncomeAmount += res[i].productUserAmount;
        }

        setInvested(totalInvestedAmount);
        setIncome(totalIncomeAmount);
      })
      .catch((err) => console.log(err));
  }, []);

  const currentPageData = myProducts?.slice(startIndex, endIndex);

  return (
    <>
      <div className="main-content">
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
          <div className="card shadow cards-funds col-md-auto">
            <h6>AÑO</h6>
            <h5>{year}</h5>
          </div>

          <div className="card shadow cards-funds col-md-auto">
            <h6>MES</h6>
            <h5>{month}</h5>
          </div>

          <div className="card shadow cards-funds col-md-auto">
            <h6>CANTIDAD</h6>
            <h5>{myProducts.length}</h5>
          </div>

          <div className="card shadow cards-funds col-md-auto">
            <h6>TOTAL INVERTIDO</h6>
            <h5>${totalInvested}</h5>
          </div>

          <div className="card shadow cards-funds col-md-auto">
            <h6>TOTAL INGRESOS</h6>
            <h5>${totalIncome}</h5>
          </div>
        </div>

        <div id="container-table">
          <table id="tableSales" className="table shadow">
            <thead>
              <tr>
                <th>Nombre del producto</th>
                <th>Cantidad vendidas</th>
                <th>Inversiones</th>
                <th>Ingresos</th>
                <th>Diferencia</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.length > 0 ? (
                currentPageData.map((value, index) => {
                  const date = new Date(value.saleDate);
                  const formatedDate = format(
                    date,
                    "EEEE, dd 'de' MMMM 'de' yyyy",
                    { locale: esLocale }
                  );
                  return (
                    <tr key={index}>
                      <td>{value.product.name}</td>
                      <td>{value.totalQuantity}</td>
                      <td>${value.costPriceAmount}</td>
                      <td>${value.productUserAmount}</td>
                      <td>${value.difference}</td>
                      <td>{formatedDate}</td>
                    </tr>
                  );
                })
              ) : (
                <Message />
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          pageCount={Math.ceil(myProducts.length / pageSize)}
          onPageChange={handlePageChange}
        />

        <div id="monto">{/* <h4>Monto de ventas: {total}</h4> */}</div>
      </div>
    </>
  );
};
