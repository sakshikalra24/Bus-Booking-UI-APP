// src/components/TableComponent.js

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormDialog from "./FormDialog";

const ListComponent = () => {
  const [customerDetails, setCustomerDetails] = useState(
    JSON.parse(sessionStorage.getItem("customerData"))
  );
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);

  const onDelete = (index) => {
    let data = [...customerDetails];
    data = data?.filter((d) => d?.index !== index);
    sessionStorage.setItem("customerData", JSON.stringify(data));
    setCustomerDetails(data);
    setDeleteDialog(false);
  };

  return (
    <>
      {customerDetails?.length < 1 ? (
        <>
          <h3>Please go to dashboard for booking</h3>
        </>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Seat Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customerDetails?.map((row, i) => (
                <TableRow key={row?.index}>
                  <TableCell>{row?.index + 1}</TableCell>
                  <TableCell>{row?.email}</TableCell>
                  <TableCell>
                    {row.firstName} {row.lasttName}
                  </TableCell>
                  {<TableCell>{row.date}</TableCell>}
                  <TableCell>
                    <IconButton
                      color="secondary"
                      onClick={() => setDeleteDialog(true)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => setEditDialog(true)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  {deleteDialog && (
                    <Dialog
                      open={deleteDialog}
                      onClose={() => setDeleteDialog(false)}
                    >
                      <DialogContent>
                        Are you sure you want to delete the passenger?
                      </DialogContent>
                      <DialogActions>
                        <Button
                          color="secondary"
                          onClick={() => setDeleteDialog(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => onDelete(row?.index)}
                          type="submit"
                        >
                          Delete
                        </Button>
                      </DialogActions>
                    </Dialog>
                  )}
                  {editDialog && (
                    <FormDialog
                      open={editDialog}
                      handleClose={() => setEditDialog(false)}
                      customerDetails={customerDetails}
                      setCustomerDetails={setCustomerDetails}
                      seatNumber={row?.index}
                      row={row}
                      i={i}
                    />
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default ListComponent;
