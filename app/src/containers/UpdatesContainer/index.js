import React, { Component } from "react";
import Box from "grommet/components/Box";
import Section from "grommet/components/Section";
import Status from "grommet/components/icons/Status";
import Heading from "grommet/components/Heading";
import Anchor from "grommet/components/Anchor";
import Title from "grommet/components/Title";
import Image from "grommet/components/Image";
import Hero from "grommet/components/Hero";
import Timestamp from "grommet/components/Timestamp";
import Paragraph from "grommet/components/Paragraph";
import FormField from "grommet/components/FormField";
import FormFields from "grommet/components/FormFields";
import Button from "grommet/components/Button";
import Header from "grommet/components/Header";
import Markdown from "grommet/components/Markdown";
import Columns from "grommet/components/Columns";
import Select from "grommet/components/Select";
import Footer from "grommet/components/Footer";
import Menu from "grommet/components/Menu";
import CheckmarkIcon from "grommet/components/icons/base/Checkmark";
import { graphql, compose } from "react-apollo";
import regeneratorRuntime from "regenerator-runtime";
import gql from "graphql-tag";
import axios from "axios";
import { reduxForm } from "redux-form";
import { MainBox, FullSection, MainContent, Wrapper, ThumbnailImage } from "./styles";
import { Navbar, AppFooter } from "components";
import { NotFoundContainer } from "containers";
import { Divider, LoadingIndicator, QuestionList } from "components";
import styles from "./index.module.scss";

class UpdatesContainer extends Component {
  constructor() {
    super();
    this.state = {
      getData: false,
      update: [],
      isLoading: true,
      comments: "None"
    };
  }

