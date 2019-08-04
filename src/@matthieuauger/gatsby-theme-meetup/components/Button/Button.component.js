import React from 'react'
import StyledButton from './Button.style'

const Button = ({ url, text, type }) => (
  <StyledButton type={type} href={url}>
    {text}
  </StyledButton>
)

export default Button
