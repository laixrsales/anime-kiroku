export interface HeaderItem {
  label: string
  href?: string
  children?: HeaderItem[]
}

export interface HeaderProps {
  items: HeaderItem[]
  showLogo?: boolean
  showUserInfo?: boolean
  homeRedirect?: string
}
