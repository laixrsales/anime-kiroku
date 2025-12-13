export interface BannerProps {
  imageUrl: string
  altText?: string
  title?: string
  subtitle?: string
  height?: string | number
  fadeIntensity?: number
  hasOverlay?: boolean
  overlayColor?: string
  overlayOpacity?: number
  className?: string
  showLogo?: boolean
  logoUrl?: string
  onClick?: () => void
}
