import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SimplePage from './SimplePage'

const mockGoBack = vi.fn()
vi.mock('../../hooks/useNavigation', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
}))

vi.mock('react-icons/fi', () => ({
  FiArrowLeft: () => <span data-testid="back-icon">←</span>,
}))

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('SimplePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render page with title and logo', () => {
    renderWithRouter(
      <SimplePage
        title="Welcome Back"
        buttonTitle="Continue"
        onClick={() => {}}
      >
        <div>Child content</div>
      </SimplePage>,
    )

    expect(screen.getByText('Welcome Back')).toBeInTheDocument()
    expect(screen.getByAltText('AnimeKiroku logo')).toBeInTheDocument()
  })

  it('should render description when provided', () => {
    renderWithRouter(
      <SimplePage
        title="Sign In"
        description="Please enter your credentials"
        buttonTitle="Sign In"
        onClick={() => {}}
      >
        <div>Form fields</div>
      </SimplePage>,
    )

    expect(
      screen.getByText('Please enter your credentials'),
    ).toBeInTheDocument()
  })

  it('should render children content', () => {
    renderWithRouter(
      <SimplePage title="Test Page" buttonTitle="Submit" onClick={() => {}}>
        <input data-testid="test-input" placeholder="Enter text" />
        <button data-testid="test-button">Extra Button</button>
      </SimplePage>,
    )

    expect(screen.getByTestId('test-input')).toBeInTheDocument()
    expect(screen.getByTestId('test-button')).toBeInTheDocument()
  })

  it('should render main action button', () => {
    const mockOnClick = vi.fn()

    renderWithRouter(
      <SimplePage
        title="Test Page"
        buttonTitle="Click Me"
        onClick={mockOnClick}
      >
        <div>Content</div>
      </SimplePage>,
    )

    const button = screen.getByText('Click Me')
    expect(button).toBeInTheDocument()

    fireEvent.click(button)
    expect(mockOnClick).toHaveBeenCalledOnce()
  })

  it('should render back button', () => {
    renderWithRouter(
      <SimplePage title="Test Page" buttonTitle="Continue" onClick={() => {}}>
        <div>Content</div>
      </SimplePage>,
    )

    const backButton = screen.getByLabelText('Voltar')
    expect(backButton).toBeInTheDocument()
    expect(screen.getByTestId('back-icon')).toBeInTheDocument()
  })

  it('should call goBack when back button is clicked', () => {
    renderWithRouter(
      <SimplePage title="Test Page" buttonTitle="Continue" onClick={() => {}}>
        <div>Content</div>
      </SimplePage>,
    )

    const backButton = screen.getByLabelText('Voltar')
    fireEvent.click(backButton)

    expect(mockGoBack).toHaveBeenCalledOnce()
  })

  it('should have link to landing page on logo', () => {
    renderWithRouter(
      <SimplePage title="Test Page" buttonTitle="Continue" onClick={() => {}}>
        <div>Content</div>
      </SimplePage>,
    )

    const logoLink = screen.getByAltText('AnimeKiroku logo').closest('a')
    expect(logoLink).toHaveAttribute('href', '/')
  })
})
