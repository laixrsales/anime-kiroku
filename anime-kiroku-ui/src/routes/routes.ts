export const ROUTES = {
  LANDING: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  RESET_PASSWORD: '/reset-password',
  SEARCH: '/search',

  DASHBOARD: '/dashboard',
  FEED: '/feed',
  ANIME_LIST: '/anime',
  ANIME_DETAIL: '/anime/:id',
  MY_LISTS: '/my-lists',
  PROFILE: '/profile',

  NOT_FOUND: '*',
} as const

export type RouteKey = keyof typeof ROUTES
