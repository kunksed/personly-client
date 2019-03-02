import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import Status from 'grommet/components/icons/Status';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Title from 'grommet/components/Title';
import Timestamp from 'grommet/components/Timestamp';
import Paragraph from 'grommet/components/Paragraph';
import Columns from 'grommet/components/Columns';
import axios from 'axios';
import { reduxForm } from 'redux-form';
import { MainBox, FullSection } from './styles';
import { Navbar, AppFooter } from "components";
import { Divider, LoadingIndicator, QuestionList } from 'components';
import styles from './index.module.scss';

class QuestionsContainer extends Component {
  constructor() {
    super();
    this.state = {
      getData: false,
      votes: [],
      questions: null,
      isLoading: true
    };
  }
  render() {
    if (this.state.getData === false) {
      const axiosGitHubGraphQL = axios.create({
        baseURL: `${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`,
      });

      const MAIN_QUERY =
        '{ getQuestions(limit: 100) { id title created_on approved closes } }';

      axiosGitHubGraphQL
        .post(`${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`, { query: MAIN_QUERY })
        .then(result => {
          this.setState({
            questions: result.data.data.getQuestions,
          });
        });

      const SECOND_QUERY =
        '{ getVotes { id question { id } user { name } shares vote_type } }';

      axiosGitHubGraphQL
        .post(`${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`, { query: SECOND_QUERY })
        .then(result => {
          this.setState({ votes: result.data.data.getVotes, getData: true, isLoading: false });
        })
        .catch(error => {
          this.setState({ getData: true, isLoading: false });
        });
    }

    if (this.state.isLoading === true) {
      return (
        <div />
      );
    }

    return (
      <div>
        <Navbar pathname={this.props.props.pathname} />
      <Box className={styles.container}>
        <Section align="center" justify="center">
          <Title align="center" tag="h1">
            Questions
          </Title>
          <Paragraph>
            Shareholders can vote on measures that affect the future of James.
            The ability to vote on new proposals allows shareholders to make a
            profound impact on James' life, and help him make more informed
            decisions. Each shareholder can vote once per share that they own.
          </Paragraph>
          <Divider />
          {this.state.questions.length === 0 && (
            <Title align="center" tag="h2">
              No questions have been posted yet.
            </Title>
          )}
          {this.state.questions.length > 0 && (
            <div>
              {this.state.questions.map(question => {
                if (this.state.votes.length > 1) {
                    var question_votes = this.state.votes.filter(function(vote) {
                      return vote ? vote.question.id === question.id : null;
                    });
                    var no_votes = question_votes.filter(function(vote) {
                      return vote ? vote.vote_type === "No" : null;
                    });
                    var yes_votes = question_votes.filter(function(vote) {
                      return vote ? vote.vote_type === "Yes" : null;
                    });
                    var abstain_votes = question_votes.filter(function(vote) {
                      return vote ? vote.vote_type === "Abstain" : null;
                    });
                    var no_votes_array_new = []
                    var yes_votes_array_new = []
                    var abstain_votes_array_new = []
                    var no_votes_question = no_votes.map(function(vote) {
                      no_votes_array_new.push(vote.shares)
                      return vote.shares
                    });
                    var yes_votes_question = yes_votes.map(function(vote) {
                      yes_votes_array_new.push(vote.shares)
                      return vote.shares
                    });
                    var abstain_votes_question = abstain_votes.map(function(vote) {
                      abstain_votes_array_new.push(vote.shares)
                      return vote.shares
                    });
                    var no_vote_count = no_votes_array_new.reduce((vote, i) => {
                      return i + vote
                    }, 0)
                    var yes_vote_count = yes_votes_array_new.reduce((vote, i) => {
                      return i + vote
                    }, 0)
                    var abstain_vote_count = abstain_votes_array_new.reduce((vote, i) => {
                      return i + vote
                    }, 0)
                    var vote_count = no_vote_count + yes_vote_count + abstain_vote_count
                  if (yes_vote_count > 0) {
                    var yes_question_votes_total =
                      (yes_vote_count / vote_count) * 100;
                  } else {
                    var yes_question_votes_total = 0;
                  }
                  if (no_vote_count > 0) {
                    var no_question_votes_total =
                      (no_vote_count / vote_count) * 100;
                  } else {
                    var no_question_votes_total = 0;
                  }
                  if (abstain_vote_count > 0) {
                    var abstain_question_votes_total =
                      (abstain_vote_count / vote_count) *
                      100;
                  } else {
                    var abstain_question_votes_total = 0;
                  }
                } else {
                  var yes_question_votes_total = 0;
                  var no_question_votes_total = 0;
                  var abstain_question_votes_total = 0;
                }
                return (
                  <div>
                    <Box>
                      {question.approved && (
                        <div>
                          {question.approved === "true" && (
                            <Heading tag="h3">
                              <Status value="ok" /> Q: {question.title} Closed <Timestamp value={question.closes} fields='date' />
                            </Heading>
                          )}
                          {question.approved === "false" && (
                            <Heading tag="h3">
                              <Status value="critical" /> Q: {question.title} Closed <Timestamp value={question.closes} fields='date' />
                            </Heading>
                          )}
                        </div>
                      )}
                      {!question.approved && (
                        <div>
                          <Heading tag="h3">
                            <Status value="unknown" /> Q: {question.title} Closes <Timestamp value={question.closes} fields='date' />
                          </Heading>
                        </div>
                      )}
                      <Anchor href={`/questions/${question.id}`}>
                        [ Yes: {parseFloat(yes_question_votes_total).toFixed(2)}% | No:{' '}
                        {parseFloat(no_question_votes_total).toFixed(2)}% | Abstain:{' '}
                        {parseFloat(abstain_question_votes_total).toFixed(2)}% ] Read more
                      </Anchor>
                    </Box>
                    <br />
                  </div>
                );
              })}
            </div>
          )}
        </Section>
      </Box>
      <AppFooter />
    </div>
    );
  }
}
export default QuestionsContainer;
