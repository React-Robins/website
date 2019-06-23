import React, {createContext, useContext, useState} from 'react'

const gayStripes = ['#FF5D7D', '#FF764E', '#FFC144', '#88DF8E', '#00CCF2', '#B278D3']
const transStripes = ['hotpink', 'aliceblue', 'white', 'aliceblue', 'hotpink']
const catalanStripes = ['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'red', 'yellow']

const allStripes = [gayStripes, transStripes, catalanStripes]

const useStripesInCtx = () => {
  const [stripes, setStripes] = useState(0)
  const cycle = () => setStripes(s => (allStripes[s + 1] ? s + 1 : 0))
  return [allStripes[stripes], {cycle}]
}

const RainbowContext = createContext(null)

const RainbowProvider = ({children}) => (
  <RainbowContext.Provider value={useStripesInCtx()}>{children}</RainbowContext.Provider>
)
const useRainbow = () => useContext(RainbowContext)

export {RainbowProvider, useRainbow}
