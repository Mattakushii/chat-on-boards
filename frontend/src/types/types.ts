import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any
}

export type Chat = {
  __typename?: 'Chat'
  admin: User
  id: Scalars['Float']
  lastMessage: Message
  messages: Array<Message>
  name: Scalars['String']
  users: Array<User>
}

export type ChatDto = {
  __typename?: 'ChatDTO'
  admin: Scalars['Float']
  bgColors: Array<Scalars['String']>
  id: Scalars['Float']
  lastMessage?: Maybe<Message>
  name: Scalars['String']
}

export type CreateRoomInput = {
  room_name: Scalars['String']
}

export type GetRoomInput = {
  id: Scalars['Float']
}

export type InviteToRoomInput = {
  roomId: Scalars['Float']
  userId: Scalars['Float']
}

export type Message = {
  __typename?: 'Message'
  author: User
  chat: Chat
  date: Scalars['DateTime']
  id: Scalars['Float']
  text: Scalars['String']
}

export type MessageDto = {
  __typename?: 'MessageDTO'
  author: User
  chatId: Scalars['Float']
  date: Scalars['DateTime']
  id: Scalars['Float']
  text: Scalars['String']
}

export type MessageEdge = {
  __typename?: 'MessageEdge'
  cursor: Scalars['String']
  node: Message
}

export type Mutation = {
  __typename?: 'Mutation'
  createChat: Chat
  inviteToChat: Chat
  login: Scalars['String']
  sendMessage: Message
  signUp: Scalars['String']
}

export type MutationCreateChatArgs = {
  roomProps: CreateRoomInput
}

export type MutationInviteToChatArgs = {
  inviteProps: InviteToRoomInput
}

export type MutationLoginArgs = {
  authData: SignInInput
}

export type MutationSendMessageArgs = {
  messageData: SendMessageInput
}

export type MutationSignUpArgs = {
  authData: SignUpInput
}

export type PageInfo = {
  __typename?: 'PageInfo'
  endCursor?: Maybe<Scalars['String']>
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
  startCursor?: Maybe<Scalars['String']>
}

export type PaginatedMessages = {
  __typename?: 'PaginatedMessages'
  edges?: Maybe<Array<MessageEdge>>
  pageInfo?: Maybe<PageInfo>
}

export type Query = {
  __typename?: 'Query'
  getAllChats: Array<ChatDto>
  getChat: Chat
  getMessages: PaginatedMessages
  me: User
}

export type QueryGetChatArgs = {
  chatId: GetRoomInput
}

export type QueryGetMessagesArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  chatId: Scalars['Int']
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
}

export type SendMessageInput = {
  room_id: Scalars['Float']
  text: Scalars['String']
}

export type SendMessageSubscription = {
  chat_id: Array<Scalars['Float']>
}

export type SignInInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type SignUpInput = {
  email: Scalars['String']
  name: Scalars['String']
  password: Scalars['String']
  surname: Scalars['String']
}

export type Status = {
  __typename?: 'Status'
  description: Scalars['String']
  id: Scalars['Float']
  name: Scalars['String']
}

export type Subscription = {
  __typename?: 'Subscription'
  messageSended: Message
}

export type SubscriptionMessageSendedArgs = {
  data: SendMessageSubscription
}

export type User = {
  __typename?: 'User'
  chats: Array<Chat>
  email: Scalars['String']
  id: Scalars['Float']
  name: Scalars['String']
  surname: Scalars['String']
}

export type LoginUserMutationVariables = Exact<{
  data: SignInInput
}>

export type LoginUserMutation = { __typename?: 'Mutation'; login: string }

export type SendSmsMutationVariables = Exact<{
  data: SendMessageInput
}>

export type SendSmsMutation = {
  __typename?: 'Mutation'
  sendMessage: {
    __typename?: 'Message'
    id: number
    text: string
    date: any
    chat: { __typename?: 'Chat'; id: number }
    author: { __typename?: 'User'; id: number; name: string }
  }
}

export type GetMeQueryVariables = Exact<{ [key: string]: never }>

export type GetMeQuery = {
  __typename?: 'Query'
  me: { __typename?: 'User'; name: string; id: number }
}

export type GetChatsQueryVariables = Exact<{ [key: string]: never }>

export type GetChatsQuery = {
  __typename?: 'Query'
  getAllChats: Array<{
    __typename?: 'ChatDTO'
    id: number
    name: string
    bgColors: Array<string>
    lastMessage?: { __typename?: 'Message'; text: string } | null
  }>
}

export type GetMessagesListQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>
  after?: InputMaybe<Scalars['String']>
  last?: InputMaybe<Scalars['Int']>
  before?: InputMaybe<Scalars['String']>
  chatId: Scalars['Int']
}>

