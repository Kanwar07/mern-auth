import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";
import loginpagestyle from "./LoginPage.module.css";
import { Box, Stack } from "@mui/material";
import image from "../../assets/image.jpg";
import LoginButton from "../button/LoginButton";

const LoginPage = () => {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const [data, setdata] = useState({
    username: "",
    password: "",
  });
  const loginUser = async (e) => {
    e.preventDefault();
    const { username, password } = data;
    try {
      const { data } = await axios.post("/login", {
        username,
        password,
      });
      if (data.error) {
        setdata({
          username: "",
          password: "",
        });
        toast.error(data.error);
      } else {
        setUser(data.username);
        setdata({
          username: "",
          password: "",
        });
        toast.success("LoggedIn successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box className={loginpagestyle.box}>
        <div className={loginpagestyle.main}>
          <img
            src={image}
            alt="form-nature"
            style={{ height: "600px", width: "600px" }}
            className={loginpagestyle.image}
          />
          <Stack className={loginpagestyle.form}>
            <form onSubmit={loginUser}>
              <div className={loginpagestyle.field}>
                <label htmlFor="username">Username : </label>
                <input
                  type="username"
                  value={data.username}
                  onChange={(e) =>
                    setdata({ ...data, username: e.target.value })
                  }
                />
              </div>
              <div className={loginpagestyle.field}>
                <label htmlFor="password">Password : </label>
                <input
                  type="password"
                  value={data.password}
                  onChange={(e) =>
                    setdata({ ...data, password: e.target.value })
                  }
                />
              </div>
              <div className={loginpagestyle.button}>
                <LoginButton type="submit" />
              </div>
            </form>
          </Stack>
        </div>
      </Box>
    </>
  );
};

export default LoginPage;
