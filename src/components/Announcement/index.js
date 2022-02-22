import React from 'react'
import styled from 'styled-components'

const DistinctiveDiv = styled.div`
  position: absolute;
  top: 0;
  color: ${(props) => props.theme.offWhite};
  background-color: ${(props) => props.theme.boldPurple};
  width: 100%;
  padding-left: 0.5em;
  padding-right: 0.5em;
`

const BoldTitle = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
`
const StyledText = styled.p`
  max-width: 1110px;
`

const Announcement = ({ message }) => {
  return (
    <DistinctiveDiv>
      <StyledText>
        <BoldTitle>{message.heading}</BoldTitle>: {message.text}
      </StyledText>
    </DistinctiveDiv>
  )
}

export default Announcement
