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
      path: '/questions',
      getComponent(location, callback) {
        System.import('./pages/QuestionsPage')  // eslint-disable-line block-scoped-var
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
      path: '/account/deposit',
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
      path: '/trade',
      getComponent(location, callback) {
        System.import('./pages/TradePage')  // eslint-disable-line block-scoped-var
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
      path: '/leaderboard',
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
      path: '/trades',
      getComponent(location, callback) {
        System.import('./pages/TradesListPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/start',
      getComponent(location, callback) {
        System.import('./pages/StartPage')  // eslint-disable-line block-scoped-var
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
      path: '/admin/gender',
      getComponent(location, callback) {
        System.import('./pages/AdminGenderPage')  // eslint-disable-line block-scoped-var
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
      path: '/updates',
      getComponent(location, callback) {
        System.import('./pages/UpdatesPage')  // eslint-disable-line block-scoped-var
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
