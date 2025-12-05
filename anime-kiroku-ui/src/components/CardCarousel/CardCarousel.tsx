import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { Box, Text } from '@chakra-ui/react'
import AnimeCard from '../AnimeCard/AnimeCard'
import {
  CarouselContainer,
  CarouselTitle,
  CarouselWrapper,
  SlidesContainer,
  Slide,
  PrevButton,
  NextButton,
  ControlIcon,
  IndicatorsContainer,
  Indicator,
  EmptyState,
  EmptyStateIcon,
  EmptyStateText,
} from './CardCarousel.styles'
import type { CardCarouselProps } from './CardCarousel.types'
import { FaFilm, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function CardCarousel({
  cards,
  title,
  showTitle = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  showControls = true,
  showIndicators = false,
  slidesPerView = 4,
  spacing = 20,
  className,
}: CardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const totalSlides = Math.ceil(cards.length / slidesPerView)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const slidesContainerRef = useRef<HTMLDivElement>(null)

  // CORREÇÃO: Calcular slideWidth diretamente sem useEffect
  const slideWidth = useMemo(() => {
    if (slidesPerView <= 0) return '100%'
    const widthPercentage = 100 / slidesPerView
    // Ajustar para considerar o espaçamento
    return `calc(${widthPercentage}% - ${(spacing * (slidesPerView - 1)) / slidesPerView}px)`
  }, [slidesPerView, spacing])

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
  }, [totalSlides])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const handleMouseEnter = () => {
    if (autoPlay) {
      setIsPlaying(false)
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current)
      }
    }
  }

  const handleMouseLeave = () => {
    if (autoPlay) {
      setIsPlaying(true)
    }
  }

  // Auto-play
  useEffect(() => {
    if (!isPlaying || totalSlides <= 1) return

    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current)
    }

    autoPlayRef.current = setTimeout(() => {
      goToNext()
    }, autoPlayInterval)

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current)
      }
    }
  }, [currentIndex, isPlaying, totalSlides, autoPlayInterval, goToNext])

  // Função para renderizar slides
  const renderSlides = () => {
    if (cards.length === 0) {
      return (
        <EmptyState>
          <EmptyStateIcon as={FaFilm} />
          <EmptyStateText>Nenhum anime encontrado</EmptyStateText>
          <Text fontSize="sm" color="neutral.default">
            Adicione alguns animes para começar
          </Text>
        </EmptyState>
      )
    }

    // Agrupar cards em slides baseado em slidesPerView
    const groupedCards = []
    for (let i = 0; i < cards.length; i += slidesPerView) {
      groupedCards.push(cards.slice(i, i + slidesPerView))
    }

    return (
      <SlidesContainer
        ref={slidesContainerRef}
        spacing={spacing}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
        data-testid="slides-container"
      >
        {groupedCards.map((slideCards, slideIndex) => (
          <Slide key={slideIndex} width={`${100 / totalSlides}%`}>
            <Box
              display="flex"
              gap={`${spacing}px`}
              width="100%"
              justifyContent="center"
            >
              {slideCards.map((card, cardIndex) => (
                <Box
                  key={`${card.id || cardIndex}-${cardIndex}`}
                  flex={`0 0 ${slideWidth}`}
                  data-testid={`slide-card-${slideIndex}-${cardIndex}`}
                >
                  <AnimeCard {...card} />
                </Box>
              ))}
            </Box>
          </Slide>
        ))}
      </SlidesContainer>
    )
  }

  if (cards.length === 0) {
    return (
      <CarouselContainer className={className}>
        {showTitle && title && <CarouselTitle>{title}</CarouselTitle>}
        <EmptyState>
          <EmptyStateIcon as={FaFilm} />
          <EmptyStateText>Nenhum anime encontrado</EmptyStateText>
          <Text fontSize="sm" color="neutral.default">
            Adicione alguns animes para começar
          </Text>
        </EmptyState>
      </CarouselContainer>
    )
  }

  return (
    <CarouselContainer
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid="card-carousel"
    >
      {showTitle && title && (
        <CarouselTitle data-testid="carousel-title">{title}</CarouselTitle>
      )}

      <CarouselWrapper data-testid="carousel-wrapper">
        {showControls && totalSlides > 1 && (
          <>
            <PrevButton
              onClick={goToPrev}
              disabled={!showControls || totalSlides <= 1}
              aria-label="Slide anterior"
              data-testid="prev-button"
            >
              <ControlIcon as={FaChevronLeft} />
            </PrevButton>

            <NextButton
              onClick={goToNext}
              disabled={!showControls || totalSlides <= 1}
              aria-label="Próximo slide"
              data-testid="next-button"
            >
              <ControlIcon as={FaChevronRight} />
            </NextButton>
          </>
        )}

        {renderSlides()}
      </CarouselWrapper>

      {showIndicators && totalSlides > 1 && (
        <IndicatorsContainer data-testid="indicators-container">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <Indicator
              key={index}
              active={index === currentIndex}
              onClick={() => goToSlide(index)}
              data-testid={`indicator-${index}`}
            />
          ))}
        </IndicatorsContainer>
      )}
    </CarouselContainer>
  )
}
