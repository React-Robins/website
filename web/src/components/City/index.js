import React from 'react'
import useHover from '../../helpers/useHover'

import { Wrapper, sizes, CityInfo, Name, MeetupDate, Host } from './elements'

const City = ({ city, link, date, icon, iconHover, hostIcon, hostName }) => {
  const [hoverRef, isHovering] = useHover()
  return (
    <Wrapper to={link} innerRef={hoverRef}>
      <div css={sizes}>
        {isHovering ? (
          <img src={iconHover} className="animated bounceIn" css={sizes} alt={city} />
        ) : (
          <img css={sizes} src={icon} alt={city} />
        )}
      </div>
      <CityInfo>
        <Name>{city}</Name>
        <MeetupDate>{date}</MeetupDate>
        <Host src={hostIcon} alt={hostName} />
      </CityInfo>
    </Wrapper>
  )
}

export default City
