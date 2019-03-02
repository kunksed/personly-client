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
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark';
import axios from 'axios';
import gql from 'graphql-tag';
import styles from './index.module.scss';
import { FullSection, MainContent, MainBox } from './styles';
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

      const MAIN_QUERY = `{ getCurrentUser { id name role email } }`;

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

    if (this.state.currentUser.is_public === true) {
      window.location.replace('/');
    }

    return (
      <div>
        <MainBox
          alignContent="center"
          fill="horizontal"
          align="center"
          className={styles.container}
        >
          <FullSection primary direction="row">
            <MainContent
              align="center"
              justify="start"
              pad={{ vertical: 'large' }}
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
                </Box>
              </Section>
              <Footer align="center" justify="center">
                <Menu inline direction="row" responsive={false}>
                  <Button
                    label="Save"
                    primary
                    style={{ marginTop: 10, marginLeft: 5 }}
                    onClick={() => {
                      this._createQuestion();
                    }}
                    icon={<CheckmarkIcon />}
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
  mutation CreateUpdate($title: String, $url: String) {
    createUpdate(title: $title, url: $url) {
      id
    }
  }
`;

export default compose(graphql(CREATE_UPDATE, { name: 'createUpdate' }))(
  CreateUpdateContainer,
);
