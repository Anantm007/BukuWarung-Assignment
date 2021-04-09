import React, { Fragment, useState, useEffect } from "react";

// Child Components
import LeaderboardTableRecord from "./LeaderboardTableRecord";
import Spinner from "../layout/Spinner";

// Material UI
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
} from "@material-ui/core";

// API Functions
import { getAllRecords } from "./apiLeaderboard";
import { sortUsers } from "../../utils/sortUsers";

const LeaderboardTable = ({ properties }) => {
  const classes = useStyles();

  // State
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users from the API
  const fetchUsers = async () => {
    setLoading(true);

    const data = await getAllRecords();

    if (data && data.success === true) {
      data.users.forEach((user) => {
        user.name = user.name.toUpperCase();
      });

      const sortedUsers = await sortUsers(
        data.users,
        properties.order,
        properties.attribute
      );

      setUsers(sortedUsers);
    }

    setLoading(false);
  };

  const showLoading = () => loading && <Spinner />;

  // useEffect hook to fetch user data
  useEffect(() => {
    fetchUsers();
  }, [properties]); // eslint-disable-line

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="medium"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow className={classes.head}>
              <StyledTableCell align="left">RANK</StyledTableCell>
              <StyledTableCell align="left" style={{ width: "30%" }}>
                AVATAR
              </StyledTableCell>
              <StyledTableCell align="left">NAME</StyledTableCell>
              <StyledTableCell align="left">CREDITS</StyledTableCell>
            </TableRow>
          </TableHead>
          {loading ? (
            showLoading()
          ) : (
            <TableBody>
              {users.map((user, index) => (
                <LeaderboardTableRecord key={index} user={user} index={index} />
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Fragment>
  );
};

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#696969",
    color: "#fff",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default LeaderboardTable;
