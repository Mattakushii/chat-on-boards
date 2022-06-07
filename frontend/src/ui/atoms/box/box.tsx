import React from 'react'
import cn from 'classnames'

import st from './styles.scss'

type TProps = {
  classNames?: string
}

export const Box: React.FC<TProps> = ({ children, classNames }) => {
  return <div className={cn(st.box, classNames)}>{children}</div>
}
