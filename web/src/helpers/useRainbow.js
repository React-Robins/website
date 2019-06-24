import React, { createContext, useContext, useState } from 'react'
import { toPastel } from './colours'

// helpers for representing flags that have different sized stripes
const sizedStripe = (color, size) => {
  return new Array(size).fill(color)
}
const flatten = (arr) => {
  return arr.reduce((accum, items)=>{
    return accum.concat(items);
  }, [])
}
// helper to make all the flags have a similar number of stripes
const makeSimilarLengths = (longestFlag) => {
  return (stripes) => {
    const multiplier = Math.floor(longestFlag / stripes.length)
    if(multiplier > 1) {
      return flatten(stripes.map(stripe => sizedStripe(stripe, multiplier)))
    } else {
      return stripes
    }
  }
}

// stolen from flag
const gayStripes = ['#FF5D7D', '#FF764E', '#FFC144', '#88DF8E', '#00CCF2', '#B278D3']
const transStripes = ['#55CDFC', '#F7A8B8', '#DDD', '#F7A8B8', '#55CDFC'].map(toPastel)
const biStripes = flatten([sizedStripe('#D9006F',2), '#744D98', sizedStripe('#0033AB',2)]).map(toPastel)
const aceStripes = ['#000000', '#A3A3A3', '#DDD', '#810082'].map(toPastel)
const panStripes = ['#FF008E', '#FFD800', '#00B3FF'].map(toPastel)
const [ blackStripe, blueStripe, redStripe, whiteStripe ] = [
  sizedStripe('#000000', 4), sizedStripe('#0000c0', 4), '#fb0006', sizedStripe('#EEE', 4)
]
const leatherStripes = flatten([
  blackStripe, blueStripe, redStripe, blackStripe, blueStripe,
  whiteStripe, blueStripe, blackStripe, blueStripe, blackStripe
]).map(toPastel)
const bearStripes = ["#4e2801", "#ca4e05", "#fdd951", "#fde2ac", "#EEE", "#424242", "#000000"]

// pastel enough
const lesbianStripes = ['#B60063', '#C84896', '#E253AB', '#DDD', '#F0A7D2', '#D73F4F', '#990200']

const allStripes = [
  gayStripes,
  ...[transStripes, panStripes, biStripes, aceStripes, lesbianStripes, leatherStripes, bearStripes].sort(
    () => 0.5 - Math.random()
  )
].map(makeSimilarLengths(leatherStripes.length))

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
