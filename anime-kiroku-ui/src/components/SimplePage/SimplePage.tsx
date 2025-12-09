import { Box, Text, VStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import {
  BackgroundWrapper,
  Overlay,
  Card,
  LogoImage,
  YellowButton,
  BackButton,
} from './SimplePage.styles'
import type { SimplePageProps } from './SimplePage.types'

import bgImage from '../../assets/anime-panel.jpg'
import logo from '../../assets/anime-kiroku-logo.png'
import { ROUTES } from '../../routes/routes'
import { FiArrowLeft } from 'react-icons/fi'
import { useNavigation } from '../../hooks/useNavigation'

export default function SimplePage({
  title,
  description,
  children,
  buttonTitle,
  onClick,
}: SimplePageProps) {
  const { goBack } = useNavigation()

  const handleBackClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    goBack()
  }
  return (
    <BackgroundWrapper style={{ backgroundImage: `url(${bgImage})` }}>
      <Overlay />
      <BackButton onClick={handleBackClick} aria-label="Voltar">
        <FiArrowLeft size={20} />
      </BackButton>
      <Card>
        <RouterLink to={ROUTES.LANDING}>
          <LogoImage src={logo} alt="AnimeKiroku logo" />
        </RouterLink>

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
