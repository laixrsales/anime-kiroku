import styled from '@emotion/styled'
import { Box, Text } from '@chakra-ui/react'
import type { BannerContentWrapperProps } from './Banner.types'

export const BannerContainer = styled(Box)`
  position: relative;
  width: 100%;
  overflow: hidden;
  cursor: ${({ onClick }: { onClick?: () => void }) =>
    onClick ? 'pointer' : 'default'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      var(--chakra-colors-background-dark) 0%,
      transparent 15%,
      transparent 85%,
      var(--chakra-colors-background-dark) 100%
    );
    z-index: 2;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      var(--chakra-colors-background-dark) 0%,
      transparent 10%,
      transparent 90%,
      var(--chakra-colors-background-dark) 100%
    );
    z-index: 2;
    pointer-events: none;
  }
`

export const BannerImage = styled.img<{ fadeIntensity: number }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;

  mask-image:
    radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 1) ${({ fadeIntensity }) => 100 - fadeIntensity * 20}%,
      rgba(0, 0, 0, 0) 100%
    ),
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.8) 10%,
      rgba(0, 0, 0, 0.8) 90%,
      rgba(0, 0, 0, 1) 100%
    );
  mask-composite: intersect;
  -webkit-mask-composite: source-in;
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

export const ContentWrapper = styled(Box)<BannerContentWrapperProps>`
  position: absolute;
  top: 50%;
  left: ${({ contentPosition }) =>
    contentPosition === 'left'
      ? '10%'
      : contentPosition === 'right'
        ? '90%'
        : '50%'};
  transform: ${({ contentPosition }) =>
    contentPosition === 'center'
      ? 'translate(-50%, -50%)'
      : 'translateY(-50%)'};
  z-index: 3;
  max-width: ${({ contentPosition }) =>
    contentPosition === 'center' ? '80%' : '40%'};
  text-align: ${({ contentPosition }) =>
    contentPosition === 'left'
      ? 'left'
      : contentPosition === 'right'
        ? 'right'
        : 'center'};
  padding: var(--chakra-space-lg);
  border-radius: var(--chakra-radii-lg);
  background: rgba(36, 36, 36, 0.7); /* background-dark com transparência */
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 90%;
    text-align: center;
    padding: var(--chakra-space-md);
  }
`

export const Title = styled(Text)`
  font-family: var(--chakra-fonts-heading);
  font-weight: var(--chakra-fontWeights-bold);
  font-size: clamp(1.5rem, 4vw, 3rem);
  color: var(--chakra-colors-text-inverted);
  margin-bottom: var(--chakra-space-md);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  line-height: 1.2;
`

export const Subtitle = styled(Text)`
  font-family: var(--chakra-fonts-body);
  font-weight: var(--chakra-fontWeights-normal);
  font-size: clamp(0.875rem, 2vw, 1.25rem);
  color: var(--chakra-colors-neutral-light);
  line-height: var(--chakra-lineHeights-tall);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
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
