import React, { useState, useEffect } from "react";
import axios from "axios";

function Alert(props) {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setShowAlert(props.showAlert);
  }, [props.showAlert]);



  return (
    showAlert && (
      <div className={`${props.type}`} role="alert">
        {props.message}
      </div>
    )
  );
}

export default Alert;
