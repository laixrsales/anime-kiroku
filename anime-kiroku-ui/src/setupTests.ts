/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom/vitest'
import { vi, afterEach } from 'vitest'

vi.mock('@chakra-ui/react', async () => {
  const actual = await vi.importActual('@chakra-ui/react')
  return {
    ...actual,
    useToast: () => vi.fn(),
  }
})

vi.mock('react-icons/fi', () => ({
  FiChevronDown: () => 'FiChevronDown',
  FiChevronLeft: () => 'FiChevronLeft',
  FiChevronRight: () => 'FiChevronRight',
  FiSearch: () => 'FiSearch',
  FiLogOut: () => 'FiLogOut',
  FiShare2: () => 'FiShare2',
}))

vi.mock('react-icons/fa', () => ({
  FaGithub: () => 'FaGithub',
  FaStar: () => 'FaStar',
  FaRegStar: () => 'FaRegStar',
  FaHeart: () => 'FaHeart',
  FaEye: () => 'FaEye',
}))

vi.mock('react-icons/md', () => ({
  MdOutlineRemoveRedEye: () => 'MdOutlineRemoveRedEye',
  MdOutlineFavoriteBorder: () => 'MdOutlineFavoriteBorder',
  MdOutlineStar: () => 'MdOutlineStar',
}))

vi.mock('react-icons/md', () => ({
  MdOutlineRemoveRedEye: () => '👁️',
  MdOutlineFavoriteBorder: () => '🤍',
  MdOutlineStar: () => '☆',
}))

vi.mock('../../assets/logo-lanternas.png', () => 'logo-lanternas.png')
vi.mock('../../assets/anime-panel.jpg', () => 'anime-panel.jpg')
vi.mock('../../assets/anime-kiroku-logo.png', () => 'anime-kiroku-logo.png')

vi.mock('../../hooks/useNavigation', () => ({
  useNavigation: () => ({
    goTo: vi.fn(),
    goBack: vi.fn(),
  }),
}))

vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    logout: vi.fn(),
    login: vi.fn(),
    user: null,
    isAuthenticated: false,
  }),
}))

vi.mock('../../contexts/AuthContext/AuthContext', () => ({
  AuthContext: {
    Consumer: ({ children }: any) => children({ isAuthenticated: false }),
    Provider: ({ children }: any) => children,
  },
}))

afterEach(() => {
  vi.clearAllMocks()
})
