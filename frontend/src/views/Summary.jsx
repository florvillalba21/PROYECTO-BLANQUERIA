import { useEffect, useState } from "react";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import axios from "axios";
import { Message } from "../components/Message";
import { Searcher } from "../components/layout/Searcher";
import { SearchContext } from "../context/SearchContext";

export const Summary = () => {
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");
  const [res, setRes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/allSales")
      .then((res) => setSales(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (search == "") {
      setRes([]);
    }
  }, [search]);

  if (res.length > 0) {
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
            <th>Numero de serie</th>
            <th>Fecha</th>
            <th>Monto total</th>
          </thead>
          <tbody className="table-group-divider">
            {res.map((value, index) => {
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
        <Footer />
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
        <table id="tableSales" className="table">
          <thead>
            <th>Numero de serie</th>
            <th>Fecha</th>
            <th>Monto total</th>
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
