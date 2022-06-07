import React from 'react'
import classNames from 'classnames'

import st from './styles.scss'

type TProps = {
  text: string
  url: string
  styles?: string
  isRightPosition?: boolean
}

export const Link = ({
  text,
  url,
  styles,
  isRightPosition = false,
}: TProps) => {
  return (
    <div
      className={classNames(
        st.linkContainer,
        isRightPosition && st.linkRight,
        styles,
      )}
    >
      <a className={st.link} href={url}>
        {text}
      </a>
    </div>
  )
}
