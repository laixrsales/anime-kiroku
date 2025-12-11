import styled from '@emotion/styled'
import { Box, Text, IconButton } from '@chakra-ui/react'
import type { CardSize } from './AnimeCard.types'

const sizeMap: Record<CardSize, { width: string; height: string }> = {
  sm: { width: '160px', height: '240px' },
  md: { width: '200px', height: '300px' },
  lg: { width: '280px', height: '420px' },
}

export const CardContainer = styled(Box)<{
  size?: CardSize
  showOverlay?: boolean
}>`
  position: relative;
  width: ${({ size = 'md' }) => sizeMap[size].width};
  height: ${({ size = 'md' }) => sizeMap[size].height};
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);

    ${({ showOverlay = true }) =>
      showOverlay
        ? `
      .anime-card-overlay {
        opacity: 1;
        visibility: visible;
      }
    `
        : ''}

    .episode-badge {
      ${({ showOverlay = true }) =>
        showOverlay
          ? `
        opacity: 0;
        visibility: hidden;
      `
          : ''}
    }
  }
`

export const CardImageContainer = styled(Box)`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`

export const Overlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  color: white;
`

export const OverlayContent = styled(Box)`
  flex: 1;
  overflow: hidden;
`

export const OverlayTitle = styled(Text)`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: white;
  line-height: 1.2;
  margin-bottom: 6px;
  letter-spacing: 0.2px;
`

export const EpisodeCount = styled(Box)<{ showOverlay?: boolean }>`
  position: absolute;
  bottom: 8px;
  left: 8px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  border-radius: 4px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 2;
  transition: all 0.3s ease;
  opacity: 1;
  visibility: visible;

  & > p {
    font-size: 11px;
    font-weight: 500;
  }

  ${({ showOverlay = true }) =>
    !showOverlay
      ? `
    &:hover {
      opacity: 1 !important;
      visibility: visible !important;
    }
  `
      : ''}
`

export const ActionsContainer = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-top: 12px;
  margin-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
`

export const ActionButton = styled(IconButton)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 14px;
  backdrop-filter: blur(4px);
  transition: all 0.2s ease;

  &:hover {
    background: var(--chakra-colors-secondary-default);
    color: white;
    border-color: var(--chakra-colors-secondary-default);
    transform: scale(1.1);
  }

  &:active {
    background: var(--chakra-colors-secondary-dark);
    border-color: var(--chakra-colors-secondary-dark);
    transform: scale(0.95);
  }
`

export const TitleBelow = styled(Text)`
  margin-top: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: white;
  text-align: center;
  line-height: 1.2;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
