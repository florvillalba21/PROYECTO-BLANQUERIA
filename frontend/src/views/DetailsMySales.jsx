import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ContextAuth } from "../context/AuthContext";
import { Navbar } from "../components/layout/Navbar";
import { Searcher } from "../components/layout/Searcher";
import { Footer } from "../components/layout/Footer";
import { useLocation } from "react-router-dom";
import { Message } from "../components/Message";
import Pagination from "../components/Pagination";
import { format } from "date-fns";
import esLocale from "date-fns/locale/es";

export const DetailsMySales = () => {
  const { state } = useLocation();
  const { year, month } = state;
  const [myProducts, setMyProducts] = useState([]);
  const { token } = useContext(ContextAuth);
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
      .get("http://localhost:3000/salesForUser", config)
      .then((res) => {
        // res.data.result[0].products.length > 0 && setMyProducts(res.data.result[0].products)
        console.log(res.data.result[0].products);
        res.data.result.length > 0 &&
          setMyProducts(res.data.result[0].products.toReversed());
      })
      .catch((err) => console.log(err));
  }, []);

  const currentPageData = myProducts?.slice(startIndex, endIndex);

  return (
    <>
      <div className="main-content">
        <Navbar />
        <Searcher />
        <div id="container-table">
          <table id="tableSales" className="table shadow">
            <thead>
              <tr>
                <th>Nombre del producto</th>
                <th>Cantidad vendidas</th>
                <th>Total de inversión</th>
                <th>Total de recaudación</th>
                <th>Ganancia</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.length >0 
              ?currentPageData.map((value, index) => {
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
            : <Message/>}
            </tbody>
          </table>
        </div>
        <Pagination pageCount={Math.ceil(myProducts.length / pageSize)}
          onPageChange={handlePageChange}/>

        <div id="monto">{/* <h4>Monto de ventas: {total}</h4> */}</div>
      </div>
    </>
  );
};
