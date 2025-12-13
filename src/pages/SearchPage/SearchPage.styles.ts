import { Box, Text, Button } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const float = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  50% { 
    transform: translateY(-15px) rotate(3deg); 
  }
`

const pulse = keyframes`
  0%, 100% {
    opacity: 0.08;
  }
  50% {
    opacity: 0.12;
  }
`

export const SearchContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 80vh;
  padding: var(--chakra-space-8);
  position: relative;
  overflow: hidden;
  margin: var(--chakra-space-6);
`

export const AnimationContainer = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
`

export const DotGrid = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(
      circle at 1px 1px,
      rgba(255, 255, 255, 0.03) 1px,
      transparent 0
    ),
    radial-gradient(
      circle at 20px 20px,
      rgba(255, 255, 255, 0.02) 1px,
      transparent 0
    );
  background-size:
    40px 40px,
    80px 80px;
  opacity: 0.3;
`

export const FloatingShape = styled(Box)`
  position: absolute;
  width: 80px;
  height: 80px;
  background: linear-gradient(
    45deg,
    var(--chakra-colors-secondary-default) 0%,
    var(--chakra-colors-secondary-dark) 100%
  );
  opacity: 0.08;
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  animation:
    ${float} 10s ease-in-out infinite,
    ${pulse} 4s ease-in-out infinite;
  filter: blur(0.5px);
  box-shadow:
    0 0 20px rgba(var(--chakra-colors-secondary-default-rgb), 0.1),
    inset 0 0 20px rgba(255, 255, 255, 0.05);

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`

export const SearchTitle = styled(Text)`
  font-family: var(--chakra-fonts-heading);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: var(--chakra-fontWeights-black);
  color: var(--chakra-colors-text-inverted);
  text-align: center;
  line-height: 1.2;
  text-shadow:
    0 2px 4px rgba(0, 0, 0, 0.4),
    0 4px 12px rgba(0, 0, 0, 0.3);
  position: relative;
  padding-bottom: var(--chakra-space-6);
  margin-bottom: var(--chakra-space-2);

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 3px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--chakra-colors-secondary-default) 50%,
      transparent 100%
    );
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(var(--chakra-colors-secondary-default-rgb), 0.3);
  }

  @media (max-width: 768px) {
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    padding-bottom: var(--chakra-space-4);
  }
`

export const SearchDescription = styled(Text)`
  font-family: var(--chakra-fonts-body);
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--chakra-colors-neutral-light);
  text-align: center;
  line-height: var(--chakra-lineHeights-tall);
  max-width: 600px;
  opacity: 0.9;
  margin-top: var(--chakra-space-2);
  padding: 0 var(--chakra-space-4);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: clamp(0.9rem, 1.8vw, 1.1rem);
    padding: 0 var(--chakra-space-2);
  }
`

export const SearchInputWrapper = styled(Box)`
  width: 100%;
  max-width: 600px;
  position: relative;
  z-index: 2;
  margin-top: var(--chakra-space-6);
  padding: 0 var(--chakra-space-4);

  & [data-search-input-group] {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.03);
    border-radius: var(--chakra-radii-xl);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      border-color: rgba(255, 255, 255, 0.15);
      box-shadow:
        0 10px 15px -3px rgba(0, 0, 0, 0.2),
        0 4px 6px -2px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }

    &:focus-within {
      border-color: var(--chakra-colors-secondary-default);
      box-shadow:
        0 0 0 1px var(--chakra-colors-secondary-default),
        0 10px 15px -3px rgba(0, 0, 0, 0.3),
        0 4px 6px -2px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }
  }

  & [data-search-input] {
    font-size: 1rem;
    font-weight: var(--chakra-fontWeights-medium);
    padding-left: var(--chakra-space-12);
    padding-right: var(--chakra-space-12);

    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }

    @media (max-width: 768px) {
      padding-left: var(--chakra-space-10);
      padding-right: var(--chakra-space-10);
      font-size: 0.95rem;
    }
  }

  & [data-search-button] {
    margin-top: var(--chakra-space-6);
    padding: var(--chakra-space-4) var(--chakra-space-10);
    font-size: 1.1rem;
    font-weight: var(--chakra-fontWeights-bold);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.2),
      0 2px 4px -1px rgba(0, 0, 0, 0.1);

    &:hover:not(:disabled) {
      transform: translateY(-3px);
      box-shadow:
        0 10px 15px -3px rgba(0, 0, 0, 0.3),
        0 4px 6px -2px rgba(0, 0, 0, 0.2);
    }

    &:active:not(:disabled) {
      transform: translateY(-1px);
    }

    @media (max-width: 768px) {
      padding: var(--chakra-space-3) var(--chakra-space-8);
      font-size: 1rem;
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 0 var(--chakra-space-2);
    margin-top: var(--chakra-space-4);
  }
`

export const RecentSearchesContainer = styled(Box)`
  width: 100%;
  max-width: 800px;
  padding: var(--chakra-space-6);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--chakra-radii-xl);
  backdrop-filter: blur(10px);
  margin-top: var(--chakra-space-8);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.02);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow:
      0 8px 12px -2px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }

  & [data-recent-searches-text] {
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: var(--chakra-space-2);

    svg {
      flex-shrink: 0;
    }
  }

  & [data-clear-all-button] {
    font-size: 0.75rem;
    padding: var(--chakra-space-1) var(--chakra-space-3);
    height: auto;
    min-height: 0;
  }

  @media (max-width: 768px) {
    padding: var(--chakra-space-4);
    margin-top: var(--chakra-space-6);
    max-width: 95%;
  }
`

