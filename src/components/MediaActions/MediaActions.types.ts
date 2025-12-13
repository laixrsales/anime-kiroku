import { type MouseEvent } from 'react'

export type ActionType = 'reviewed' | 'liked' | 'watchlisted'

export interface MediaActionsProps {
  reviewed?: boolean
  liked?: boolean
  shared?: boolean
  rating?: number

  labels?: {
    review?: string
    like?: string
    share?: string
    rate?: string
    reviewed?: string
    liked?: string
    shared?: string
    rated?: string
  }
  onReviewClick?: (event: MouseEvent<HTMLButtonElement>) => void
  onLikeClick?: (event: MouseEvent<HTMLButtonElement>) => void
  onShareClick?: (event: MouseEvent<HTMLButtonElement>) => void
  onRatingChange?: (rating: number) => void
  disabled?: boolean
}

export interface StarRatingProps {
  rating: number
  hoverRating: number
  onRatingChange: (rating: number) => void
  onHoverChange: (rating: number) => void
  disabled?: boolean
  size?: number
}
