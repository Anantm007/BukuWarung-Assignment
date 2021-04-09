import React, { Fragment, useState, useEffect } from "react";

// Other components
import LeaderboardTable from "../leaderboard/LeaderboardTable";
import TopBar from "./TopBar";

import { numberofRecords } from "./apiLayout";

const Landing = () => {
  // State
  const [properties, setProperties] = useState({
    order: "descending",
    attribute: "credits",
  });

  const [limit, setLimit] = useState(0);

  // Set initial number of records
  const getTotalNumberOfRecords = async () => {
    const data = await numberofRecords();

    if (data.success === true) {
      setLimit(data.count);
    }
  };

  // Handle changes in properties
  const handleChange = (e) => {
    if (e.target) {
      setProperties({ ...properties, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    getTotalNumberOfRecords();
  }, []); // eslint-disable-line

  return (
    <Fragment>
      <TopBar
        limit={limit}
        setLimit={setLimit}
        properties={properties}
        handleChange={handleChange}
      />
      <LeaderboardTable properties={properties} />
    </Fragment>
  );
};

export default Landing;
