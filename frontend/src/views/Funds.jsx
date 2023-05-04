import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ContextAuth } from "../context/AuthContext";
import { SearchContext } from "../context/SearchContext";
import { Navbar } from "../components/layout/Navbar";
import { Link } from "react-router-dom";
import { Searcher } from "../components/layout/Searcher";

export const Funds = () =>{
    const { token } = useContext(ContextAuth);
    const [search, setSearch] = useState("");
    const [res, setRes] = useState({});
    const [funds, setFunds] = useState([]);
    const [amountFund, setAmountFund] = useState(0)

    const config = {
        headers: {
          "content-type": "application/json",
          "x-access-token": token,
        },
      };
    useEffect (() => {
        axios
          .get("http://localhost:3000/getTotalFund", config)
          .then((res) => {
             setFunds(res.data.totalFunds)
             setAmountFund(res.data.totalAmountFunds)
            console.log(res.data.totalAmountFunds);
          })
          .catch((err) => console.log(err));
      }, [])

    return(
        <>
        <>
        <Navbar />
        <SearchContext.Provider
          value={{ search, setSearch, res, setRes}}
        >
          <Searcher />
        </SearchContext.Provider>
        <div>
          <Link
          to={'/home/summary'}
            style={{ textDecoration: "none", color: "#2f3559", margin: 15 }}
           
          >
            Volver atras
          </Link>
         
        </div>
        <table id="tableSales" className="table">
          <thead>
            <tr>
       
              <th>Fecha</th>
         
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {funds.map((value, index) => {
              return (
                <tr key={index}>
                  <td> {value.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div id="monto">
          <h5>Monto total que se ha retirado: {amountFund}</h5>
        </div>
      </>
        </>
    )
}