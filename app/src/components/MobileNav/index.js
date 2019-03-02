import React, { PropTypes, Component } from "react";
import styles from "./index.module.scss";
import cssModules from "react-css-modules";
import Split from "grommet/components/Split";
import Sidebar from "grommet/components/Sidebar";
import Menu from "grommet/components/Menu";
import Footer from "grommet/components/Footer";
import { Link, IndexLink } from "react-router";
import { Navbar } from "components";
import Title from "grommet/components/Title";
import Anchor from "grommet/components/Anchor";
import MenuIcon from "grommet/components/icons/base/Menu";
import Header from "grommet/components/Header";
import Button from "grommet/components/Button";
import CloseIcon from "grommet/components/icons/base/Close";
import { StyledHeader } from "./styles";
import axios from "axios";

class MobileNav extends Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      navIsActive: false,
      getData: false,
      currentUser: 0,
      trades: null
    };
  }

  toggleNavbar() {
    this.setState({
      navIsActive: !this.state.navIsActive
    });
  }

  componentDidMount() {
    if (this.state.getData === false) {
      const axiosGitHubGraphQL = axios.create({
        baseURL: `${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`
      });

      const MAIN_QUERY =
        "{ getTradesToday { id trade_type shares price share_price created_at } }";

      axiosGitHubGraphQL
        .post(`${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`, { query: MAIN_QUERY })
        .then(result => {
          this.setState({ trades: result.data.data.getTradesToday });
        });

      const TRADES_QUERY =
        "{ getTrades { id trade_type shares price share_price created_at } }";

      axiosGitHubGraphQL
        .post(`${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`, { query: TRADES_QUERY })
        .then(result => {
          this.setState({ tradesAmount: result.data.data.getTrades });
        });

      const YESTERDAY_QUERY =
        "{ getTradesYesterday { id trade_type shares price share_price created_at } }";

      axiosGitHubGraphQL
        .post(`${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`, {
          query: YESTERDAY_QUERY
        })
        .then(result => {
          this.setState({
            yesterday_trades: result.data.data.getTradesYesterday
          });
        });

      const axiosGitHubGraphQLAuth = axios.create({
        baseURL: `${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        }
      });

      const USER_QUERY = "{ getCurrentUser { id name role balance shares } }";

      axiosGitHubGraphQLAuth
        .post(`${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`, { query: USER_QUERY })
        .then(result => {
          this.setState({
            currentUser: result.data.data.getCurrentUser[0],
            getData: true
          });
        });
    }
  }

  render() {
    if (this.state.trades !== null) {
      var data = this.state.trades.map(function(vote) {
        const date1 = Date.parse(vote.created_at);
        return [date1, parseFloat(vote.share_price)];
      });

      var tradesAmount = this.state.tradesAmount.map(function(vote) {
        const date2 = Date.parse(vote.created_at);
        return [date2, parseFloat(vote.share_price)];
      });

      var yesterdayData = this.state.yesterday_trades.map(function(vote) {
        const date3 = Date.parse(vote.created_at);
        return [date3, parseFloat(vote.share_price)];
      });
    }
    return (
      <div>
        {this.state.navIsActive === false && (
          <StyledHeader
            direction="row"
            justify="between"
            large
            pad={{ horizontal: "medium", between: "small" }}
          >
            {this.state.navIsActive == false && (
              <Title a11yTitle="James G">
                <Anchor href="/">JamesG</Anchor>
              </Title>
            )}

            <Title
              style={this.state.navIsActive && { display: "none" }}
              onClick={() => {
                this.toggleNavbar();
              }}
              a11yTitle="Open Menu Right"
            >
              <MenuIcon size="medium" type="control" />
            </Title>
          </StyledHeader>
        )}
        {this.state.navIsActive === true && (
          <Split
            flex={this.state.navIsActive ? "" : "right"}
            priority={this.state.navIsActive ? "left" : "right"}
          >
            <Sidebar
              id="mobile-nav"
              size="medium"
              className={styles.sidebarComponent}
              fixed
              seperator="right"
            >
              <Header justify="between" pad={{ horizontal: "medium" }} large>
                <Title a11yTitle="James G">
                  <Anchor href="/" className={styles.whiteAnchor}>
                    JamesG
                  </Anchor>
                </Title>
                <Menu responsive={false} className={styles.navCloser}>
                  <Button
                    plain
                    icon={<CloseIcon colorIndex="light-1" />}
                    onClick={() => {
                      this.toggleNavbar();
                    }}
                  />
                </Menu>
              </Header>
              <Menu primary>
                <Anchor className={styles.whiteAnchor} href="/">
                  Home
                </Anchor>
                <Anchor className={styles.whiteAnchor} href="/trade">
                  Trade
                </Anchor>
                <Anchor className={styles.whiteAnchor} href="/vote">
                  Vote
                </Anchor>
                {this.state.currentUser && (
                  <Anchor
                    className={styles.whiteAnchor}
                    path="#"
                    primary={false}
                  >
                    {this.state.currentUser.shares} shares
                  </Anchor>
                )}
              </Menu>
              <Footer justify="start" pad="medium" className={styles.navFooter}>
                {!this.state.currentUser && (
                  <Menu primary>
                    <Link className={styles.whiteAnchor} to="/login">
                      Login
                    </Link>
                    <Link className={styles.whiteAnchor} to="/signup">
                      Signup
                    </Link>
                  </Menu>
                )}
                {this.state.currentUser && (
                  <Menu
                    label={this.state.currentUser.name}
                    primary
                    className={styles.whiteAnchor}
                  >
                    <Anchor href={`/profile/${this.state.currentUser.id}`}>
                      Profile
                    </Anchor>
                    <Anchor href="/settings">Settings</Anchor>
                    {this.state.currentUser.role === "Admin" && (
                      <Anchor href="/admin">Admin</Anchor>
                    )}
                    <Anchor
                      onClick={() => {
                        localStorage.removeItem("auth_token");
                        window.location.replace("/login");
                      }}
                    >
                      Logout
                    </Anchor>
                  </Menu>
                )}
              </Footer>
            </Sidebar>
          </Split>
        )}
      </div>
    );
  }
}

export default cssModules(MobileNav, styles);
