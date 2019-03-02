import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import Hero from 'grommet/components/Hero';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Anchor from 'grommet/components/Anchor';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Columns from 'grommet/components/Columns';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { MainBox, FullSection } from './styles';
import { LoadingIndicator } from 'components';
import { Navbar, AppFooter } from "components";
import styles from './index.module.scss';

class LeaderboardContainer extends Component {
  constructor() {
    super();
    this.state = {
      questions: '',
      getData: false,
      most_shares: [],
      all_shares: [],
    };
  }
  render() {
    if (this.state.getData === false) {
      const axiosGitHubGraphQL = axios.create({
        baseURL: `${process.env.NODE_ENV === 'development' ? process.env.API_URL : 'https://api.jamesg.app/graphql'}`,
      });

      const MAIN_QUERY = `{ getHighestBalance(limit: 10) { id name balance work_badge friend_badge } }`;

      axiosGitHubGraphQL
        .post(`${process.env.NODE_ENV === 'development' ? process.env.API_URL : 'https://api.jamesg.app/graphql'}`, { query: MAIN_QUERY })
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
        .post(`${process.env.NODE_ENV === 'development' ? process.env.API_URL : 'https://api.jamesg.app/graphql'}`, { query: SECOND_QUERY })
        .then(result => {
          this.setState({
            most_shares: result.data.data.getMostShares,
            getData: true,
          });
        })
        .catch(error => {
          this.setState({ getData: true });
        });

      const THIRD_QUERY = `{ getUsers(limit: 2000) { id name shares work_badge friend_badge } }`;

      axiosGitHubGraphQL
        .post(`${process.env.NODE_ENV === 'development' ? process.env.API_URL : 'https://api.jamesg.app/graphql'}`, { query: THIRD_QUERY })
        .then(result => {
          this.setState({
            all_shares: result.data.data.getUsers,
            getData: true,
          });
        })
        .catch(error => {
          this.setState({ getData: true });
        });
    }

    if (this.state.most_shares.length === 0) {
      return (
        <div />
      );
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

    var total = parseFloat(100000) - parseFloat(shareTotal[0]);

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
        <Navbar pathname={this.props.props.pathname} />
      <Box className={styles.container}>
        <Box full="horizontal">
          <Hero
            justify="center"
            align="center"
            size="small"
            backgroundColorIndex="dark"
            background={
              <Image
                fit="cover"
                full={true}
                className={styles.heroImage}
                src="https://images.unsplash.com/photo-1543532224-f27c14ca2540?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=51e7328d6ab80920a095bdea293ace91&auto=format&fit=crop&w=1400&q=80"
              />
            }
          >
            <Box align="center" justify="center">
              <Heading align="center" tag="h1">
                Leaderboard
              </Heading>
            </Box>
          </Hero>
          <Section align="center" justify="center">
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
                                  label={`${user.name} ${user.work_badge == true ? '💼' : '' } ${user.friend_badge == true ? '🙌' : '' }`}
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
                                  label={`${user.name} ${user.work_badge == true ? '💼' : '' } ${user.friend_badge == true ? '🙌' : '' }`}
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
          </Section>
        </Box>
      </Box>
      <AppFooter />
    </div>
    );
  }
}

export default LeaderboardContainer;
