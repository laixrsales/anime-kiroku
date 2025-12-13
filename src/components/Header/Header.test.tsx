import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Header from './Header'

vi.mock('../../hooks/useNavigation', () => ({
  useNavigation: () => ({
    goTo: vi.fn(),
  }),
}))

vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    logout: vi.fn(),
  }),
}))

vi.mock('@chakra-ui/react', async () => {
  const actual = await vi.importActual('@chakra-ui/react')
  return {
    ...actual,
    useToast: () => vi.fn(),
  }
})

vi.mock('react-icons/fi', () => ({
  FiChevronDown: () => 'FiChevronDown',
  FiSearch: () => 'FiSearch',
  FiLogOut: () => 'FiLogOut',
}))

describe('Header', () => {
  const mockItems = [
    { label: 'Home', href: '/' },
    {
      label: 'Anime',
      href: '#',
      children: [
        { label: 'Top Anime', href: '/top-anime' },
        { label: 'Seasonal', href: '/seasonal' },
      ],
    },
    { label: 'Reviews', href: '/reviews' },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render header with logo and navigation items', () => {
    render(<Header items={mockItems} />)

    expect(screen.getByText('AnimeKiroku')).toBeInTheDocument()
    expect(screen.getByAltText('AnimeKiroku Logo')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Anime')).toBeInTheDocument()
    expect(screen.getByText('Reviews')).toBeInTheDocument()
  })

  it('should show dropdown for items with children', () => {
    render(<Header items={mockItems} />)

    const animeDropdown = screen.getByText('Anime')
    expect(animeDropdown).toBeInTheDocument()
  })

  it('should render search button', () => {
    render(<Header items={mockItems} />)

    const searchButton = screen.getByLabelText('Pesquisar')
    expect(searchButton).toBeInTheDocument()
  })

  it('should not show logout button when showUserInfo is false', () => {
    render(<Header items={mockItems} showUserInfo={false} />)

    expect(screen.queryByLabelText('Sair')).toBeNull()
  })

  it('should show logout button when showUserInfo is true', () => {
    render(<Header items={mockItems} showUserInfo={true} />)

    const logoutButton = screen.getByLabelText('Sair')
    expect(logoutButton).toBeInTheDocument()
  })

  it('should hide logo when showLogo is false', () => {
    render(<Header items={mockItems} showLogo={false} />)

    expect(screen.queryByAltText('AnimeKiroku Logo')).toBeNull()
    expect(screen.queryByText('AnimeKiroku')).toBeNull()
  })
})
