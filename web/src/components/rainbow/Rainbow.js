import React, { useMemo } from 'react'
import styled from 'styled-components'

const max = 8

const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
`

const SubWrapper = styled.div`
  transform-origin: top;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transform: scaleY(${({ length }) => max / length});
  transition: 1s;
`

const Stripe = styled.div`
  height: auto;
  flex: 1 1 0;
  width: 100%;
  background-color: ${({ color }) => color};
  transition: 1s;
`

export default ({ stripes }) => {
  const streeps = useMemo(() => new Array(max).fill(undefined), [max])

  return (
    <Wrapper>
      <SubWrapper length={stripes.length}>
        {streeps.map((_, i) => {
          if (stripes[i]) {
            return <Stripe key={i} color={stripes[i]} />
          } else {
            return <Stripe key={i} />
          }
        })}
      </SubWrapper>
    </Wrapper>
  )
}
