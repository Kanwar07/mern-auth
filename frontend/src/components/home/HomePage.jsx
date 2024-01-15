import { Box, Stack } from "@mui/material";
import React from "react";
import homepagestyle from "./HomePage.module.css";
import image from "../../assets/image.jpg";

const HomePage = () => {
  return (
    <>
      <Box className={homepagestyle.box}>
        <div className={homepagestyle.main}>
          <img
            src={image}
            alt="form-nature"
            style={{ height: "600px", width: "600px" }}
            className={homepagestyle.image}
          />
          <Stack className={homepagestyle.form}>
            <div className={homepagestyle.field}>
              Kindly click on the login or Register to view your profile.
            </div>
          </Stack>
        </div>
      </Box>
    </>
  );
};

export default HomePage;
