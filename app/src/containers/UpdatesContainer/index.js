import React, { Component } from "react";
import Box from "grommet/components/Box";
import Section from "grommet/components/Section";
import Status from "grommet/components/icons/Status";
import Heading from "grommet/components/Heading";
import Anchor from "grommet/components/Anchor";
import Title from "grommet/components/Title";
import Image from "grommet/components/Image";
import Hero from "grommet/components/Hero";
import Timestamp from "grommet/components/Timestamp";
import Paragraph from "grommet/components/Paragraph";
import FormField from "grommet/components/FormField";
import FormFields from "grommet/components/FormFields";
import Button from "grommet/components/Button";
import Header from "grommet/components/Header";
import Columns from "grommet/components/Columns";
import Select from "grommet/components/Select";
import Footer from "grommet/components/Footer";
import Menu from "grommet/components/Menu";
import Layer from "grommet/components/Layer";
import CheckmarkIcon from "grommet/components/icons/base/Checkmark";
import { graphql, compose } from "react-apollo";
import regeneratorRuntime from "regenerator-runtime";
import gql from "graphql-tag";
import axios from "axios";
import { reduxForm } from "redux-form";
import { MainContent } from "./styles";
import { Navbar, AppFooter } from "components";
import { NotFoundContainer } from "containers";
import { Divider, LoadingIndicator, QuestionList } from "components";
import styles from "./index.module.scss";

class UpdatesContainer extends Component {
  constructor() {
    super();
    this.state = {
      getData: false,
      update: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    if (this.state.getData === false) {
      const axiosGitHubGraphQL = axios.create({
        baseURL: `${
          process.env.NODE_ENV === "development"
            ? "https://personly-api.herokuapp.com/graphql"
            : "https://api.jamesg.app/graphql"
        }`
      });

      const UPDATES_QUERY = `{ getUpdates(id: ${
        this.props.props.params.id
      }) { id user { id name } title description created_on } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: UPDATES_QUERY }
        )
        .then(result => {
          this.setState({
            update: result.data.data.getUpdates[0]
          });
        })
        .catch(result => {
          this.setState({
            not_found: true
          });
        });

    }
  }

  render() {
    if (this.state.isLoading === true) {
      return <div />;
    }

    if (this.state.not_found === true) {
      return (
        <div>
          <NotFoundContainer />
        </div>
      );
    }

    return (
      <div>
        <Box className={styles.container}>
          <Hero
            justify="center"
            align="center"
            backgroundColorIndex="dark"
            background={
              <Image
                fit="cover"
                full={true}
                src="https://images.unsplash.com/photo-1543970256-c86ba45b0d9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
              />
            }
            size="small"
          >
            <Box direction="row" justify="center" align="center">
              <Box basis="1/2" align="end" pad="medium" />
              <Box basis="1/2" align="start" pad="medium">
                <Heading margin="none">{this.state.update.user.name}</Heading>
                <br />
                <Button
                  label="Invest"
                  href={`/people/${this.state.update.user.id}`}
                />
              </Box>
            </Box>
          </Hero>
          <Section align="center" justify="center">
          <MainContent
            align="center"
            justify="start"
            pad={{ vertical: "large" }}
          >
                <Title align="left" tag="h2">
                  {this.state.update.title}
                </Title>
                <Markdown content={this.state.update.description} />
              </MainContent>
            <Divider />
            <Title align="center" tag="h2">
              Comments
            </Title>
          </Section>
        </Box>
      </div>
    );
  }
}

export default compose(graphql(PLACE_ORDER, { name: "placeOrder" }))(
  UpdatesContainer
);
