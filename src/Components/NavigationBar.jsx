import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NavigationBar = () => {
  const url = window.location.href;

  return (
    <AppBar position="static" className="appBar">
      <Toolbar sx={{ justifyContent: "center" }}>
        {/* Hide these links on medium and larger screens */}
        <Button
          className={`nav-links ${url?.includes("reservation") && "selected"}`}
          component={RouterLink}
          to="/reservation"
        >
          Reservation
        </Button>
        <Button
          className={`nav-links ${url?.includes("dashboard") && "selected"}`}
          component={RouterLink}
          to="/dashboard"
        >
          Dashboard
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
