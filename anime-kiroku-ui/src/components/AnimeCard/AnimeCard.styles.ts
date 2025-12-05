import styled from '@emotion/styled'
import { Box, Text, IconButton } from '@chakra-ui/react'
import type { CardSize } from './AnimeCard.types'

// Tamanhos base para o card
const sizeMap: Record<CardSize, { width: string; height: string }> = {
  sm: { width: '160px', height: '240px' },
  md: { width: '200px', height: '300px' },
  lg: { width: '280px', height: '420px' },
}

export const CardContainer = styled(Box)<{ size?: CardSize }>`
  position: relative;
  width: ${({ size = 'md' }) => sizeMap[size].width};
  height: ${({ size = 'md' }) => sizeMap[size].height};
  border-radius: var(--chakra-radii-lg);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);

    .anime-card-overlay {
      opacity: 1;
      visibility: visible;
    }
  }
`

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
`

export const Overlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.85) 100%
  );
  padding: var(--chakra-space-md);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  color: var(--chakra-colors-text-inverted);
`

export const OverlayContent = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--chakra-space-sm);
`

export const OverlayTitle = styled(Text)`
  font-family: var(--chakra-fonts-heading);
  font-weight: var(--chakra-fontWeights-bold);
  font-size: ${({ size }: { size?: CardSize }) =>
    size === 'sm'
      ? 'var(--chakra-fontSizes-md)'
      : size === 'lg'
        ? 'var(--chakra-fontSizes-xl)'
        : 'var(--chakra-fontSizes-lg)'};
  color: var(--chakra-colors-text-inverted);
  line-height: var(--chakra-lineHeights-base);
  margin-bottom: var(--chakra-space-xs);
`

export const OverlayDescription = styled(Text)`
  font-size: var(--chakra-fontSizes-sm);
  color: var(--chakra-colors-neutral-light);
  line-height: var(--chakra-lineHeights-tall);
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
`

export const StatsContainer = styled(Box)`
  display: flex;
  gap: var(--chakra-space-md);
  margin-top: var(--chakra-space-sm);
`

export const StatItem = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--chakra-space-xs);
`

export const StatLabel = styled(Text)`
  font-size: var(--chakra-fontSizes-xs);
  color: var(--chakra-colors-neutral-default);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const StatValue = styled(Text)`
  font-size: var(--chakra-fontSizes-lg);
  font-weight: var(--chakra-fontWeights-bold);
  color: var(--chakra-colors-text-inverted);
`

export const ActionsContainer = styled(Box)`
  display: flex;
  justify-content: center;
  gap: var(--chakra-space-lg);
  padding-top: var(--chakra-space-md);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`

export const ActionButton = styled(IconButton)`
  background: transparent;
  border: 2px solid var(--chakra-colors-secondary-default);
  color: var(--chakra-colors-secondary-default);
  border-radius: var(--chakra-radii-full);
  width: 40px;
  height: 40px;
  font-size: 1.2rem;

  &:hover {
    background: var(--chakra-colors-secondary-default);
    color: var(--chakra-colors-text-primary);
    border-color: var(--chakra-colors-secondary-default);
  }

  &:active {
    background: var(--chakra-colors-secondary-dark);
    border-color: var(--chakra-colors-secondary-dark);
  }
`

export const TitleBelow = styled(Text)`
  margin-top: var(--chakra-space-sm);
  font-family: var(--chakra-fonts-heading);
  font-weight: var(--chakra-fontWeights-semibold);
  font-size: var(--chakra-fontSizes-md);
  color: var(--chakra-colors-text-primary);
  text-align: center;
  line-height: var(--chakra-lineHeights-base);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
