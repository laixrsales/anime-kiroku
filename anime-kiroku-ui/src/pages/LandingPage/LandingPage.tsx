import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import PageBase from '../../components/PageBase/PageBase'
import Banner from '../../components/Banner/Banner'
import { ROUTES } from '../../routes/routes'
import animeBanner from '../../assets/anime-banner.png'
import {
  HeroSection,
  ContentSection,
  SectionHeader,
  SectionTitle,
  ViewAllButton,
  CTASection,
  CTATitle,
  CTADescription,
  CTAButtonsContainer,
  PrimaryCTAButton,
  SecondaryCTAButton,
  LoadingContainer,
  ErrorContainer,
} from './LandingPage.styles'
import type { Anime } from '../../services/animeService'
import { useAnime } from '../../hooks/useAnime'
import { CardCarousel } from '../../components'

export default function LandingPage() {
  const { animes, isLoading, error, getTopAnimes } = useAnime()
  console.log('animes: ', animes)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    if (!hasLoaded && animes.length === 0) {
      getTopAnimes()
      setHasLoaded(true)
    }
  }, [getTopAnimes, animes.length, hasLoaded])

  useEffect(() => {
    getTopAnimes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const convertAnimeToCardProps = (anime: Anime) => ({
    id: anime.jikanId,
    image: anime.imageUrl,
    imageAlt: anime.title,
    title: anime.title,
    episodes: anime.episodes,
    description: anime.synopsis
      ? anime.synopsis.length > 100
        ? `${anime.synopsis.substring(0, 100)}...`
        : anime.synopsis
      : 'No description available',
    score: anime.score,
    size: 'md' as const,
  })

  const topAnimeCards = animes.map(convertAnimeToCardProps)

  return (
    <PageBase showHeaderLogo={true} showUserInfo={false}>
      <HeroSection>
        <Banner
          imageUrl={animeBanner}
          altText="Anime Banner"
          title="Welcome to AnimeKiroku"
          subtitle="Your ultimate platform to track, organize, and discover anime"
          height="65vh"
          hasOverlay={true}
          overlayOpacity={0.7}
        />
      </HeroSection>

      <ContentSection>
        <SectionHeader>
          <SectionTitle>Top Rated Animes</SectionTitle>
          <Link to={ROUTES.ANIME_LIST}>
            <ViewAllButton size="sm">View All</ViewAllButton>
          </Link>
        </SectionHeader>

        {isLoading && animes.length === 0 ? (
          <LoadingContainer>
            <Spinner size="xl" color="secondary.default" />
          </LoadingContainer>
        ) : error ? (
          <ErrorContainer>
            <Alert status="error" variant="subtle">
              <AlertIcon />
              <AlertTitle mr={2}>Error loading top animes!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </ErrorContainer>
        ) : (
          <CardCarousel cards={topAnimeCards} slidesPerView={4} />
        )}
      </ContentSection>

      <CTASection>
        <CTATitle>Start Your Anime Journey Today</CTATitle>
        <CTADescription>
          Create personalized lists, rate episodes, discover tailored
          recommendations, and keep track of all your favorite anime in one
          place. Join our community of passionate anime fans!
        </CTADescription>
        <CTAButtonsContainer>
          <Link to={ROUTES.REGISTER}>
            <PrimaryCTAButton>Create Free Account</PrimaryCTAButton>
          </Link>

          <Link to={ROUTES.LOGIN}>
            <SecondaryCTAButton>Sign In</SecondaryCTAButton>
          </Link>
        </CTAButtonsContainer>
      </CTASection>
    </PageBase>
  )
}
