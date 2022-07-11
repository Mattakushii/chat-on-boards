import React, { useCallback, useEffect, useState } from 'react'
import { Attach } from '@assets/icons/attach'
import { Emoji } from '@assets/icons/emoji'
import { Send } from '@assets/icons/send'

import st from './styles.scss'

export const InputMessage = ({ handleClick, handleSend }: any) => {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  const sendMessage = useCallback(() => {
    if (value) {
      handleSend(value)
      setValue('')
    }
  }, [handleSend, value])

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === 'Enter') {
        sendMessage()
      }
    }

    document.addEventListener('keydown', listener)

    return () => document.removeEventListener('keydown', listener)
  }, [sendMessage, value])

  return (
    <div className={st.inputMessageContainer}>
      <div className={st.attachContainer}>
        <Attach width={28} height={28} />
      </div>
      <textarea
        placeholder="Write message here....."
        className={st.inputMessage}
        value={value}
        onChange={handleChange}
      />
      <div onClick={handleClick} className={st.emojiContainer}>
        <Emoji width={28} height={28} />
      </div>
      <div onClick={sendMessage} className={st.sendContainer}>
        <Send width={28} height={28} />
      </div>
    </div>
  )
}
