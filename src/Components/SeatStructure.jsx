import React, { useState } from "react";
import FormDialog from "./FormDialog";
import wheel from "../images/steering-wheel-icon.svg";

const SeatStructure = () => {
  const totalSeats = 40;
  const seats = Array.from({ length: totalSeats }, (_, index) => index);

  const seatGroups = [];
  for (let i = 0; i < totalSeats; i += 3) {
    seatGroups.push(seats.slice(i, i + 3));
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
          <img className="wheelIcon" src={wheel} />
          <div className="border"></div>
          {seatGroups.map((group, index) => (
            <div key={index}>
              <div className="container">
                {index % 2 === 0 && (
                  <div>
                    {group.map((seatNumber) => (
                      <div
                        className={
                          (seatNumber + 1) % 3 === 0
                            ? "last-row flex-column-center"
                            : "flex-column-center"
                        }
                      >
                        <button
                          key={seatNumber}
                          onClick={() => handleSeatClick(seatNumber)}
                          disabled={disableButton(seatNumber)}
                          className={
                            selectedSeats === seatNumber ? "selected" : ""
                          }
                        >
                          <div class="seatInner"></div>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div
          className="berth upper"
          style={{ display: "flex", position: "relative" }}
        >
          {seatGroups.map((group, index) => (
            <div key={index}>
              <div className="container">
                {index % 2 !== 0 && (
                  <div>
                    {group.map((seatNumber) => (
                      <div
                        className={
                          (seatNumber + 1) % 3 === 0
                            ? "last-row flex-column-center"
                            : "flex-column-center"
                        }
                      >
                        <button
                          key={seatNumber}
                          onClick={() => handleSeatClick(seatNumber)}
                          disabled={disableButton(seatNumber)}
                          className={
                            selectedSeats === seatNumber ? "selected" : ""
                          }
                        >
                          <div className="seatInner"></div>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
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
