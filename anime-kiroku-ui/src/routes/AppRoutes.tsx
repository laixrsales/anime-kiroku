import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '../components/Route/ProtectedRoute'
import PageBase from '../components/PageBase/PageBase'
import { ROUTES } from './routes'

const LandingPage = lazy(() => import('../pages/LandingPage/LandingPage'))
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'))
const CreateAccountPage = lazy(
  () => import('../pages/CreateAccountPage/CreateAccountPage'),
)
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'))
const SearchPage = lazy(() => import('../pages/SearchPage/SearchPage'))
const DashboardPage = lazy(() => import('../pages/DashboardPage/DashboardPage'))
const AnimePage = lazy(() => import('../pages/AnimePage/AnimePage'))

const LoadingFallback = () => (
  <PageBase isLoading={true}>
    <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
  </PageBase>
)

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route
          path={ROUTES.LANDING}
          element={
            <ProtectedRoute requireAuth={false}>
              <LandingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.LOGIN}
          element={
            <ProtectedRoute requireAuth={false}>
              <LoginPage />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.REGISTER}
          element={
            <ProtectedRoute requireAuth={false}>
              <CreateAccountPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/home"
          element={<Navigate to={ROUTES.LANDING} replace />}
        />

        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute requireAuth={true}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.ANIME_DETAIL}
          element={
            <ProtectedRoute requireAuth={true}>
              <AnimePage />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.SEARCH} element={<SearchPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
