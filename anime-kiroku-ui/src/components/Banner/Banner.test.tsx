import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import Banner from './Banner'

const mockProps = {
  imageUrl: 'https://example.com/banner-image.jpg',
  altText: 'Anime banner',
  title: 'SPY × FAMILY',
  subtitle: 'Dublado • Aventura Comédia Suspense',
  height: '500px',
  fadeIntensity: 0.7,
}

describe('Banner', () => {
  it('renders image with correct attributes', () => {
    render(<Banner {...mockProps} />)

    const image = screen.getByTestId('banner-image')
    expect(image).toHaveAttribute('src', mockProps.imageUrl)
    expect(image).toHaveAttribute('alt', mockProps.altText)
  })

  it('renders title and subtitle at bottom left', () => {
    render(<Banner {...mockProps} />)

    const title = screen.getByTestId('banner-title')
    const subtitle = screen.getByTestId('banner-subtitle')
    const content = screen.getByTestId('banner-content')

    expect(title).toHaveTextContent(mockProps.title!)
    expect(subtitle).toHaveTextContent(mockProps.subtitle!)
    expect(content).toBeInTheDocument()
    expect(content).toHaveStyle('bottom: 0')
    expect(content).toHaveStyle('left: 0')
  })

  it('does not render content when no title or subtitle', () => {
    render(<Banner imageUrl={mockProps.imageUrl} altText={mockProps.altText} />)

    expect(screen.queryByTestId('banner-content')).not.toBeInTheDocument()
  })

  it('handles click event when onClick is provided', () => {
    const mockOnClick = vi.fn()
    render(<Banner {...mockProps} onClick={mockOnClick} />)

    const container = screen.getByTestId('banner-container')
    fireEvent.click(container)

    expect(mockOnClick).toHaveBeenCalled()
  })

  it('has cursor pointer when clickable', () => {
    const mockOnClick = vi.fn()
    render(<Banner {...mockProps} onClick={mockOnClick} />)

    const container = screen.getByTestId('banner-container')
    expect(container).toHaveStyle('cursor: pointer')
  })

  it('renders with custom height', () => {
    render(<Banner {...mockProps} height="70vh" />)

    const container = screen.getByTestId('banner-container')
    expect(container).toHaveStyle('height: 70vh')
  })

  it('renders with numeric height', () => {
    render(<Banner {...mockProps} height={600} />)

    const container = screen.getByTestId('banner-container')
    expect(container).toHaveStyle('height: 600px')
  })

  it('renders overlay when hasOverlay is true', () => {
    render(
      <Banner
        {...mockProps}
        hasOverlay={true}
        overlayColor="#000000"
        overlayOpacity={0.5}
      />,
    )

    expect(screen.getByTestId('banner-overlay')).toBeInTheDocument()
  })

  it('does not render overlay when hasOverlay is false', () => {
    render(<Banner {...mockProps} hasOverlay={false} />)

    const overlay = screen.getByTestId('banner-overlay')
    expect(overlay).toBeInTheDocument() // O componente ainda renderiza, mas transparente
    expect(overlay).toHaveStyle('background: transparent')
  })

  it('applies custom className', () => {
    const customClass = 'custom-banner-class'
    const { container } = render(
      <Banner {...mockProps} className={customClass} />,
    )

    const banner = container.querySelector(`.${customClass}`)
    expect(banner).toBeInTheDocument()
  })

  it('has proper ARIA attributes when clickable', () => {
    const mockOnClick = vi.fn()
    render(<Banner {...mockProps} onClick={mockOnClick} />)

    const container = screen.getByTestId('banner-container')
    expect(container).toHaveAttribute('role', 'button')
    expect(container).toHaveAttribute('tabindex', '0')
  })

  it('has proper ARIA attributes when not clickable', () => {
    render(<Banner {...mockProps} />)

    const container = screen.getByTestId('banner-container')
    expect(container).toHaveAttribute('role', 'banner')
    expect(container).not.toHaveAttribute('tabindex')
  })

  it('renders subtitle without title', () => {
    render(
      <Banner imageUrl={mockProps.imageUrl} subtitle={mockProps.subtitle} />,
    )

    expect(screen.getByText(mockProps.subtitle!)).toBeInTheDocument()
    expect(screen.queryByTestId('banner-title')).not.toBeInTheDocument()
  })

  it('renders title without subtitle', () => {
    render(<Banner imageUrl={mockProps.imageUrl} title={mockProps.title} />)

    expect(screen.getByText(mockProps.title!)).toBeInTheDocument()
    expect(screen.queryByTestId('banner-subtitle')).not.toBeInTheDocument()
  })
})
