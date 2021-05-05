import React from 'react'
import styled from 'styled-components'

const TitleChip = styled.div`
  color: ${props => props.theme.boldBlue};
  font-size: 1rem;
  letter-spacing: 0;
  font-weight: 400;
`

const TitleTitle = styled.div`
  font-family: ${props => props.theme.neutra};
  font-size: 5rem;
  margin-top: 0.5rem;
`

const HugeTitle = styled.h1`
  margin: 4rem 0 2rem;
`

export default ({ children, sub }) => (
  <HugeTitle>
    {sub && <TitleChip>{sub}</TitleChip>}
    <TitleTitle>{children}</TitleTitle>
  </HugeTitle>
)
