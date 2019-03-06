import React, { Component } from "react";
import Box from "grommet/components/Box";
import Section from "grommet/components/Section";
import Status from "grommet/components/icons/Status";
import Heading from "grommet/components/Heading";
import Anchor from "grommet/components/Anchor";
import Title from "grommet/components/Title";
import Image from "grommet/components/Image";
import Hero from "grommet/components/Hero";
import Toast from "grommet/components/Toast";
import Timestamp from "grommet/components/Timestamp";
import Paragraph from "grommet/components/Paragraph";
import FormField from "grommet/components/FormField";
import FormFields from "grommet/components/FormFields";
import Tabs from "grommet/components/Tabs";
import Tab from "grommet/components/Tab";
import Button from "grommet/components/Button";
import Header from "grommet/components/Header";
import Columns from "grommet/components/Columns";
import Select from "grommet/components/Select";
import Footer from "grommet/components/Footer";
import Menu from "grommet/components/Menu";
import Layer from "grommet/components/Layer";
import CheckmarkIcon from "grommet/components/icons/base/Checkmark";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { graphql, compose } from "react-apollo";
import regeneratorRuntime from "regenerator-runtime";
import gql from "graphql-tag";
import axios from "axios";
import { reduxForm } from "redux-form";
import { ThumbnailImage, Wrapper } from "./styles";
import { MainBox, FullSection } from "./styles";
import { Navbar, AppFooter } from "components";
import { NotFoundContainer } from "containers";
import { Divider, LoadingIndicator, QuestionList } from "components";
import styles from "./index.module.scss";

class PersonContainer extends Component {
  constructor() {
    super();
    this.state = {
      getData: false,
      votes: [],
      questions: [],
      isLoading: true,
      order_type: "Buy"
    };
  }

  componentDidMount() {
    if (this.state.getData === false) {
      const axiosGitHubGraphQL = axios.create({
        baseURL: `${
          process.env.NODE_ENV === "development"
            ? "https://personly-api.herokuapp.com/graphql"
            : "https://personly-api.herokuapp.com/graphql"
        }`
      });

      const PROFILE_QUERY = `{ getUsers(id: ${
        this.props.props.params.id
      }) { id name listing_description profile_picture header_image_url shares_issued } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://personly-api.herokuapp.com/graphql"
          }`,
          { query: PROFILE_QUERY }
        )
        .then(result => {
          this.setState({
            user: result.data.data.getUsers[0]
          });
        })
        .catch(error => {
          this.setState({ not_found: true });
        });

      const MAIN_QUERY = `{ getQuestions(user: ${
        this.props.props.params.id
      }) { id title created_on approved closes } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://personly-api.herokuapp.com/graphql"
          }`,
          { query: MAIN_QUERY }
        )
        .then(result => {
          this.setState({
            questions: result.data.data.getQuestions
          });
        });

