import React from 'react'

import { routePath } from '../../../routes/route-path'
import st from './styles.scss'
import { SidebarItem } from './ui/sidebar-item'

export const Sidebar = () => {
  return (
    <div className={st.sidebar}>
      <SidebarItem title="Моя Страница" linkTo={routePath.main.path} />
      <SidebarItem title="Новости" linkTo={routePath.feed.path} />
      <SidebarItem title="Избранное" linkTo={routePath.favorites.path} />
      <SidebarItem title="Сообщества" linkTo={routePath.workshops.path} />
      <SidebarItem title="Messenger" linkTo={routePath.messenger.path} />
    </div>
  )
}
