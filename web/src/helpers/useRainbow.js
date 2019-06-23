import React, {createContext, useContext, useState} from 'react'

const gayStripes = ['#FF0000', '#FF5500', '#FDFF00', '#008400', '#2200FF', '#550087', '#D000FF']
const transStripes = ['#55CDFC', '#F7A8B8', '#DDD', '#F7A8B8', '#55CDFC']
const biStripes = ['#D9006F', '#D9006F', '#744D98', '#0033AB', '#0033AB']
const aceStripes = ['#000000', '#A3A3A3', '#DDD', '#810082']
const panStripes = ['#FF008E', '#FFD800', '#00B3FF']
const lesbianStripes = ['#B60063', '#C84896', '#E253AB', '#DDD', '#F0A7D2', '#D73F4F', '#990200']

const allStripes = [
  gayStripes,
  ...[transStripes, panStripes, biStripes, aceStripes, lesbianStripes].sort(
    () => 0.5 - Math.random()
  )
]

const useStripesInCtx = () => {
  const [stripes, setStripes] = useState(0)
  const cycle = () => setStripes(s => (allStripes[s + 1] ? s + 1 : 0))
  return [allStripes[stripes], {cycle}]
}

const RainbowContext = createContext([gayStripes, {}])

const RainbowProvider = ({children}) => (
  <RainbowContext.Provider value={useStripesInCtx()}>{children}</RainbowContext.Provider>
)
const useRainbow = () => useContext(RainbowContext)

export {RainbowProvider, useRainbow}
