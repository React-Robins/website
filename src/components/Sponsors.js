import React from 'react'
import styled from 'styled-components'

const Grid = styled.ul`
  padding: 0;
  display: grid;
  grid-gap: 20px;

  @media (min-width: 400px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  li {
    background: ${props => props.theme.boldAqua};
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const SponsorImage = styled.img`
  min-width: 70px;
  max-height: 80px;
  max-width: 200px;
`

export default ({ sponsors }) => {
  return (
    <Grid>
      {sponsors.map(sponsor => (
        <li key={sponsor.name}>
          <a target="_blank" title={sponsor.name} href={sponsor.link} rel="noopener noreferrer">
            <SponsorImage src={sponsor.media} alt={sponsor.name} />
          </a>
        </li>
      ))}
    </Grid>
  )
}
