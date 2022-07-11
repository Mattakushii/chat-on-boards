import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation loginUser($data: SignInInput!) {
    login(authData: $data)
  }
`

export const SEND_MESSAGE = gql`
  mutation sendSMS($data: SendMessageInput!) {
    sendMessage(messageData: $data) {
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
