// TableRowComponent.js
import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormDialog from "./FormDialog";

const TableRowComponent = ({ row, onDelete, i }) => {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);

  const handleDeleteDialogOpen = () => setDeleteDialog(true);
  const handleDeleteDialogClose = () => setDeleteDialog(false);

  const handleEditDialogClose = () => setEditDialog(false);

  return (
    <>
      <TableRow key={row?.index}>
        <TableCell>{row?.index + 1}</TableCell>
        <TableCell>{row?.email}</TableCell>
        <TableCell>
          {row.firstName} {row.lastName}
        </TableCell>
        {<TableCell>{row.date}</TableCell>}
        <TableCell>
          <IconButton color="secondary" onClick={handleDeleteDialogOpen}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => setEditDialog(row.firstName)}
          >
            <EditIcon />
          </IconButton>
        </TableCell>
        {deleteDialog && (
          <Dialog open={deleteDialog} onClose={handleDeleteDialogClose}>
            <DialogContent>
              Are you sure you want to delete the passenger?
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={handleDeleteDialogClose}>
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
            handleClose={handleEditDialogClose}
            customerDetails={[row]}
            setCustomerDetails={() => {}}
            seatNumber={row?.index}
            row={row}
            i={i}
          />
        )}
      </TableRow>
    </>
  );
};

export default TableRowComponent;
