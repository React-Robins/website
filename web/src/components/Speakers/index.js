import React from 'react'
import Figure from '../Figure'
import RainbowWithClicker from '../rainbow/RainbowWithClicker'

import { InlineRainbow, SpeakerPhoto, CFP, SpeakersGrid, Unstyled, UnstyledLink } from './elements'

const Speakers = ({ noSpeak, speakers, cfp, dataset, organizers }) => {
  return (
    <SpeakersGrid>
      {speakers.map(human => (
        <li key={human.id}>
          <UnstyledLink
            as="a"
            href={`https://twitter.com/${human.twitterLink}`}
            target="_blank"
            rel="noopener noreferrer"
            title={human.name}
          >
            <SpeakerPhoto>
              <InlineRainbow flag={human.colors} />
              {organizers ? (
                <img
                  width="221"
                  height="221"
                  src={`https://avatars.io/twitter/${human.twitterLink}`}
                  alt={human.name}
                />
              ) : (
                <Figure dataset={dataset} node={human.photo} />
              )}
            </SpeakerPhoto>
            <Unstyled>{human.name}</Unstyled>
            {human.location && <Unstyled>{human.location}</Unstyled>}
          </UnstyledLink>
        </li>
      ))}
      {cfp && !noSpeak && (
        <li>
          <UnstyledLink to="/speak" title="Speak at QueerJS">
            <SpeakerPhoto>
              <RainbowWithClicker>
                <CFP>
                  <h2>You?</h2> <span>Speak at QueerJS</span>
                </CFP>
              </RainbowWithClicker>
            </SpeakerPhoto>
          </UnstyledLink>
        </li>
      )}
    </SpeakersGrid>
  )
}

export default Speakers
