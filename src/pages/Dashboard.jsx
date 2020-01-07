import React from "react";
import NavbarComponent from "../components/NavbarComponent";
import styled from "styled-components";
import PrimaryButton from "../components/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const Dashboard = () => {
  return (
    <Layout heading="Dashboard">
      <Link to="/create-project">
        <PrimaryButton>
          <span className="mr-2">Create Project</span>
          <FontAwesomeIcon icon={faFolderPlus} />
        </PrimaryButton>
      </Link>
    </Layout>
  );
};

export default Dashboard;
