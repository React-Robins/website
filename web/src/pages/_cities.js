import KlarnaIcon from '../assets/icons/stockholm/klarna.svg'
import StockholmIcon from '../assets/icons/stockholm/stockholm.svg'
import StockholmHoverIcon from '../assets/icons/stockholm/stockholm-hover.svg'

import BerlinIcon from '../assets/icons/berlin/berlin.svg'
import BerlinHoverIcon from '../assets/icons/berlin/berlin-hover.svg'
import CoupIcon from '../assets/icons/berlin/coup.svg'

import ITNGIcon from '../assets/icons/barcelona/itnig.svg'
import BarcelonaIcon from '../assets/icons/barcelona/barcelona.svg'
import BarcelonaHoverIcon from '../assets/icons/barcelona/barcelona-hover.svg'

import WebflowIcon from '../assets/icons/sf/webflow.svg'
import SfIcon from '../assets/icons/sf/sf.svg'
import SfHoverIcon from '../assets/icons/sf/sf-hover.svg'

import LondonIcon from '../assets/icons/london/london.svg'
import LondonHoverIcon from '../assets/icons/london/london-hover.svg'
import MicrosoftIcon from '../assets/icons/london/microsoft.svg'

const makeDate = (d, m, y) => new Date(y, m - 1, d)

const cities = [
  {
    city: 'Berlin',
    link: '/berlin',
    date: makeDate(23, 7, 2019),
    icon: BerlinIcon,
    iconHover: BerlinHoverIcon,
    hostIcon: CoupIcon,
    hostName: 'Co.up Community '
  },
  {
    city: 'Barcelona',
    link: '/barcelona',
    date: makeDate(4, 9, 2019),
    icon: BarcelonaIcon,
    iconHover: BarcelonaHoverIcon,

    hostIcon: ITNGIcon,
    hostName: 'itnig'
  },
  {
    city: 'Stockholm',
    link: '/stockholm',
    date: makeDate(8, 10, 2019),
    icon: StockholmIcon,
    iconHover: StockholmHoverIcon,
    hostIcon: KlarnaIcon,
    hostName: 'Klarna'
  },
  {
    city: 'San Francisco',
    link: '/san-francisco',
    date: makeDate(2, 11, 2019),
    icon: SfIcon,
    iconHover: SfHoverIcon,
    hostIcon: WebflowIcon,
    hostName: 'Webflow'
  },
  {
    city: 'London',
    link: '/london',
    date: makeDate(20, 9, 2019),
    icon: LondonIcon,
    iconHover: LondonHoverIcon,
    hostIcon: MicrosoftIcon,
    hostName: 'Microsoft'
  }
]

export default cities
