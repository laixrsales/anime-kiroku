import type { ReactNode } from 'react'
import type { Anime } from '../../services/animeService'

export interface AnimeProviderProps {
  children: ReactNode
}

export interface AnimeContextType {
  animes: Anime[]
  currentAnime: Anime | null
  isLoading: boolean
  error: string | null
  searchAnime: (query: string) => Promise<void>
  getTopAnimes: () => Promise<void>
  clearAnimes: () => void
  setCurrentAnime: (anime: Anime | null) => void
}
