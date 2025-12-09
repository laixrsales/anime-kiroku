import styled from '@emotion/styled'
import { Box, Button, Text } from '@chakra-ui/react'

export const HeroSection = styled.section`
  position: relative;
  width: 100%;
  margin-bottom: var(--chakra-space-3xl);
`

export const ContentSection = styled.section`
  padding: 0 var(--chakra-space-lg);
  margin: 40px 0;
`

export const SectionHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--chakra-space-xl);
  padding: 0 var(--chakra-space-md);
`

export const SectionTitle = styled(Text)`
  font-family: var(--chakra-fonts-heading);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
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

export const ViewAllButton = styled(Button)`
  background: transparent;
  color: var(--chakra-colors-neutral-light);
  border: 1px solid var(--chakra-colors-neutral-light);
  font-weight: var(--chakra-fontWeights-medium);
  transition: all 0.2s ease;

  &:hover {
    background: var(--chakra-colors-neutral-light);
    color: var(--chakra-colors-background-dark);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`

export const CTASection = styled.section`
  text-align: center;
  padding: var(--chakra-space-3xl) var(--chakra-space-lg);
  margin: var(--chakra-space-4xl) auto;
  max-width: 100%;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--chakra-colors-secondary-default) 50%,
      transparent 100%
    );
  }
`

export const CTATitle = styled(Text)`
  font-family: var(--chakra-fonts-heading);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: var(--chakra-fontWeights-black);
  color: var(--chakra-colors-text-inverted);
  margin-bottom: var(--chakra-space-md);
  line-height: 1.2;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  padding-top: 24px;
`

export const CTADescription = styled(Text)`
  font-family: var(--chakra-fonts-body);
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--chakra-colors-neutral-light);
  max-width: 600px;
  margin: 0 auto var(--chakra-space-2xl);
  line-height: var(--chakra-lineHeights-tall);
`

export const CTAButtonsContainer = styled.div`
  display: flex;
  gap: var(--chakra-space-md);
  justify-content: center;
  flex-wrap: wrap;
`

export const PrimaryCTAButton = styled(Button)`
  background: var(--chakra-colors-secondary-default);
  color: var(--chakra-colors-text-primary);
  padding: var(--chakra-space-md) var(--chakra-space-2xl);
  font-size: 1.1rem;
  font-weight: var(--chakra-fontWeights-bold);
  border-radius: var(--chakra-radii-lg);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &:hover {
    background: var(--chakra-colors-secondary-dark);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(-1px);
  }
`

export const SecondaryCTAButton = styled(Button)`
  background: transparent;
  color: var(--chakra-colors-text-inverted);
  border: 2px solid var(--chakra-colors-secondary-default);
  padding: var(--chakra-space-md) var(--chakra-space-2xl);
  font-size: 1.1rem;
  font-weight: var(--chakra-fontWeights-bold);
  border-radius: var(--chakra-radii-lg);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: var(--chakra-colors-secondary-default);
    color: var(--chakra-colors-text-primary);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(-1px);
  }
`

export const LoadingContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  width: 100%;
`

export const ErrorContainer = styled(Box)`
  text-align: center;
  padding: var(--chakra-space-2xl);
  background: rgba(255, 87, 87, 0.1);
  border: 1px solid var(--chakra-colors-red-500);
  border-radius: var(--chakra-radii-lg);
  margin: var(--chakra-space-xl) 0;
`
