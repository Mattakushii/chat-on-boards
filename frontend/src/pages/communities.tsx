import React from 'react'
import { RegisterAuth } from '@features/hoc'

const Communities = () => {
  return <div>Communities</div>
}

export const ProtectedCommunities = () => (
  <RegisterAuth>
    <Communities />
  </RegisterAuth>
)
