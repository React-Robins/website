import React, { useState } from 'react'
import { format, parse, isPast } from 'date-fns'

import RSVP from './Form'
import Flag from '../icons/flag'
import Calendar from '../icons/calendar'

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
        <Flag />
        <span>
          Location:{' '}
          <a href={site.googleMapsLink} target="_blank" title="Location" rel="noopener noreferrer">
            {site.location}
          </a>
        </span>

        <span>
          <a href={site.calendarLink} title="Add to Calendar">
            {info.hour} {format(date, ['Do [of] MMMM '])}
          </a>
        </span>
        <Calendar />
      </Info>
      {!open ? (
        <RsvpButton
          onClick={() => setOpen(true)}
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
              {!submitted ? <Bouncer>RSVP NOW</Bouncer> : <Bouncer>YOU ARE AWESOME</Bouncer>}{' '}
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
