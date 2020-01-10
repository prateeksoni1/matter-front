import React from "react";
import styled from "styled-components";
import Overview from "./Overview";

const DashboardContent = ({ activeLink }) => {
  const renderContent = () => {
    switch (activeLink) {
      case "OVERVIEW":
        return <Overview />;
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
