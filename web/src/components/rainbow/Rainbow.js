import React, { useMemo } from 'react'
import { Stripe, SubWrapper, Wrapper } from './elements'

export const max = 37

export default ({ stripes, children, ...other }) => {
  const streeps = useMemo(() => new Array(max).fill(undefined), [max])

  return (
    <Wrapper {...other}>
      <SubWrapper length={stripes.length}>
        {streeps.map((_, i) => (
          <Stripe key={i} color={stripes[i] || 'black'} />
        ))}
      </SubWrapper>
      {children}
    </Wrapper>
  )
}
