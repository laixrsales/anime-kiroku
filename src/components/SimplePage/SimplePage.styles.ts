import { Box, Button, Input } from '@chakra-ui/react'
import styled from '@emotion/styled'

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
