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
import Tiles from "grommet/components/Tiles";
import Tile from "grommet/components/Tile";
import Card from "grommet/components/Card";
import axios from "axios";
import { reduxForm } from "redux-form";
import { MainBox, FullSection } from "./styles";
import { Divider, LoadingIndicator } from "components";
import { Navbar, AppFooter } from "components";
import styles from "./index.module.scss";

class PeopleListContainer extends Component {
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
            ? "https://personly-api.herokuapp.com/graphql"
            : "https://api.jamesg.app/graphql"
        }`
      });

      const MAIN_QUERY =
        "{ getUsers(public: true) { id name shares_issued bio profile_picture } }";

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
            getData: true,
            isLoading: false
          });
        });
    }

    if (this.state.isLoading === true) {
      return <div />;
    }

    return (
      <div>
        <Box className={styles.container}>
          <Section align="center" justify="center">
            <br />
            <Title tag="h2">
              People raising right now
            </Title>
            <Paragraph>
              All people raising are thoroughly vetted and approved.
            </Paragraph>
            <Divider />
            {this.state.users.length === 0 && (
              <Title align="center" tag="h3">
                No users are publicly traded yet.
              </Title>
            )}
            {this.state.users.length > 0 && (
              <Tiles flush={false}>
                {this.state.users.map(user => {
                  return (
                    <Tile>
                      <Card
                        thumbnail={user.profile_picture}
                        heading={user.name}
                        label={`${user.shares_issued} shares available`}
                        description={`${user.bio.substring(0,149)}...`}
                        link={<Anchor href={`/person/${user.id}`}
                          label='Learn more' />}
                      />
                    </Tile>
                  );
                })}
              </Tiles>
            )}
          </Section>
        </Box>
      </div>
    );
  }
}
export default PeopleListContainer;
