import { Box, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const PageContainer = styled(Box)`
  padding: 0 var(--chakra-space-xl);
  margin-top: var(--chakra-space-2xl);
`

export const WelcomeTitle = styled(Text)`
  font-family: var(--chakra-fonts-heading);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: var(--chakra-fontWeights-black);
  color: var(--chakra-colors-text-inverted);
  margin-bottom: calc(var(--chakra-space-3xl) + 10px);
  line-height: 1.2;
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

export const EmptyMessage = styled(Text)`
  color: var(--chakra-colors-neutral-light);
  font-size: 1.1rem;
  padding: var(--chakra-space-xl) 0;
  text-align: center;
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
