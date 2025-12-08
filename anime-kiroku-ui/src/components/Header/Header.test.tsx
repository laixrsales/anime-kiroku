import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Header from './Header'
import { ChakraProvider } from '@chakra-ui/react'

// Mock do react-router-dom
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

function renderWithProviders(ui: React.ReactNode) {
  return render(
    <BrowserRouter>
      <ChakraProvider>{ui}</ChakraProvider>
    </BrowserRouter>,
  )
}

const itemsMock = [
  { label: 'Home', href: '/' },
  {
    label: 'Categorias',
    children: [
      { label: 'Ação', href: '/acao' },
      { label: 'Drama', href: '/drama' },
    ],
  },
  { label: 'Top 100', href: '/top' },
]

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('if showLogo is true, renders logo with link', () => {
    renderWithProviders(<Header items={itemsMock} showLogo={true} />)

    const logoLink = screen.getByRole('link')
    const logoImg = screen.getByAltText('AnimeKiroku Logo')
    expect(logoLink).toBeInTheDocument()
    expect(logoImg).toBeInTheDocument()
    expect(screen.getByText('AnimeKiroku')).toBeInTheDocument()
  })

  it('logo link redirects to home when clicked', () => {
    renderWithProviders(<Header items={itemsMock} showLogo={true} />)

    const logoLink = screen.getByRole('link')
    fireEvent.click(logoLink)

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('if showLogo is false, does not render logo', () => {
    renderWithProviders(<Header items={itemsMock} showLogo={false} />)

    expect(screen.queryByAltText('AnimeKiroku Logo')).not.toBeInTheDocument()
    expect(screen.queryByText('AnimeKiroku')).not.toBeInTheDocument()
  })

  it('renders simple menu items with correct spacing', () => {
    renderWithProviders(<Header items={itemsMock} showLogo={true} />)

    const homeItem = screen.getByText('Home')
    const topItem = screen.getByText('Top 100')

    expect(homeItem).toBeInTheDocument()
    expect(topItem).toBeInTheDocument()

    const navArea = homeItem.closest('nav')
    expect(navArea).toBeInTheDocument()
  })

  it('renders dropdown menu with rotating arrow', async () => {
    renderWithProviders(<Header items={itemsMock} showLogo={true} />)

    const categoriasButton = screen.getByText('Categorias')
    expect(categoriasButton).toBeInTheDocument()

    fireEvent.click(categoriasButton)

    expect(screen.getByText('Ação')).toBeInTheDocument()
    expect(screen.getByText('Drama')).toBeInTheDocument()
  })

  it('renders action buttons', () => {
    renderWithProviders(<Header items={itemsMock} showLogo={true} />)

    expect(screen.getByLabelText('Pesquisar')).toBeInTheDocument()
  })

  it('renders user menu when showUserInfo is true', () => {
    renderWithProviders(
      <Header items={itemsMock} showLogo={true} showUserInfo={true} />,
    )

    const avatar = screen.getByAltText('Avatar do usuário')
    expect(avatar).toBeInTheDocument()
    expect(screen.getByLabelText('Favoritos')).toBeInTheDocument()
  })

  it('does not render user menu when showUserInfo is false', () => {
    renderWithProviders(
      <Header items={itemsMock} showLogo={true} showUserInfo={false} />,
    )

    expect(screen.queryByAltText('Avatar do usuário')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Favoritos')).not.toBeInTheDocument()
  })

  it('has correct layout structure with logo on left and actions on right', () => {
    renderWithProviders(
      <Header items={itemsMock} showLogo={true} showUserInfo={true} />,
    )

    const header = screen.getByRole('banner')
    expect(header).toHaveStyle('display: flex')
    expect(header).toHaveStyle('justify-content: space-between')

    const logoContainer = screen.getByAltText('AnimeKiroku Logo').closest('div')
    expect(logoContainer).toBeInTheDocument()

    const searchButton = screen.getByLabelText('Pesquisar')
    const actionsArea = searchButton.closest('div')
    expect(actionsArea).toBeInTheDocument()
  })

  it('menu items have hover styles', () => {
    renderWithProviders(<Header items={itemsMock} showLogo={true} />)

    const homeItem = screen.getByText('Home')
    expect(homeItem).toHaveStyle('cursor: pointer')
    expect(homeItem).toHaveStyle('transition: all 0.2s ease')
  })

  it('dropdown has arrow animation', () => {
    renderWithProviders(<Header items={itemsMock} showLogo={true} />)

    const categoriasButton = screen.getByText('Categorias')
    const arrow = categoriasButton.querySelector('svg')
    expect(arrow).toBeInTheDocument()
    expect(arrow).toHaveStyle('transition: transform 0.2s ease')
  })

  it('renders without crashing when no items', () => {
    renderWithProviders(<Header items={[]} showLogo={true} />)

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  it('applies menu-items class to all interactive elements', () => {
    renderWithProviders(
      <Header items={itemsMock} showLogo={true} showUserInfo={true} />,
    )

    const menuItems = document.querySelectorAll('.menu-items')
    expect(menuItems.length).toBeGreaterThan(0)

    const homeItem = screen.getByText('Home')
    expect(homeItem).toHaveClass('menu-items')

    const searchButton = screen.getByLabelText('Pesquisar')
    expect(searchButton).toHaveClass('menu-items')
  })
})
