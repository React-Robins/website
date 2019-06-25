import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
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

  li {
    margin-bottom: 10px;
  }
`

export default () => {
  const { allSanityThanks: thanks } = useStaticQuery(query)
  return (
    <>
      <Thanks>
        {thanks.edges.map(({ node: a }) => (
          <li key={a.id}>
            <a href={a.link} target="_blank" rel="noopener noreferrer">
              {a.name} for {a.reason}
            </a>
          </li>
        ))}
      </Thanks>
      We have a <Link to="/code-of-conduct">Code of Conduct</Link>.
      <br />
      Organized by{' '}
      <a href="https://twitter.com/NikkitaFTW" target="_blank" rel="noopener noreferrer">
        Sara Vieira
      </a>
    </>
  )
}
