import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { getLocalItem } from './../features/helpers/local-storage'

const httpLink = createHttpLink({
  uri: 'http://localhost:5001/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = getLocalItem('authToken')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
