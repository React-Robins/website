import React from 'react'
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

export default ({ sponsors }) => {
  return (
    <Grid>
      {sponsors.map(sponsor => (
        <li>
          <a target="_blank" href={sponsor.link} rel="noopener noreferrer">
            <SponsorImage src={sponsor.media.asset.url} alt={sponsor.name} />
          </a>
        </li>
      ))}
    </Grid>
  )
}
