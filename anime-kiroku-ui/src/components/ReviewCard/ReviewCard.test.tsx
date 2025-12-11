import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ReviewCard from './ReviewCard'
import type { Review } from '../../services/reviewService'

vi.mock('react-icons/fa', () => ({
  FaStar: () => <span data-testid="filled-star">★</span>,
  FaRegStar: () => <span data-testid="outline-star">☆</span>,
}))

const mockReview: Review = {
  id: 1,
  rating: 8,
  reviewText:
    'This is an amazing anime with great character development and stunning animation. The story kept me hooked from start to finish.',
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-15T10:30:00Z',
  userId: 101,
  animeId: 1,
  anime: {
    id: 1,
    jikanId: 1535,
    title: 'Attack on Titan',
    imageUrl: 'https://example.com/aot.jpg',
    synopsis: 'Humanity fights for survival against giant humanoid creatures.',
    episodes: 75,
    score: 8.5,
    status: 'Finished Airing',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    reviews: [],
  },
  user: {
    username: 'eren_yeager',
  },
}

describe('ReviewCard', () => {
  it('should render review with user info and anime title', () => {
    render(<ReviewCard review={mockReview} />)

    expect(screen.getByText('eren_yeager')).toBeInTheDocument()
    expect(screen.getByText('on Attack on Titan')).toBeInTheDocument()
  })

  it('should display review text', () => {
    render(<ReviewCard review={mockReview} />)

    expect(screen.getByText(/This is an amazing anime/)).toBeInTheDocument()
  })

  it('should display date when showDate is true', () => {
    render(<ReviewCard review={mockReview} showDate={true} />)

    expect(screen.getByText(/Reviewed on/)).toBeInTheDocument()
    expect(screen.getByText(/Jan 15, 2024/)).toBeInTheDocument()
  })

  it('should not display date when showDate is false', () => {
    render(<ReviewCard review={mockReview} showDate={false} />)

    expect(screen.queryByText(/Reviewed on/)).not.toBeInTheDocument()
  })

  it('should not truncate text when not in compact mode', () => {
    render(
      <ReviewCard review={mockReview} compact={false} maxTextLength={20} />,
    )

    const reviewText = screen.getByText(mockReview.reviewText!)
    expect(reviewText.textContent).not.toMatch(/\.\.\.$/)
  })

  it('should handle review without text but with rating', () => {
    const reviewWithoutText = {
      ...mockReview,
      reviewText: null,
      rating: 7,
    }

    render(<ReviewCard review={reviewWithoutText} />)

    expect(screen.getByText('eren_yeager')).toBeInTheDocument()
    expect(screen.getByText('on Attack on Titan')).toBeInTheDocument()
    expect(screen.queryByTestId('review-text')).not.toBeInTheDocument()
  })

  it('should show empty state when no review text and rating is 0', () => {
    const emptyReview = {
      ...mockReview,
      reviewText: null,
      rating: 0,
    }

    render(<ReviewCard review={emptyReview} />)

    expect(screen.getByText('No review available')).toBeInTheDocument()
  })

  it('should call onReviewClick when card is clicked', () => {
    const mockOnClick = vi.fn()
    render(<ReviewCard review={mockReview} onReviewClick={mockOnClick} />)

    fireEvent.click(screen.getByText('eren_yeager'))
    expect(mockOnClick).toHaveBeenCalledWith(mockReview.id)
  })

  it('should not show edited indicator when dates are the same', () => {
    const uneditedReview = {
      ...mockReview,
      updatedAt: '2024-01-15T10:30:00Z',
    }

    render(<ReviewCard review={uneditedReview} showDate={true} />)

    expect(screen.queryByText('(edited)')).not.toBeInTheDocument()
  })

  it('should handle invalid date gracefully', () => {
    const invalidDateReview = {
      ...mockReview,
      createdAt: 'invalid-date',
      updatedAt: 'invalid-date',
    }

    render(<ReviewCard review={invalidDateReview} showDate={true} />)

    expect(screen.queryByText(/Reviewed on/)).not.toBeInTheDocument()
  })

  it('should handle user without username', () => {
    const noUsernameReview = {
      ...mockReview,
      user: { username: '' },
    }

    render(<ReviewCard review={noUsernameReview} />)

    expect(screen.getByText('??')).toBeInTheDocument()
  })

  it('should truncate username initials correctly', () => {
    const longNameReview = {
      ...mockReview,
      user: { username: 'John Michael Smith' },
    }

    render(<ReviewCard review={longNameReview} />)

    expect(screen.getByText('JM')).toBeInTheDocument()
  })
})
