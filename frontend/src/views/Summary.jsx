import { useEffect, useState } from "react";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import axios from "axios";
import { Message } from "../components/Message";
import { Searcher } from "../components/layout/Searcher";
import { useContext } from "react";
import { ContextAuth } from "../context/AuthContext";
import { Diccionary } from "../utils/Diccionary";
import { DetailsSummary } from "./DetailsSummary";
import { useNavigate } from "react-router-dom";

export const Summary = () => {
  const { token } = useContext(ContextAuth);
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);


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
          let result = res.data.result.toReversed();
          setSales(result);
          // setTotal(res.data.salesAmount);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  if (sales.length > 0) {
    return (
      <div className="main-content">
        <Navbar />
        <Searcher />
        <table id="tableSales" className="table">
          <thead>
            <tr className="row">
              <th className="col">Año</th>
              <th className="col">Mes</th>
              <th className="col">Cantidad de ventas</th>
              <th className="col">Monto Mensual</th>
              <th className="col">Detalle del resumen</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {sales &&
              sales.map((value, index) => (
                <tr key={index} className="row">
                  <td  className="col">{value._id.year}</td>
                  <td className="col">{Diccionary.Months.values[value._id.month - 1]}</td>
                  <td className="col">{value.count}</td>
                  <td className="col">${value.total}</td>
                  <td className="col">
                    <button
                      id="btn"
                      onClick={() =>
                        navigate("detailsSummary/", {
                          state: {
                            year: value._id.year,
                            month: value._id.month,
                          },
                        })
                      }
                    >
                      Ver ventas
                    </button>
                  </td>
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
