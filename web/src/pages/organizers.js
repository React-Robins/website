import React from 'react'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Panel from '../components/Panel'
import Speakers from '../components/Speakers'
import { gayStripes, aceStripes, biStripes, fluidStripes } from '../helpers/useRainbow'

const organizers = [
  {
    id: 1,
    name: 'Sara Vieira',
    twitterLink: 'NikkitaFTW',
    image: 'https://pbs.twimg.com/profile_images/1123259650126774272/KOE88EYU_400x400.jpg',
    location: 'Berlin, Germany 🇩🇪',
    colors: gayStripes
  },
  {
    id: 2,
    name: 'Laura Gonzalez',
    twitterLink: 'freezydorito',
    image: 'https://pbs.twimg.com/profile_images/1092069028154216449/M-yDW4aY_400x400.jpg',
    location: 'London, UK 🇬🇧',
    colors: aceStripes
  },
  {
    id: 3,
    name: 'Kate Beard',
    twitterLink: 'SBinLondon',
    image: 'https://pbs.twimg.com/profile_images/1094904470121734144/IzqaUOrJ_200x200.jpg',
    location: 'London, UK 🇬🇧',
    colors: biStripes
  },
  {
    id: 4,
    name: 'Paul Verbeek-Mast',
    twitterLink: 'paul_v_m',
    image: 'https://pbs.twimg.com/profile_images/1002524944968880129/5TejN8df_200x200.jpg',
    location: 'Amsterdam, Netherlands 🇳🇱',
    colors: fluidStripes
  },
  {
    id: 5,
    name: 'Carolyn Stransky',
    twitterLink: 'carolstran',
    image: 'https://newdevs.org/images/coach_carolyn.png',
    location: 'Berlin, Germany 🇩🇪',
    colors: []
  }
]

const CodeOfConduct = ({ location }) => {
  const { site } = location.state || {
    site: {
      title: 'QueerJS',
      description: 'A meetup for everyone where Queer Speakers take the stage'
    }
  }
  return (
    <Layout>
      <SEO title={site.title} description={site.description} />
      <main>
        <h1 hidden>Welcome to {site.title}</h1>
        <Panel heading="Organizers">
          <p>
            Nothing can be organized by only one person and there is a team helping QueerJS be a
            safe space all over the world.
          </p>
          <p
            css={`
              margin-bottom: 40px;
            `}
          >
            Thank you.
          </p>
          <Speakers speakers={organizers} />
        </Panel>
      </main>
    </Layout>
  )
}

export default CodeOfConduct
