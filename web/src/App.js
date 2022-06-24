import React from 'react';
import Pages from './pages';
import GlobalStyle from './compnents/GlobalStyle';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createHttpLink } from "@apollo/client/link/http"
import { setContext } from 'apollo-link-context';

const uri = process.env.REACT_APP_API_URI ;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
  resolvers: {},
  connectToDevTools: true
});

function App() {

  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
}
 
export default App;
