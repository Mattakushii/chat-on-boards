import * as React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import { RoutesEnum } from '@enums/routes.enum'
import { Chat } from '@features/components/chat/chat'
import { AuthPage } from '@pages/auth-page'
import { ProtectedCommunities } from '@pages/communities'
import { ProtectedFavoriets } from '@pages/favorites'
import { ProtectedFeedPage } from '@pages/feed'
import { Layout } from '@pages/layout'
import { ProtectedMainPage } from '@pages/main-page'
import { ProtectedMessenger } from '@pages/messenger'
import { Page404 } from '@pages/page404'

import { routePath } from './route-path'

export const routes: RouteObject[] = [
  {
    path: routePath.handleRoute.path,
    element: <Navigate to={RoutesEnum.MAIN_PAGE} replace />,
  },
  { path: routePath.auth.path, element: <AuthPage /> },
  {
    element: <Layout />,
    children: [
      { path: routePath.main.path, element: <ProtectedMainPage /> },
      { path: routePath.feed.path, element: <ProtectedFeedPage /> },
      { path: routePath.workshops.path, element: <ProtectedCommunities /> },
      { path: routePath.favorites.path, element: <ProtectedFavoriets /> },
      {
        path: routePath.messenger.path,
        element: <ProtectedMessenger />,
        children: [
          {
            path: routePath.messenger.chat.path,
            element: <Chat />,
          },
        ],
      },
    ],
  },
  { path: routePath.fallback.path, element: <Page404 /> },
]
