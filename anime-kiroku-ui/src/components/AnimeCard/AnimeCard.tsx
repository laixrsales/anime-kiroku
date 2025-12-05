import React from 'react'
import { Box } from '@chakra-ui/react'
import { FaPlus, FaEdit } from 'react-icons/fa'
import {
  CardContainer,
  CardImage,
  Overlay,
  OverlayContent,
  OverlayTitle,
  OverlayDescription,
  StatsContainer,
  StatItem,
  StatLabel,
  StatValue,
  ActionsContainer,
  ActionButton,
  TitleBelow,
} from './AnimeCard.styles'
import type { AnimeCardProps } from './AnimeCard.types'

export default function AnimeCard({
  id,
  image,
  imageAlt = 'Anime cover',
  title,
  seasons,
  episodes,
  description,
  showTitleBelow = false,
  size = 'md',
  onAdd,
  onReview,
  className,
}: AnimeCardProps) {
  const handleCardClick = () => {
    // Aqui você implementaria a navegação para detalhes do anime
    // Por exemplo: navigate(`/anime/${id}`)
    console.log(`Navigate to anime details: ${id}`)
  }

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onAdd?.(id)
  }

  const handleReviewClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onReview?.(id)
  }

  return (
    <Box className={className}>
      <CardContainer
        size={size}
        onClick={handleCardClick}
        data-testid="anime-card"
      >
        <CardImage src={image} alt={imageAlt} data-testid="anime-card-image" />

        <Overlay
          className="anime-card-overlay"
          data-testid="anime-card-overlay"
        >
          <OverlayContent>
            {title && (
              <OverlayTitle size={size} data-testid="anime-card-title">
                {title}
              </OverlayTitle>
            )}

            {description && (
              <OverlayDescription data-testid="anime-card-description">
                {description}
              </OverlayDescription>
            )}

            {(seasons !== undefined || episodes !== undefined) && (
              <StatsContainer data-testid="anime-card-stats">
                {seasons !== undefined && (
                  <StatItem>
                    <StatValue data-testid="seasons-count">{seasons}</StatValue>
                    <StatLabel>Temporada{seasons !== 1 ? 's' : ''}</StatLabel>
                  </StatItem>
                )}

                {episodes !== undefined && (
                  <StatItem>
                    <StatValue data-testid="episodes-count">
                      {episodes}
                    </StatValue>
                    <StatLabel>Episódio{episodes !== 1 ? 's' : ''}</StatLabel>
                  </StatItem>
                )}
              </StatsContainer>
            )}
          </OverlayContent>

          {(onAdd || onReview) && (
            <ActionsContainer data-testid="anime-card-actions">
              {onAdd && (
                <ActionButton
                  icon={<FaPlus />}
                  aria-label="Adicionar à lista"
                  onClick={handleAddClick}
                  data-testid="add-button"
                />
              )}

              {onReview && (
                <ActionButton
                  icon={<FaEdit />}
                  aria-label="Escrever review"
                  onClick={handleReviewClick}
                  data-testid="review-button"
                />
              )}
            </ActionsContainer>
          )}
        </Overlay>
      </CardContainer>

      {showTitleBelow && title && (
        <TitleBelow data-testid="anime-card-title-below">{title}</TitleBelow>
      )}
    </Box>
  )
}
