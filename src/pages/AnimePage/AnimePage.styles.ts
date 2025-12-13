import { Box, Button, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const PageContainer = styled.div`
  width: 100%;
  padding: 40px 24px;
  position: relative;
`

export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 40px;
  margin-top: 40px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

export const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const MiddleCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const BackButton = styled(Button)`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;

  background: rgba(0, 0, 0, 0.45);
  color: white;
  backdrop-filter: blur(4px);

  border-radius: 50%;
  width: 42px;
  height: 42px;
  min-width: 42px;
  padding: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: rgba(0, 0, 0, 0.65);
  }
`

export const DescriptionText = styled(Text)`
  font-size: 1rem;
  opacity: 0.85;
  line-height: 1.6;
`

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`

export const ErrorContainer = styled.div`
  padding-top: 80px;
  text-align: center;
`

export const SectionHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: var(--chakra-space-3xl) 0 var(--chakra-space-2xl);
  padding-left: var(--chakra-space-sm);
`

export const SectionTitle = styled(Text)`
  font-family: var(--chakra-fonts-heading);
  font-size: clamp(1.4rem, 3.5vw, 2.2rem);
  font-weight: var(--chakra-fontWeights-bold);
  color: var(--chakra-colors-text-inverted);
  position: relative;
  padding-left: var(--chakra-space-md);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--chakra-colors-secondary-default);
    border-radius: var(--chakra-radii-sm);
  }
`
export const LoadingWrapper = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 220px;

  .loader {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 4px solid var(--chakra-colors-secondary-default);
    border-top-color: transparent;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`
