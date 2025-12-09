import { useState, useCallback } from 'react'
import {
  getTopAnimes,
  searchAnime,
  type Anime,
} from '../../services/animeService'
import type { AnimeProviderProps, AnimeContextType } from './AnimeContext.types'
import { AnimeContext } from './AnimeContext'

export function AnimeProvider({ children }: AnimeProviderProps) {
  const [animes, setAnimes] = useState<Anime[]>([])
  const [currentAnime, setCurrentAnime] = useState<Anime | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGetTopAnimes = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getTopAnimes()
      setAnimes(data)
    } catch (err) {
      setError('Erro ao buscar animes populares')
      console.error('Erro no AnimeContext:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleSearchAnime = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        await handleGetTopAnimes()
        return
      }

      setIsLoading(true)
      setError(null)
      try {
        const data = await searchAnime(query)
        setAnimes(data)
      } catch (err) {
        setError('Erro ao buscar animes')
        console.error('Erro no AnimeContext:', err)
      } finally {
        setIsLoading(false)
      }
    },
    [handleGetTopAnimes],
  )

  const clearAnimes = useCallback(() => {
    setAnimes([])
    setCurrentAnime(null)
    setError(null)
  }, [])

  const setCurrentAnimeCallback = useCallback((anime: Anime | null) => {
    setCurrentAnime(anime)
  }, [])

  const value: AnimeContextType = {
    animes,
    currentAnime,
    isLoading,
    error,
    searchAnime: handleSearchAnime,
    getTopAnimes: handleGetTopAnimes,
    clearAnimes,
    setCurrentAnime: setCurrentAnimeCallback,
  }

  return <AnimeContext.Provider value={value}>{children}</AnimeContext.Provider>
}
