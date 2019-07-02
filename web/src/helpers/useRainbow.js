import React, { createContext, useContext, useState } from 'react'
import { toPastel } from './colours'

// helpers for representing flags that have different sized stripes
const sizedStripe = (color, size) => {
  return {
    color,
    size
  }
}

const toSizedStripe = stripe => {
  if (typeof stripe === 'string') {
    return sizedStripe(stripe, 1)
  } else {
    return stripe
  }
}

const pastelizeStripe = ({ color, size }) => {
  return {
    color: toPastel(color),
    size
  }
}

const toSizedPastelStrip = stripe => pastelizeStripe(toSizedStripe(stripe))

// stolen from flag
export const gayStripes = ['#FF5D7D', '#FF764E', '#FFC144', '#88DF8E', '#00CCF2', '#B278D3'].map(
  toSizedStripe
)
export const transStripes = ['#55CDFC', '#F7A8B8', '#DDD', '#F7A8B8', '#55CDFC'].map(
  toSizedPastelStrip
)
export const biStripes = [sizedStripe('#D9006F', 2), '#744D98', sizedStripe('#0033AB', 2)].map(
  toSizedPastelStrip
)
export const aceStripes = ['#000000', '#A3A3A3', '#DDD', '#810082'].map(toSizedPastelStrip)
const panStripes = ['#FF008E', '#FFD800', '#00B3FF'].map(toSizedPastelStrip)
const [blackStripe, blueStripe, redStripe, whiteStripe] = [
  sizedStripe('#000000', 4),
  sizedStripe('#0000c0', 4),
  '#fb0006',
  sizedStripe('#EEE', 4)
]
const leatherStripes = [
  blackStripe,
  blueStripe,
  redStripe,
  blackStripe,
  blueStripe,
  whiteStripe,
  blueStripe,
  blackStripe,
  blueStripe,
  blackStripe
].map(toSizedPastelStrip)
const bearStripes = ['#4e2801', '#ca4e05', '#fdd951', '#fde2ac', '#EEE', '#424242', '#000000'].map(
  toSizedPastelStrip
)
export const fluidStripes = ['#FE75A4', '#FFFFFF', '#A90FC0', '#000000', '#303CBE'].map(
  toSizedPastelStrip
)

// pastel enough
const lesbianStripes = [
  '#B60063',
  '#C84896',
  '#E253AB',
  '#DDD',
  '#F0A7D2',
  '#D73F4F',
  '#990200'
].map(toSizedStripe)

const allStripes = [
  gayStripes,
  ...[
    transStripes,
    panStripes,
    biStripes,
    aceStripes,
    lesbianStripes,
    leatherStripes,
    bearStripes,
    fluidStripes
  ].sort(() => 0.5 - Math.random())
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
