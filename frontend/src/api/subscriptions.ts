import { gql } from '@apollo/client'

export const MESSAGE_LISTENER = gql`
  subscription Messages($data: SendMessageSubscription!) {
    messageSended(data: $data) {
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
  }
`
