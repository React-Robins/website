import React from 'react'
import styled from 'styled-components'

const DistinctiveDiv = styled.div`
  background-color: ${props => props.theme.lightGrey};
  color: ${props => props.theme.darkPurple};
  margin-bottom: 2.5rem;
  padding: 0.5rem;
  text-align: center;
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

export default Announcement;