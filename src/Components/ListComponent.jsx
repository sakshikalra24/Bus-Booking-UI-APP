// ListComponent.js
import React, { useState } from "react";
import { Paper } from "@mui/material";
import TableComponent from "./TableComponent";

const ListComponent = () => {
  const [customerDetails, setCustomerDetails] = useState(
    JSON.parse(sessionStorage.getItem("customerData")) || []
  );

  const onDelete = (index) => {
    const updatedData = customerDetails.filter((d) => d?.index !== index);
    sessionStorage.setItem("customerData", JSON.stringify(updatedData));
    setCustomerDetails(updatedData);
  };

  return (
    <Paper className="reservation-list">
      {customerDetails?.length < 1 ? (
        <h3>Please go to the dashboard for booking</h3>
      ) : (
        <TableComponent customerDetails={customerDetails} onDelete={onDelete} />
      )}
    </Paper>
  );
};

export default ListComponent;
