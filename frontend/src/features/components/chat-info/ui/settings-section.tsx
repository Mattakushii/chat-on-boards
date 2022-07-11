import React from 'react'
import { Settings } from '@assets/icons/settings'

import st from '../styles.scss'
import { SettingItem } from './setting-item'

export const SettingsSection = () => {
  return (
    <div className={st.settings}>
      <SettingItem text={'Settings'} Icon={<Settings />} />
    </div>
  )
}
