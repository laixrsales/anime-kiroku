import type { Anime } from './animeService'
import type { User } from './authService'

export interface Review {
  id: number
  rating: number
  reviewText?: string
  createdAt: Date
  updatedAt: Date
  anime: Anime
  animeId: number
  user: User
  userId: number
}
