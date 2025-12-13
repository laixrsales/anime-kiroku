/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import PageBase from './PageBase'

vi.mock('../Footer/Footer', () => ({
  __esModule: true,
  default: () => <footer data-testid="footer">Footer</footer>,
}))

vi.mock('../Header/Header', () => ({
  __esModule: true,
  default: ({ items, showLogo, showUserInfo }: any) => (
    <header data-testid="header">
      <div data-testid="header-items-count">{items.length} items</div>
      <div data-testid="header-show-logo">{showLogo.toString()}</div>
      <div data-testid="header-show-user-info">{showUserInfo?.toString()}</div>
    </header>
  ),
}))

const mockAuthContext = {
  isAuthenticated: false,
  user: null,
  login: vi.fn(),
  logout: vi.fn(),
}

vi.mock('../../contexts/AuthContext/AuthContext', () => ({
  AuthContext: {
    Consumer: ({ children }: any) => children(mockAuthContext),
    Provider: ({ children }: any) => children,
  },
}))

const mockUseContext = vi.fn()

describe('PageBase', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseContext.mockReturnValue(mockAuthContext)
  })

  it('should render page with header, main content and footer', () => {
    render(
      <PageBase>
        <div data-testid="child-content">Child Content</div>
      </PageBase>,
    )

    expect(screen.getByTestId('page-base')).toBeInTheDocument()
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('main-content')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
    expect(screen.getByTestId('child-content')).toBeInTheDocument()
  })

  it('should show loading spinner when isLoading is true', () => {
    render(
      <PageBase isLoading={true}>
        <div>Child Content</div>
      </PageBase>,
    )

    expect(screen.getByTestId('loading-overlay')).toBeInTheDocument()
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
    expect(screen.queryByTestId('page-base')).not.toBeInTheDocument()
  })

  it('should show custom loading component when provided', () => {
    const CustomLoading = () => (
      <div data-testid="custom-loading">Loading...</div>
    )

    render(
      <PageBase isLoading={true} loadingComponent={<CustomLoading />}>
        <div>Child Content</div>
      </PageBase>,
    )

    expect(screen.getByTestId('custom-loading')).toBeInTheDocument()
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  })

  it('should use landing header items when not authenticated', () => {
    mockAuthContext.isAuthenticated = false
    mockUseContext.mockReturnValue(mockAuthContext)

    render(<PageBase children={undefined} />)

    expect(screen.getByTestId('header-items-count')).toHaveTextContent(
      '2 items',
    )
  })

  it('should use custom header items when provided', () => {
    const customItems = [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ]

    render(<PageBase customHeaderItems={customItems} children={undefined} />)

    expect(screen.getByTestId('header-items-count')).toHaveTextContent(
      '3 items',
    )
  })

  it('should pass showLogo prop to Header', () => {
    render(<PageBase showHeaderLogo={false} children={undefined} />)

    expect(screen.getByTestId('header-show-logo')).toHaveTextContent('false')
  })

  it('should accept className prop', () => {
    const { container } = render(
      <PageBase className="custom-class" children={undefined} />,
    )

    expect(container.firstChild).toHaveClass('custom-class')
  })
})
