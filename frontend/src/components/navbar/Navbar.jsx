import React from "react";
import { Link } from "react-router-dom";
import navbarstyle from "./NavBar.module.css";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { Box } from "@mui/material";

const Navbar = () => {
  return (
    <>
      <Box className={navbarstyle.main}>
        <Link to="/" className={navbarstyle.button}>
          <HomeIcon style={{ paddingRight: "4px" }} />
          Home
        </Link>
        <Link to="/register" className={navbarstyle.button}>
          <AccountCircleIcon style={{ paddingRight: "4px" }} />
          Register
        </Link>
        <Link to="/login" className={navbarstyle.button}>
          <LoginIcon style={{ paddingRight: "4px" }} />
          LogIn
        </Link>
      </Box>
    </>
  );
};

export default Navbar;
