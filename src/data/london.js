import LondonIcon from '../assets/icons/london/london.svg'
import LondonHoverIcon from '../assets/icons/london/london-hover.svg'
import MicrosoftIcon from '../assets/icons/london/microsoft.svg'
const makeDate = (d, m, y) => new Date(y, m - 1, d)

export const frontmatter = {
  info: {
    city: 'London',
    link: 'london',
    date: makeDate(20, 9, 2019),
    icon: LondonIcon,
    iconHover: LondonHoverIcon,
    hostIcon: MicrosoftIcon,
    hostName: 'Microsoft'
  },
  site: {
    city: 'London',
    location: 'Microsoft Reactor',
    date: '2019-09-20T17:30:00.000Z',
    organizers: null,
    googleMapsLink: 'https://goo.gl/maps/jKnHZ3jd5ku1PPG46',
    calendarLink:
      'http://www.google.com/calendar/event?action=TEMPLATE&dates=20190920T183000Z%2F20190920T213000Z&text=QueerJS&location=Microsoft%20Reactor&details=A%20meetup%20for%20everyone%20where%20Queer%20Speakers%20take%20the%20stage',
    cfp: false
  },
  mainOrganizer: [
    {
      name: 'Laura González',
      main: true,
      phoneNumber: '07411728679',
      twitterHandle: 'freezydorito',
      email: 'lawr@lauragonzalez.cc'
    }
  ],
  organizers: [
    {
      id: '57871d45-32a9-476e-bc3b-58cb241b6cee',
      name: 'Laura González',
      email: 'lawr@lauragonzalez.cc',
      twitterHandle: 'freezydorito'
    }
  ],
  thanks: [],
  sponsors: [
    {
      name: 'Microsoft',
      link: 'https://www.microsoft.com/',
      media:
        'https://cdn.sanity.io/images/atggkqis/london/153b6040eb345b762464ef9fb3eb40f9187caa4d-400x400.png'
    },
    {
      name: 'Samsung Internet',
      link: 'https://www.samsung.com/de/apps/samsung-internet/',
      media:
        'https://cdn.sanity.io/images/atggkqis/london/062cc6c9edf62f567b0f65c13860fe8a6ea293df-355x90.svg'
    }
  ],
  speakers: [
    {
      id: '2df4b937-f4ab-4842-aaef-4990f9d4ac37',
      mc: null,
      name: 'Rachel Nabors',
      twitterLink: 'rachelnabors',
      photo:
        'https://cdn.sanity.io/images/atggkqis/london/6ed700454fe0a61f63f8781d79fd43629733ad7e-400x400-jpg'
    },
    {
      id: '837f55ff-0b99-43db-8a08-2a757092dff6',
      mc: null,
      name: 'Olu Niyi-Awosusi',
      twitterLink: 'oluoluoxenfree',
      photo:
        'https://cdn.sanity.io/images/atggkqis/london/9ee306b181d8cc9fd0076126f956cc57ce426cd1-400x400-jpg'
    },
    {
      id: 'b7aaa975-a767-453b-8e69-dfb5697b7841',
      mc: null,
      name: 'Josh Hunt',
      twitterLink: 'joshhunt',
      photo:
        'https://cdn.sanity.io/images/atggkqis/london/b75cffbd62788cfa1363f2afc924303c484aa55d-1000x1000-jpg'
    },
    {
      id: 'be8349ae-df76-425b-9df4-535fa9199f86',
      mc: true,
      name: 'Kate Beard',
      twitterLink: 'SBinLondon',
      photo:
        'https://cdn.sanity.io/images/atggkqis/london/f3ba31f9d3cff1bc4790061eb7fdabe3e842050e-3024x3024-jpg'
    },
    {
      id: 'c8e14584-83c3-44af-a0fa-d7394282a3e6',
      mc: null,
      name: 'Bren Brightwell',
      twitterLink: 'quarterto',
      photo:
        'https://cdn.sanity.io/images/atggkqis/london/300507040ceba628535a99fcbc5bed1c89aa4c2c-400x400-png'
    },
    {
      id: 'ca8116af-e25b-4d3f-9505-74964a5d9da4',
      mc: null,
      name: 'Anna Leach',
      twitterLink: 'annajleach',
      photo:
        'https://cdn.sanity.io/images/atggkqis/london/a416e2debcd09076ca457ee329b0bb739da74fe5-401x401-jpg'
    },
    {
      id: 'e189a99e-6ca9-4792-8c47-573d7ae8d2b5',
      mc: null,
      name: 'Marcel Cutts',
      twitterLink: 'marcelcutts',
      photo:
        'https://cdn.sanity.io/images/atggkqis/london/d27916f4507cfea1160056bdc52f18957c08a694-1150x1150-jpg'
    }
  ]
}
