import styled from 'styled-components'
import RainbowWithClicker from '../rainbow/RainbowWithClicker'

export const InlineRainbow = styled(RainbowWithClicker)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0.01;
  z-index: 999;
  transition: 0.2s;
  mix-blend-mode: multiply;
  will-change: transform;
`

export const SpeakerPhoto = styled.div`
  position: relative;
  border-radius: 100%;
  overflow: hidden;
  transition: 0.2s;

  &:hover {
    transform: scale(1.1) rotate(-5deg);

    > ${InlineRainbow} {
      opacity: 1;
    }
    > :not(${InlineRainbow}) {
      filter: grayscale(80%);
    }
  }
`

export const CFP = styled.div`
  width: 213px;
  height: 213px;
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  flex-direction: column;
  z-index: 9999;
`

export const SpeakersGrid = styled.ul`
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

export const Unstyled = styled.h3`
  font-size: 1em;
  font-weight: 600;
`

export const UnstyledLink = styled.a`
  text-decoration: none;
`
