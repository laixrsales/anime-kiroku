import type { ReactNode } from 'react'

export interface Anime {
  mal_id: number
  title: string
  images: {
    jpg: {
      image_url: string
      small_image_url: string
      large_image_url: string
    }
  }
  episodes: number
  status: string
  score: number
  synopsis: string
  genres: Array<{
    mal_id: number
    name: string
  }>
}

export interface AnimeProviderProps {
  children: ReactNode
}

export interface AnimeContextType {
  animes: Anime[]
  currentAnime: Anime | null
  isLoading: boolean
  error: string | null
  searchAnime: (query: string) => Promise<void>
  getTopAnime: () => Promise<void>
  clearAnimes: () => void
  setCurrentAnime: (anime: Anime | null) => void
}
