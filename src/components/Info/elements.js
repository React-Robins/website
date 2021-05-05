import styled, { keyframes } from 'styled-components'

export const Info = styled.div`
  display: flex;
  flex-direction: row;
  border: 3px solid ${props => props.theme.boldAqua};
  align-items: center;
  margin-bottom: 10px;
  font-family: 'Space Mono';
  position: relative;
  justify-content: space-between;

  span {
    width: 50%;
    padding: 1em 1.5em;

    &:not(:first-of-type) {
      border-left: 3px solid ${props => props.theme.boldAqua};
    }
  }
`

export const Button = styled.button`
  padding: 1em;
  background: ${props => props.theme.boldAqua};
  -webkit-appearance: none;
  border: none;
  width: 100%;
  font-family: 'Space Mono';
  font-weight: 600;
  font-size: 1em;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    transform: scale(1.025);
  }
`

export const RsvpButton = styled(Button)`
  padding: 1em;
  background: ${props => props.theme.boldAqua};
  -webkit-appearance: none;
  border: none;
  width: 100%;
  font-family: 'Space Mono';
  font-weight: 600;
  margin-bottom: 50px;
  font-size: 1em;
  cursor: pointer;

  a {
    color: ${props => props.theme.offWhite};
  }

  &:hover {
    transform: scale(1.025);
  }

  strong {
    text-decoration: underline;
  }
`

export const Form = styled.form`
  color: ${props => props.theme.boldAqua};
  -webkit-appearance: none;
  border: 3px solid ${props => props.theme.boldAqua};
  width: 100%;
  font-family: 'Space Mono';
  font-weight: 600;
  margin-bottom: 50px;
  padding: 4em;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  input {
    padding: 8px 12px;
    border: 1px solid ${props => props.theme.boldPurple};
    margin: 5px 0 20px;
    width: 100%;
    display: block;
  }

  label {
    text-decoration: underline;
  }
`

export const blink = keyframes`
  from {
    opacity: 0;
    transform: scale(1)

  }

  to {
    opacity: 1;
    transform: scale(1.2)
  }
`

export const Blinker = styled.span`
  animation: ${blink} 0.5s ${p => p.delay / 10}s linear infinite alternate;
  display: inline-block;
`

export const bounc = keyframes`
  from {
    transform: scale(1)
  }
  to {
    transform: scale(1.1)
  }
`

export const Bouncer = styled.strong`
  animation: ${bounc} 0.5s linear infinite alternate;
  display: inline-block;
`
