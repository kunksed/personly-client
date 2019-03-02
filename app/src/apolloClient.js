import { ApolloProvider } from 'react-apollo'
import { ApolloClient, addTypeName, createNetworkInterface } from 'apollo-client'
import { createHttpLink, HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter } from 'react-router-dom'
import fetch from 'isomorphic-fetch'
import { AUTH_TOKEN } from './constants'
import { ApolloLink } from 'apollo-client-preset'
import { onError } from "apollo-link-error";

const baseUrl = process.env.API_URL || `${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`;
const httpLink = new HttpLink({ uri: `${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`, fetch: fetch })

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('auth_token')
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  })
  return forward(operation)
})

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink)

const networkInterface = createNetworkInterface({
  uri: `${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`,
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}; // Create the header object if needed.
      }

      req.options.headers.authorization = localStorage.getItem('auth_token') ? `Bearer ${localStorage.getItem('auth_token')}` : null;
      req.options.headers['content-type'] = 'application/graphql';
      req.options.headers['accept-language'] = 'en_US';
      next();
    },
  },
]);

const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// 3
const client = new ApolloClient({
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache(),
  networkInterface: networkInterface,
  initialState: typeof window !== 'undefined' ? window.__APOLLO_STATE__ : null, // eslint-disable-line
  ssrForceFetchDelay: 100,
  queryTransformer: addTypeName,
});

export default client;
