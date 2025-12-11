import styled from '@emotion/styled'
import { Button, VStack } from '@chakra-ui/react'

export const ModalContainer = styled(VStack)`
  background: var(--chakra-colors-background-dark);
  padding: var(--chakra-space-xl);
  border-radius: var(--chakra-radii-2xl);
  width: 100%;
  gap: var(--chakra-space-lg);
  border: 1px solid var(--chakra-colors-neutral-border);
  color: var(--chakra-colors-text-inverted);
`

export const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: var(--chakra-fontWeights-bold);
`

export const Description = styled.p`
  font-size: 1rem;
  margin-bottom: var(--chakra-space-sm);
`

export const StarsRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--chakra-space-lg);
  justify-content: center;
  padding: var(--chakra-space-sm) 0;
`

export const RatingLabel = styled.span`
  font-size: 1rem;
  min-width: 90px;
  text-align: left;
`

export const StarButton = styled.button`
  background: transparent;
  border: none;
  padding: 4px;
  font-size: 38px;
  cursor: pointer;
  color: var(--chakra-colors-neutral-light);
  transition: all 0.2s ease;

  &[data-filled='true'] {
    color: var(--chakra-colors-secondary-dark);
  }

  &:hover:not(:disabled) {
    transform: scale(1.1);
    color: var(--chakra-colors-secondary-default);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

export const GuidelinesBox = styled.div`
  margin-top: var(--chakra-space-md);
  padding: var(--chakra-space-md);
  border-radius: var(--chakra-radii-lg);
  width: 100%;
  font-size: 0.9rem;
  border: 1px solid var(--chakra-colors-neutral-border);
  opacity: 0.9;

  p + p {
    margin-top: 4px;
  }
`

export const ButtonsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--chakra-space-md);
  width: 100%;
`

export const PrimaryButton = styled(Button)`
  background: var(--chakra-colors-secondary-default);
  color: var(--chakra-colors-text-primary);
  padding: var(--chakra-space-sm) var(--chakra-space-xl);
  border-radius: var(--chakra-radii-lg);
  font-weight: var(--chakra-fontWeights-bold);
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: var(--chakra-colors-secondary-dark);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const SecondaryButton = styled(Button)`
  background: transparent;
  border: 2px solid var(--chakra-colors-secondary-default);
  color: var(--chakra-colors-text-inverted);
  padding: var(--chakra-space-sm) var(--chakra-space-xl);
  border-radius: var(--chakra-radii-lg);
  font-weight: var(--chakra-fontWeights-bold);
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: var(--chakra-colors-secondary-default);
    color: var(--chakra-colors-text-primary);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const ErrorText = styled.p`
  color: var(--chakra-colors-error-default);
  font-size: 0.9rem;
  margin-top: var(--chakra-space-sm);
`
