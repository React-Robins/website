import React, { useState } from 'react'
import { format, parse } from 'date-fns'

import RSVP from './Form'
import Flag from '../icons/flag'
import Calendar from '../icons/calendar'

import { Info, RsvpButton, Blinker, Bouncer } from './elements'

export default ({ site, city, info }) => {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const date = parse(info.date, 'L', new Date())

  return (
    <>
      <Info>
        <Flag />
        <span>
          Location:{' '}
          <a href={site.googleMapsLink} target="_blank" rel="noopener noreferrer">
            {site.location}
          </a>
        </span>

        <span>
          <a href={site.calendarLink}>
            {info.hour} {format(date, ['Do [of] MMMM '])}
          </a>
        </span>
        <Calendar />
      </Info>
      {!open ? (
        <RsvpButton
          onClick={() => setOpen(true)}
          style={
            submitted
              ? {
                  pointerEvents: 'none'
                }
              : {}
          }
        >
          <Blinker delay={0}>{'>'}</Blinker>
          <Blinker delay={1}>{'>'}</Blinker>
          <Blinker delay={2}>{'>'}</Blinker>
          <Blinker delay={3}>{'>'}</Blinker>{' '}
          {!submitted ? <Bouncer>RSVP NOW</Bouncer> : <Bouncer>YOU ARE AWESOME</Bouncer>}{' '}
          <Blinker delay={3}>{'<'}</Blinker>
          <Blinker delay={2}>{'<'}</Blinker>
          <Blinker delay={1}>{'<'}</Blinker>
          <Blinker delay={0}>{'<'}</Blinker>
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
