import React from 'react'

import st from './styles.scss'

type TProps = {
  text?: string
}

export const Divider = ({ text }: TProps) => {
  return (
    <div className={st.dividerContainer}>
      {text ? (
        <>
          <div className={st.divider} />
          <span className={st.dividerText}>{text}</span>
          <div className={st.divider} />
        </>
      ) : (
        <div className={st.divider} />
      )}
    </div>
  )
}
