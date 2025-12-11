import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Banner from './Banner'

describe('Banner', () => {
  const mockProps = {
    imageUrl: 'https://example.com/banner.jpg',
    title: 'Banner Title',
    subtitle: 'Banner Subtitle',
  }

  it('should render banner with image and content', () => {
    render(<Banner {...mockProps} />)

    expect(screen.getByTestId('banner-container')).toBeInTheDocument()
    expect(screen.getByTestId('banner-title')).toHaveTextContent('Banner Title')
    expect(screen.getByTestId('banner-subtitle')).toHaveTextContent(
      'Banner Subtitle',
    )
  })

  it('should show overlay when hasOverlay is true', () => {
    render(<Banner {...mockProps} hasOverlay={true} />)

    expect(screen.getByTestId('banner-overlay')).toBeInTheDocument()
  })

  it('should show logo when showLogo is true and logoUrl is provided', () => {
    render(
      <Banner
        {...mockProps}
        showLogo={true}
        logoUrl="https://example.com/logo.png"
      />,
    )

    const logo = screen.getByAltText('Site logo')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', 'https://example.com/logo.png')
  })

  it('should call onClick when banner is clicked', () => {
    const mockOnClick = vi.fn()
    render(<Banner {...mockProps} onClick={mockOnClick} />)

    fireEvent.click(screen.getByTestId('banner-container'))
    expect(mockOnClick).toHaveBeenCalledOnce()
  })

  it('should have role button when onClick is provided', () => {
    const mockOnClick = vi.fn()
    render(<Banner {...mockProps} onClick={mockOnClick} />)

    expect(screen.getByTestId('banner-container')).toHaveAttribute(
      'role',
      'button',
    )
  })

  it('should have role banner when onClick is not provided', () => {
    render(<Banner {...mockProps} />)

    expect(screen.getByTestId('banner-container')).toHaveAttribute(
      'role',
      'banner',
    )
  })
})
