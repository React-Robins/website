import React from 'react'
import Figure from '../Figure'
import RainbowWithClicker from '../rainbow/RainbowWithClicker'

import { InlineRainbow, SpeakerPhoto, CFP, SpeakersGrid, Unstyled, UnstyledLink } from './elements'

const Speakers = ({ speakers, cfp }) => {
  return (
    <SpeakersGrid>
      {speakers.map(human => (
        <li key={human.id}>
          <UnstyledLink
            href={`https://twitter.com/${human.twitterLink}`}
            target="_blank"
            rel="noopener noreferrer"
            title={human.name}
          >
            <SpeakerPhoto>
              <InlineRainbow flag={human.colors} />
              {human.image ? (
                <img width="221" height="221" src={human.image} />
              ) : (
                <Figure node={human.photo} />
              )}
            </SpeakerPhoto>
            <Unstyled>{human.name}</Unstyled>
            {human.location && <Unstyled>{human.location}</Unstyled>}
          </UnstyledLink>
        </li>
      ))}
      {cfp && (
        <li>
          <UnstyledLink
            href="https://github.com/queerjs/queerjs-talk-proposals/issues/new/choose"
            target="_blank"
            rel="noopener noreferrer"
            title="Speak at QueerJS"
          >
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
