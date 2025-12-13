import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from './Footer'

describe('Footer', () => {
  it('should render footer with logo and title', () => {
    render(<Footer />)

    expect(screen.getByTestId('footer-logo')).toBeInTheDocument()
  })

  it('should render description text', () => {
    render(<Footer />)

    expect(
      screen.getByText(/Anime Kiroku is an academic project/),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Created by Laís Sales and Henrique Resende/),
    ).toBeInTheDocument()
  })

  it('should render GitHub link', () => {
    render(<Footer />)

    const githubLink = screen.getByRole('link')
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/laixrsales/anime-kiroku',
    )
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should render copyright text', () => {
    render(<Footer />)

    expect(screen.getByText('© 2025 AnimeKiroku')).toBeInTheDocument()
  })
})
