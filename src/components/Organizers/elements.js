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

export const OrganizerPhoto = styled.div`
  position: relative;
  overflow: hidden;
  transition: 0.2s;
  line-height: 0;
  width: ${props => props.size ? props.size + 'px' : '120px'};
  height: ${props => props.size ? props.size + 'px' : '120px'};
  border-radius: 50%;

  > ${InlineRainbow} {
    border-radius: 50%;
  }

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

export const OrganizersGrid = styled.ul`
  display: grid;
  grid-gap: 10px;
  text-align: center;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (min-width: 400px) {
    grid-template-columns: repeat(3, ${props => props.size ? props.size + 'px' : '120px'});
  }
  @media (min-width: 800px) {
    grid-template-columns: repeat(6, ${props => props.size ? props.size + 'px' : '120px'});
  }
`

export const Unstyled = styled.h3`
  font-size: 0.9em;
  font-weight: 500;
  position: relative;
`

export const UnstyledLink = styled(Link)`
  text-decoration: none;
  position: relative;
`

export const ListItem = styled.li`
  position: relative;
  list-style: none;

  &:hover:before,  &:hover:after {
    opacity: 1;
  }

  &:before, &:after {
    display: none
  }
`