      const SECOND_QUERY = `{ getVotes(user: ${
        this.props.props.params.id
      }) { id question { id } user { name } shares vote_type } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://personly-api.herokuapp.com/graphql"
          }`,
          { query: SECOND_QUERY }
        )
        .then(result => {
          this.setState({
            votes: result.data.data.getVotes
          });
        });

      const TODAY_QUERY = `{ getTradesToday(user: ${
        this.props.props.params.id
      }) { id trade_type shares price share_price created_at } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://personly-api.herokuapp.com/graphql"
          }`,
          { query: TODAY_QUERY }
        )
        .then(result => {
          this.setState({ today_trades: result.data.data.getTradesToday });
        });

      const YESTERDAY_QUERY = `{ getTradesYesterday(user: ${
        this.props.props.params.id
      }) { id trade_type shares price share_price created_at } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://personly-api.herokuapp.com/graphql"
          }`,
          { query: YESTERDAY_QUERY }
        )
        .then(result => {
          this.setState({
            yesterday_trades: result.data.data.getTradesYesterday
          });
        });

      const UPDATES_QUERY = `{ getUpdates(user: ${
        this.props.props.params.id
      }) { id title created_on } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://personly-api.herokuapp.com/graphql"
          }`,
          { query: UPDATES_QUERY }
        )
        .then(result => {
          this.setState({
            updates: result.data.data.getUpdates
          });
        });

      const TRADES_QUERY = `{ getTrades(user: ${
        this.props.props.params.id
      }) { id trade_type shares price share_price created_at } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://personly-api.herokuapp.com/graphql"
          }`,
          { query: TRADES_QUERY }
        )
        .then(result => {
          this.setState({
            trades: result.data.data.getTrades,
            getData: true,
            isLoading: false
          });
        })
        .catch(error => {
          this.setState({
            trades: [],
            getData: true,
            isLoading: false
          });
        });
    }
  }

  toggleInvestModal() {
    this.setState({
      investModal: !this.state.investModal
    });
  }

  toggleInvestToast() {
    this.setState({
      investToast: !this.state.investToast
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

    var data = this.state.trades.map(function(vote) {
      var date = Date.parse(vote.created_at);
      return [date, parseFloat(vote.share_price)];
    });

    var new_data = this.state.today_trades.map(function(vote) {
      var date = Date.parse(vote.created_at);
      return [date, parseFloat(vote.share_price)];
    });

    var yesterday_data = this.state.yesterday_trades.map(function(vote) {
      var date = Date.parse(vote.created_at);
      return [date, parseFloat(vote.share_price)];
    });

    const options = {
      series: [
        {
          data: data,
          name: "JG",
          type: "area",
          threshold: null,
          tooltip: {
            valueDecimals: 2
          }
        }
      ]
    };

    return (
      <div>
        <Box className={styles.container}>
          <Hero
            justify="center"
            align="center"
            backgroundColorIndex="dark"
            background={
              <Image
                fit="cover"
                full={true}
                src={this.state.user.header_image_url}
              />
            }
            size="small"
          >
            <Box direction="row" justify="center" align="center">
              <Box basis="1/2" align="end" pad="medium">
                <Wrapper imageSize={200}>
                  <ThumbnailImage src={this.state.user.profile_picture} />
                </Wrapper>
              </Box>
              <Box basis="1/2" align="start" pad="medium" colorIndex="grey-2-a">
                <Heading margin="none">{this.state.user.name}</Heading>
                <br />
                <Button
                  label="Invest"
                  onClick={() => this.toggleInvestModal()}
                />
              </Box>
            </Box>
          </Hero>
          <Section align="center" justify="center">
            <Tabs>
              <Tab title='About'>
                <Columns size="large" justify="center">
                  <Box>
                    <Title align="left" tag="h2">
                      About
                    </Title>
                    <Paragraph>{this.state.user.listing_description}</Paragraph>
                  </Box>
                  <Box>
                    <Title align="left" tag="h2">
                      Trade
                    </Title>
                    <HighchartsReact
                      highcharts={Highcharts}
                      constructorType={"stockChart"}
                      options={options}
                    />
                    {data.length > 0 && (
                      <Title tag="h1" align="center">
                        ${data[0][1]}
                      </Title>
                    )}
                    {data.length > 0 && (
                      <Title tag="h4" align="center">
                        Market cap: ${this.state.user.shares_issued * data[0][1]}
                      </Title>
                    )}
                    {data.length === 0 && (
                      <Title tag="h4" align="center">
                        Market cap: $0
                      </Title>
                    )}
                    {new_data.length > 1 && (
                      <Box align="center" justify="center">
                        {new_data[0][1] - new_data[new_data.length - 1][1] > 0 && (
                          <Box colorIndex="ok" pad="small">
                            <Anchor>
                              +$
                              {parseFloat(
                                new_data[0][1] - yesterday_data[0][1]
                              ).toFixed(2)}{" "}
                              | +
                              {parseFloat(
                                ((new_data[0][1] - yesterday_data[0][1]) /
                                  new_data[0][1]) *
                                  100
                              ).toFixed(2)}
                              %
                            </Anchor>
                          </Box>
                        )}
                        {new_data[0][1] - new_data[new_data.length - 1][1] < 0 && (
                          <Box colorIndex="critical" pad="small">
                            <Anchor>
                              -$
                              {parseFloat(
                                new_data[0][1] - yesterday_data[0][1]
                              ).toFixed(2)}{" "}
                              | -
                              {parseFloat(
                                ((new_data[0][1] - yesterday_data[0][1]) /
                                  new_data[0][1]) *
                                  100
                              ).toFixed(2)}
                              %
                            </Anchor>
                          </Box>
                        )}
                        {new_data[0][1] - new_data[new_data.length - 1][1] ===
                          0 && (
                          <Box colorIndex="unknown" pad="small">
                            <Anchor>
                              $
                              {parseFloat(
                                new_data[0][1] - yesterday_data[0][1]
                              ).toFixed(2)}{" "}
                              | 0%
                            </Anchor>
                          </Box>
                        )}
                      </Box>
                    )}
                    {new_data.length === 1 && (
                      <Box align="center" justify="center">
                        {new_data[0][1] > 0 && (
                          <Box colorIndex="ok" pad="small">
                            <Anchor>
                              +$
                              {parseFloat(
                                new_data[0][1] - yesterday_data[0][1]
                              ).toFixed(2)}{" "}
                              | +
                              {parseFloat(
                                ((new_data[0][1] - yesterday_data[0][1]) /
                                  new_data[0][1]) *
                                  100
                              ).toFixed(2)}
                              %
                            </Anchor>
                          </Box>
                        )}
                        {new_data[0][1] < 0 && (
                          <Box colorIndex="critical" pad="small">
                            <Anchor>
                              -$
                              {parseFloat(
                                new_data[0][1] - yesterday_data[0][1]
                              ).toFixed(2)}{" "}
                              | -
                              {parseFloat(
                                ((new_data[0][1] - yesterday_data[0][1]) /
                                  new_data[0][1]) *
                                  100
                              ).toFixed(2)}
                              %
                            </Anchor>
                          </Box>
                        )}
                        {new_data[0][1] === 0 && (
                          <Box colorIndex="unknown" pad="small">
                            <Anchor>
                              $
                              {parseFloat(
                                new_data[0][1] - yesterday_data[0][1]
                              ).toFixed(2)}{" "}
                              | 0%
                            </Anchor>
                          </Box>
                        )}
                      </Box>
                    )}
                    {new_data.length === 0 && (
                      <Box colorIndex="unknown" pad="small" align="center">
                        <Anchor>$0 | 0%</Anchor>
                      </Box>
                    )}
                  </Box>
                </Columns>
              </Tab>
              <Tab title='Questions'>
                <Columns size="large" justify="center">
                  <Box>
                    <Title align="center" tag="h2">
                      Questions
                    </Title>
                    {this.state.questions.length === 0 && (
                      <Title align="center" tag="h5">
                        No questions have been posted yet.
                      </Title>
                    )}
                    {this.state.questions.length > 0 && (
                      <div>
                        {this.state.questions.map(question => {
                          if (this.state.votes.length > 1) {
                            var question_votes = this.state.votes.filter(function(
                              vote
                            ) {
                              return vote ? vote.question.id === question.id : null;
                            });
                            var no_votes = question_votes.filter(function(vote) {
                              return vote ? vote.vote_type === "No" : null;
                            });
                            var yes_votes = question_votes.filter(function(vote) {
                              return vote ? vote.vote_type === "Yes" : null;
                            });
                            var abstain_votes = question_votes.filter(function(
                              vote
                            ) {
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
                            var abstain_votes_question = abstain_votes.map(function(
                              vote
                            ) {
                              abstain_votes_array_new.push(vote.shares);
                              return vote.shares;
                            });
                            var no_vote_count = no_votes_array_new.reduce(
                              (vote, i) => {
                                return i + vote;
                              },
                              0
                            );
                            var yes_vote_count = yes_votes_array_new.reduce(
                              (vote, i) => {
                                return i + vote;
                              },
                              0
                            );
                            var abstain_vote_count = abstain_votes_array_new.reduce(
                              (vote, i) => {
                                return i + vote;
                              },
                              0
                            );
                            var vote_count =
                              no_vote_count + yes_vote_count + abstain_vote_count;
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
                                (abstain_vote_count / vote_count) * 100;
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
                                        <Status value="ok" /> Q: {question.title}{" "}
                                        Closed{" "}
                                        <Timestamp
                                          value={question.closes}
                                          fields="date"
                                        />
                                      </Heading>
                                    )}
                                    {question.approved === "false" && (
                                      <Heading tag="h3">
                                        <Status value="critical" /> Q:{" "}
                                        {question.title} Closed{" "}
                                        <Timestamp
                                          value={question.closes}
                                          fields="date"
                                        />
                                      </Heading>
                                    )}
                                  </div>
                                )}
                                {!question.approved && (
                                  <div>
                                    <Heading tag="h3">
                                      <Status value="unknown" /> Q: {question.title}{" "}
                                      Closes{" "}
                                      <Timestamp
                                        value={question.closes}
                                        fields="date"
                                      />
                                    </Heading>
                                  </div>
                                )}
                                <Anchor href={`/questions/${question.id}`}>
                                  [ Yes:{" "}
                                  {parseFloat(yes_question_votes_total).toFixed(2)}%
                                  | No:{" "}
                                  {parseFloat(no_question_votes_total).toFixed(2)}%
                                  | Abstain:{" "}
                                  {parseFloat(abstain_question_votes_total).toFixed(
                                    2
                                  )}
                                  % ] Read more
                                </Anchor>
                              </Box>
                              <br />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </Box>
                  <Box>
                    <Title align="center" tag="h2">
                      Updates
                    </Title>
                    {this.state.updates.length === 0 && (
                      <Title align="center" tag="h5">
                        No updates have been posted yet.
                      </Title>
                    )}
                    {this.state.updates.length > 0 && (
                      <div>
                        {this.state.updates.map(update => {
                          return (
                            <Box>
                              <Timestamp value={update.created_on} fields="date" />
                              <div>
                                <Heading tag="h3">{update.title}</Heading>
                              </div>
                              <Anchor href={`/updates/${update.id}`}>
                                Read more
                              </Anchor>
                            </Box>
                          );
                        })}
                      </div>
                    )}
                  </Box>
                </Columns>
              </Tab>
            </Tabs>
          </Section>
        </Box>
        {this.state.investToast === true && (
          <Toast
            status="ok"
            key={1}
            onClose={() => {
              this.toggleInvestToast();
            }}
          >
            Your order has been submitted
          </Toast>
        )}
        {this.state.errorToast == true && (
          <Toast
            status="critical"
            onClose={() => {
              this.toggleErrorToast();
            }}
          >
            You have insufficient funds / shares to make this transaction.
          </Toast>
        )}
        {this.state.investModal === true && (
          <Layer
            closer={true}
            overlayClose={true}
            onClose={() => this.toggleInvestModal()}
          >
            <Box pad="large">
              <FormFields>
                <Header>
                  <Heading>Create Order</Heading>
                </Header>
                <Section pad={{ vertical: "medium" }}>
                  <Paragraph align="center" justify="center">
                    Note: A trading fee of $0.02 is applied per share purchased
                  </Paragraph>
                  <Box size="medium">
                    <FormField
                      label="Order Type *"
                      htmlFor="order_type"
                      className={styles.formField}
                      error={
                        this.state.order_type_field
                          ? this.state.order_type_field
                          : ""
                      }
                    >
                      <Select
                        placeHolder=""
                        options={["Buy", "Sell"]}
                        value={this.state.order_type}
                        onChange={e => this.setState({ order_type: e.option })}
                        className={styles.input}
                      />
                    </FormField>
                  </Box>
                </Section>
                <Section pad={{ vertical: "medium" }}>
                  <Box size="medium">
                    <FormField
                      label="Share Amount *"
                      htmlFor="name"
                      className={styles.formField}
                      error={
                        this.state.shares_field ? this.state.shares_field : ""
                      }
                    >
                      <input
                        required
                        id="shares"
                        name="shares"
                        defaultValue={this.state.shares}
                        type="number"
                        onChange={e =>
                          this.setState({ shares: e.target.value })
                        }
                        className={styles.input}
                      />
                    </FormField>
                  </Box>
                </Section>
                <Footer>
                  <Menu inline direction="row" responsive={false}>
                    <Button
                      label="Create Order"
                      style={{ marginTop: 10, marginLeft: 5 }}
                      onClick={() => {
                        this._createOrder();
                      }}
                      icon={<CheckmarkIcon />}
                    />
                  </Menu>
                </Footer>
              </FormFields>
            </Box>
          </Layer>
        )}
      </div>
    );
  }

  _createOrder = async function() {
    const new_shares = this.state.shares;
    const shares = parseInt(new_shares);
    const trade_type = this.state.order_type;
    const user = parseInt(this.props.props.params.id);
    this.setState({
      shares_field: "",
      errors: ""
    });
    await this.props
      .placeOrder({
        variables: {
          shares,
          trade_type,
          user
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
      this.toggleErrorToast();
    }
    if (!this.state.errors) {
      var axiosGitHubGraphQL = axios.create({
        baseURL: "https://personly-api.herokuapp.com/graphql"
      });

      const TRADES_QUERY = `{ getTrades { id trade_type shares price share_price created_at } }`;

      axiosGitHubGraphQL
        .post("https://personly-api.herokuapp.com/graphql", {
          query: TRADES_QUERY
        })
        .then(result => {
          this.setState({ trades: result.data.data.getTrades, getData: true });
        })
        .catch(error => {
          this.setState({ trades: [], getData: true });
        });

      var axiosGitHubGraphQLAuth = axios.create({
        baseURL: "https://personly-api.herokuapp.com/graphql",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        }
      });

      const THIRD_QUERY = `{ getCurrentUser { id name balance shares } }`;

      axiosGitHubGraphQLAuth
        .post("https://personly-api.herokuapp.com/graphql", {
          query: THIRD_QUERY
        })
        .then(result => {
          this.setState({
            currentUser: result.data.data.getCurrentUser[0],
            getData: true
          });
        })
        .catch(error => {
          this.setState({ currentUser: "none", getData: true });
        });
      this.toggleInvestToast();
    }
  };
}

const PLACE_ORDER = gql`
  mutation CreateTrade($trade_type: String!, $shares: Int, $user: Int) {
    createTrade(trade_type: $trade_type, shares: $shares, user: $user) {
      id
    }
  }
`;

export default compose(graphql(PLACE_ORDER, { name: "placeOrder" }))(
  PersonContainer
);
