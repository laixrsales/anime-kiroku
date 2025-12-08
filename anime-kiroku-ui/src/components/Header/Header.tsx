import {
  Box,
  Text,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  IconButton,
  useToast,
} from '@chakra-ui/react'

import {
  FiChevronDown,
  FiSearch,
  FiBookmark,
  FiHome,
  FiUser,
  FiLogOut,
} from 'react-icons/fi'
import { type HeaderProps } from './Header.types'
import logo from '../../assets/logo-lanternas.png'
import {
  HeaderWrapper,
  LogoLink,
  LogoContainer,
  NavArea,
  NavItem,
  DropdownTrigger,
  DropdownContent,
  ActionsArea,
  UserIconButton,
} from './Header.styles'
import { useNavigation } from '../../hooks/useNavigation'
import { ROUTES } from '../../routes/routes'
import { useAuth } from '../../hooks/useAuth'
import { useCallback } from 'react'

export default function Header({
  items,
  showLogo = true,
  showUserInfo = false,
}: HeaderProps) {
  const { goTo } = useNavigation()
  const toast = useToast()
  const { logout } = useAuth()

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    goTo('/')
  }

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault()
    goTo(ROUTES.SEARCH)
  }

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault()
    goTo(ROUTES.PROFILE)
  }

  const handleLogout = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      logout()

      toast({
        title: 'Logged out successfully',
        description: 'You have been logged out of your account',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })

      goTo(ROUTES.LANDING)
    },
    [goTo, logout, toast],
  )

  return (
    <HeaderWrapper>
      <LogoContainer>
        {showLogo && (
          <LogoLink href="/" onClick={handleLogoClick}>
            <Box as="img" src={logo} h="32px" alt="AnimeKiroku Logo" />
            <Text fontSize="xl" fontWeight="bold">
              AnimeKiroku
            </Text>
          </LogoLink>
        )}

        <NavArea>
          {items.map((item) =>
            item.children ? (
              <Menu key={item.label}>
                {({ isOpen }) => (
                  <>
                    <MenuButton as={DropdownTrigger} className="menu-items">
                      <DropdownContent>
                        <FiChevronDown
                          size={14}
                          style={{
                            transform: isOpen
                              ? 'rotate(180deg)'
                              : 'rotate(0deg)',
                            transition: 'transform 0.2s ease',
                          }}
                        />
                        <Text ml={1}>{item.label}</Text>
                      </DropdownContent>
                    </MenuButton>
                    <MenuList className="menu-items">
                      {item.children?.map((child) => (
                        <MenuItem
                          key={child.label}
                          as="a"
                          href={child.href}
                          className="menu-items"
                        >
                          {child.label}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </>
                )}
              </Menu>
            ) : (
              <NavItem
                key={item.label}
                as="a"
                href={item.href}
                className="menu-items"
              >
                {item.label}
              </NavItem>
            ),
          )}
        </NavArea>
      </LogoContainer>

      <ActionsArea>
        <IconButton
          aria-label="Pesquisar"
          icon={<FiSearch />}
          variant="ghost"
          className="menu-items"
          onClick={handleSearchClick}
        />

        {showUserInfo && (
          <>
            <IconButton
              aria-label="Favoritos"
              icon={<FiBookmark />}
              variant="ghost"
              className="menu-items"
            />

            <Menu>
              <MenuButton
                as={UserIconButton}
                aria-label="Menu do usuário"
                icon={<FiUser />}
              />
              <MenuList className="menu-items">
                <MenuItem
                  className="menu-items"
                  icon={<FiHome />}
                  onClick={handleProfileClick}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  className="menu-items"
                  icon={<FiLogOut />}
                  onClick={handleLogout}
                >
                  Log out
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
      </ActionsArea>
    </HeaderWrapper>
  )
}
