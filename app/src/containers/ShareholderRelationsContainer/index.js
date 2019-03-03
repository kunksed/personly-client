import React, { Component } from "react";
import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";
import Section from "grommet/components/Section";
import FormField from "grommet/components/FormField";
import Select from "grommet/components/Select";
import Paragraph from "grommet/components/Paragraph";
import Timestamp from "grommet/components/Timestamp";
import CheckmarkIcon from "grommet/components/icons/base/Checkmark";
import Button from "grommet/components/Button";
import Menu from "grommet/components/Menu";
import Table from "grommet/components/Table";
import Anchor from "grommet/components/Anchor";
import TableRow from "grommet/components/TableRow";
import { graphql, compose } from "react-apollo";
import Toast from "grommet/components/Toast";
import axios from "axios";
import gql from "graphql-tag";
import styles from "./index.module.scss";
import { FullSection, MainContent, MainBox } from "./styles";
import { Divider, LoadingIndicator, SettingsSidebar } from "components";
import { Navbar, AppFooter } from "components";
import regeneratorRuntime from "regenerator-runtime";

class ShareholderRelationsContainer extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      updateAccountToast: false,
      load_default: false,
      getData: false,
      getSecondData: false,
      currentUser: "None",
      isLoading: true,
      investments: []
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

      const MAIN_QUERY = `{ getCurrentUser { id name role email profile_picture bio position location twitter personal_website gender api_key is_public } }`;

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
          });
        })
        .catch(result => {
          this.setState({
            currentUser: "None",
          });
        });



      const UPDATES_QUERY = `{ getUpdates { id title created_on } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: UPDATES_QUERY }
        )
        .then(result => {
          this.setState({
            updates: result.data.data.getUpdates
          });
        });


      const QUESTIONS_QUERY = `{ getQuestions { id title created_on approved closes } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: QUESTIONS_QUERY }
        )
        .then(result => {
          this.setState({
            questions: result.data.data.getQuestions,
            isLoading: false
          });
        })
        .catch(result => {
          this.setState({
            questions: [],
            getData: true,
            isLoading: false
          });
        });
    }
  }

  toggleUpdateDeleted() {
    this.setState({
      updateDeletedToast: !this.state.updateDeletedToast,
    });
  }

  toggleQuestionDeleted() {
    this.setState({
      questionDeletedToast: !this.state.questionDeletedToast,
    });
  }

  render() {
    if (this.state.isLoading === true) {
      return <div />;
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
                Questions
              </Heading>
              <Button align="center" label="Create Question" href="/new" />
              {this.state.questions.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Question Title</th>
                      <th>Created On</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.questions.map(question => {
                    return (
                      <TableRow>
                        <td>#{question.id}</td>
                        <td><Anchor href={`/questions/${question.id}`} label={question.title}/></td>
                        <td className="secondary"><Timestamp value={question.created_on} /></td>
                        <td><Anchor onClick={() => this._deleteQuestion(update.id)} label="Delete"/></td>
                        <td><Anchor href={`/questions/${question.id}/edit`} label="Edit"/></td>
                      </TableRow>
                    )
                  })}
                  </tbody>
                </Table>
              )}
              {this.state.questions.length === 0 && (
                <Paragraph>You haven't posted any shareholder questions yet.</Paragraph>
              )}
                <Heading tag="h2" align="center">
                  Updates
                </Heading>
                <Button align="center" label="Create Update" href="/new/update" />
                {this.state.updates.length > 0 && (
                  <Table>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Update Title</th>
                        <th>Created On</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.updates.map(update => {
                      return (
                        <TableRow>
                          <td>#{update.id}</td>
                          <td><Anchor href={`/updates/${update.id}`} label={update.title}/></td>
                          <td className="secondary"><Timestamp value={update.created_on} /></td>
                          <td><Anchor onClick={() => this._deleteUpdate(update.id)} label="Delete"/></td>
                          <td><Anchor href={`/updates/${update.id}/edit`} label="Edit"/></td>
                        </TableRow>
                      )
                    })}
                    </tbody>
                  </Table>
                )}
                {this.state.updates.length === 0 && (
                  <Paragraph>You haven't posted any shareholder updates yet.</Paragraph>
                )}
                {this.state.questionDeletedToast === true && (
                  <Toast
                    status="ok"
                    onClose={() => {
                      this.toggleQuestionDeleted();
                    }}
                  >
                    This question has been deleted.
                  </Toast>
                )}
                {this.state.updateDeletedToast === true && (
                  <Toast
                    status="ok"
                    onClose={() => {
                      this.toggleUpdateDeleted();
                    }}
                  >
                    This update has been deleted.
                  </Toast>
                )}
            </MainContent>
          </FullSection>
        </MainBox>
      </div>
    );
  }

  _deleteUpdate = async function(id) {
    var id = parseInt(id);
    await this.props
      .deleteUpdate({
        variables: {
          id
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
      const axiosGitHubGraphQLAuth = axios.create({
        baseURL: `${
          process.env.NODE_ENV === "development"
            ? "https://jamesg-test.herokuapp.com/graphql"
            : "https://api.jamesg.app/graphql"
        }`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        }
      });
    const DELETE_UPDATE_QUERY = `{ getUpdates { id title url created_on } }`;
    axiosGitHubGraphQLAuth
      .post(
        `${
          process.env.NODE_ENV === "development"
            ? "https://jamesg-test.herokuapp.com/graphql"
            : "https://api.jamesg.app/graphql"
        }`,
        { query: DELETE_UPDATE_QUERY }
      )
      .then(result => {
        this.setState({
          updates: result.data.data.getUpdates,
          getData: true,
          isLoading: false
        });
      })
      this.toggleUpdateDeleted();
    }
  };

  _deleteQuestion = async function(id) {
    var id = parseInt(id);
    await this.props
      .deleteQuestion({
        variables: {
          id
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
      const axiosGitHubGraphQLAuth = axios.create({
        baseURL: `${
          process.env.NODE_ENV === "development"
            ? "https://jamesg-test.herokuapp.com/graphql"
            : "https://api.jamesg.app/graphql"
        }`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        }
      });
    const DELETE_QUESTION_QUERY = `{ getQuestions { id title created_on approved closes } }`;

    axiosGitHubGraphQLAuth
      .post(
        `${
          process.env.NODE_ENV === "development"
            ? "https://jamesg-test.herokuapp.com/graphql"
            : "https://api.jamesg.app/graphql"
        }`,
        { query: DELETE_QUESTION_QUERY }
      )
      .then(result => {
        this.setState({
          questions: result.data.data.getQuestions
        });
      });
      this.toggleQuestionDeleted();
    }
  };
}

const DELETE_UPDATE = gql`
  mutation DeleteUpdate($id: Int!) {
    deleteUpdate(id: $id) {
      id
    }
  }
`;

const DELETE_QUESTION = gql`
  mutation DeleteQuestion($id: Int!) {
    deleteQuestion(id: $id) {
      id
    }
  }
`;

export default compose(
  graphql(DELETE_UPDATE, { name: "deleteUpdate" }),
  graphql(DELETE_QUESTION, { name: "deleteQuestion" })
)(ShareholderRelationsContainer);
