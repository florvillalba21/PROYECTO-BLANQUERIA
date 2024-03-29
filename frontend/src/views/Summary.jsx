import { useEffect, useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import axios from "axios";
import { Message } from "../components/Message";
import { useContext } from "react";
import { ContextAuth } from "../context/AuthContext";
import { Diccionary } from "../utils/Diccionary";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";



export const Summary = () => {
  const { token } = useContext(ContextAuth);
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Cantidad de elementos por página
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleOptionChange = (selectedOption, value) => {
    if (selectedOption === "sales") {
      navigate("detailsMySales/", {
        state: {
          year: value._id.year,
          month: Diccionary.Months.indexs[value._id.month - 1],
        },
      });
    } else if (selectedOption === "allSales") {
      navigate("detailsSummary/", {
        state: {
          year: value._id.year,
          month: Diccionary.Months.indexs[value._id.month - 1],
        },
      });
    }else if (selectedOption === "allFunds") {
      navigate("detailsFunds/", {
        state: {
          year: value._id.year,
          month: Diccionary.Months.indexs[value._id.month - 1],
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

  const currentPageData = sales?.slice(startIndex, endIndex);


  if (currentPageData.length > 0) {
    return (
      <div className="main-content justify-content-md-center">
        <Navbar />
        {/* <Searcher /> */}
        
        <br />
        <div id="container-table">
        
          <table id="tableSales" className="table shadow">
            
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
                  Ventas brutas
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
            <tbody>
              {currentPageData.map((value, index) => {
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
                    <td className="col">{value.total}</td>
                    <td className="col">
                      {withdrawal ? withdrawal.total : 0}
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
                        <option value="allFunds">Ver retiros</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination pageCount={Math.ceil(sales.length / pageSize)}
          onPageChange={handlePageChange}/>

        <div id="monto">{/* <h4>Monto de ventas: {total}</h4> */}</div>
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
