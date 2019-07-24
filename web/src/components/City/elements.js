import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

export const Wrapper = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 20px;
  border: 3px solid #605367;
  justify-content: center;
  margin-bottom: -3px;
  flex-direction: column;
  @media (min-width: 60em) {
    flex-direction: row;
    padding-top: 40px;
    padding-bottom: 40px;
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
  text-align: center;
  margin-top: 30px;
  @media (min-width: 60em) {
    flex-basis: 50%;
    margin-left: 40px;
    margin-top: 0;
    align-items: flex-start;
  }
`

export const CityIcon = styled.div`
  flex-basis: 50%;
  text-align: center;
  ${sizes}
`

export const Name = styled.h2`
  text-decoration: none;
  font-size: 50px;
  margin: 0;
  font-family: 'NeutraText-Bold';
  ${props =>
    props.past &&
    `
    color: #605367
  `}
`

export const MeetupDate = styled.p`
  font-size: 1em;
  font-weight: bold;
  margin: 0;
  ${props =>
    props.past &&
    `
    color: #605367
  `};
`

export const Host = styled.img`
  height: 40px;
  margin-top: 20px;

  ${props =>
    props.past &&
    `
      opacity: 0.5;
    `}
`
