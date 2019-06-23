import React from 'react'
import Rainbow from './Rainbow'

import {useRainbow} from '../../helpers/useRainbow'

export default ({className, ...props}) => {
  const [stripes, {cycle}] = useRainbow()
  return (
    <div className={className} onClick={() => cycle()}>
      <Rainbow {...props} stripes={stripes} />
    </div>
  )
}
