import React from 'react'
import { StatusSettingsIcon } from '@assets/icons/status-settings'
import Avatar from '@assets/images/avatar.jpg'
import { useGetMeQuery } from '@types'

import st from '../styles.scss'

export enum StatusEnum {
  ONLINE = 'online',
  OFFLINE = 'offline',
  BUSY = 'busy',
}

export const UserSection = () => {
  const { data, loading, error } = useGetMeQuery()

  return (
    <div className={st.userCard}>
      <div className={st.userCardAvatar}>
        <img src={Avatar} alt="Profile avatar" />
      </div>
      <div className={st.userCardInfo}>
        <h3 className={st.userCardInfoName}>{data?.me.name}</h3>
        <p className={st.status}>
          <span className={st[StatusEnum.ONLINE]} />
          online
        </p>
      </div>
      <div>
        <StatusSettingsIcon />
      </div>
    </div>
  )
}