  componentDidMount() {
    if (this.state.getData === false) {
      const axiosGitHubGraphQL = axios.create({
        baseURL: `${
          process.env.NODE_ENV === "development"
            ? "https://personly-api.herokuapp.com/graphql"
            : "https://api.jamesg.app/graphql"
        }`
      });

      const UPDATES_QUERY = `{ getUpdates(id: ${
        this.props.props.params.id
      }) { id user { id name profile_picture } title description created_on } }`;

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
            update: result.data.data.getUpdates[0]
          });
        })
        const COMMENT_QUERY = `{ getComments(update: ${parseInt(
          this.props.props.params.id
        )}) { id user { id name } body created_at reply_id } }`;

        axiosGitHubGraphQL
          .post(
            `${
              process.env.NODE_ENV === "development"
                ? "https://personly-api.herokuapp.com/graphql"
                : "https://api.jamesg.app/graphql"
            }`,
            { query: COMMENT_QUERY }
          )
          .then(result => {
            this.setState({ comments: result.data.data.getComments, getData: true, isLoading: false, id: parseInt(this.props.props.params.id) });
          });
    }
  }

  toggleReplyToComment(id) {
    this.setState({
      reply_id: id
    });
  }

  commentCounter() {
    this.setState({
      comment_count: parseInt(this.state.comment_count) + 1
    });
  }

  toggleCommentToast() {
    this.setState({
      commentToast: !this.state.commentToast
    });
  }

  toggleDeleteCommentToast() {
    this.setState({
      deleteCommentToast: !this.state.deleteCommentToast
    });
  }

  toggleErrorToast() {
    this.setState({
      errorToast: !this.state.errorToast
    });
  }

  render() {
    if (this.state.isLoading === true) {
      return <div />;
    }

    if (this.state.not_found === true) {
      return (
        <div>
          <NotFoundContainer />
        </div>
      );
    }

    if (!this.state.upper_comments) {
      if (this.state.comments !== "None") {
        var upper_comments = this.state.comments.filter(function(new_comment) {
          return new_comment ? new_comment.reply_id === 0 : null;
        });
        this.setState({ upper_comments: upper_comments });
      }
    }

    return (
      <div>
        <Hero
          justify="center"
          align="center"
          backgroundColorIndex="dark"
          background={
            <Image
              fit="cover"
              full={true}
              src="https://images.unsplash.com/photo-1543970256-c86ba45b0d9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            />
          }
          size="small"
        >
          <Box direction="row" justify="center" align="center">
            <Box basis="1/2" align="end" pad="medium">
              <Wrapper imageSize={200}>
                <ThumbnailImage src={this.state.update.user.profile_picture} />
              </Wrapper>
            </Box>
            <Box basis="1/2" align="start" pad="medium">
              <Heading margin="none">{this.state.update.user.name}</Heading>
              <br />
              <Button
                label="Invest"
                href={`/people/${this.state.update.user.id}`}
              />
            </Box>
          </Box>
        </Hero>
        <MainBox alignContent="center" fill="horizontal" align="center">
          <FullSection primary direction="row">
          <MainContent
            align="center"
            justify="start"
            pad={{ vertical: "large" }}
          >
                <Title align="left" tag="h2">
                  {this.state.update.title}
                </Title>
                <Markdown content={this.state.update.description} />
              <Divider />
              <Title align="center" tag="h3">
                Comments
              </Title>
              <div key={this.state.comment_counter}>
                {this.state.comments !== "None" && (
                  <div>
                    {this.state.upper_comments.map((comment, i) => {
                      var comment_replies = this.state.comments.filter(
                        function(new_comment) {
                          return new_comment
                            ? parseInt(new_comment.reply_id) ===
                                parseInt(comment.id)
                            : null;
                        }
                      );
                      return (
                        <Box key={i} className={styles.commentBox}>
                          <Anchor href={`/profile/${comment.user.id}`}>
                            {comment.user.name}
                          </Anchor>
                          <Heading tag="h5">
                            Posted on:{" "}
                            <Timestamp value={comment.created_at} />
                          </Heading>
                          <Heading tag="h5">{comment.body}</Heading>
                          {this.state.currentUser && (
                            <div>
                              {comment.user.id ===
                                this.state.currentUser.id && (
                                <Anchor
                                  onClick={() =>
                                    this._deleteComment(comment.id)
                                  }
                                >
                                  Delete comment
                                </Anchor>
                              )}
                              {this.state.currentUser.role ===
                                "Admin" && (
                                <div>
                                  {comment.user.id !==
                                    this.state.currentUser.id && (
                                    <Anchor
                                      onClick={() =>
                                        this._deleteComment(comment.id)
                                      }
                                    >
                                      Delete comment
                                    </Anchor>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                          <Anchor
                            onClick={() =>
                              this.toggleReplyToComment(comment.id)
                            }
                          >
                            Reply to comment
                          </Anchor>
                          {comment_replies.map((comment_info, n) => {
                            return (
                              <Box
                                key={n}
                                className={styles.commentReply}
                              >
                                <Anchor
                                  href={`/profile/${
                                    comment_info.user.id
                                  }`}
                                >
                                  {comment_info.user.name}
                                </Anchor>
                                {this.state.currentUser && (
                                  <div>
                                    {comment.user.id !==
                                      this.state.currentUser.id && (
                                      <Anchor
                                        onClick={() =>
                                          _deleteComment(comment.id)
                                        }
                                      >
                                        Delete comment
                                      </Anchor>
                                    )}
                                  </div>
                                )}
                                {this.state.currentUser.role ===
                                  "Admin" && (
                                  <div>
                                    {comment_info.user.id !==
                                      this.state.currentUser.id && (
                                      <Anchor
                                        onClick={() =>
                                          _deleteComment(comment_info.id)
                                        }
                                      >
                                        Delete comment
                                      </Anchor>
                                    )}
                                  </div>
                                )}
                                <Heading tag="h5">
                                  Posted on:{" "}
                                  <Timestamp
                                    value={comment_info.created_at}
                                  />
                                </Heading>
                                <Heading tag="h5">
                                  {comment_info.body}
                                </Heading>
                                {this.state.currentUser && (
                                  <div>
                                    {comment_info.user.id ===
                                      this.state.currentUser.id && (
                                      <Anchor
                                        onClick={() =>
                                          this._deleteComment(
                                            comment_info.id
                                          )
                                        }
                                      >
                                        Delete comment
                                      </Anchor>
                                    )}
                                    {this.state.currentUser.role ===
                                      "Admin" && (
                                      <div>
                                        {comment_info.user.id !==
                                          this.state.currentUser.id && (
                                          <Anchor
                                            onClick={() =>
                                              this._deleteComment(
                                                comment_info.id
                                              )
                                            }
                                          >
                                            Delete comment
                                          </Anchor>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </Box>
                            );
                          })}
                            <div>
                              {this.state.currentUser && (
                                <div>
                                  {this.state.reply_id == comment.id && (
                                    <div className={styles.commentReply}>
                                      <FormField
                                        help="Post comment on update"
                                        label="Comment *"
                                        htmlFor="commentInput"
                                        className={styles.formField}
                                        error={
                                          this.state.comment_field
                                            ? this.state.comment_field
                                            : ""
                                        }
                                      >
                                        <textarea
                                          required
                                          rows="5"
                                          id="commentInput"
                                          name="comment"
                                          type="comment"
                                          onChange={e =>
                                            this.setState({
                                              body: e.target.value
                                            })
                                          }
                                          className={styles.input}
                                        />
                                      </FormField>
                                      <Footer
                                        pad={{ vertical: "medium" }}
                                        align="center"
                                      >
                                        <Button
                                          label="Post"
                                          type="submit"
                                          primary
                                          onClick={() =>
                                            this._submitComment(
                                              comment.id
                                            )
                                          }
                                        />
                                      </Footer>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                        </Box>
                      );
                    })}
                  </div>
                )}
                {this.state.update && (
                  <div>
                      <div>
                        {this.state.currentUser != "None" && (
                          <div>
                            <FormField
                              help="Post comment on update"
                              label="Comment *"
                              htmlFor="commentInput"
                              className={styles.formField}
                              error={
                                this.state.comment_field
                                  ? this.state.comment_field
                                  : ""
                              }
                            >
                              <textarea
                                required
                                rows="5"
                                id="commentInput"
                                name="comment"
                                type="comment"
                                onChange={e =>
                                  this.setState({ body: e.target.value })
                                }
                                className={styles.input}
                              />
                            </FormField>
                            <Footer
                              pad={{ vertical: "medium" }}
                              align="center"
                            >
                              <Button
                                label="Post"
                                type="submit"
                                primary
                                onClick={() => this._submitComment()}
                              />
                            </Footer>
                          </div>
                        )}
                      </div>
                  </div>
                )}
              </div>
              </MainContent>
          </FullSection>
          {this.state.commentToast === true && (
            <Toast
              status="ok"
              key={1}
              onClose={() => {
                this.toggleCommentToast();
              }}
            >
              Your comment has been created
            </Toast>
          )}
          {this.state.deleteCommentToast === true && (
            <Toast
              status="ok"
              key={1}
              onClose={() => {
                this.toggleDeleteCommentToast();
              }}
            >
              Your comment has been deleted
            </Toast>
          )}
          {this.state.errorToast === true && (
            <Toast
              status="ok"
              onClose={() => {
                this.toggleErrorToast();
              }}
            >
              {this.state.errors[0]}
            </Toast>
          )}
        </MainBox>
      </div>
    );
  }

  _submitComment = async function(reply_number) {
    const { body, id } = this.state;
    const reply_id = parseInt(reply_number);
    this.setState({ body_field: null, errors: null });
    const result = await this.props
      .createComment({
        variables: {
          id,
          body,
          reply_id
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
      if (this.state.errors) {
        this.toggleErrorToast();
      }
    }
    if (!this.state.errors) {
      this.setState({ body: "" });
      const axiosGitHubGraphQL = axios.create({
        baseURL: `${
          process.env.NODE_ENV === "development"
            ? "https://personly-api.herokuapp.com/graphql"
            : "https://api.jamesg.app/graphql"
        }`,
        headers: {
          Authorization: `Bearer ${this.state.auth_token}`
        }
      });
      const COMMENT_QUERY = `{ getComments(id: ${parseInt(
        this.props.props.params.id
      )}) { id user { id name shares } body created_at } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: COMMENT_QUERY }
        )
        .then(result => {
          this.setState({ comments: result.data.data.getComments });
        })
        .catch(error => {
          this.setState({ comments: "None" });
        });
      const upper_comments = this.state.comments.filter(function(new_comment) {
        return new_comment ? new_comment.reply_id === 0 : null;
      });
      location.reload();
      this.setState({ upper_comments: upper_comments, reply_id: 0 });
      this.commentCounter();
      this.toggleCommentToast();
    }
  };

  _deleteComment = async function(id) {
    var id = parseInt(id);
    this.setState({ errors: null });
    const result = await this.props
      .deleteComment({
        variables: {
          id
        }
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error);
        this.setState({ errors });
      });
    this.setState({ id: null });
    if (this.state.errors) {
      {
        this.state.errors.map(error =>
          this.setState({ [error.field]: error.message })
        );
      }
      if (this.state.errors) {
        this.toggleErrorToast();
      }
    }
    if (!this.state.errors) {
      this.toggleDeleteCommentToast();
      const axiosGitHubGraphQL = axios.create({
        baseURL: `${
          process.env.NODE_ENV === "development"
            ? "https://personly-api.herokuapp.com/graphql"
            : "https://api.jamesg.app/graphql"
        }`,
        headers: {
          Authorization: `Bearer ${this.state.auth_token}`
        }
      });
      const COMMENT_QUERY = `{ getComments(id: ${parseInt(
        this.props.props.params.id
      )}) { id user { id name shares } body created_at } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: COMMENT_QUERY }
        )
        .then(result => {
          this.setState({ comments: result.data.data.getComments });
        })
        .catch(error => {
          this.setState({ comments: "None" });
        });
      const upper_comments = this.state.comments.filter(function(new_comment) {
        return new_comment ? new_comment.reply_id === 0 : null;
      });
      this.setState({ upper_comments: upper_comments });
    }
  };
}

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($id: Int!, $body: String!, $reply_id: Int) {
    createComment(id: $id, body: $body, reply_id: $reply_id, update: "Update") {
      id
    }
  }
`;

const DELETE_COMMENT_MUTASTION = gql`
  mutation DeleteComment($id: Int!) {
    deleteComment(id: $id) {
      id
    }
  }
`;

export default compose(
  graphql(CREATE_COMMENT_MUTATION, { name: "createComment" }),
  graphql(DELETE_COMMENT_MUTASTION, { name: "deleteComment" }),
)(UpdatesContainer);
