import React from 'react'
import useHover from '../../helpers/useHover'
import Helmet from 'react-helmet';

import { format } from 'date-fns'

import { Wrapper, sizes, CityInfo, CityIcon, Cities, Name, MeetupDate, Host } from './elements'

const City = ({ past, city, link, date, bySeason, icon, iconHover, hostIcon, hostName }) => {
  const [hoverRef, isHovering] = useHover()

  return (
    <Wrapper
      itemScope
      itemType="http://schema.org/Event"
      title={`QueerJS ${city}`}
      to={`/${link}`}
      innerRef={hoverRef}
    >
      <CityIcon>
        {isHovering && !past ? (
          <img src={iconHover.publicURL} className="animated bounceIn" css={sizes} alt={city} />
        ) : (
          <img css={sizes} src={icon.publicURL} alt={city} />
        )}
        {!past && (
          <Helmet>
            <link rel="preload" href={iconHover.publicURL} as="image" />
          </Helmet>
        )}
      </CityIcon>
      <CityInfo>
        <MeetupDate itemprop={date} content="2013-09-14T21:30" past={past}>
          {bySeason ?
            <span>{bySeason}</span>
          :
            format(date, 'Do MMMM')
          }
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
