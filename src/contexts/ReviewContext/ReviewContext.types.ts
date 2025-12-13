import type { ReactNode } from 'react'
import type { CreateReviewData, Review } from '../../services/reviewService'

export interface ReviewProviderProps {
  children: ReactNode
}

export interface ReviewContextType {
  reviews: Review[]
  userReviews: Review[]
  isLoading: boolean
  isLoadingUserReviews: boolean
  error: string | null
  createReview: (reviewData: CreateReviewData) => Promise<Review>
  getAnimeReviews: (animeId: number) => Promise<void>
  getUserReviews: () => Promise<void>
  clearReviews: () => void
  clearUserReviews: () => void
}
