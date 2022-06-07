import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GroupsIcon } from '@assets/icons/groups'

import st from '../styles.scss'

type TProps = {
  title: string
  linkTo: string
}

export const SidebarItem = ({ title, linkTo }: TProps) => {
  return (
    <NavLink to={linkTo} className={st.sidebarItem}>
      <div className={st.sidebarItemIcon}>
        <GroupsIcon />
      </div>
      <span>{title}</span>
    </NavLink>
  )
}
