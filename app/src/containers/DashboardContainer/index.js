import React, { Component } from "react";
import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";
import Section from "grommet/components/Section";
import FormField from "grommet/components/FormField";
import Footer from "grommet/components/Footer";
import Select from "grommet/components/Select";
import CheckmarkIcon from "grommet/components/icons/base/Checkmark";
import Button from "grommet/components/Button";
import Menu from "grommet/components/Menu";
import Table from "grommet/components/Table";
import Value from "grommet/components/Value";
import TableRow from "grommet/components/TableRow";
import IterationIcon from 'grommet/components/icons/base/Iteration';
import StarIcon from 'grommet/components/icons/base/Star';
import { graphql, compose } from "react-apollo";
import Toast from "grommet/components/Toast";
import axios from "axios";
import gql from "graphql-tag";
import styles from "./index.module.scss";
import { FullSection, MainContent, MainBox } from "./styles";
import { Divider, LoadingIndicator, SettingsSidebar } from "components";
import { Navbar, AppFooter } from "components";
import regeneratorRuntime from "regenerator-runtime";

class DashboardContainer extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      updateAccountToast: false,
      load_default: false,
      getData: false,
      getSecondData: false,
      currentUser: "None",
      isLoading: true,
      investments: []
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("auth_token")) {
      window.location.replace("/login");
    }
    if (this.state.getData === false) {
      const axiosGitHubGraphQL = axios.create({
        baseURL: `${
          process.env.NODE_ENV === "development"
            ? "https://jamesg.herokuapp.com/graphql"
            : "https://api.jamesg.app/graphql"
        }`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        }
      });

      const MAIN_QUERY = `{ getCurrentUser { id name role email profile_picture bio position location twitter personal_website gender api_key } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://jamesg.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: MAIN_QUERY }
        )
        .then(result => {
          this.setState({
            currentUser: result.data.data.getCurrentUser[0]
          });
        })
        .catch(result => {
          this.setState({
            currentUser: "None"
          });
        });

      const SHAREHOLDERS_QUERY = `{ getShareholders { id name shares balance }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://jamesg.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: SHAREHOLDERS_QUERY }
        )
        .then(result => {
          this.setState({
            shareholders: result.data.data.getShareholders,
            getSecondData: true,
            getData: true,
            isLoading: false
          });
        })
        .catch(result => {
          this.setState({
            shareholders: [],
            getData: true,
            isLoading: false
          });
        });
    }
  }

  render() {
    if (this.state.isLoading === true) {
      return <div />;
    }

    if (this.state.currentUser === "None") {
      window.location.replace("/login");
    }

    var sharesIssued = parseFloat(0);

    for (var item, i = 0; (item = this.state.shareholders[i++]); ) {
      var sharesIssued = parseFloat(totalShares) + parseFloat(item.shares);
    }

    return (
      <div>
        <MainBox alignContent="center" fill="horizontal" align="center">
          <FullSection primary direction="row">
            <SettingsSidebar currentUser={this.state.currentUser} />
            <MainContent
              align="center"
              justify="start"
              pad={{ vertical: "large" }}
            >
              <Heading tag="h2" align="center">
                Dashboard
              </Heading>
              <Divider />
              <Box direction="row">
                <Value
                  value={this.state.shareholders.count}
                  icon={<IterationIcon colorIndex="brand" />}
                  label="Shareholders"
                  className={styles.boxStyled}
                />
                <Value
                  value={sharesIssued}
                  icon={<StarIcon colorIndex="brand" />}
                  label="Shares Issued"
                  className={styles.boxStyled}
                />
              </Box>
              <Footer align="center" justify="center">
                <Menu inline direction="row" responsive={false}>
                  <Button
                    label="View profile"
                    primary
                    href={`/people/${this.state.currentUser.id}`}
                    style={{ marginTop: 10, marginLeft: 5 }}
                  />
                </Menu>
              </Footer>
            </MainContent>
          </FullSection>
        </MainBox>
      </div>
    );
  }
}

export default DashboardContainer;
