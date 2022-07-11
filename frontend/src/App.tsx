/* eslint-disable import/no-default-export */
import './index.scss'

import React from 'react'
import { ApolloProvider } from '@apollo/client'

import { client } from './api'
import { Router } from './routes/router'

function App() {
  console.log(123)

  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  )
}

export default App
