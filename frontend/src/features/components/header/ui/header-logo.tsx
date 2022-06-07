import React from 'react'
import Logo from '@assets/images/logo.png'

import st from './../styles.scss'

export const HeaderLogo = () => {
  return (
    <div className={st.logo}>
      <img src={Logo} alt="" />
      <span>LOGOTYPE</span>
    </div>
  )
}
