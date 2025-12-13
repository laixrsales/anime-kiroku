import { Box, Button, IconButton, Text, HStack, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const ActionsContainer = styled(VStack)`
  width: 100%;
  max-width: 320px;
  padding: var(--chakra-space-md);
  border-radius: var(--chakra-radii-lg);
  color: var(--chakra-colors-text-inverted);
  box-shadow: var(--chakra-shadows-card);
  gap: var(--chakra-space-md);
  border: 1px solid;
  border-color: var(--chakra-colors-border);
`

export const IconsRow = styled(HStack)`
  width: 100%;
  justify-content: space-around;
  border-bottom: 1px solid;
  border-color: var(--chakra-colors-neutral-light);
  padding-bottom: var(--chakra-space-md);
`

export const IconWithLabel = styled(VStack)`
  align-items: center;
  gap: var(--chakra-space-xs);
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;

  &:hover > button {
    color: var(--chakra-colors-primary-default) !important;
  }

  &:hover > p {
    color: var(--chakra-colors-primary-default);
  }
`

export const ActionIcon = styled(IconButton)<{ isactive?: string }>`
  background: transparent !important;
  font-size: 24px;
  color: ${(props) =>
    props.isactive === 'true'
      ? 'var(--chakra-colors-secondary-default) !important'
      : 'var(--chakra-colors-neutral-default) !important'};
  transition: all var(--chakra-transitions-normal) !important;

  &:hover {
    color: var(--chakra-colors-primary-default) !important;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      color: ${(props) =>
        props.isactive === 'true'
          ? 'var(--chakra-colors-secondary-default) !important'
          : 'var(--chakra-colors-neutral-default) !important'} !important;
      transform: none;
    }
  }
`

export const IconLabel = styled(Text)<{ isactive?: string }>`
  font-size: var(--chakra-fontSizes-xs);
  font-weight: ${(props) => (props.isactive === 'true' ? 'bold' : 'normal')};
  color: ${(props) =>
    props.isactive === 'true'
      ? 'var(--chakra-colors-secondary-default)'
      : 'var(--chakra-colors-neutral-default)'};
  transition: color var(--chakra-transition-normal);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const RatingRow = styled(HStack)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid;
  border-color: var(--chakra-colors-neutral-light);
  padding-bottom: var(--chakra-colors-space-md);
`

export const RatingLabel = styled(Text)<{ hasrating?: string }>`
  font-size: var(--chakra-fontSizes-md);
  font-weight: ${(props) => (props.hasrating === 'true' ? 'bold' : 'normal')};
  color: ${(props) =>
    props.hasrating === 'true'
      ? 'var(--chakra-colors-secondary-default)'
      : 'var(--chakra-colors-text-inverted)'};
  transition: color var(--chakra-transition-normal);
`

export const StarsContainer = styled(HStack)`
  gap: 2px;
`

export const StarButton = styled(IconButton)<{
  isactive?: string
  ishover?: string
}>`
  background: transparent !important;
  padding: 0 !important;
  min-width: auto !important;
  height: auto !important;
  font-size: 20px;
  color: ${(props) => {
    if (props.isactive === 'true')
      return 'var(--chakra-colors-secondary-default) !important'
    if (props.ishover === 'true')
      return 'var(--chakra-colors-primary-default) !important'
    return 'var(--chakra-colors-neutral-default) !important'
  }};
  transition: all var(--chakra-transition-normal) !important;

  &:hover {
    color: var(--chakra-colors-primary-default) !important;
    transform: scale(1.2);
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      color: ${(props) => {
        if (props.isactive === 'true')
          return 'var(--chakra-colors-secondary-default) !important'
        return 'var(--chakra-colors-neutral-default) !important'
      }};
      transform: none;
    }
  }
`

export const ReviewAgainRow = styled(Box)`
  width: 100%;
  text-align: center;
`

export const ReviewAgainButton = styled(Button)<{ hasreview?: string }>`
  width: 100%;
  background: transparent !important;
  border: 1px solid
    ${(props) =>
      props.hasreview === 'true'
        ? 'var(--chakra-colors-secondary-default)'
        : 'var(--chakra-colors-neutral-default)'} !important;
  color: ${(props) =>
    props.hasreview === 'true'
      ? 'var(--chakra-colors-secondary-default)'
      : 'var(--chakra-colors-text-primary)'} !important;
  font-size: var(--chakra-fontSizes-sm);
  transition: all var(--chakra-transition-normal) !important;

  &:hover {
    background: ${(props) =>
      props.hasreview === 'true'
        ? 'var(--chakra-colors-secondary-light) !important'
        : 'var(--chakra-colors-primary-light) !important'};
    border-color: ${(props) =>
      props.hasreview === 'true'
        ? 'var(--chakra-colors-secondary-default)'
        : 'var(--chakra-colors-primary-default)'} !important;
    color: ${(props) =>
      props.hasreview === 'true'
        ? 'var(--chakra-colors-secondary-default)'
        : 'var(--chakra-colors-primary-default)'} !important;
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      background: transparent !important;
      border-color: ${(props) =>
        props.hasreview === 'true'
          ? 'var(--chakra-colors-secondary-default)'
          : 'var(--chakra-colors-neutral-default)'} !important;
      color: ${(props) =>
        props.hasreview === 'true'
          ? 'var(--chakra-colors-secondary-default)'
          : 'var(--chakra-colors-neutral-default)'} !important;
    }
  }
`

export const ActivityText = styled(Text)`
  font-size: var(--chakra-fontSizes-xs);
  color: var(--chakra-colors-primary-default);
  cursor: pointer;
  transition: all var(--chakra-transition-normal);
  margin-top: var(--chakra-space-sm) !important;

  &:hover {
    text-decoration: underline;
    color: var(--chakra-colors-primary-dark);
  }
`
