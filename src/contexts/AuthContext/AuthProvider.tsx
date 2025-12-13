import { useState, useEffect } from 'react'
import {
  login as loginService,
  logout as logoutService,
  register as registerService,
  getUserFromToken,
  type Credentials,
  type RegisterData,
  type User,
  type LoginResponse,
  type RegisterResponse,
} from '../../services/authService'
import type { AuthProviderProps, RegisterResult } from './AuthContext.types'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadUser = () => {
      setIsLoading(true)
      try {
        const userData = getUserFromToken()
        setUser(userData)
      } catch (error) {
        console.error('Erro ao carregar usuário:', error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (
    email: string,
    password: string,
  ): Promise<LoginResponse> => {
    setIsLoading(true)
    try {
      const credentials: Credentials = { email, password }
      const response: LoginResponse = await loginService(credentials)

      const userData = getUserFromToken()
      setUser(userData)

      return response
    } catch (error) {
      console.error('Erro no login:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    logoutService()
    setUser(null)
  }

  const register = async (
    username: string,
    email: string,
    password: string,
  ): Promise<RegisterResult> => {
    setIsLoading(true)
    try {
      const userData: RegisterData = {
        email,
        username,
        password,
      }

      const registerResponse: RegisterResponse = await registerService(userData)

      const loginResponse: LoginResponse = await loginService({
        email,
        password,
      })

      const currentUser = getUserFromToken()
      setUser(currentUser)

      return { registerResponse, loginResponse }
    } catch (error) {
      console.error('Erro no registro:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const resetPassword = async (email: string): Promise<void> => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Email de recuperação enviado para:', email)
    } catch (error) {
      console.error('Erro ao resetar senha:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
