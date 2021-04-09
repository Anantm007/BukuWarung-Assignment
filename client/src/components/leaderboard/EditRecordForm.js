import React, { Fragment, useState } from "react";
import { updateRecord, deleteRecord } from "./apiLeaderboard";

import { sortUsers } from "../../utils/sortUsers";

//Diaglogs
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@material-ui/core";

const EditRecordForm = ({
  user,
  properties,
  users,
  setUsers,
  limit,
  setLimit,
  handleClose,
}) => {
  // Form state
  const [formData, setFormData] = useState({
    name: user.name,
    credits: user.credits,
  });

  // Handling change of form data
  const handleChange = (e) => {
    if (e.target) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Delete user
  const deleteUser = async () => {
    // Double check
    const check = window.confirm("Are you sure you want to delete?");
    if (!check) {
      return;
    }

    const res = await deleteRecord(user._id);
    window.alert(res.message);

    if (res.success === true) {
      setLimit(limit - 1);
      let newRecords = users.filter((userObj) => userObj._id !== user._id);

      newRecords = await sortUsers(
        newRecords,
        properties.order,
        properties.attribute,
        limit
      );

      setUsers(newRecords);
    }

    handleClose();
    return;
  };

  // Submit edit record form
  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await updateRecord(user._id, formData);

    // Show message in browser
    window.alert(res.message);

    // Refresh the page if everything went well
    if (res.success === true) {
      const sortedUsers = await sortUsers(
        res.users,
        properties.order,
        properties.attribute,
        limit
      );

      setUsers(sortedUsers);
    }

    return;
  };

  return (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)} method="POST">
        <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
          EDIT RECORD
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            required
            name="name"
            value={formData.name}
            label="User Name"
            type="text"
            fullWidth
            onChange={(e) => handleChange(e)}
          />
          <TextField
            margin="dense"
            required
            name="credits"
            value={formData.credits}
            label="User Credits"
            type="number"
            fullWidth
            onChange={(e) => handleChange(e)}
          />
          <br />
          <br />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => deleteUser()}
            style={{ marginRight: "4rem" }}
            color="primary"
          >
            DELETE USER!!
          </Button>
          <Button onClick={handleClose} color="primary">
            Discard
          </Button>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Fragment>
  );
};

export default EditRecordForm;
