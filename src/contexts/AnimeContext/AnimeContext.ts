import { createContext } from 'react'
import type { AnimeContextType } from './AnimeContext.types'

export const AnimeContext = createContext<AnimeContextType | undefined>(
  undefined,
)
