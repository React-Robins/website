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

  > ${InlineRainbow} {
    border-radius: 100%;
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
  list-style: none;
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
    width: 220px;
    padding: 20px;
    transform: translateY(-90%);
    border-radius: 10px;
    border: 3px solid white;
    transition: opacity 200ms ease;
    box-shadow: 0 0 0 3px #1e1126;
    text-align: left;
  }

  &:after {
    opacity: 0;
    transition: opacity 200ms ease;
    content: '';
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='52px' height='72px' viewBox='0 0 52 72' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3Cpath d='M40.0002722,4 C40.0257511,15.8493169 36.417035,27.2918361 29.1738517,38.3275576 C18.3090768,54.8811399 4.32675874,64.3317112 0.625316031,63.991099 C-3.07612668,63.6504867 10.7820088,49.4972472 12.7119156,36.8127058 C13.9093081,28.9427017 13.137992,18.9236501 10.3979673,6.75555101 C10.3129205,6.37786919 10.1913626,4.52937745 10.1913626,4 C18.5733529,4 31.4333192,4 40.0002722,4 Z' id='path-1'%3E%3C/path%3E%3C/defs%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Group' transform='translate(6.000000, 2.000000)'%3E%3Cg id='Rectangle'%3E%3Cpath stroke='%231E1126' stroke-width='6' d='M43.0002653,3.99354929 C43.027045,16.4478429 39.2384444,28.4605136 31.6818922,39.9736844 C21.756873,55.0954538 6.6606152,67.5591513 0.350413063,66.9784772 C-2.19301508,66.7444271 -3.36529921,64.5771569 -2.89222171,62.3481751 C-2.68585908,61.3758639 -2.20424557,60.3393153 -1.39081189,58.922775 C-0.750107095,57.8070305 2.89054787,52.060773 3.88693591,50.383333 C6.30350565,46.3149877 7.98843049,42.8464493 8.98400381,39.6141214 C9.33394963,38.4779523 9.58905954,37.3932781 9.74604695,36.3614597 C10.8797321,28.9101796 10.1358792,19.2478623 7.47125154,7.41459179 C7.33390663,6.80466061 7.19136258,4.80480238 7.19136258,4 L7.19136258,1 L10.1913626,1 C14.6311342,1 14.6311342,1 19.7411601,1 C22.5281258,1 22.5281258,1 25.3639026,1 C33.1963199,1 33.1963199,1 40.0002722,1 L42.9938284,1 L43.0002653,3.99354929 Z' fill='%231E1126' fill-rule='evenodd'%3E%3C/path%3E%3Cpath stroke='%23FFFFFF' stroke-width='3' d='M41.5002688,3.99677465 C41.5263982,16.1486335 37.827707,27.8762248 30.427872,39.150621 C20.7827897,53.8458783 6.06402194,65.9979143 0.487864547,65.4847881 C-1.05117616,65.3431633 -1.72864082,64.0906947 -1.4249057,62.6595972 C-1.26060408,61.8854633 -0.829161244,60.9568942 -0.0900252719,59.6697383 C0.530549559,58.5890488 4.16314839,52.8555067 5.17658028,51.1493731 C7.64853161,46.9877917 9.38069102,43.4220176 10.4175462,40.0556597 C10.7884339,38.8514988 11.0603775,37.6952513 11.2289813,36.5870828 C12.3945201,28.9264406 11.6369356,19.0857562 8.93460943,7.0850714 C8.82714351,6.607829 8.69136258,4.70285569 8.69136258,4 L8.69136258,2.5 L10.1913626,2.5 C14.6311342,2.5 14.6311342,2.5 19.7411601,2.5 C22.5281258,2.5 22.5281258,2.5 25.3639026,2.5 C33.1963199,2.5 33.1963199,2.5 40.0002722,2.5 L41.4970503,2.5 L41.5002688,3.99677465 Z'%3E%3C/path%3E%3C/g%3E%3Crect id='Rectangle' fill='%231E1126' x='4.24983426' y='0' width='41' height='6'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E");    
    background-repeat: no-repeat;
    background-size: contain;
    width: 46px;
    height: 64px;
    position: absolute;
    top: -4px;
    right: 25%;
    z-index: 99;
    pointer-events: none;
  }
`
