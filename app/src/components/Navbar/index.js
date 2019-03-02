// @flow
/* eslint-disable no-alert, no-console */
import React, { Component, PropTypes } from 'react';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';
import Button from 'grommet/components/Button';
import Notification from 'grommet/components/Notification';
import styles from './index.module.scss';
import axios from 'axios';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: 0,
      getData: false,
      trades: null,
    };
  }

  componentDidMount() {
    if (this.state.getData === false) {
      const axiosGitHubGraphQL = axios.create({
        baseURL: `${process.env.NODE_ENV === 'development' ? process.env.API_URL : 'https://api.jamesg.app/graphql'}`,
      });

      const MAIN_QUERY =
        '{ getTradesToday { id trade_type shares price share_price created_at } }';

      axiosGitHubGraphQL
        .post(`${process.env.NODE_ENV === 'development' ? process.env.API_URL : 'https://api.jamesg.app/graphql'}`, { query: MAIN_QUERY })
        .then(result => {
          this.setState({ today_trades: result.data.data.getTradesToday });
        });

      const TRADES_QUERY =
        '{ getTrades { id trade_type shares price share_price created_at } }';

      axiosGitHubGraphQL
        .post(`${process.env.NODE_ENV === 'development' ? process.env.API_URL : 'https://api.jamesg.app/graphql'}`, { query: TRADES_QUERY })
        .then(result => {
          this.setState({ trades: result.data.data.getTrades });
        });

      const YESTERDAY_QUERY =
        '{ getTradesYesterday { id trade_type shares price share_price created_at } }';

      axiosGitHubGraphQL
        .post(`${process.env.NODE_ENV === 'development' ? process.env.API_URL : 'https://api.jamesg.app/graphql'}`, {
          query: YESTERDAY_QUERY,
        })
        .then(result => {
          this.setState({
            yesterday_trades: result.data.data.getTradesYesterday,
          });
        });

      const axiosGitHubGraphQLAuth = axios.create({
        baseURL: `${process.env.NODE_ENV === 'development' ? process.env.API_URL : 'https://api.jamesg.app/graphql'}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      const USER_QUERY = '{ getCurrentUser { id name role balance shares } }';

      axiosGitHubGraphQLAuth
        .post(`${process.env.NODE_ENV === 'development' ? process.env.API_URL : 'https://api.jamesg.app/graphql'}`, { query: USER_QUERY })
        .then(result => {
          this.setState({
            currentUser: result.data.data.getCurrentUser[0],
            getData: true,
          });
        });
    }
  }

  render() {
    if (this.state.trades !== null) {
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
    }

    return (
      <div className={styles.navbar}>
        <Header justify="between" className="component">
          {process.env.NODE_ENV === 'development' && (
            <Title className={styles.title}>
              <Anchor href="/">{process.env.NAME ? process.env.NAME : "JamesG"} Development</Anchor>
            </Title>
          )}
          {process.env.NODE_ENV !== 'development' && (
            <Title className={styles.title}>
              <Anchor href="/">{process.env.NAME ? process.env.NAME : "JamesG"}</Anchor>
            </Title>
          )}
          {this.state.currentUser === 0 && (
            <div direction="row">
              <Menu
                direction="row"
                align="center"
                responsive
                className={styles.rightMenu}
              >
                {this.state.trades && (
                  <div>
                    {yesterday_data.length === 0 && (
                      <div>
                        {data[0][1] > 0 && (
                          <Anchor>
                            ${parseFloat(data[0][1]).toFixed(2)} | +$
                            {parseFloat(
                              data[0][1] - yesterday_data[0][1],
                            ).toFixed(2)}
                          </Anchor>
                        )}
                        {data[0][1] < 0 && (
                          <Anchor>
                            ${parseFloat(data[0][1]).toFixed(2)} | -$
                            {parseFloat(
                              data[0][1] - yesterday_data[0][1],
                            ).toFixed(2)}
                          </Anchor>
                        )}
                        {data[0][1] === 0 && (
                          <Anchor>
                            ${parseFloat(data[0][1]).toFixed(2)} | $
                            {parseFloat(
                              data[0][1] - yesterday_data[0][1],
                            ).toFixed(2)}
                          </Anchor>
                        )}
                      </div>
                    )}
                    {yesterday_data.length > 0 && (
                      <div>
                        {data[0][1] - yesterday_data[0][1] > 0 && (
                          <Anchor>
                            ${parseFloat(data[0][1]).toFixed(2)} | +$
                            {parseFloat(
                              data[0][1] - yesterday_data[0][1],
                            ).toFixed(2)}
                          </Anchor>
                        )}
                        {data[0][1] - yesterday_data[0][1] < 0 && (
                          <Anchor>
                            ${parseFloat(data[0][1]).toFixed(2)} | -$
                            {parseFloat(
                              data[0][1] - yesterday_data[0][1],
                            ).toFixed(2)}
                          </Anchor>
                        )}
                        {data[0][1] - yesterday_data[0][1] === 0 && (
                          <Anchor>
                            ${parseFloat(data[0][1]).toFixed(2)} | $
                            {parseFloat(
                              data[0][1] - yesterday_data[0][1],
                            ).toFixed(2)}
                          </Anchor>
                        )}
                      </div>
                    )}
                    {yesterday_data.length === 0 && (
                      <Anchor>
                        ${parseFloat(data[0][1]).toFixed(2)} | $0.00
                      </Anchor>
                    )}
                  </div>
                )}
                <Anchor
                  href="/trade"
                  primary={false}
                  className={this.props.pathname === '/trade' ? 'active' : ''}
                >
                  Trade
                </Anchor>
                <Anchor
                  path="/questions"
                  className={
                    this.props.pathname === '/questions' ? 'active' : ''
                  }
                >
                  Vote
                </Anchor>
                <Anchor
                  path="/login"
                  className={this.props.pathname === '/login' ? 'active' : ''}
                >
                  Login
                </Anchor>
                <Anchor
                  path="/register"
                  className={
                    this.props.pathname === '/register' ? 'active' : ''
                  }
                >
                  Open Account
                </Anchor>
              </Menu>
            </div>
          )}
          {this.state.currentUser !== 0 && (
            <div direction="row">
              <Menu
                direction="row"
                align="center"
                responsive
                className={styles.leftMenu}
              >
                {this.state.trades && (
                  <div>
                    {yesterday_data.length === 0 && (
                      <div>
                        {data[0][1] > 0 && (
                          <Anchor>
                            ${parseFloat(data[0][1]).toFixed(2)} | +$
                            {parseFloat(
                              data[0][1] - yesterday_data[0][1],
                            ).toFixed(2)}
                          </Anchor>
                        )}
                        {data[0][1] < 0 && (
                          <Anchor>
                            ${parseFloat(data[0][1]).toFixed(2)} | -$
                            {parseFloat(
                              data[0][1] - yesterday_data[0][1],
                            ).toFixed(2)}
                          </Anchor>
                        )}
                        {data[0][1] === 0 && (
                          <Anchor>
                            ${parseFloat(data[0][1]).toFixed(2)} | $
                            {parseFloat(
                              data[0][1] - yesterday_data[0][1],
                            ).toFixed(2)}
                          </Anchor>
                        )}
                      </div>
                    )}
                    {yesterday_data.length > 0 && (
                      <div>
                        {data[0][1] - yesterday_data[0][1] > 0 && (
                          <Anchor>
                            ${parseFloat(data[0][1]).toFixed(2)} | +$
                            {parseFloat(
                              data[0][1] - yesterday_data[0][1],
                            ).toFixed(2)}
                          </Anchor>
                        )}
                        {data[0][1] - yesterday_data[0][1] < 0 && (
                          <Anchor>
                            ${parseFloat(data[0][1]).toFixed(2)} | -$
                            {parseFloat(
                              data[0][1] - yesterday_data[0][1],
                            ).toFixed(2)}
                          </Anchor>
                        )}
                        {data[0][1] - yesterday_data[0][1] === 0 && (
                          <Anchor>
                            ${parseFloat(data[0][1]).toFixed(2)} | $
                            {parseFloat(
                              data[0][1] - yesterday_data[0][1],
                            ).toFixed(2)}
                          </Anchor>
                        )}
                      </div>
                    )}
                    {yesterday_data.length === 0 && (
                      <Anchor>
                        ${parseFloat(data[0][1]).toFixed(2)} | $0.00
                      </Anchor>
                    )}
                  </div>
                )}
                <Anchor path="#" primary={false}>
                  {this.state.currentUser.shares} shares
                </Anchor>
                <Anchor
                  href="/trade"
                  primary={false}
                  className={this.props.pathname === '/trade' ? 'active' : ''}
                >
                  Trade
                </Anchor>
                <Anchor
                  path="/questions"
                  className={
                    this.props.pathname === '/questions' ? 'active' : ''
                  }
                >
                  Vote
                </Anchor>
                <Anchor
                  path="/account/deposit"
                  primary={false}
                  className={
                    this.props.pathname === '/account/deposit' ? 'active' : ''
                  }
                >
                  Deposit
                </Anchor>
                <Anchor primary={false}>
                  ${parseFloat(this.state.currentUser.balance).toFixed(2)}
                </Anchor>
                <Box
                  id="session-menu-toggle"
                  responsive={false}
                  direction="row"
                  justify="center"
                >
                  <Menu
                    a11yTitle="Session"
                    inline={false}
                    className={styles.rightMenu}
                    dropAlign={{ top: 'top', right: 'right' }}
                    label={this.state.currentUser.name}
                  >
                    <Anchor href={`/profile/${this.state.currentUser.id}`}>
                      Profile
                    </Anchor>
                    <Anchor href="/settings">Settings</Anchor>
                    {this.state.currentUser.role === 'Admin' && (
                      <Anchor href="/admin">Admin</Anchor>
                    )}
                    <Anchor
                      onClick={() => {
                        localStorage.removeItem('auth_token');
                        window.location.replace('/login');
                      }}
                    >
                      Logout
                    </Anchor>
                  </Menu>
                </Box>
              </Menu>
            </div>
          )}
        </Header>
      </div>
    );
  }
}

Navbar.propTypes = {
  pathname: PropTypes.node.isRequired, // eslint-disable-line
  location: PropTypes.object.isRequired, // eslint-disable-line
};

export default Navbar;
