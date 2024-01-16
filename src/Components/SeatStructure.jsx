import React, { useState } from "react";
import FormDialog from "./FormDialog";
import SeatGroup from "./SeatGroup";
import wheel from "../images/steering-wheel-icon.svg";

const SeatStructure = () => {
  const totalSeats = 40;
  const seats = Array.from({ length: totalSeats }, (_, index) => index);
  const seatGroupsL = [];
  const seatGroupsU = [];

  for (let i = 0; i < totalSeats; i += 3) {
    if (i % 2 === 0) {
      seatGroupsU.push(seats.slice(i, i + 3));
    } else {
      seatGroupsL.push(seats.slice(i, i + 3));
    }
  }

  if (Array.isArray(seatGroupsU) && seatGroupsU.length > 0) {
    const arr = seatGroupsU[seatGroupsU.length - 1];
    seatGroupsL[seatGroupsL.length - 1].push(arr[arr.length - 1]);
    seatGroupsL[seatGroupsL.length - 1].sort();
    seatGroupsU[seatGroupsU.length - 1].pop();
  }

  const [selectedSeats, setSelectedSeats] = useState();
  const [dialogForm, setDialogForm] = useState(false);
  const [customerDetails, setCustomerDetails] = useState([]);
  const passengerInfo = JSON.parse(sessionStorage.getItem("customerData"));

  const handleSeatClick = (seatNumber) => {
    setDialogForm(true);
    setSelectedSeats(seatNumber);
  };

  const disableButton = (seatNumber) => {
    if (passengerInfo?.filter((info) => info?.index === seatNumber)?.length)
      return true;
    return false;
  };

  return (
    <div className="bus-view">
      <div className="bus" style={{ display: "flex", gap: "3rem" }}>
        <div
          className="berth lower"
          style={{ display: "flex", position: "relative" }}
        >
          <img className="wheelIcon" src={wheel} alt="wheel" />
          <div className="border"></div>
          {seatGroupsU.map((group, index) => (
            <SeatGroup
              key={index}
              seats={group}
              onClick={handleSeatClick}
              selected={selectedSeats}
              disabled={disableButton}
            />
          ))}
        </div>
        <div
          className="berth upper"
          style={{ display: "flex", position: "relative" }}
        >
          {seatGroupsL.map((group, index) => (
            <SeatGroup
              key={index}
              seats={group}
              onClick={handleSeatClick}
              selected={selectedSeats}
              disabled={disableButton}
            />
          ))}
        </div>
      </div>
      {dialogForm && (
        <FormDialog
          open={dialogForm}
          handleClose={() => setDialogForm(false)}
          customerDetails={customerDetails}
          setCustomerDetails={setCustomerDetails}
          seatNumber={selectedSeats}
        />
      )}
    </div>
  );
};

export default SeatStructure;
