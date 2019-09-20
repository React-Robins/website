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
  position: relative;
`

export const ListItem = styled.li`
  position: relative;
  ${props =>
    !props.talk &&
    `
    &:before {display: none}
    &:after {display: none}
  `}

  &:hover:before,  &:hover:after {
    opacity: 1;
  }

  &:before {
    opacity: 0;
    color: white;
    content: attr(data-tooltip);
    position: absolute;
    z-index: 99;
    background: #1e1126;
    width: 200px;
    padding: 20px;
    transform: translateY(-90%);
    border-radius: 5%;
    border: 3px solid white;
    transition: opacity 200ms ease;
    box-shadow: 0 0 0 3px #1e1126;
  }

  &:after {
    opacity: 0;
    transition: opacity 200ms ease;
    content: '';
    background-image: url("data:image/svg+xml,%0A%3Csvg width='53px' height='85px' viewBox='0 0 53 85' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Group' transform='translate(3.000000, 0.000000)'%3E%3Cg id='Rectangle' transform='translate(0.750166, 4.000000)'%3E%3Cpath d='M45.9999929,14.9934804 C46.0270586,27.4476972 42.2385196,39.460399 34.6818922,50.9736844 C24.756873,66.0954538 9.6606152,78.5591513 3.35041306,77.9784772 C0.80698492,77.7444271 -0.36529921,75.5771569 0.10777829,73.3481751 C0.31414092,72.3758639 0.79575443,71.3393153 1.60918811,69.922775 C2.2498929,68.8070305 5.89054787,63.060773 6.88693591,61.383333 C9.30350565,57.3149877 10.9884305,53.8464493 11.9840038,50.6141214 C12.3339496,49.4779523 12.5890595,48.3932781 12.746047,47.3614597 C13.8797321,39.9101796 13.1358792,30.2478623 10.4712515,18.4145918 C10.3534513,17.8914559 10.2766316,17.1915102 10.2280266,16.4510018 C10.2028967,16.0681414 10.1913626,15.5893685 10.1913626,15 C10.1913626,6.1951083 18.244086,0.82176836 28.0835367,0.82177417 C37.9209794,0.82177998 45.9808657,6.192115 45.9999929,14.9934804 Z' id='Path' stroke='%231E1126' stroke-width='6' fill='%231E1126'%3E%3C/path%3E%3Cpath d='M44.4999965,14.9967402 C44.5264049,27.1485071 40.8277773,38.8761175 33.427872,50.150621 C23.7827897,64.8458783 9.06402194,76.9979143 3.48786455,76.4847881 C1.94882384,76.3431633 1.27135918,75.0906947 1.5750943,73.6595972 C1.73939592,72.8854633 2.17083876,71.9568942 2.90997473,70.6697383 C3.53054956,69.5890488 7.16314839,63.8555067 8.17658028,62.1493731 C10.6485316,57.9877917 12.380691,54.4220176 13.4175462,51.0556597 C13.7884339,49.8514988 14.0603775,48.6952513 14.2289813,47.5870828 C15.3945201,39.9264406 14.6369356,30.0857562 11.9346094,18.0850714 C11.8388637,17.6598768 11.7685501,17.0192117 11.7248058,16.3527573 C11.7021667,16.0078449 11.6913626,15.559373 11.6913626,15 C11.6913626,7.1817563 18.9747535,2.32176879 28.0835358,2.32177417 C37.1913125,2.32177955 44.4830096,7.180267 44.4999965,14.9967402 Z' id='Path' stroke='%23FFFFFF' stroke-width='3'%3E%3C/path%3E%3C/g%3E%3Crect id='Rectangle' fill='%231E1126' fill-rule='nonzero' x='8.00000026' y='0' width='41' height='21'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    width: 53px;
    height: 85px;
    position: absolute;
    top: -16px;
    z-index: 99;
  }
`
