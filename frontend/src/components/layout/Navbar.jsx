import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ContextAuth } from "../../context/AuthContext";

export const Navbar = () => {
  const { logout, user } = useContext(ContextAuth);
  const navigate = useNavigate();
  const Logout = () => {
    logout();
    
  };
  return (
    <nav className="navbar shadow" id="navbar">
      <div className="container-fluid">
        <div className="d-flex">
          <Link
            to="/home"
            style={{
              textDecoration: "none",
              flex: '1',
              width: "100%"
            }}
            
          >
            <h2 id="titleName">BIenvenida </h2>
          </Link>
          <h4 id="titleInicio" >{user}</h4>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
          style={{ border: 0 }}
        >
          <img src="../../../public/icons/home.svg" width={"50px"} />
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Menú
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="#">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/home/sell">
                  Realizar una venta
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/home/inventory">
                  Ver inventario
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/home/summary">
                  Ver ventas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/home/addProduct">
                  Agregar nuevos productos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/home/addCategory">
                  Agregar nueva categoría
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/home/withdrawals">
                  Retirar dinero
                </Link>
              </li>

              {/* <li className="nav-item dropdown">
                <Link 
                  className="nav-link dropdown-toggle"
                 to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link  className="dropdown-item" to="#">
                      Action
                    </Link >
                  </li>
                  <li>
                    <Link  className="dropdown-item" to="#">
                      Another action
                    </Link >
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link  className="dropdown-item" to="#">
                      Something else here
                    </Link >
                  </li>
                </ul>
              </li> */}
              <li className="nav-item">
                <div>
                  <Link to="/" className="nav-link" onClick={Logout}>
                    Salir
                  </Link>
                </div>
              </li>
            </ul>
            {/* <form className="d-flex mt-3" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </div>
    </nav>
  );
};
