import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation loginUser($data: SignInInput!) {
    login(authData: $data)
  }
`
