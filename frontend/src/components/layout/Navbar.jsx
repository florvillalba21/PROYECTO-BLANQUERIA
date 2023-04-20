import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";


export const Navbar = () => {
  const navigate = useNavigate();
  const Logout = () => {
    if (localStorage.getItem("token")) {
      localStorage.clear();
      
    }
  };
  return (
    <nav className="navbar text-center" id="navbar">
      <div className="container-fluid" >
        <Link to="/home" style={{ textDecoration: "none", color: "#2f3559", fontSize:"40px", fontFamily: 'Lobster, cursive'}} >
          Blanqueria Cacatúa
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
          style={{border: 0}}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" width="50" height="50"><path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"></path></svg>
          
          
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
                  <Link to = '/'  onClick={Logout}>
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
