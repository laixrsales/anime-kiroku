import type { ReactNode } from 'react'
import type { HeaderItem } from '../Header'

export type PageType = 'landing' | 'authenticated'

export interface PageBaseProps {
  pageType?: PageType
  children: ReactNode
  customHeaderItems?: HeaderItem[]
  showHeaderLogo?: boolean
  showUserInfo?: boolean
  className?: string
  isLoading?: boolean
  loadingComponent?: ReactNode
}
