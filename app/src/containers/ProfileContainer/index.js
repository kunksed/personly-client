import React, { Component } from "react";
import Box from "grommet/components/Box";
import Section from "grommet/components/Section";
import Heading from "grommet/components/Heading";
import Image from "grommet/components/Image";
import Anchor from "grommet/components/Anchor";
import Timestamp from "grommet/components/Timestamp";
import Paragraph from "grommet/components/Paragraph";
import Table from "grommet/components/Table";
import Button from "grommet/components/Button";
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
        baseURL: `${
          process.env.NODE_ENV === "development"
            ? "https://personly-api.herokuapp.com/graphql"
            : "https://api.jamesg.app/graphql"
        }`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        }
      });

      const axiosGitHubGraphQL = axios.create({
        baseURL: `${
          process.env.NODE_ENV === "development"
            ? "https://personly-api.herokuapp.com/graphql"
            : "https://api.jamesg.app/graphql"
        }`
      });

      const MAIN_QUERY = `{ getUsers(id: ${
        this.props.props.params.id
      }) { id name role email profile_picture bio position location twitter personal_website created_at balance shares is_public } }`;

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
          this.setState({ user: result.data.data.getUsers[0] });
        })
        .catch(error => {
          this.setState({ not_found: true });
        });

      const TRADES_QUERY = `{ getTrades(id: ${
        this.props.props.params.id
      }) { id shares price trade_type created_at user_balance in_user { id name } } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: TRADES_QUERY }
        )
        .then(result => {
          this.setState({ investments: result.data.data.getTrades, getData: true });
        })
        .catch(error => {
          this.setState({ investments: [] });
        });
    }
  }

  render() {
    if (this.state.user === "None") {
      return <div />;
    }

    if (!this.state.investments) {
      return <div />;
    }

    if (this.state.not_found === true) {
      return (
        <div>
          <NotFoundContainer />
        </div>
      );
    }

    var data1 = this.state.investments.map(function(trade) {
      var date = Date.parse(trade.created_at);
      return [date, parseFloat(trade.user_balance)];
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
      ]
    };

    return (
      <div>
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
                    Joined on{" "}
                    <Timestamp
                      value={this.state.user.created_at}
                      fields="date"
                    />
                  </Heading>
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
                    <Heading tag="h4">Gender: {this.state.user.gender}</Heading>
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
                  <br />
                  {this.state.user.is_public === true && (
                    <Button
                      href={`/people/${this.state.user.id}`}
                      label="Invest"
                    />
                  )}
                </Box>
                <Box align="right" pad="medium" margin="small" pad="large">
                  <Heading tag="h2">{this.state.user.name}</Heading>
                  <Paragraph>{this.state.user.bio}</Paragraph>
                  <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={"stockChart"}
                    options={options}
                  />
                  {this.state.investments && (
                    <div>
                      <Heading tag="h3">Investments</Heading>
                      {this.state.investments.length > 0 && (
                        <div>
                          <Table>
                            <thead>
                              <tr>
                                <th>Trade Type</th>
                                <th>Shares</th>
                                <th>Person</th>
                                <th>Created at</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.investments.map(trade => {
                                return (
                                  <TableRow>
                                    <td>{trade.trade_type}</td>
                                    <td>
                                      {trade.shares} shares / $
                                      {parseFloat(trade.price).toFixed(2)}
                                    </td>
                                    <td>{trade.in_user.name}</td>
                                    <td>
                                      <Timestamp value={trade.created_at} />
                                    </td>
                                  </TableRow>
                                );
                              })}
                            </tbody>
                          </Table>
                        </div>
                      )}
                      {this.state.investments.length === 0 && (
                        <Paragraph>
                          This user has no completed investments.
                        </Paragraph>
                      )}
                    </div>
                  )}
                </Box>
              </Columns>
            </Section>
          </Box>
        </Box>
      </div>
    );
  }
}

export default ProfileContainer;
