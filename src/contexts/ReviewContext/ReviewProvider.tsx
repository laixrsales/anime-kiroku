import { useState, useCallback } from 'react'
import { ReviewContext } from './ReviewContext'
import type {
  ReviewContextType,
  ReviewProviderProps,
} from './ReviewContext.types'
import * as reviewService from '../../services/reviewService'
import type { CreateReviewData, Review } from '../../services/reviewService'

export function ReviewProvider({ children }: ReviewProviderProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [userReviews, setUserReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingUserReviews, setIsLoadingUserReviews] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreateReview = useCallback(
    async (reviewData: CreateReviewData): Promise<Review> => {
      setIsLoading(true)
      setError(null)
      try {
        const newReview = await reviewService.createReview(reviewData)

        setReviews((prev) => [newReview, ...prev])
        setUserReviews((prev) => [newReview, ...prev])

        return newReview
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        let errorMessage = 'Erro ao criar avaliação'

        if (err.response?.status === 409) {
          errorMessage = 'Você já avaliou este anime'
        } else if (err.response?.status === 404) {
          errorMessage = 'Anime não encontrado'
        } else if (err.response?.status === 400) {
          errorMessage = 'Dados inválidos'
        }

        setError(errorMessage)
        console.error('Erro no ReviewContext:', err)
        throw new Error(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  const handleGetAnimeReviews = useCallback(async (jikanId: number) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await reviewService.getAnimeReviews(jikanId)
      setReviews(data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError('Anime não encontrado')
      } else {
        setError('Erro ao buscar avaliações do anime')
      }
      console.error('Erro no ReviewContext:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleGetUserReviews = useCallback(async () => {
    setIsLoadingUserReviews(true)
    setError(null)
    try {
      const data = await reviewService.getUserReviews()
      setUserReviews(data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Você precisa estar logado para ver suas avaliações')
      } else {
        setError('Erro ao buscar suas avaliações')
      }
      console.error('Erro no ReviewContext:', err)
    } finally {
      setIsLoadingUserReviews(false)
    }
  }, [])

  const clearReviews = useCallback(() => {
    setReviews([])
    setError(null)
  }, [])

  const clearUserReviews = useCallback(() => {
    setUserReviews([])
    setError(null)
  }, [])

  const value: ReviewContextType = {
    reviews,
    userReviews,
    isLoading,
    isLoadingUserReviews,
    error,
    createReview: handleCreateReview,
    getAnimeReviews: handleGetAnimeReviews,
    getUserReviews: handleGetUserReviews,
    clearReviews,
    clearUserReviews,
  }

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  )
}
