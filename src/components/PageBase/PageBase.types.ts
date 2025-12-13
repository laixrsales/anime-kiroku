import type { ReactNode } from 'react'
import type { HeaderItem } from '../Header'

export interface PageBaseProps {
  children: ReactNode
  customHeaderItems?: HeaderItem[]
  showHeaderLogo?: boolean
  showUserInfo?: boolean
  className?: string
  isLoading?: boolean
  loadingComponent?: ReactNode
}
