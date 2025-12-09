import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import PageBase from './PageBase'
import type { HeaderItem, HeaderProps } from '../Header/Header.types'

let mockAuthState = { isAuthenticated: false, user: null }

vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(actual as any),
    useContext: () => mockAuthState,
  }
})

vi.mock('../Header/Header', () => ({
  default: ({ items, showLogo, showUserInfo }: HeaderProps) => (
    <div data-testid="header-mock">
      <div data-testid="header-items-count">{items.length}</div>
      <div data-testid="show-logo">{showLogo?.toString()}</div>
      <div data-testid="show-user-info">{showUserInfo?.toString()}</div>
      <div data-testid="header-items">
        {JSON.stringify(items.map((i: HeaderItem) => i.label))}
      </div>
    </div>
  ),
}))

vi.mock('../Footer/Footer', () => ({
  default: () => <div data-testid="footer-mock">Footer</div>,
}))

vi.mock('../AuthContext/AuthContext', () => ({
  AuthContext: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Consumer: ({ children }: any) =>
      children({ isAuthenticated: false, user: null }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Provider: ({ children }: any) => <>{children}</>,
  },
}))

describe('PageBase', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAuthState = { isAuthenticated: false, user: null }
  })

  it('renders landing menu when user is not authenticated', () => {
    mockAuthState = { isAuthenticated: false, user: null }

    render(
      <PageBase>
        <div>Test Content</div>
      </PageBase>,
    )

    expect(screen.getByTestId('page-base')).toBeInTheDocument()
    expect(screen.getByTestId('header-mock')).toBeInTheDocument()
    expect(screen.getByTestId('footer-mock')).toBeInTheDocument()

    expect(screen.getByTestId('header-items-count')).toHaveTextContent('4')

    const items = JSON.parse(
      screen.getByTestId('header-items').textContent || '[]',
    )
    expect(items).toEqual(['Animes', 'Lists', 'Sign in', 'Sign up'])

    expect(screen.getByTestId('show-user-info')).toHaveTextContent('false')
  })

  it('hides user info when authenticated but showUserInfo is false', () => {
    mockAuthState = { isAuthenticated: false, user: null }

    render(
      <PageBase showUserInfo={false}>
        <div>Test Content</div>
      </PageBase>,
    )

    expect(screen.getByTestId('show-user-info')).toHaveTextContent('false')
  })

  it('hides user info when not authenticated even if showUserInfo is true', () => {
    mockAuthState = { isAuthenticated: false, user: null }
    render(
      <PageBase showUserInfo={true}>
        <div>Test Content</div>
      </PageBase>,
    )

    expect(screen.getByTestId('show-user-info')).toHaveTextContent('false')
  })

  it('uses custom header items when provided', () => {
    const customItems: HeaderItem[] = [
      { label: 'Custom 1', href: '/custom1' },
      { label: 'Custom 2', href: '/custom2' },
    ]

    render(
      <PageBase customHeaderItems={customItems}>
        <div>Test Content</div>
      </PageBase>,
    )

    expect(screen.getByTestId('header-items-count')).toHaveTextContent('2')

    const items = JSON.parse(
      screen.getByTestId('header-items').textContent || '[]',
    )
    expect(items).toContain('Custom 1')
    expect(items).toContain('Custom 2')
  })

  it('hides logo when showHeaderLogo is false', () => {
    render(
      <PageBase showHeaderLogo={false}>
        <div>Test Content</div>
      </PageBase>,
    )

    expect(screen.getByTestId('show-logo')).toHaveTextContent('false')
  })

  it('renders children content correctly', () => {
    render(
      <PageBase>
        <div data-testid="custom-child">Custom Child Content</div>
      </PageBase>,
    )

    expect(screen.getByTestId('custom-child')).toHaveTextContent(
      'Custom Child Content',
    )
    expect(screen.getByTestId('main-content')).toBeInTheDocument()
  })

  it('shows loading overlay when isLoading is true', () => {
    render(
      <PageBase isLoading={true}>
        <div>Test Content</div>
      </PageBase>,
    )

    expect(screen.getByTestId('loading-overlay')).toBeInTheDocument()
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('uses custom loading component when provided', () => {
    const CustomLoader = () => <div data-testid="custom-loader">Loading...</div>

    render(
      <PageBase isLoading={true} loadingComponent={<CustomLoader />}>
        <div>Test Content</div>
      </PageBase>,
    )

    expect(screen.getByTestId('custom-loader')).toBeInTheDocument()
    expect(screen.getByTestId('custom-loader')).toHaveTextContent('Loading...')
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    const customClass = 'custom-page-class'
    const { container } = render(
      <PageBase className={customClass}>
        <div>Test Content</div>
      </PageBase>,
    )

    const page = container.querySelector(`.${customClass}`)
    expect(page).toBeInTheDocument()
  })

  it('handles empty custom header items', () => {
    render(
      <PageBase customHeaderItems={[]}>
        <div>Test Content</div>
      </PageBase>,
    )

    expect(screen.getByTestId('header-items-count')).toHaveTextContent('0')
  })

  it('handles loading state from auth context', () => {
    mockAuthState = { isAuthenticated: false, user: null }

    render(
      <PageBase>
        <div>Test Content</div>
      </PageBase>,
    )

    expect(screen.queryByTestId('loading-overlay')).not.toBeInTheDocument()
    expect(screen.getByTestId('page-base')).toBeInTheDocument()
  })
})
