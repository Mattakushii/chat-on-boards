import React, { useState } from 'react'
import { ReactComponent as DropdownArrow } from '@assets/icons/dropdownArrow.svg'
import Avatar from '@assets/images/avatar.jpg'

import st from './../styles.scss'

const MOCK_DATA = {
  name: 'Константин',
  menuItems: [
    { text: 'Профиль' },
    { text: 'Статистика' },
    { text: 'Настройки' },
    { text: 'Выйти' },
  ],
}

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className={st.userMenuContainer}
        onClick={() => {
          setIsOpen((prevState) => !prevState)
        }}
      >
        <img className={st.avatar} src={Avatar} alt="" />

        <DropdownArrow />
      </div>

      {isOpen && (
        <div className={st.headerUserMenu}>
          {MOCK_DATA.menuItems.map((item, idx) => (
            <div className={st.headerUserMenuItem} key={idx}>
              {item.text}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
