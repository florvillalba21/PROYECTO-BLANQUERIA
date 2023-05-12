import { useEffect, useState } from "react";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import axios from "axios";
import { Message } from "../components/Message";
import { Searcher } from "../components/layout/Searcher";
import { useContext } from "react";
import { ContextAuth } from "../context/AuthContext";
import { Diccionary } from "../utils/Diccionary";

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
      .get("http://localhost:3000/salesOrderDate", config)
      .then((res) => {
        if (res.data.result) {
          console.log(res.data.result);
          setSales(res.data.result);
          // setTotal(res.data.salesAmount);
        }
      })
      .catch((err) => console.log(err));
  }, []);

 
  useEffect(() => {
    console.log(sales);
  }, [sales]);


  // listaVentas.sort((venta1, venta2) => {
  //   return venta2.fecha - venta1.fecha;
  // });
  
  if (sales.length > 0) {
    return (
      <div className="main-content">
        <Navbar />
        <Searcher/>
        <table id="tableSales" className="table">
          <thead>
            <tr>
              <th>Año</th>
              <th>Mes</th>
              <th>Cantidad de ventas</th>
              <th>Monto Mensual</th>

            </tr>
          </thead>
          <tbody className="table-group-divider">
            
            {sales &&
              sales.map((value, index) => (
              
                <tr key={index}>
                  <td>{value._id.year}</td>
                  <td>{Diccionary.Months.values[value._id.month-1]}</td>
                  <td>{value.count}</td>
                  <td>{value.total}</td>
                  <td><button id="btn">Ver ventas</button></td>
                </tr>
              ))}
          </tbody>
        </table>
        <div id="monto">{/* <h4>Monto de ventas: {total}</h4> */}</div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="main-content">
      <Navbar />
      <Message />
    </div>
  );
};
