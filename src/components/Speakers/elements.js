import styled from 'styled-components'
import RainbowWithClicker from '../rainbow/RainbowWithClicker'
import { Link } from 'gatsby'

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
  line-height: 0;

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

export const SpeakerCfpLink = styled.div``

export const CFP = styled.div`
  padding-top: 100%;
  height: 0;
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  flex-direction: column;
  z-index: 9999;
`
export const CFPInner = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  flex-direction: column;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
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

export const UnstyledLink = styled(Link)`
  text-decoration: none;
`
