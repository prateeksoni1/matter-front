import React from "react";
import { useSelector } from "react-redux";

const Overview = () => {
  const currentProject = useSelector(state => state.project.currentProject);

  return <div>{currentProject.projectName}</div>;
};

export default Overview;
