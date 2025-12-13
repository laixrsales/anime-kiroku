import styled from '@emotion/styled'

export const FooterWrapper = styled.footer`
  width: 100%;
  padding: var(--chakra-space-lg) 0;

  background: var(--chakra-colors-background-dark);
  color: var(--chakra-colors-text-secondary);

  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--chakra-space-md);
`

export const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  color: inherit;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: var(--chakra-colors-primary-default);
  }
`
