import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const Overview = () => {
  const currentProject = useSelector(state => state.project.currentProject);

  return (
    <div>
      <div>{currentProject.projectName}</div>
      <div>{currentProject.description}</div>
      {currentProject.productionVersion}
      <div>
        Started on
        <br />
        {moment(currentProject.startedOn).format("DD-MM-YYYY")}
      </div>
      <div>
        Last Updated on
        <br />
        {moment(currentProject.lastUpdatedOn).format("DD-MM-YYYY")}
      </div>
    </div>
  );
};

export default Overview;
