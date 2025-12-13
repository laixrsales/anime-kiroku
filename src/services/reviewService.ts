import type { Anime } from './animeService'
import api from './api'

export interface Review {
  id: number
  rating: number
  reviewText?: string | null
  createdAt: string
  updatedAt: string
  userId: number
  animeId: number
  anime: Anime
  user: {
    username: string
  }
}

export interface CreateReviewData {
  jikanId: number
  rating: number
  reviewText: string
}

export const createReview = async (
  reviewData: CreateReviewData,
): Promise<Review> => {
  const response = await api.post('/review', reviewData)
  return response.data.data
}

export const getAnimeReviews = async (jikanId: number): Promise<Review[]> => {
  const response = await api.get(`/review/${jikanId}`)
  return response.data.data
}

export const getUserReviews = async (): Promise<Review[]> => {
  const response = await api.get('/review/user')
  return response.data.data
}
