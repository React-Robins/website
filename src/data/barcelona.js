import ITNGIcon from '../assets/icons/barcelona/itnig.svg'
import BarcelonaIcon from '../assets/icons/barcelona/barcelona.svg'
import BarcelonaHoverIcon from '../assets/icons/barcelona/barcelona-hover.svg'
const makeDate = (d, m, y) => new Date(y, m - 1, d)

export const frontmatter = {
  info: {
    city: 'Barcelona',
    link: 'barcelona',
    date: makeDate(4, 9, 2019),
    icon: BarcelonaIcon,
    iconHover: BarcelonaHoverIcon,

    hostIcon: ITNGIcon,
    hostName: 'itnig'
  },
  site: {
    city: 'Barcelona',
    location: 'Itnig',
    date: '2019-09-04T16:00:00.000Z',
    organizers: null,
    googleMapsLink:
      'https://www.google.es/maps/place/itnig/@41.3962294,2.1940527,15z/data=!4m5!3m4!1s0x0:0xc4a659466688fe8d!8m2!3d41.3962294!4d2.1940527?shorturl=1',
    calendarLink:
      'http://www.google.com/calendar/event?action=TEMPLATE&dates=20190904T160000Z%2F20190904T183000Z&text=QueerJS&location=itnig&details=',
    cfp: true
  },
  mainOrganizer: [],
  organizers: [],
  thanks: [],
  sponsors: [
    {
      name: 'Samsung Internet',
      link: 'https://www.samsung.com/de/apps/samsung-internet/',
      media:
        'https://cdn.sanity.io/images/atggkqis/barcelona/57785c7e03e369da149636a6be5813a74cf06a55-355x90.png'
    },
    {
      name: 'itnig',
      link: 'https://itnig.net',
      media:
        'https://cdn.sanity.io/images/atggkqis/barcelona/573d003670d0fc0b0f9e5d68a620cbc25a8edb60-5661x2787.png'
    }
  ],
  speakers: [
    {
      id: '451e0703-5056-49c5-a564-7a19f71a8a1f',
      mc: null,
      name: 'Daniel Ehrenberg',
      twitterLink: 'littledan',
      photo: 'image-7586209b37367db6c4184f769452d8606d03e3f5-400x400-png'
    },
    {
      id: 'd4d2059d-fb15-4627-b0bd-a23d54fb1731',
      mc: null,
      name: 'Laura Gonzalez',
      twitterLink: 'freezydorito',
      photo: 'image-96bfcb94a367bca13d238917528b980e9b62bbe6-400x400-png'
    }
  ]
}
