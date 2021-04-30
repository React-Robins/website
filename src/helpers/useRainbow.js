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
export const nonBinaryStripes = ['#FDF333', '#FEFEFE', '#9858CF', '#2D2D2D'].map(toSizedPastelStrip)
const panStripes = ['#FF008E', '#FFD800', '#00B3FF'].map(toSizedPastelStrip)
export const phillyStripes = [
  '#000',
  '#794F18',
  '#E40400',
  '#FE8C00',
  '#FFED00',
  '#008126',
  '#064EFF',
  '#750687'
].map(toSizedPastelStrip)
const polysexualStripes = ['#F71BB9', '#08D569', '#1C91F6'].map(toSizedPastelStrip)
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
  {
    stripes: gayStripes,
    name: 'Rainbow',
    wiki: 'https://en.wikipedia.org/wiki/Rainbow_flag_(LGBT_movement)'
  },
  { stripes: aceStripes, name: 'Asexual', wiki: 'https://en.wikipedia.org/wiki/Asexuality' },
  { stripes: agenderStripes, name: 'Agender', wiki: 'https://en.wikipedia.org/wiki/Agender' },
  {
    stripes: aromanticStripes,
    name: 'Aromantic',
    wiki: 'https://en.wikipedia.org/wiki/Romantic_orientation#Aromanticism'
  },
  {
    stripes: bearStripes,
    name: 'Bear',
    wiki: 'https://en.wikipedia.org/wiki/Bear_flag_(gay_culture)'
  },
  { stripes: biStripes, name: 'Bisexual', wiki: 'https://en.wikipedia.org/wiki/Bisexuality' },
  {
    stripes: fluidStripes,
    name: 'Genderfluid',
    wiki: 'https://en.wikipedia.org/wiki/Genderfluid'
  },
  {
    stripes: genderqueerStripes,
    name: 'Genderqueer',
    wiki: 'https://en.wikipedia.org/wiki/Genderqueer'
  },
  {
    stripes: leatherStripes,
    name: 'Leather',
    wiki: 'https://en.wikipedia.org/wiki/Leather_Pride_flag'
  },
  {
    stripes: lesbianStripes,
    name: 'Lesbian',
    wiki: 'https://en.wikipedia.org/wiki/LGBT_symbols#Lesbianism'
  },
  {
    stripes: nonBinaryStripes,
    name: 'Non-Binary',
    wiki: 'https://en.wikipedia.org/wiki/Non-binary_gender'
  },
  { stripes: panStripes, name: 'Pansexual', wiki: 'https://en.wikipedia.org/wiki/Pansexuality' },
  {
    stripes: phillyStripes,
    name: `Philly's pride flag`,
    wiki: 'https://en.wikipedia.org/wiki/LGBT_symbols#cite_ref-Philadelphia_93-0'
  },
  {
    stripes: polysexualStripes,
    name: 'Polysexual',
    wiki: 'https://rationalwiki.org/wiki/Polysexuality'
  },
  {
    stripes: transStripes,
    name: 'Trans',
    wiki: 'https://en.wikipedia.org/wiki/Transgender_flags'
  },
  {
    stripes: lazyBiBoy,
    name: 'Lazy bisexual',
    wiki: 'https://twitter.com/freezydorito/status/1152168216120221697'
  },
  {
    stripes: lazyBiGirl,
    name: 'Lazy bisexual',
    wiki: 'https://twitter.com/freezydorito/status/1152168216120221697'
  }
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
