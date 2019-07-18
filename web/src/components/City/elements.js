import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

export const Wrapper = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 3px solid #605367;
  justify-content: center;
`
export const sizes = css`
  width: 190px;
  height: 190px;
`

export const CityInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
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
  font-size: 30px;
  font-weight: bold;
  margin: 0;
  ${props =>
    props.past &&
    `
    color: #605367
  `}
`

export const Host = styled.img`
  height: 50px;
  margin-top: 10px;

  ${props =>
    props.past &&
    `
      opacity: 0.5;
    `}
`
