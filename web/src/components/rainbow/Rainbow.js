import React, {useMemo} from 'react'
import styled from 'styled-components'

const max = 8

const Stripe = styled.div`
  height: auto;
  flex: 1 1 0;
  width: 100%;
  background-color: ${({color}) => color};
  transition: transform 0.2s, background-color 0.4s;
  margin: -0.5px 0;
`

const SubWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: top;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transform: scaleY(${({length}) => max / length});
  transition: transform 0.2s;
`

const Wrapper = styled.div`
  overflow: hidden;
  width: auto;
  height: 100%;
  position: relative;
  
  > :not(${SubWrapper}) {
    position: relative;
  }
`

export default ({stripes, children, ...other}) => {
  const streeps = useMemo(() => new Array(max).fill(undefined), [max])

  return (
    <Wrapper {...other}>
      <SubWrapper length={stripes.length}>
        {streeps.map((_, i) => <Stripe key={i} color={stripes[i] || 'black'} />)}
      </SubWrapper>
      {children}
    </Wrapper>
  )
}
