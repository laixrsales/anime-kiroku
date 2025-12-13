import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import PageBase from '../PageBase/PageBase'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export default function ProtectedRoute({
  children,
  requireAuth = true,
  redirectTo = '/',
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <PageBase isLoading={true}>
        <div>Carregando...</div>
      </PageBase>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
