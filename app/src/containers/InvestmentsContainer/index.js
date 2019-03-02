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
import TableRow from "grommet/components/TableRow";
import { graphql, compose } from "react-apollo";
import Toast from "grommet/components/Toast";
import axios from "axios";
import gql from "graphql-tag";
import styles from "./index.module.scss";
import { FullSection, MainContent, MainBox } from "./styles";
import { Divider, LoadingIndicator, SettingsSidebar } from "components";
import { Navbar, AppFooter } from "components";
import regeneratorRuntime from "regenerator-runtime";

class InvestmentsContainer extends Component {
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
            currentUser: result.data.data.getCurrentUser[0],
          });
        })
        .catch(result => {
          this.setState({
            currentUser: "None",
          });
        });

      const INVESTMENTS_QUERY = `{ getInvestments { id user { id name } amount created_on } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://jamesg.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: INVESTMENTS_QUERY }
        )
        .then(result => {
          this.setState({
            investments: result.data.data.getInvestments,
            getSecondData: true,
            getData: true,
            isLoading: false
          });
        })
        .catch(result => {
          this.setState({
            investments: "None",
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
                Investments
              </Heading>
              {this.state.investments.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Investment</th>
                      <th>Amount</th>
                      <th>Created on</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.investments.map((investment) => {
                    <TableRow>
                      <td>#{investment.id}</td>
                      <td><Anchor href={`/people/${investment.user.id}`} label={investment.user.name}/></td>
                      <td>{investment.amount}</td>
                      <td className="secondary">{investment.created_on}</td>
                    </TableRow>
                  })}
                  </tbody>
                </Table>
              )}
              {this.state.investments.length > 0 && (
                <Paragraph>You have made no investments yet.</Paragraph>
              )}
              <Footer align="center" justify="center">
                <Menu inline direction="row" responsive={false}>
                  <Button
                    label="View people raising"
                    primary
                    href="/people"
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

export default InvestmentsContainer;
