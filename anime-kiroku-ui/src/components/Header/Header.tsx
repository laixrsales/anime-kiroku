import {
  HStack,
  Box,
  Text,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  IconButton,
  Avatar,
} from '@chakra-ui/react'

import { FiChevronDown, FiSearch, FiBookmark } from 'react-icons/fi'
import { type HeaderProps } from './Header.types'
import logo from '../../assets/logo-lanternas.png'
import {
  HeaderWrapper,
  MenuContainer,
  NavArea,
  PopoverContainer,
  ActionsArea,
} from './Header.styles'

export default function Header({ items, showLogo, showUserInfo }: HeaderProps) {
  return (
    <HeaderWrapper>
      <MenuContainer>
        {showLogo && (
          <HStack spacing={3}>
            <Box as="img" src={logo} h="32px" />
            <Text fontSize="xl" fontWeight="bold">
              AnimeKiroku
            </Text>
          </HStack>
        )}

        <NavArea>
          {items.map((item) =>
            item.children ? (
              <Menu key={item.label}>
                <MenuButton
                  display="flex"
                  alignItems="center"
                  gap="4px"
                  className="menu-items"
                >
                  <PopoverContainer>
                    <FiChevronDown size={16} />
                    {item.label}
                  </PopoverContainer>
                </MenuButton>
                <MenuList className="menu-items">
                  {item.children.map((child) => (
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
              </Menu>
            ) : (
              <Text
                key={item.label}
                as="a"
                href={item.href}
                cursor="pointer"
                className="menu-items"
              >
                {item.label}
              </Text>
            ),
          )}
        </NavArea>
      </MenuContainer>

      <ActionsArea>
        <IconButton
          aria-label="Pesquisar"
          icon={<FiSearch />}
          variant="ghost"
        />
        {showUserInfo && (
          <>
            <IconButton
              aria-label="Favoritos"
              icon={<FiBookmark />}
              variant="ghost"
            />

            <Menu>
              <MenuButton>
                <Avatar size="sm" src="/avatar.png" />
              </MenuButton>
              <MenuList className="menu-items">
                <MenuItem className="menu-items">Perfil</MenuItem>
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
