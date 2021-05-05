import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

export const Name = styled.h2`
  text-decoration: none;
  font-size: 4em;
  margin: 0;
  padding: 0;
  line-height: 1;
  vertical-align: 0;
  font-family: 'NeutraText-Bold';
  position: relative;
  z-index: 1;
  ${props =>
    props.past &&
    css`
      color: ${props => props.theme.boldBlue};
    `};
  ${props =>
    !props.past &&
    css`
      @supports (background-clip: text) {
        background: rgb(100, 69, 199);
        background-clip: text;
        color: transparent;
      }
      @supports (-webkit-background-clip: text) {
        background: rgb(100, 69, 199);
        -webkit-background-clip: text;
        color: transparent;
      }
    `}
`
export const Wrapper = styled(Link)`
  display: flex;
  align-items: stretch;
  text-decoration: none;
  padding: 0 0 1.5em;
  border-bottom: 4px solid ${props => props.theme.boldBlue};
  justify-content: center;
  flex-direction: column;
  margin-bottom: 4em;

  &:hover {
    ${Name} {
      text-decoration: underline;
    }
  }
`
export const sizes = css`
  width: 95px;
  height: 95px;
  @media (min-width: 60em) {
    width: 190px;
    height: 190px;
  }
`

export const CityInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 0;
  border-radius: 10px;
`

export const CityIcon = styled.div`
  flex-basis: 50%;
  text-align: center;
  align-self: flex-end;
  margin-bottom: -5em;
  margin-top: -1em;
  transform: rotate(1deg);
  z-index: 0;
  ${sizes};
`

export const MeetupDate = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.boldBlue};
  margin: 0 0 0.5em;
  font-weight: 400;
`

export const Host = styled.img`
  height: 1.75em;
  margin-top: 0.25em;
  align-self: flex-start;
  ${props =>
    props.past &&
    `
      opacity: 0.5;
    `};
`

export const Cities = styled.div`
  @media screen and (min-width: 56em) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 4em;
  }
`
