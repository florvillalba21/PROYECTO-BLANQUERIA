import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { Diccionary } from "../../utils/Diccionary";
import axios from "axios";
import { ContextAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export const Searcher = () => {
  const { token } = useContext(ContextAuth);

  const [select, setSelect] = useState({
    month: "Enero",
    year: "2023",
  });

  

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid d-flex flex-row-reverse">
        <div className="row justify-content-md-center">
          <Link
            style={{ textDecoration: "none", color: "#2f3559", margin: 15 }}
            to="/home/summary/funds"
            className="col-md-auto"
          >
            {/* <b>Ver retiros realizados</b> */}
          </Link>
        </div>
        </div>
      </nav>
    </>
  );
};
