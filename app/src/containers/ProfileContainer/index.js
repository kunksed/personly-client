import React, { Component } from "react";
import Box from "grommet/components/Box";
import Section from "grommet/components/Section";
import Heading from "grommet/components/Heading";
import Image from "grommet/components/Image";
import Anchor from "grommet/components/Anchor";
import Timestamp from "grommet/components/Timestamp";
import Paragraph from "grommet/components/Paragraph";
import Table from "grommet/components/Table";
import TableRow from "grommet/components/TableRow";
import Columns from "grommet/components/Columns";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import { MainBox, FullSection } from "./styles.js";
import { LoadingIndicator } from "components";
import { NotFoundContainer } from "containers";
import { Navbar, AppFooter } from "components";
import styles from "./index.module.scss";

class ProfileContainer extends Component {
  constructor() {
    super();
    this.state = {
      questions: "",
      getData: false,
      not_found: false,
      isLoading: true,
      user: "None"
    };
  }

  componentDidMount() {
    if (this.state.getData === false) {
      const axiosGitHubGraphQLAuth = axios.create({
        baseURL: `${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        }
      });

      const axiosGitHubGraphQL = axios.create({
        baseURL: `${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`
      });

      const MAIN_QUERY = `{ getUsers(id: ${
        this.props.props.params.id
      }) { id name role email profile_picture bio position location twitter personal_website created_at balance shares } }`;

      axiosGitHubGraphQL
        .post(`${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`, { query: MAIN_QUERY })
        .then(result => {
          this.setState({ user: result.data.data.getUsers[0], getData: true });
        })
        .catch(error => {
          this.setState({ getData: true });
        });

      const SECOND_QUERY = `{ getCurrentUser { id name role email profile_picture bio position location twitter personal_website } }`;

      axiosGitHubGraphQL
        .post(`${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`, { query: SECOND_QUERY })
        .then(result => {
          this.setState({
            currentUser: result.data.data.getCurrentUser[0],
            getData: true
          });
        });

      const OPEN_TRADES_QUERY = `{ getOpenTrades(id: ${
        this.props.props.params.id
      }) { id trade_type shares price share_price created_at } }`;

      axiosGitHubGraphQL
        .post(`${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`, { query: OPEN_TRADES_QUERY })
        .then(result => {
          this.setState({ open_trades: result.data.data.getOpenTrades });
        })
        .catch(error => {
          this.setState({ open_trades: [] });
        });

      const TRADES_QUERY = `{ getTrades(id: ${
        this.props.props.params.id
      }) { id shares price trade_type created_at user_balance user_shares } }`;

      axiosGitHubGraphQL
        .post(`${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`, { query: TRADES_QUERY })
        .then(result => {
          this.setState({ trades: result.data.data.getTrades, getData: true });
        })
        .catch(error => {
          this.setState({ trades: [] });
        });
    }
  }

  render() {
    if (this.state.user === "None") {
      return (
        <div />
      );
    }

    if (!this.state.trades) {
      return (
        <div />
      );
    }

    if (!this.state.open_trades) {
      return (
        <div />
      );
    }
    if (this.state.not_found === true) {
      return (
        <div>
          <NotFoundContainer />
        </div>
      );
    }

    var data1 = this.state.trades.map(function(trade) {
      var date = Date.parse(trade.created_at);
      return [date, parseFloat(trade.user_balance)];
    });

    var data2 = this.state.trades.map(function(trade) {
      var date = Date.parse(trade.created_at);
      return [date, parseFloat(trade.user_shares)];
    });

    var buy_trades = this.state.open_trades.filter((trade) => {
      return trade ? trade.trade_type == "Buy" : null
    });

    var sell_trades = this.state.open_trades.filter((trade) => {
      return trade ? trade.trade_type == "Sell" : null
    });

    const options = {
      series: [
        {
          name: "Balance",
          data: data1,
          tooltip: {
            valueDecimals: 2
          }
        },
        {
          name: "Shares",
          data: data2,
          tooltip: {
            valueDecimals: 2
          }
        }
      ]
    };

    return (
      <div>
        <Navbar pathname={this.props.props.pathname} />
      <Box className={styles.container}>
        <Box full="horizontal">
          <Section align="center" justify="center">
            <Columns size="large" align="center" justify="center">
              <Box align="left" pad="medium" margin="small" pad="large">
                <Image
                  src={this.state.user.profile_picture}
                  size="small"
                  className={styles.userAvatar}
                />
                <Heading tag="h4">
                  Joined on <Timestamp value={this.state.user.created_at} fields='date' />
                </Heading>
                {this.state.currentUser && (
                  <div>
                    {this.state.currentUser.id === this.state.user.id && (
                      <Anchor href="/settings" label="Edit your profile" />
                    )}
                    <br />
                    <br />
                  </div>
                )}
                <Heading tag="h4">
                  Balance: ${parseFloat(this.state.user.balance).toFixed(2)}
                </Heading>
                <Heading tag="h4">Shares: {this.state.user.shares}</Heading>
                {this.state.user.location && (
                  <Heading tag="h4">
                    Location: {this.state.user.location}
                  </Heading>
                )}
                {this.state.user.position && (
                  <Heading tag="h4">
                    Position: {this.state.user.position}
                  </Heading>
                )}
                {this.state.user.gender && (
                  <Heading tag="h4">
                    Gender: {this.state.user.gender}
                  </Heading>
                )}
                {this.state.user.twitter && (
                  <Heading tag="h4">
                    Twitter:{" "}
                    <Anchor
                      label={this.state.user.twitter}
                      href={`https://twitter.com/${this.state.user.twitter}`}
                    />
                  </Heading>
                )}
                {this.state.user.personal_website && (
                  <Heading tag="h4">
                    Personal Website:{" "}
                    <Anchor
                      href={this.state.user.personal_website}
                      label={this.state.user.personal_website}
                    />
                  </Heading>
                )}
              </Box>
              <Box align="right" pad="medium" margin="small" pad="large">
                <Heading tag="h2">{this.state.user.name} {this.state.user.work_badge == true ? '💼' : '' } {this.state.user.friend_badge == true ? '🙌' : '' }</Heading>
                <Paragraph>{this.state.user.bio}</Paragraph>
                <HighchartsReact
                  highcharts={Highcharts}
                  constructorType={"stockChart"}
                  options={options}
                />
                <Heading tag="h3">Open Buy Offers</Heading>
                {buy_trades && (
                  <div>
                        <Table>
                          <thead>
                            <tr>
                              <th>Created at</th>
                              <th>Price</th>
                              <th>Price per Share</th>
                              <th>Shares</th>
                            </tr>
                          </thead>
                          <tbody>
                            {buy_trades.map(trade => {
                              return (
                            <TableRow>
                            <td><Timestamp value={trade.created_at} /></td>
                            <td>{trade.price}</td>
                            <td>{trade.share_price}</td>
                            <td>{trade.shares} shares / ${parseFloat(trade.price).toFixed(2)}</td>
                              </TableRow>
                          );
                        })}
                            </tbody>
                          </Table>
                  </div>
                )}
                {!buy_trades && (
                  <Paragraph>This user has no open buy offers.</Paragraph>
                )}
                <Heading tag="h3">Open Sell Offers</Heading>
                {sell_trades && (
                  <div>
                        <Table>
                          <thead>
                            <tr>
                              <th>Created at</th>
                              <th>Price</th>
                              <th>Price per Share</th>
                              <th>Shares</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sell_trades.map(trade => {
                              return (
                            <TableRow>
                            <td><Timestamp value={trade.created_at} /></td>
                            <td>{trade.price}</td>
                            <td>{trade.share_price}</td>
                            <td>{trade.shares} shares / ${parseFloat(trade.price).toFixed(2)}</td>
                              </TableRow>
                          );
                        })}
                            </tbody>
                          </Table>
                          </div>
                  )}
                  {!sell_trades && (
                    <Paragraph>This user has no open sell offers.</Paragraph>
                  )}
                {this.state.trades && (
                <div>
                <Heading tag="h3">Completed Trades</Heading>
                {this.state.trades.length > 0 && (
                  <div>
                        <Table>
                          <thead>
                            <tr>
                              <th>Created at</th>
                              <th>Trade Type</th>
                              <th>Shares</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.trades.map(trade => {
                              return (
                            <TableRow>
                            <td><Timestamp value={trade.created_at} /></td>
                            <td>{trade.trade_type}</td>
                            <td>{trade.shares} shares / ${parseFloat(trade.price).toFixed(2)}</td>
                              </TableRow>
                          );
                        })}
                            </tbody>
                          </Table>
                  </div>
                )}
                {this.state.trades.length == 0 && (
                  <Paragraph>This user has no completed trades.</Paragraph>
                )}
                </div>
              )}
              </Box>
            </Columns>
          </Section>
        </Box>
      </Box>
      <AppFooter />
    </div>
    );
  }
}

export default ProfileContainer;
