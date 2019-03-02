import React, { Component } from "react";
import Box from "grommet/components/Box";
import Section from "grommet/components/Section";
import Paragraph from "grommet/components/Paragraph";
import Footer from "grommet/components/Footer";
import Button from "grommet/components/Button";
import Heading from "grommet/components/Heading";
import Anchor from "grommet/components/Anchor";
import Menu from "grommet/components/Menu";
import Toast from "grommet/components/Toast";
import FormField from "grommet/components/FormField";
import Timestamp from "grommet/components/Timestamp";
import Columns from "grommet/components/Columns";
import Markdown from "grommet/components/Markdown";
import Select from "grommet/components/Select";
import Table from "grommet/components/Table";
import TableRow from "grommet/components/TableRow";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { MainBox, FullSection } from "./styles";
import { Divider, LoadingIndicator } from "components";
import { Navbar, AppFooter } from "components";
import { NotFoundContainer } from "containers";
import { Helmet } from "react-helmet";
import axios from "axios";
import regeneratorRuntime from "regenerator-runtime";
import { graphql, compose } from "react-apollo";
import styles from "./index.module.scss";
import gql from "graphql-tag";

class QuestionContainer extends Component {
  constructor() {
    super();
    this.state = {
      questions: "",
      comments: "None",
      votes: "",
      getData: false,
      commentToast: false,
      errorToast: false,
      getSecondData: false,
      getThirdData: false,
      getDataSecond: false,
      voted: [],
      approved: null,
      currentUser: "None",
      isLoading: true,
      render_count: false,
      comment_count: 1
    };
  }

