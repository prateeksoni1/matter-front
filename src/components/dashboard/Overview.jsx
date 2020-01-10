import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const Overview = () => {
  const {
    projectName,
    description,
    startedOn,
    lastUpdatedOn,
    productionVersion
  } = useSelector(state => state.project.currentProject);

  return (
    <div>
      <div>{projectName}</div>
      <div>{description}</div>
      {productionVersion}
      <div>
        Started on
        <br />
        {moment(startedOn).format("DD-MM-YYYY")}
      </div>
      <div>
        Last Updated on
        <br />
        {moment(lastUpdatedOn).format("DD-MM-YYYY")}
      </div>
    </div>
  );
};

export default Overview;
