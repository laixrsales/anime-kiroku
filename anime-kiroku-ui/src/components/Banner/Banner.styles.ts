import styled from '@emotion/styled'
import { Box } from '@chakra-ui/react'

export const BannerContainer = styled(Box)`
  position: relative;
  width: 100%;
  overflow: hidden;
  display: block;
`

export const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  inset: 0;

  mask-image: radial-gradient(ellipse at center, black 70%, transparent 100%);
  -webkit-mask-image: radial-gradient(
    ellipse at center,
    black 70%,
    transparent 85%
  );

  filter: drop-shadow(0 0 40px rgba(0, 0, 0, 0.7));
`

export const BannerImage = styled.div<{ src: string; fadeIntensity: number }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;

  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: block;

  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) ${({ fadeIntensity }) => fadeIntensity * 40}%,
    rgba(0, 0, 0, 1) ${({ fadeIntensity }) => fadeIntensity * 60}%,
    rgba(0, 0, 0, 0) 100%
  );

  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) ${({ fadeIntensity }) => fadeIntensity * 40}%,
    rgba(0, 0, 0, 1) ${({ fadeIntensity }) => fadeIntensity * 60}%,
    rgba(0, 0, 0, 0) 100%
  );
`

export const Overlay = styled(Box)<{
  color: string
  opacity: number
  hasOverlay: boolean
}>`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: ${({ hasOverlay, color }) =>
    hasOverlay ? color : 'transparent'};
  opacity: ${({ hasOverlay, opacity }) => (hasOverlay ? opacity : 0)};
`

export const ContentWrapper = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--chakra-space-2xl);
  z-index: 2;
  color: white;
`

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
`

export const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-top: var(--chakra-space-sm);
  opacity: 0.8;
`
