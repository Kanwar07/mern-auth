import React, { useContext } from "react";
import { Stack } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import dashboardstyle from "./Dashboard.module.css";
import LoginButton from "../button/LogoutButton";

function Dashboard() {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className={dashboardstyle.box}>
        <Stack className={dashboardstyle.main}>
          <h1>Dashboard</h1>
          <br />
          <div>{!!user && <h2> Hi {user.name}</h2>}</div>
          <div>
            <LoginButton />
          </div>
        </Stack>
      </div>
    </>
  );
}

export default Dashboard;
