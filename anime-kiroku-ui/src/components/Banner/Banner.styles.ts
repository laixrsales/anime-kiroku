import styled from '@emotion/styled'
import { Box, Text } from '@chakra-ui/react'

export const BannerContainer = styled(Box)`
  position: relative;
  width: 100%;
  overflow: hidden;
  cursor: ${({ onClick }: { onClick?: () => void }) =>
    onClick ? 'pointer' : 'default'};
`

export const BannerImage = styled.img<{ fadeIntensity: number }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
`

export const Overlay = styled(Box)<{
  color: string
  opacity: number
  hasOverlay: boolean
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ color, opacity, hasOverlay }) =>
    hasOverlay ? `rgba(${parseColorToRGB(color)}, ${opacity})` : 'transparent'};
  z-index: 1;
  pointer-events: none;
`

export const ContentWrapper = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  padding: clamp(1.5rem, 4vw, 3rem);

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 150px;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.7) 30%,
      rgba(0, 0, 0, 0.4) 70%,
      transparent 100%
    );
    z-index: -1;
    pointer-events: none;
  }
`

export const Title = styled(Text)`
  font-family: var(--chakra-fonts-heading);
  font-weight: var(--chakra-fontWeights-black);
  font-size: clamp(1.75rem, 5vw, 3.5rem);
  color: var(--chakra-colors-text-inverted);
  margin-bottom: var(--chakra-space-sm);
  line-height: 1.1;
  text-shadow:
    0 2px 4px rgba(0, 0, 0, 0.8),
    0 4px 8px rgba(0, 0, 0, 0.6);
  letter-spacing: -0.02em;
  max-width: 800px;
`

export const Subtitle = styled(Text)`
  font-family: var(--chakra-fonts-body);
  font-weight: var(--chakra-fontWeights-medium);
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  color: var(--chakra-colors-neutral-light);
  line-height: var(--chakra-lineHeights-tall);
  text-shadow:
    0 1px 2px rgba(0, 0, 0, 0.8),
    0 2px 4px rgba(0, 0, 0, 0.6);
  max-width: 600px;
`

const parseColorToRGB = (color: string): string => {
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    return `${r}, ${g}, ${b}`
  }
  if (color.startsWith('rgb')) {
    return color.match(/\d+/g)?.join(', ') || '0, 0, 0'
  }
  return '0, 0, 0'
}
