import React, { useState } from 'react'
import format from 'date-fns/format'

import Flag from '../icons/flag'
import Calendar from '../icons/calendar'

import { Info, Button, RsvpButton, Form, Blinker, Bouncer } from './elements'
import client from '../../helpers/sanity'

export default ({ site, dataset }) => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [gh, setGH] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const createUser = () => {
    if (name && gh) {
      const doc = {
        _type: 'attendee',
        name: name,
        ghLink: gh
      }

      client(dataset)
        .create(doc)
        .then(res => {
          console.log(`Human was created, document ID is ${res._id}`)
        })
    }
  }

  return (
    <>
      <Info>
        <Flag />
        <span>
          Location:{' '}
          <a href="https://goo.gl/maps/VV6YUwPJaT79ESGG9" target="_blank" rel="noopener noreferrer">
            {site.location}
          </a>
        </span>

        <span>
          <a href="https://www.google.com/calendar/render?action=TEMPLATE&text=QueerJS&location=Adalbertstra%C3%9Fe+8%2C+10999+Berlin&dates=20190723T170000Z%2F20190723T193000Z">
            {format(site.date, ['HH:mm Do [of] MMMM '])}
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
            <input required id="gh" type="text" value={gh} onChange={e => setGH(e.target.value.trim())} />
          </label>

          <Button onClick={createUser}>I AM IN 🎉</Button>
        </Form>
      )}
    </>
  )
}
