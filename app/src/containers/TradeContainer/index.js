import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import cssModules from "react-css-modules";
import Box from "grommet/components/Box";
import Section from "grommet/components/Section";
import Hero from "grommet/components/Hero";
import Headline from "grommet/components/Headline";
import Status from "grommet/components/icons/Status";
import Footer from "grommet/components/Footer";
import Button from "grommet/components/Button";
import Heading from "grommet/components/Heading";
import Menu from "grommet/components/Menu";
import CheckmarkIcon from "grommet/components/icons/base/Checkmark";
import Image from "grommet/components/Image";
import FormField from "grommet/components/FormField";
import Toast from "grommet/components/Toast";
import Anchor from "grommet/components/Anchor";
import Timestamp from "grommet/components/Timestamp";
import Paragraph from "grommet/components/Paragraph";
import Columns from "grommet/components/Columns";
import Table from "grommet/components/Table";
import TableRow from "grommet/components/TableRow";
import Title from "grommet/components/Title";
import { Maybe } from "functional-components";
import { Helmet } from "react-helmet";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { graphql, compose } from "react-apollo";
import regeneratorRuntime from "regenerator-runtime";
import gql from "graphql-tag";
import axios from "axios";
import { reduxForm } from "redux-form";
import { MainBox, FullSection } from "./styles.js";
import { Divider, LoadingIndicator } from "components";
import * as LandingActionCreators from "./actions";
import { Navbar, AppFooter } from "components";
import styles from "./index.module.scss";

class TradeContainer extends Component {
  constructor() {
    super();
    this.state = {
      questions: "",
      getData: false,
      shares: 0,
      currentUser: "none",
      trades: null
    };
  }

  toggleOrderCreated() {
    this.setState({
      orderCreated: !this.state.orderCreated
    });
  }

