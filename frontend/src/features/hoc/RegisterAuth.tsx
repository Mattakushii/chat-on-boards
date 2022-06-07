import React from 'react'
import { Navigate } from 'react-router-dom'

import { RoutesEnum } from '../../enums/routes.enum'

export const RegisterAuth: React.FC = ({ children }) => {
  const isAuth = true

  if (isAuth) {
    return <>{children}</>
  }

  return <Navigate to={`/${RoutesEnum.AUTH}`} replace />
}