  componentDidMount() {
    if (this.state.getData === false) {
      var axiosGitHubGraphQL = axios.create({
        baseURL: `${
          process.env.NODE_ENV === "development"
            ? "https://personly-api.herokuapp.com/graphql"
            : "https://api.jamesg.app/graphql"
        }`
      });

      const MAIN_QUERY = `{ getQuestions(id: ${parseInt(
        this.props.props.params.id
      )}) { id title created_on description approved closes } }`;

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
            question: result.data.data.getQuestions[0],
            approved: result.data.data.getQuestions[0].approved
          });
        })
        .catch(error => {
          this.setState({ not_found: true });
        });

      const SECOND_QUERY = `{ getVotes(id: ${parseInt(
        this.props.props.params.id
      )}) { id user { id name friend_badge work_badge } shares vote_type } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: SECOND_QUERY }
        )
        .then(result => {
          this.setState({ votes: result.data.data.getVotes });
        });

      const COMMENT_QUERY = `{ getComments(id: ${parseInt(
        this.props.props.params.id
      )}) { id user { id name shares } body created_at reply_id } }`;

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

      var axiosGitHubGraphQL = axios.create({
        baseURL: `${
          process.env.NODE_ENV === "development"
            ? "https://personly-api.herokuapp.com/graphql"
            : "https://api.jamesg.app/graphql"
        }`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        }
      });

      const THIRD_QUERY = `{ getCurrentUser { id name role shares } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: THIRD_QUERY }
        )
        .then(result => {
          this.setState({
            currentUser: result.data.data.getCurrentUser[0],
            user_role: result.data.data.getCurrentUser[0].role,
          });
        })

      this.setState({
        id: parseInt(this.props.props.params.id),
        auth_token: localStorage.getItem("auth_token"),
        getData: true,
        isLoading: false,
      });
    }
  }

  toggleReplyToComment(id) {
    this.setState({
      reply_id: id
    });
  }

  commentCounter () {
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

  toggleVoteToast() {
    this.setState({
      voteToast: !this.state.voteToast
    });
  }

  toggleErrorToast() {
    this.setState({
      errorToast: !this.state.errorToast
    });
  }

  render() {
    if (this.state.not_found === true) {
      return (
        <div>
          <NotFoundContainer pathname={this.state.props.props.pathname} />
        </div>
      );
    }

    if (this.state.votes !== "") {
      var no_votes = this.state.votes.filter(function(vote) {
        return vote ? vote.vote_type === "No" : null;
      });
      var yes_votes = this.state.votes.filter(function(vote) {
        return vote ? vote.vote_type === "Yes" : null;
      });
      var abstain_votes = this.state.votes.filter(function(vote) {
        return vote ? vote.vote_type === "Abstain" : null;
      });
      var no_votes_array_new = [];
      var yes_votes_array_new = [];
      var abstain_votes_array_new = [];
      var no_votes_question = no_votes.map(function(vote) {
        no_votes_array_new.push(vote.shares);
        return vote.shares;
      });
      var yes_votes_question = yes_votes.map(function(vote) {
        yes_votes_array_new.push(vote.shares);
        return vote.shares;
      });
      var abstain_votes_question = abstain_votes.map(function(vote) {
        abstain_votes_array_new.push(vote.shares);
        return vote.shares;
      });
      var no_vote_count = no_votes_array_new.reduce((vote, i) => {
        return i + vote;
      }, 0);
      var yes_vote_count = yes_votes_array_new.reduce((vote, i) => {
        return i + vote;
      }, 0);
      var abstain_vote_count = abstain_votes_array_new.reduce((vote, i) => {
        return i + vote;
      }, 0);
      if (this.state.render_count === false) {
        this.setState({
          no_vote_count: no_vote_count,
          yes_vote_count: yes_vote_count,
          abstain_vote_count: abstain_vote_count,
          render_count: true
        });
      }

      var result = [];
      var map = new Map();
      for (const item of yes_votes) {
        if (!map.has(item.user.name)) {
          map.set(item.user.name, true); // set any value to Map
          result.push({
            name: item.user.name,
            id: item.user.id,
            work_badge: item.user.work_badge,
            friend_badge: item.user.friend_badge,
            shares: item.shares
          });
        }
      }

      var no_result = [];
      var map = new Map();
      for (const item of no_votes) {
        if (!map.has(item.user.name)) {
          map.set(item.user.name, true); // set any value to Map
          no_result.push({
            name: item.user.name,
            id: item.user.id,
            work_badge: item.user.work_badge,
            friend_badge: item.user.friend_badge,
            shares: item.shares
          });
        }
      }
    }

    const options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie"
      },
      title: {
        text: "Question Results"
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [
        {
          name: "Yes/No",
          colorByPoint: true,
          tooltip: {
            valueDecimals: 2
          },
          data: [
            {
              name: "Yes",
              y: parseInt(yes_vote_count)
            },
            {
              name: "No",
              y: parseInt(no_vote_count)
            },
            {
              name: "Abstain",
              y: parseInt(abstain_vote_count)
            }
          ]
        }
      ]
    };

    if (this.state.isLoading === true) {
      return (
        <div />
      );
    }

    if (this.state.getSecondData === false && this.state.currentUser) {
      if (this.state.currentUser) {
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

        const VOTED_QUERY = `{ getVotes(id: ${parseInt(
          this.props.props.params.id
        )}, user: ${parseInt(this.state.currentUser.id)}) {
        id
        user {
          id
          name
          shares
          friend_badge
          work_badge
        }
        vote_type
      }}`;

        axiosGitHubGraphQL
          .post(
            `${
              process.env.NODE_ENV === "development"
                ? "https://personly-api.herokuapp.com/graphql"
                : "https://api.jamesg.app/graphql"
            }`,
            { query: VOTED_QUERY }
          )
          .then(result => {
            this.setState({
              voted: result.data.data.getVotes,
              getSecondData: true
            });
          });
      }
    }

    var today = new Date().getTime();
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
        <Navbar pathname={this.props.props.pathname} />
            <Helmet>
                <meta charSet="utf-8" />
                <title>{this.state.question.title}</title>
                <meta property="title" content={this.state.question.title} />
                <meta name="description" content={`Shareholder Question: ${this.state.question.title}. Help James make this decision.`} />
                <meta property="og:url" content="https://jamesg.app/questions/4" />
                <meta property="og:title" content={this.state.question.title} />
                <meta property="og:description" content={`Shareholder Question: ${this.state.question.title}. Help James make this decision.`} />
                <meta property="twitter:url" content="https://jamesg.app/questions/4" />
                <meta property="twitter:title" content={this.state.question.title} />
                <meta property="twitter:description" content={`Shareholder Question: ${this.state.question.title}. Help James make this decision.`} />
            </Helmet>
      <Box className={styles.container}>
        <Box full="horizontal">
          <Section align="center" justify="center">
            <Columns size="large" align="center" justify="center">
              <Box align="center" pad="medium" margin="small">
                {this.state.approved && (
                  <div>
                    {this.state.approved === "true" && (
                      <Heading align="center" tag="h2">
                        Approved
                      </Heading>
                    )}
                    {this.state.approved === "false" && (
                      <Heading align="center" tag="h2">
                        Denied
                      </Heading>
                    )}
                  </div>
                )}
                <HighchartsReact highcharts={Highcharts} options={options} />
                {this.state.approved === null && (
                  <Heading align="center" tag="h3">
                    Vote closes at{" "}
                    <Timestamp value={this.state.question.closes} fields="date" />
                  </Heading>
                )}
                {this.state.approved !== null && (
                  <Heading align="center" tag="h3">
                    Vote closed on{" "}
                    <Timestamp value={this.state.question.closes} fields="date" />
                  </Heading>
                )}
                {this.state.approved === null && (
                  <div>
                    {this.state.currentUser !== "None" && (
                      <div>
                          <div>
                              <div>
                                <br />
                                <br />
                                <Box>
                                  <FormField
                                    label="Vote"
                                    htmlFor="voteInput"
                                    className={styles.formField}
                                    error={
                                      this.state.vote_outcome_field
                                        ? this.state.vote_outcome_field
                                        : ""
                                    }
                                  >
                                    <Select
                                      placeHolder=""
                                      options={["Yes", "No", "Abstain"]}
                                      value={this.state.vote_outcome}
                                      onChange={e =>
                                        this.setState({
                                          vote_outcome: e.option,
                                          yes_vote_count: yes_vote_count,
                                          no_vote_count: no_vote_count,
                                          abstain_vote_count: abstain_vote_count
                                        })
                                      }
                                    />
                                  </FormField>
                                </Box>
                                <br />
                                <Box>
                                  {this.state.voted.length === 0 && (
                                    <Footer align="center" justify="center">
                                      <Menu
                                        inline
                                        direction="row"
                                        responsive={false}
                                      >
                                        <Button
                                          label="Vote"
                                          onClick={() => this._voteQuestion()}
                                        />
                                      </Menu>
                                    </Footer>
                                  )}
                                  {this.state.voted.length > 0 && (
                                    <Footer align="center" justify="center">
                                      <Menu
                                        inline
                                        direction="row"
                                        responsive={false}
                                      >
                                        <Button
                                          label="Change Vote"
                                          onClick={() => this._voteQuestion()}
                                        />
                                      </Menu>
                                    </Footer>
                                  )}
                                </Box>
                              </div>
                          </div>
                      </div>
                    )}
                    <br />
                  </div>
                )}
              </Box>
              <Box align="left" pad="medium" margin="small">
                <div>
                  <Heading tag="h2">{this.state.question.title}</Heading>
                  {this.state.currentUser && (
                    <div>
                      {this.state.currentUser.role === "Admin" && (
                        <Anchor
                          href={`/questions/${this.state.question.id}/edit`}
                        >
                          Edit question
                        </Anchor>
                      )}
                    </div>
                  )}
                  <Heading tag="h4">
                    Posted on:{" "}
                    <Timestamp value={this.state.question.created_on} fields="date" />
                  </Heading>
                  <Markdown content={this.state.question.description} />
                  <Divider />
                  <Columns size="medium" align="center" justify="center">
                    <Box margin="small" justify="center">
                      <Heading tag="h3" align="center">
                        Yes - {this.state.yes_vote_count}
                      </Heading>
                      {yes_votes && (
                        <Table>
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Shares</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.map(res => {
                              return (
                                <TableRow>
                                  <td>
                                    <Anchor
                                      href={`/profile/${res.id}`}
                                      label={`${res.name} ${
                                        res.work_badge == true ? "💼" : ""
                                      } ${
                                        res.friend_badge == true ? "🙌" : ""
                                      }`}
                                    />
                                  </td>
                                  <td>{res.shares}</td>
                                </TableRow>
                              );
                            })}
                          </tbody>
                        </Table>
                      )}
                    </Box>
                    <Box margin="small" justify="center">
                      <Heading tag="h3" align="center">
                        No - {this.state.no_vote_count}
                      </Heading>
                      {no_votes && (
                        <Table>
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Shares</th>
                            </tr>
                          </thead>
                          <tbody>
                            {no_result.map(res => {
                              return (
                                <TableRow>
                                  <td>
                                    <Anchor
                                      href={`/profile/${res.id}`}
                                      label={`${res.name} ${
                                        res.work_badge == true ? "💼" : ""
                                      } ${
                                        res.friend_badge == true ? "🙌" : ""
                                      }`}
                                    />
                                  </td>
                                  <td>{res.shares}</td>
                                </TableRow>
                              );
                            })}
                          </tbody>
                        </Table>
                      )}
                    </Box>
                  </Columns>
                  <div key={this.state.comment_counter}>
                    <Divider />
                    <Heading tag="h3">Comments</Heading>
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
                                {comment.user.name} (owns {comment.user.shares}{" "}
                                shares)
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
                                  {this.state.currentUser.role === "Admin" && (
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
                                  <Box key={n} className={styles.commentReply}>
                                    <Anchor
                                      href={`/profile/${comment_info.user.id}`}
                                    >
                                      {comment_info.user.name} (owns{" "}
                                      {comment_info.user.shares} shares)
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
                                    {this.state.currentUser.role === "Admin" && (
                                      <div>
                                        {comment_info.user.id !==
                                          this.state.currentUser.id && (
                                          <Anchor
                                            onClick={() =>
                                              _deleteComment(
                                                comment_info.id
                                              )
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
                                              this._deleteComment(comment_info.id)
                                            }
                                          >
                                            Delete comment
                                          </Anchor>
                                        )}
                                        {this.state.currentUser.role === "Admin" && (
                                          <div>
                                            {comment_info.user.id !==
                                              this.state.currentUser.id && (
                                              <Anchor
                                                onClick={() =>
                                                  this._deleteComment(comment_info.id)
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
                              {this.state.approved === null && (
                                <div>
                                  {this.state.currentUser && (
                                    <div>
                                      {this.state.reply_id == comment.id && (
                                        <div className={styles.commentReply}>
                                          <FormField
                                            help="Post comment on question"
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
                                              label="Create"
                                              type="submit"
                                              primary
                                              onClick={() =>
                                                this._submitComment(comment.id)
                                              }
                                            />
                                          </Footer>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}
                            </Box>
                          );
                        })}
                      </div>
                    )}
                    {this.state.question && (
                      <div>
                        {this.state.approved === null && (
                          <div>
                            {this.state.currentUser != "None" && (
                              <div>
                                <FormField
                                  help="Post comment on question"
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
                                    label="Create"
                                    type="submit"
                                    primary
                                    onClick={() => this._submitComment()}
                                  />
                                </Footer>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Box>
            </Columns>
          </Section>
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
          {this.state.voteToast === true && (
            <Toast
              status="ok"
              key={1}
              onClose={() => {
                this.toggleVoteToast();
              }}
            >
              Your vote has been submitted
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
        </Box>
      </Box>
      <AppFooter />
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

  _voteQuestion = async function() {
    const vote_type = this.state.vote_outcome;
    const id = parseInt(this.props.props.params.id);
    this.setState({ vote_type_field: null, errors: null });
    const result = await this.props
      .createVote({
        variables: {
          id,
          vote_type
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
      const axiosGitHubGraphQL = axios.create({
        baseURL: `${
          process.env.NODE_ENV === "development"
            ? "https://personly-api.herokuapp.com/graphql"
            : "https://api.jamesg.app/graphql"
        }`
      });
      const YES_QUERY = `{ getVotes(id: ${parseInt(
        this.props.props.params.id
      )}) { id user { id name friend_badge work_badge } shares vote_type } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: YES_QUERY }
        )
        .then(result => {
          this.setState({ votes: result.data.data.getVotes });
        });
      const axiosGitHubGraphQLAuth = axios.create({
        baseURL: `${
          process.env.NODE_ENV === "development"
            ? "https://personly-api.herokuapp.com/graphql"
            : "https://api.jamesg.app/graphql"
        }`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        }
      });

      const VOTED_QUERY = `{ getVotes(id: ${parseInt(
        this.props.props.params.id
      )}, user: ${parseInt(this.state.currentUser.id)}) {
          id
          user {
            id
            name
            shares
            friend_badge
            work_badge
          }
          vote_type
        }}`;

      axiosGitHubGraphQLAuth
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: VOTED_QUERY }
        )
        .then(result => {
          this.setState({
            voted: result.data.data.getVotes,
            getSecondData: true
          });
        });
      var no_votes = this.state.votes.filter(function(vote) {
        return vote ? vote.vote_type === "No" : null;
      });
      var yes_votes = this.state.votes.filter(function(vote) {
        return vote ? vote.vote_type === "Yes" : null;
      });
      var abstain_votes = this.state.votes.filter(function(vote) {
        return vote ? vote.vote_type === "Abstain" : null;
      });
      if (vote_type === "Yes") {
        this.setState({
          yes_vote_count:
            parseInt(this.state.yes_vote_count) +
            parseInt(this.state.currentUser.shares)
        });
      }
      if (vote_type === "No") {
        this.setState({
          no_vote_count:
            parseInt(this.state.no_vote_count) +
            parseInt(this.state.currentUser.shares)
        });
      }
      if (vote_type === "Abstain") {
        this.setState({
          abstain_vote_count:
            parseInt(this.state.abstain_vote_count) +
            parseInt(this.state.currentUser.shares)
        });
      }
      this.toggleVoteToast();
    }
  };
}

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($id: Int!, $body: String!, $reply_id: Int) {
    createComment(id: $id, body: $body, reply_id: $reply_id) {
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

const CREATE_VOTE_MUTATION = gql`
  mutation CreateVote($id: Int!, $vote_type: String!) {
    createVote(id: $id, vote_type: $vote_type) {
      id
    }
  }
`;

export default compose(
  graphql(CREATE_COMMENT_MUTATION, { name: "createComment" }),
  graphql(DELETE_COMMENT_MUTASTION, { name: "deleteComment" }),
  graphql(CREATE_VOTE_MUTATION, { name: "createVote" })
)(QuestionContainer);
