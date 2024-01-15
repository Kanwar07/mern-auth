import React from "react";
import buttonstyle from "./Button.module.css";

function LoginButton() {
  return (
    <div>
      <button className={buttonstyle.button}>Log In</button>
    </div>
  );
}

export default LoginButton;
