// Seat.js
import React from "react";

const Seat = ({ seatNumber, onClick, selected, disabled }) => {
  return (
    <div
      className={
        (seatNumber + 1) % 3 === 0
          ? "last-row flex-column-center"
          : "flex-column-center"
      }
    >
      <button
        key={seatNumber}
        onClick={() => onClick(seatNumber)}
        disabled={disabled(seatNumber)}
        className={`${selected === seatNumber ? "selected" : ""} seat-button`}
      >
        <div className="seatInner"></div>
      </button>
    </div>
  );
};

export default Seat;
