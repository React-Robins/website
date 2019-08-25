import WebflowIcon from '../assets/icons/sf/webflow.svg'
import SfIcon from '../assets/icons/sf/sf.svg'
import SfHoverIcon from '../assets/icons/sf/sf-hover.svg'

const makeDate = (d, m, y) => new Date(y, m - 1, d)

export const frontmatter = {
  info: {
    city: 'San Francisco',
    link: 'san-francisco',
    date: makeDate(2, 11, 2019),
    icon: SfIcon,
    iconHover: SfHoverIcon,
    hostIcon: WebflowIcon,
    hostName: 'Webflow'
  },
  site: {
    city: 'San Francisco',
    location: 'Webflow',
    date: '2019-11-02T17:00:00.000Z',
    organizers: null,
    googleMapsLink:
      'https://www.google.com/maps/place/Webflow/@37.77068,-122.412894,17z/data=!4m13!1m7!3m6!1s0x808f7e2620538c9f:0x1956c7f529ee380b!2s398+11th+St,+San+Francisco,+CA+94103,+USA!3b1!8m2!3d37.7706795!4d-122.4128939!3m4!1s0x808f7e2dfcfcb397:0xbd614483fc75e307!8m2!3d37.77068!4d-122.412894',
    calendarLink:
      'http://www.google.com/calendar/event?action=TEMPLATE&dates=20191102T10000Z%2F20191102T23000Z&text=QueerJS&location=Webflow&details=',
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
        'https://cdn.sanity.io/images/atggkqis/sf/57785c7e03e369da149636a6be5813a74cf06a55-355x90.png'
    },
    {
      name: 'Webflow',
      link: 'https://webflow.com/',
      media:
        'https://cdn.sanity.io/images/atggkqis/sf/6fdddcb6a4b66758d4d551038da325bed9f22c90-809x204.png'
    }
  ],
  speakers: [
    {
      id: '30bf9535-3ab8-44fa-b16c-1c3f1127db60',
      mc: null,
      name: 'Alejandra Villa',
      twitterLink: 'AlxSavage',
      photo:
        'https://cdn.sanity.io/images/atggkqis/sf/f6d1ce961326157b07502bf8a6c1f626dd57b6a3-962x1280-jpg'
    },
    {
      id: '48dc803c-fff8-4eed-90cc-2edd940d23ad',
      mc: null,
      name: 'Stephanie Winn',
      twitterLink: 'steph_happens',
      photo:
        'https://cdn.sanity.io/images/atggkqis/sf/a52723c10cc829b8e28624fc3be41140d7ef3acf-400x400-png'
    },
    {
      id: 'd70720af-5a95-4b3d-a0af-9605cefb5d06',
      mc: null,
      name: 'Sara Vieira',
      twitterLink: 'NikkitaFTW',
      photo:
        'https://cdn.sanity.io/images/atggkqis/sf/e6233acd7a8974bc54db4e84110c7ef51791f6b5-960x960-jpg'
    }
  ]
}
