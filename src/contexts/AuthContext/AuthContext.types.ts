import type { ReactNode } from 'react'
import type {
  User,
  LoginResponse,
  RegisterResponse,
} from '../../services/authService'

export interface RegisterResult {
  registerResponse: RegisterResponse
  loginResponse: LoginResponse
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<LoginResponse>
  logout: () => void
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<RegisterResult>
  resetPassword: (email: string) => Promise<void>
}

export interface AuthProviderProps {
  children: ReactNode
}
