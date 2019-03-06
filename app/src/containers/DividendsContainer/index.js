import React, { Component } from "react";
import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";
import Section from "grommet/components/Section";
import FormField from "grommet/components/FormField";
import Select from "grommet/components/Select";
import Paragraph from "grommet/components/Paragraph";
import Timestamp from "grommet/components/Timestamp";
import CheckmarkIcon from "grommet/components/icons/base/Checkmark";
import Button from "grommet/components/Button";
import Menu from "grommet/components/Menu";
import Table from "grommet/components/Table";
import Anchor from "grommet/components/Anchor";
import Layer from "grommet/components/Layer";
import Footer from "grommet/components/Footer";
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

class DividendsContainer extends Component {
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
      dividends: []
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

      const UPDATES_QUERY = `{ getDividends { id amount users_given created_on } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://personly-api.herokuapp.com/graphql"
          }`,
          { query: UPDATES_QUERY }
        )
        .then(result => {
          this.setState({
            dividends: result.data.data.getDividends,
            isLoading: false
          });
        });
    }
  }

  toggleDividendIssuedToast() {
    this.setState({
      dividendIssuedToast: !this.state.dividendIssuedToast
    });
  }

  toggleDividendIssuedLayer() {
    this.setState({
      dividendIssuedLayer: !this.state.dividendIssuedLayer
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
                Dividends
              </Heading>
              <br />
              <Button
                align="center"
                label="Issue Dividend"
                onClick={() => {
                  this.toggleDividendIssuedLayer();
                }}
              />
              {this.state.dividends.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Amount</th>
                      <th>Issued to</th>
                      <th>Created On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.dividends.map(dividend => {
                      return (
                        <TableRow>
                          <td>#{dividend.id}</td>
                          <td>{dividend.amount}</td>
                          <td>{dividend.users_given}</td>
                          <td className="secondary">
                            <Timestamp value={question.created_on} />
                          </td>
                        </TableRow>
                      );
                    })}
                  </tbody>
                </Table>
              )}
              {this.state.dividends.length === 0 && (
                <Paragraph>You have not issued any dividends yet.</Paragraph>
              )}

              {this.state.dividendIssuedLayer === true && (
                <Layer
                  closer={true}
                  flush={true}
                  overlayClose={true}
                  onClose={() => this.toggleDividendIssuedLayer()}
                >
                  <Box pad="large">
                    <Heading tag="h2">Issue Dividend</Heading>
                    <br />
                    <FormField
                      label="Amount (per user in USD) *"
                      htmlFor="samount_issued"
                      className={styles.formField}
                      error={
                        this.state.amount_field ? this.state.amount_field : ""
                      }
                    >
                      <input
                        required
                        id="amount"
                        name="amount"
                        type="text"
                        value={this.state.amount}
                        placeHolder="0.01"
                        onChange={e =>
                          this.setState({ amount: e.target.value })
                        }
                        className={styles.input}
                      />
                    </FormField>
                    <br />
                    <Paragraph>
                      The amount will be immediately deducted from your balance for each shareholder you have.
                    </Paragraph>
                    <br />
                    <Footer pad={{ vertical: "medium" }}>
                      <Button
                        label="Issue Dividend"
                        type="submit"
                        primary={true}
                        onClick={() => this._createDividend()}
                      />
                    </Footer>
                  </Box>
                </Layer>
              )}
              {this.state.dividendIssuedToast === true && (
                <Toast
                  status="ok"
                  onClose={() => {
                    this.toggleDividendIssuedToast();
                  }}
                >
                  Your dividend has been issued.
                </Toast>
              )}
            </MainContent>
          </FullSection>
        </MainBox>
      </div>
    );
  }

  _createDividend = async function() {
    const amount = this.state.amount;
    await this.props
      .createDividend({
        variables: {
          amount
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
    }
    if (!this.state.errors) {
      const axiosGitHubGraphQLAuth = axios.create({
        baseURL: `${
          process.env.NODE_ENV === "development"
            ? "https://jamesg-test.herokuapp.com/graphql"
            : "https://personly-api.herokuapp.com/graphql"
        }`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        }
      });
      const DIVIDENDS_QUERY = `{ getDividends { id amount users_given created_on } }`;

      axiosGitHubGraphQL
        .post(
          `${
            process.env.NODE_ENV === "development"
              ? "https://personly-api.herokuapp.com/graphql"
              : "https://personly-api.herokuapp.com/graphql"
          }`,
          { query: DIVIDENDS_QUERY }
        )
        .then(result => {
          this.setState({
            dividends: result.data.data.getDividends
          });
        });
      this.toggleDividendIssuedLayer();
      this.toggleDividendIssuedToast();
    }
  };
}

const CREATE_DIVIDEND = gql`
  mutation CreateDividend($amount: String) {
    createDividend(amount: $amount) {
      id
    }
  }
`;

export default compose(graphql(CREATE_DIVIDEND, { name: "createDividend" }))(
  DividendsContainer
);
