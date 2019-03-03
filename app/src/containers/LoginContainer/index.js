import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Title from 'grommet/components/Title';
import Footer from 'grommet/components/Footer';
import Toast from 'grommet/components/Toast';
import Section from 'grommet/components/Section';
import regeneratorRuntime from 'regenerator-runtime';
import { graphql, compose } from 'react-apollo';
import styles from './index.module.scss';
import gql from 'graphql-tag';
import { Navbar, AppFooter } from "components";
import AUTH_TOKEN from '../../constants';

// eslint-disable-next-line react/prefer-stateless-function
class LoginContainer extends Component {
  constructor() {
    super();
    this.state = {
      loggedInToast: false,
      errorToast: false,
    };
  }

  toggleLoggedInToast() {
    window.location.replace('/questions');
  }

  toggleErrorToast() {
    this.setState({
      errorToast: !this.state.errorToast,
    });
  }

  componentDidMount() {
    if (localStorage.getItem('auth_token')) {
      window.location.replace('/dashboard');
    }
  }

  _login = async function() {
    const { email, password } = this.state;
    this.setState({ email_field: null, password_field: null, errors: null });
    const result = await this.props
      .loginMutation({
        variables: {
          email,
          password,
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
      var token = result.data.signInUser.token;
      this._saveUserData(token);
      this.toggleLoggedInToast();
    }
  };

  _saveUserData = token => {
    localStorage.setItem('auth_token', token);
  };

  render() {
    return (
      <div>
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
              Login
            </Title>
            <br />
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
              <FormField
                label="Password *"
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
            </FormFields>
            <Footer pad={{ vertical: 'medium' }} align="center">
              <Button
                fill
                label="Login"
                type="submit"
                primary
                onClick={() => this._login()}
              />
            </Footer>
            <Footer align="center" justify="center">
              <span>Forgot your password? &nbsp;</span>
              <Anchor path="/reset">Reset</Anchor>
            </Footer>
            <Footer align="center" justify="center">
              <span>Need an account? &nbsp;</span>
              <Anchor path="/register">Register today</Anchor>
            </Footer>
          </Box>
        </Box>
        {this.state.loggedInToast === true && (
          <Toast
            status="ok"
            onClose={() => {
              window.location.replace('/dashboard');
            }}
          >
            You have been logged in.
          </Toast>
        )}
        {this.state.errorToast === true && (
          <Toast
            status="critical"
            onClose={() => {
              this.toggleErrorToast();
            }}
          >
            Your email or password is incorrect.
          </Toast>
        )}
      </Section>
    </div>
    );
  }
}

LoginContainer.propTypes = {
  // isLoading: PropTypes.bool.isRequired,
};

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    signInUser(email: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`;

export default compose(graphql(LOGIN_MUTATION, { name: 'loginMutation' }))(
  LoginContainer,
);
