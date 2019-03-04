import React, { Component } from "react";
import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";
import Paragraph from "grommet/components/Paragraph";
import Section from "grommet/components/Section";
import Toast from "grommet/components/Toast";
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
import { Divider } from "components";
import regeneratorRuntime from "regenerator-runtime";

class AdminContainer extends Component {
  constructor() {
    super();
    this.state = {
      getData: false,
      currentPage: 1,
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
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
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
            query: USER_QUERY,
          },
        )
        .then(result => {
          this.setState({
            currentUser: result.data.data.getCurrentUser[0],
          });
        });

      var axiosGitHubGraphQL = axios.create({
        baseURL: `${
          process.env.NODE_ENV === "development"
            ? "https://personly-api.herokuapp.com/graphql"
            : "https://api.jamesg.app/graphql"
        }`,
      });

      const MAIN_QUERY = `{ getUsers(public: false) { id name shares twitter bio balance is_public shares_issued } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: MAIN_QUERY },
        )
        .then(result => {
          this.setState({
            users: result.data.data.getUsers,
          });
        })
        .catch(error => {
          this.setState({
            users: [],
          });
        });

      const RAISING_USERS_QUERY = `{ getUsers(public: true) { id name shares twitter bio balance is_public shares_issued } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: RAISING_USERS_QUERY },
        )
        .then(result => {
          this.setState({
            public_users: result.data.data.getUsers,
          });
        })
        .catch(error => {
          this.setState({
            public_users: [],
          });
        });
    }
  }

  toggleUserDeleted() {
    this.setState({
      userDeleted: !this.state.userDeleted,
    });
  }

  toggleUpdateUserStatusLayer(user) {
    this.setState({
      userStatusLayer: !this.state.userStatusLayer,
      user: user,
      name: user.name,
      is_public: user.is_public,
      shares_issued: user.shares_issued,
    });
  }

  toggleUpdateUserStatusToast() {
    this.setState({
      userStatusToast: !this.state.userStatusToast,
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
      <MainBox alignContent='center' fill='horizontal' align='center'>
        <FullSection primary direction='row'>
          <MainContent
            align='center'
            justify='start'
            pad={{ vertical: "large" }}
          >
            <Section align='center' justify='center'>
              <Heading tag='h2'>Administration</Heading>
              <Divider />
              <Tabs>
                <Tab title='Statistics'>
                  <Box
                    direction='row'
                    justify='center'
                    className={styles.tableItem}
                  >
                    <Box align='center' pad='large'>
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
                <Tab title='Users'>
                  <Box pad='large' className={styles.tableItem}>
                    <Heading tag='h2' align='center'>
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
                              <th>Delete</th>
                              <th>Edit</th>
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
                                  <td>
                                    <Anchor
                                      onClick={() => this.deleteUser(user.id)}
                                      label='Delete'
                                    />
                                  </td>
                                  <td>
                                    <Anchor
                                      onClick={() =>
                                        this.toggleUpdateUserStatusLayer(user)
                                      }
                                      label='Edit'
                                    />
                                  </td>
                                </TableRow>
                              );
                            })}
                          </tbody>
                        </Table>
                      </div>
                    )}
                  </Box>
                  <Footer align='center' justify='center' pad='medium'>
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
                <Tab title='Publicly Traded Users'>
                  <Box pad='large' className={styles.tableItem}>
                    <Heading tag='h2' align='center'>
                      Publicly Traded Users
                    </Heading>
                    {this.state.public_users && (
                      <div>
                        <Table>
                          <thead>
                            <tr>
                              <th>User</th>
                              <th>Twitter</th>
                              <th>Shares</th>
                              <th>Balance</th>
                              <th>Shares Issued</th>
                              <th>Delete</th>
                              <th>Edit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.public_users.map(user => {
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
                                  <td>{user.shares_issued}</td>
                                  <td>
                                    <Anchor
                                      onClick={() => this.deleteUser(user.id)}
                                      label='Delete'
                                    />
                                  </td>
                                  <td>
                                    <Anchor
                                      onClick={() =>
                                        this.toggleUpdateUserStatusLayer(user)
                                      }
                                      label='Edit'
                                    />
                                  </td>
                                </TableRow>
                              );
                            })}
                          </tbody>
                        </Table>
                      </div>
                    )}
                  </Box>
                  <Footer align='center' justify='center' pad='medium'>
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
            {this.state.userStatusLayer === true && (
              <Layer
                closer={true}
                flush={true}
                overlayClose={true}
                onClose={() =>
                  this.toggleUpdateUserStatusLayer(this.state.user)
                }
              >
                <Box pad='large'>
                  <Heading tag='h2'>Update {this.state.user.name}</Heading>
                  <br />
                  <CheckBox
                    label='Publicly Traded'
                    checked={this.state.is_public ? true : false}
                    onClick={() =>
                      this.setState({ is_public: !this.state.is_public })
                    }
                  />
                  <br />
                  <FormField
                    label='Shares Issued *'
                    htmlFor='shares_issued'
                    className={styles.formField}
                    error={
                      this.state.shares_issued_field
                        ? this.state.shares_issued_field
                        : ""
                    }
                  >
                    <input
                      required
                      id='shares_issued'
                      name='shares_issued'
                      type='text'
                      onChange={e =>
                        this.setState({ shares_issued: e.target.value })
                      }
                      className={styles.input}
                    />
                  </FormField>
                  <br />
                  <FormField
                    label='Listing Description *'
                    htmlFor='listing_description'
                    className={styles.formField}
                    error={
                      this.state.listing_description_field
                        ? this.state.listing_description_field
                        : ""
                    }
                  >
                    <textarea
                      rows='15'
                      required
                      id='listing_description'
                      name='listing_description'
                      type='text'
                      onChange={e =>
                        this.setState({ listing_description: e.target.value })
                      }
                      className={styles.input}
                    />
                  </FormField>
                  <br />
                  <Footer pad={{ vertical: "medium" }}>
                    <Button
                      label='Update'
                      type='submit'
                      primary={true}
                      onClick={() => this._updateUserStatus(this.state.user.id)}
                    />
                  </Footer>
                </Box>
              </Layer>
            )}
            {this.state.userDeleted === true && (
              <Toast status='ok' onClose={() => this.toggleUserDeleted()}>
                The user has been deleted.
              </Toast>
            )}
            {this.state.userStatusToast === true && (
              <Toast
                status='ok'
                onClose={() => this.toggleUpdateUserStatusToast()}
              >
                The user has been updated.
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
          id,
        },
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error);
        this.setState({ errors });
      });
    if (this.state.errors) {
      {
        this.state.errors.map(error =>
          this.setState({ [error.field]: error.message }),
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
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      const DELETE_UPDATE_QUERY = `{ getUsers(public: true) { id name shares twitter bio balance is_public shares_issued } }`;

      axiosGitHubGraphQLAuth
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: DELETE_UPDATE_QUERY },
        )
        .then(result => {
          this.setState({
            users: result.data.data.getUsers,
          });
        })
        .catch(error => {
          this.setState({
            users: [],
          });
        });
      this.toggleUserDeleted();
    }
  };

  _updateUserStatus = async function(id) {
    var id = parseInt(id);
    var { is_public, listing_description } = this.state;
    var shares_issued = parseInt(this.state.shares_issued);
    this.setState({ user: [], name: "", is_public: false, shares_issued: 0 });
    await this.props
      .adminSetPublic({
        variables: {
          id,
          is_public,
          shares_issued,
        },
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error);
        this.setState({ errors });
      });
    if (this.state.errors) {
      {
        this.state.errors.map(error =>
          this.setState({ [error.field]: error.message }),
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
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      const ADMIN_PUBLIC_QUERY = `{ getUsers(public: true) { id name shares twitter bio balance is_public shares_issued } }`;

      axiosGitHubGraphQLAuth
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: ADMIN_PUBLIC_QUERY },
        )
        .then(result => {
          this.setState({
            users: result.data.data.getUsers,
          });
        })
        .catch(error => {
          this.setState({
            users: [],
          });
        });
      this.toggleUpdateUserStatusLayer();
      this.toggleUpdateUserStatusToast();
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

const ADMIN_SET_PUBLIC = gql`
  mutation AdminSetPublic(
    $id: Int!
    $is_public: Boolean!
    $shares_issued: Int!
    $listing_description: String!
  ) {
    adminSetPublic(
      id: $id
      is_public: $is_public
      shares_issued: $shares_issued
      listing_description: $listing_description
    ) {
      id
    }
  }
`;

export default compose(
  graphql(DELETE_USER, { name: "deleteUser" }),
  graphql(ADMIN_SET_PUBLIC, { name: "adminSetPublic" }),
)(AdminContainer);
