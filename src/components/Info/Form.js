import React, { useState } from 'react'
import createRecord from '../../helpers/airtable'
import { Button, Form } from './elements'

export default ({ onSubmit, city }) => {
  const [plus, setPlus] = useState(false)
  const [plusOneName, setPlusOneName] = useState('')
  const [name, setName] = useState('')
  const [gh, setGH] = useState('')

  const createUser = () => {
    if (name && gh) {
      if (plus && !plusOneName) return

      createRecord({
        city: city,
        name: name,
        ghLink: gh
      })

      if (plus) {
        createRecord({
          city: city,
          name: plusOneName,
          ghLink: 'queerjs'
        })
      }
    }
  }

  return (
    <Form
      onSubmit={e => {
        e.preventDefault()
        createUser()
        onSubmit()
      }}
    >
      <p>
        If you are not conformable showing your photo and link please put `QueerJS` in the Github
        Username input
      </p>
      <label htmlFor="name">
        Name
        <input
          required
          id="name"
          type="text"
          minLength="2"
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
          pattern="[A-Za-z0-9-]{1,30}"
          value={gh}
          onChange={e => setGH(e.target.value.trim())}
        />
      </label>
      <label
        htmlFor="plus-one"
        css={`
          display: flex;
        `}
      >
        <input
          id="plus-one"
          type="checkbox"
          pattern="[a-zA-Z0-9]+"
          value={plus}
          css={`
            width: auto !important;
            margin-right: 12px !important;
          `}
          onChange={e => setPlus(e.target.checked)}
        />
        <span>I am taking a plus one</span>
      </label>
      {plus && (
        <label htmlFor="plus-one-name">
          +1 Name
          <input
            required
            id="plus-one-name"
            type="text"
            value={plusOneName}
            onChange={e => setPlusOneName(e.target.value.trim())}
          />
        </label>
      )}

      <Button>
        I AM IN{' '}
        <span role="img" aria-label="Party">
          🎉
        </span>
      </Button>
    </Form>
  )
}
