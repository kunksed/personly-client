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

class CreateQuestionContainer extends Component {
  constructor() {
    super();
    this.state = {
      createQuestionToast: false,
      load_default: false,
      getData: false,
      currentUser: "None",
    };
  }

  toggleCreateQuestion() {
    this.setState({
      createQuestionToast: !this.state.createQuestionToast,
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
                Create Question
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
                    label="Vote closes *"
                    htmlFor="closes"
                    className={styles.formField}
                    error={
                      this.state.closes_field ? this.state.closes_field : ''
                    }
                  >
                    <DateTime
                      required
                      id="closes"
                      name="closes"
                      type="text"
                      value={this.state.closes}
                      onChange={e => this.setState({ closes: e })}
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
                    label="Description *"
                    htmlFor="description"
                    className={styles.formField}
                    error={
                      this.state.description_field
                        ? this.state.description_field
                        : ''
                    }
                  >
                    <textarea
                      required
                      rows="10"
                      id="description"
                      name="description"
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
              {this.state.createQuestionToast === true && (
                <Toast
                  status="ok"
                  onClose={() => window.location.replace('/questions')}
                >
                  This question has been created.
                </Toast>
              )}
            </MainContent>
          </FullSection>
        </MainBox>
      </div>
    );
  }

  _createQuestion = async function() {
    const { title, description, closes } = this.state;
    this.setState({
      title_field: '',
      description_field: '',
      closes_field: '',
      errors: '',
    });
    await this.props
      .createQuestion({
        variables: {
          title,
          description,
          closes,
        },
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
      this.toggleCreateQuestion();
    }
  };
}

const CREATE_QUESTION = gql`
  mutation CreateQuestion(
    $title: String!
    $description: String!
    $closes: String!
  ) {
    createQuestion(title: $title, description: $description, closes: $closes) {
      id
    }
  }
`;

export default compose(graphql(CREATE_QUESTION, { name: 'createQuestion' }))(
  CreateQuestionContainer,
);
