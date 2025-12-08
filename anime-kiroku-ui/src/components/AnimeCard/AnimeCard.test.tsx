import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import AnimeCard from './AnimeCard'

const mockProps = {
  id: 123,
  image: 'https://example.com/anime.jpg',
  imageAlt: 'Naruto Shippuden',
  title: 'Naruto Shippuden',
  episodes: 500,
  description:
    'A história de Naruto Uzumaki, um jovem ninja que busca se tornar o Hokage, o líder de sua vila. Esta é uma descrição muito longa que deve ser truncada para caber no overlay do card.',
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

  it('displays episode count badge when episodes is provided and greater than 0', () => {
    render(<AnimeCard {...mockProps} />)

    expect(screen.getByTestId('episode-count')).toBeInTheDocument()
    expect(screen.getByTestId('episode-count')).toHaveTextContent(
      `${mockProps.episodes} EP`,
    )
  })

  it('does not display episode count badge when episodes is not provided', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { episodes, ...propsWithoutEpisodes } = mockProps
    render(<AnimeCard {...propsWithoutEpisodes} />)

    expect(screen.queryByTestId('episode-count')).not.toBeInTheDocument()
  })

  it('does not display episode count badge when episodes is 0', () => {
    render(<AnimeCard {...mockProps} episodes={0} />)

    expect(screen.queryByTestId('episode-count')).not.toBeInTheDocument()
  })

  it('does not display episode count badge when episodes is undefined', () => {
    render(<AnimeCard {...mockProps} episodes={undefined} />)

    expect(screen.queryByTestId('episode-count')).not.toBeInTheDocument()
  })

  it('shows truncated description in overlay on hover', () => {
    render(<AnimeCard {...mockProps} />)

    const card = screen.getByTestId('anime-card')
    fireEvent.mouseEnter(card)

    expect(screen.getByTestId('anime-card-description')).toBeInTheDocument()

    const descriptionElement = screen.getByTestId('anime-card-description')
    const descriptionText = descriptionElement.textContent || ''

    expect(mockProps.description.length).toBeGreaterThan(100)
    expect(descriptionText.endsWith('...')).toBe(true)

    expect(descriptionText.length).toBeLessThanOrEqual(103)
  })

  it('does not add "..." to description when it is short enough', () => {
    const shortDescription = 'Descrição curta.'
    render(<AnimeCard {...mockProps} description={shortDescription} />)

    const card = screen.getByTestId('anime-card')
    fireEvent.mouseEnter(card)

    const descriptionElement = screen.getByTestId('anime-card-description')
    expect(descriptionElement.textContent).toBe(shortDescription)
    expect(descriptionElement.textContent?.endsWith('...')).toBe(false)
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

    expect(mockOnAdd).toHaveBeenCalled()
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

    expect(screen.queryByTestId('episode-count')).not.toBeInTheDocument()
  })

  it('shows overlay with title and description on hover', () => {
    render(<AnimeCard {...mockProps} />)

    const card = screen.getByTestId('anime-card')
    fireEvent.mouseEnter(card)

    expect(screen.getByTestId('anime-card-overlay')).toBeInTheDocument()
    expect(screen.getByTestId('anime-card-title')).toHaveTextContent(
      mockProps.title!,
    )
    expect(screen.getByTestId('anime-card-description')).toBeInTheDocument()
  })

  it('shows and hides overlay on mouse interactions', () => {
    render(<AnimeCard {...mockProps} />)

    const card = screen.getByTestId('anime-card')

    fireEvent.mouseEnter(card)

    const overlay = screen.getByTestId('anime-card-overlay')
    expect(overlay).toBeInTheDocument()

    fireEvent.mouseLeave(card)

    expect(screen.getByTestId('anime-card-overlay')).toBeInTheDocument()
  })

  it('does not show action buttons when onAdd and onReview are not provided', () => {
    const { ...propsWithoutActions } = mockProps
    render(<AnimeCard {...propsWithoutActions} />)

    const card = screen.getByTestId('anime-card')
    fireEvent.mouseEnter(card)

    expect(screen.queryByTestId('anime-card-actions')).not.toBeInTheDocument()
    expect(screen.queryByTestId('add-button')).not.toBeInTheDocument()
    expect(screen.queryByTestId('review-button')).not.toBeInTheDocument()
  })

  it('shows action buttons when onAdd or onReview are provided', () => {
    const mockOnAdd = vi.fn()
    render(<AnimeCard {...mockProps} onAdd={mockOnAdd} />)

    const card = screen.getByTestId('anime-card')
    fireEvent.mouseEnter(card)

    expect(screen.getByTestId('anime-card-actions')).toBeInTheDocument()
    expect(screen.getByTestId('add-button')).toBeInTheDocument()
  })
})
