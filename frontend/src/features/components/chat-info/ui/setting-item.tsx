import React, { ComponentType, ReactNode } from 'react'

import st from '../styles.scss'

type TProps = {
  text: string
  Icon: JSX.Element
}

export const SettingItem = ({ text, Icon }: TProps) => {
  return (
    <div className={st.settingsItem}>
      <div className={st.settingsItemIcon}>{Icon}</div>
      <div>{text}</div>
    </div>
  )
}
