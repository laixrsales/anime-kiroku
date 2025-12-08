import {
  BannerContainer,
  BannerImage,
  Overlay,
  ContentWrapper,
  Title,
  Subtitle,
} from './Banner.styles'
import type { BannerProps } from './Banner.types'

export default function Banner({
  imageUrl,
  altText = 'Banner image',
  title,
  subtitle,
  height = '60vh',
  fadeIntensity = 0.7,
  hasOverlay = false,
  overlayColor = 'var(--chakra-colors-background-dark)',
  overlayOpacity = 0.3,
  className,
  onClick,
}: BannerProps) {
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  const heightValue = typeof height === 'number' ? `${height}px` : height

  return (
    <BannerContainer
      className={className}
      onClick={handleClick}
      style={{ height: heightValue }}
      data-testid="banner-container"
      role={onClick ? 'button' : 'banner'}
      tabIndex={onClick ? 0 : undefined}
    >
      <BannerImage
        src={imageUrl}
        alt={altText}
        fadeIntensity={fadeIntensity}
        data-testid="banner-image"
      />

      <Overlay
        color={overlayColor}
        opacity={overlayOpacity}
        hasOverlay={hasOverlay}
        data-testid="banner-overlay"
      />

      {(title || subtitle) && (
        <ContentWrapper data-testid="banner-content">
          {title && <Title data-testid="banner-title">{title}</Title>}
          {subtitle && (
            <Subtitle data-testid="banner-subtitle">{subtitle}</Subtitle>
          )}
        </ContentWrapper>
      )}
    </BannerContainer>
  )
}
