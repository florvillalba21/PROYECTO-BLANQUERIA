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
import { Description } from "../components/Description";

export const Summary = () => {
  const { token } = useContext(ContextAuth);
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);

  const handleOptionChange = (selectedOption, value) => {
    if (selectedOption === "sales") {
      navigate("detailsMySales/", {
        state: {
          year: value._id.year,
          month: value._id.month,
        },
      });
    } else if (selectedOption === "allSales") {
      navigate("detailsSummary/", {
        state: {
          year: value._id.year,
          month: value._id.month,
        },
      });
    }
  };

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

    axios
      .get("http://localhost:3000/getFundOrderDate", config)
      .then((res) => {
        if (res.data.ok) {
          setWithdrawals(res.data.result);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  if (sales.length > 0) {
    return (
      <div className="main-content">
        <Navbar />
        {/* <Searcher /> */}
        <Description
          text={
            'En esta sección podrá ver su resumen mensual(a que año pertenece, mes, cantidad de ventas realizadas, y el monto mensual). Tambien, podrá ver las ventas realizadas en dicho mes y año ingresando al boton "Ver ventas"'
          }
        />
        <br />
        <table id="tableSales" className="table">
          <thead>
            <tr className="row">
              <th className="col" title="Año del resumen">
                Año
              </th>
              <th className="col" title="Mes del resumen">
                Mes
              </th>
              <th
                className="col"
                title="Cantidad de ventas realizadas en este mes y año."
              >
                Cantidad de ventas
              </th>
              <th
                className="col"
                title="El monto recaudado en este mes y su respectivo año"
              >
                Recaudado
              </th>
              <th
                className="col"
                title="El monto de retiros realizados en este mes."
              >
                Total de retiros
              </th>
              <th
                className="col"
                title="Puedes ver las ventas y sus detalles ingresando al boton."
              >
                Detalle del resumen
              </th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {sales.map((value, index) => {
              // Filtrar los retiros correspondientes al mismo mes y año
              const withdrawal = withdrawals.find(
                (withdrawal) =>
                  withdrawal._id.month === value._id.month &&
                  withdrawal._id.year === value._id.year
              );

              return (
                <tr key={index} className="row">
                  <td className="col">{value._id.year}</td>
                  <td className="col">
                    {Diccionary.Months.values[value._id.month - 1]}
                  </td>
                  <td className="col">{value.count}</td>
                  <td className="col">${value.total}</td>
                  <td className="col">
                    ${withdrawal ? withdrawal.total : 0}
                  </td>
                  <td className="col">
                    <select
                      style={{ width: "70%" }}
                      className="form-select"
                      onChange={(e) =>
                        handleOptionChange(e.target.value, value)
                      }
                    >
                      <option value="default">Ver</option>
                      <option value="sales">
                        Ver mis productos vendidos
                      </option>
                      <option value="allSales">Ver todos</option>
                    </select>
                  </td>
                </tr>
              );
            })}
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
