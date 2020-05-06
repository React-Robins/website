import React from 'react'

import {
  InlineRainbow,
  OrganizerPhoto,
  OrganizersGrid,
  Unstyled,
  ListItem,
  UnstyledLink
} from './elements'

const size = 100

const Organizers = ({ organizers }) => {
  return (
    <OrganizersGrid size={size}>
      {organizers.map((human) => (
        <ListItem key={human.twitterHandle}>
          <UnstyledLink
            as="a"
            href={`https://twitter.com/${human.twitterHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            title={human.name}
          >
            <OrganizerPhoto size={size}>
              <InlineRainbow flag={human.colors} />
              <img
                width={size + 'px'}
                height={size + 'px'}
                src={`https://twitter-avatar.now.sh/${human.twitterHandle}`}
                alt="Organizer"
              />
            </OrganizerPhoto>
            <Unstyled>{human.name}</Unstyled>
          </UnstyledLink>
        </ListItem>
      ))}
    </OrganizersGrid>
  )
}

export default Organizers
