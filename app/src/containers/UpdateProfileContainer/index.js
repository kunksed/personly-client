import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Select from 'grommet/components/Select';
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark';
import Button from 'grommet/components/Button';
import Menu from 'grommet/components/Menu';
import { graphql, compose } from 'react-apollo';
import Toast from 'grommet/components/Toast';
import axios from 'axios';
import gql from 'graphql-tag';
import styles from './index.module.scss';
import { FullSection, MainContent, MainBox } from './styles';
import { Divider, LoadingIndicator, SettingsSidebar } from 'components';
import { Navbar, AppFooter } from "components";
import regeneratorRuntime from 'regenerator-runtime';

class UpdateProfileContainer extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      updateAccountToast: false,
      load_default: false,
      getData: false,
      getSecondData: false,
      currentUser: 'None',
      isLoading: true,
    };
  }

  componentDidMount() {
    if (!localStorage.getItem('auth_token')) {
      window.location.replace('/login');
    }
    if (this.state.getData === false) {
      const axiosGitHubGraphQL = axios.create({
        baseURL: `${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      const MAIN_QUERY = `{ getCurrentUser { id name role email profile_picture bio position location twitter personal_website gender api_key } }`;

      axiosGitHubGraphQL
        .post(`${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`, { query: MAIN_QUERY })
        .then(result => {
          this.setState({
            currentUser: result.data.data.getCurrentUser[0],
            name: result.data.data.getCurrentUser[0].name,
            role: result.data.data.getCurrentUser[0].role,
            email: result.data.data.getCurrentUser[0].email,
            profile_picture: result.data.data.getCurrentUser[0].profile_picture,
            bio: result.data.data.getCurrentUser[0].bio,
            position: result.data.data.getCurrentUser[0].position,
            location: result.data.data.getCurrentUser[0].location,
            twitter_username: result.data.data.getCurrentUser[0].twitter,
            personal_website:
              result.data.data.getCurrentUser[0].personal_website,
            gender: result.data.data.getCurrentUser[0].gender,
            gender_custom: result.data.data.getCurrentUser[0].gender,
            api_key: result.data.data.getCurrentUser[0].api_key,
            getSecondData: true,
            getData: true,
            isLoading: false
          });
        })
        .catch(result => {
          this.setState({
            currentUser: 'None',
            getData: true,
            isLoading: false
          });
        });
    }
  }

  toggleUpdateAccount() {
    this.setState({
      updateAccountToast: !this.state.updateAccountToast,
    });
  }

  toggleUpdatePassword() {
    this.setState({
      updatePasswordToast: !this.state.updatePasswordToast,
    });
  }

  toggleRegenerateAPIKey() {
    this.setState({
      regenerateAPIKeyToast: !this.state.regenerateAPIKeyToast,
    });
  }

  render() {
    if (this.state.isLoading === true) {
      return (
        <div />
      );
    }

    return (
      <div>
        <MainBox alignContent="center" fill="horizontal" align="center">
          <FullSection primary direction="row">
            <SettingsSidebar currentUser={this.state.currentUser} />
            <MainContent
              align="center"
              justify="start"
              pad={{ vertical: 'large' }}>
              <Heading tag="h2" align="center">
                Edit Profile
              </Heading>
              <Section
                pad={{ vertical: 'medium' }}
                align="center"
                justify="center"
              >
                <Box size="medium" align="center">
                  <FormField
                    label="Full Name *"
                    htmlFor="name"
                    className={styles.formField}
                    error={this.state.name_field ? this.state.name_field : ''}
                  >
                    <input
                      required
                      id="name"
                      name="name"
                      placeholder="John Appleseed"
                      value={this.state.name}
                      type="text"
                      onChange={e => this.setState({ name: e.target.value })}
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
                    label="Profile Picture *"
                    htmlFor="profile_picture"
                    className={styles.formField}
                    error={
                      this.state.profile_picture_field
                        ? this.state.profile_picture_field
                        : ''
                    }
                  >
                    <input
                      required
                      id="profile_picture"
                      name="profile_picture"
                      placeholder="https://github.com/joebloggs/profile_image.png"
                      type="text"
                      value={this.state.profile_picture}
                      onChange={e =>
                        this.setState({ profile_picture: e.target.value })
                      }
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
                    label="Email *"
                    htmlFor="email"
                    className={styles.formField}
                    error={this.state.email_field ? this.state.email_field : ''}
                  >
                    <input
                      required
                      id="email"
                      name="email"
                      placeholder="john@apple.com"
                      value={this.state.email}
                      type="email"
                      onChange={e => this.setState({ email: e.target.value })}
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
                    label="Position *"
                    htmlFor="position"
                    className={styles.formField}
                    error={
                      this.state.position_field ? this.state.position_field : ''
                    }
                  >
                    <input
                      required
                      id="position"
                      name="position"
                      placeholder="CEO @ Microsoft"
                      value={this.state.position}
                      type="text"
                      onChange={e =>
                        this.setState({ position: e.target.value })
                      }
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
                    label="Location *"
                    htmlFor="location"
                    className={styles.formField}
                    error={
                      this.state.location_field ? this.state.location_field : ''
                    }
                  >
                    <input
                      required
                      id="location"
                      name="location"
                      placeholder="San Francisco, California"
                      value={this.state.location}
                      type="text"
                      onChange={e =>
                        this.setState({ location: e.target.value })
                      }
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
                    label="Twitter username *"
                    htmlFor="twitter"
                    className={styles.formField}
                    error={
                      this.state.twitter_field ? this.state.twitter_field : ''
                    }
                  >
                    <input
                      required
                      id="twitter_username"
                      name="twitter_username"
                      placeholder="@jack"
                      value={this.state.twitter_username}
                      type="text"
                      onChange={e =>
                        this.setState({ twitter_username: e.target.value })
                      }
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
                    label="Personal website *"
                    htmlFor="personal_website"
                    className={styles.formField}
                    error={
                      this.state.personal_website_field
                        ? this.state.personal_website_field
                        : ''
                    }
                  >
                    <input
                      required
                      id="personal_website"
                      name="personal_website"
                      placeholder=""
                      value={this.state.personal_website}
                      type="text"
                      onChange={e =>
                        this.setState({ personal_website: e.target.value })
                      }
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
                    label="Gender"
                    htmlFor="genderInput"
                    className={styles.formField}
                    error={
                      this.state.gender_field ? this.state.gender_field : ''
                    }
                  >
                    <Select
                      placeHolder=""
                      options={['Male', 'Female', 'Other', 'Prefer Not To Say']}
                      value={this.state.gender}
                      onChange={e => this.setState({ gender: e.option })}
                      className={styles.input}
                    />
                  </FormField>
                  {this.state.gender === 'Other' && (
                    <Section
                      pad={{ vertical: 'medium' }}
                      align="center"
                      justify="center"
                    >
                      <Box size="medium" align="center">
                        <FormField
                          label="Gender *"
                          htmlFor="bio"
                          className={styles.formField}
                          error={
                            this.state.bio_field ? this.state.bio_field : ''
                          }
                        >
                          <input
                            required
                            id="gender"
                            name="gender"
                            type="text"
                            value={this.state.gender_custom}
                            onChange={e =>
                              this.setState({ gender_custom: e.target.value })
                            }
                            className={styles.input}
                          />
                        </FormField>
                      </Box>
                    </Section>
                  )}
                </Box>
              </Section>
              <Section
                pad={{ vertical: 'medium' }}
                align="center"
                justify="center"
              >
                <Box size="medium" align="center">
                  <FormField
                    label="Bio *"
                    htmlFor="bio"
                    className={styles.formField}
                    error={this.state.bio_field ? this.state.bio_field : ''}
                  >
                    <textarea
                      required
                      rows="10"
                      id="bio"
                      name="bio"
                      type="text"
                      value={this.state.bio}
                      onChange={e => this.setState({ bio: e.target.value })}
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
                      this._updateAccount();
                    }}
                    icon={<CheckmarkIcon />}
                  />
                </Menu>
              </Footer>
              <Divider />
              <Heading tag="h2" align="center">
                Change Password
              </Heading>
              <Section
                pad={{ vertical: 'medium' }}
                align="center"
                justify="center"
              >
                <Box size="medium" align="center">
                  <FormField
                    help="Enter your current password"
                    label="Current Password *"
                    htmlFor="current_password"
                    className={styles.formField}
                    error={
                      this.state.current_password_field
                        ? this.state.current_password_field
                        : ''
                    }
                  >
                    <input
                      required
                      id="current_password"
                      name="current_password"
                      type="password"
                      onChange={e =>
                        this.setState({ current_password: e.target.value })
                      }
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
                    help="Enter your new password"
                    label="New Password *"
                    htmlFor="new_password"
                    className={styles.formField}
                    error={
                      this.state.new_password_field
                        ? this.state.new_password_field
                        : ''
                    }
                  >
                    <input
                      required
                      id="new_password"
                      name="new_password"
                      type="password"
                      onChange={e =>
                        this.setState({ new_password: e.target.value })
                      }
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
                    help="Confirm your new password"
                    label="Confirm Password *"
                    htmlFor="new_password_confirmation"
                    className={styles.formField}
                    error={
                      this.state.new_password_confirmation_field
                        ? this.state.new_password_confirmation_field
                        : ''
                    }
                  >
                    <input
                      required
                      id="new_password_confirmation"
                      name="new_password_confirmation"
                      type="password"
                      onChange={e =>
                        this.setState({
                          new_password_confirmation: e.target.value,
                        })
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
                    onClick={() => this._updatePassword()}
                    icon={<CheckmarkIcon />}
                  />
                </Menu>
              </Footer>
              <Divider />
              <Heading tag="h2" align="center">
                API Key
              </Heading>
              <Section
                pad={{ vertical: 'medium' }}
                align="center"
                justify="center"
              >
                <Box size="medium" align="center">
                  <FormField
                    label="API Key *"
                    htmlFor="api_key"
                    className={styles.formField}
                    error={
                      this.state.api_key_field
                        ? this.state.api_key_field
                        : ''
                    }
                  >
                    <input
                      disabled
                      id="api_key"
                      name="api_key"
                      value={this.state.api_key}
                      type="text"
                      className={styles.input}
                    />
                  </FormField>
                </Box>
              </Section>
              <Footer align="center" justify="center">
                <Menu inline direction="row" responsive={false}>
                  <Button
                    label="Regenerate"
                    primary
                    style={{ marginTop: 10, marginLeft: 5 }}
                    onClick={() => this._updateAPIKey()}
                  />
                </Menu>
              </Footer>
              {this.state.updatePasswordToast === true && (
                <Toast status="ok" onClose={() => this.toggleUpdatePassword()}>
                  Your password has been changed.
                </Toast>
              )}
              {this.state.updateAccountToast === true && (
                <Toast status="ok" onClose={() => this.toggleUpdateAccount()}>
                  Your profile has been updated.
                </Toast>
              )}
              {this.state.regenerateAPIKeyToast === true && (
                <Toast status="ok" onClose={() => this.toggleRegenerateAPIKey()}>
                  Your API key has been updated.
                </Toast>
              )}
            </MainContent>
          </FullSection>
        </MainBox>
      </div>
    );
  }

  _updateAccount = async function() {
    const {
      name,
      email,
      profile_picture,
      bio,
      position,
      location,
      personal_website,
      twitter_username,
      gender,
    } = this.state;
    if (this.state.gender === 'Other') {
      this.setState({ gender: this.state.gender_custom });
    }
    this.setState({
      name_field: '',
      email_field: '',
      profile_picture_field: '',
      bio_field: '',
      position_field: '',
      location_field: '',
      twitter_field: '',
      personal_website_field: '',
      errors: '',
    });
    await this.props
      .updateUser({
        variables: {
          name,
          email,
          profile_picture,
          bio,
          position,
          location,
          twitter_username,
          personal_website,
          gender,
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
      this.toggleUpdateAccount();
    }
  };

  _updatePassword = async function() {
    const {
      new_password,
      new_password_confirmation,
      current_password,
    } = this.state;
    this.setState({
      new_password_field: '',
      new_password_confirmation_field: '',
      current_password_field: '',
      errors: '',
    });
    await this.props
      .updatePassword({
        variables: {
          new_password,
          new_password_confirmation,
          current_password,
        },
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error);
        this.setState({ errors: errors, api_key: res.data.data.resetAPIKey[0].api_key });
      });
    if (this.state.errors) {
      {
        this.state.errors.map(error =>
          this.setState({ [error.field]: error.message }),
        );
      }
    }
    if (!this.state.errors) {
      this.toggleUpdatePassword();
    }
  };

  _updateAPIKey = async function() {
    await this.props
      .updatePassword({})
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
      this.toggleRegenerateAPIKey();
    }
  };

}

const UPDATE_USER = gql`
  mutation UpdateUser(
    $name: String
    $email: String
    $profile_picture: String
    $bio: String
    $position: String
    $location: String
    $twitter_username: String
    $personal_website: String
    $gender: String
  ) {
    updateUser(
      name: $name
      email: $email
      profile_picture: $profile_picture
      bio: $bio
      position: $position
      location: $location
      twitter_username: $twitter_username
      personal_website: $personal_website
      gender: $gender
    ) {
      id
    }
  }
`;

const UPDATE_PASSWORD = gql`
  mutation ChangePassword(
    $new_password: String
    $new_password_confirmation: String
    $current_password: String
  ) {
    changePassword(
      new_password: $new_password
      new_password_confirmation: $new_password_confirmation
      current_password: $current_password
    ) {
      id
    }
  }
`;

const REGENERATE_API_KEY = gql`
  mutation ResetAPIKey {
    resetAPIKey {
      id
      api_key
    }
  }
`;

export default compose(
  graphql(UPDATE_USER, { name: 'updateUser' }),
  graphql(UPDATE_PASSWORD, { name: 'updatePassword' }),
  graphql(REGENERATE_API_KEY, { name: 'resetAPIKey' }),
)(UpdateProfileContainer);
