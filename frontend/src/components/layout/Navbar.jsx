import React from "react";
import { Link } from "react-router-dom";
import { Login } from "../../views/Login";

export const Navbar = () => {
  const Logout = () => {
    
    if(localStorage.getItem('user')){
      localStorage.clear()
    }
  };
  return (
    <nav className="navbar" id="navbar">
      <div className="container-fluid">
        <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
          Blanqueria Cacatua{" "}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
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
                <Link className="nav-link" to="#">
                  Realizar una venta
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Ver inventario
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Ver ventas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Agregar nuevos productos
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
              <li>
                <div>
                  <Link to="/" onClick={Logout}>
                    
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
