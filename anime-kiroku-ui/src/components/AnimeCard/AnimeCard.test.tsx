import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import AnimeCard from './AnimeCard'

const mockProps = {
  id: 123,
  image: 'https://example.com/anime.jpg',
  imageAlt: 'Naruto Shippuden',
  title: 'Naruto Shippuden',
  seasons: 2,
  episodes: 500,
  description: 'A história de Naruto Uzumaki, um jovem ninja...',
  showTitleBelow: true,
  size: 'md' as const,
}

describe('AnimeCard', () => {
  it('renders image and title correctly', () => {
    render(<AnimeCard {...mockProps} />)

    expect(screen.getByTestId('anime-card-image')).toHaveAttribute(
      'src',
      mockProps.image,
    )
    expect(screen.getByTestId('anime-card-image')).toHaveAttribute(
      'alt',
      mockProps.imageAlt,
    )
    expect(screen.getByTestId('anime-card-title-below')).toHaveTextContent(
      mockProps.title!,
    )
  })

  it('shows title below when showTitleBelow is true', () => {
    render(<AnimeCard {...mockProps} showTitleBelow={true} />)
    expect(screen.getByTestId('anime-card-title-below')).toBeInTheDocument()
  })

  it('hides title below when showTitleBelow is false', () => {
    render(<AnimeCard {...mockProps} showTitleBelow={false} />)
    expect(
      screen.queryByTestId('anime-card-title-below'),
    ).not.toBeInTheDocument()
  })

  it('displays seasons and episodes in overlay', () => {
    render(<AnimeCard {...mockProps} />)

    // Simular hover para mostrar overlay
    const card = screen.getByTestId('anime-card')
    fireEvent.mouseEnter(card)

    expect(screen.getByTestId('seasons-count')).toHaveTextContent(
      mockProps.seasons!.toString(),
    )
    expect(screen.getByTestId('episodes-count')).toHaveTextContent(
      mockProps.episodes!.toString(),
    )
  })

  it('calls onAdd when add button is clicked', () => {
    const mockOnAdd = vi.fn()
    render(<AnimeCard {...mockProps} onAdd={mockOnAdd} />)

    const card = screen.getByTestId('anime-card')
    fireEvent.mouseEnter(card)

    const addButton = screen.getByTestId('add-button')
    fireEvent.click(addButton)

    expect(mockOnAdd).toHaveBeenCalledWith(mockProps.id)
  })

  it('calls onReview when review button is clicked', () => {
    const mockOnReview = vi.fn()
    render(<AnimeCard {...mockProps} onReview={mockOnReview} />)

    const card = screen.getByTestId('anime-card')
    fireEvent.mouseEnter(card)

    const reviewButton = screen.getByTestId('review-button')
    fireEvent.click(reviewButton)

    expect(mockOnReview).toHaveBeenCalledWith(mockProps.id)
  })

  it('handles card click correctly', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    render(<AnimeCard {...mockProps} />)

    const card = screen.getByTestId('anime-card')
    fireEvent.click(card)

    expect(consoleSpy).toHaveBeenCalledWith(
      `Navigate to anime details: ${mockProps.id}`,
    )
    consoleSpy.mockRestore()
  })

  it('stops event propagation when action buttons are clicked', () => {
    const mockOnAdd = vi.fn()
    const consoleSpy = vi.spyOn(console, 'log')
    render(<AnimeCard {...mockProps} onAdd={mockOnAdd} />)

    const card = screen.getByTestId('anime-card')
    fireEvent.mouseEnter(card)

    const addButton = screen.getByTestId('add-button')
    fireEvent.click(addButton)

    // Verifica que onAdd foi chamado
    expect(mockOnAdd).toHaveBeenCalled()
    // Verifica que o clique no card não foi acionado (não há console.log adicional)
    expect(consoleSpy).not.toHaveBeenCalledWith(
      `Navigate to anime details: ${mockProps.id}`,
    )
    consoleSpy.mockRestore()
  })

  it('renders with different sizes', () => {
    const { container } = render(<AnimeCard {...mockProps} size="lg" />)
    const card = container.firstChild

    expect(card).toBeInTheDocument()
  })

  it('renders without optional props', () => {
    const minimalProps = {
      image: 'https://example.com/anime.jpg',
    }

    render(<AnimeCard {...minimalProps} />)

    expect(screen.getByTestId('anime-card')).toBeInTheDocument()
    expect(screen.getByTestId('anime-card-image')).toHaveAttribute(
      'src',
      minimalProps.image,
    )
  })
})
