import type { Review } from '../../services/reviewService'

export interface ReviewCardProps {
  review: Review
  onReviewClick?: (reviewId: number) => void
  showDate?: boolean
  compact?: boolean
  maxTextLength?: number
}
