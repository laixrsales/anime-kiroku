import { useState, useEffect } from 'react'
import {
  login as loginService,
  logout as logoutService,
  register as registerService,
  type Credentials,
  type User as UserData,
} from '../../services/authService'
import type { AuthProviderProps, User } from './AuthContext.types'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true)
      try {
        const token = localStorage.getItem('token')

        if (token) {
          const userData = localStorage.getItem('user_data')
          if (userData) {
            setUser(JSON.parse(userData))
          }
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        logoutService()
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const credentials: Credentials = { email, password }
      const response = await loginService(credentials)

      const userData: User = {
        id: response.token,
        name: email.split('@')[0],
        email: email,
        username: email.split('@')[0],
      }

      localStorage.setItem('user_data', JSON.stringify(userData))
      setUser(userData)
    } catch (error) {
      console.error('Erro no login:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    logoutService()
    localStorage.removeItem('user_data')
    setUser(null)
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      const userData: UserData = {
        email,
        username: name,
        password,
      }

      const response = await registerService(userData)

      const user: User = {
        id: response.id.toString(),
        name: response.username,
        email: response.email,
        username: response.username,
        createdAt: response.createdAt,
      }

      localStorage.setItem('user_data', JSON.stringify(user))
      setUser(user)
    } catch (error) {
      console.error('Erro no registro:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
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
