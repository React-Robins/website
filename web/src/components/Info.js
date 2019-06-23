import React from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'

import Flag from './icons/flag'
import Calendar from './icons/calendar'

const Info = styled.div`
  display: flex;
  flex-direction: row;
  border: 3px solid ${props => props.theme.white};
  align-items: center;
  margin-bottom: 40px;
  font-family: 'Roboto Mono';
  position: relative;
  justify-content: space-between;

  a {
    text-decoration: none;
  }

  span {
    width: 50%;
    padding: 15px;

    &:last-of-type {
      border-left: 3px solid ${props => props.theme.white};
      padding-left: 40px;
    }
  }
`

export default ({ site }) => {
  return (
    <Info>
      <Flag />
      <span>
        Location:{' '}
        <a href="https://goo.gl/maps/VV6YUwPJaT79ESGG9" target="_blank">
          {site.location}
        </a>
      </span>

      <span>{format(site.date, ['HH:mm Do [of] MMMM '])}</span>
      <Calendar />
    </Info>
  )
}
