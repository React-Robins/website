import React from 'react'
import useHover from '../../helpers/useHover'

import { format } from 'date-fns'

import { Wrapper, sizes, CityInfo, CityIcon, CityList, Name, MeetupDate, Host } from './elements'

const Cities = ({ children }) => <CityList>{children}</CityList>

const City = ({ past, city, link, date, icon, iconHover, hostIcon, hostName }) => {
  const [hoverRef, isHovering] = useHover()
  return (
    <Wrapper to={link} innerRef={hoverRef}>
      <CityIcon>
        {isHovering && !past ? (
          <img src={iconHover} className="animated bounceIn" css={sizes} alt={city} />
        ) : (
          <img css={sizes} src={icon} alt={city} />
        )}
      </CityIcon>
      <CityInfo>
        <MeetupDate past={past}>{format(date, 'Do MMMM')}</MeetupDate>
        <Name past={past}>{city}</Name>
        <Host past={past} src={hostIcon} alt={hostName} />
      </CityInfo>
    </Wrapper>
  )
}

export default City

export { Cities }
