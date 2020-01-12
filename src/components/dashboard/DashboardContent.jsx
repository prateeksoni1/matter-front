import React from "react";
import styled from "styled-components";
import Overview from "./Overview";
import Features from "./Features";
import Bugs from "./Bugs";

const DashboardContent = ({ activeLink }) => {
  const renderContent = () => {
    switch (activeLink) {
      case "OVERVIEW":
        return <Overview />;
      case "FEATURES":
        return <Features />;
      case "BUGS":
        return <Bugs />;
      default:
        return null;
    }
  };

  return <StyledContainer className="mt-4">{renderContent()}</StyledContainer>;
};

export default DashboardContent;

const StyledContainer = styled.div`
  padding: 1rem;
  background-color: #1e1e1e;
  color: #fff;
`;
