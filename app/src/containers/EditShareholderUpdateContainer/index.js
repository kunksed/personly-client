import React, { Component } from "react";
import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";
import Section from "grommet/components/Section";
import FormField from "grommet/components/FormField";
import Footer from "grommet/components/Footer";
import Button from "grommet/components/Button";
import Menu from "grommet/components/Menu";
import { graphql, compose } from "react-apollo";
import Toast from "grommet/components/Toast";
import DateTime from "grommet/components/DateTime";
import EditIcon from "grommet/components/icons/base/Edit";
import axios from "axios";
import gql from "graphql-tag";
import styles from "./index.module.scss";
import { SettingsSidebar } from "components";
import { FullSection, MainContent, MainBox } from "./styles";
import { LoadingIndicator } from "components";
import { NotFoundContainer } from "containers";
import { Navbar, AppFooter } from "components";
import regeneratorRuntime from "regenerator-runtime";

class EditShareholderUpdateContainer extends Component {
  constructor() {
    super();
    this.state = {
      updateUpdateToast: false,
      load_default: false,
      getData: false,
      currentUser: "None"
    };
  }

  toggleShareholderUpdateUpdate() {
    this.setState({
      updateUpdateToast: !this.state.updateUpdateToast
    });
  }

  componentDidMount() {
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

      const MAIN_QUERY = `{ getCurrentUser { id name is_public profile_picture } }`;

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
            currentUser: result.data.data.getCurrentUser[0],
            getData: true
          });
        });

      const QUESTION_QUERY = `{ getUpdates(id: ${parseInt(
        this.props.props.params.id
      )}) { id title description created_on } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://personly-api.herokuapp.com/graphql"
          }`,
          {
            query: QUESTION_QUERY
          }
        )
        .then(result => {
          this.setState({
            update: result.data.data.getUpdates[0],
            title: result.data.data.getUpdates[0].title,
            description: result.data.data.getUpdates[0].description,
            getData: true
          });
        });
    }
  }

  render() {
    if (!this.state.currentUser) {
      return <div />;
    }
    if (!this.state.update) {
      return <div />;
    }

    if (this.state.update.length === 0) {
      return (
        <div>
          <NotFoundContainer />
        </div>
      );
    }

    if (this.state.currentUser.is_public === false) {
      window.location.replace("/");
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
                Update Shareholder Update
              </Heading>
              <Section
                pad={{ vertical: "medium" }}
                align="center"
                justify="center"
              >
                <Box size="medium" align="center">
                  <FormField
                    label="Title *"
                    htmlFor="title"
                    className={styles.formField}
                    error={this.state.title_field ? this.state.title_field : ""}
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
                </Box>
              </Section>
              <Section
                pad={{ vertical: "medium" }}
                align="center"
                justify="center"
              >
                <Box size="medium" align="center">
                  <FormField
                    label="Update Description *"
                    htmlFor="description"
                    className={styles.formField}
                    error={
                      this.state.description_field
                        ? this.state.description_field
                        : ""
                    }
                  >
                    <textarea
                      required
                      rows="15"
                      id="description"
                      name="description"
                      value={this.state.description}
                      type="text"
                      onChange={e =>
                        this.setState({ description: e.target.value })
                      }
                      className={styles.input}
                    />
                  </FormField>
                </Box>
              </Section>
              <Footer align="center" justify="center">
                <Menu inline direction="row" responsive={false}>
                  <Button
                    label="Update"
                    style={{ marginTop: 10, marginLeft: 5 }}
                    onClick={() => {
                      this._updateShareholderUpdate();
                    }}
                    icon={<EditIcon />}
                  />
                </Menu>
              </Footer>
              {this.state.updateUpdateToast === true && (
                <Toast
                  status="ok"
                  onClose={() => window.location.replace("/dashboard")}
                >
                  This shareholder update has been edited.
                </Toast>
              )}
            </MainContent>
          </FullSection>
        </MainBox>
      </div>
    );
  }

  _updateShareholderUpdate = async function() {
    const { title, description } = this.state;
    const id = parseInt(this.props.props.params.id);
    this.setState({
      title_field: "",
      description_field: "",
      closes_field: "",
      errors: ""
    });
    await this.props
      .updateShareholderUpdate({
        variables: {
          id,
          title,
          description,
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
      this.toggleShareholderUpdateUpdate();
    }
  };
}

const UPDATE_SHAREHOLDER_UPDATE = gql`
  mutation UpdateShareholderUpdate(
    $id: Int!
    $title: String!
    $description: String!
  ) {
    updateShareholderUpdate(id: $id, title: $title, description: $description) {
      id
    }
  }
`;

export default compose(
  graphql(UPDATE_SHAREHOLDER_UPDATE, { name: "updateShareholderUpdate" })
)(EditShareholderUpdateContainer);
