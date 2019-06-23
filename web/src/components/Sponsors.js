import React from 'react'
import {useStaticQuery, graphql} from 'gatsby'
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
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const SponsorImage = styled.img`
  max-height: 80px;
  max-width: 200px;
`

export default () => {
  const {
    allSanitySponsor: {edges}
  } = useStaticQuery(graphql`
    query {
      allSanitySponsor {
        edges {
          node {
            name
            link
            media {
              asset {
                url
              }
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
            <SponsorImage src={sponsor.media.asset.url} alt={sponsor.name} />
          </a>
        </li>
      ))}
    </Grid>
  )
}
