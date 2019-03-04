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
import Tile from "grommet/components/Tile";
import FormField from "grommet/components/FormField";
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
        "{ getUsers(public: true, limit: 21) { id name shares_issued bio profile_picture } }";

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
          <Section>
            <br />
            <Heading tag="h2" strong={true}>
              People raising right now
            </Heading>
            <Heading tag="h3">
              All people raising are thoroughly vetted and approved.
            </Heading>
            <Box>
              {this.state.users.length === 0 && (
                <Title align="center" tag="h3">
                  No users are publicly traded yet.
                </Title>
              )}
              {this.state.users.length > 0 && (
                <Tiles flush={false}>
                  {this.state.users.map(user => {
                    return (
                      <Tile
                        className={styles.cardStyled}>
                        <Card
                          textSize="small"
                          thumbnail={user.profile_picture}
                          heading={user.name}
                          label={`${user.shares_issued} shares available`}
                          description={`${user.bio.substring(0,149)}...`}
                          link={<Anchor href={`/people/${user.id}`}
                            label='Learn more' />}
                        />
                      </Tile>
                    );
                  })}
                </Tiles>
              )}
            </Box>
          </Section>
        </Box>
        <Section align="center" className={styles.mailListStyles}>
          <Box>
            <Title tag="h4">
              Get emailed when a new person goes public.
            </Title>
            <FormField
              label="Email *"
              htmlFor="emailInput"
              className={styles.formField}
              error={this.state.email_field ? this.state.email_field : ''}
            >
              <input
                required
                id="emailInput"
                name="email"
                type="email"
                onChange={e => this.setState({ email: e.target.value })}
                className={styles.input}
              />
            </FormField>
            <Footer pad={{ vertical: 'medium' }} align="center">
              <Button
                fill
                label="Join"
                type="submit"
              />
            </Footer>
          </Box>
        </Section>
      </div>
    );
  }
}
export default PeopleListContainer;
