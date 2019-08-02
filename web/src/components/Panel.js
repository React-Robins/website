import React from 'react'
import styled from 'styled-components'

const PanelSection = styled.section`
  margin: 3em 0 1.5em;
  max-width: 50em;
`
const Heading = styled.h2`
  font-size: 32px;
  font-family: 'NeutraText-Bold';
`

const Panel = ({ heading, children }) => (
  <PanelSection>
    {heading && <Heading>{heading}</Heading>}
    {children}
  </PanelSection>
)

export default Panel
