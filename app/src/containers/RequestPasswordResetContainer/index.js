import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Paragraph from 'grommet/components/Paragraph';
import Title from 'grommet/components/Title';
import Footer from 'grommet/components/Footer';
import Toast from 'grommet/components/Toast';
import Section from 'grommet/components/Section';
import regeneratorRuntime from 'regenerator-runtime';
import { graphql, compose } from 'react-apollo';
import styles from './index.module.scss';
import gql from 'graphql-tag';
import axios from 'axios';
import { Navbar, AppFooter } from "components";
import AUTH_TOKEN from '../../constants';

// eslint-disable-next-line react/prefer-stateless-function
class RequestPasswordResetContainer extends Component {
  constructor() {
    super();
    this.state = {
      loggedInToast: false,
      errorToast: false,
      token: "None"
    };
  }

  toggleResetToast() {
    this.setState({
      resetToast: !this.state.resetToast,
    });
  }

  togglePasswordResetToast() {
    this.setState({
      passwordResetToast: !this.state.passwordResetToast,
    });
  }

  toggleErrorToast() {
    this.setState({
      errorToast: !this.state.errorToast,
    });
  }

  componentDidMount() {
    if (localStorage.getItem('auth_token')) {
      window.location.replace('/questions');
    }
    if (this.props.location.query.token) {
      const axiosGitHubGraphQL = axios.create({
        baseURL: `${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`,
      });

      const MAIN_QUERY = `{ getPasswordToken(token: "${this.props.location.query.token}") { id password_reset } }`;

      axiosGitHubGraphQL
        .post(`${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : `${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`}`, { query: MAIN_QUERY })
        .then(result => {
          if (result.data.data.getPasswordToken.length == 1) {
            this.setState({ token: result.data.data.getPasswordToken })
          } else {
            this.setState({ token: "Empty" })
          }
        })
      }
  }

  _requestToken = async function() {
    const { email } = this.state;
    this.setState({ email_field: null, errors: null });
    const result = await this.props
      .forgotPassword({
        variables: {
          email,
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
      if (this.state.errors) {
        this.toggleErrorToast();
      }
    }
    if (!this.state.errors) {
      this.toggleResetToast();
    }
  };

  _resetPassword = async function() {
    const token = this.state.token[0].password_reset;
    const { password, password_confirmation } = this.state;
    this.setState({
      email_field: null,
      password_field: null,
      errors: null,
      password_confirmation_field: null,
    });
    const result = await this.props
      .resetPassword({
        variables: {
          token,
          password,
          password_confirmation
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
      if (this.state.errors) {
        this.toggleErrorToast();
      }
    }
    if (!this.state.errors) {
      this.togglePasswordResetToast();
    }
  };

  render() {
    return (
      <div>
        <Navbar pathname={this.props.props.pathname} />
      <Section
        primary
        pad={{ horizontal: 'large' }}
        align="center"
        justify="center"
        className={styles.login}
      >
        <Box
          size="large"
          className={styles.loginFormWrapper}
          align="center"
          pad={{ horizontal: 'small', vertical: 'small' }}
        >
          <Box className={styles.loginForm}>
            <Title tag="h1" strong align="center">
              Reset Password
            </Title>
            <br />
            {this.state.token === "Empty" && (
              <Paragraph>
                This token does not exist or has expired. Request a new token <Anchor href="/reset" label="here" />.
              </Paragraph>
            )}
            {this.state.token.length === 1 && (
              <div>
              <FormFields className={styles.formFields}>
              <FormField
                help="Enter a new password (include an uppercase character and number)"
                label="New Password *"
                htmlFor="passwordInput"
                className={styles.formField}
                error={
                  this.state.password_field ? this.state.password_field : ''
                }
              >
                <input
                  required
                  name="password"
                  id="passwordInput"
                  type="password"
                  onChange={e => this.setState({ password: e.target.value })}
                  className={styles.input}
                />
              </FormField>
              <FormField
                help="Enter your password again"
                label="Password Confirmation *"
                htmlFor="passwordInput"
                className={styles.formField}
                error={
                  this.state.password_confirmation_field
                    ? this.state.password_confirmation_field
                    : ''
                }
              >
                <input
                  required
                  name="password_confirmation"
                  id="password_confirmationInput"
                  type="password"
                  onChange={e =>
                    this.setState({ password_confirmation: e.target.value })
                  }
                  className={styles.input}
                />
              </FormField>
              </FormFields>
              <Footer pad={{ vertical: 'medium' }} align="center">
                <Button
                  fill
                  label="Login"
                  type="submit"
                  primary
                  onClick={() => this._resetPassword()}
                />
              </Footer>
              </div>
            )}
            {!this.props.location.query.token && (
              <div>
                <FormFields className={styles.formFields}>
                  <FormField
                    help="Enter the email you used to create your account"
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
                </FormFields>
                <Footer pad={{ vertical: 'medium' }} align="center">
                  <Button
                    fill
                    label="Reset"
                    type="submit"
                    primary
                    onClick={() => this._requestToken()}
                  />
                </Footer>
              </div>
            )}
            <Footer align="center" justify="center">
              <span>Know your password? &nbsp;</span>
              <Anchor path="/login">Login</Anchor>
            </Footer>
          </Box>
        </Box>
        {this.state.passwordResetToast === true && (
          <Toast
            status="ok"
            onClose={() => {
              window.location.replace('/login');
            }}
          >
            Your password has been reset.
          </Toast>
        )}
        {this.state.resetToast === true && (
          <Toast
            status="ok"
            onClose={() => {
              this.toggleResetToast();
            }}
          >
            A password reset token has been sent to your email address.
          </Toast>
        )}
      </Section>
      <AppFooter />
    </div>
    );
  }
}

RequestPasswordResetContainer.propTypes = {
  // isLoading: PropTypes.bool.isRequired,
};

const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      id
    }
  }
`;

const RESET_PASSWORD = gql`
  mutation ResetPassword(
    $token: String!
    $password: String!
    $password_confirmation: String!
  ) {
    resetPassword(
      token: $token
      password: $password
      password_confirmation: $password_confirmation
    ) {
      id
    }
  }
`;

export default compose(
  graphql(FORGOT_PASSWORD, { name: 'forgotPassword' }),
  graphql(RESET_PASSWORD, { name: 'resetPassword' }))(
  RequestPasswordResetContainer,
);
