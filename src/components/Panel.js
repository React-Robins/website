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

const Permalink = styled.a`
  position: absolute;
  font-size: .75em;
  text-decoration:none;
  transition: all .1s;
  display:inline-block;
  padding:1em;
  margin: -1em 0 0 -2.5em;
`

const Heading = styled.h2`
  font-size: 32px;
  font-family: 'NeutraText-Bold';
  & ${Permalink} {
    opacity: 0;
  }
  &:hover ${Permalink} {
    opacity: 1;
  }
`

const Panel = ({ heading, children, id, wide = false }) => (
  <PanelSection wide={wide} id={id}>
    {heading && (
      <Heading>
        {id && (
          <Permalink href={`#${id}`} aria-label="Copy link">📎</Permalink>
        )}
        {heading}
      </Heading>
    )}
    {children}
  </PanelSection>
)

export const LargeParagraph = styled.p`
  font-size: 1.25em;
  color: ${props => props.theme.lightPurple};
`

export default Panel
