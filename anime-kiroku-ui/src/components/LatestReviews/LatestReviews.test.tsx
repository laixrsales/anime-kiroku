import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import LatestReviews from './LatestReviews'
import type { Anime } from '../../services/animeService'
import type { Review } from '../../services/reviewService'

vi.mock('../ReviewCard/ReviewCard', () => ({
  __esModule: true,
  default: vi.fn(
    ({ review, onReviewClick, maxTextLength, compact, showDate }) => (
      <div
        data-testid="review-card"
        data-review-id={review.id}
        data-max-length={maxTextLength}
        data-compact={compact}
        data-show-date={showDate}
        onClick={() => onReviewClick && onReviewClick(review)}
      >
        <div data-testid="anime-title">{review.anime.title}</div>
        <div data-testid="username">{review.user.username}</div>
        <div data-testid="rating">Rating: {review.rating}/10</div>
        {review.reviewText && (
          <div data-testid="review-text">
            {maxTextLength && review.reviewText.length > maxTextLength
              ? `${review.reviewText.substring(0, maxTextLength)}...`
              : review.reviewText}
          </div>
        )}
        {showDate && (
          <div data-testid="review-date">
            {new Date(review.createdAt).toLocaleDateString()}
          </div>
        )}
      </div>
    ),
  ),
}))

const mockAnime: Anime = {
  id: 1,
  jikanId: 1535,
  title: 'Death Note',
  imageUrl: 'https://example.com/death-note.jpg',
  synopsis: 'A high school student discovers a supernatural notebook...',
  episodes: 37,
  score: 8.62,
  status: 'Finished Airing',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  reviews: [],
}

const createMockReview = (
  id: number,
  animeTitle: string,
  username: string,
  rating: number,
  reviewText?: string | null,
): Review => ({
  id,
  rating,
  reviewText,
  createdAt: `2024-01-${String(id).padStart(2, '0')}T10:30:00Z`,
  updatedAt: `2024-01-${String(id).padStart(2, '0')}T10:30:00Z`,
  userId: 100 + id,
  animeId: id,
  anime: {
    ...mockAnime,
    id,
    title: animeTitle,
    jikanId: 1000 + id,
  },
  user: {
    username,
  },
})

const mockReviews: Review[] = [
  createMockReview(
    1,
    'Death Note',
    'light_yagami',
    9,
    'Amazing psychological thriller! The cat and mouse game between Light and L is incredible.',
  ),
  createMockReview(
    2,
    'Death Note',
    'L_lawliet',
    8,
    'Great concept but the second half was a bit disappointing.',
  ),
  createMockReview(
    3,
    'Death Note',
    'misa_amane',
    10,
    'Masterpiece! One of the best anime ever made. The mind games are unparalleled.',
  ),
  createMockReview(
    4,
    'Hunter x Hunter',
    'killua_zoldyck',
    7,
    'Good anime but overrated in my opinion.',
  ),
  createMockReview(
    5,
    'Hunter x Hunter',
    'gon_freecss',
    9,
    'The Chimera Ant arc is one of the best arcs in anime history.',
  ),
  createMockReview(
    6,
    'Fullmetal Alchemist: Brotherhood',
    'edward_elric',
    8,
    null,
  ),
]

