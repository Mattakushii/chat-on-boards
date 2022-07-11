import React, { useEffect, useState } from 'react'
import { useGetChatsQuery } from '@types'
import classNames from 'classnames'

import st from './styles.scss'
import { CreateChat } from './ui/create-chat'
import { SidebarHeader } from './ui/sidebar-header'
import { SidebarItem } from './ui/sidebar-item'

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { data, loading, error } = useGetChatsQuery()

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={classNames(st.sidebar, isOpen && st.expanded)}
    >
      <CreateChat isExpanded={isOpen} />
      <span className={st.divider} />
      {data?.getAllChats.map((item, idx) => (
        <SidebarItem
          key={idx}
          isExpanded={isOpen}
          name={item.name}
          colors={item.bgColors}
          id={item.id}
        />
      ))}
    </div>
  )
}
