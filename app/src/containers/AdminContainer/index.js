import React, { Component } from "react";
import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";
import Paragraph from "grommet/components/Paragraph";
import Section from "grommet/components/Section";
import Toast from "grommet/components/Toast";
import Columns from "grommet/components/Columns";
import Anchor from "grommet/components/Anchor";
import Footer from "grommet/components/Footer";
import Tabs from "grommet/components/Tabs";
import Tab from "grommet/components/Tab";
import Table from "grommet/components/Table";
import Button from "grommet/components/Button";
import Layer from "grommet/components/Layer";
import TableRow from "grommet/components/TableRow";
import FormField from "grommet/components/FormField";
import CheckBox from "grommet/components/CheckBox";
import RCPagination from "rc-pagination";
import axios from "axios";
import styles from "./index.module.scss";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { FullSection, MainContent, MainBox } from "./styles";
import { Divider, LoadingIndicator } from "components";
import { Navbar, AppFooter } from "components";
import regeneratorRuntime from "regenerator-runtime";

class AdminContainer extends Component {
  constructor() {
    super();
    this.state = {
      getData: false,
      currentPage: 1
    };
  }

  setNewPage(newPage) {
    this.setState({ currentPage: newPage });
  }

  componentDidMount() {
    if (this.state.getData === false) {
      const axiosGitHubGraphQLAuth = axios.create({
        baseURL: `${
          process.env.NODE_ENV === "development"
            ? "https://personly-api.herokuapp.com/graphql"
            : "https://api.jamesg.app/graphql"
        }`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        }
      });

      const USER_QUERY = "{ getCurrentUser { id name role email } }";

      axiosGitHubGraphQLAuth
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          {
            query: USER_QUERY
          }
        )
        .then(result => {
          this.setState({
            currentUser: result.data.data.getCurrentUser[0]
          });
        });

      var axiosGitHubGraphQL = axios.create({
        baseURL: `${
          process.env.NODE_ENV === "development"
            ? "https://personly-api.herokuapp.com/graphql"
            : "https://api.jamesg.app/graphql"
        }`
      });

      const MAIN_QUERY = `{ getUsers(public: false) { id name shares twitter bio balance work_badge friend_badge } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: MAIN_QUERY }
        )
        .then(result => {
          this.setState({
            users: result.data.data.getUsers,
            total: result.data.data.getUsers.length
          });
        })
        .catch(error => {
          this.setState({
            users: []
          });
        });

      const RAISING_USERS_QUERY = `{ getUsers(public: true) { id name shares twitter bio balance work_badge friend_badge } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: RAISING_USERS_QUERY }
        )
        .then(result => {
          this.setState({
            public_users: result.data.data.getUsers
          });
        })
        .catch(error => {
          this.setState({
            public_users: []
          });
        });

      const UPDATE_QUERY = `{ getUpdates { id title url created_on } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: UPDATE_QUERY }
        )
        .then(result => {
          this.setState({
            updates: result.data.data.getUpdates,
            getData: true,
            isLoading: false
          });
        })
        .catch(error => {
          this.setState({
            users: [],
            length: 0,
            getData: true,
            isLoading: false
          });
        });

      const BALANCE_QUERY = "{ getUsers(id: 1) { id balance } }";

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          {
            query: BALANCE_QUERY
          }
        )
        .then(result => {
          this.setState({
            jamesgFunds: result.data.data.getUsers[0],
            getData: true
          });
        });
    }
  }

  toggleUserDeleted() {
    this.setState({
      userDeleted: !this.state.userDeleted
    });
  }

  render() {
    if (!this.state.currentUser) {
      return <div />;
    }

    if (!this.state.users) {
      return <div />;
    }

    if (this.state.currentUser === "None") {
      window.location.replace("/login");
    }
    if (this.state.currentUser.role !== "Admin") {
      window.location.replace("/login");
    }

    return (
      <MainBox alignContent="center" fill="horizontal" align="center">
        <FullSection primary direction="row">
          <MainContent
            align="center"
            justify="start"
            pad={{ vertical: "large" }}
          >
            <Section align="center" justify="center">
              <Heading tag="h2">Administration</Heading>
              <Divider />
              <Tabs>
                <Tab title="Statistics">
                  <Box
                    direction="row"
                    justify="center"
                    className={styles.tableItem}
                  >
                    <Box align="center" pad="large">
                      <Paragraph>
                        Current user count: {this.state.users.length}
                        <br />
                        Current public user count:{" "}
                        {this.state.public_users.length}
                        <br />
                      </Paragraph>
                    </Box>
                  </Box>
                </Tab>
                <Tab title="Users">
                  <Box pad="large" className={styles.tableItem}>
                    <Heading tag="h2" align="center">
                      Users
                    </Heading>
                    {this.state.users && (
                      <div>
                        <Table>
                          <thead>
                            <tr>
                              <th>User</th>
                              <th>Twitter</th>
                              <th>Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.users.map(user => {
                              return (
                                <TableRow>
                                  <td>
                                    <Anchor
                                      href={`/profile/${user.id}`}
                                      label={`${user.name}`}
                                    />
                                  </td>
                                  <td>
                                    <Anchor
                                      href={`https://twitter.com/${
                                        user.twitter
                                      }`}
                                      label={user.twitter}
                                    />
                                  </td>
                                  <td>{user.shares}</td>
                                  <td>
                                    ${parseFloat(user.balance).toFixed(2)}
                                  </td>
                                </TableRow>
                              );
                            })}
                          </tbody>
                        </Table>
                      </div>
                    )}
                  </Box>
                  <Footer align="center" justify="center" pad="medium">
                    <RCPagination
                      style={{ color: "white" }}
                      onChange={newPage => this.setNewPage(newPage)}
                      defaultCurrent={1}
                      pageSize={25}
                      current={this.state.currentPage}
                      total={this.state.total}
                    />
                  </Footer>
                </Tab>
              </Tabs>
            </Section>
            {this.state.userDeleted === true && (
              <Toast status="ok" onClose={() => this.toggleUserDeleted()}>
                The user has been deleted.
              </Toast>
            )}
          </MainContent>
        </FullSection>
      </MainBox>
    );
  }

  _deleteUser = async function(id) {
    var id = parseInt(id);
    await this.props
      .deleteUser({
        variables: {
          id
        }
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error);
        this.setState({ errors });
      });
    if (this.state.errors) {
      {
        this.state.errors.map(error =>
          this.setState({ [error.field]: error.message })
        );
      }
    }
    if (!this.state.errors) {
      const axiosGitHubGraphQLAuth = axios.create({
        baseURL: `${
          process.env.NODE_ENV === "development"
            ? "https://personly-api.herokuapp.com/graphql"
            : "https://api.jamesg.app/graphql"
        }`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        }
      });
      const DELETE_UPDATE_QUERY = `{ getUsers(public: true) { id name shares twitter bio balance work_badge friend_badge } }`;
      axiosGitHubGraphQLAuth
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: DELETE_UPDATE_QUERY }
        )
        .then(result => {
          this.setState({
            users: result.data.data.getUsers
          });
        })
        .catch(error => {
          this.setState({
            users: []
          });
        });
      this.toggleUserDeleted();
    }
  };
}

const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export default compose(graphql(DELETE_USER, { name: "deleteUser" }))(
  AdminContainer
);
