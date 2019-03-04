import React, { Component } from "react";
import Box from "grommet/components/Box";
import Section from "grommet/components/Section";
import Hero from "grommet/components/Hero";
import Heading from "grommet/components/Heading";
import Image from "grommet/components/Image";
import Timestamp from "grommet/components/Timestamp";
import Title from "grommet/components/Title";
import Anchor from "grommet/components/Anchor";
import Button from "grommet/components/Button";
import Status from "grommet/components/icons/Status";
import Columns from "grommet/components/Columns";
import FormField from "grommet/components/FormField";
import Footer from "grommet/components/Footer";
import Tiles from "grommet/components/Tiles";
import Tile from "grommet/components/Tile";
import Card from "grommet/components/Card";
import Highcharts from "highcharts/highstock";
import { MainBox, FullSection } from "./styles";
import { Navbar, AppFooter } from "components";
import { Divider, LoadingIndicator, LandingQuestionList } from "components";
import axios from "axios";
import styles from "./index.module.scss";

class LandingContainer extends Component {
  constructor() {
    super();
    this.state = {
      questions: 0,
      getData: false,
      isLoading: true
    };
  }

  componentDidMount() {
    const axiosGitHubGraphQL = axios.create({
      baseURL: `${
        process.env.NODE_ENV === "development"
          ? "https://personly-api.herokuapp.com/graphql"
          : "https://api.jamesg.app/graphql"
      }`
    });

    const MAIN_QUERY =
      "{ getUsers(public: true, limit: 6) { id name shares_issued bio profile_picture } }";

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

  render() {
    if (!this.state.users) {
      return <div />;
    }

    return (
      <div>
        <Box className={styles.container}>
          <Box full="horizontal">
            <Hero
              justify="center"
              align="center"
              backgroundColorIndex="dark"
              background={
                <Image
                  fit="cover"
                  full={true}
                  src="https://images.unsplash.com/photo-1483389127117-b6a2102724ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
                />
              }
            >
              <Box basis="1/2" align="left" justify="left" pad="medium">
                <Box align="left" justify="left" pad="large">
                  <Heading tag="h1" strong={true}>Invest in the future</Heading>
                  <Heading tag="h3">
                    Invest as little as $10 in the people you believe
                    <br /> in and earn a return if they succeed.
                  </Heading>
                  <br />
                  <Button
                    className={styles.registerButton}
                    href="/register"
                    label="Open Account"
                  />
                </Box>
              </Box>
              <Box basis="1/2" align="left" justify="left" pad="medium" />
            </Hero>
            <Box className={styles.containerMiddle}>
              <Section>
                <br />
                <Heading tag="h2" strong={true}>
                  People raising right now
                </Heading>
                <Heading tag="h3">
                  All people raising are thoroughly vetted and approved.
                </Heading>
                <Box align="center" justify="center">
                  {this.state.users.length === 0 && (
                    <Title align="center" tag="h3">
                      No users are publicly traded yet.
                    </Title>
                  )}
                  {this.state.users.length > 0 && (
                    <Tiles flush={false}>
                      {this.state.users.map(user => {
                        return (
                          <Tile className={styles.cardStyled}>
                            <Card
                              textSize="small"
                              thumbnail={user.profile_picture}
                              heading={user.name}
                              label={`${user.shares_issued} shares available`}
                              description={`${user.bio.substring(0, 149)}...`}
                              link={
                                <Anchor
                                  href={`/people/${user.id}`}
                                  label="Learn more"
                                />
                              }
                            />
                          </Tile>
                        );
                      })}
                    </Tiles>
                  )}
                </Box>
                <Footer pad={{ vertical: "medium" }} align="center" justify="center">
                  <Button label="View all raising" href="/people" />
                </Footer>
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
                  error={this.state.email_field ? this.state.email_field : ""}
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
                <Footer pad={{ vertical: "medium" }} align="center">
                  <Button fill label="Join" type="submit" />
                </Footer>
              </Box>
            </Section>
            <Hero
              justify="center"
              align="center"
              className={styles.whiteHero}
              size="small"
            >
              <Box direction="row" justify="center" align="center">
                <Box basis="1/2" align="center" pad="medium">
                  <Image src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/candidate_ubwv.svg" />
                </Box>
                <Box basis="1/2" align="start" pad="medium">
                  <Heading tag="h2" strong={true}>
                    Access the top talent
                  </Heading>
                  <Heading tag="h4">
                    Invest in people on a road to success and earn a return if
                    they succeed.
                  </Heading>
                </Box>
              </Box>
            </Hero>
            <Hero
              justify="center"
              align="center"
              className={styles.whiteHero}
              size="small"
            >
              <Box direction="row" justify="center" align="center">
                <Box basis="1/2" align="center" pad="medium">
                  <Heading tag="h2" strong={true}>
                    Help people make decisions
                  </Heading>
                  <Heading tag="h4">
                    Vote on key decisions in people's lives and help them <br />{" "}
                    become happier and more successful.
                  </Heading>
                  <Button href="/register" label="Become an investor" />
                </Box>
                <Box basis="1/2" align="center" pad="medium">
                  <Image src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/note_list_etto.svg" />
                </Box>
              </Box>
            </Hero>
            <Hero
              justify="center"
              align="center"
              backgroundColorIndex="dark"
              className={styles.bottomHero}
            >
              <Box basis="1/2" align="center" justify="center" pad="medium">
                <Box align="center" justify="center" pad="large">
                  <Heading align="center" tag="h1" strong={true}>
                    How does it work?
                  </Heading>
                  <Heading align="center" tag="h3">
                    Personly is a platform where individuals can become publcly
                    traded, just like companies do. People can raise money from
                    their friends and the public for their latest projects,
                    education, start a business etc, in exchange for giving
                    investors the ability to vote on decisions in their life.
                    <br />
                    <br />
                    If an individual succeeds, their share price will go up and
                    their shareholders will benefit, meaning that the interests
                    of both investors and publicly traded people are aligned.
                  </Heading>
                  <br />
                  <Button
                    className={styles.registerButton}
                    href="/for-people"
                    label="Learn more"
                  />
                </Box>
              </Box>
            </Hero>
          </Box>
        </Box>
      </div>
    );
  }
}

export default LandingContainer;
