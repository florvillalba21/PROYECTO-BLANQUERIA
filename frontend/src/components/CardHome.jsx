import React from "react";
import { Link } from "react-router-dom";

export const CardHome = ({ tittle, description, action, url, img }) => {
  return (
    <>
      <Link
        to={url}
        style={{ textDecoration: "none", margin: 15}}
        className="shadow col-3"
        title={`Ir a ${tittle}`}
      >
        <div className="container" id="cardHome">
          <div className="card-body row justify-content-md-center">
            <div>
              <h5 className="card-title">{tittle}</h5>
            </div>

            <div>
              <img src={img} />
            </div>
  
            <div>
              <p className="card-text">{description}</p>
            </div>
          </div>
          {/* <div id="divbtn">
        <Link id="btn" to={url}>
          {action}
        </Link>
      </div> */}
        </div>
      </Link>
    </>
  );
};
