import type { AnimeCardProps } from '../AnimeCard'

export interface CardCarouselProps {
  cards: AnimeCardProps[]
  title?: string
  showTitle?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
  showControls?: boolean
  showIndicators?: boolean
  slidesPerView?: number
  spacing?: number
  className?: string
}
