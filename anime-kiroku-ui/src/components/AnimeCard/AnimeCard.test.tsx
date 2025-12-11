import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AnimeCard from './AnimeCard'

describe('AnimeCard', () => {
  const mockProps = {
    image: 'https://example.com/image.jpg',
    title: 'Test Anime',
    episodes: 12,
    description: 'This is a test anime description',
  }

  it('should show episode count when episodes > 0', () => {
    render(<AnimeCard {...mockProps} />)

    expect(screen.getByTestId('episode-count')).toHaveTextContent('12 EP')
  })

  it('should not show episode count when episodes is 0', () => {
    render(<AnimeCard {...mockProps} episodes={0} />)

    expect(screen.queryByTestId('episode-count')).toBeNull()
  })

  it('should show overlay when showOverlay is true', () => {
    render(<AnimeCard {...mockProps} showOverlay={true} />)

    expect(screen.getByTestId('anime-card-overlay')).toBeInTheDocument()
    expect(screen.getByTestId('anime-card-title')).toBeInTheDocument()
    expect(screen.getByTestId('anime-card-description')).toBeInTheDocument()
  })

  it('should show title below when showTitleBelow is true', () => {
    render(<AnimeCard {...mockProps} showTitleBelow={true} />)

    expect(screen.getByTestId('anime-card-title-below')).toHaveTextContent(
      'Test Anime',
    )
  })

  it('should call onClick when card is clicked', () => {
    const mockOnClick = vi.fn()
    render(<AnimeCard {...mockProps} onClick={mockOnClick} />)

    fireEvent.click(screen.getByTestId('anime-card'))
    expect(mockOnClick).toHaveBeenCalledOnce()
  })
})
