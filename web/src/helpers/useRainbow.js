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
export const aceStripes = ['#000000', '#A3A3A3', '#DDD', '#810082'].map(toSizedPastelStrip)
const [smallBlackStripe, greyStripe, smallWhiteStripe, greenStripe] = [
  '#000',
  sizedStripe('#BBC3C6', 2),
  sizedStripe('#FEFEFE', 2),
  sizedStripe('#B7F582', 2)
]
const agenderStripes = [
  smallBlackStripe,
  greyStripe,
  smallWhiteStripe,
  greenStripe,
  smallWhiteStripe,
  greyStripe,
  smallBlackStripe
].map(toSizedPastelStrip)
const aromanticStripes = ['#3BA441', '#A8D378', '#FEFEFE', '#A9A9A9', '#000'].map(
  toSizedPastelStrip
)
const bearStripes = ['#4e2801', '#ca4e05', '#fdd951', '#fde2ac', '#EEE', '#424242', '#000000'].map(
  toSizedPastelStrip
)
const lazyBiBoy = [sizedStripe('#D9006F', 2), '#744D98'].map(toSizedPastelStrip)
const lazyBiGirl = ['#744D98', sizedStripe('#0033AB', 2)].map(toSizedPastelStrip)

export const biStripes = [sizedStripe('#D9006F', 2), '#744D98', sizedStripe('#0033AB', 2)].map(
  toSizedPastelStrip
)
export const fluidStripes = ['#FE75A4', '#FFFFFF', '#A90FC0', '#000000', '#303CBE'].map(
  toSizedPastelStrip
)
const genderqueerStripes = ['#B999DD', '#FEFEFE', '#6A8C3A'].map(toSizedPastelStrip)
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
const nonBinaryStripes = ['#FDF333', '#FEFEFE', '#9858CF', '#2D2D2D'].map(toSizedPastelStrip)
const panStripes = ['#FF008E', '#FFD800', '#00B3FF'].map(toSizedPastelStrip)
const phillyStripes = [
  '#000',
  '#794F18',
  '#E40400',
  '#FE8C00',
  '#FFED00',
  '#008126',
  '#064EFF',
  '#750687'
].map(toSizedPastelStrip)
const polyStripes = ['#F71BB9', '#08D569', '#1C91F6'].map(toSizedPastelStrip)
export const transStripes = ['#55CDFC', '#F7A8B8', '#DDD', '#F7A8B8', '#55CDFC'].map(
  toSizedPastelStrip
)

// pastel enough
export const lesbianStripes = [
  '#B60063',
  '#C84896',
  '#E253AB',
  '#DDD',
  '#F0A7D2',
  '#D73F4F',
  '#990200'
].map(toSizedStripe)

export const allStripes = [
  { stripes: gayStripes, name: 'Gay' },
  ...[
    { stripes: aceStripes, name: 'Asexual' },
    { stripes: agenderStripes, name: 'Agender' },
    { stripes: aromanticStripes, name: 'Aromantic' },
    { stripes: bearStripes, name: 'Bear' },
    { stripes: biStripes, name: 'Bisexual' },
    { stripes: fluidStripes, name: 'Genderfluid' },
    { stripes: genderqueerStripes, name: 'Genderqueer' },
    { stripes: leatherStripes, name: 'Leather' },
    { stripes: lesbianStripes, name: 'Lesbian' },
    { stripes: nonBinaryStripes, name: 'Non-Binary' },
    { stripes: panStripes, name: 'Pansexual' },
    { stripes: phillyStripes, name: `Philly's pride flag` },
    { stripes: polyStripes, name: 'Poly' },
    { stripes: transStripes, name: 'Trans' },
    { stripes: lazyBiBoy, name: 'Lazy bisexual (boy)' },
    { stripes: lazyBiGirl, name: 'Lazy bisexual (girl)' }
  ].sort(() => 0.5 - Math.random())
]

const useStripesInCtx = () => {
  const [stripes, setStripes] = useState(0)
  const cycle = () => setStripes(s => (s + 1) % allStripes.length)
  return [allStripes[stripes].stripes, { cycle }]
}

const RainbowContext = createContext([gayStripes, {}])

const RainbowProvider = ({ children }) => (
  <RainbowContext.Provider value={useStripesInCtx()}>{children}</RainbowContext.Provider>
)

const useRainbow = () => useContext(RainbowContext)

export { RainbowProvider, useRainbow }
