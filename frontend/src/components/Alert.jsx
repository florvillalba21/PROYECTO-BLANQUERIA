import React, { useState, useEffect } from "react";
import axios from "axios";

function Alert(props) {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setShowAlert(props.showAlert);
  }, [props.showAlert]);

  const handleClick = () => {
    setShowAlert(false);
  };

  return (
    showAlert && (
      <div className={`${props.type}`} role="alert">
        <span className="close-btn" onClick={handleClick}>
          ×
        </span>
        {props.message}
      </div>
    )
  );
}

export default Alert;
