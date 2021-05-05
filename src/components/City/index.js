import React from 'react'
// import useHover from '../../helpers/useHover'

import { format } from 'date-fns'

import { Wrapper, sizes, CityInfo, CityIcon, Cities, Name, MeetupDate, Host } from './elements'

// iconHover,
const City = ({ past, city, link, date, bySeason, icon, hostIcon, hostName }) => {
  // const [hoverRef, isHovering] = useHover()

  return (
    <Wrapper
      itemScope
      itemType="http://schema.org/Event"
      title={`React Ladies ${city}`}
      to={`/${link}`}
      // sinnerRef={hoverRef}
    >
      <CityIcon>
        <img css={sizes} src={icon.publicURL} alt={city} />
      </CityIcon>
      <CityInfo>
        <MeetupDate itemprop={date} content="2013-09-14T21:30" past={past}>
          {bySeason ? <span>{bySeason}</span> : format(date, 'Do MMMM')}
        </MeetupDate>
        <Name past={past} itemprop="name">
          {city}
        </Name>
        {hostIcon && <Host past={past} src={hostIcon.publicURL} alt={hostName} />}
      </CityInfo>
    </Wrapper>
  )
}

export default City

export { Cities }
