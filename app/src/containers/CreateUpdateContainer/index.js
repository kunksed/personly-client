import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import Menu from 'grommet/components/Menu';
import { graphql, compose } from 'react-apollo';
import Toast from 'grommet/components/Toast';
import DateTime from 'grommet/components/DateTime';
import EditIcon from 'grommet/components/icons/base/Edit';
import axios from 'axios';
import gql from 'graphql-tag';
import styles from './index.module.scss';
import { SettingsSidebar } from "components";
import { FullSection, MainContent, MainBox } from "./styles";
import { LoadingIndicator } from 'components';
import { Navbar, AppFooter } from "components";
import regeneratorRuntime from 'regenerator-runtime';

class CreateUpdateContainer extends Component {
  constructor() {
    super();
    this.state = {
      createUpdateToast: false,
      load_default: false,
      getData: false,
    };
  }

  toggleCreateUpdate() {
    this.setState({
      createUpdateToast: !this.state.createUpdateToast,
    });
  }

  componentDidMount() {
    if (this.state.getData === false) {
      const axiosGitHubGraphQL = axios.create({
        baseURL: `${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      const MAIN_QUERY = `{ getCurrentUser { id name is_public profile_picture } }`;

      axiosGitHubGraphQL
        .post(`${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`, { query: MAIN_QUERY })
        .then(result => {
          this.setState({
            currentUser: result.data.data.getCurrentUser[0],
            getData: true,
          });
        })
    }
  }

  render() {
    if (!this.state.currentUser) {
      return (
        <div />
      );
    }

    if (this.state.currentUser === "None") {
      window.location.replace("/login");
    }

    if (this.state.currentUser.is_public === false) {
      window.location.replace('/');
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
                Create Update
              </Heading>
              <Section
                pad={{ vertical: 'medium' }}
                align="center"
                justify="center"
              >
                <Box size="medium" align="center">
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
                </Box>
              </Section>
              <Section
                pad={{ vertical: 'medium' }}
                align="center"
                justify="center"
              >
                <Box size="medium" align="center">
                  <FormField
                    label="Update Description *"
                    htmlFor="description"
                    className={styles.formField}
                    error={this.state.description_field ? this.state.description_field : ''}
                  >
                    <textarea
                      required
                      rows="15"
                      id="description"
                      name="description"
                      value={this.state.description}
                      type="text"
                      onChange={e => this.setState({ description: e.target.value })}
                      className={styles.input}
                    />
                  </FormField>
                </Box>
              </Section>
              <Footer align="center" justify="center">
                <Menu inline direction="row" responsive={false}>
                  <Button
                    label="Create"
                    style={{ marginTop: 10, marginLeft: 5 }}
                    onClick={() => {
                      this._createUpdate();
                    }}
                    icon={<EditIcon />}
                  />
                </Menu>
              </Footer>
              {this.state.createUpdateToast === true && (
                <Toast
                  status="ok"
                  onClose={() => window.location.replace('/dashboard')}
                >
                  This update has been created.
                </Toast>
              )}
            </MainContent>
          </FullSection>
        </MainBox>
      </div>
    );
  }

  _createUpdate = async function() {
    const { title, description } = this.state;
    this.setState({
      title_field: "",
      description_field: "",
      errors: ""
    });
    await this.props
      .createUpdate({
        variables: {
          title,
          description
        }
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
      this.toggleCreateUpdate();
    }
  };
}

const CREATE_UPDATE = gql`
  mutation CreateUpdate($title: String, $description: String) {
    createUpdate(title: $title, description: $description) {
      id
    }
  }
`;

export default compose(graphql(CREATE_UPDATE, { name: 'createUpdate' }))(
  CreateUpdateContainer,
);
