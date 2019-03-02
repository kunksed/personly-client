import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark';
import Button from 'grommet/components/Button';
import Menu from 'grommet/components/Menu';
import { graphql, compose } from 'react-apollo';
import Toast from 'grommet/components/Toast';
import DateTime from 'grommet/components/DateTime';
import axios from 'axios';
import gql from 'graphql-tag';
import styles from './index.module.scss';
import { FullSection, MainContent, MainBox } from './styles';
import { LoadingIndicator } from 'components';
import { Navbar, AppFooter } from "components";
import regeneratorRuntime from 'regenerator-runtime';

class EditQuestionContainer extends Component {
  constructor() {
    super();
    this.state = {
      updateQuestionToast: false,
      load_default: false,
      getData: false,
      question: '',
    };
  }

  toggleUpdateQuestion() {
    this.setState({
      updateQuestionToast: !this.state.updateQuestionToast,
    });
  }

  componentDidMount() {
    if (this.state.getData === false) {
      const axiosGitHubGraphQLAuth = axios.create({
        baseURL: `${process.env.NODE_ENV === 'development' ? process.env.API_URL : 'https://api.jamesg.app/graphql'}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      const USER_QUERY = `{ getCurrentUser { id name role email } }`;

      axiosGitHubGraphQLAuth
        .post(`${process.env.NODE_ENV === 'development' ? process.env.API_URL : 'https://api.jamesg.app/graphql'}`, {
          query: USER_QUERY,
        })
        .then(result => {
          this.setState({
            currentUser: result.data.data.getCurrentUser[0],
          });
        })
        .catch(result => {
          this.setState({
            currentUser: 'None',
          });
        });

      var axiosGitHubGraphQL = axios.create({
        baseURL: `${process.env.NODE_ENV === 'development' ? process.env.API_URL : 'https://api.jamesg.app/graphql'}`,
      });

      const MAIN_QUERY = `{ getQuestions(id: ${parseInt(
        this.props.props.params.id,
      )}) { id title created_on description approved closes } }`;

      axiosGitHubGraphQL
        .post(`${process.env.NODE_ENV === 'development' ? process.env.API_URL : 'https://api.jamesg.app/graphql'}`, {
          query: MAIN_QUERY,
        })
        .then(result => {
          this.setState({
            question: result.data.data.getQuestions[0],
            title: result.data.data.getQuestions[0].title,
            description: result.data.data.getQuestions[0].description,
            closes: Date.parse(result.data.data.getQuestions[0].closes),
            getData: true,
          });
        })
        .catch(error => {
          this.setState({ question: 'None', getData: true });
        });
    }
  }

  render() {
    if (!this.state.currentUser) {
      return (
        <div />
      );
    }
    if (!this.state.question) {
      return (
        <div />
      );
    }
    if (this.state.currentUser === 'None') {
      window.location.replace('/login');
    }
    if (this.state.question === 'None') {
      window.location.replace('/questions');
    }
    if (this.state.currentUser.role !== 'Admin') {
      window.location.replace('/login');
    }

    return (
      <div>
        <Navbar pathname={this.props.props.pathname} />
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
                Update Question
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
                      value={this.state.description}
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
                      this._updateQuestion();
                    }}
                    icon={<CheckmarkIcon />}
                  />
                </Menu>
              </Footer>
              {this.state.updateQuestionToast === true && (
                <Toast
                  status="ok"
                  onClose={() => window.location.replace('/questions')}
                >
                  This question has been updated.
                </Toast>
              )}
            </MainContent>
          </FullSection>
        </MainBox>
      </div>
      <AppFooter />
    </div>
    );
  }

  _updateQuestion = async function() {
    const { title, description, closes } = this.state;
    const id = this.state.props.params.id;
    this.setState({
      title_field: '',
      description_field: '',
      closes_field: '',
      errors: '',
    });
    await this.props
      .updateQuestion({
        variables: {
          id,
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
      this.toggleUpdateQuestion();
    }
  };
}

EditQuestionContainer.propTypes = {
  props: PropTypes.node.isRequired, // eslint-disable-line
  params: PropTypes.object.isRequired, // eslint-disable-line
  updateQuestion: PropTypes.object.isRequired, // eslint-disable-line
};

const UPDATE_QUESTION = gql`
  mutation UpdateQuestion(
    $id: Int!
    $title: String!
    $description: String!
    $closes: String!
  ) {
    updateQuestion(
      id: $id
      title: $title
      description: $description
      closes: $closes
    ) {
      id
    }
  }
`;

export default compose(graphql(UPDATE_QUESTION, { name: 'updateQuestion' }))(
  EditQuestionContainer,
);
