// src/components/Header/Header.styles.ts
import styled from '@emotion/styled'

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

  .menu-items {
    background-color: var(--chakra-colors-background-light);
    color: var(--chakra-colors-text-primary);
  }

  .menu-items:hover {
    color: var(--chakra-colors-primary-default);
  }
`

export const MenuContainer = styled.div`
  width: 55%;
  display: flex;
  justify-content: space-between;
`

export const NavArea = styled.nav`
  display: flex;
  align-items: center;
  gap: var(--chakra-space-lg);
`

export const PopoverContainer = styled.div`
  display: flex;
  align-items: center;
`

export const ActionsArea = styled.div`
  display: flex;
  align-items: center;
  gap: var(--chakra-space-md);
`
