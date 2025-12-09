import api from './api'

interface AuthResponse {
  success: true
  token: string
}

export interface Credentials {
  email: string
  password: string
}

export interface User {
  email: string
  username: string
  password: string
}

interface UserData {
  email: string
  username: string
  createdAt: Date
  id: number
}

export const login = async (credentials: Credentials) => {
  const response = await api.post<AuthResponse>('/user/login', credentials)

  if (response.data.token) localStorage.setItem('token', response.data.token)

  return response.data
}

export const logout = () => {
  localStorage.removeItem('token')
}

export const register = async (user: User) => {
  const response = await api.post<UserData>('/user/register', user)

  return response.data
}
