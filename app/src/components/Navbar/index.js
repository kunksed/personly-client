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
        baseURL: `${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`,
      });

      const MAIN_QUERY =
        '{ getTradesToday { id trade_type shares price share_price created_at } }';

      axiosGitHubGraphQL
        .post(`${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`, { query: MAIN_QUERY })
        .then(result => {
          this.setState({ today_trades: result.data.data.getTradesToday });
        });

      const TRADES_QUERY =
        '{ getTrades { id trade_type shares price share_price created_at } }';

      axiosGitHubGraphQL
        .post(`${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`, { query: TRADES_QUERY })
        .then(result => {
          this.setState({ trades: result.data.data.getTrades });
        });

      const YESTERDAY_QUERY =
        '{ getTradesYesterday { id trade_type shares price share_price created_at } }';

      axiosGitHubGraphQL
        .post(`${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`, {
          query: YESTERDAY_QUERY,
        })
        .then(result => {
          this.setState({
            yesterday_trades: result.data.data.getTradesYesterday,
          });
        });

      const axiosGitHubGraphQLAuth = axios.create({
        baseURL: `${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      const USER_QUERY = '{ getCurrentUser { id name role balance shares } }';

      axiosGitHubGraphQLAuth
        .post(`${process.env.NODE_ENV === 'development' ?'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`, { query: USER_QUERY })
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
              <Anchor href="/">Personly Development</Anchor>
            </Title>
          )}
          {process.env.NODE_ENV !== 'development' && (
            <Title className={styles.title}>
              <Anchor href="/">Personly</Anchor>
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
                <Anchor
                  href="/people"
                  primary={false}
                  className={this.props.pathname === '/people' ? 'active' : ''}
                >
                  People
                </Anchor>
                <Anchor
                  path="/for-people"
                  className={
                    this.props.pathname === '/for-epole' ? 'active' : ''
                  }
                >
                  For People
                </Anchor>
                <Anchor
                  path="/for-investors"
                  className={
                    this.props.pathname === '/for-investors' ? 'active' : ''
                  }
                >
                  For Investors
                </Anchor>
                <Anchor
                  path="/login"
                  className={this.props.pathname === '/login' ? 'active' : ''}
                >
                  Log in
                </Anchor>
                <Button
                  primary
                  label="Sign up"
                  path="/register"
                  className={
                    this.props.pathname === '/register' ? 'active' : ''
                  }
                />
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
                  <Anchor
                    href="/people"
                    primary={false}
                    className={this.props.pathname === '/people' ? 'active' : ''}
                  >
                    People
                  </Anchor>
                  <Anchor
                    path="/for-people"
                    className={
                      this.props.pathname === '/for-epole' ? 'active' : ''
                    }
                  >
                    For People
                  </Anchor>
                  <Anchor
                    path="/for-investors"
                    className={
                      this.props.pathname === '/for-investors' ? 'active' : ''
                    }
                  >
                    For Investors
                  </Anchor>
                <Anchor
                  path="/settings/deposit"
                  primary={false}
                  className={
                    this.props.pathname === '/settings/deposit' ? 'active' : ''
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
