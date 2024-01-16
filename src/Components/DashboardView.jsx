import React from "react";
import SeatStructure from "./SeatStructure";

const DashboardView = () => {
  return (
    <div className="dashboard-view flex-column-center">
      <h1>Bus Booking Application</h1>
      <SeatStructure />
    </div>
  );
};

export default DashboardView;
