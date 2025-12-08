import { useState } from 'react'
import { getTopAnime, searchAnime } from '../../services/animeService'
import type { Anime, AnimeProviderProps } from './AnimeContext.types'
import { AnimeContext } from './AnimeContext'

export function AnimeProvider({ children }: AnimeProviderProps) {
  const [animes, setAnimes] = useState<Anime[]>([])
  const [currentAnime, setCurrentAnime] = useState<Anime | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGetTopAnime = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getTopAnime()
      setAnimes(data)
    } catch (err) {
      setError('Erro ao buscar animes populares')
      console.error('Erro no AnimeContext:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchAnime = async (query: string) => {
    if (!query.trim()) {
      await handleGetTopAnime()
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
  }

  const clearAnimes = () => {
    setAnimes([])
    setCurrentAnime(null)
    setError(null)
  }

  const value = {
    animes,
    currentAnime,
    isLoading,
    error,
    searchAnime: handleSearchAnime,
    getTopAnime: handleGetTopAnime,
    clearAnimes,
    setCurrentAnime,
  }

  return <AnimeContext.Provider value={value}>{children}</AnimeContext.Provider>
}
