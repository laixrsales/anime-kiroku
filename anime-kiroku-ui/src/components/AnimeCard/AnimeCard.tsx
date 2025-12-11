import { Box, Text, Image } from '@chakra-ui/react'
import {
  CardContainer,
  Overlay,
  OverlayContent,
  OverlayTitle,
  TitleBelow,
  EpisodeCount,
  CardImageContainer,
} from './AnimeCard.styles'
import type { AnimeCardProps } from './AnimeCard.types'

export default function AnimeCard({
  image,
  imageAlt = 'Anime cover',
  title,
  episodes,
  description,
  showTitleBelow = false,
  size = 'md',
  className,
  showOverlay,
  onClick,
}: AnimeCardProps) {
  const handleCardClick = () => {
    if (onClick) return onClick()
  }

  return (
    <Box className={className} position="relative">
      <CardContainer
        size={size}
        onClick={handleCardClick}
        data-testid="anime-card"
        showOverlay={showOverlay}
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
          <EpisodeCount
            className="episode-badge"
            data-testid="episode-count"
            showOverlay={showOverlay}
          >
            <Text fontSize="xs" fontWeight="medium">
              {episodes} EP
            </Text>
          </EpisodeCount>
        )}
        {showOverlay && (
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

              {description && (
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
                  {description}
                </Text>
              )}
            </OverlayContent>
          </Overlay>
        )}
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
