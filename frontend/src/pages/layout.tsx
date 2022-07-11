import React from 'react'
import { Outlet } from 'react-router-dom'
import { ChatInfo } from '@features/components'
import { Sidebar } from '@features/components/sidebar'

import st from './layout.scss'

export const Layout: React.FC = () => {
  return (
    <div className={st.layoutContainer}>
      <Sidebar />
      <ChatInfo />
      <Outlet />
    </div>
  )
}
