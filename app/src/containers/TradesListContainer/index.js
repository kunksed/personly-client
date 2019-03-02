import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Hero from 'grommet/components/Hero';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Anchor from 'grommet/components/Anchor';
import Section from 'grommet/components/Section';
import Timestamp from 'grommet/components/Timestamp';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import { FullSection, MainContent, MainBox } from './styles';
import { Divider, LoadingIndicator } from 'components';
import { Navbar, AppFooter } from "components";
import axios from 'axios';
import styles from './index.module.scss';

class TradesListContainer extends Component {
  constructor() {
    super();
    this.state = {
      getData: false,
      isLoading: true
    };
  }
  render() {
    if (this.state.getData === false) {
      const axiosGitHubGraphQL = axios.create({
        baseURL: `${process.env.NODE_ENV === 'development' ? 'https://jamesg.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`,
      });

      const TRADES_QUERY = `{ getTrades(limit: 50) { id trade_type shares user { id name work_badge friend_badge } price share_price created_at closed_by_id { id name work_badge friend_badge } } }`;

      axiosGitHubGraphQL
        .post(`${process.env.NODE_ENV === 'development' ? 'https://jamesg.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`, { query: TRADES_QUERY })
        .then(result => {
          this.setState({ trades: result.data.data.getTrades, getData: true, isLoading: false });
        })
        .catch(error => {
          this.setState({ trades: [], getData: true, isLoading: false });
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
                src="https://images.unsplash.com/photo-1543970256-c86ba45b0d9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
              />
            }
          >
            <Box align="center" justify="center">
              <Heading align="center" tag="h1">
                Trades
              </Heading>
            </Box>
          </Hero>
          <Box align="center" justify="center" margin="large" pad="large">
            {this.state.trades && (
              <Table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Closed By</th>
                    <th>Trade Type</th>
                    <th>Shares</th>
                    <th>Price</th>
                    <th>Share Price</th>
                    <th>Posted</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.trades.map(trades => {
                    return (
                      <TableRow>
                        <td>
                          <Anchor
                            href={`/profile/${trades.user.id}`}
                            label={`${trades.user.name} ${trades.user.work_badge == true ? '💼' : '' } ${trades.user.friend_badge == true ? '🙌' : '' }`}
                          />
                        </td>
                          <td>
                            <Anchor
                              href={`/profile/${trades.closed_by_id.id}`}
                              label={`${trades.closed_by_id.name} ${trades.closed_by_id.work_badge == true ? '💼' : '' } ${trades.closed_by_id.friend_badge == true ? '🙌' : '' }`}
                            />
                          </td>
                        <td>{trades.trade_type}</td>
                        <td>{trades.shares}</td>
                        <td>${parseFloat(trades.price).toFixed(2)}</td>
                        <td>${parseFloat(trades.share_price).toFixed(2)}</td>
                        <td>
                          <Timestamp value={trades.created_at} />
                        </td>
                      </TableRow>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </Box>
        </Box>
      </Box>
      <AppFooter />
    </div>
    );
  }
}

export default TradesListContainer;
