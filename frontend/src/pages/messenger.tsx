import React from 'react'
import { Outlet } from 'react-router-dom'
import { Chats } from '@features/components'
import { RegisterAuth } from '@features/hoc'
import { Box } from '@ui'

import st from './layout.scss'

const Messenger = () => {
  return (
    <Box classNames={st.mess}>
      <Chats />
      <Outlet />
    </Box>
  )
}

export const ProtectedMessenger = () => (
  <RegisterAuth>
    <Messenger />
  </RegisterAuth>
)
