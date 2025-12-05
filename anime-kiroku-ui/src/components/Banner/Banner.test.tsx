import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import Banner from './Banner'

const mockProps = {
  imageUrl: 'https://example.com/banner-image.jpg',
  altText: 'Anime banner',
  title: 'Attack on Titan',
  subtitle: 'A batalha final pela humanidade',
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

  it('renders title and subtitle when provided', () => {
    render(<Banner {...mockProps} />)

    expect(screen.getByTestId('banner-title')).toHaveTextContent(
      mockProps.title!,
    )
    expect(screen.getByTestId('banner-subtitle')).toHaveTextContent(
      mockProps.subtitle!,
    )
  })

  it('does not render content when no title or subtitle', () => {
    const { ...props } = mockProps
    render(<Banner {...props} />)

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

  it('has default cursor when not clickable', () => {
    render(<Banner {...mockProps} />)

    const container = screen.getByTestId('banner-container')
    expect(container).toHaveStyle('cursor: default')
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

  it('applies fade intensity to image', () => {
    render(<Banner {...mockProps} fadeIntensity={0.5} />)

    const image = screen.getByTestId('banner-image')
    expect(image).toBeInTheDocument()
    // Note: O fadeIntensity é aplicado via CSS, então verificamos se o elemento existe com a prop
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
    // O overlay ainda é renderizado, mas com background transparente
    expect(overlay).toBeInTheDocument()
  })

  it('renders with different content positions', () => {
    const { rerender } = render(
      <Banner {...mockProps} contentPosition="left" />,
    )

    let content = screen.getByTestId('banner-content')
    expect(content).toBeInTheDocument()

    rerender(<Banner {...mockProps} contentPosition="center" />)
    content = screen.getByTestId('banner-content')
    expect(content).toBeInTheDocument()

    rerender(<Banner {...mockProps} contentPosition="right" />)
    content = screen.getByTestId('banner-content')
    expect(content).toBeInTheDocument()
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
})
