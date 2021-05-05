import React, { useState } from 'react'
import { format, parse, isPast } from 'date-fns'

import RSVP from './Form'

import { Info, RsvpButton, Blinker, Bouncer } from './elements'

export default ({ site, city, info, attendeesNumber }) => {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const date = parse(info.date, 'L', new Date())
  const closeRSVP =
    (info.maxCapacity && attendeesNumber >= info.maxCapacity) ||
    info.rsvpsClosed ||
    isPast(parse(info.date))

  return (
    <>
      <Info>
        <span>
          Location:{' '}
          <a href={site.googleMapsLink} target="_blank" title="Location" rel="noopener noreferrer">
            {site.location}
          </a>
        </span>

        <span>
          {info.bySeason ? (
            <p>{info.bySeason}</p>
          ) : (
            <a href={site.calendarLink} title="Add to Calendar">
              {info.hour} {format(date, ['Do [of] MMMM '])}
            </a>
          )}
        </span>
      </Info>
      {!open ? (
        <RsvpButton
          onClick={() => (!site.rsvpLink ? setOpen(true) : () => {})}
          style={
            submitted || closeRSVP
              ? {
                  pointerEvents: 'none'
                }
              : {}
          }
        >
          {!closeRSVP ? (
            <>
              <Blinker delay={0}>{'>'}</Blinker>
              <Blinker delay={1}>{'>'}</Blinker>
              <Blinker delay={2}>{'>'}</Blinker>
              <Blinker delay={3}>{'>'}</Blinker>{' '}
              {site.rsvpLink && (
                <Bouncer>
                  <a target="_blank" rel="noopener noreferrer" href={site.rsvpLink}>
                    RSVP NOW
                  </a>
                </Bouncer>
              )}
              {!site.rsvpLink && !submitted ? <Bouncer>RSVP NOW</Bouncer> : null}{' '}
              {!site.rsvpLink && submitted ? <Bouncer>YOU ARE AWESOME</Bouncer> : null}
              <Blinker delay={3}>{'<'}</Blinker>
              <Blinker delay={2}>{'<'}</Blinker>
              <Blinker delay={1}>{'<'}</Blinker>
              <Blinker delay={0}>{'<'}</Blinker>
            </>
          ) : (
            'RSVPs are now closed'
          )}
        </RsvpButton>
      ) : (
        <RSVP
          city={city}
          onSubmit={() => {
            setOpen(false)
            setSubmitted(true)
          }}
        />
      )}
    </>
  )
}
