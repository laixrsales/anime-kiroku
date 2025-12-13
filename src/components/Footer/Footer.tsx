import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { FooterWrapper, IconLink } from './Footer.styles'
import logo from '../../assets/logo-lanternas.png'
import { FaGithub } from 'react-icons/fa'

export default function Footer() {
  return (
    <FooterWrapper>
      <VStack>
        <Box as="img" src={logo} h="32px" data-testid="footer-logo" />
        <Text fontSize="3xl" fontWeight="bold">
          AnimeKiroku
        </Text>
      </VStack>

      <Text fontSize="sm" maxW="600px">
        Anime Kiroku is an academic project created for the INF321 - Web systems
        design and develop, in the Federal University of Viçosa. Inspired by
        Letterboxd, it provides an anime cataloging experience using the
        MyAnimeList API.
      </Text>
      <Text fontSize="xs" maxW="600px">
        Created by Laís Sales and Henrique Resende.
      </Text>
      <HStack spacing="md" mt="md">
        <IconLink
          href="https://github.com/laixrsales/anime-kiroku"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={20} />
        </IconLink>
      </HStack>
      <Text fontSize="xs" opacity={0.7}>
        © 2025 AnimeKiroku
      </Text>
    </FooterWrapper>
  )
}
