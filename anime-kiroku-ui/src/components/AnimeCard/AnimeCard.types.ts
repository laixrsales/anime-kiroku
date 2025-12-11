export type CardSize = 'sm' | 'md' | 'lg'

export interface AnimeCardProps {
  image?: string
  imageAlt?: string
  title?: string
  episodes?: number
  description?: string
  showTitleBelow?: boolean
  size?: CardSize
  className?: string
  score?: number
  showOverlay?: boolean
  onClick?: () => void
}

export interface AnimeCardOverlayProps {
  title?: string
  seasons?: number
  episodes?: number
  description?: string
  score?: number
  genres?: string[]
}