export const SearchTag = styled(Button)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--chakra-colors-neutral-light);
  padding: var(--chakra-space-2) var(--chakra-space-4);
  font-size: 0.875rem;
  font-weight: var(--chakra-fontWeights-medium);
  border-radius: var(--chakra-radii-full);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: var(--chakra-space-1);
  min-height: 0;
  height: auto;
  line-height: 1.4;
  text-transform: none;
  letter-spacing: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--chakra-colors-secondary-default);
    color: var(--chakra-colors-text-inverted);
    transform: translateY(-2px) scale(1.02);
    box-shadow:
      0 4px 8px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(var(--chakra-colors-secondary-default-rgb), 0.3);
  }

  &:active {
    transform: translateY(0) scale(1);
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    svg {
      width: 10px;
      height: 10px;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.8125rem;
    padding: var(--chakra-space-1.5) var(--chakra-space-3);
    max-width: 150px;
  }
`

export const ResultsContainer = styled(Box)`
  width: 100%;
  max-width: 1400px;
  margin-top: var(--chakra-space-8);
  padding: var(--chakra-space-6);
  background: rgba(255, 255, 255, 0.02);
  border-radius: var(--chakra-radii-xl);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.02);

  & [data-search-results-text] {
    font-size: 1.125rem;
    font-weight: var(--chakra-fontWeights-semibold);
    text-align: center;
    margin-bottom: var(--chakra-space-8);
    position: relative;
    padding-bottom: var(--chakra-space-3);

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 2px;
      background: var(--chakra-colors-secondary-default);
      border-radius: 1px;
    }
  }

  & [data-search-results-grid] {
    width: 100%;
  }

  & [data-anime-card-container] {
    height: 100%;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      transform: translateY(-8px);
      z-index: 10;
    }

    & [data-anime-card] {
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      img {
        height: 280px;
        object-fit: cover;
        width: 100%;
        transition: transform 0.5s ease;
      }

      &:hover img {
        transform: scale(1.05);
      }

      & [data-anime-card-title] {
        background: rgba(255, 255, 255, 0.05);
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding: var(--chakra-space-4);
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 80px;

        h3 {
          font-size: 0.95rem;
          font-weight: var(--chakra-fontWeights-semibold);
          color: var(--chakra-colors-text-inverted);
          text-align: center;
          line-height: 1.3;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          max-height: 2.6em;
        }
      }

      & [data-anime-card-score] {
        position: absolute;
        top: var(--chakra-space-2);
        right: var(--chakra-space-2);
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(4px);
        color: white;
        font-weight: var(--chakra-fontWeights-bold);
        padding: var(--chakra-space-1) var(--chakra-space-2);
        border-radius: var(--chakra-radii-md);
        font-size: 0.875rem;
        z-index: 2;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
    }
  }

  @media (max-width: 768px) {
    padding: var(--chakra-space-4);
    margin-top: var(--chakra-space-6);

    & [data-search-results-text] {
      font-size: 1rem;
      margin-bottom: var(--chakra-space-6);
    }

    & [data-anime-card-container] [data-anime-card] img {
      height: 220px;
    }
  }
`

export const EmptyStateContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--chakra-space-12) var(--chakra-space-6);
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--chakra-radii-xl);
  max-width: 500px;
  margin-top: var(--chakra-space-8);
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.02);

  svg {
    opacity: 0.5;
    margin-bottom: var(--chakra-space-4);
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  }

  & [data-empty-state-title] {
    font-size: 1.25rem;
    font-weight: var(--chakra-fontWeights-semibold);
    margin-bottom: var(--chakra-space-2);
    color: var(--chakra-colors-text-inverted);
  }

  & [data-empty-state-description] {
    font-size: 0.95rem;
    color: var(--chakra-colors-neutral-light);
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    padding: var(--chakra-space-8) var(--chakra-space-4);
    margin-top: var(--chakra-space-6);
    max-width: 90%;

    & [data-empty-state-title] {
      font-size: 1.1rem;
    }

    & [data-empty-state-description] {
      font-size: 0.9rem;
    }
  }
`

export const LoadingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--chakra-space-12) var(--chakra-space-6);
  margin-top: var(--chakra-space-8);
  background: rgba(255, 255, 255, 0.02);
  border-radius: var(--chakra-radii-xl);
  border: 1px solid rgba(255, 255, 255, 0.05);
  min-height: 200px;
  width: 100%;
  max-width: 500px;
  backdrop-filter: blur(10px);

  & [data-loading-spinner] {
    width: 60px;
    height: 60px;

    &::before,
    &::after {
      border-width: 3px;
    }
  }

  & [data-loading-text] {
    margin-top: var(--chakra-space-4);
    font-size: 0.95rem;
    color: var(--chakra-colors-neutral-light);
    opacity: 0.8;
    animation: ${pulse} 2s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    padding: var(--chakra-space-8) var(--chakra-space-4);
    margin-top: var(--chakra-space-6);
    min-height: 150px;

    & [data-loading-spinner] {
      width: 50px;
      height: 50px;
    }
  }
`
