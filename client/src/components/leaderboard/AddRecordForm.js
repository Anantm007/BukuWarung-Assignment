import React, { Fragment, useState } from "react";
import { addRecord, uploadImage } from "./apiLeaderboard";
import Spinner from "../layout/Spinner";

//Diaglogs
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@material-ui/core";

const AddRecordForm = ({ limit, setLimit, handleClose }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    credits: 0,
  });

  const [uploadedImage, setUploadedImage] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset form state
  const clearData = async () => {
    setFormData({ ...formData, name: "", avatar: "", credits: 0 });
    setUploadedImage("");
  };

  // Handling change of form data
  const handleChange = (e) => {
    if (e.target) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Submit new record
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Submit data first to cloudinary and then back to us
    let img = "https://i.stack.imgur.com/y9DpT.jpg";

    if (uploadedImage !== "") {
      const cloud_res = await uploadImage(uploadedImage);
      if (cloud_res.status === 200) {
        img = cloud_res.data.secure_url;
      }
    }

    const res = await addRecord(formData, img);

    // Show message in browser
    window.alert(res.message);

    // Add it to the records if everything went well
    if (res.success === true) {
      setLimit(limit + 1);
    } else {
      window.location.reload(false);
    }

    // Clear form data and return
    clearData();
    setLoading(false);
    return;
  };

  // Show loading spinner
  const showLoading = () => loading && <Spinner />;

  return (
    <Fragment>
      {loading ? (
        showLoading()
      ) : (
        <Fragment>
          <form onSubmit={(e) => onSubmit(e)} method="POST">
            <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
              ADD NEW RECORD
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
                value={formData.description}
                label="User Credits"
                type="number"
                fullWidth
                onChange={(e) => handleChange(e)}
              />
              <br />
              <br />
              <h4 style={{ textAlign: "left" }}>AVATAR:</h4>
              <input
                type="file"
                onChange={(e) => setUploadedImage(e.target.files[0])}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Discard
              </Button>
              <Button color="primary" type="submit">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AddRecordForm;
