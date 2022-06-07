import React from 'react'
import { RegisterAuth } from '@features/hoc/RegisterAuth'

const MainPage = () => {
  return <>MAIN</>
}

export const ProtectedMainPage = () => {
  return (
    <RegisterAuth>
      <MainPage />
    </RegisterAuth>
  )
}
