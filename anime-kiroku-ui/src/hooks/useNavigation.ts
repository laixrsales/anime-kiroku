import { useNavigate, useLocation } from 'react-router-dom'
import { ROUTES } from '../routes/routes'

export function useNavigation() {
  const navigate = useNavigate()
  const location = useLocation()

  const goTo = (path: string) => {
    navigate(path)
  }

  const goBack = () => {
    navigate(-1)
  }

  const goToLogin = () => {
    navigate(ROUTES.LOGIN)
  }

  const goToRegister = () => {
    navigate(ROUTES.REGISTER)
  }

  const goToReset = () => {
    navigate(ROUTES.RESET_PASSWORD)
  }

  const goToDashboard = () => {
    navigate(ROUTES.DASHBOARD)
  }

  const goToLanding = () => {
    navigate(ROUTES.LANDING)
  }

  const getReturnUrl = () => {
    const state = location.state as { from?: string }
    return state?.from || ROUTES.DASHBOARD
  }

  return {
    goTo,
    goBack,
    goToLogin,
    goToRegister,
    goToReset,
    goToDashboard,
    goToLanding,
    getReturnUrl,
    currentPath: location.pathname,
  }
}
