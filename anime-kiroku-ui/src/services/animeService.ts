import api from './api'
import type { Review } from './reviewService'

export interface Anime {
  id: number
  jikanId: number
  title: string
  imageUrl?: string
  synopsis?: string
  episodes?: number
  score?: number
  status?: string
  createdAt: string
  updatedAt: string
  reviews: Review[]
}

export const getTopAnimes = async (): Promise<Anime[]> => {
  const response = await api.get('/anime/top')
  return response.data.data
}

export const searchAnime = async (query: string): Promise<Anime[]> => {
  const response = await api.get(`/anime/search?q=${query}`)
  return response.data.data
}

export const getAnimeById = async (id: number): Promise<Anime> => {
  const response = await api.get(`/anime/${id}`)
  return response.data.data
}

export const getAnimeRecommendations = async (
  animeId: number,
): Promise<Anime[]> => {
  const response = await api.get(`/anime/${animeId}/recommendations`)
  return response.data.data
}
