import React, {useState, useMemo} from 'react'
import styled from 'styled-components'

const max = 7
const gayStripes = ['#FF5D7D', '#FF764E', '#FFC144', '#88DF8E', '#00CCF2', '#B278D3']
const transStripes = ['hotpink', 'aliceblue', 'white', 'aliceblue', 'hotpink']

const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
`

const SubWrapper = styled.div`
  transform-origin: top;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transform: scale(${({length}) => max / length});
  transition: 1s;
`

const Stripe = styled.div`
  height: auto;
  flex: 1 1 0;
  width: 100%;
  background-color: ${({color}) => color};
  transition: 1s;
`

export default ({_stripes}) => {
  const [stripes, setStripes] = useState(false)
  const streeps = useMemo(() => new Array(max).fill(undefined), [max])

  const useStripes = stripes ? gayStripes : transStripes

  return (
    <>
      <button onClick={() => setStripes(s => !s)}>sadfsdfsdf</button>
      <Wrapper>
        <SubWrapper length={useStripes.length}>
          {streeps.map((_, i) => {
            if (useStripes[i]) {
              return <Stripe color={useStripes[i]} />
            } else {
              return <Stripe />
            }
          })}
        </SubWrapper>
      </Wrapper>
    </>
  )
}
