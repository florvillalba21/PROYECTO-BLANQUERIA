import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

export const Searcher = () => {
  const { search, setSearch } = useContext(SearchContext);
  const { sales, res, setRes } = useContext(SearchContext);
  return (
    <>
      <nav className="navbar">
        <div className="container-fluid d-flex flex-row-reverse">
          <form className="d-flex" role="search">
            <input
              onChange={(e) =>
                setRes(
                  sales.filter((sale) =>
                    sale.date.includes(e.target.value)
                  )
                )
              }
              className="form-control p-2"
              type="search"
              placeholder="Buscar por fecha"
              aria-label="Search"
            />
            <button className="btn" id="btn">
              Buscar
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};
