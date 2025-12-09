import React, { useState } from 'react'
import { IconButton } from '@chakra-ui/react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { CarouselWrapper, CarouselContent } from './CardCarousel.styles'
import AnimeCard from '../AnimeCard/AnimeCard'
import type { CardCarouselProps } from './CardCarousel.types'

export const CardCarousel: React.FC<CardCarouselProps> = ({
  cards,
  slidesPerView,
}) => {
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(cards.length / slidesPerView)

  const canGoPrev = page > 0
  const canGoNext = page < totalPages - 1

  const startIndex = page * slidesPerView
  const visibleItems = cards.slice(startIndex, startIndex + slidesPerView)

  const handleNext = () => {
    if (canGoNext) setPage(page + 1)
  }

  const handlePrev = () => {
    if (canGoPrev) setPage(page - 1)
  }

  return (
    <CarouselWrapper>
      <IconButton
        aria-label="previous"
        icon={<FiChevronLeft />}
        onClick={handlePrev}
        isDisabled={!canGoPrev}
        variant="ghost"
      />

      <CarouselContent>
        {visibleItems.map((anime) => (
          <AnimeCard key={anime.id} {...anime} size="lg" />
        ))}
      </CarouselContent>

      <IconButton
        aria-label="next"
        icon={<FiChevronRight />}
        onClick={handleNext}
        isDisabled={!canGoNext}
        variant="ghost"
      />
    </CarouselWrapper>
  )
}
