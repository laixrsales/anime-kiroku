/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
  Button,
  useToast,
} from '@chakra-ui/react'
import PageBase from '../../components/PageBase/PageBase'
import { CardCarousel } from '../../components'
import LatestReviews from '../../components/LatestReviews/LatestReviews'
import MediaActions from '../../components/MediaActions/MediaActions'
import { useAnime } from '../../hooks/useAnime'
import { useReview } from '../../hooks/useReview'
import { useAuth } from '../../hooks/useAuth'
import { type Review } from '../../services/reviewService'
import { type Anime } from '../../services/animeService'
import CreateReviewModal from '../../components/CreateReviewModal/CreateReviewModal'

import {
  PageContainer,
  GridLayout,
  LeftCol,
  MiddleCol,
  BackButton,
  LoadingContainer,
  ErrorContainer,
  DescriptionText,
  SectionHeader,
  SectionTitle,
  LoadingWrapper,
} from './AnimePage.styles'

import { FiArrowLeft } from 'react-icons/fi'
import { useNavigation } from '../../hooks/useNavigation'
import AnimeCard from '../../components/AnimeCard/AnimeCard'

const AnimePage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const toast = useToast()

  const {
    currentAnime,
    recommendations,
    isLoadingAnime,
    isLoadingRecommendations,
    error: animeError,
    getAnimeById,
    getRecommendations,
    clearRecommendations,
    clearAnimes,
  } = useAnime()

  const {
    reviews,
    isLoading: isLoadingReviews,
    getAnimeReviews,
    clearReviews,
    createReview,
  } = useReview()

  const { user } = useAuth()
  const { goTo } = useNavigation()

  const [isCreateReviewModalOpen, setIsCreateReviewModalOpen] = useState(false)
  const [userReview, setUserReview] = useState<Review | null>(null)
  const [liked, setLiked] = useState<boolean>(false)

  useEffect(() => {
    if (id) {
      const animeId = parseInt(id, 10)
      if (!isNaN(animeId)) {
        clearAnimes()
        clearReviews()
        clearRecommendations()

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUserReview(null)
        setLiked(false)
        setIsCreateReviewModalOpen(false)

        getAnimeById(animeId)
        getAnimeReviews(animeId)
      }
    }
  }, [
    id,
    getAnimeById,
    getAnimeReviews,
    clearReviews,
    clearRecommendations,
    clearAnimes,
  ])

  useEffect(() => {
    if (currentAnime && currentAnime.jikanId) {
      getRecommendations(currentAnime.jikanId)
    }
  }, [currentAnime, getRecommendations])

  useEffect(() => {
    if (user && reviews.length > 0) {
      const r = reviews.find((review) => review.user.username === user.username)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserReview(r || null)
    }
  }, [user, reviews])

  const handleCreateReview = async (rating: number, reviewText: string) => {
    if (!currentAnime || !user) return

    try {
      await createReview({
        jikanId: currentAnime.jikanId,
        rating,
        reviewText,
      })

      toast({
        title: 'Review created!',
        description: 'Your review has been successfully submitted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })

      setIsCreateReviewModalOpen(false)
      getAnimeReviews(currentAnime.jikanId)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: 'Error',
        description: `Failed to create review. Please try again. ${error}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
    }
  }

  const handleStarRating = (rating: number) => {
    handleCreateReview(rating * 2, '')
  }

  const handleGoBack = () => navigate(-1)

  const handleShare = async () => {
    if (navigator.share && currentAnime) {
      try {
        await navigator.share({
          title: currentAnime.title,
          text: `Check out ${currentAnime.title} on AnimeKiroku!`,
          url: window.location.href,
        })
        // eslint-disable-next-line no-empty
      } catch (_) {}
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: 'Link copied!',
        description: 'Anime link copied to clipboard.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      })
    }
  }

  const handleLike = () => {
    toast({
      title: liked ? 'Removed from favorites' : 'Added to favorites!',
      description: liked
        ? 'Anime removed from your favorites list.'
        : 'Anime added to your favorites list.',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    })
    setLiked((prev) => !prev)
  }

  const convertAnimeToCardProps = (anime: Anime) => ({
    image: anime.imageUrl,
    imageAlt: anime.title,
    title: anime.title,
    episodes: anime.episodes,
    description: anime.synopsis ? anime.synopsis : 'No description available',
    score: anime.score,
    size: 'md' as const,
    onClick: () => goTo(`/anime/${anime.jikanId}`),
    showOverlay: true,
  })

  const recommendationCards = recommendations.map(convertAnimeToCardProps)

  if (isLoadingAnime) {
    return (
      <PageBase showHeaderLogo showUserInfo>
        <LoadingContainer>
          <Spinner size="xl" color="secondary.default" />
          <Text mt={4}>Loading anime details...</Text>
        </LoadingContainer>
      </PageBase>
    )
  }

  if (animeError || !currentAnime) {
    return (
      <PageBase showHeaderLogo showUserInfo>
        <ErrorContainer>
          <Alert status="error" variant="subtle">
            <AlertIcon />
            <AlertTitle mr={2}>Error loading anime!</AlertTitle>
            <AlertDescription>
              {animeError || 'Anime not found'}
            </AlertDescription>
          </Alert>

          <Button mt={4} onClick={handleGoBack}>
            Go Back
          </Button>
        </ErrorContainer>
      </PageBase>
    )
  }

  return (
    <PageBase showHeaderLogo showUserInfo>
      <PageContainer>
        <BackButton onClick={handleGoBack} aria-label="Voltar">
          <FiArrowLeft size={20} />
        </BackButton>

        <GridLayout>
          <LeftCol>
            <AnimeCard
              image={currentAnime.imageUrl}
              imageAlt={currentAnime.title}
              size="lg"
            />
            <MediaActions
              reviewed={!!userReview}
              liked={liked}
              rating={userReview?.rating}
              onReviewClick={() => setIsCreateReviewModalOpen(true)}
              onRatingChange={handleStarRating}
              onLikeClick={handleLike}
              onShareClick={handleShare}
            />
          </LeftCol>

          <MiddleCol>
            <SectionTitle>{currentAnime.title}</SectionTitle>

            <DescriptionText>
              {currentAnime.synopsis || 'No description available'}
            </DescriptionText>

            <LatestReviews
              reviews={reviews}
              isLoading={isLoadingReviews}
              limit={4}
              compact
              showDate
              title="Latest Reviews"
            />

            <SectionHeader>
              <SectionTitle>You may like these animes</SectionTitle>
            </SectionHeader>

            {isLoadingRecommendations ? (
              <LoadingWrapper>
                <span className="loader" />
              </LoadingWrapper>
            ) : (
              <CardCarousel cards={recommendationCards} slidesPerView={3} />
            )}
          </MiddleCol>
        </GridLayout>
      </PageContainer>

      <CreateReviewModal
        isOpen={isCreateReviewModalOpen}
        onClose={() => setIsCreateReviewModalOpen(false)}
        onSubmit={handleCreateReview}
        initialRating={userReview?.rating}
        animeTitle={currentAnime.title}
        isUpdate={!!userReview}
      />
    </PageBase>
  )
}

export default AnimePage
