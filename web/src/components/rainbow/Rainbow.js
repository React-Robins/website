import React, { useMemo } from 'react'
import { Stripe, SubWrapper, Wrapper } from './elements'

const max = 10

export default ({ stripes, children, ...other }) => {
  const streeps = useMemo(() => new Array(max).fill(undefined), [max])

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
