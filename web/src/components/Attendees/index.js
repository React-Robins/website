import React from 'react'

import { Attendees } from './elements'
import shuffle from '../../helpers/shuffle'

export default ({ attendees }) => {
  return (
    <Attendees>
      {shuffle(attendees).map(a => {
       // Pretty ugly but this way we do not get duplicate https://github.com urls
       const ghLink = `https://github.com/${a.ghLink.trim().replace('https://github.com/', '')}`;
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
