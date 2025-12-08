import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Header from './Header'
import { ChakraProvider } from '@chakra-ui/react'
import React, { type ReactNode } from 'react'
import { AuthContext } from '../../contexts/AuthContext/AuthContext'
import type {
  AuthContextType,
  User,
} from '../../contexts/AuthContext/AuthContext.types'

const mockNavigate = vi.fn()
const mockLogout = vi.fn()
const mockToast = vi.fn()

vi.mock('../../hooks/useNavigation', () => ({
  useNavigation: () => ({ goTo: mockNavigate }),
}))

vi.mock('@chakra-ui/react', async () => {
  const actual = await vi.importActual('@chakra-ui/react')
  return {
    ...actual,
    useToast: () => mockToast,
  }
})

beforeAll(() => {
  Element.prototype.scrollTo = vi.fn()
})

const mockUser: User = {
  id: '123',
  name: 'Test User',
  email: 'test@example.com',
  username: 'testuser',
  createdAt: new Date(),
}

const mockAuthContextValue: AuthContextType = {
  user: mockUser,
  isAuthenticated: true,
  isLoading: false,
  login: vi.fn(),
  logout: mockLogout,
  register: vi.fn(),
  resetPassword: vi.fn(),
}

const AuthProviderWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContext.Provider value={mockAuthContextValue}>
      {children}
    </AuthContext.Provider>
  )
}

function renderWithProviders(ui: React.ReactNode) {
  return render(
    <BrowserRouter>
      <ChakraProvider>
        <AuthProviderWrapper>{ui}</AuthProviderWrapper>
      </ChakraProvider>
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

  it('renders logo when showLogo is true', () => {
    renderWithProviders(<Header items={itemsMock} showLogo={true} />)

    const logoImg = screen.getByAltText('AnimeKiroku Logo')
    expect(logoImg).toBeInTheDocument()

    const logoText = screen.getByText('AnimeKiroku')
    expect(logoText).toBeInTheDocument()
  })

  it('does not render logo when showLogo is false', () => {
    renderWithProviders(<Header items={itemsMock} showLogo={false} />)

    expect(screen.queryByAltText('AnimeKiroku Logo')).not.toBeInTheDocument()
    expect(screen.queryByText('AnimeKiroku')).not.toBeInTheDocument()
  })

  it('renders all navigation items', () => {
    renderWithProviders(<Header items={itemsMock} showLogo={true} />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Categorias')).toBeInTheDocument()
    expect(screen.getByText('Top 100')).toBeInTheDocument()
  })

  it('renders search button', () => {
    renderWithProviders(<Header items={itemsMock} showLogo={true} />)

    expect(screen.getByLabelText('Pesquisar')).toBeInTheDocument()
  })

  it('search button navigates to search page', () => {
    renderWithProviders(<Header items={itemsMock} showLogo={true} />)

    const searchButton = screen.getByLabelText('Pesquisar')
    fireEvent.click(searchButton)

    expect(mockNavigate).toHaveBeenCalled()
  })

  it('renders user menu when showUserInfo is true', () => {
    renderWithProviders(
      <Header items={itemsMock} showLogo={true} showUserInfo={true} />,
    )

    expect(screen.getByLabelText('Menu do usuário')).toBeInTheDocument()
    expect(screen.getByLabelText('Favoritos')).toBeInTheDocument()
  })

  it('does not render user menu when showUserInfo is false', () => {
    renderWithProviders(
      <Header items={itemsMock} showLogo={true} showUserInfo={false} />,
    )

    expect(screen.queryByLabelText('Menu do usuário')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Favoritos')).not.toBeInTheDocument()
  })

  it('user menu dropdown opens and shows options', () => {
    renderWithProviders(
      <Header items={itemsMock} showLogo={true} showUserInfo={true} />,
    )

    const userButton = screen.getByLabelText('Menu do usuário')
    fireEvent.click(userButton)

    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Log out')).toBeInTheDocument()
  })

  it('logout menu item works correctly', () => {
    renderWithProviders(
      <Header items={itemsMock} showLogo={true} showUserInfo={true} />,
    )

    const userButton = screen.getByLabelText('Menu do usuário')
    fireEvent.click(userButton)

    const logoutButton = screen.getByText('Log out')
    fireEvent.click(logoutButton)

    expect(mockLogout).toHaveBeenCalledTimes(1)

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Logged out successfully',
      description: 'You have been logged out of your account',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    })

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('renders without items', () => {
    expect(() => {
      renderWithProviders(<Header items={[]} showLogo={true} />)
    }).not.toThrow()
  })
})
