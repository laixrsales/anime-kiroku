import styled from '@emotion/styled'
import { Box } from '@chakra-ui/react'

export const PageContainer = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--chakra-colors-background-dark);
  color: var(--chakra-colors-text-inverted);
`

export const MainContent = styled(Box)`
  flex: 1;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: var(--chakra-space-xl) var(--chakra-space-lg);

  @media (max-width: 768px) {
    padding: var(--chakra-space-lg) var(--chakra-space-md);
  }
`

export const LoadingOverlay = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
`

export const LoadingSpinner = styled(Box)`
  width: 50px;
  height: 50px;
  border: 4px solid var(--chakra-colors-neutral-default);
  border-top-color: var(--chakra-colors-secondary-default);
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`
