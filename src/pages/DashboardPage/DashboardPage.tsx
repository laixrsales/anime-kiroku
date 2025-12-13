import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  PageContainer,
  WelcomeTitle,
  SectionHeader,
  SectionTitle,
  EmptyMessage,
  LoadingWrapper,
} from './DashboardPage.styles'
import { CardCarousel, type AnimeCardProps } from '../../components'
import PageBase from '../../components/PageBase/PageBase'
import { useAnime } from '../../hooks/useAnime'
import { useAuth } from '../../hooks/useAuth'
import { useNavigation } from '../../hooks/useNavigation'
import { useReview } from '../../hooks/useReview'
import type { Anime } from '../../services/animeService'

export default function DashboardPage() {
  const { user } = useAuth()
  const { goTo } = useNavigation()

  const {
    getTopAnimes,
    getRecommendations,
    recommendations,
    animes,
    getAnimeById,
  } = useAnime()

  const { userReviews, isLoadingUserReviews, getUserReviews } = useReview()

  const [userReviewedAnimes, setUserReviewedAnimes] = useState<Anime[]>([])
  const [isLoadingAnimes, setIsLoadingAnimes] = useState(false)

  useEffect(() => {
    if (user) {
      getUserReviews()
    }
  }, [user, getUserReviews])

  useEffect(() => {
    const fetchAnimesFromReviews = async () => {
      if (userReviews && userReviews.length > 0) {
        setIsLoadingAnimes(true)
        try {
          const animesPromises = userReviews.map(async (review) => {
            try {
              const anime = await getAnimeById(review.anime?.jikanId || 0)
              return anime
            } catch (error) {
              console.error(
                `Erro ao buscar anime ${review.anime?.jikanId}:`,
                error,
              )
              return null
            }
          })

          const fetchedAnimes = await Promise.all(animesPromises)
          const validAnimes = fetchedAnimes.filter(
            (anime): anime is Anime => anime !== null,
          )

          setUserReviewedAnimes(validAnimes)
        } catch (error) {
          console.error('Erro ao buscar animes das reviews:', error)
        } finally {
          setIsLoadingAnimes(false)
        }
      } else {
        setUserReviewedAnimes([])
      }
    }

    fetchAnimesFromReviews()
  }, [userReviews, getAnimeById])

  useEffect(() => {
    if (!userReviewedAnimes || userReviewedAnimes.length === 0) {
      getTopAnimes()
    }
  }, [userReviewedAnimes, getTopAnimes])

  useEffect(() => {
    if (userReviewedAnimes && userReviewedAnimes.length > 0) {
      const lastFour = userReviewedAnimes.slice(-4)

      lastFour.forEach((anime) => {
        if (anime.jikanId) {
          getRecommendations(anime.jikanId)
        }
      })
    }
  }, [userReviewedAnimes, getRecommendations])

  const mapAnimeToCard = useCallback(
    (anime: Anime): AnimeCardProps => {
      return {
        image: anime.imageUrl,
        imageAlt: anime.title,
        title: anime.title,
        episodes: anime.episodes,
        description: anime.synopsis
          ? anime.synopsis
          : 'No description available',
        score: anime.score,
        size: 'md',
        onClick: () => goTo(`/anime/${anime.jikanId}`),
        showOverlay: true,
      }
    },
    [goTo],
  )

  const userReviewCards = useMemo(() => {
    if (userReviewedAnimes) return userReviewedAnimes.map(mapAnimeToCard)
    else return []
  }, [mapAnimeToCard, userReviewedAnimes])

  const topAnimeCards = animes.map(mapAnimeToCard)

  const recommendationCards = recommendations.map(mapAnimeToCard)

  const isLoadingReviewsSection = isLoadingUserReviews || isLoadingAnimes

  return (
    <PageBase showHeaderLogo showUserInfo>
      <PageContainer>
        <WelcomeTitle>
          Welcome back, {user?.username}. <br />
          Which anime will you watch this time?
        </WelcomeTitle>

        {userReviews?.length === 0 ? (
          <SectionHeader>
            <SectionTitle>Top Rated Animes</SectionTitle>
          </SectionHeader>
        ) : (
          <SectionHeader>
            <SectionTitle>Your Latest Reviews</SectionTitle>
          </SectionHeader>
        )}

        {isLoadingReviewsSection ? (
          <LoadingWrapper>
            <span className="loader" />
          </LoadingWrapper>
        ) : userReviewedAnimes?.length === 0 ? (
          <CardCarousel cards={topAnimeCards} slidesPerView={4} />
        ) : (
          <>
            <CardCarousel cards={userReviewCards} slidesPerView={4} />
          </>
        )}

        {userReviewedAnimes?.length > 0 && (
          <>
            <SectionHeader>
              <SectionTitle>Recommended For You</SectionTitle>
            </SectionHeader>

            {recommendationCards.length === 0 ? (
              <EmptyMessage>No recommendations available yet.</EmptyMessage>
            ) : (
              <CardCarousel cards={recommendationCards} slidesPerView={4} />
            )}
          </>
        )}
      </PageContainer>
    </PageBase>
  )
}
