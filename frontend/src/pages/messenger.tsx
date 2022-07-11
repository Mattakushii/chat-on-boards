import React, { useEffect, useRef, useState } from 'react'
import { logMissingFieldErrors } from '@apollo/client/core/ObservableQuery'
import { RegisterAuth } from '@features/hoc'

import st from './layout.scss'

const Messenger = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  const callback = ([entry]) => {
    console.log('messenger observe', entry.isIntersecting)

    setVisible(entry.isIntersecting)
  }

  useEffect(() => {
    console.log('updated')

    const observer = new IntersectionObserver(callback)

    if (ref.current) observer.observe(ref.current)

    return () => {
      console.log('unapdated')

      // eslint-disable-next-line react-hooks/exhaustive-deps
      observer.unobserve(ref.current)
    }
  }, [ref])

  return (
    <div className={st.test}>
      <div className={st.header}>HEADER</div>
      <div className={st.box}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, idx) => (
          <div key={idx} className={st.block}>
            {item}
          </div>
        ))}

        <div ref={ref} />
      </div>
      <div className={st.footer}>FOOTER</div>
    </div>
  )
}

export const ProtectedMessenger = () => (
  <RegisterAuth>
    <Messenger />
  </RegisterAuth>
)
