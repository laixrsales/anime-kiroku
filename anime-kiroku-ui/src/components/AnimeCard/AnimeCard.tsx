import React from 'react'
import { Box, Text, Image } from '@chakra-ui/react'
import { FaPlus, FaEdit } from 'react-icons/fa'
import {
  CardContainer,
  Overlay,
  OverlayContent,
  OverlayTitle,
  ActionsContainer,
  ActionButton,
  TitleBelow,
  EpisodeCount,
  CardImageContainer,
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
        <CardImageContainer>
          <Image
            src={image}
            alt={imageAlt}
            fallbackSrc="/placeholder-anime.jpg"
            fallback={<FallbackContent title={title} />}
            objectFit="cover"
            width="100%"
            height="100%"
            borderRadius="lg"
            data-testid="anime-card-image"
          />
        </CardImageContainer>

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
                fontWeight="300"
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

const FallbackContent = ({ title }: { title?: string }) => (
  <Box
    width="100%"
    height="100%"
    display="flex"
    alignItems="center"
    justifyContent="center"
    backgroundColor="gray.100"
    color="gray.500"
    borderRadius="lg"
  >
    <Text fontSize="sm" textAlign="center" px={2}>
      {title ? `${title}` : 'No image'}
    </Text>
  </Box>
)
