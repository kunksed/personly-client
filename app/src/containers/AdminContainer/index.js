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

      const MAIN_QUERY = `{ getUsers { id name shares twitter bio balance work_badge friend_badge } }`;

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
            total: result.data.data.getUsers.length,
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

  toggleBadgeUpdatedLayer(user) {
    this.setState({
      badgeGrantedLayer: !this.state.badgeGrantedLayer,
      work_badge: user.work_badge,
      friend_badge: user.friend_badge,
      user: user
    });
  }

  toggleBadgeUpdated() {
    this.setState({
      badgeGranted: !this.state.badgeGranted
    });
  }

  toggleUpdateCreated() {
    this.setState({
      updateCreated: !this.state.updateCreated
    });
  }

  toggleUpdateDeleted() {
    this.setState({
      updateDeleted: !this.state.updateDeleted
    });
  }

  toggleCreateUpdate(update) {
    this.setState({
      createUpdate: !this.state.createUpdate,
      update: update
    });
  }

  toggleTransferShares() {
    this.setState({
      sharesTransfered: !this.state.sharesTransfered
    });
  }

  render() {
    if (!this.state.currentUser) {
      return (
        <div />
      );
    }
    if (!this.state.users) {
      return (
        <div />
      );
    }

    if (!this.state.jamesgFunds) {
      return (
        <div />
      );
    }

    if (this.state.currentUser === "None") {
      window.location.replace("/login");
    }
    if (this.state.currentUser.role !== "Admin") {
      window.location.replace("/login");
    }

    var totalBalance = parseFloat(0);

    for (var item, i = 0; (item = this.state.users[i++]); ) {
      var totalBalance = parseFloat(totalBalance) + parseFloat(item.balance);
    }

    var totalShares = parseFloat(0);

    for (var item, i = 0; (item = this.state.users[i++]); ) {
      var totalShares = parseFloat(totalShares) + parseFloat(item.shares);
    }

    var jamesgFunds = this.state.jamesgFunds.balance;

    var totalFunds = parseFloat(totalBalance) - parseFloat(jamesgFunds);

    return (
      <div>
        <Navbar pathname={this.props.props.pathname} />
      <Box className={styles.container}>
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
                    Total shares issued: {totalShares}
                    <br />
                    Total funds in the system: ${totalBalance.toFixed(2)}
                    <br />
                    JamesG-controlled funds: ${jamesgFunds}
                    <br />
                    Total user-controlled funds: ${totalFunds.toFixed(2)}
                    <br />
                  </Paragraph>
                </Box>
                <Box align="center" pad="large">
                  <Paragraph>
                    <Anchor label="View user leaderboard" href="/leaderboard" />
                    <br />
                    <Anchor label="View user directory" href="/users" />
                    <br />
                    <Anchor label="Create question" href="/new" />
                    <br />
                    <Anchor label="Create update" onClick={() => this.toggleCreateUpdate()} />
                    <br />
                    <Anchor
                      label="View gender information"
                      href="/admin/gender"
                    />
                    <br />
                  </Paragraph>
                </Box>
              </Box>
            </Tab>
            <Tab title="Transfer Shares">
              <Box className={styles.tableItem}>
                <Heading tag="h3">Transfer Shares</Heading>
                <Box direction="row">
                  <FormField
                    label="Share Amount *"
                    htmlFor="share_amount"
                    className={styles.formField}
                    error={
                      this.state.share_amount_field
                        ? this.state.share_amount_field
                        : ""
                    }
                  >
                    <input
                      required
                      id="share_amount"
                      name="share_amount"
                      type="text"
                      onChange={e =>
                        this.setState({ share_amount: e.target.value })
                      }
                      className={styles.input}
                    />
                  </FormField>
                  <FormField
                    label="User *"
                    htmlFor="user_id"
                    className={styles.formField}
                    style={{ marginLeft: 5 }}
                    error={
                      this.state.user_id_field ? this.state.user_id_field : ""
                    }
                  >
                    <input
                      required
                      id="user_id"
                      name="user_id"
                      type="text"
                      onChange={e => this.setState({ user_id: e.target.value })}
                      className={styles.input}
                    />
                  </FormField>
                  <Button
                    label="Save"
                    primary
                    style={{ marginLeft: 5 }}
                    onClick={() => {
                      this._transferShares();
                    }}
                  />
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
                          <th>Shares</th>
                          <th>Balance</th>
                          <th>Badges</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.users.map(user => {
                          return (
                            <TableRow>
                              <td>
                                <Anchor
                                  href={`/profile/${user.id}`}
                                  label={`${user.name} ${
                                    user.work_badge == true ? "💼" : ""
                                  } ${user.friend_badge == true ? "🙌" : ""}`}
                                />
                              </td>
                              <td>
                                <Anchor
                                  href={`https://twitter.com/${user.twitter}`}
                                  label={user.twitter}
                                />
                              </td>
                              <td>{user.shares}</td>
                              <td>${parseFloat(user.balance).toFixed(2)}</td>
                              <td>
                                <Anchor
                                  onClick={() => {
                                    this.toggleBadgeUpdatedLayer(user);
                                  }}
                                  label="Edit"
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
            <Tab title="Updates">
              <Box pad="large" className={styles.tableItem}>
                <Heading tag="h2" align="center">
                  Updates
                </Heading>
                {this.state.updates.length === 0 && (
                  <Paragraph>No updates have been posted.</Paragraph>
                )}
                {this.state.updates && (
                  <div>
                    <Table>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>URL</th>
                          <th>Created</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.updates.map(update => {
                          return (
                            <TableRow>
                              <td>{update.title}</td>
                              <td>
                                <Anchor
                                  href={`${update.url}`}
                                  label={update.url}
                                />
                              </td>
                              <td>{update.created_on}</td>
                              <td>
                                <Anchor
                                  onClick={() => {
                                    this._deleteUpdate(update.id);
                                  }}
                                  label="Delete"
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
        {this.state.createUpdate === true && (
          <Layer
            closer={true}
            flush={true}
            overlayClose={true}
            onClose={() => this.toggleCreateUpdate(this.state.user)}
          >
            <Box pad="large">
              <Heading tag="h2">Create update</Heading>
              <Section
                pad={{ vertical: 'medium' }}
                align="center"
                justify="center"
              >
              <FormField
                label="Title *"
                htmlFor="title"
                className={styles.formField}
                error={this.state.title_field ? this.state.title_field : ''}
              >
                <input
                  required
                  id="title"
                  name="title"
                  placeholder="Update title"
                  value={this.state.title}
                  type="text"
                  onChange={e => this.setState({ title: e.target.value })}
                  className={styles.input}
                />
              </FormField>
              <FormField
                label="Update URL *"
                htmlFor="url"
                className={styles.formField}
                error={this.state.url_field ? this.state.url_field : ''}
              >
                <input
                  required
                  id="url"
                  name="url"
                  placeholder="https://medium.com"
                  value={this.state.url}
                  type="text"
                  onChange={e => this.setState({ url: e.target.value })}
                  className={styles.input}
                />
              </FormField>
              </Section>
              <br />
              <br />
              <Footer pad={{ vertical: "medium" }}>
                <Button
                  label="Create"
                  type="submit"
                  primary={true}
                  onClick={() => this._createUpdate()}
                />
              </Footer>
            </Box>
          </Layer>
        )}
        {this.state.badgeGrantedLayer === true && (
          <Layer
            closer={true}
            flush={true}
            overlayClose={true}
            onClose={() => this.toggleBadgeUpdatedLayer(this.state.user)}
          >
            <Box pad="large">
              <Heading tag="h2">Update {this.state.user.name}'s badges</Heading>
              <br />
              <CheckBox
                label="Work badge"
                checked={this.state.work_badge ? true : false}
                onClick={() =>
                  this.setState({ work_badge: !this.state.work_badge })
                }
              />
              <CheckBox
                label="Friend badge"
                checked={this.state.friend_badge ? true : false}
                onClick={() =>
                  this.setState({ friend_badge: !this.state.friend_badge })
                }
              />
              <br />
              <Footer pad={{ vertical: "medium" }}>
                <Button
                  label="Update"
                  type="submit"
                  primary={true}
                  onClick={() => this._grantBadge(this.state.user.id)}
                />
              </Footer>
            </Box>
          </Layer>
        )}
        {this.state.badgeGranted === true && (
          <Toast status="ok" onClose={() => this.toggleBadgeUpdated()}>
            The badges for this user have been updated.
          </Toast>
        )}
        {this.state.updateCreated === true && (
          <Toast status="ok" onClose={() => this.toggleUpdateCreated()}>
            The update has been created.
          </Toast>
        )}
        {this.state.updateDeleted === true && (
          <Toast status="ok" onClose={() => this.toggleUpdateDeleted()}>
            The update has been deleted.
          </Toast>
        )}
        {this.state.sharesTransfered === true && (
          <Toast status="ok" onClose={() => this.toggleTransferShares()}>
            The share transfer has been completed.
          </Toast>
        )}
      </Box>
      <AppFooter />
    </div>
    );
  }
  _grantBadge = async function(id) {
    const user_id = parseInt(id);
    const { work_badge, friend_badge } = this.state;
    this.setState({
      user_id_field: "",
      share_amount_field: "",
      errors: ""
    });
    await this.props
      .grantBadge({
        variables: {
          user_id,
          work_badge,
          friend_badge
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
      const USERS_QUERY = `{ getUsers { id name shares twitter bio balance work_badge friend_badge } }`;
      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: USERS_QUERY }
        )
        .then(result => {
          this.setState({
            users: result.data.data.getUsers,
            total: result.data.data.getUsers.length,
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
      this.toggleBadgeUpdated();
    }
  };
  _transferShares = async function() {
    const { user_id } = this.state;
    const share_amount = parseInt(this.state.share_amount);
    this.setState({
      user_id_field: "",
      share_amount_field: "",
      errors: ""
    });
    await this.props
      .transferShares({
        variables: {
          user_id,
          share_amount
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
      this.toggleTransferShares();
    }
  };
  _createUpdate = async function() {
    const { title, url } = this.state;
    this.setState({
      title_field: "",
      url_field: "",
      errors: ""
    });
    await this.props
      .createUpdate({
        variables: {
          title,
          url
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
``
    const CREATE_UPDATE_QUERY = `{ getUpdates { id title url created_on } }`;
    axiosGitHubGraphQLAuth
      .post(
        `${
          process.env.NODE_ENV === "development"
            ? "https://personly-api.herokuapp.com/graphql"
            : "https://api.jamesg.app/graphql"
        }`,
        { query: CREATE_UPDATE_QUERY }
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
      this.toggleUpdateCreated();
      this.toggleCreateUpdate();
    }
  };
  _deleteUpdate = async function(id) {
    var id = parseInt(id);
    await this.props
      .deleteUpdate({
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
    const DELETE_UPDATE_QUERY = `{ getUpdates { id title url created_on } }`;
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
      this.toggleUpdateDeleted();
    }
  };
}
const GRANT_BADGES = gql`
  mutation GrantBadge(
    $user_id: Int!
    $work_badge: Boolean!
    $friend_badge: Boolean!
  ) {
    grantBadge(
      user_id: $user_id
      work_badge: $work_badge
      friend_badge: $friend_badge
    ) {
      id
    }
  }
`;
const TRANSFER_SHARES = gql`
  mutation TransferShares($user_id: String, $share_amount: Int) {
    transferShares(user_id: $user_id, share_amount: $share_amount) {
      id
    }
  }
`;
const CREATE_UPDATE = gql`
  mutation CreateUpdate($title: String, $url: String) {
    createUpdate(title: $title, url: $url) {
      id
    }
  }
`;
const DELETE_UPDATE = gql`
  mutation DeleteUpdate($id: Int!) {
    deleteUpdate(id: $id) {
      id
    }
  }
`;
export default compose(
  graphql(GRANT_BADGES, { name: "grantBadge" }),
  graphql(TRANSFER_SHARES, { name: "transferShares" }),
  graphql(CREATE_UPDATE, { name: "createUpdate" }),
  graphql(DELETE_UPDATE, { name: "deleteUpdate" })
)(AdminContainer);
