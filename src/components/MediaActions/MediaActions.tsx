import { Tooltip } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaEye, FaHeart, FaStar } from 'react-icons/fa'
import { FiShare2 } from 'react-icons/fi'
import {
  MdOutlineRemoveRedEye,
  MdOutlineFavoriteBorder,
  MdOutlineStar,
} from 'react-icons/md'

import {
  ActionsContainer,
  IconsRow,
  IconWithLabel,
  ActionIcon,
  IconLabel,
  RatingRow,
  RatingLabel,
  StarsContainer,
  StarButton,
} from './MediaActions.styles'
import type { MediaActionsProps } from './MediaActions.types'

export default function MediaActions({
  reviewed = false,
  liked = false,
  shared = false,
  rating = 0,
  labels = {},
  onReviewClick,
  onLikeClick,
  onShareClick,
  onRatingChange,
  disabled = false,
}: MediaActionsProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const defaultLabels = {
    review: 'Review',
    like: 'Like',
    share: 'Share',
    rate: 'Rate',
    reviewed: 'Reviewed',
    liked: 'Liked',
    shared: 'Shared',
    rated: 'Rated',
  }

  const mergedLabels = { ...defaultLabels, ...labels }

  const getReviewIcon = () => (reviewed ? FaEye : MdOutlineRemoveRedEye)
  const getLikeIcon = () => (liked ? FaHeart : MdOutlineFavoriteBorder)

  const getReviewLabel = () =>
    reviewed ? mergedLabels.reviewed : mergedLabels.review
  const getLikeLabel = () => (liked ? mergedLabels.liked : mergedLabels.like)
  const getShareLabel = () =>
    shared ? mergedLabels.shared : mergedLabels.share
  const getRatingLabel = () =>
    rating > 0 ? mergedLabels.rated : mergedLabels.rate

  const handleStarClick = (starValue: number) => {
    if (!disabled && onRatingChange) {
      const newRating = rating === starValue ? 0 : starValue
      onRatingChange(newRating)
    }
  }

  const handleStarHover = (starValue: number) => {
    if (!disabled) {
      setHoverRating(starValue)
    }
  }

  const handleMouseLeave = () => {
    setHoverRating(0)
  }

  const handleIconClick = (
    e: React.MouseEvent<HTMLDivElement>,
    callback?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  ) => {
    if (!disabled && callback) {
      const buttonEvent = {
        ...e,
        currentTarget:
          e.currentTarget.querySelector('button') || e.currentTarget,
      } as React.MouseEvent<HTMLButtonElement>
      callback(buttonEvent)
    }
  }

  const renderStars = () => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      const isActive = rating >= i
      const isHovered = hoverRating >= i

      stars.push(
        <Tooltip
          key={i}
          label={`${i} star${i > 1 ? 's' : ''}`}
          placement="top"
          hasArrow
          background={'var(--chakra-colors-secondary-default)'}
        >
          <StarButton
            aria-label={`Rate ${i} star${i > 1 ? 's' : ''}`}
            icon={isActive ? <FaStar /> : <MdOutlineStar />}
            isactive={isActive.toString()}
            ishover={(isHovered && !isActive).toString()}
            onClick={() => handleStarClick(i)}
            onMouseEnter={() => handleStarHover(i)}
            isDisabled={disabled}
          />
        </Tooltip>,
      )
    }
    return stars
  }

  return (
    <ActionsContainer spacing={3} onMouseLeave={handleMouseLeave}>
      <IconsRow>
        <IconWithLabel
          onClick={(e) => handleIconClick(e, onReviewClick)}
          data-testid="review-icon-container"
        >
          <ActionIcon
            aria-label={getReviewLabel()}
            icon={React.createElement(getReviewIcon())}
            isactive={reviewed.toString()}
            isDisabled={disabled}
            data-testid="review-icon"
          />
          <IconLabel isactive={reviewed.toString()}>
            {getReviewLabel()}
          </IconLabel>
        </IconWithLabel>

        <IconWithLabel
          onClick={(e) => handleIconClick(e, onLikeClick)}
          data-testid="like-icon-container"
        >
          <ActionIcon
            aria-label={getLikeLabel()}
            icon={React.createElement(getLikeIcon())}
            isactive={liked.toString()}
            isDisabled={disabled}
            data-testid="like-icon"
          />
          <IconLabel isactive={liked.toString()}>{getLikeLabel()}</IconLabel>
        </IconWithLabel>

        <IconWithLabel
          onClick={(e) => handleIconClick(e, onShareClick)}
          data-testid="watchlist-icon-container"
        >
          <ActionIcon
            aria-label={getShareLabel()}
            icon={<FiShare2 />}
            isactive={shared.toString()}
            isDisabled={disabled}
            data-testid="watchlist-icon"
          />
          <IconLabel isactive={shared.toString()}>{getShareLabel()}</IconLabel>
        </IconWithLabel>
      </IconsRow>

      <RatingRow>
        <RatingLabel
          hasrating={(rating > 0).toString()}
          data-testid="rating-label"
        >
          {getRatingLabel()}
        </RatingLabel>

        <StarsContainer data-testid="stars-container">
          {renderStars()}
        </StarsContainer>
      </RatingRow>
    </ActionsContainer>
  )
}
