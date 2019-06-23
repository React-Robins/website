import React from 'react'
import styled from 'styled-components'
import Figure from './Figure'

const SpeakerPhoto = styled.div`
  position: relative;
  border-radius: 100%;
  overflow: hidden;
  transition: 0.2s;

  &:hover {
    transform: scale(1.1) rotate(-5deg);
    :after {
      content: '';
      width: 100%;
      height: 100%;
      background: linear-gradient(
        rgba(255, 0, 0, 1),
        rgba(255, 255, 0, 1),
        rgba(0, 255, 0, 1),
        rgba(0, 255, 255, 1),
        rgba(0, 0, 255, 1),
        rgba(255, 0, 255, 1),
        rgba(255, 0, 0, 1)
      );
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.3;
    }
  }
`

const SpeakersGrid = styled.ul`
  display: grid;
  grid-gap: 40px;
  text-align: center;
  @media (min-width: 400px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`

const Unstyled = styled.h3`
  font-size: 1em;
  font-weight: 600;
`

const Speakers = ({speakers}) => {
  return (
    <SpeakersGrid>
      {speakers.map(speaker => (
        <li key={speaker._id}>
          <SpeakerPhoto>
            <Figure node={speaker.photo} />
          </SpeakerPhoto>
          <Unstyled>{speaker.name}</Unstyled>
        </li>
      ))}
    </SpeakersGrid>
  )
}

export default Speakers
