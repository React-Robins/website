import React, {useState} from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'

import Flag from './icons/flag'
import Calendar from './icons/calendar'
import sanityClient from '@sanity/client'

const Info = styled.div`
  display: flex;
  flex-direction: row;
  border: 3px solid ${props => props.theme.white};
  align-items: center;
  font-size: 16px;
  margin-bottom: 10px;
  font-family: 'Roboto Mono';
  position: relative;
  justify-content: space-between;

  a {
    text-decoration: none;
  }

  span {
    width: 50%;
    padding: 15px;

    &:last-of-type {
      border-left: 3px solid ${props => props.theme.white};
      padding-left: 40px;
    }
  }
`

const Button = styled.button`
  height: 52px;
  background: ${props => props.theme.white};
  -webkit-appearance: none;
  border: none;
  width: 100%;
  font-family: 'Roboto Mono';
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 50px;

  span {
    text-decoration: underline;
  }
`

const Form = styled.form`
  background: ${props => props.theme.white};
  -webkit-appearance: none;
  border: none;
  width: 100%;
  font-family: 'Roboto Mono';
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 50px;
  color: ${props => props.theme.darkPurple};
  padding: 20px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    padding: 8px 12px;
    border: 1px solid ${props => props.theme.lightGrey};
    border-radius: 4px;
  }

  label {
    text-decoration: underline;
    margin-right: 10px;
  }
`

const Submit = styled.button`
  border: none;
  padding: 2px 12px;
  color: ${props => props.theme.white};
  font-weight: 600;
  background: ${props => props.theme.darkPurple};
  transition: all 200ms ease;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    transform: scale(1.1);
  }
`

//

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

        <span>{format(site.date, ['HH:mm Do [of] MMMM '])}</span>
        <Calendar />
      </Info>
      {!open ? (
        <Button onClick={() => setOpen(true)}>
          {'>>>>'} {!submitted ? <span>RSVP NOW</span> : <span>YOU ARE AWESOME</span>} {'<<<<'}
        </Button>
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

          <Submit onClick={createUser}>ADD HUMAN</Submit>
        </Form>
      )}
    </>
  )
}
