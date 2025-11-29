import { render, screen } from '@testing-library/react'
import Footer from './Footer'
import { ChakraProvider } from '@chakra-ui/react'

function renderWithChakra(ui: React.ReactNode) {
  return render(<ChakraProvider>{ui}</ChakraProvider>)
}

describe('Footer', () => {
  it('renders logo and title', () => {
    renderWithChakra(<Footer />)
    expect(screen.getByText('AnimeKiroku')).toBeInTheDocument()

    const logo = screen.getByRole('img')
    expect(logo).toBeInTheDocument()
  })

  it('renders description', () => {
    renderWithChakra(<Footer />)

    expect(screen.getByText(/academic project/i)).toBeInTheDocument()

    expect(
      screen.getByText(/Created by Laís Sales and Henrique Resende./i),
    ).toBeInTheDocument()
  })

  it('renders github icon', () => {
    renderWithChakra(<Footer />)

    const githubLink = screen.getByRole('link')
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('target', '_blank')
  })

  it('renders year', () => {
    renderWithChakra(<Footer />)
    expect(screen.getByText(/2025 AnimeKiroku/i)).toBeInTheDocument()
  })
})
