import React from 'react'
import classNames from 'classnames'

import st from '../styles.scss'

export const SidebarHeader = ({ isOpen }) => {
  return (
    <div className={st.sidebarHeader}>
      <p className={st.sidebarHeaderHeading}>B</p>
      <p
        className={classNames(
          st.sidebarHeaderHiding,
          isOpen && st.sidebarHeaderShow,
        )}
      >
        rave chat
      </p>
    </div>
  )
}
