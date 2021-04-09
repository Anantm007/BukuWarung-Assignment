import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import EditRecordForm from "./EditRecordForm";
// Material UI
import { TableRow, TableCell, Dialog } from "@material-ui/core";

const LeaderboardTableRecord = ({
  properties,
  user,
  users,
  setUsers,
  limit,
  setLimit,
  index,
}) => {
  const classes = useStyles();

  // State
  const [open, setOpen] = useState(false);

  const handleClose = async () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <TableRow key={index}>
        <TableCell align="center">{index + 1}</TableCell>
        <TableCell align="center">
          <a href={user.avatar} target="_blank" rel="noopener noreferrer">
            <img src={user.avatar} alt="avatar_image" className={classes.img} />
          </a>
        </TableCell>
        <TableCell
          className={classes.nameStyle}
          align="center"
          onClick={() => setOpen(true)}
        >
          {user.name}
        </TableCell>
        <TableCell align="center">{user.credits}</TableCell>
      </TableRow>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="Open New record Form"
      >
        <EditRecordForm
          properties={properties}
          user={user}
          users={users}
          setUsers={setUsers}
          limit={limit}
          setLimit={setLimit}
          handleClose={handleClose}
        />
      </Dialog>
    </Fragment>
  );
};

const useStyles = makeStyles({
  nameStyle: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  img: {
    width: "40%",
  },
});

export default LeaderboardTableRecord;
