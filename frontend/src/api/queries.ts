import { gql } from '@apollo/client'

export const GET_ME = gql`
  query GetMe {
    me {
      name
      id
    }
  }
`

export const GET_CHAT_LIST = gql`
  query GetChats {
    getAllChats {
      id
      name
      lastMessage {
        text
      }
      bgColors
    }
  }
`

export const GET_MESSAGES_LIST = gql`
  query GetMessagesList(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $chatId: Int!
  ) {
    getMessages(
      first: $first
      after: $after
      last: $last
      before: $before
      chatId: $chatId
    ) {
      edges {
        node {
          id
          text
          date
          chat {
            id
          }
          author {
            id
            name
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`
