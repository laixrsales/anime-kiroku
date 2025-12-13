export interface SimplePageProps {
  title: string
  description?: string
  children: React.ReactNode
  buttonTitle: string
  footerLinks?: React.ReactNode
  onClick: () => void
}
