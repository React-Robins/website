import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Thanks = styled.ul`
  list-style: none;
  color: ${props => props.theme.lightGrey};
  font-size: 0.8em;
  margin: 20px 0 40px;

  li {
    margin-bottom: 10px;
  }
`

export default ({ thanks, mainOrganizer, site }) => {
  return (
    <>
      <Thanks>
        {thanks.map(a => (
          <li key={a.id}>
            <a href={a.link} target="_blank" rel="noopener noreferrer">
              {a.name} for {a.reason}
            </a>
          </li>
        ))}
      </Thanks>
      We have a{' '}
      <Link state={{ organizer: mainOrganizer, site: site }} to="/code-of-conduct">
        Code of Conduct
      </Link>
      .
      <br />
      Organized by a{' '}
      <Link
        css={`
          padding-bottom: 40px;
        `}
        state={{ site: site }}
        to="/organizers"
      >
        bunch of humans
      </Link>
    </>
  )
}
