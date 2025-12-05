export interface BannerProps {
  imageUrl: string
  altText?: string
  title?: string
  subtitle?: string
  height?: string | number
  fadeIntensity?: number
  contentPosition?: 'left' | 'center' | 'right'
  hasOverlay?: boolean
  overlayColor?: string
  overlayOpacity?: number
  className?: string
  onClick?: () => void
}

export interface BannerContentWrapperProps {
  contentPosition: 'left' | 'center' | 'right'
}
