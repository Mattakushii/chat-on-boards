import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { GET_CHAT_LIST } from '../../../api/queries'
import st from './styles.scss'
import { SettingsSection } from './ui/settings-section'
import { UserSection } from './ui/user-section'

export const ChatInfo = () => {
  const { loading, error, data } = useQuery(GET_CHAT_LIST)
  const { id } = useParams()

  useEffect(() => {
    console.log(id)
  }, [id])

  const handlePress = () => {
    localStorage.clear()
  }

  // if (loading) return <>Loading....</>
  // if (error) return <>something went wrong......</>

  return (
    <div className={st.container}>
      <UserSection />
      <SettingsSection />

      {!!id && <>{id}</>}
      <h1 onClick={handlePress}>CLEAN</h1>
    </div>
  )
}
