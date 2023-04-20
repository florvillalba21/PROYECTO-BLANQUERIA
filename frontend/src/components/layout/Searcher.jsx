import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";

export const Searcher = () => {
  const { search, setSearch } = useContext(SearchContext);
  const { sales, res, setRes } = useContext(SearchContext);
  const [select, setSelect] = useState("");

  useEffect(() => {
    console.log(select);
  }, [select]);
  return (
    <>
      <nav className="navbar">
        <div className="container-fluid d-flex flex-row-reverse">
          <form className="d-flex" role="search">
            <select
              id=""
              className="form-select"
              onChange={(e) => setSelect(e.target.value)}
            >
              <option value="">Buscar por...</option>
              <option value="serialNumber">Numero de serie</option>
              <option value="date">Fechas</option>
            </select>
            <input
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
            />
          </form>
        </div>
      </nav>
    </>
  );
};
