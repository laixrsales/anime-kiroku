import styled from '@emotion/styled'
import { Text } from '@chakra-ui/react'

export const HeaderWrapper = styled.header`
  background-color: var(--chakra-colors-background-default);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--chakra-space-2xl);
  padding: 0 var(--chakra-space-lg);

  display: flex;
  align-items: center;
  justify-content: space-between;

  backdrop-filter: blur(var(--chakra-space-sm));
  z-index: 1000;
  color: var(--chakra-colors-text-primary);

  .menu-items {
    background-color: var(--chakra-colors-background-light);
    color: var(--chakra-colors-text-primary);
  }

  .menu-items:hover {
    color: var(--chakra-colors-primary-default);
  }
`

export const LogoLink = styled.a`
  display: flex;
  align-items: center;
  gap: var(--chakra-space-md);
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`

export const NavArea = styled.nav`
  display: flex;
  align-items: center;
  gap: var(--chakra-space-lg);
  margin-left: var(--chakra-space-xl);
  flex-grow: 1;
`

export const NavItem = styled(Text)`
  cursor: pointer;
  padding: var(--chakra-space-xs) var(--chakra-space-sm);
  border-radius: var(--chakra-radii-sm);
  transition: all 0.2s ease;
  color: var(--chakra-colors-text-primary);

  &:hover {
    color: var(--chakra-colors-primary-default);
    background-color: var(--chakra-colors-background-light);
  }

  &:active {
    transform: scale(0.98);
  }
`

export const DropdownTrigger = styled.div`
  display: flex;
  align-items: center;
  gap: var(--chakra-space-xs);
  padding: var(--chakra-space-xs) var(--chakra-space-sm);
  border-radius: var(--chakra-radii-sm);
  cursor: pointer;
  color: var(--chakra-colors-text-primary);
  transition: all 0.2s ease;

  &:hover {
    color: var(--chakra-colors-primary-default);
    background-color: var(--chakra-colors-background-light);
  }
`

export const ActionsArea = styled.div`
  display: flex;
  align-items: center;
  gap: var(--chakra-space-md);
  flex-shrink: 0;
`
