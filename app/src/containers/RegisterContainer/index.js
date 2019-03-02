import React, { Component } from 'react';
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
class RegisterContainer extends Component {
  constructor() {
    super();
    this.state = {
      createdToast: false,
      errorToast: false,
    };
  }

  toggleCreatedToast() {
    this.setState({
      createdToast: !this.state.createdToast,
    });
    window.location.replace('/login');
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
  }

  _register = async function() {
    const { name, email, password, password_confirmation } = this.state;
    this.setState({
      email_field: null,
      password_field: null,
      errors: null,
      name_field: null,
      password_confirmation_field: null,
    });
    const result = await this.props
      .registerMutation({
        variables: {
          name,
          email,
          password,
          password_confirmation,
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
      this.toggleCreatedToast();
    }
  };

  _saveUserData = token => {
    localStorage.setItem('auth_token', token);
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
              Register
            </Title>
            <br />
            <FormFields className={styles.formFields}>
              <FormField
                help="What's your name?"
                label="Name *"
                htmlFor="nameInput"
                className={styles.formField}
                error={this.state.name_field ? this.state.name_field : ''}
              >
                <input
                  required
                  id="nameInput"
                  name="name"
                  type="text"
                  onChange={e => this.setState({ name: e.target.value })}
                  className={styles.input}
                />
              </FormField>
              <FormField
                help="What's your email address?"
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
                help="Enter a secure password (include an uppercase character and number)"
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
                label="Create Account"
                type="submit"
                primary
                onClick={() => this._register()}
              />
            </Footer>
            <Footer align="center" justify="center">
              <span>Have an account? &nbsp;</span>
              <Anchor path="/login">Login</Anchor>
            </Footer>
          </Box>
        </Box>
        {this.state.createdToast === true && (
          <Toast
            status="ok"
            onClose={() => {
              window.location.replace('/login');
            }}
          >
            Your account has been registered.
          </Toast>
        )}
      </Section>
      <AppFooter />
    </div>
    );
  }
}

RegisterContainer.propTypes = {
  // isLoading: PropTypes.bool.isRequired,
};

const REGISTER_MUTATION = gql`
  mutation CreateAccount(
    $email: String!
    $password: String!
    $password_confirmation: String!
    $name: String!
  ) {
    createUser(
      authProvider: { email: { email: $email, password: $password } }
      password_confirmation: $password_confirmation
      name: $name
    ) {
      id
    }
  }
`;

export default compose(
  graphql(REGISTER_MUTATION, { name: 'registerMutation' }),
)(RegisterContainer);
