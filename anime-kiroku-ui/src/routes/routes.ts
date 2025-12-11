export const ROUTES = {
  LANDING: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  SEARCH: '/search',

  DASHBOARD: '/dashboard',
  ANIME_DETAIL: '/anime/:id',
  ANIME_REVIEWS: '/anime/:id/reviews',

  NOT_FOUND: '*',
} as const

export type RouteKey = keyof typeof ROUTES
