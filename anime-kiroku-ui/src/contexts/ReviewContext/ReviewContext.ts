import { createContext } from 'react'
import type { ReviewContextType } from './ReviewContext.types'

export const ReviewContext = createContext<ReviewContextType | undefined>(
  undefined,
)
