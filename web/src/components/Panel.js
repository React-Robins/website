import React from 'react'
import styled from 'styled-components'

const PanelSection = styled.section`
  margin: 60px 0 30px;
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
