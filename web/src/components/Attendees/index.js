import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { Attendees } from './elements'
import shuffle from '../../helpers/shuffle'

const query = graphql`
  {
    allSanityAttendee {
      edges {
        node {
          id
          ghLink
          name
        }
      }
    }
  }
`

export default () => {
  const { allSanityAttendee: attendees } = useStaticQuery(query)
  return (
    <Attendees>
      {shuffle(attendees.edges).map(({ node: a }) => (
        <li key={a.id}>
          <a
            href={`https://github.com/${a.ghLink}`}
            target="_blank"
            title={a.name}
            rel="noopener noreferrer"
          >
            <img src={`https://github.com/${a.ghLink}.png?size=50`} alt={a.name} width="50" />
          </a>
        </li>
      ))}
    </Attendees>
  )
}
