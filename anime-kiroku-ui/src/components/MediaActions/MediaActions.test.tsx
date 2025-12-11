import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import MediaActions from './MediaActions'

describe('MediaActions', () => {
  it('should render all action icons', () => {
    render(<MediaActions />)

    expect(screen.getByTestId('review-icon')).toBeInTheDocument()
    expect(screen.getByTestId('like-icon')).toBeInTheDocument()
    expect(screen.getByTestId('watchlist-icon')).toBeInTheDocument()
    expect(screen.getByTestId('rating-label')).toBeInTheDocument()
  })

  it('should show "Review" label by default', () => {
    render(<MediaActions />)

    expect(screen.getByText('Review')).toBeInTheDocument()
    expect(screen.getByText('Like')).toBeInTheDocument()
    expect(screen.getByText('Share')).toBeInTheDocument()
    expect(screen.getByText('Rate')).toBeInTheDocument()
  })

  it('should show "Reviewed" label when reviewed is true', () => {
    render(<MediaActions reviewed={true} />)

    expect(screen.getByText('Reviewed')).toBeInTheDocument()
  })

  it('should show "Liked" label when liked is true', () => {
    render(<MediaActions liked={true} />)

    expect(screen.getByText('Liked')).toBeInTheDocument()
  })

  it('should show "Shared" label when shared is true', () => {
    render(<MediaActions shared={true} />)

    expect(screen.getByText('Shared')).toBeInTheDocument()
  })

  it('should show 5 star rating buttons', () => {
    render(<MediaActions />)

    const starsContainer = screen.getByTestId('stars-container')
    expect(starsContainer.children).toHaveLength(5)
  })

  it('should highlight stars based on rating', () => {
    render(<MediaActions rating={3} />)

    const stars = screen.getAllByRole('button', { name: /star/ })

    expect(stars[0]).toHaveAttribute('isactive', 'true')
    expect(stars[1]).toHaveAttribute('isactive', 'true')
    expect(stars[2]).toHaveAttribute('isactive', 'true')
    expect(stars[3]).toHaveAttribute('isactive', 'false')
    expect(stars[4]).toHaveAttribute('isactive', 'false')
  })

  it('should call onRatingChange when star is clicked', () => {
    const mockOnRatingChange = vi.fn()
    render(<MediaActions onRatingChange={mockOnRatingChange} />)

    const thirdStar = screen.getAllByRole('button', { name: /star/ })[2]
    fireEvent.click(thirdStar)

    expect(mockOnRatingChange).toHaveBeenCalledWith(3)
  })

  it('should remove rating when clicking same star', () => {
    const mockOnRatingChange = vi.fn()
    render(<MediaActions rating={3} onRatingChange={mockOnRatingChange} />)

    const thirdStar = screen.getAllByRole('button', { name: /star/ })[2]
    fireEvent.click(thirdStar)

    expect(mockOnRatingChange).toHaveBeenCalledWith(0)
  })

  it('should call onReviewClick when review icon is clicked', () => {
    const mockOnReviewClick = vi.fn()
    render(<MediaActions onReviewClick={mockOnReviewClick} />)

    const reviewContainer = screen.getByTestId('review-icon-container')
    fireEvent.click(reviewContainer)

    expect(mockOnReviewClick).toHaveBeenCalledOnce()
  })

  it('should call onLikeClick when like icon is clicked', () => {
    const mockOnLikeClick = vi.fn()
    render(<MediaActions onLikeClick={mockOnLikeClick} />)

    const likeContainer = screen.getByTestId('like-icon-container')
    fireEvent.click(likeContainer)

    expect(mockOnLikeClick).toHaveBeenCalledOnce()
  })

  it('should call onShareClick when share icon is clicked', () => {
    const mockOnShareClick = vi.fn()
    render(<MediaActions onShareClick={mockOnShareClick} />)

    const shareContainer = screen.getByTestId('watchlist-icon-container')
    fireEvent.click(shareContainer)

    expect(mockOnShareClick).toHaveBeenCalledOnce()
  })

  it('should disable interactions when disabled is true', () => {
    const mockOnClick = vi.fn()
    render(
      <MediaActions
        disabled={true}
        onReviewClick={mockOnClick}
        onRatingChange={mockOnClick}
      />,
    )

    const reviewContainer = screen.getByTestId('review-icon-container')
    fireEvent.click(reviewContainer)

    const stars = screen.getAllByRole('button', { name: /star/ })
    fireEvent.click(stars[0])

    expect(mockOnClick).not.toHaveBeenCalled()
  })

  it('should use custom labels when provided', () => {
    const customLabels = {
      review: 'Write Review',
      like: 'Favorite',
      share: 'Save',
      rate: 'Score',
      reviewed: 'Already Reviewed',
      liked: 'Favorited',
      shared: 'Saved',
      rated: 'Scored',
    }

    render(<MediaActions labels={customLabels} />)

    expect(screen.getByText('Write Review')).toBeInTheDocument()
    expect(screen.getByText('Favorite')).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeInTheDocument()
    expect(screen.getByText('Score')).toBeInTheDocument()
  })

  it('should show "Rated" label when rating > 0', () => {
    render(<MediaActions rating={4} />)

    expect(screen.getByText('Rated')).toBeInTheDocument()
  })
})
