// SeatGroup.js
import React from "react";
import Seat from "./Seat";

const SeatGroup = ({ seats, onClick, selected, disabled }) => {
  return (
    <div className="container">
      <div>
        {seats.map((seatNumber) => (
          <Seat
            key={seatNumber}
            seatNumber={seatNumber}
            onClick={onClick}
            selected={selected}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default SeatGroup;
