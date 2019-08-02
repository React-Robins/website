import React from 'react'
import styled, { css } from 'styled-components'

const PanelSection = styled.section`
  margin: 5em 0 1.5em;
  ${props =>
    props.wide === false &&
    css`
      max-width: 50em;
    `}
`

const Heading = styled.h2`
  font-size: 32px;
  font-family: 'NeutraText-Bold';
`

const Panel = ({ heading, children, wide = false }) => (
  <PanelSection wide={wide}>
    {heading && <Heading>{heading}</Heading>}
    {children}
  </PanelSection>
)

export const LargeParagraph = styled.p`
  font-size: 1.25em;
  color: ${props => props.theme.lightPurple};
`

export default Panel
