import React from "react";
import buttonstyle from "./Button.module.css";
import { useNavigate } from "react-router";

function LoginButton() {
  const navigate = useNavigate();

  const logoutUser = () => {
    navigate("/login");
  };

  return (
    <div>
      <button className={buttonstyle.button} onClick={logoutUser}>
        Log Out
      </button>
    </div>
  );
}

export default LoginButton;
