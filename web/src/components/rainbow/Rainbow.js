import React, {useMemo} from 'react'
import styled from 'styled-components'

const max = 8

const Wrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
`

const SubWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transform-origin: top;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transform: scaleY(${({length}) => max / length});
  transition: 1s;
  z-index: 9;
`

const Stripe = styled.div`
  height: auto;
  flex: 1 1 0;
  width: 100%;
  background-color: ${({color}) => color};
  transition: 1s;
`

const OverStripes = styled.div`
  position: relative;
  z-index: 10;
`

export default ({stripes, children}) => {
  const streeps = useMemo(() => new Array(max).fill(undefined), [max])

  return (
    <Wrapper>
      <OverStripes>{children}</OverStripes>
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
