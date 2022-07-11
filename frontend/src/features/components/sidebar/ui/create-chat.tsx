import React from 'react'
import classNames from 'classnames'

import st from '../styles.scss'

export const CreateChat = ({ isExpanded }: any) => {
  return (
    <div className={st.sidebarCreateItem}>
      <h2 className={st.sidebarCreateItemIcon}>+</h2>
      <p
        className={classNames(
          st.sidebarCreateItemText,
          isExpanded && st.visibleText,
        )}
      >
        Create chat
      </p>
    </div>
  )
}
