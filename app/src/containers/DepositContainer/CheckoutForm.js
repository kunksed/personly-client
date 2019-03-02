import React from "react";
import { injectStripe } from "react-stripe-elements-universal";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import styles from "./index.module.scss";
import {
  FullSection,
  MainContent,
  MainBox,
  ThumbnailImage,
  Wrapper
} from "./styles";
import cssModules from "react-css-modules";
import { Divider, LoadingIndicator } from "components";
import regeneratorRuntime from "regenerator-runtime";
import CardSection from "./CardSection";
import Toast from "grommet/components/Toast";
import Button from "grommet/components/Button";
import FormField from "grommet/components/FormField";
import Form from "grommet/components/Form";
import axios from "axios";
import CheckmarkIcon from "grommet/components/icons/base/Checkmark";

class CheckForm extends React.Component {
  constructor() {
    super();
    this.state = {
      createCardToast: false,
      errors: null
    };
  }

  handleSubmit = ev => {
    // We don't want to let default form submission happen here, which would refresh the page.
      ev.preventDefault();
      var old_amount = this.state.amount
      var new_amount = old_amount.replace(".", "")
      if (parseInt(new_amount) < parseInt(500)) {
        this.toggleMinimumToast()
      } else {
        this.props.stripe.createToken({ name: "Jenny Rosen" }).then(({ token }) => {
        const amount = parseInt(this.state.amount.replace('.', ''));
        const stripe_token = token.id;
        this.setState({ amount_field: null, errors: null });
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
      });
    }
  };

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
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <CardSection />
          <br />
          <FormField
            help="Enter the amount you want to deposit with a decimal place ($10.00, $15.00)"
            label="Amount (in USD) *"
            htmlFor="emailInput"
            className={styles.formField}
            error={this.state.amount_field ? this.state.amount_field : ""}
          >
            <input
              required
              id="emailInput"
              name="amount"
              type="number"
              placeholder="10.00"
              onChange={e => this.setState({ amount: e.target.value })}
              className={styles.input}
            />
          </FormField>
          <br />
          <Button
            className={styles.buttonComponentPayment}
            label="Submit"
            type="submit"
            onClick={this.handleSubmit}
          />
        </Form>
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
            The minimum investment is $5.
          </Toast>
        )}
      </div>
    );
  }
}

const DEPOSIT_FUNDS = gql`
  mutation DepositFunds($stripe_token: String!, $amount: Int!) {
    depositFunds(stripe_token: $stripe_token, amount: $amount) {
      id
    }
  }
`;

const CheckoutForm = injectStripe(CheckForm);

export default compose(graphql(DEPOSIT_FUNDS, { name: "depositFunds" }))(
  CheckoutForm
);
