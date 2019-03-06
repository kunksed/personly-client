import React, { Component } from "react";
import Box from "grommet/components/Box";
import Section from "grommet/components/Section";
import Status from "grommet/components/icons/Status";
import Heading from "grommet/components/Heading";
import Anchor from "grommet/components/Anchor";
import Title from "grommet/components/Title";
import Timestamp from "grommet/components/Timestamp";
import Paragraph from "grommet/components/Paragraph";
import Columns from "grommet/components/Columns";
import Footer from "grommet/components/Footer";
import Button from "grommet/components/Button";
import Tiles from "grommet/components/Tiles";
import Toast from "grommet/components/Toast";
import Tile from "grommet/components/Tile";
import FormField from "grommet/components/FormField";
import List from "grommet/components/List";
import ListItem from "grommet/components/ListItem";
import Table from "grommet/components/Table";
import TableRow from "grommet/components/TableRow";
import axios from "axios";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { reduxForm } from "redux-form";
import { MainBox, FullSection } from "./styles";
import { Divider, LoadingIndicator } from "components";
import { Navbar, AppFooter } from "components";
import styles from "./index.module.scss";
import regeneratorRuntime from "regenerator-runtime";

class NotificationsContainer extends Component {
  constructor() {
    super();
    this.state = {
      getData: false,
      notifications: [],
      isLoading: true,
    };
  }

  toggleReadNotifications() {
    this.setState({
      readNotificationsToast: !this.state.readNotificationsToast
    });
  }

  componentDidMount() {
    if (!localStorage.getItem("auth_token")) {
      window.location.replace("/login");
    }
    if (this.state.getData === false) {
      const axiosGitHubGraphQL = axios.create({
        baseURL: `${
          process.env.NODE_ENV === "development"
            ? "https://personly-api.herokuapp.com/graphql"
            : "https://personly-api.herokuapp.com/graphql"
        }`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        }
      });

      const MAIN_QUERY =
        "{ getNotifications { id title emoji url read } }";

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://personly-api.herokuapp.com/graphql"
          }`,
          { query: MAIN_QUERY }
        )
        .then(result => {
          this.setState({
            notifications: result.data.data.getNotifications,
            getData: true,
            isLoading: false
          });
        });
      this.props.readNotifications()
    }
  }
  render() {
    if (this.state.isLoading === true) {
      return <div />;
    }
    return (
      <div>
        <Box className={styles.container}>
          <Section>
            <br />
            <Heading tag="h2" strong={true}>
              Notifications
            </Heading>
            <Box align="center" justify="center" pad="large">
            {this.state.notifications.length > 0 && (
              <div>
                <List align="center" justify="center" pad="large">
                  {this.state.notifications.map((notification) => {
                    return (
                      <div>
                        {notification.read === false && (
                          <Box className={styles.cardStyled} pad="medium" colorIndex="light-2" justify='between' separator='horizontal'>
                            <span><Anchor href={notification.url} label={`${notification.emoji} ${notification.title}`}/></span>
                            <span className="secondary"><Timestamp value={notification.created_on} /></span>
                          </Box>
                        )}
                        {notification.read === true && (
                          <Box className={styles.cardStyled} pad="medium">
                            <span><Anchor href={notification.url} label={`${notification.emoji} - ${notification.title}`}/></span>
                            <span className="secondary"><Timestamp value={notification.created_on} /></span>
                          </Box>
                        )}
                        <br />
                      </div>
                    )
                  })}
                </List>
              </div>
            )}
            </Box>
            {this.state.notifications.length === 0 && (
              <Box pad="large">
                <Heading tag="h3" align="center" justify="center">
                  You do not have any notifications.
                </Heading>
                <Paragraph>
                  You'll get notifications when shareholder questions and updates are posted, dividends are issued, or for account-related updates.
                </Paragraph>
              </Box>
            )}
          </Section>
        </Box>
        {this.state.readNotificationsToast === true && (
          <Toast status="ok" onClose={() => this.toggleReadNotifications()}>
            Your notifications have been marked as read.
          </Toast>
        )}
      </div>
    );
  }
}

const READ_NOTIFICATIONS = gql`
  mutation ReadNotifications {
    readNotifications {
      id
    }
  }
`;


export default compose(
  graphql(READ_NOTIFICATIONS, { name: "readNotifications" })
)(NotificationsContainer);
