import React from 'react'
import { Box, Text, VStack } from '@chakra-ui/react'
import {
  BackgroundWrapper,
  Overlay,
  Card,
  LogoImage,
  YellowButton,
} from './SimplePage.styles'
import type { SimplePageProps } from './SimplePage.types'

import bgImage from '../../assets/anime-panel.jpg'
import logo from '../../assets/anime-kiroku-logo.png'

export default function SimplePage({
  title,
  description,
  children,
  buttonTitle,
  onClick,
}: SimplePageProps) {
  return (
    <BackgroundWrapper style={{ backgroundImage: `url(${bgImage})` }}>
      <Overlay />

      <Card>
        <LogoImage src={logo} alt="AnimeKiroku logo" />

        <VStack spacing="4" width="100%" textAlign="center">
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            {title}
          </Text>

          {description && (
            <Text fontSize="sm" opacity={0.85}>
              {description}
            </Text>
          )}

          <Box width="100%">{children}</Box>

          <YellowButton size="md" onClick={onClick}>
            {buttonTitle}
          </YellowButton>
        </VStack>
      </Card>
    </BackgroundWrapper>
  )
}
