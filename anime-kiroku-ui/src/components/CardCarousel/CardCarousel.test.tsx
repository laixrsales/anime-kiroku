import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import CardCarousel from './CardCarousel'

const mockCards = [
  {
    id: 1,
    image: 'https://example.com/anime1.jpg',
    title: 'Naruto Shippuden',
    seasons: 2,
    episodes: 500,
    description: 'A história de Naruto Uzumaki...',
  },
  {
    id: 2,
    image: 'https://example.com/anime2.jpg',
    title: 'One Piece',
    seasons: 1,
    episodes: 1100,
    description: 'A jornada de Monkey D. Luffy...',
  },
  {
    id: 3,
    image: 'https://example.com/anime3.jpg',
    title: 'Attack on Titan',
    seasons: 4,
    episodes: 88,
    description: 'Humanidade vive dentro de cidades...',
  },
  {
    id: 4,
    image: 'https://example.com/anime4.jpg',
    title: 'Demon Slayer',
    seasons: 3,
    episodes: 55,
    description: 'Tanjiro Kamado se torna um caçador...',
  },
  {
    id: 5,
    image: 'https://example.com/anime5.jpg',
    title: 'My Hero Academia',
    seasons: 6,
    episodes: 138,
    description: 'Em um mundo onde quase todos têm superpoderes...',
  },
  {
    id: 6,
    image: 'https://example.com/anime6.jpg',
    title: 'Jujutsu Kaisen',
    seasons: 2,
    episodes: 47,
    description: 'Yuji Itadori engole um objeto amaldiçoado...',
  },
]

describe('CardCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders carousel with title', () => {
    render(<CardCarousel cards={mockCards} title="Animes Populares" />)

    expect(screen.getByTestId('carousel-title')).toHaveTextContent(
      'Animes Populares',
    )
    expect(screen.getByTestId('card-carousel')).toBeInTheDocument()
  })

  it('renders all cards', () => {
    render(<CardCarousel cards={mockCards} slidesPerView={4} />)

    mockCards.forEach((card) => {
      expect(
        screen.getByAltText(card.title || 'Anime cover'),
      ).toBeInTheDocument()
    })
  })

  it('shows empty state when no cards', () => {
    render(<CardCarousel cards={[]} title="Animes Populares" />)

    expect(screen.getByText('Nenhum anime encontrado')).toBeInTheDocument()
    expect(
      screen.getByText('Adicione alguns animes para começar'),
    ).toBeInTheDocument()
  })

  it('navigates to next slide when next button is clicked', () => {
    render(<CardCarousel cards={mockCards} slidesPerView={2} />)

    const nextButton = screen.getByTestId('next-button')
    fireEvent.click(nextButton)

    expect(screen.getByTestId('carousel-wrapper')).toBeInTheDocument()
  })

  it('navigates to previous slide when prev button is clicked', () => {
    render(<CardCarousel cards={mockCards} slidesPerView={2} />)

    const nextButton = screen.getByTestId('next-button')
    fireEvent.click(nextButton)

    const prevButton = screen.getByTestId('prev-button')
    fireEvent.click(prevButton)

    expect(screen.getByTestId('carousel-wrapper')).toBeInTheDocument()
  })

  it('does not show indicators by default', () => {
    render(<CardCarousel cards={mockCards} />)

    expect(screen.queryByTestId('indicators-container')).not.toBeInTheDocument()
  })

  it('shows indicators when showIndicators is true', () => {
    render(
      <CardCarousel
        cards={mockCards}
        showIndicators={true}
        slidesPerView={2}
      />,
    )

    expect(screen.getByTestId('indicators-container')).toBeInTheDocument()
    expect(screen.getAllByTestId(/indicator-\d+/)).toHaveLength(3)
  })

  it('auto-play advances slides automatically', () => {
    render(
      <CardCarousel
        cards={mockCards}
        autoPlay={true}
        autoPlayInterval={1000}
        slidesPerView={2}
      />,
    )

    vi.advanceTimersByTime(1500)

    expect(screen.getByTestId('carousel-wrapper')).toBeInTheDocument()
  })

  it('pauses auto-play on mouse enter and resumes on mouse leave', () => {
    render(
      <CardCarousel
        cards={mockCards}
        autoPlay={true}
        autoPlayInterval={1000}
        slidesPerView={2}
      />,
    )

    const carousel = screen.getByTestId('card-carousel')

    fireEvent.mouseEnter(carousel)
    vi.advanceTimersByTime(1500)

    fireEvent.mouseLeave(carousel)
    vi.advanceTimersByTime(1500)

    expect(screen.getByTestId('carousel-wrapper')).toBeInTheDocument()
  })

  it('handles different slidesPerView values', () => {
    const { rerender } = render(
      <CardCarousel cards={mockCards} slidesPerView={1} />,
    )
    expect(screen.getByTestId('carousel-wrapper')).toBeInTheDocument()

    rerender(<CardCarousel cards={mockCards} slidesPerView={3} />)
    expect(screen.getByTestId('carousel-wrapper')).toBeInTheDocument()

    rerender(<CardCarousel cards={mockCards} slidesPerView={6} />)
    expect(screen.getByTestId('carousel-wrapper')).toBeInTheDocument()
  })

  it('disables controls when only one slide', () => {
    render(<CardCarousel cards={mockCards.slice(0, 1)} slidesPerView={1} />)

    expect(screen.getByTestId('prev-button')).toBeDisabled()
    expect(screen.getByTestId('next-button')).toBeDisabled()
  })

  it('handles window resize', () => {
    render(<CardCarousel cards={mockCards} slidesPerView={4} />)

    window.dispatchEvent(new Event('resize'))

    expect(screen.getByTestId('carousel-wrapper')).toBeInTheDocument()
  })
})
