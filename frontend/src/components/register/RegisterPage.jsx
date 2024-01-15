import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import registerpagestyle from "./RegisterPage.module.css";
import { Box } from "@mui/material";
import image from "../../assets/image.jpg";
import { Stack } from "@mui/material";
import RegisterButton from "../button/RegisterButton";

function RegisterPage() {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, username, email, password, confirmpassword } = data;
    try {
      const { data } = await axios.post("/register", {
        name,
        username,
        email,
        password,
        confirmpassword,
      });
      if (data.error) {
        setdata({
          name: "",
          username: "",
          email: "",
          password: "",
          confirmpassword: "",
        });
        toast.error(data.error);
      } else {
        setdata({
          name: "",
          username: "",
          email: "",
          password: "",
          confirmpassword: "",
        });
        toast.success("Registered Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box className={registerpagestyle.box}>
        <div className={registerpagestyle.main}>
          <img
            src={image}
            alt="form-nature"
            style={{ height: "600px", width: "600px" }}
            className={registerpagestyle.image}
          />
          <Stack className={registerpagestyle.form}>
            <form onSubmit={registerUser}>
              <div className={registerpagestyle.field}>
                <label htmlFor="name">Name : </label>
                <input
                  type="name"
                  value={data.name}
                  onChange={(e) => setdata({ ...data, name: e.target.value })}
                />
              </div>
              <div className={registerpagestyle.field}>
                <label htmlFor="username">Username : </label>
                <input
                  type="username"
                  value={data.username}
                  onChange={(e) =>
                    setdata({ ...data, username: e.target.value })
                  }
                />
              </div>
              <div className={registerpagestyle.field}>
                <label htmlFor="email">Email : </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setdata({ ...data, email: e.target.value })}
                />
              </div>
              <div className={registerpagestyle.field}>
                <label htmlFor="password">Password : </label>
                <input
                  type="password"
                  value={data.password}
                  onChange={(e) =>
                    setdata({ ...data, password: e.target.value })
                  }
                />
              </div>
              <div className={registerpagestyle.field}>
                <label htmlFor="password">Confirm Password : </label>
                <input
                  type="password"
                  value={data.confirmpassword}
                  onChange={(e) =>
                    setdata({ ...data, confirmpassword: e.target.value })
                  }
                />
              </div>
              <div className={registerpagestyle.button}>
                <RegisterButton type="submit" />
              </div>
            </form>
          </Stack>
        </div>
      </Box>
    </>
  );
}

export default RegisterPage;
