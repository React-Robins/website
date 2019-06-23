import React from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import styled from 'styled-components'

const query = graphql`
  {
    allSanityThanks {
      edges {
        node {
          name
          link
          reason
        }
      }
    }
  }
`

const Thanks = styled.ul`
  list-style: none;
  color: ${props => props.theme.lightGrey};
  font-size: 0.8em;
  margin: 20px 0 40px;
`

export default () => {
  const {allSanityThanks: thanks} = useStaticQuery(query)
  return (
    <Thanks>
      {thanks.edges.map(({node: a}) => (
        <li key={a.id}>
          <a href={a.link} target='_blank'>
            {a.name} for {a.reason}
          </a>
        </li>
      ))}
    </Thanks>
  )
}
