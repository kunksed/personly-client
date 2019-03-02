/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import morgan from 'morgan';
import React from 'react';
import env from 'node-env-file';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import { getDataFromTree } from 'react-apollo';
import { Provider } from 'react-redux';
import { createNetworkInterface } from 'apollo-client';
import styleSheet from 'styled-components/lib/models/StyleSheet';
import store from '../app/src/store';
import { routes } from '../app/src/routes';
import Html from './utils/Html';
import createApolloClient from './utils/createApolloClient';
import manifest from './public/manifest.json';
import rootReducer from '../app/src/reducers.js'

env(path.join(__dirname, '..', '.env'));

const app = express();
const serverUrl = process.env.BASE_URL || 'http://0.0.0.0:1337';
const apiUrl = 'http://jamesg.herokuapp.com/';
const PORT = process.env.PORT | 1337;
const IP = '0.0.0.0';
const graphqlUrl = `${apiUrl}graphql`;
const debug = process.env.DEBUG === 'true';

if (debug) { app.use(morgan('combined')); }
app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res) => {
  match({ routes, location: req.url },
    (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        console.error('ROUTER ERROR:', error); // eslint-disable-line no-console
        res.status(500);
      } else if (renderProps) {
        const styles = styleSheet.rules().map(rule => rule.cssText).join('\n');
        const client = createApolloClient({
          ssrMode: true,
          networkInterface: createNetworkInterface({
            uri: graphqlUrl,
            credentials: 'same-origin',
            headers: req.headers,
          }),
        });

        const component = (
          <ApolloProvider client={client} store={store}>
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
          </ApolloProvider>
        );
        getDataFromTree(component).then((ctx) => {
          const content = renderToString(component);
          const html = (
            <Html
              content={content}
              scriptHash={manifest['/main.js']}
              vendorHash={manifest['/vendor.js']}
              cssHash={manifest['/main.css']}
              styles={styles}
              state={ctx.store.getState()}
            />
          );
          res.status(200).send(`<!doctype html>\n${renderToStaticMarkup(html)}`);
        }).catch(e => {
            const content = renderToString(component);
            const html = (
              <Html
                content={content}
                scriptHash={manifest['/main.js']}
                vendorHash={manifest['/vendor.js']}
                cssHash={manifest['/main.css']}
                styles={styles}
              />
            );
            res.status(200).send(`<!doctype html>\n${renderToStaticMarkup(html)}`);
        });
      } else {
        res.status(404).send('Not found');
      }
    });
});

app.listen(process.env.PORT, '0.0.0.0', (err) => {
  if (err) {
    return console.warn(err);
  }
  return console.info(`==> 😎 Listening on port ${PORT}. Open http://${IP}:${PORT} in your browser.`);
});
