import styled from '@emotion/styled'
import { Box, Button, Input } from '@chakra-ui/react'

export const BackgroundWrapper = styled(Box)`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Overlay = styled(Box)`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  pointer-events: none;
`

export const Card = styled(Box)`
  position: relative;
  z-index: 1;

  width: clamp(300px, 90%, 480px);
  padding: var(--chakra-space-xl);
  border-radius: var(--chakra-radii-lg);

  background-color: var(--chakra-colors-background-default);
  color: var(--chakra-colors-text-primary);

  display: flex;
  flex-direction: column;
  gap: var(--chakra-space-md);
  align-items: center;
  box-shadow: var(--chakra-shadows-card);

  /*@media (prefers-color-scheme: dark) {
    background: var(--chakra-colors-background-dark);
    color: var(--chakra-colors-text-inverted);
  }*/
`

export const LogoImage = styled.img`
  height: 200px;
  object-fit: contain;
  margin-bottom: var(--chakra-space-sm);
`

export const YellowButton = styled(Button)`
  width: 50%;
  background-color: var(--chakra-colors-secondary-dark);
  color: var(--chakra-colors-text-primary);

  &:hover {
    background-color: var(--chakra-colors-secondary-default);
  }

  &:active {
    background-color: var(--chakra-colors-secondary-default);
  }
`
export const StyledInput = styled(Input)`
  border-color: var(--chakra-colors-neutral-default);
  color: var(--chakra-colors-text-primary);

  &:hover {
    border-color: var(--chakra-colors-neutral-dark);
  }

  &:focus {
    border-color: var(--chakra-colors-secondary-default);
    box-shadow: 0 0 0 1px var(--chakra-colors-secondary-default);
  }
`