export type GetMessagesListQuery = {
  __typename?: 'Query'
  getMessages: {
    __typename?: 'PaginatedMessages'
    edges?: Array<{
      __typename?: 'MessageEdge'
      cursor: string
      node: {
        __typename?: 'Message'
        id: number
        text: string
        date: any
        chat: { __typename?: 'Chat'; id: number }
        author: { __typename?: 'User'; id: number; name: string }
      }
    }> | null
    pageInfo?: {
      __typename?: 'PageInfo'
      endCursor?: string | null
      hasNextPage: boolean
    } | null
  }
}

export type MessagesSubscriptionVariables = Exact<{
  data: SendMessageSubscription
}>

export type MessagesSubscription = {
  __typename?: 'Subscription'
  messageSended: {
    __typename?: 'Message'
    id: number
    text: string
    date: any
    chat: { __typename?: 'Chat'; id: number }
    author: { __typename?: 'User'; id: number; name: string }
  }
}

export const LoginUserDocument = gql`
  mutation loginUser($data: SignInInput!) {
    login(authData: $data)
  }
`
export type LoginUserMutationFn = Apollo.MutationFunction<
  LoginUserMutation,
  LoginUserMutationVariables
>

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginUserMutation,
    LoginUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(
    LoginUserDocument,
    options,
  )
}
export type LoginUserMutationHookResult = ReturnType<
  typeof useLoginUserMutation
>
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<
  LoginUserMutation,
  LoginUserMutationVariables
>
export const SendSmsDocument = gql`
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
export type SendSmsMutationFn = Apollo.MutationFunction<
  SendSmsMutation,
  SendSmsMutationVariables
>

/**
 * __useSendSmsMutation__
 *
 * To run a mutation, you first call `useSendSmsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendSmsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendSmsMutation, { data, loading, error }] = useSendSmsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSendSmsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendSmsMutation,
    SendSmsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useMutation<SendSmsMutation, SendSmsMutationVariables>(
    SendSmsDocument,
    options,
  )
}
export type SendSmsMutationHookResult = ReturnType<typeof useSendSmsMutation>
export type SendSmsMutationResult = Apollo.MutationResult<SendSmsMutation>
export type SendSmsMutationOptions = Apollo.BaseMutationOptions<
  SendSmsMutation,
  SendSmsMutationVariables
>
export const GetMeDocument = gql`
  query GetMe {
    me {
      name
      id
    }
  }
`

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeDocument,
    options,
  )
}

export function useGetMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeDocument,
    options,
  )
}
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>
export type GetMeQueryResult = Apollo.QueryResult<
  GetMeQuery,
  GetMeQueryVariables
>
export const GetChatsDocument = gql`
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

/**
 * __useGetChatsQuery__
 *
 * To run a query within a React component, call `useGetChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChatsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetChatsQuery, GetChatsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<GetChatsQuery, GetChatsQueryVariables>(
    GetChatsDocument,
    options,
  )
}

export function useGetChatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetChatsQuery,
    GetChatsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<GetChatsQuery, GetChatsQueryVariables>(
    GetChatsDocument,
    options,
  )
}
export type GetChatsQueryHookResult = ReturnType<typeof useGetChatsQuery>
export type GetChatsLazyQueryHookResult = ReturnType<
  typeof useGetChatsLazyQuery
>
export type GetChatsQueryResult = Apollo.QueryResult<
  GetChatsQuery,
  GetChatsQueryVariables
>
export const GetMessagesListDocument = gql`
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

/**
 * __useGetMessagesListQuery__
 *
 * To run a query within a React component, call `useGetMessagesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesListQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useGetMessagesListQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMessagesListQuery,
    GetMessagesListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<GetMessagesListQuery, GetMessagesListQueryVariables>(
    GetMessagesListDocument,
    options,
  )
}

export function useGetMessagesListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMessagesListQuery,
    GetMessagesListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<
    GetMessagesListQuery,
    GetMessagesListQueryVariables
  >(GetMessagesListDocument, options)
}
export type GetMessagesListQueryHookResult = ReturnType<
  typeof useGetMessagesListQuery
>
export type GetMessagesListLazyQueryHookResult = ReturnType<
  typeof useGetMessagesListLazyQuery
>
export type GetMessagesListQueryResult = Apollo.QueryResult<
  GetMessagesListQuery,
  GetMessagesListQueryVariables
>
export const MessagesDocument = gql`
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

/**
 * __useMessagesSubscription__
 *
 * To run a query within a React component, call `useMessagesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessagesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesSubscription({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useMessagesSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    MessagesSubscription,
    MessagesSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useSubscription<
    MessagesSubscription,
    MessagesSubscriptionVariables
  >(MessagesDocument, options)
}
export type MessagesSubscriptionHookResult = ReturnType<
  typeof useMessagesSubscription
>
export type MessagesSubscriptionResult =
  Apollo.SubscriptionResult<MessagesSubscription>
