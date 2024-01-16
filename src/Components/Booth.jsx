import React, { useState } from "react";
import { useForm } from "react-hook-form";
import BusButton from "./BusButton";

const Booth = () => {
  const [customerDetails, setCustomerDetails] = useState([]);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [buttonIndex, setButtonIndex] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const clickButton = (id) => {
    setButtonIndex(id);
    setShowCustomerForm(true);
  };

  const booth = (booth) => {
    const bookButton = [];
    let index = booth === "upper" ? 20 : 0;
    let limit = booth === "lower" ? 40 : 20;
    for (let i = index; i < limit; i++) {
      bookButton.push(
        <BusButton onClick={() => clickButton(i)} key={i + 1} id={i + 1} />
      );
    }
    return bookButton;
  };

  const onSubmit = (data) => {
    const array = [...customerDetails];
    array.filter((item) => item?.index === buttonIndex + 1)?.length <= 0 &&
      array.push({ ...data, index: buttonIndex + 1 });
    array.sort((a, b) => {
      return a?.index - b?.index;
    });
    sessionStorage.setItem("customerData", JSON.stringify(array));
    setCustomerDetails(array);
  };

  return (
    <div className="container">
      <div>
        <div className="upper-booth">{booth("upper")}</div>
        <div className="lower-booth">{booth("lower")}</div>
      </div>
      {showCustomerForm && (
        <form>
          <h1>For seat Number {buttonIndex + 1}</h1>
          <label for="firstName">First Name</label>
          <input id="firstName" {...register("firstName")} />
          <label for="lastName">Last Name</label>
          <input id="lastName" {...register("lastName")} />
          <label for="email">Email</label>
          <input type="email" id="email" {...register("email")} />
          <button onClick={handleSubmit(onSubmit)}>Submit</button>
        </form>
      )}
    </div>
  );
};

export default Booth;
