import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import App from "grommet/components/App";
import * as actionCreators from "./actions";
import { AppContainer as ReactHotLoader } from "react-hot-loader";
import { Navbar, AppFooter } from "components";
import * as AppContainerActionCreators from "./actions";
import { Elements, StripeProvider } from "react-stripe-elements-universal";
import * as Sentry from '@sentry/browser';

class AppContainer extends Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.handleSetMobile = this.handleSetMobile.bind(this);
    this.state = {
      stripe: null
    };
  }

  componentDidMount() {
    // Create Stripe instance in componentDidMount
    // (componentDidMount only fires in browser/DOM environment)
    this.setState({
      stripe: window.Stripe(process.env.STRIPE_API_KEY_PUBLIC)
    });
    Sentry.init({ dsn: 'https://25a9ab9f95ac4b3d9b7b3e85a75a1d96@sentry.io/1409599' });
    console.clear();
    this.handleSetMobile();
  }

  handleSetMobile() {
    const isMobile = window.innerWidth <= 860;
    this.setState({ isMobile: isMobile });
  }

  render() {
    const { location, isMobile, actions } = this.props;
    return (
      <ReactHotLoader>
        <StripeProvider
          apiKey="pk_test_QnpEPVRt4G1OFWilu42D4U8y"
          stripe={this.state.stripe}
        >
          <App centered={false} inline>
            <Navbar pathname={location.pathname} />
            {React.cloneElement(this.props.children, this.props)}
            <AppFooter />
          </App>
        </StripeProvider>
      </ReactHotLoader>
    );
  }
}

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired, // eslint-disable-line
  isMobile: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

// mapStateToProps :: {State} -> {Props}
const mapStateToProps = state => ({
  isMobile: state.app.isMobile // example / unused
});

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppContainerActionCreators, dispatch)
});

const Container = AppContainer;

export default Container;
