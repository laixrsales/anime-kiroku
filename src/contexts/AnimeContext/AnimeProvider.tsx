import { useState, useCallback } from 'react'
import {
  getAnimeById,
  getAnimeRecommendations,
  getTopAnimes,
  searchAnime,
  type Anime,
} from '../../services/animeService'
import type { AnimeProviderProps, AnimeContextType } from './AnimeContext.types'
import { AnimeContext } from './AnimeContext'

export function AnimeProvider({ children }: AnimeProviderProps) {
  const [animes, setAnimes] = useState<Anime[]>([])
  const [currentAnime, setCurrentAnime] = useState<Anime | null>(null)
  const [recommendations, setRecommendations] = useState<Anime[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingAnime, setIsLoadingAnime] = useState(false)
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(false)
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

  const handleGetAnimeById = useCallback(async (id: number) => {
    setIsLoadingAnime(true)
    setError(null)
    try {
      const data = await getAnimeById(id)
      setCurrentAnime(data)
      return data
    } catch (err) {
      setError('Erro ao buscar anime')
      console.error('Erro no AnimeContext:', err)
      throw err
    } finally {
      setIsLoadingAnime(false)
    }
  }, [])

  const handleGetRecommendations = useCallback(async (animeId: number) => {
    setIsLoadingRecommendations(true)
    setError(null)
    try {
      const data = await getAnimeRecommendations(animeId)
      setRecommendations(data)
    } catch (err) {
      setError('Erro ao buscar recomendações')
      console.error('Erro ao buscar recomendações:', err)
    } finally {
      setIsLoadingRecommendations(false)
    }
  }, [])

  const clearRecommendations = useCallback(() => {
    setRecommendations([])
  }, [])

  const clearAnimes = useCallback(() => {
    setAnimes([])
    setCurrentAnime(null)
    setError(null)
    clearRecommendations()
  }, [clearRecommendations])

  const setCurrentAnimeCallback = useCallback((anime: Anime | null) => {
    setCurrentAnime(anime)
  }, [])

  const value: AnimeContextType = {
    animes,
    currentAnime,
    recommendations,
    isLoading,
    isLoadingAnime,
    isLoadingRecommendations,
    error,
    searchAnime: handleSearchAnime,
    getTopAnimes: handleGetTopAnimes,
    getAnimeById: handleGetAnimeById,
    getRecommendations: handleGetRecommendations,
    clearRecommendations: clearRecommendations,
    clearAnimes,
    setCurrentAnime: setCurrentAnimeCallback,
  }

  return <AnimeContext.Provider value={value}>{children}</AnimeContext.Provider>
}
