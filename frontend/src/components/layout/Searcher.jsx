import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { Diccionary } from "../Diccionary";
import axios from "axios";
import { ContextAuth } from "../../context/AuthContext";

export const Searcher = () => {
  const { token } = useContext(ContextAuth);
  const { sales, res, setRes } = useContext(SearchContext);
  const [select, setSelect] = useState({
    month: "Enero",
    year: "2023",
  });

  const renderSelects = (name) => {
    return Diccionary[name].values.map((value, index) => {
      return (
        <option key={index} value={value}>
          {value}
        </option>
      );
    });
  };

  const handleSelect = (event) => {
    setSelect({
      ...select,
      [event.target.name]: event.target.value,
    });
  };

  const getSaleForDate = async () => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "x-access-token": token,
      },
      params: select,
    };

    try {
      const resp = await axios.get(
        "http://localhost:3000/salesForDate",
        config
      );

      resp.data.ok == false
        ? setRes({ ok: false, filterSales: [] })
        : setRes(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid d-flex flex-row-reverse">
          <form className="d-flex" role="search">
            <select name="year" style={{ border: 0 }} onChange={handleSelect}>
              {renderSelects("Years")}
            </select>

            <select name="month" style={{ border: 0 }} onChange={handleSelect}>
              {renderSelects("Months")}
            </select>
            <button
              id="btn"
              onClick={(e) => {
                e.preventDefault();
                getSaleForDate();
              }}
            >
              Mostrar ventas
            </button>
            {/* <input
              onChange={(e) => {
                if (select != "") {
                  console.log(select);
                  setRes(
                    sales.filter((sale) =>
                      sale[select].includes(e.target.value)
                    )
                  );
                }
              }}
              className="form-control p-2"
              type="search"
              placeholder="Escribe lo que deseas"
              aria-label="Search"
            /> */}
          </form>
        </div>
      </nav>
    </>
  );
};
