import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import {
  PageContainer,
  MainContent,
  LoadingOverlay,
  LoadingSpinner,
} from './PageBase.styles'
import type { PageBaseProps } from './PageBase.types'

const landingHeaderItems = [
  { label: 'Animes', href: '/animes' },
  { label: 'Listas', href: '/listas' },
  { label: 'Entrar', href: '/entrar' },
  { label: 'Criar Conta', href: '/criar-conta' },
]

const authenticatedHeaderItems = [
  { label: 'Feed', href: '/feed' },
  { label: 'Animes', href: '/animes' },
  { label: 'Listas', href: '/listas' },
  {
    label: 'Categorias',
    children: [
      { label: 'Ação', href: '/categorias/acao' },
      { label: 'Romance', href: '/categorias/romance' },
      { label: 'Comédia', href: '/categorias/comedia' },
      { label: 'Drama', href: '/categorias/drama' },
      { label: 'Aventura', href: '/categorias/aventura' },
      { label: 'Fantasia', href: '/categorias/fantasia' },
      { label: 'Suspense', href: '/categorias/suspense' },
      { label: 'Terror', href: '/categorias/terror' },
    ],
  },
  {
    label: 'Gêneros',
    children: [
      { label: 'Shonen', href: '/generos/shonen' },
      { label: 'Shojo', href: '/generos/shojo' },
      { label: 'Seinen', href: '/generos/seinen' },
      { label: 'Josei', href: '/generos/josei' },
    ],
  },
]

const DefaultLoadingSpinner = () => (
  <LoadingOverlay data-testid="loading-overlay">
    <LoadingSpinner data-testid="loading-spinner" />
  </LoadingOverlay>
)

export default function PageBase({
  pageType = 'authenticated',
  children,
  customHeaderItems,
  showHeaderLogo = true,
  showUserInfo = true,
  className,
  isLoading = false,
  loadingComponent,
}: PageBaseProps) {
  const getHeaderItems = () => {
    if (customHeaderItems) return customHeaderItems

    return pageType === 'landing'
      ? landingHeaderItems
      : authenticatedHeaderItems
  }

  const shouldShowUserInfo = pageType === 'authenticated' && showUserInfo

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
