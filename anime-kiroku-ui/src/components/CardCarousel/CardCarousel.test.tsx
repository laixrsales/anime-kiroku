import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CardCarousel } from './CardCarousel'

describe('CardCarousel', () => {
  const mockCards = [
    {
      id: 1,
      image: 'https://example.com/image1.jpg',
      title: 'Anime 1',
      episodes: 12,
    },
    {
      id: 2,
      image: 'https://example.com/image2.jpg',
      title: 'Anime 2',
      episodes: 24,
    },
    {
      id: 3,
      image: 'https://example.com/image3.jpg',
      title: 'Anime 3',
      episodes: 36,
    },
    {
      id: 4,
      image: 'https://example.com/image4.jpg',
      title: 'Anime 4',
      episodes: 48,
    },
  ]

  it('should render carousel with cards', () => {
    render(<CardCarousel cards={mockCards} slidesPerView={2} />)

    expect(screen.getAllByTestId('anime-card')).toHaveLength(2)
    expect(screen.getByLabelText('previous')).toBeInTheDocument()
    expect(screen.getByLabelText('next')).toBeInTheDocument()
  })

  it('should show correct number of cards based on slidesPerView', () => {
    render(<CardCarousel cards={mockCards} slidesPerView={3} />)

    expect(screen.getAllByTestId('anime-card')).toHaveLength(3)
  })

  it('should navigate to next page when next button is clicked', () => {
    render(<CardCarousel cards={mockCards} slidesPerView={2} />)

    const nextButton = screen.getByLabelText('next')
    fireEvent.click(nextButton)

    expect(screen.getAllByTestId('anime-card')).toHaveLength(2)
  })

  it('should navigate to previous page when previous button is clicked', () => {
    render(<CardCarousel cards={mockCards} slidesPerView={2} />)

    const nextButton = screen.getByLabelText('next')
    fireEvent.click(nextButton)

    const prevButton = screen.getByLabelText('previous')
    fireEvent.click(prevButton)

    expect(screen.getAllByTestId('anime-card')).toHaveLength(2)
  })

  it('should disable previous button on first page', () => {
    render(<CardCarousel cards={mockCards} slidesPerView={2} />)

    const prevButton = screen.getByLabelText('previous')
    expect(prevButton).toBeDisabled()
  })

  it('should disable next button on last page', () => {
    render(<CardCarousel cards={mockCards} slidesPerView={4} />)

    const nextButton = screen.getByLabelText('next')
    expect(nextButton).toBeDisabled()
  })
})
