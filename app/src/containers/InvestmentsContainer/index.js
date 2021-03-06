import React, { Component } from "react";
import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";
import Section from "grommet/components/Section";
import FormField from "grommet/components/FormField";
import Footer from "grommet/components/Footer";
import Select from "grommet/components/Select";
import Paragraph from "grommet/components/Paragraph";
import CheckmarkIcon from "grommet/components/icons/base/Checkmark";
import Button from "grommet/components/Button";
import Menu from "grommet/components/Menu";
import Table from "grommet/components/Table";
import Anchor from "grommet/components/Anchor";
import Timestamp from "grommet/components/Timestamp";
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

class InvestmentsContainer extends Component {
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
      investments: [],
      open_trades: []
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
            : "https://personly-api.herokuapp.com/graphql"
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
              : "https://personly-api.herokuapp.com/graphql"
          }`,
          { query: MAIN_QUERY }
        )
        .then(result => {
          this.setState({
            currentUser: result.data.data.getCurrentUser[0]
          });
        })
        .catch(result => {
          this.setState({
            currentUser: "None"
          });
        });

      const INVESTMENTS_QUERY = `{ getInvestments { id user { id name } price created_at } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://personly-api.herokuapp.com/graphql"
          }`,
          { query: INVESTMENTS_QUERY }
        )
        .then(result => {
          this.setState({
            investments: result.data.data.getInvestments
          });
        })

      const OPEN_TRADES_QUERY = `{ getOpenTrades(limit: 20) { id user { id name } trade_type shares price share_price created_at } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://personly-api.herokuapp.com/graphql"
          }`,
          { query: OPEN_TRADES_QUERY }
        )
        .then(result => {
          this.setState({ open_trades: result.data.data.getOpenTrades,
          isLoading: false });
        })
        .catch(error => {
          this.setState({ isLoading: false });
        });
    }
  }

  toggleOfferCompleted() {
    this.setState({
      offerCompleted: !this.state.offerCompleted
    });
  }

  render() {
    if (this.state.isLoading === true) {
      return <div />;
    }

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
                Investments
              </Heading>
              {this.state.investments.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Investment</th>
                      <th>Amount</th>
                      <th>Created on</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.investments.map(investment => {
                      return (
                        <TableRow>
                          <td>#{investment.id}</td>
                          <td>
                            <Anchor
                              href={`/people/${investment.user.id}`}
                              label={investment.user.name}
                            />
                          </td>
                          <td>${investment.price}</td>
                          <td className="secondary"><Timestamp value={investment.created_at} /></td>
                        </TableRow>
                      )
                    })}
                  </tbody>
                </Table>
              )}
              {this.state.investments.length === 0 && (
                <Paragraph>You have made no investments yet.</Paragraph>
              )}
              <Heading tag="h2" align="center">
                Open Orders
              </Heading>
              {this.state.open_trades.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Trade Type</th>
                      <th>Investment</th>
                      <th>Shares</th>
                      <th>Share Price</th>
                      <th>Price</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.open_trades.map(trade => {
                      return (
                        <TableRow>
                          <td>{trade.trade_type}</td>
                          <td>
                            <Anchor
                              href={`/people/${trade.user.id}`}
                              label={trade.user.name}
                            />
                          </td>
                          <td>{trade.shares}</td>
                          <td>${trade.share_price}</td>
                          <td>${trade.price}</td>
                          <td><Anchor onClick={() => this._completeOffer(trade.id)} label="Delete"/></td>
                        </TableRow>
                      )
                    })}
                  </tbody>
                </Table>
              )}
              {this.state.open_trades.length === 0 && (
                <Paragraph>You have no open secondary market orders.</Paragraph>
              )}
              <Footer align="center" justify="center">
                <Menu inline direction="row" responsive={false}>
                  <Button
                    label="View people raising"
                    href="/people"
                    style={{ marginTop: 10, marginLeft: 5 }}
                  />
                </Menu>
              </Footer>
            </MainContent>
          </FullSection>
        </MainBox>
        {this.state.offerCompleted == true && (
          <Toast
            status="ok"
            key={1}
            onClose={() => {
              this.toggleOfferCompleted();
            }}
          >
            Your offer has been canceled.
          </Toast>
        )}
      </div>
    );
  }

  _completeOffer = async function(id) {
    this.setState({
      shares_field: "",
      errors: ""
    });
    await this.props
      .closeOrder({
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

    const OPEN_TRADES_QUERY = `{ getOpenTrades(limit: 20) { id user { id name } trade_type shares price share_price created_at } }`;

    axiosGitHubGraphQL
      .post(
        `${
          process.env.NODE_ENV === "development"
            ? "https://personly-api.herokuapp.com/graphql"
            : "https://personly-api.herokuapp.com/graphql"
        }`,
        { query: OPEN_TRADES_QUERY }
      )
      .then(result => {
        this.setState({ open_trades: result.data.data.getOpenTrades,
        isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
      this.toggleOfferCompleted();
    }
  };
}

const CLOSE_ORDER = gql`
  mutation CloseOrder($id: String!) {
    closeOrder(id: $id) {
      id
    }
  }
`;


export default compose(
  graphql(CLOSE_ORDER, { name: "closeOrder" })
)(InvestmentsContainer);
