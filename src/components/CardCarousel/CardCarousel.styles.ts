import styled from '@emotion/styled'

export const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`

export const CarouselContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  width: 100%;
`
