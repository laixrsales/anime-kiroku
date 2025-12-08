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
const ResetPasswordPage = lazy(
  () => import('../pages/ResetPasswordPage/ResetPasswordPage'),
)
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'))

/*
const DashboardPage = lazy(() => import('../pages/DashboardPage/DashboardPage'))
const FeedPage = lazy(() => import('../pages/FeedPage/FeedPage'))
const AnimeListPage = lazy(() => import('../pages/AnimeListPage/AnimeListPage'))
const AnimeDetailPage = lazy(
  () => import('../pages/AnimeDetailPage/AnimeDetailPage'),
)
const MyListsPage = lazy(() => import('../pages/MyListsPage/MyListsPage'))
const ProfilePage = lazy(() => import('../pages/ProfilePage/ProfilePage'))
*/

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
          path={ROUTES.RESET_PASSWORD}
          element={
            <ProtectedRoute requireAuth={false}>
              <ResetPasswordPage />
            </ProtectedRoute>
          }
        />

        {/*
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute requireAuth={true}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.FEED}
          element={
            <ProtectedRoute requireAuth={true}>
              <FeedPage />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.ANIME_LIST}
          element={
            <ProtectedRoute requireAuth={true}>
              <AnimeListPage />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.ANIME_DETAIL}
          element={
            <ProtectedRoute requireAuth={true}>
              <AnimeDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.MY_LISTS}
          element={
            <ProtectedRoute requireAuth={true}>
              <MyListsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute requireAuth={true}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        */}

        <Route
          path="/home"
          element={<Navigate to={ROUTES.LANDING} replace />}
        />
        <Route
          path="/entrar"
          element={<Navigate to={ROUTES.LOGIN} replace />}
        />
        <Route
          path="/criar-conta"
          element={<Navigate to={ROUTES.REGISTER} replace />}
        />
        <Route
          path="/anime"
          element={<Navigate to={ROUTES.ANIME_LIST} replace />}
        />

        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
