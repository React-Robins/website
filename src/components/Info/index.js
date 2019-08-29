import React, { useState } from 'react'
import { format, parse } from 'date-fns'
import Airtable from 'airtable'

import Flag from '../icons/flag'
import Calendar from '../icons/calendar'

import { Info, Button, RsvpButton, Form, Blinker, Bouncer } from './elements'

var base = new Airtable({ apiKey: process.env.GATSBY_AIRTABLE_KEY }).base('appXX3u6yUPjqQFrE')

export default ({ site, city, info }) => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [gh, setGH] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const createUser = () => {
    if (name && gh) {
      const doc = {
        city: city,
        name: name,
        ghLink: gh
      }

      base('all').create(doc, function(err, record) {
        if (err) {
          console.error(err)
          return
        }
        console.log(`Human was created, document ID is ${record.getId()}`)
      })
    }
  }
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
        <Form
          onSubmit={e => {
            e.preventDefault()
            setOpen(false)
            setSubmitted(true)
          }}
        >
          <label htmlFor="name">
            Name
            <input
              required
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
          <label htmlFor="gh">
            Github Username
            <input
              required
              id="gh"
              type="text"
              value={gh}
              onChange={e => setGH(e.target.value.trim())}
            />
          </label>

          <Button onClick={createUser}>I AM IN 🎉</Button>
        </Form>
      )}
    </>
  )
}
