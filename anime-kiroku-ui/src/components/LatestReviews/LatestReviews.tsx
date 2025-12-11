import { Spinner } from '@chakra-ui/react'
import ReviewCard from '../ReviewCard/ReviewCard'
import {
  Container,
  Header,
  Title,
  ReviewsList,
  MoreButton,
  NoReviews,
  LoadingContainer,
} from './LatestReviews.styles'
import type { LatestReviewsProps } from './LatestReviews.types'

export default function LatestReviews({
  reviews,
  isLoading = false,
  title = 'Latest Reviews',
  moreButtonText = 'More',
  onMoreClick,
  onReviewClick,
  limit = 5,
  showDate = true,
  compact = true,
  maxTextLength = 500,
}: LatestReviewsProps) {
  const displayedReviews = reviews.slice(0, limit)

  if (isLoading) {
    return (
      <Container>
        <Header>
          <Title>{title}</Title>
        </Header>
        <LoadingContainer>
          <Spinner size="sm" color="secondary.default" />
          <span style={{ marginLeft: '10px' }}>Loading reviews...</span>
        </LoadingContainer>
      </Container>
    )
  }

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
      </Header>

      {displayedReviews.length > 0 ? (
        <>
          <ReviewsList>
            {displayedReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onReviewClick={onReviewClick}
                showDate={showDate}
                compact={compact}
                maxTextLength={maxTextLength}
              />
            ))}
          </ReviewsList>

          {reviews.length > limit && (
            <MoreButton onClick={onMoreClick}>{moreButtonText}</MoreButton>
          )}
        </>
      ) : (
        <NoReviews>No reviews yet. Be the first to review!</NoReviews>
      )}
    </Container>
  )
}
