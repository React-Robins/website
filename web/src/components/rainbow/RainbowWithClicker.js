import React, {useState, useMemo} from 'react'
import styled from 'styled-components'
import Rainbow from './Rainbow'

const gayStripes = ['#FF5D7D', '#FF764E', '#FFC144', '#88DF8E', '#00CCF2', '#B278D3']
const transStripes = ['hotpink', 'aliceblue', 'white', 'aliceblue', 'hotpink']
const catalanStripes = ['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'red', 'yellow']

const allStripes = [gayStripes, transStripes, catalanStripes]

const useStripes = () => {
  const [stripes, setStripes] = useState(0)
  const cycle = () => setStripes(s => (allStripes[s + 1] ? s + 1 : 0))
  return [allStripes[stripes], {cycle}]
}

export default ({className, ...props}) => {
  const [stripes, {cycle}] = useStripes()
  return (
    <div className={className} onClick={() => cycle()}>
      <Rainbow {...props} stripes={stripes} />
    </div>
  )
}
