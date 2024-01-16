import React, { useState } from "react";

const List = () => {
  const [customerDetails, setCustomerDetails] = useState(
    JSON.parse(sessionStorage.getItem("customerData"))
  );

  const deleteData = (index) => {
    let data = [...customerDetails];
    data = data?.filter((d) => d?.index !== index);
    sessionStorage.setItem("customerData", JSON.stringify(data));
    setCustomerDetails(data);
  };

  return (
    <div>
      <div>
        {customerDetails?.map((details) => {
          return (
            <div key={details?.index}>
              <p>seatNumber{details?.index}</p>
              <p>
                Name - {details?.firstName} {details?.lastName}
              </p>
              <p>Email - {details?.email}</p>
              <button onClick={() => deleteData(details?.index)}>Delete</button>
              <button>Edit</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
