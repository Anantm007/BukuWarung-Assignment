import React, { useState, useEffect, Fragment } from "react";
import { Select, MenuItem, TextField, Dialog, Button } from "@material-ui/core";

// Components
import AddRecordForm from "../leaderboard/AddRecordForm";

// Material UI
import { makeStyles } from "@material-ui/core/styles";

const TopBar = ({ limit, setLimit, properties, handleChange }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClose = async () => {
    setOpen(false);
  };

  useEffect(() => {
    return;
  }, [limit, properties]); // eslint-disable-line

  return (
    <Fragment>
      <h2 className={classes.mainHeading}>BukuWarung Leaderboard</h2>
      <p className={classes.secondaryHeading}>
        Showing&nbsp;
        {
          <TextField
            id="limit"
            name="limit"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            value={limit}
            style={{ width: "3rem" }}
            onChange={(e) => setLimit(e.target.value)}
          />
        }
        &nbsp;records in&nbsp;
        {
          <Fragment>
            &nbsp; &nbsp;
            <Select
              id="order"
              name="order"
              value={properties.order}
              onChange={(e) => handleChange(e)}
            >
              <MenuItem value={"descending"}>DESCENDING</MenuItem>
              <MenuItem value={"ascending"}>ASCENDING</MenuItem>
            </Select>
          </Fragment>
        }
        &nbsp; order of
        {
          <Fragment>
            &nbsp; &nbsp;
            <Select
              id="attribute"
              name="attribute"
              value={properties.attribute}
              onChange={(e) => handleChange(e)}
            >
              <MenuItem value={"credits"}>CREDITS</MenuItem>
              <MenuItem value={"name"}>NAME</MenuItem>
            </Select>
          </Fragment>
        }
      </p>

      <Button
        className={classes.addButton}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        + ADD USER RECORD
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="Open New record Form"
      >
        <AddRecordForm
          limit={limit}
          setLimit={setLimit}
          handleClose={handleClose}
        />
      </Dialog>
    </Fragment>
  );
};

// Component Styles
const useStyles = makeStyles({
  mainHeading: {
    marginBottom: "3rem",
    fontSize: "2rem",
  },
  secondaryHeading: {
    textAlign: "left",
    fontSize: "1.5rem",
    margin: "4rem 1rem",
  },
  addButton: {
    background: "grey",
    fontSize: "1rem",
    alignSelf: "center",
    height: "3rem",
    color: "white",
    marginBottom: "3rem",
    "&:hover": {
      background: "black",
    },
  },
});

export default TopBar;
