import { FaStar, FaRegStar } from 'react-icons/fa'
import {
  ReviewContainer,
  ReviewHeader,
  UserInfo,
  UserAvatar,
  UserDetails,
  UserName,
  AnimeTitle,
  StarsContainer,
  StarIcon,
  ReviewContent,
  ReviewText,
  ReviewDate,
  EmptyReview,
} from './ReviewCard.styles'
import type { ReviewCardProps } from './ReviewCard.types'

export default function ReviewCard({
  review,
  onReviewClick,
  showDate = true,
  compact = false,
  maxTextLength = 500,
}: ReviewCardProps) {
  const { id, rating, reviewText, createdAt, updatedAt, user, anime } = review
  const { username: userName } = user
  const { title: animeTitle } = anime

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString)
    return !isNaN(date.getTime())
  }

  const renderStars = () => {
    const stars = []
    const normalizedRating = Math.floor(rating / 2)
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= normalizedRating
      stars.push(
        <StarIcon key={i} filled={isFilled.toString()}>
          {isFilled ? <FaStar /> : <FaRegStar />}
        </StarIcon>,
      )
    }
    return stars
  }

  const truncateText = (text: string, maxLength: number): string => {
    if (!text || text.length <= maxLength) return text || ''
    return text.substring(0, maxLength) + '...'
  }

  const getInitials = (name: string): string => {
    if (!name) return '??'
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  const handleReviewClick = () => {
    if (onReviewClick) {
      onReviewClick(id)
    }
  }

  if (!reviewText && rating === 0) {
    return <EmptyReview>No review available</EmptyReview>
  }

  return (
    <ReviewContainer
      onClick={handleReviewClick}
      cursor={onReviewClick ? 'pointer' : 'default'}
    >
      <ReviewHeader>
        <UserInfo>
          <UserAvatar>{getInitials(userName)}</UserAvatar>

          <UserDetails>
            <UserName>{userName}</UserName>
            <AnimeTitle>on {animeTitle}</AnimeTitle>
          </UserDetails>
        </UserInfo>

        <StarsContainer>{renderStars()}</StarsContainer>
      </ReviewHeader>

      {reviewText && (
        <ReviewContent>
          <ReviewText>
            {compact && maxTextLength
              ? truncateText(reviewText, maxTextLength)
              : reviewText}
          </ReviewText>
        </ReviewContent>
      )}

      {showDate && isValidDate(createdAt) && (
        <ReviewDate>
          Reviewed on {formatDate(createdAt)}
          {isValidDate(updatedAt) &&
            new Date(createdAt).getTime() !== new Date(updatedAt).getTime() &&
            ' (edited)'}
        </ReviewDate>
      )}
    </ReviewContainer>
  )
}
