import { Box, Text, Button } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`

export const NotFoundContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: var(--chakra-space-8);
  position: relative;
  overflow: hidden;
`

export const AnimationContainer = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`

export const DotGrid = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
    circle at 1px 1px,
    rgba(255, 255, 255, 0.05) 1px,
    transparent 0
  );
  background-size: 40px 40px;
  opacity: 0.3;
`

export const FloatingShape = styled(Box)`
  position: absolute;
  width: 100px;
  height: 100px;
  background: linear-gradient(
    45deg,
    var(--chakra-colors-secondary-default) 0%,
    var(--chakra-colors-secondary-dark) 100%
  );
  opacity: 0.1;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  animation: ${float} 8s ease-in-out infinite;
  filter: blur(1px);
`

export const ErrorCode = styled(Text)`
  font-family: var(--chakra-fonts-heading);
  font-size: clamp(6rem, 20vw, 12rem);
  font-weight: var(--chakra-fontWeights-black);
  color: var(--chakra-colors-secondary-default);
  line-height: 1;
  text-shadow:
    0 4px 8px rgba(0, 0, 0, 0.3),
    0 8px 16px rgba(0, 0, 0, 0.2);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--chakra-colors-secondary-default) 50%,
      transparent 100%
    );
  }
`

export const ErrorTitle = styled(Text)`
  font-family: var(--chakra-fonts-heading);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: var(--chakra-fontWeights-bold);
  color: var(--chakra-colors-text-inverted);
  text-align: center;
  line-height: 1.2;
  max-width: 600px;
`

export const ErrorDescription = styled(Text)`
  font-family: var(--chakra-fonts-body);
  font-size: clamp(1rem, 2vw, 1.125rem);
  color: var(--chakra-colors-neutral-light);
  text-align: center;
  line-height: var(--chakra-lineHeights-tall);
  max-width: 500px;
  opacity: 0.9;
`

export const ActionButtonsContainer = styled.div`
  display: flex;
  gap: var(--chakra-space-md);
  flex-wrap: wrap;
  justify-content: center;
  margin-top: var(--chakra-space-6);
`

export const PrimaryActionButton = styled(Button)`
  background: linear-gradient(
    135deg,
    var(--chakra-colors-secondary-default) 0%,
    var(--chakra-colors-secondary-dark) 100%
  );
  color: var(--chakra-colors-text-primary);
  padding: var(--chakra-space-md) var(--chakra-space-xl);
  font-size: 1rem;
  font-weight: var(--chakra-fontWeights-bold);
  border-radius: var(--chakra-radii-lg);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      var(--chakra-colors-secondary-dark) 0%,
      var(--chakra-colors-secondary-default) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-1px);
  }
`
