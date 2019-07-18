import KlarnaIcon from '../assets/icons/stockholm/klarna.svg'
import StockholmIcon from '../assets/icons/stockholm/stockholm.svg'
import StockholmHoverIcon from '../assets/icons/stockholm/stockholm-hover.svg'

import BerlinIcon from '../assets/icons/berlin/berlin.svg'
import BerlinHoverIcon from '../assets/icons/berlin/berlin-hover.svg'
import CoupIcon from '../assets/icons/berlin/coup.svg'

import ITNGIcon from '../assets/icons/barcelona/itnig.svg'
import BarcelonaIcon from '../assets/icons/barcelona/barcelona.svg'
import BarcelonaHoverIcon from '../assets/icons/barcelona/barcelona-hover.svg'

const cities = [
  {
    city: 'Berlin',
    link: '/berlin',
    date: '23rd July',
    icon: BerlinIcon,
    iconHover: BerlinHoverIcon,
    hostIcon: CoupIcon,
    hostName: 'Co.up Community '
  },
  {
    city: 'Barcelona',
    link: '/barcelona',
    date: '3rd Septmeber',
    icon: BarcelonaIcon,
    iconHover: BarcelonaHoverIcon,

    hostIcon: ITNGIcon,
    hostName: 'itnig'
  },
  {
    city: 'Stockholm',
    link: '/stockholm',
    date: '8th November',
    icon: StockholmIcon,
    iconHover: StockholmHoverIcon,
    hostIcon: KlarnaIcon,
    hostName: 'Klarna'
  }
]

export default cities
