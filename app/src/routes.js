/* global System b:true */
import React from 'react';
import { Router } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import store, { history } from './store';
import client from './apolloClient';
import { AppContainer } from 'containers'; // eslint-disable-line

/* eslint-disable */
// Polyfill for the System.import
if (typeof System === 'undefined') {
  var System = {
    import(path) {
      return Promise.resolve(require(path));
    },
  };
}
/* eslint-enable */

// Switching to system.import to make use of dynamic tree shaking
// https://medium.com/modus-create-front-end-development/automatic-code-splitting-for-react-router-w-es6-imports-a0abdaa491e9#.msrxv8fwd
const errorLoading = err =>
  console.error('Dynamic loading failed' + err); // eslint-disable-line

const loadRoute = cb =>
  module =>
    cb(null, module.default);

export const routes = {
  component: AppContainer,
  path: '/',
  indexRoute: {
    getComponent(location, callback) {
      System.import('./pages/LandingPage') // eslint-disable-line block-scoped-var
        .then(loadRoute(callback))
        .catch(err => errorLoading(err));
    },
  },
  childRoutes: [
    {
      path: '/about',
      getComponent(location, callback) {
        System.import('./pages/AboutPage') // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/people/:id',
      getComponent(location, callback) {
        System.import('./pages/PersonPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/questions/:id',
      getComponent(location, callback) {
        System.import('./pages/QuestionPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/settings/deposit',
      getComponent(location, callback) {
        System.import('./pages/DepositPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/login',
      getComponent(location, callback) {
        System.import('./pages/LoginPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/register',
      getComponent(location, callback) {
        System.import('./pages/RegisterPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/settings',
      getComponent(location, callback) {
        System.import('./pages/UpdateProfile')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/new',
      getComponent(location, callback) {
        System.import('./pages/CreateQuestionPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/profile/:id',
      getComponent(location, callback) {
        System.import('./pages/ProfilePage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/dashboard/leaderboard',
      getComponent(location, callback) {
        System.import('./pages/LeaderboardPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/users',
      getComponent(location, callback) {
        System.import('./pages/UserPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/questions/:id/edit',
      getComponent(location, callback) {
        System.import('./pages/EditQuestionPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/admin',
      getComponent(location, callback) {
        System.import('./pages/AdminPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/reset',
      getComponent(location, callback) {
        System.import('./pages/RequestPasswordResetPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/updates/:id',
      getComponent(location, callback) {
        System.import('./pages/UpdatesPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/settings/investments',
      getComponent(location, callback) {
        System.import('./pages/InvestmentsListPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/dashboard/shareholders',
      getComponent(location, callback) {
        System.import('./pages/ShareholdersPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/dashboard',
      getComponent(location, callback) {
        System.import('./pages/DashboardPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/new/update',
      getComponent(location, callback) {
        System.import('./pages/CreateUpdatePage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/people',
      getComponent(location, callback) {
        System.import('./pages/PeopleListPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/for-people',
      getComponent(location, callback) {
        System.import('./pages/ForPeoplePage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/for-investors',
      getComponent(location, callback) {
        System.import('./pages/ForInvestorsPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/updates/:id/edit',
      getComponent(location, callback) {
        System.import('./pages/EditShareholderUpdatePage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/dashboard/relations',
      getComponent(location, callback) {
        System.import('./pages/ShareholderRelationsPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/terms',
      getComponent(location, callback) {
        System.import('./pages/TermsPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/privacy',
      getComponent(location, callback) {
        System.import('./pages/PrivacyPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/risks',
      getComponent(location, callback) {
        System.import('./pages/RisksPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/contact',
      getComponent(location, callback) {
        System.import('./pages/ContactPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/faqs',
      getComponent(location, callback) {
        System.import('./pages/Faqpage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/faqs/investor',
      getComponent(location, callback) {
        System.import('./pages/InvestorFaqsPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/dashboard/listing',
      getComponent(location, callback) {
        System.import('./pages/UpdateListingPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/search',
      getComponent(location, callback) {
        System.import('./pages/SearchPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/notifications',
      getComponent(location, callback) {
        System.import('./pages/NotificationsPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/dashboard/dividends',
      getComponent(location, callback) {
        System.import('./pages/DividendsPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
/* GENERATOR: Newly generated Routes go here */
    {
      path: '*',
      getComponent(location, callback) {
        System.import('./pages/NotFoundPage') // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
  ],
};

const RouterApp = props => (
  <ApolloProvider {...props} store={store} client={client}>
    <Router
      history={history}
      routes={routes}
    />
  </ApolloProvider>
);

export default RouterApp;
