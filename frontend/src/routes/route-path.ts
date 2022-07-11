export const routePath = {
  handleRoute: { path: '/' },
  auth: {
    path: '/auth',
  },
  main: {
    path: '/main',
  },
  messenger: {
    path: '/messenger',
  },
  chat: {
    path: '/messenger/:id',
    boards: {
      path: ':id',
    },
  },
  error404: { path: `404` },
  fallback: { path: '*' },
}
