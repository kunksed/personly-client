import React, { Component } from "react";
import Box from "grommet/components/Box";
import Section from "grommet/components/Section";
import Status from "grommet/components/icons/Status";
import Heading from "grommet/components/Heading";
import Paragraph from "grommet/components/Paragraph";
import Columns from "grommet/components/Columns";
import Button from "grommet/components/Button";
import Table from "grommet/components/Table";
import TableRow from "grommet/components/TableRow";
import Anchor from "grommet/components/Anchor";
import FormField from "grommet/components/FormField";
import Toast from "grommet/components/Toast";
import { Elements } from "react-stripe-elements-universal";
import InjectedCheckoutForm from "./CheckoutForm.js";
import axios from "axios";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import regeneratorRuntime from "regenerator-runtime";
import { LoadingIndicator } from "components";
import { Navbar, AppFooter } from "components";
import styles from "./index.module.scss";

class DepositContainer extends Component {
  constructor() {
    super();
    this.state = {
      payToast: false,
      stripe: null,
      getData: false
    };
  }
  togglePayToast() {
    this.setState({
      payToast: !this.state.payToast
    });
  }
  componentDidMount() {
    // Create Stripe instance in componentDidMount
    // (componentDidMount only fires in browser/DOM environment)
    this.setState({
      stripe: window.Stripe(process.env.STRIPE_API_KEY_PUBLIC)
    });
    if (!localStorage.getItem("auth_token")) {
      window.location.replace("/login");
    }
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

      const MAIN_QUERY = `{ getCurrentUser { id card_last card_exp_month card_exp_year } }`;

      axiosGitHubGraphQLAuth
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
            getData: true
          });
        })
        .catch(error => {
          this.setState({ getData: true });
        });
    }
  }

  toggleCardDeleted() {
    this.setState({
      cardDeleted: !this.state.cardDeleted
    });
  }

  toggleErrorToast() {
    this.setState({
      errorToast: !this.state.errorToast
    });
  }

  toggleNotificationToast() {
    this.setState({
      notificationToast: !this.state.notificationToast
    });
  }

  toggleMinimumToast() {
    this.setState({
      minimumToast: !this.state.minimumToast
    });
  }

  render() {
    if (!this.state.currentUser) {
      return <div />;
    }

    return (
      <div>
        <Box className={styles.container}>
          <Box full="horizontal">
            <Section align="center" justify="center" pad="large">
              <Columns size="large" pad="large" align="center" justify="center">
                <Box pad="large">
                  <Heading tag="h2">Deposit Funds</Heading>
                  <Paragraph>
                    You can deposit a minimum of $5 into your account.
                    <br />
                  </Paragraph>
                  <Box direction="row">
                    {this.state.currentUser.card_last == "" && (
                      <Elements>
                        <InjectedCheckoutForm {...this.props} {...this.state} />
                      </Elements>
                    )}
                    {this.state.currentUser.card_last != "" && (
                      <div>
                        <Table>
                          <thead>
                            <tr>
                              <th>Card</th>
                              <th>Exp</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <TableRow>
                              <td>
                                **** **** ****{" "}
                                {this.state.currentUser.card_last}
                              </td>
                              <td>
                                {this.state.currentUser.card_exp_month}/
                                {this.state.currentUser.card_exp_year}
                              </td>
                              <td>
                                <Anchor
                                  onClick={() => {
                                    this._deleteCard();
                                  }}
                                  label="Delete"
                                />
                              </td>
                            </TableRow>
                          </tbody>
                        </Table>
                        <br />
                        <FormField
                          help="Enter the amount you want to deposit with a decimal place ($10.00, $15.00)"
                          label="Amount (in USD) *"
                          htmlFor="emailInput"
                          className={styles.formField}
                          error={
                            this.state.amount_field
                              ? this.state.amount_field
                              : ""
                          }
                        >
                          <input
                            required
                            id="emailInput"
                            name="amount"
                            type="number"
                            placeholder="10.00"
                            onChange={e =>
                              this.setState({ amount: e.target.value })
                            }
                            className={styles.input}
                          />
                        </FormField>
                        <br />
                        <Button
                          className={styles.buttonComponentPayment}
                          label="Submit"
                          type="submit"
                          onClick={() => this._updateBalance()}
                        />
                      </div>
                    )}
                  </Box>
                </Box>
                <Box pad="large">
                  <Heading tag="h2">Removing Account Funds</Heading>
                  <Paragraph>
                    Please contact us at ir@jamesg.app to request a refund of
                    money in your account.
                    <br />
                    <br />
                    Your refund will be processed through Stripe.
                  </Paragraph>
                </Box>
              </Columns>
            </Section>
            {this.state.notificationToast == true && (
              <Toast
                status="ok"
                onClose={() => { window.location.replace("/questions") }}
              >
                Your money has been added to your account.
              </Toast>
            )}
            {this.state.errorToast == true && (
              <Toast status="critical" onClose={() => this.toggleErrorToast()}>
                {this.state.errors[0]}
              </Toast>
            )}
            {this.state.minimumToast == true && (
              <Toast status="critical" onClose={() => this.toggleMinimumToast()}>
                The minimum investment is $10.
              </Toast>
            )}
            {this.state.cardDeleted === true && (
              <Toast status="ok" onClose={() => this.toggleCardDeleted()}>
                Your card has been deleted.
              </Toast>
            )}
          </Box>
        </Box>
      </div>
    );
  }

  _updateBalance = async function() {
    var old_amount = this.state.amount
    var new_amount = old_amount.replace(".", "")
    const amount = parseInt(this.state.amount.replace('.', ''));
    const stripe_token = "None";
    if (parseInt(new_amount) < parseInt(1000)) {
      this.toggleMinimumToast()
    } else {
        const result = this.props
          .depositFunds({
            variables: {
              stripe_token,
              amount
            }
          }).catch(res => {
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
          this.toggleNotificationToast();
        }
      }
  }

  _deleteCard = async function() {
    const id = this.state.currentUser.id
    await this.props
      .deleteCard({
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
    }
    if (!this.state.errors) {
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

      const MAIN_QUERY = `{ getCurrentUser { id card_last card_exp_month card_exp_year } }`;

      axiosGitHubGraphQLAuth
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
            getData: true
          });
        })
        .catch(error => {
          this.setState({ getData: true });
        });
      this.toggleCardDeleted();
    }
  };
}
const DELETE_CARD = gql`
  mutation DeleteCard($id: String) {
    deleteCard(id: $id) {
      id
    }
  }
`;

const DEPOSIT_FUNDS = gql`
  mutation DepositFunds($stripe_token: String!, $amount: Int!) {
    depositFunds(stripe_token: $stripe_token, amount: $amount) {
      id
    }
  }
`;

export default compose(
  graphql(DELETE_CARD, { name: "deleteCard" }),
  graphql(DEPOSIT_FUNDS, { name: "depositFunds" })
)(DepositContainer);
