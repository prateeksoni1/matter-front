import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import styled from "styled-components";
import PrimaryButton from "../components/PrimaryButton";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { StyledButton } from "../styles";
import api from "../api";
import { toast } from "react-toastify";
import moment from "moment";
import { Row, Col, Button } from "react-bootstrap";
import DashboardContent from "../components/DashboardContent";
import { setCurrentProject } from "../actions";

const Dashboard = () => {
  const { _id } = useSelector(state => state.auth.profile);
  const currentProject = useSelector(state => state.project.currentProject);

  const dispatch = useDispatch();

  const [projectsList, setProjectsList] = useState([]);
  const [activeLink, setActiveLink] = useState("OVERVIEW");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/api/project/${_id}`);
        setProjectsList(res.data.projects);
      } catch (err) {
        toast.error("Error fetching projects");
      }
    };
    fetchData();
  }, [_id]);

  const renderProjectsList = () => {
    return projectsList.map(project => {
      const { projectName } = project;

      const active =
        currentProject && project.projectName === currentProject.projectName;
      return (
        <StyledProjectsListItem
          className="h5"
          active={active}
          onClick={() => dispatch(setCurrentProject(project))}
        >
          <span className="mr-2">{projectName}</span>
          {active && <FontAwesomeIcon icon={faArrowRight} />}
        </StyledProjectsListItem>
      );
    });
  };

  return (
    <Layout heading="Dashboard">
      <Row>
        <Col md={2}>
          <Link to="/create-project">
            <StyledButton className="py-2" style={{ width: "100%" }}>
              <span className="mr-2">Create Project</span>
              <FontAwesomeIcon icon={faFolderPlus} />
            </StyledButton>
          </Link>
          <StyledProjectsList className="my-4">
            <h5 className="font-weight-bold">Your Projects</h5>
            {renderProjectsList()}
          </StyledProjectsList>
        </Col>
        <Col md={10}>
          {currentProject ? (
            <StyledContainer>
              <StyledLinksContainer>
                <StyledTab active>Overview</StyledTab>
                <StyledTab>Features</StyledTab>
                <StyledTab>Bugs</StyledTab>
              </StyledLinksContainer>
              <DashboardContent activeLink={activeLink} />
            </StyledContainer>
          ) : (
            "No Project Selected"
          )}
        </Col>
      </Row>
    </Layout>
  );
};

export default Dashboard;

const StyledProjectsList = styled.div`
  color: #000;
`;

const StyledContainer = styled.div`
  margin: 0px 1rem;
  padding: 2rem 1rem;
  background-color: #c4c4c4;
  color: #000;
`;

const StyledLinksContainer = styled.div``;

const StyledTab = styled(Button)`
  background-color: inherit;
  color: #000;
  border: 0px;
  text-transform: uppercase;
  font-size: 20px;

  &:hover {
    border-bottom: 1px solid #000;
    padding-bottom: 3px;
    border-radius: 0px;
    background-color: inherit;
    color: #000;
  }

  &:active {
    border-bottom: 1px solid #000 !important;
    padding-bottom: 3px;
    border-radius: 0px;
    background-color: inherit;
    color: #000;
  }
`;

const StyledProjectsListItem = styled.div`
  cursor: pointer;
  font-weight: ${props => (props.active ? "bold" : "400")};
`;
