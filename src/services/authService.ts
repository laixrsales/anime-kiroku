import { jwtDecode } from 'jwt-decode'
import api from './api'
import type { Review } from './reviewService'

export interface DecodedToken {
  id: number
  email: string
  username: string
  iat: number
  exp: number
}

export interface LoginResponse {
  token: string
}

export interface RegisterResponse {
  id: number
  email: string
  username: string
  createdAt: string
}

export interface Credentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  username: string
  password: string
}

export interface User {
  id: number | string
  email: string
  username: string
  createdAt: Date
  reviews: Review[]
}

export const login = async (
  credentials: Credentials,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/user/login', credentials)

  if (response.data.token) {
    localStorage.setItem('token', response.data.token)
    const decoded: DecodedToken = jwtDecode(response.data.token)
    const userData: User = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
      createdAt: new Date(),
      reviews: [],
    }
    localStorage.setItem('user_data', JSON.stringify(userData))
  }

  return response.data
}

export const register = async (
  userData: RegisterData,
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('/user/register', userData)
  return response.data
}

export const getUserFromToken = (): User | null => {
  try {
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user_data')

    if (token && storedUser) {
      const userData: User = JSON.parse(storedUser)
      if (userData.createdAt && typeof userData.createdAt === 'string') {
        userData.createdAt = new Date(userData.createdAt)
      }
      return userData
    }
    return null
  } catch (error) {
    console.error('Erro ao extrair usuário do token:', error)
    return null
  }
}

export const logout = (): void => {
  localStorage.removeItem('token')
  localStorage.removeItem('user_data')
}
