import React, { Component } from "react";
import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";
import Section from "grommet/components/Section";
import FormField from "grommet/components/FormField";
import Footer from "grommet/components/Footer";
import Select from "grommet/components/Select";
import Columns from "grommet/components/Columns";
import CheckmarkIcon from "grommet/components/icons/base/Checkmark";
import Button from "grommet/components/Button";
import Menu from "grommet/components/Menu";
import Table from "grommet/components/Table";
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
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

class ShareholdersContainer extends Component {
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

      const MAIN_QUERY = `{ getCurrentUser { id name role email profile_picture bio position location twitter personal_website gender api_key shares_issued } }`;

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

      const SHAREHOLDERS_QUERY = `{ getShareholders { id name shares balance }`;

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
        const BALANCE_QUERY = `{ getHighestBalance(limit: 10) { id name balance work_badge friend_badge } }`;

        axiosGitHubGraphQL
          .post(`${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`, { query: BALANCE_QUERY })
          .then(result => {
            this.setState({
              highest_balance: result.data.data.getHighestBalance,
              getData: true,
            });
          })
          .catch(error => {
            this.setState({ getData: true });
          });

        const SECOND_QUERY = `{ getMostShares(limit: 10) { id name shares work_badge friend_badge } }`;

        axiosGitHubGraphQL
          .post(`${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`, { query: SECOND_QUERY })
          .then(result => {
            this.setState({
              most_shares: result.data.data.getMostShares,
              getData: true,
            });
          })
          .catch(error => {
            this.setState({ getData: true });
          });
    }
  }

  render() {
    if (this.state.isLoading === true) {
      return <div />;
    }
    var data = this.state.most_shares.map(function(share) {
      return { name: share.name, y: share.shares };
    });

    var dataTotal = this.state.most_shares.map(function(share) {
      return share.shares;
    });

    var shareTotal = this.state.all_shares.map(function(share) {
      return share.shares;
    });

    var total = this.state.currentUser.shares_issued - parseFloat(shareTotal[0]);

    data.push({ name: 'Other', y: total });

    const options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: "Shareholders"
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },
      series: [
        {
          name: 'Shareholders',
          colorByPoint: true,
          data: data,
        },
      ],
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
                Shareholders
              </Heading>

                <HighchartsReact highcharts={Highcharts} options={options} />
                <Columns size="large" align="center" justify="center">
                  <Box align="left" pad="medium" margin="small" pad="large">
                    <Heading align="center" tag="h2">
                      Most Shares
                    </Heading>
                    {this.state.most_shares && (
                      <div>
                        <Table>
                          <thead>
                            <tr>
                              <th>User</th>
                              <th>Shares</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.most_shares.map(user => {
                              return (
                                <TableRow>
                                  <td>
                                    <Anchor
                                      href={`/profile/${user.id}`}
                                      label={`${user.name}`}
                                    />
                                  </td>
                                  <td>{user.shares}</td>
                                </TableRow>
                              );
                            })}
                          </tbody>
                        </Table>
                      </div>
                    )}
                  </Box>
                  <Box align="left" pad="medium" margin="small" pad="large">
                    {this.state.highest_balance && (
                      <div>
                        <Heading align="center" tag="h2">
                          Highest Balance
                        </Heading>
                        <Table>
                          <thead>
                            <tr>
                              <th>User</th>
                              <th>Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.highest_balance.map(user => {
                              return (
                                <TableRow>
                                  <td>
                                    <Anchor
                                      href={`/profile/${user.id}`}
                                      label={`${user.name}`}
                                    />
                                  </td>
                                  <td>${parseFloat(user.balance).toFixed(2)}</td>
                                </TableRow>
                              );
                            })}
                          </tbody>
                        </Table>
                      </div>
                    )}
                  </Box>
                </Columns>
            </MainContent>
          </FullSection>
        </MainBox>
      </div>
    );
  }
}

export default ShareholdersContainer;
