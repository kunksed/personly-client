import React, { Component } from "react";
import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";
import Section from "grommet/components/Section";
import FormField from "grommet/components/FormField";
import Footer from "grommet/components/Footer";
import Select from "grommet/components/Select";
import CheckmarkIcon from "grommet/components/icons/base/Checkmark";
import Button from "grommet/components/Button";
import Menu from "grommet/components/Menu";
import Table from "grommet/components/Table";
import Value from "grommet/components/Value";
import Paragraph from "grommet/components/Paragraph";
import TableRow from "grommet/components/TableRow";
import IterationIcon from "grommet/components/icons/base/Iteration";
import StarIcon from "grommet/components/icons/base/Star";
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { graphql, compose } from "react-apollo";
import Toast from "grommet/components/Toast";
import axios from "axios";
import gql from "graphql-tag";
import styles from "./index.module.scss";
import { FullSection, MainContent, MainBox } from "./styles";
import { Divider, LoadingIndicator, SettingsSidebar } from "components";
import { Navbar, AppFooter } from "components";
import regeneratorRuntime from "regenerator-runtime";

class DashboardContainer extends Component {
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
            currentUser: result.data.data.getCurrentUser[0]
          });
        })

      const SHAREHOLDERS_QUERY = `{ getShareholders { id name shares balance gender } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: SHAREHOLDERS_QUERY }
        )
        .then(result => {
          this.setState({
            shareholders: result.data.data.getShareholders,
            getSecondData: true,
            getData: true,
            isLoading: false
          });
        })
        .catch(result => {
          this.setState({
            shareholders: [],
            getData: true,
            isLoading: false
          });
        });

      const TODAY_QUERY = `{ getTradesToday { id trade_type shares price share_price created_at } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
          }`,
          { query: TODAY_QUERY }
        )
        .then(result => {
          this.setState({ today_trades: result.data.data.getTradesToday });
        });

      const YESTERDAY_QUERY = `{ getTradesYesterday { id trade_type shares price share_price created_at } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
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
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://api.jamesg.app/graphql"
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

  render() {
    if (this.state.isLoading === true) {
      return <div />;
    }

    if (!localStorage.getItem("auth_token")) {
      window.location.replace("/login");
    }

    var sharesIssued = parseFloat(0);

    for (var item, i = 0; (item = this.state.shareholders[i++]); ) {
      var sharesIssued = parseFloat(totalShares) + parseFloat(item.shares);
    }

    var user_genders = [];
    var user_genders_result = {};

    for (var item, i = 0; (item = this.state.shareholders[i++]); ) {
      var name = item.gender;

      if (name === "") {
        var name = "None";
      }

      if (!(name in user_genders)) {
        user_genders_result[name] = 1;
      } else {
        user_genders_result[name] = user_genders_result[name] + 1;
      }
    }

    for (var item, i = 0; (item = Object.keys(user_genders_result)[i++]); ) {
      console.log(item);
      user_genders.push({ name: item, value: user_genders_result[item] });
    }

    var genderData = user_genders.map(gender => {
      return { name: gender.name, y: gender.value };
    });

    const optionsGender = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie"
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
      },
      title: "Gender Distribution",
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
          name: "Genders",
          colorByPoint: true,
          data: genderData
        }
      ]
    };

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
        <MainBox alignContent="center" fill="horizontal" align="center">
          <FullSection primary direction="row">
            <SettingsSidebar currentUser={this.state.currentUser} />
            <MainContent
              align="center"
              justify="start"
              pad={{ vertical: "large" }}
            >
              <Heading tag="h2" align="center">
                Dashboard
              </Heading>
              <Divider />
              <Box direction="row">
                <Value
                  value={this.state.shareholders.length}
                  label="Shareholders"
                  className={styles.boxStyled}
                />
                <Value
                  value={sharesIssued}
                  label="Shares Issued"
                  className={styles.boxStyled}
                />
                {data.length > 0 && (
                  <Value
                    value={data[0][0]}
                    label="Share Price"
                    className={styles.boxStyled}
                  />
                )}
                {data.length === 0 && (
                  <Value
                    value={0}
                    label="Share Price"
                    className={styles.boxStyled}
                  />
                )}
              </Box>
              <Divider />
              <Heading tag="h2" align="center">
                Investor Graph
              </Heading>
              <HighchartsReact
                highcharts={Highcharts}
                constructorType={"stockChart"}
                options={options}
              />
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
                <Box
                  colorIndex="unknown"
                  pad="small"
                  align="center"
                  justify="center"
                >
                  <Anchor>$0 | 0%</Anchor>
                </Box>
              )}
              <Divider />
              <Box>
                <Heading tag="h2">Gender Distribution of Shareholders</Heading>
                {user_genders.length > 0 && (
                  <div>
                <HighchartsReact highcharts={Highcharts} options={optionsGender} />
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Stats</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user_genders.map(gender => {
                      return (
                        <TableRow>
                          <td>{gender.name}</td>
                          <td>{gender.value}</td>
                        </TableRow>
                      );
                    })}
                  </tbody>
                </Table>
                </div>
              )}
              {user_genders.length === 0 && (
                <Paragraph>No data is available at this moment.</Paragraph>
              )}
              </Box>
              <Footer align="center" justify="center">
                <Menu inline direction="row" responsive={false}>
                  <Button
                    label="View profile"
                    href={`/people/${this.state.currentUser.id}`}
                    style={{ marginTop: 10, marginLeft: 5 }}
                  />
                </Menu>
              </Footer>
            </MainContent>
          </FullSection>
        </MainBox>
      </div>
    );
  }
}

export default DashboardContainer;
