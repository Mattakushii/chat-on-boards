/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { InputMessage } from '@ui'
import classNames from 'classnames'
import { debounce } from 'lodash'

import { client, GET_ME, GET_MESSAGES_LIST } from '../../../api'
import { routePath } from '../../../routes/route-path'
import {
  GetMeQuery,
  GetMessagesListQuery,
  Message,
  useGetMessagesListQuery,
  useMessagesSubscription,
  useSendSmsMutation,
} from '../../../types/types'
import st from './styles.scss'

export const Chat = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()
  const { id } = useParams()
  const userData = client.readQuery<GetMeQuery>({
    query: GET_ME,
  })

  const messageSub = useMessagesSubscription({
    variables: {
      data: {
        chat_id: [Number(id)],
      },
    },
  })

  const updateMessages = useCallback(
    (result: any) => {
      const messages = client.readQuery<GetMessagesListQuery>({
        query: GET_MESSAGES_LIST,
        variables: {
          chatId: Number(id),
          first: 20,
        },
      })

      client.writeQuery({
        query: GET_MESSAGES_LIST,
        variables: {
          chatId: Number(id),
          first: 20,
        },
        data: {
          getMessages: {
            pageInfo: messages.getMessages?.pageInfo,
            edges: [
              {
                __typename: 'MessageEdge',
                node: result,
                cursor: 'null',
              },
              ...messages.getMessages.edges,
            ],
          },
        },
      })
    },
    [id],
  )

  useEffect(() => {
    if (messageSub.data?.messageSended?.chat.id === Number(id)) {
      updateMessages(messageSub.data.messageSended)
    }
  }, [id, messageSub, updateMessages])

  const [sendMessages] = useSendSmsMutation()
  const { loading, error, data, fetchMore } = useGetMessagesListQuery({
    variables: {
      chatId: Number(id),
      first: 20,
    },
  })

  const handlePaging = debounce(() => {
    if (!data?.getMessages?.pageInfo.hasNextPage) {
      return
    }

    fetchMore({
      variables: {
        chatId: Number(id),
        first: 20,
        after: data.getMessages?.pageInfo.endCursor,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        fetchMoreResult.getMessages.edges = [
          ...prevResult.getMessages.edges,
          ...fetchMoreResult.getMessages.edges,
        ]

        return fetchMoreResult
      },
    })
  }, 1500)

  const callback = ([entry]) => {
    if (entry.isIntersecting) {
      return handlePaging()
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback)

    if (ref.current) observer.observe(ref.current)

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      observer.unobserve(ref.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, data])

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        navigate(routePath.messenger.path)
      }
    }
    document.addEventListener('keydown', listener)

    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [navigate])

  const handleSend = (value: string) => {
    sendMessages({
      variables: {
        data: { room_id: Number(id), text: value },
      },
    })
  }

  if (loading) return <>123</>
  if (error) return <>error</>

  return (
    <div className={st.container}>
      <div className={st.chatHeader}>
        <h3>Chat: {id}</h3>
      </div>
      <div className={st.messagesContainer}>
        {data.getMessages?.edges.map((item) => (
          <Message
            key={item.node.id}
            text={item.node.text}
            author={item.node.author.name}
            date={item.node.date}
            isAuthor={item.node.author.id === userData?.me.id}
          />
        ))}
        <div ref={ref} />
      </div>

      <div className={st.inputZone}>
        <InputMessage handleClick={handlePaging} handleSend={handleSend} />
      </div>
    </div>
  )
}

const Message = ({
  text,
  author,
  date,
  isAuthor,
}: {
  text: string
  author: string
  date: Date
  isAuthor: boolean
}) => {
  return (
    <div
      className={classNames(
        st.messageContainer,
        isAuthor && st.messageContainerAuthor,
      )}
    >
      <div className={st.messageAvatar}>{[...author[0]]}</div>
      <div
        className={classNames(
          st.messageBubble,
          isAuthor && st.messageBubbleAuthor,
        )}
      >
        <p className={st.messageBubbleText}>{text}</p>
        <p className={st.messageBubbleDate}>
          {new Date(date).toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
}
