import React from 'react'
import { useRoutes } from 'react-router-dom'
import { useGetMeQuery } from '@types'

import { routes } from './routes'

export const Router = () => {
  const { data } = useGetMeQuery()
  const currentPage = useRoutes(routes)

  return <>{currentPage}</>
}
