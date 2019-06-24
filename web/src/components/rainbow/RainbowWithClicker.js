import React from 'react'
import Rainbow from './Rainbow'

import {useRainbow} from '../../helpers/useRainbow'

export default ({className, ...props}) => {
  const [stripes, {cycle}] = useRainbow()
  return (
    <Rainbow
      {...props}
      stripes={stripes}
      style={{cursor: 'pointer'}}
      className={className}
      onClick={() => cycle()}
    />
  )
}
