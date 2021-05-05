import React from 'react'
import styled from 'styled-components'

const DistinctiveDiv = styled.div`
  background-color: ${props => props.theme.boldPurple};
  color: ${props => props.theme.offWhite};
  margin-bottom: 2.5rem;
  padding: 0.5rem;
  text-align: center;
  border-radius: 10px;
`

const BoldTitle = styled.h2`
  text-align: center;
  text-transform: uppercase;
`

const Announcement = ({ message }) => {
  return (
    <DistinctiveDiv>
      <BoldTitle>{message.heading}</BoldTitle>
      <p>{message.text}</p>
    </DistinctiveDiv>
  )
}

export default Announcement
