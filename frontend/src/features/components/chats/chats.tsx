import React from 'react'
import { NavLink } from 'react-router-dom'
import Avatar from '@assets/images/avatar.jpg'

import st from './styles.scss'

export const Chats = () => {
  return (
    <div className={st.chatsContainer}>
      {MOCK_CHATS.map((item) => (
        <ChatItem
          id={item.id}
          name={item.name}
          lastMessage={item.lastMessage}
          date={item.date}
        />
      ))}
    </div>
  )
}

const ChatItem = ({ id, name, lastMessage, date }: any) => {
  return (
    <NavLink key={id} to={id} className={st.chatItem}>
      <img src={Avatar} alt="chat" className={st.avatar} />
      <p>{name}</p>
      <p>{lastMessage}</p>
      <p>{date}</p>
    </NavLink>
  )
}

const MOCK_CHATS = [
  {
    id: '123',
    name: 'Своими руками',
    lastMessage: 'Привет!',
    date: '23.02.22',
  },
  {
    id: '456',
    name: 'Своими ногами',
    lastMessage: 'ку!',
    date: '23.02.22',
  },
  {
    id: '789',
    name: 'Не Своими руками',
    lastMessage: 'смотри!',
    date: '23.02.22',
  },
  {
    id: '101',
    name: 'Своими ногами',
    lastMessage: 'не смотри!',
    date: '23.02.22',
  },
]
