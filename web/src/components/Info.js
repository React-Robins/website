import React from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'

const Info = styled.div`
  display: flex;
  flex-direction: row;
  border: 2px solid ${props => props.theme.white};
  align-items: center;
  font-size: 16px;
  margin-bottom: 40px;
  font-family: 'Roboto Mono';
  justify-content: space-between;

  span {
    width: 50%;
    padding: 15px;

    &:last-of-type {
      border-left: 2px solid ${props => props.theme.white};
      text-align: right;
    }
  }
`

export default ({site}) => {
  return (
    <Info>
      <span>
        Location:{' '}
        <a href='https://goo.gl/maps/VV6YUwPJaT79ESGG9' target='_blank'>
          {site.location}
        </a>
      </span>

      <span>{format(site.date, ['DD/MM HH:mm'])}</span>
    </Info>
  )
}
