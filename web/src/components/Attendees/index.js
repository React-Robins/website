import React from 'react'

import { Attendees } from './elements'
import shuffle from '../../helpers/shuffle'

export default ({ attendees }) => {
  return (
    <Attendees>
      {shuffle(attendees).map(a => (
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
