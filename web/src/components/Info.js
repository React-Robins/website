import React, {useState} from 'react'
import styled, {keyframes} from 'styled-components'
import format from 'date-fns/format'

import Flag from './icons/flag'
import Calendar from './icons/calendar'
import sanityClient from '@sanity/client'

const Info = styled.div`
  display: flex;
  flex-direction: row;
  border: 3px solid ${props => props.theme.white};
  align-items: center;
  margin-bottom: 10px;
  font-family: 'Roboto Mono';
  position: relative;
  justify-content: space-between;

  span {
    width: 50%;
    padding: 1em 1.5em;

    &:last-of-type {
      border-left: 3px solid ${props => props.theme.white};
    }
  }
`

const Button = styled.button`
  padding: 1em;
  background: ${props => props.theme.white};
  -webkit-appearance: none;
  border: none;
  width: 100%;
  font-family: 'Roboto Mono';
  font-weight: 600;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    transform: scale(1.025);
  }
`

const RsvpButton = styled(Button)`
  padding: 1em;
  background: ${props => props.theme.white};
  -webkit-appearance: none;
  border: none;
  width: 100%;
  font-family: 'Roboto Mono';
  font-weight: 600;
  margin-bottom: 50px;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    transform: scale(1.025);
  }

  strong {
    text-decoration: underline;
  }
`

const Form = styled.form`
  color: ${props => props.theme.white};
  -webkit-appearance: none;
  border: 3px solid ${props => props.theme.white};
  width: 100%;
  font-family: 'Roboto Mono';
  font-weight: 600;
  margin-bottom: 50px;
  padding: 4em;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  input {
    padding: 8px 12px;
    border: 1px solid ${props => props.theme.lightGrey};
    margin: 5px 0 20px;
    width: 100%;
    display: block;
  }

  label {
    text-decoration: underline;
    margin-right: 10px;
  }
`

const blink = keyframes`
  from {
    opacity: 0;
    transform: scale(1)

  }

  to {
    opacity: 1;
    transform: scale(1.2)
  }
`

const Blinker = styled.span`
  animation: ${blink} 0.5s ${p => p.delay / 10}s linear infinite alternate;
  display: inline-block;
`

const bounc = keyframes`
  from {
    transform: scale(1)
  }
  to {
    transform: scale(1.1)
  }
`

const Bouncer = styled.strong`
  animation: ${bounc} 0.5s linear infinite alternate;
  display: inline-block;
`

export default ({site}) => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [gh, setGH] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const client = sanityClient({
    projectId: 'atggkqis',
    dataset: 'production',
    token:
      'skHtAQAA3FfHcKm6kRQmBNaE2Puzw0BqoKkBBJeXCrezlGioYwp3YywbFVRcRiXuptoCOT9CFAI1rBrVq5nqrGw6FdvYWmtitz69eIO5LynHtfgHh0yiM3dfVLaOY9HP98DAasbWwmebtL4ldtKRFjW1ZXx9MjFIDtIG2eTYznHOhIIzifm9', // or leave blank to be anonymous user
    useCdn: true
  })

  const createUser = () => {
    if (name && gh) {
      const doc = {
        _type: 'attendee',
        name: name,
        ghLink: gh
      }

      client.create(doc).then(res => {
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
          <a href='https://goo.gl/maps/VV6YUwPJaT79ESGG9' target='_blank'>
            {site.location}
          </a>
        </span>

        <span>
          <a href='https://www.google.com/calendar/render?action=TEMPLATE&text=QueerJS&location=Adalbertstra%C3%9Fe+8%2C+10999+Berlin&dates=20190723T170000Z%2F20190723T193000Z'>
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
          <div>
            <label htmlFor='name'>Name</label>
            <input
              required
              value={name}
              onChange={e => setName(e.target.value)}
              id='name'
              type='text'
            />
          </div>
          <div>
            <label htmlFor='gh'>Github Username</label>
            <input required id='gh' value={gh} onChange={e => setGH(e.target.value)} type='text' />
          </div>

          <Button onClick={createUser}>I AM IN 🎉</Button>
        </Form>
      )}
    </>
  )
}
