import { useContext } from 'react'
import { AnimeContext } from '../contexts/AnimeContext/AnimeContext'

export function useAnime() {
  const context = useContext(AnimeContext)

  if (context === undefined) {
    throw new Error('useAnime deve ser usado dentro de um AnimeProvider')
  }

  return context
}
