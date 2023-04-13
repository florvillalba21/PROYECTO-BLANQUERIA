import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Tab = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/Categories")
      .then((result) => {
        setCategories(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  

  return (
    <div>
      <ul className="nav nav-tabs" style={{ color: "black" }}>
        {categories.map((category, index) => {
          return(
          <li className="nav-item" key={index}>
            <Link
              className="nav-link"
              aria-current="page"
              to={"/home/inventory/Products/"+ category.name}
              style={{ color: "#cea9ca" }}
            >
              {category.name}
            </Link>
          </li>)
        })}
      </ul>
    </div>
  );
};
