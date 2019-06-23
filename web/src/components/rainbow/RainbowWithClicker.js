import React, {useState, useMemo} from 'react'
import styled from 'styled-components'
import Rainbow from './Rainbow'

const gayStripes = ['#FF5D7D', '#FF764E', '#FFC144', '#88DF8E', '#00CCF2', '#B278D3']
const transStripes = ['hotpink', 'aliceblue', 'white', 'aliceblue', 'hotpink']
const catalanStripes = ['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'red', 'yellow']

const allStripes = [gayStripes, transStripes, catalanStripes]

const Wrapper = styled.div`
  width: 200px;
  height: 600px;
`

export default () => {
  const [stripes, setStripes] = useState(0)
  return (
    <Wrapper onClick={() => setStripes(s => (allStripes[s + 1] ? s + 1 : 0))}>
      <Rainbow stripes={allStripes[stripes]} />
    </Wrapper>
  )
}
