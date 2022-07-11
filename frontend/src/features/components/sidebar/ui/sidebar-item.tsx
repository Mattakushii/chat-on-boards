import React from 'react'
import { NavLink } from 'react-router-dom'
import Avatar from '@assets/images/avatar.jpg'
import classNames from 'classnames'

import st from '../styles.scss'

export const SidebarItem = ({ isExpanded, name, id, img, colors }: any) => {
  return (
    <NavLink
      key={id}
      to={`messenger/${id}`}
      className={(navData) =>
        classNames(st.sidebarItem, navData.isActive && st.active)
      }
    >
      <div
        className={st.sidebarItemAvatar}
        style={{
          background: `linear-gradient(45deg, ${colors[0]} 50%,${colors[1]} 100%)`,
          filter: `${img ? 'none' : 'grayscale(0.5)'}`,
        }}
      >
        {img ? <img src={Avatar} alt="chat" /> : <p>{getFirstSigns(name)}</p>}
      </div>
      <div
        className={classNames(st.sidebarItemText, isExpanded && st.visibleText)}
      >
        {name}
      </div>
    </NavLink>
  )
}

const getFirstSigns = (text: string): string => {
  const separated = text.split(' ')
  const result: string[] = []

  for (let i = 0; i < separated.length; i++) {
    result.push(separated[i][0].toUpperCase())
  }

  if (result.length > 1) {
    return `${result[0]}${result[1]}`
  }

  return result[0]
}