describe('LatestReviews', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render with title and reviews', () => {
    render(<LatestReviews reviews={mockReviews} />)

    expect(screen.getByText('Latest Reviews')).toBeInTheDocument()
    expect(screen.getAllByTestId('review-card')).toHaveLength(5)
  })

  it('should show "No reviews" message when reviews array is empty', () => {
    render(<LatestReviews reviews={[]} />)

    expect(
      screen.getByText('No reviews yet. Be the first to review!'),
    ).toBeInTheDocument()
    expect(screen.queryByTestId('review-card')).toBeNull()
  })

  it('should limit reviews based on limit prop', () => {
    render(<LatestReviews reviews={mockReviews} limit={3} />)

    const reviewCards = screen.getAllByTestId('review-card')
    expect(reviewCards).toHaveLength(3)

    expect(reviewCards[0]).toHaveAttribute('data-review-id', '1')
    expect(reviewCards[1]).toHaveAttribute('data-review-id', '2')
    expect(reviewCards[2]).toHaveAttribute('data-review-id', '3')
  })

  it('should show "More" button when reviews exceed limit', () => {
    render(<LatestReviews reviews={mockReviews} limit={3} />)

    expect(screen.getByText('More')).toBeInTheDocument()
  })

  it('should not show "More" button when reviews are within limit', () => {
    render(<LatestReviews reviews={mockReviews.slice(0, 3)} limit={5} />)

    expect(screen.queryByText('More')).toBeNull()
  })

  it('should call onMoreClick when "More" button is clicked', () => {
    const mockOnMoreClick = vi.fn()
    render(
      <LatestReviews
        reviews={mockReviews}
        limit={3}
        onMoreClick={mockOnMoreClick}
      />,
    )

    fireEvent.click(screen.getByText('More'))
    expect(mockOnMoreClick).toHaveBeenCalledOnce()
  })

  it('should use custom title when provided', () => {
    render(<LatestReviews reviews={mockReviews} title="Recent Reviews" />)

    expect(screen.getByText('Recent Reviews')).toBeInTheDocument()
  })

  it('should use custom button text when provided', () => {
    render(
      <LatestReviews
        reviews={mockReviews}
        limit={3}
        moreButtonText="View All Reviews"
      />,
    )

    expect(screen.getByText('View All Reviews')).toBeInTheDocument()
  })

  it('should display usernames', () => {
    render(<LatestReviews reviews={mockReviews} limit={6} />)

    expect(screen.getByText('light_yagami')).toBeInTheDocument()
    expect(screen.getByText('L_lawliet')).toBeInTheDocument()
    expect(screen.getByText('misa_amane')).toBeInTheDocument()
    expect(screen.getByText('killua_zoldyck')).toBeInTheDocument()
    expect(screen.getByText('gon_freecss')).toBeInTheDocument()
    expect(screen.getByText('edward_elric')).toBeInTheDocument()
  })

  it('should handle reviews without reviewText', () => {
    render(<LatestReviews reviews={[mockReviews[5]]} />)

    expect(screen.getByTestId('review-card')).toBeInTheDocument()
    expect(screen.queryByTestId('review-text')).toBeNull()
  })

  it('should call onReviewClick when a review is clicked', () => {
    const mockOnReviewClick = vi.fn()
    render(
      <LatestReviews
        reviews={[mockReviews[0]]}
        onReviewClick={mockOnReviewClick}
      />,
    )

    fireEvent.click(screen.getByTestId('review-card'))
    expect(mockOnReviewClick).toHaveBeenCalledWith(mockReviews[0])
  })

  it('should pass compact prop to ReviewCard', () => {
    render(<LatestReviews reviews={[mockReviews[0]]} compact={true} />)

    const reviewCard = screen.getByTestId('review-card')
    expect(reviewCard).toHaveAttribute('data-compact', 'true')
  })

  it('should pass showDate prop to ReviewCard', () => {
    render(<LatestReviews reviews={[mockReviews[0]]} showDate={true} />)

    const reviewCard = screen.getByTestId('review-card')
    expect(reviewCard).toHaveAttribute('data-show-date', 'true')
  })

  it('should display review dates when showDate is true', () => {
    render(<LatestReviews reviews={[mockReviews[0]]} showDate={true} />)

    expect(screen.getByTestId('review-date')).toBeInTheDocument()
  })

  it('should not display review dates when showDate is false', () => {
    render(<LatestReviews reviews={[mockReviews[0]]} showDate={false} />)

    const reviewCard = screen.getByTestId('review-card')
    expect(reviewCard).toHaveAttribute('data-show-date', 'false')
    expect(screen.queryByTestId('review-date')).toBeNull()
  })
})
