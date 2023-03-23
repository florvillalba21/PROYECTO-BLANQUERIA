import React from "react";
import { Link } from "react-router-dom";

export const CardHome = ({ tittle, description, action, url }) => {
  return (
    <div id="cardHome" className="shadow rounded">
      <div className="card-body">
        <h5 className="card-title">{tittle}</h5>
        <p className="card-text">{description}</p>
      </div>
      <div id="divbtn">
        <Link id="btn" to={url}>
          {action}
        </Link>
      </div>
    </div>
  );
};
