import React from 'react'
import { Box } from '@ui'

import st from './styles.scss'
import { HeaderLogo } from './ui/header-logo'
import { UserMenu } from './ui/user-menu'

export const Header = () => {
  return (
    <>
      <div className={st.headerContainer}>
        <Box classNames={st.box}>
          <HeaderLogo />
          <div className={st.searchMenuContainer} />
          <UserMenu />
        </Box>
      </div>
    </>
  )
}
