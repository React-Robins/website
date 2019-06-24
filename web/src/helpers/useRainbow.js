import React, { createContext, useContext, useState } from 'react'
import { toPastel } from './colours'

// stolen from flag
const gayStripes = ['#FF5D7D', '#FF764E', '#FFC144', '#88DF8E', '#00CCF2', '#B278D3']
const transStripes = ['#55CDFC', '#F7A8B8', '#DDD', '#F7A8B8', '#55CDFC'].map(toPastel)
const biStripes = ['#D9006F', '#D9006F', '#744D98', '#0033AB', '#0033AB'].map(toPastel)
const aceStripes = ['#000000', '#A3A3A3', '#DDD', '#810082'].map(toPastel)
const panStripes = ['#FF008E', '#FFD800', '#00B3FF'].map(toPastel)
// pastel enough
const lesbianStripes = ['#B60063', '#C84896', '#E253AB', '#DDD', '#F0A7D2', '#D73F4F', '#990200']

const allStripes = [
  gayStripes,
  ...[transStripes, panStripes, biStripes, aceStripes, lesbianStripes].sort(
    () => 0.5 - Math.random()
  )
]

const useStripesInCtx = () => {
  const [stripes, setStripes] = useState(0)
  const cycle = () => setStripes(s => (s + 1) % allStripes.length)
  return [allStripes[stripes], { cycle }]
}

const RainbowContext = createContext([gayStripes, {}])

const RainbowProvider = ({ children }) => (
  <RainbowContext.Provider value={useStripesInCtx()}>{children}</RainbowContext.Provider>
)

const useRainbow = () => useContext(RainbowContext)

export { RainbowProvider, useRainbow }
