import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

import { getLocalItem } from './../features/helpers/local-storage'

const abortController = new AbortController()

const httpLink = createHttpLink({
  uri: 'http://localhost:5001/graphql',
  fetchOptions: {
    mode: 'cors',
    signal: abortController.signal,
  },
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:5001/graphql`,
  options: {
    reconnect: true,
  },
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

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    console.log(123)

    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  authLink.concat(wsLink),
  authLink.concat(httpLink),
)

const cahcheConfig = new InMemoryCache()

export const client = new ApolloClient({
  link: splitLink,
  cache: cahcheConfig,
})
