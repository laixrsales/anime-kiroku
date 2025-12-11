import type { Review } from '../../services/reviewService'

export interface LatestReviewsProps {
  reviews: Review[]
  isLoading?: boolean
  title?: string
  moreButtonText?: string
  onMoreClick?: () => void
  onReviewClick?: (reviewId: number) => void
  limit?: number
  compact?: boolean
  showDate?: boolean
  maxTextLength?: number
}
