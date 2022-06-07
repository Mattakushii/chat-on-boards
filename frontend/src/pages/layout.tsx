import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '@features/components'
import { Sidebar } from '@features/components/sidebar'
import { Box } from '@ui'

import st from './layout.scss'

export const Layout: React.FC = () => {
  return (
    <div className={st.test}>
      <Header />
      <div className={st.layoutContainer}>
        <Box classNames={st.mess}>
          <Sidebar />
          <Outlet />
        </Box>
      </div>
    </div>
  )
}
