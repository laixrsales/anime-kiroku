export type CardSize = 'sm' | 'md' | 'lg'

export interface AnimeCardProps {
  id?: string | number
  image: string
  imageAlt?: string
  title?: string
  episodes?: number
  description?: string
  showTitleBelow?: boolean
  size?: CardSize
  onAdd?: (id?: string | number) => void
  onReview?: (id?: string | number) => void
  className?: string
  score?: number
}

export interface AnimeCardOverlayProps {
  title?: string
  seasons?: number
  episodes?: number
  description?: string
  onAdd?: () => void
  onReview?: () => void
  score?: number
  genres?: string[]
}
