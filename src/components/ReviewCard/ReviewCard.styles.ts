import styled from '@emotion/styled'
import { Box, Text, VStack, HStack } from '@chakra-ui/react'

export const ReviewContainer = styled(Box)<{ cursor: string }>`
  width: 100%;
  padding: var(--chakra-space-md);
  border-radius: var(--chakra-radii-lg);
  border: 1px solid;
  border-color: var(--chakra-colors-border);
  transition: all var(--chakra-transition-normal);
  cursor: ${(props) => props.cursor};

  &:hover {
    box-shadow: var(--chakra-shadows-soft);
    border-color: var(--chakra-colors-secondary-default);
    transform: ${(props) =>
      props.cursor === 'pointer' ? 'translateY(-2px)' : 'none'};
  }
`

export const ReviewHeader = styled(HStack)`
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--chakra-space-sm);
  flex-wrap: wrap;
  gap: var(--chakra-space-sm);

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--chakra-space-sm);
  }
`

export const UserInfo = styled(HStack)`
  gap: var(--chakra-space-sm);
  align-items: flex-start;
  flex: 1;
  min-width: 0;
`

export const UserAvatar = styled(Box)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--chakra-colors-secondary-default) 0%,
    var(--chakra-colors-primary-default) 100%
  );
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--chakra-fontSizes-xs);
  color: white;
  font-weight: bold;
  flex-shrink: 0;
`

export const UserDetails = styled(VStack)`
  align-items: flex-start;
  gap: 2px;
  min-width: 0;
  flex: 1;
`

export const UserName = styled(Text)`
  font-size: var(--chakra-fontSizes-sm);
  font-weight: bold;
  color: var(--chakra-colors-secondary-default);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 150px;
`

export const AnimeTitle = styled(Text)`
  font-size: var(--chakra-fontSizes-xs);
  color: var(--chakra-colors-secondary-default);
  font-style: italic;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 150px;
`

export const StarsContainer = styled(HStack)`
  gap: 2px;
  flex-shrink: 0;
`

export const StarIcon = styled(Box)<{ filled: string }>`
  color: ${(props) =>
    props.filled === 'true'
      ? 'var(--chakra-colors-secondary-default)'
      : 'var(--chakra-colors-neutral-default)'};
  font-size: 16px;
  transition: color 0.2s;
`

export const ReviewContent = styled(Box)`
  width: 100%;
  margin-top: var(--chakra-space-sm);
`

export const ReviewText = styled(Text)`
  font-size: var(--chakra-fontSizes-sm);
  color: var(--chakra-colors-text-inverted);
  line-height: var(--chakra-lineHeights-base);
  white-space: pre-wrap;
  word-break: break-word;
`

export const ReviewDate = styled(Text)`
  font-size: var(--chakra-fontSizes-xs);
  color: var(--chakra-colors-text-inverted);
  margin-top: var(--chakra-space-xs);
  font-style: italic;
`

export const EmptyReview = styled(Box)`
  width: 100%;
  padding: var(--chakra-space-md);
  text-align: center;
  color: var(--chakra-colors-text-inverted);
  font-size: var(--chakra-fontSizes-sm);
  border: 1px dashed var(--chakra-colors-border);
  border-radius: var(--chakra-radii-lg);
  background: var(--chakra-colors-background-light);
`
