import React from 'react'
import Rainbow from './Rainbow'

import { useRainbow } from '../../helpers/useRainbow'

export default ({ className, flag, ...props }) => {
  const [stripes, { cycle }] = useRainbow()
  return (
    <Rainbow
      {...props}
      stripes={flag || stripes}
      style={{ cursor: 'pointer' }}
      className={className}
      onClick={() => !flag && cycle()}
    />
  )
}
