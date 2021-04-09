import React, { Fragment } from "react";

// Material UI
import { TableRow, TableCell } from "@material-ui/core";

const LeaderboardTableRecord = ({ user, index }) => {
  return (
    <Fragment>
      <TableRow key={index}>
        <TableCell align="left">{index + 1}</TableCell>
        <TableCell>
          <img src={user.avatar} alt="avatar_image" style={{ width: "40%" }} />
        </TableCell>
        <TableCell align="left">{user.name}</TableCell>
        <TableCell align="left">{user.credits}</TableCell>
      </TableRow>
    </Fragment>
  );
};

export default LeaderboardTableRecord;
