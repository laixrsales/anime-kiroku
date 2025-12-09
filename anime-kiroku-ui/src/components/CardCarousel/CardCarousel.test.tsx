import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { CardCarousel } from './CardCarousel'

vi.mock('../AnimeCard/AnimeCard', () => ({
  default: ({ id }: { id: number }) => (
    <div data-testid="anime-card">Card {id}</div>
  ),
}))

const mockCards = [
  { id: 1, image: 'a', title: 'A' },
  { id: 2, image: 'b', title: 'B' },
  { id: 3, image: 'c', title: 'C' },
  { id: 4, image: 'd', title: 'D' },
  { id: 5, image: 'e', title: 'E' },
]

describe('CardCarousel', () => {
  it('renders the correct number of cards per slide', () => {
    render(<CardCarousel cards={mockCards} slidesPerView={2} />)

    const cards = screen.getAllByTestId('anime-card')
    expect(cards.length).toBe(2)
    expect(cards[0]).toHaveTextContent('Card 1')
    expect(cards[1]).toHaveTextContent('Card 2')
  })

  it('disables previous button on first page', () => {
    render(<CardCarousel cards={mockCards} slidesPerView={2} />)

    const prevButton = screen.getByLabelText('previous')
    expect(prevButton).toBeDisabled()

    const nextButton = screen.getByLabelText('next')
    expect(nextButton).not.toBeDisabled()
  })

  it('goes to next page when clicking next', () => {
    render(<CardCarousel cards={mockCards} slidesPerView={2} />)

    const nextButton = screen.getByLabelText('next')
    fireEvent.click(nextButton)

    const cards = screen.getAllByTestId('anime-card')
    expect(cards.length).toBe(2)
    expect(cards[0]).toHaveTextContent('Card 3')
    expect(cards[1]).toHaveTextContent('Card 4')
  })

  it('goes to previous page when clicking previous', () => {
    render(<CardCarousel cards={mockCards} slidesPerView={2} />)

    const nextButton = screen.getByLabelText('next')
    fireEvent.click(nextButton)

    const prevButton = screen.getByLabelText('previous')
    fireEvent.click(prevButton)

    const cards = screen.getAllByTestId('anime-card')
    expect(cards[0]).toHaveTextContent('Card 1')
    expect(cards[1]).toHaveTextContent('Card 2')
  })

  it('disables next button on last page', () => {
    render(<CardCarousel cards={mockCards} slidesPerView={2} />)

    const nextButton = screen.getByLabelText('next')
    fireEvent.click(nextButton)
    fireEvent.click(nextButton)

    expect(nextButton).toBeDisabled()
  })

  it('shows remaining items on the last page (even if fewer)', () => {
    render(<CardCarousel cards={mockCards} slidesPerView={2} />)

    const nextButton = screen.getByLabelText('next')
    fireEvent.click(nextButton)
    fireEvent.click(nextButton)

    const cards = screen.getAllByTestId('anime-card')
    expect(cards.length).toBe(1)
    expect(cards[0]).toHaveTextContent('Card 5')
  })
})
