import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { FaPlus, FaEdit } from 'react-icons/fa'
import {
  CardContainer,
  CardImage,
  Overlay,
  OverlayContent,
  OverlayTitle,
  ActionsContainer,
  ActionButton,
  TitleBelow,
  EpisodeCount,
} from './AnimeCard.styles'
import type { AnimeCardProps } from './AnimeCard.types'

export default function AnimeCard({
  id,
  image,
  imageAlt = 'Anime cover',
  title,
  episodes,
  description,
  showTitleBelow = false,
  size = 'md',
  onAdd,
  onReview,
  className,
}: AnimeCardProps) {
  const handleCardClick = () => {
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

  const truncatedDescription = description
    ? description.length > 100
      ? `${description.substring(0, 100)}...`
      : description
    : ''

  return (
    <Box className={className} position="relative">
      <CardContainer
        size={size}
        onClick={handleCardClick}
        data-testid="anime-card"
      >
        <CardImage src={image} alt={imageAlt} data-testid="anime-card-image" />

        {episodes !== undefined && episodes > 0 && (
          <EpisodeCount className="episode-badge" data-testid="episode-count">
            <Text fontSize="xs" fontWeight="medium">
              {episodes} EP
            </Text>
          </EpisodeCount>
        )}

        <Overlay
          className="anime-card-overlay"
          data-testid="anime-card-overlay"
        >
          <OverlayContent>
            {title && (
              <OverlayTitle data-testid="anime-card-title">
                {title}
              </OverlayTitle>
            )}

            {truncatedDescription && (
              <Text
                fontSize="12px"
                fontWeight="200"
                color="rgba(255, 255, 255, 0.7)"
                lineHeight="1.4"
                mt={2}
                mb={2}
                noOfLines={4}
                data-testid="anime-card-description"
              >
                {truncatedDescription}
              </Text>
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
                  title="Adicionar à minha lista"
                />
              )}

              {onReview && (
                <ActionButton
                  icon={<FaEdit />}
                  aria-label="Escrever review"
                  onClick={handleReviewClick}
                  data-testid="review-button"
                  title="Escrever review"
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
