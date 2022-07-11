import * as React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import { Chat } from '@features/components/chat/chat'
import { AuthPage } from '@pages/auth-page'
import { Layout } from '@pages/layout'
import { ProtectedMessenger } from '@pages/messenger'
import { Page404 } from '@pages/page404'

import { routePath } from './route-path'

export const routes: RouteObject[] = [
  {
    path: routePath.handleRoute.path,
    element: <Navigate to={routePath.messenger.path} replace />,
  },
  { path: routePath.auth.path, element: <AuthPage /> },
  {
    element: <Layout />,
    children: [
      { path: routePath.main.path, element: <>123</> },
      {
        path: routePath.messenger.path,
        element: <ProtectedMessenger />,
      },
      {
        path: routePath.chat.path,
        element: <Chat />,
      },
    ],
  },
  { path: routePath.fallback.path, element: <Page404 /> },
]
