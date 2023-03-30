import React from "react";
import { Link } from "react-router-dom";

export const Tab = ({toalla="nav-link", almohada="nav-link", sabana="nav-link", mantel="nav-link"}) => {

  return (
    <div>
      <ul className="nav nav-tabs" style={{color: "black"}}>
        <li className="nav-item">
          <Link className={toalla} aria-current="page" to="/home/inventory/towels" style={{color:"#cea9ca"}}>
            Toallas
          </Link>
        </li>
        <li className="nav-item">
          <Link className={almohada} aria-current="page" to="/home/inventory/pillows" style={{color:"#cea9ca"}}>
            Almohadas
          </Link>
        </li>
        <li className="nav-item">
          <Link className={mantel} aria-current="page" to="/home/inventory/tablecloths" style={{color:"#cea9ca"}}>
            Manteles
          </Link>
        </li>
        <li className="nav-item">
          <Link className={sabana} aria-current="page" to="/home/inventory/bedsheets" style={{color:"#cea9ca"}}>
            Sabanas
          </Link>
        </li>
      </ul>
    </div>
  );
};
