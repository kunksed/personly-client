import React, { Component } from "react";
import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";
import Section from "grommet/components/Section";
import FormField from "grommet/components/FormField";
import Footer from "grommet/components/Footer";
import Select from "grommet/components/Select";
import CheckmarkIcon from "grommet/components/icons/base/Checkmark";
import Button from "grommet/components/Button";
import Menu from "grommet/components/Menu";
import Toast from "grommet/components/Toast";
import { graphql, compose } from "react-apollo";
import axios from "axios";
import gql from "graphql-tag";
import styles from "./index.module.scss";
import { FullSection, MainContent, MainBox } from "./styles";
import { Divider, LoadingIndicator, SettingsSidebar } from "components";
import { Navbar, AppFooter } from "components";
import regeneratorRuntime from "regenerator-runtime";

class UpdateListingContainer extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      updateListingToast: false,
      load_default: false,
      getData: false,
      getSecondData: false,
      currentUser: "None",
      isLoading: true
    };
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
            : "https://api.jamesg.app/graphql"
        }`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        }
      });

      const MAIN_QUERY = `{ getCurrentUser { id name role email profile_picture is_public listing_description header_image_url } }`;

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
            currentUser: result.data.data.getCurrentUser[0],
            name: result.data.data.getCurrentUser[0].name,
            listing_description: result.data.data.getCurrentUser[0].listing_description,
            header_image_url: result.data.data.getCurrentUser[0].header_image_url,
            getSecondData: true,
            getData: true,
            isLoading: false
          });
        })
        .catch(result => {
          this.setState({
            currentUser: "None",
            getData: true,
            isLoading: false
          });
        });
    }
  }

  toggleUpdateListing() {
    this.setState({
      updateListingToast: !this.state.updateListingToast
    });
  }

  toggleUpdatePassword() {
    this.setState({
      updatePasswordToast: !this.state.updatePasswordToast
    });
  }

  toggleRegenerateAPIKey() {
    this.setState({
      regenerateAPIKeyToast: !this.state.regenerateAPIKeyToast
    });
  }

  render() {
    if (this.state.isLoading === true) {
      return <div />;
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
                Edit IPO Listing
              </Heading>
              <Section
                pad={{ vertical: "medium" }}
                align="center"
                justify="center"
              >
                <Box size="medium" align="center">
                  <FormField
                    label="Header Image URL *"
                    htmlFor="name"
                    className={styles.formField}
                    error={this.state.header_image_url_field ? this.state.header_image_url_field : ""}
                  >
                    <input
                      required
                      id="header_image_url"
                      name="header_image_url"
                      value={this.state.header_image_url}
                      type="text"
                      onChange={e => this.setState({ header_image_url: e.target.value })}
                      className={styles.input}
                    />
                  </FormField>
                </Box>
              </Section>
              <Section
                pad={{ vertical: 'medium' }}
                align="center"
                justify="center"
              >
                <Box size="medium" align="center">
                  <FormField
                    label="Listing Description *"
                    htmlFor="listing_description"
                    className={styles.formField}
                    error={
                      this.state.listing_description_field
                        ? this.state.listing_description_field
                        : ''
                    }
                  >
                    <textarea
                      required
                      rows="15"
                      id="listing_description"
                      name="listing_description"
                      type="text"
                      value={this.state.listing_description}
                      onChange={e =>
                        this.setState({ listing_description: e.target.value })
                      }
                      className={styles.input}
                    />
                  </FormField>
                </Box>
              </Section>
              <Footer align="center" justify="center">
                <Menu inline direction="row" responsive={false}>
                  <Button
                    label="Save"
                    primary
                    style={{ marginTop: 10, marginLeft: 5 }}
                    onClick={() => {
                      this._updateListing();
                    }}
                    icon={<CheckmarkIcon />}
                  />
                </Menu>
              </Footer>
              {this.state.updateListingToast === true && (
                <Toast status="ok" onClose={() => this.toggleUpdateListing()}>
                  Your listing has been updated.
                </Toast>
              )}
            </MainContent>
          </FullSection>
        </MainBox>
      </div>
    );
  }

  _updateListing = async function() {
    const {
      listing_description,
      header_image_url
    } = this.state;
    this.setState({
      listing_description_field: "",
      header_image_url_field: "",
    });
    await this.props
      .updateListing({
        variables: {
          listing_description,
          header_image_url
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
      this.toggleUpdateListing();
    }
  };
}

const UPDATE_LISTING = gql`
  mutation UpdateListing(
    $listing_description: String
    $header_image_url: String
  ) {
    updateListing(
      listing_description: $listing_description
      header_image_url: $header_image_url
    ) {
      id
    }
  }
`;

export default compose(
  graphql(UPDATE_LISTING, { name: "updateListing" }),
)(UpdateListingContainer);
