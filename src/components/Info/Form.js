import React, { useContext, useReducer } from 'react'
import { StatusDispatch } from './index'
import { Button, Form, AlertBox, AlertCloseBtn } from './elements'

const formReducer = (state, action) => {
  const { type, payload } = action
  return { ...state, [type]: payload }
}

export default ({ city, error }) => {

  const initialState = {
    name: '',
    email: '',
    gh: '',
    plusOne: false,
    plusOneName: '',
    plusOneGH: ''
  }

  const [formState, formDispatch] = useReducer(formReducer, initialState)

  const { name, email, gh, plusOne, plusOneName, plusOneGH } = formState

  const dispatch = useContext(StatusDispatch)

  const createUser = () => {
    if (name && email) {
      if (plusOne && !plusOneName) return

      // encodeURI does not encode special character, instead used
      // encodeURIComponent which encodes all special characters.
      fetch(
        `/.netlify/functions/register?name=${name}&github=${gh || 'react-robins'
        }&city=${city}&email=${encodeURIComponent(email)}`
      ).then((res) => {
        //
        if (res && res.status === 500) {
          dispatch({ type: "error", payload: { message: res } })
          dispatch({ type: "open", payload: true })
          dispatch({ type: "submitted", payload: false })
        } else {
          dispatch({ type: "error", payload: { message: '' } })
          dispatch({ type: "open", payload: false })
          dispatch({ type: "submitted", payload: true })
        }
      })

      if (plusOne) {
        fetch(
          `/.netlify/functions/register?name=${plusOneName}&github=${plusOneGH || 'react-robins'
          }&city=${city}`
        )
          .then((res) => res.text())
          .then((text) => console.log(text))
      }
    }
  }

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        createUser()
      }}
    >
      <p>
        If you're not comfortable showing your photo and link, you may leave the `GitHub Handle`
        field blank and it will default to `react-robins`.
      </p>
      <label htmlFor="name">
        Your Name
        <input
          required
          id="name"
          placeholder="Name"
          type="text"
          minLength="2"
          value={name}
          onChange={(e) => formDispatch({ type: "name", payload: e.target.value })}
        />
      </label>
      <label htmlFor="gh">
        Github Handle
        <input
          id="gh"
          type="text"
          placeholder="react-robins"
          pattern="[A-Za-z0-9-]{1,30}"
          value={gh}
          onInvalid={(e) =>
            e.target.setCustomValidity(
              `A GitHub handle, e.g. 'react-robins' for 'https://github.com/react-robins'`
            )
          }
          onChange={(e) => formDispatch({ type: "gh", payload: e.target.value.trim() })}
          onInput={(e) => e.target.setCustomValidity('')}
        />
      </label>
      <label htmlFor="email">
        E-Mail Address
        <input
          required
          id="email"
          type="email"
          pattern="[a-z0-9._+%-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          value={email}
          onInvalid={(e) => e.target.setCustomValidity(`Please provide a valid e-mail address.`)}
          onChange={(e) => formDispatch({ type: "email", payload: e.target.value.trim() })}
          onInput={(e) => e.target.setCustomValidity('')}
        />
      </label>
      {/* TODO: PlusOne functionality should only be enabled for in-person events. */}
      {/*     <label
                                               htmlFor="plus-one"
                                               css={`
                                                 display: flex;
                                               `}
                                             >
                                               <input
                                                 id="plus-one"
                                                 type="checkbox"
                                                 pattern="[a-zA-Z0-9]+"
                                                 value={plusOne}
                                                 css={`
                                                   width: auto !important;
                                                   margin-right: 12px !important;
                                                 `}
                                                 onChange={e => setPlusOne(e.target.checked)}
                                               />
                                               <span>I am taking a plus one</span>
                                        </label>*/}
      {plusOne && (
        <label htmlFor="plus-one-name">
          +1 Name
          <input
            required
            id="plus-one-name"
            type="text"
            value={plusOneName}
            onChange={(e) => formDispatch({ type: "plusOneName", payload: e.target.value.trim() })}
          />
        </label>
      )}
      {plusOne && (
        <label htmlFor="plus-one-gh">
          +1 Github Handle
          <input
            id="plus-one-gh"
            type="text"
            placeholder="ReactLadies"
            pattern="[A-Za-z0-9-]{1,30}"
            value={plusOneGH}
            onInvalid={(e) =>
              e.target.setCustomValidity(
                `A GitHub handle, e.g. 'react-robins' for 'https://github.com/react-robins'`
              )
            }
            onChange={(e) => formDispatch({ type: "plusOneGH", payload: e.target.value.trim() })}
            onInput={(e) => e.target.setCustomValidity('')}
          />
        </label>
      )}
      <Button>
        I AM IN{' '}
        <span role="img" aria-label="Party">
          🎉
        </span>
      </Button>
      {error.message !== '' && (
        <AlertBox class="alert">
          <AlertCloseBtn class="closebtn">&times;</AlertCloseBtn>
          <strong>Error!</strong>Something went wrong, please resubmit the form.
        </AlertBox>
      )}
    </Form>
  )
}
