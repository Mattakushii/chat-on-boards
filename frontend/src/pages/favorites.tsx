import React from 'react'
import { RegisterAuth } from '@features/hoc'

const Favorites = () => {
  return <div>Favorites</div>
}

export const ProtectedFavoriets = () => (
  <RegisterAuth>
    <Favorites />
  </RegisterAuth>
)
