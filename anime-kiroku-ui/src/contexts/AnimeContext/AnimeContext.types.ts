import type { ReactNode } from 'react'
import type { Anime } from '../../services/animeService'

export interface AnimeProviderProps {
  children: ReactNode
}

export interface AnimeContextType {
  animes: Anime[]
  recommendations: Anime[]
  currentAnime: Anime | null
  isLoading: boolean
  isLoadingAnime: boolean
  isLoadingRecommendations: boolean
  error: string | null
  searchAnime: (query: string) => Promise<void>
  getTopAnimes: () => Promise<void>
  getAnimeById: (id: number) => Promise<Anime>
  getRecommendations: (animeId: number) => Promise<void>
  clearRecommendations: () => void
  clearAnimes: () => void
  setCurrentAnime: (anime: Anime | null) => void
}
