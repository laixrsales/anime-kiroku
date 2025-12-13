export interface CreateReviewModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (rating: number, reviewText: string) => Promise<void>
  initialRating?: number
  initialReviewText?: string
  animeTitle?: string
  isUpdate?: boolean
  isLoading?: boolean
}
