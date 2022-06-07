import React from 'react'
import { RegisterAuth } from '@features/hoc'

const Feed = () => {
  return <div>Feed</div>
}

export const ProtectedFeedPage = () => (
  <RegisterAuth>
    <Feed />
  </RegisterAuth>
)
