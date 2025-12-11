import { useContext } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { AuthContext } from '../../contexts/AuthContext/AuthContext'
import {
  PageContainer,
  MainContent,
  LoadingOverlay,
  LoadingSpinner,
} from './PageBase.styles'
import type { PageBaseProps } from './PageBase.types'

const landingHeaderItems = [
  { label: 'Sign in', href: '/login' },
  { label: 'Sign up', href: '/register' },
]

const authenticatedHeaderItems = [{ label: 'Dashboard', href: '/dashboard' }]

const DefaultLoadingSpinner = () => (
  <LoadingOverlay data-testid="loading-overlay">
    <LoadingSpinner data-testid="loading-spinner" />
  </LoadingOverlay>
)

export default function PageBase({
  children,
  customHeaderItems,
  showHeaderLogo = true,
  className,
  isLoading = false,
  loadingComponent,
}: PageBaseProps) {
  const authContext = useContext(AuthContext)

  const getHeaderItems = () => {
    if (customHeaderItems) return customHeaderItems

    return authContext?.isAuthenticated
      ? authenticatedHeaderItems
      : landingHeaderItems
  }

  const shouldShowUserInfo = authContext?.isAuthenticated

  if (isLoading) {
    return loadingComponent || <DefaultLoadingSpinner />
  }

  return (
    <PageContainer className={className} data-testid="page-base">
      <Header
        items={getHeaderItems()}
        showLogo={showHeaderLogo}
        showUserInfo={shouldShowUserInfo}
      />

      <MainContent data-testid="main-content">{children}</MainContent>

      <Footer />
    </PageContainer>
  )
}
