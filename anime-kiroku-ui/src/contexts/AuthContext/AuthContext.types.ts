import type { ReactNode } from 'react'

export interface User {
  id: string
  name: string
  email: string
  username?: string
  avatar?: string
  createdAt?: Date
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

export interface AuthProviderProps {
  children: ReactNode
}
