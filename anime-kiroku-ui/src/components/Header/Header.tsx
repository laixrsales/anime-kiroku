import {
  Box,
  Text,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  IconButton,
  Avatar,
} from '@chakra-ui/react'

import { FiChevronDown, FiSearch, FiBookmark, FiHome } from 'react-icons/fi'
import { type HeaderProps } from './Header.types'
import logo from '../../assets/logo-lanternas.png'
import {
  HeaderWrapper,
  LogoLink,
  LogoContainer,
  NavArea,
  NavItem,
  DropdownTrigger,
  ActionsArea,
} from './Header.styles'
import { useNavigate } from 'react-router-dom'

export default function Header({
  items,
  showLogo = true,
  showUserInfo = false,
}: HeaderProps) {
  const navigate = useNavigate()

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate('/')
  }

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
                      {item.label}
                      <FiChevronDown
                        size={16}
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                        }}
                      />
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

      {/* Área da direita: Ações */}
      <ActionsArea>
        <IconButton
          aria-label="Pesquisar"
          icon={<FiSearch />}
          variant="ghost"
          className="menu-items"
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
              <MenuButton>
                <Avatar size="sm" src="/avatar.png" />
              </MenuButton>
              <MenuList className="menu-items">
                <MenuItem className="menu-items" icon={<FiHome />}>
                  Perfil
                </MenuItem>
                <MenuItem className="menu-items">Configurações</MenuItem>
                <MenuItem className="menu-items">Sair</MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
      </ActionsArea>
    </HeaderWrapper>
  )
}
