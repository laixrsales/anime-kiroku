import styled from '@emotion/styled'
import { Box, Text, IconButton } from '@chakra-ui/react'

export const CarouselContainer = styled(Box)`
  position: relative;
  width: 100%;
  padding: var(--chakra-space-md) 0;
`

export const CarouselTitle = styled(Text)`
  font-family: var(--chakra-fonts-heading);
  font-weight: var(--chakra-fontWeights-bold);
  font-size: var(--chakra-fontSizes-xl);
  color: var(--chakra-colors-text-primary);
  margin-bottom: var(--chakra-space-lg);
  padding-left: var(--chakra-space-md);
`

export const CarouselWrapper = styled(Box)`
  position: relative;
  width: 100%;
  overflow: hidden;
`

export const SlidesContainer = styled(Box)`
  display: flex;
  transition: transform 0.5s ease-in-out;
  gap: ${({ spacing }: { spacing: number }) => `${spacing}px`};
`

export const Slide = styled(Box)`
  flex: 0 0 ${({ width }: { width: string }) => width};
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

// CORREÇÃO: Remover a prop position e usar classes CSS
export const ControlButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: var(--chakra-colors-background-default);
  border: 2px solid var(--chakra-colors-neutral-default);
  color: var(--chakra-colors-text-primary);
  border-radius: var(--chakra-radii-full);
  width: 44px;
  height: 44px;
  box-shadow: var(--chakra-shadows-soft);

  &:hover:not(:disabled) {
    background: var(--chakra-colors-secondary-default);
    border-color: var(--chakra-colors-secondary-default);
    color: var(--chakra-colors-text-primary);
    transform: translateY(-50%) scale(1.05);
  }

  &:active:not(:disabled) {
    background: var(--chakra-colors-secondary-dark);
    border-color: var(--chakra-colors-secondary-dark);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    background: var(--chakra-colors-neutral-light);
  }
`

// Adicionar classes específicas para posição
export const PrevButton = styled(ControlButton)`
  left: -20px;
`

export const NextButton = styled(ControlButton)`
  right: -20px;
`

export const ControlIcon = styled(Box)`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const IndicatorsContainer = styled(Box)`
  display: flex;
  justify-content: center;
  gap: var(--chakra-space-xs);
  margin-top: var(--chakra-space-lg);
  padding: var(--chakra-space-sm);
`

export const Indicator = styled(Box)<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: var(--chakra-radii-full);
  background: ${({ active }) =>
    active
      ? 'var(--chakra-colors-secondary-default)'
      : 'var(--chakra-colors-neutral-default)'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.2);
    background: var(--chakra-colors-secondary-default);
  }
`

export const EmptyState = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--chakra-space-2xl);
  text-align: center;
  color: var(--chakra-colors-text-secondary);
`

export const EmptyStateIcon = styled(Box)`
  font-size: 3rem;
  margin-bottom: var(--chakra-space-md);
  color: var(--chakra-colors-neutral-default);
`

export const EmptyStateText = styled(Text)`
  font-size: var(--chakra-fontSizes-lg);
  margin-bottom: var(--chakra-space-sm);
  color: var(--chakra-colors-text-secondary);
`
