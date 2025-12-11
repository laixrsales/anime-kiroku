import styled from '@emotion/styled'
import { Box, VStack, Text, Button } from '@chakra-ui/react'

export const Container = styled(Box)`
  width: 100%;
  padding: var(--chakra-space-md);
  border-radius: var(--chakra-radii-xl);
  box-shadow: var(--chakra-shadows-card);
  border: 1px solid;
  border-color: var(--chakra-colors-border);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: var(--chakra-shadows-soft);
  }
`

export const Header = styled(Box)`
  width: 100%;
  margin-bottom: var(--chakra-space-md);
  padding-bottom: var(--chakra-space-sm);
  border-bottom: 2px solid;
  border-color: var(--chakra-colors-secondary-default);
`

export const Title = styled(Text)`
  font-size: var(--chakra-fontSizes-xl);
  font-weight: bold;
  color: var(--chakra-colors-text-inverted);
  letter-spacing: 0.5px;
`

export const ReviewsList = styled(VStack)`
  width: 100%;
  gap: var(--chakra-space-md);
  margin-bottom: var(--chakra-space-md);
  max-height: 500px;
  overflow-y: auto;
  padding-right: var(--chakra-space-xs);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: var(--chakra-colors-background-light);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--chakra-colors-neutral-light);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--chakra-colors-neutral-default);
  }
`

export const MoreButton = styled(Button)`
  width: 100%;
  background: transparent !important;
  border: 1px solid;
  border-color: var(--chakra-colors-neutral-default) !important;
  color: var(--chakra-colors-text-primary) !important;
  font-size: var(--chakra-fontSizes-sm);
  font-weight: 500;
  transition: all var(--chakra-transition-normal) !important;

  &:hover {
    border-color: var(--chakra-colors-primary-default) !important;
    color: var(--chakra-colors-primary-default) !important;
    background: var(--chakra-colors-primary-light) !important;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`

export const NoReviews = styled(Box)`
  width: 100%;
  padding: var(--chakra-space-xl);
  text-align: center;
  color: var(--chakra-colors-text-secondary);
  font-size: var(--chakra-fontSizes-sm);
  border: 1px dashed var(--chakra-colors-border);
  border-radius: var(--chakra-radii-lg);
`

export const LoadingContainer = styled(Box)`
  width: 100%;
  padding: var(--chakra-space-xl);
  text-align: center;
  color: var(--chakra-colors-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--chakra-space-sm);
`
