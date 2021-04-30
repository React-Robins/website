import React from 'react'
import { Stripe, SubWrapper, Wrapper } from './elements'

export default ({ stripes, children, ...other }) => {
  const max = 10
  const streeps = new Array(max).fill(undefined);

  return (
    <Wrapper {...other}>
      <SubWrapper length={stripes.length}>
        {streeps.map((_, i) => {
          const { color, size } = stripes[i] || { color: 'black', size: 0 }
          return <Stripe key={i} color={color} size={size} />
        })}
      </SubWrapper>
      {children}
    </Wrapper>
  )
}
