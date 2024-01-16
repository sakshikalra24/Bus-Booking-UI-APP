import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

const FormDialog = ({
  open,
  handleClose,
  customerDetails,
  setCustomerDetails,
  seatNumber,
  row,
  i,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.date = new Date().toJSON().slice(0, 10);
    const array = [...customerDetails];
    if (array.filter((item) => item?.index === seatNumber)?.length <= 0) {
      array.push({ ...data, index: seatNumber });
    }
    array.sort((a, b) => {
      return a?.index - b?.index;
    });
    sessionStorage.setItem("customerData", JSON.stringify(array));
    setCustomerDetails(array);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <h1>Passenger Information for seat number - {seatNumber + 1}</h1>
      </DialogTitle>

      <DialogContent sx={{ minWidth: "300px" }}>
        <DialogContentText>Please fill out the form below:</DialogContentText>
        <form>
          <TextField
            defaultValue={row?.email || ""}
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            name="email"
            color="secondary"
            {...register("email", { required: "This field is required" })}
            error={Boolean(errors["email"])}
            helperText={errors?.email?.message}
          />
          <TextField
            defaultValue={row?.firstName || ""}
            margin="dense"
            label="First Name"
            fullWidth
            name="firstName"
            color="secondary"
            {...register("firstName", { required: "This field is required" })}
            error={Boolean(errors["firstName"])}
            helperText={errors?.firstName?.message}
          />
          <TextField
            defaultValue={row?.lastName || ""}
            margin="dense"
            label="Last Name"
            fullWidth
            color="secondary"
            name="lastName"
            {...register("lastName", { required: "This field is required" })}
            error={Boolean(errors["lastName"])}
            helperText={errors?.lastName?.message}
          />
        </form>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          color="secondary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