  componentDidMount() {
    if (this.state.getData === false) {
      const axiosGitHubGraphQL = axios.create({
        baseURL: `${
          process.env.NODE_ENV === "development"
            ? "https://jamesg-test.herokuapp.com/graphql"
            : "https://api.jamesg.app/graphql"
        }`
      });

      const MAIN_QUERY = `{ getTradesToday { id trade_type shares price share_price created_at } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://jamesg-test.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: MAIN_QUERY }
        )
        .then(result => {
          this.setState({ today_trades: result.data.data.getTradesToday });
        });

      const YESTERDAY_QUERY = `{ getTradesYesterday { id trade_type shares price share_price created_at } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://jamesg-test.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: YESTERDAY_QUERY }
        )
        .then(result => {
          this.setState({
            yesterday_trades: result.data.data.getTradesYesterday
          });
        });

      const TRADES_QUERY = `{ getTrades { id trade_type shares price share_price created_at } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://jamesg-test.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: TRADES_QUERY }
        )
        .then(result => {
          this.setState({ trades: result.data.data.getTrades });
        })
        .catch(error => {
          this.setState({ trades: [] });
        });

      const OPEN_TRADES_QUERY = `{ getOpenTrades(limit: 20) { id trade_type shares price share_price created_at } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://jamesg-test.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: OPEN_TRADES_QUERY }
        )
        .then(result => {
          this.setState({ open_trades: result.data.data.getOpenTrades });
        })
        .catch(error => {
          this.setState({ open_trades: [] });
        });

      var axiosGitHubGraphQLAuth = axios.create({
        baseURL: `${
          process.env.NODE_ENV === "development"
            ? "https://jamesg-test.herokuapp.com/graphql"
            : "https://api.jamesg.app/graphql"
        }`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        }
      });

      const THIRD_QUERY = `{ getCurrentUser { id name balance shares } }`;

      axiosGitHubGraphQLAuth
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://jamesg-test.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: THIRD_QUERY }
        )
        .then(result => {
          this.setState({
            currentUser: result.data.data.getCurrentUser[0],
            getData: true
          });
        });
    }
  }

  toggleErrorToast() {
    this.setState({
      errorToast: !this.state.errorToast
    });
  }

  render() {
    if (!this.state.trades) {
      return (
        <div />
      );
    }

    if (!this.state.today_trades) {
      return (
        <div />
      );
    }

    if (!this.state.yesterday_trades) {
      return (
        <div />
      );
    }

    if (!this.state.open_trades) {
      return (
        <div />
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

    var buy_trades = this.state.open_trades.filter(trade => {
      return trade ? trade.trade_type == "Buy" : null;
    });

    var sell_trades = this.state.open_trades.filter(trade => {
      return trade ? trade.trade_type == "Sell" : null;
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
        <Navbar pathname={this.props.props.pathname} />
            <Helmet>
                <meta charSet="utf-8" />
                <title>JamesG.app - Trade</title>
                <meta name="description" content="Purchase shares in JamesG." />
                <meta property="og:url" content="https://jamesg.app/trade" />
                <meta property="og:title" content="JamesG.app - Trade" />
                <meta property="og:description" content="Purchase shares in JamesG." />
                <meta property="twitter:url" content="https://jamesg.app/questions/4" />
                <meta property="twitter:title" content="JamesG.app - Trade" />
                <meta property="twitter:description" content="Purchase shares in JamesG." />
            </Helmet>
      <MainBox className={styles.container}>
        <FullSection primary direction="row">
          <Box full="horizontal">
            <Section align="center" justify="center">
              <HighchartsReact
                highcharts={Highcharts}
                constructorType={"stockChart"}
                options={options}
              />
              <Paragraph align="center" justify="center">
                Note: A trading fee of $0.02 is applied per share purchased
              </Paragraph>
              <Box direction="row">
                {data && <Title tag="h1">${data[0][1]}</Title>}
                {new_data.length > 1 && (
                  <Box>
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
                  <Box>
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
                  <Box colorIndex="unknown" pad="small">
                    <Anchor>$0 | 0%</Anchor>
                  </Box>
                )}
              </Box>
              <Divider />
              {this.state.currentUser === "none" && (
                <Title tag="h3">
                  <Anchor href="/register">
                    Register an account to get started!
                  </Anchor>
                </Title>
              )}
              {this.state.currentUser !== "none" && (
                <Title tag="h3">
                  Your balance: $
                  {parseFloat(this.state.currentUser.balance).toFixed(2)} |
                  {this.state.currentUser.shares} &nbsp; shares
                </Title>
              )}
            </Section>
            {this.state.currentUser != "none" && (
              <Columns
                size="large"
                align="center"
                justify="center"
                className={styles.bottomColumn}
              >
                <Box align="left" margin="small" justify="center">
                  {process.env.AUCTION === false && (
                    <div>
                      <Heading tag="h3">Buy shares</Heading>
                      <Table>
                        <thead>
                          <tr>
                            <th>Shares</th>
                            <th>Price per Share</th>
                            <th>Trade Number</th>
                          </tr>
                        </thead>
                        <tbody>
                          <TableRow>
                            <td>
                              <FormField
                                label="Trade Number *"
                                htmlFor="name"
                                className={styles.formField}
                                error={
                                  this.state.shares_field
                                    ? this.state.shares_field
                                    : ""
                                }
                              >
                                <input
                                  required
                                  id="shares"
                                  name="shares"
                                  defaultValue={this.state.trade_id}
                                  type="number"
                                  onChange={e =>
                                    this.setState({ trade_id: e.target.value })
                                  }
                                  className={styles.input}
                                />
                              </FormField>
                            </td>
                            <td />
                            <td>
                              <Button
                                label="Buy"
                                style={{ marginTop: 10, marginLeft: 5 }}
                                onClick={() => {
                                  this._completeOffer();
                                }}
                                icon={<CheckmarkIcon />}
                              />
                            </td>
                          </TableRow>
                          {buy_trades.map(trades => {
                            return (
                              <TableRow>
                                <td>{trades.shares}</td>
                                <td>
                                  ${parseFloat(trades.share_price).toFixed(2)}
                                </td>
                                <td>#{trades.id}</td>
                              </TableRow>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  )}
                  <Heading tag="h3">Create a buy offer</Heading>
                  <Paragraph>Offer to buy shares from shareholders.</Paragraph>
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
                        label="Create Buy Offer"
                        style={{ marginTop: 10, marginLeft: 5 }}
                        onClick={() => {
                          this._buyShares();
                        }}
                        icon={<CheckmarkIcon />}
                      />
                    </Menu>
                  </Footer>
                </Box>
                <Box align="left" margin="small">
                  <Heading tag="h3">Sell shares</Heading>
                  <Table>
                    <thead>
                      <tr>
                        <th>Shares</th>
                        <th>Price per Share</th>
                        <th>Trade Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      <TableRow>
                        <td>
                          <FormField
                            label="Trade Number *"
                            htmlFor="name"
                            className={styles.formField}
                            error={
                              this.state.shares_field
                                ? this.state.shares_field
                                : ""
                            }
                          >
                            <input
                              required
                              id="shares"
                              name="shares"
                              defaultValue={this.state.trade_id}
                              type="number"
                              onChange={e =>
                                this.setState({ trade_id: e.target.value })
                              }
                              className={styles.input}
                            />
                          </FormField>
                        </td>
                        <td />
                        <td>
                          <Button
                            label="Sell"
                            style={{ marginTop: 10, marginLeft: 5 }}
                            onClick={() => {
                              this._completeOffer();
                            }}
                            icon={<CheckmarkIcon />}
                          />
                        </td>
                      </TableRow>
                      {sell_trades.map(trades => {
                        return (
                          <TableRow>
                            <td>{trades.shares}</td>
                            <td>
                              ${parseFloat(trades.share_price).toFixed(2)}
                            </td>
                            <td>#{trades.id}</td>
                          </TableRow>
                        );
                      })}
                    </tbody>
                  </Table>
                  <Heading tag="h3">Create a sell offer</Heading>
                  <Paragraph>
                    Offer to sell shares in your account to shareholders.
                  </Paragraph>
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
                        label="Create Sell Offer"
                        style={{ marginTop: 10, marginLeft: 5 }}
                        onClick={() => {
                          this._sellShares();
                        }}
                        icon={<CheckmarkIcon />}
                      />
                    </Menu>
                  </Footer>
                </Box>
              </Columns>
            )}
            {this.state.orderCreated == true && (
              <Toast
                status="ok"
                key={1}
                onClose={() => {
                  this.toggleOrderCreated();
                }}
              >
                Your order has been submitted
              </Toast>
            )}
            {this.state.offerCreated == true && (
              <Toast
                status="ok"
                key={1}
                onClose={() => {
                  this.toggleOfferCreated();
                }}
              >
                Your offer has been submitted
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
          </Box>
        </FullSection>
      </MainBox>
      <AppFooter />
    </div>
    );
  }
  _buyShares = async function() {
    const new_shares = this.state.shares;
    const shares = parseInt(new_shares);
    const trade_type = "Buy";
    this.setState({
      shares_field: "",
      errors: ""
    });
    await this.props
      .placeOrder({
        variables: {
          shares,
          trade_type
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
        baseURL: "https://jamesg.herokuapp.com/graphql"
      });

      const TRADES_QUERY = `{ getTrades { id trade_type shares price share_price created_at } }`;

      axiosGitHubGraphQL
        .post("https://jamesg.herokuapp.com/graphql", { query: TRADES_QUERY })
        .then(result => {
          this.setState({ trades: result.data.data.getTrades, getData: true });
        })
        .catch(error => {
          this.setState({ trades: [], getData: true });
        });

      var axiosGitHubGraphQLAuth = axios.create({
        baseURL: "https://jamesg.herokuapp.com/graphql",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        }
      });

      const THIRD_QUERY = `{ getCurrentUser { id name balance shares } }`;

      axiosGitHubGraphQLAuth
        .post("https://jamesg.herokuapp.com/graphql", { query: THIRD_QUERY })
        .then(result => {
          this.setState({
            currentUser: result.data.data.getCurrentUser[0],
            getData: true
          });
        })
        .catch(error => {
          this.setState({ currentUser: "none", getData: true });
        });
      this.toggleOrderCreated();
    }
  };

  _sellShares = async function() {
    const new_shares = this.state.shares;
    const shares = parseInt(new_shares);
    const trade_type = "Sell";
    this.setState({
      shares_field: "",
      errors: ""
    });
    await this.props
      .placeOrder({
        variables: {
          shares,
          trade_type
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
        baseURL: "https://jamesg.herokuapp.com/graphql"
      });

      const TRADES_QUERY = `{ getTrades { id trade_type shares price share_price created_at } }`;

      axiosGitHubGraphQL
        .post("https://jamesg.herokuapp.com/graphql", { query: TRADES_QUERY })
        .then(result => {
          this.setState({ trades: result.data.data.getTrades, getData: true });
        })
        .catch(error => {
          this.setState({ trades: [], getData: true });
        });

      var axiosGitHubGraphQLAuth = axios.create({
        baseURL: "https://jamesg.herokuapp.com/graphql",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        }
      });

      const THIRD_QUERY = `{ getCurrentUser { id name balance shares } }`;

      axiosGitHubGraphQLAuth
        .post("https://jamesg.herokuapp.com/graphql", { query: THIRD_QUERY })
        .then(result => {
          this.setState({
            currentUser: result.data.data.getCurrentUser[0],
            getData: true
          });
        })
        .catch(error => {
          this.setState({ currentUser: "none", getData: true });
        });
      this.toggleOrderCreated();
    }
  };

  _completeOffer = async function() {
    const id = this.state.trade_id;
    this.setState({
      shares_field: "",
      errors: ""
    });
    await this.props
      .placeOffer({
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
      this.toggleErrorToast();
    }
    if (!this.state.errors) {
      var axiosGitHubGraphQL = axios.create({
        baseURL: "https://jamesg.herokuapp.com/graphql"
      });

      const TRADES_QUERY = `{ getTrades { id trade_type shares price share_price created_at } }`;

      axiosGitHubGraphQL
        .post("https://jamesg.herokuapp.com/graphql", { query: TRADES_QUERY })
        .then(result => {
          this.setState({ trades: result.data.data.getTrades, getData: true });
        })
        .catch(error => {
          this.setState({ trades: [], getData: true });
        });

      var axiosGitHubGraphQLAuth = axios.create({
        baseURL: "https://jamesg.herokuapp.com/graphql",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        }
      });

      const THIRD_QUERY = `{ getCurrentUser { id name balance shares } }`;

      axiosGitHubGraphQLAuth
        .post("https://jamesg.herokuapp.com/graphql", { query: THIRD_QUERY })
        .then(result => {
          this.setState({
            currentUser: result.data.data.getCurrentUser[0],
            getData: true
          });
        })
        .catch(error => {
          this.setState({ currentUser: "none", getData: true });
        });
      this.toggleOfferCreated();
    }
  };
}

const PLACE_ORDER = gql`
  mutation CreateTrade($trade_type: String!, $shares: Int) {
    createTrade(trade_type: $trade_type, shares: $shares) {
      id
    }
  }
`;

const PLACE_OFFER = gql`
  mutation CompleteTrade($id: Int) {
    completeTrade(id: $id) {
      id
    }
  }
`;

export default compose(
  graphql(PLACE_ORDER, { name: "placeOrder" }),
  graphql(PLACE_OFFER, { name: "placeOffer" })
)(TradeContainer);
