import KlarnaIcon from '../assets/icons/stockholm/klarna.svg'
import StockholmIcon from '../assets/icons/stockholm/stockholm.svg'
import StockholmHoverIcon from '../assets/icons/stockholm/stockholm-hover.svg'

const makeDate = (d, m, y) => new Date(y, m - 1, d)

export const frontmatter = {
  info: {
    city: 'Stockholm',
    link: 'stockholm',
    date: makeDate(8, 10, 2019),
    icon: StockholmIcon,
    iconHover: StockholmHoverIcon,
    hostIcon: KlarnaIcon,
    hostName: 'Klarna'
  },
  site: {
    city: 'Stocholm',
    location: 'Klarna',
    date: '2019-10-08T16:00:00.000Z',
    organizers: null,
    googleMapsLink:
      'https://www.google.com/maps/place/Klarna+Bank/@59.3371711,18.0623904,15z/data=!4m2!3m1!1s0x0:0x4fbbacb35803b406?sa=X&ved=2ahUKEwjR46rQzsrjAhVOKlAKHXwoDBgQ_BIwE3oECA4QCA',
    calendarLink:
      'http://www.google.com/calendar/event?action=TEMPLATE&dates=20191008T160000Z%2F20191008T183000Z&text=QueerJS&location=Klarna%20Bank&details=',
    cfp: false
  },
  mainOrganizer: [
    {
      name: 'Aveline Estié',
      main: true,
      phoneNumber: '+46762305887',
      twitterHandle: 'avilene_',
      email: 'aa.estie@gmail.com'
    }
  ],
  organizers: [
    {
      id: 'ae2d4158-cd43-4196-b88e-cb2afdbf6b4b',
      name: 'Aveline Estié',
      email: 'aa.estie@gmail.com',
      twitterHandle: 'avilene_'
    }
  ],
  thanks: [],
  sponsors: [
    {
      name: 'Klarna',
      link: 'https://www.klarna.com/',
      media:
        'https://cdn.sanity.io/images/atggkqis/stockholm/e341846061bd2caef4b94863e6335b1ab4a7fa5d-135x75.png'
    },
    {
      name: 'Samsung Internet',
      link: 'https://www.samsung.com/de/apps/samsung-internet/',
      media:
        'https://cdn.sanity.io/images/atggkqis/stockholm/57785c7e03e369da149636a6be5813a74cf06a55-355x90.png'
    }
  ],
  speakers: [
    {
      id: 'a7cabf04-d8d3-469b-9411-53e918003846',
      mc: null,
      name: 'Svetlana Sharipova',
      twitterLink: 'hellodeadline',
      photo:
        'https://cdn.sanity.io/images/atggkqis/stockholm/cd2a8572a7d82b61b209885cb53699bfa1f35967-400x400-png'
    },
    {
      id: 'b71cf7ad-a484-4153-a739-fdb5ac23aab8',
      mc: null,
      name: 'Yonatan Miller',
      twitterLink: 'shushugah',
      photo:
        'https://cdn.sanity.io/images/atggkqis/stockholm/5e895c08753575ae44c6c6b803257dcd68016d74-400x400-png'
    },
    {
      id: 'cc19241b-9c8d-4dc1-88fd-3c7897a867a7',
      mc: null,
      name: 'Cynthia Maja Revström',
      twitterLink: 'bitcynth',
      photo:
        'https://cdn.sanity.io/images/atggkqis/stockholm/0fe9a0c8c40e843a0aaa38bf8d29b65e5d6d5a54-400x400-png'
    },
    {
      id: 'cff21124-32fe-4739-87ff-e99a598a617e',
      mc: null,
      name: 'Shelley Vohr',
      twitterLink: 'codebytere',
      photo:
        'https://cdn.sanity.io/images/atggkqis/stockholm/1bc87bbbfe12f4f01592caf95044a61ae29eaa14-400x400-png'
    },
    {
      id: 'd18b97f9-88e7-4cc0-9f2a-db1eca7eb08b',
      mc: true,
      name: 'Sara Vieira',
      twitterLink: 'NikkitaFTW',
      photo:
        'https://cdn.sanity.io/images/atggkqis/stockholm/c114d442948742202a0d6e654f1194cb16d9b4b4-400x400-png'
    },
    {
      id: 'db03da8a-fc0d-424b-ba2e-a6007bb9270e',
      mc: null,
      name: 'Aveline',
      twitterLink: 'Avilene_',
      photo:
        'https://cdn.sanity.io/images/atggkqis/stockholm/9ba5bff53b2888d2653171de1eeb26a9e05cca05-400x400-png'
    }
  ]
}
