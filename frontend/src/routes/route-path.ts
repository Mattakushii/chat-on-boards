export const routePath = {
  handleRoute: { path: '/' },
  auth: {
    path: '/auth',
  },
  register: { path: '/registration' },
  main: { path: '/main' },
  favorites: { path: '/favorites' },
  messenger: {
    path: '/messenger',
    chat: {
      path: ':id',
    },
  },

  workshops: { path: '/workshops' },
  workshop: { path: '/workshop/:id' },
  feed: { path: '/feed' },
  search: { path: '/search' },
  error404: { path: `404` },
  fallback: { path: '*' },
}
