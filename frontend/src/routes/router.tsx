import React from 'react'
import { useRoutes } from 'react-router-dom'

import { routes } from './routes'

export const Router = () => {
  const currentPage = useRoutes(routes)

  return <>{currentPage}</>
}
