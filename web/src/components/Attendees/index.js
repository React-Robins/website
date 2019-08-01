import React from 'react'

import { Attendees } from './elements'
import shuffle from '../../helpers/shuffle'

const dedupeAttendees = (attendeesArray) => {
  const list = [];
  const deduped = attendeesArray.reduce((acc, current) => {
    const cleanGhLink = current.ghLink.startsWith('@') ? current.ghLink.slice(1) : current.ghLink


    if (list.includes(cleanGhLink)) {
      return acc;
    }

    list.push(cleanGhLink)
    acc.push(current)

    return acc
  }, [])

  return deduped
}

export default ({ attendees }) => {

  const dedupedAttendees = dedupeAttendees(attendees)

  return (
    <Attendees>
      {shuffle(dedupedAttendees).map(a => {
        // Pretty ugly but this way we do not get duplicate https://github.com urls

        const cleanGhLink = a.ghLink.startsWith('@') ? a.ghLink.slice(1) : a.ghLink

        const ghLink = `https://github.com/${cleanGhLink.trim().replace('https://github.com/', '')}`;
        return (<li key={a.id}>
          <a
            href={ghLink}
            target="_blank"
            title={a.name}
            rel="noopener noreferrer"
          >
            <img
              src={`${ghLink}.png?size=50`}
              alt={a.name}
              width="50"
            />
          </a>
        </li>);
      })}
    </Attendees>
  )
}
