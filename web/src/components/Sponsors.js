import React from 'react'
import {useStaticQuery, graphql} from 'gatsby'
import Figure from './Figure'
import styled from 'styled-components'

const Grid = styled.ul`
  display: grid;
  grid-gap: 20px;
  @media (min-width: 400px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  li {
    background: ${props => props.theme.white};
    display: block;
    padding: 20px;
  }
`

export default () => {
  const {
    allSanitySponsor: {edges}
  } = useStaticQuery(graphql`
    fragment SponsorImage on SanityImage {
      crop {
        _key
        _type
        top
        bottom
        left
        right
      }
      hotspot {
        _key
        _type
        x
        y
        height
        width
      }
      asset {
        _id
      }
    }
    query {
      allSanitySponsor {
        edges {
          node {
            name
            link
            media {
              ...SponsorImage
            }
          }
        }
      }
    }
  `)

  return (
    <Grid>
      {edges.map(({node: sponsor}) => (
        <li>
          <a target='_blank' href={sponsor.link}>
            <Figure node={sponsor.media} alt={sponsor.name} />
          </a>
        </li>
      ))}
    </Grid>
  )
}
