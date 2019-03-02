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
import axios from "axios";
import { reduxForm } from "redux-form";
import { MainBox, FullSection } from "./styles";
import { Divider, LoadingIndicator } from "components";
import { Navbar, AppFooter } from "components";
import styles from "./index.module.scss";

class UpdatesContainer extends Component {
  constructor() {
    super();
    this.state = {
      getData: false,
      votes: [],
      updates: null,
      isLoading: true
    };
  }
  render() {
    if (this.state.getData === false) {
      const axiosGitHubGraphQL = axios.create({
        baseURL: `${
          process.env.NODE_ENV === "development"
            ? "https://jamesg-test.herokuapp.com/graphql"
            : "https://api.jamesg.app/graphql"
        }`
      });

      const MAIN_QUERY =
        "{ getUpdates(limit: 100) { id title url created_on } }";

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://jamesg-test.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: MAIN_QUERY }
        )
        .then(result => {
          this.setState({
            updates: result.data.data.getUpdates,
            getData: true,
            isLoading: false
          });
        });
    }

    if (this.state.isLoading === true) {
      return (
        <div />
      );
    }

    return (
      <div>
        <Navbar pathname={this.props.props.pathname} />
      <Box className={styles.container}>
        <Section align="center" justify="center">
          <Title align="center" tag="h1">
            Updates
          </Title>
          <Paragraph>
            Frequent shareholder updates are posted in order to track the life
            of James, and provide insights into the progress of decisions made.
          </Paragraph>
          <Divider />
          {this.state.updates.length === 0 && (
            <Title align="center" tag="h3">
              No updates have been posted yet.
            </Title>
          )}
          {this.state.updates.length > 0 && (
            <div>
              {this.state.updates.map(update => {
                return (
                  <Box align="center">
                    <Timestamp value={update.created_on} fields="date" />
                    <div>
                      <Heading tag="h3">
                        {update.title}
                      </Heading>
                    </div>
                    <Anchor href={`${update.url}`}>
                      Read more
                    </Anchor>
                  </Box>
                );
              })}
            </div>
          )}
        </Section>
      </Box>
      <AppFooter />
    </div>
    );
  }
}
export default UpdatesContainer;
