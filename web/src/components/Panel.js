import React from 'react'
import styled from 'styled-components'

const Panel = ({heading, children}) => {
  const PanelDiv = styled.section`
    margin: 60px 0 30px;
  `
  const Heading = styled.h2`
    font-size: 32px;
    font-family: 'NeutraText-Bold';
  `
  return (
    <PanelDiv>
      {heading && <Heading>{heading}</Heading>}
      {children}
    </PanelDiv>
  )
}

export default Panel
