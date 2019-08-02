import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Thanks from '../components/Thanks'
import Panel, { LargeParagraph } from '../components/Panel'

import cities from './_cities'
import City, { Cities } from '../components/City'

import { isFuture } from 'date-fns'

export const query = graphql`
  query {
    berlin {
      site: SiteSettings(id: "siteSettings") {
        title
        description
      }
      mainOrganizer: allOrganizers {
        name
        main
        phoneNumber
        twitterHandle
        email
      }
      organizers: allOrganizers {
        id: _id
        name
        email
        twitterHandle
      }
    }
  }
`

const IndexPage = ({ data = {} }) => {
  const {
    berlin: { site, mainOrganizer }
  } = data

  const sortedCities = cities.sort(({ date }, { date: otherDate }) => date - otherDate)

  const futureMeetups = sortedCities.filter(city => isFuture(city.date))
  const pastMeetups = sortedCities.filter(city => !isFuture(city.date))

  return (
    <Layout>
      <SEO title={site.title} description={site.description} />
      <Panel>
        <LargeParagraph>
          QueerJS is a series of meetups where anyone is welcome to attend and support the speakers
          and the idea but all the speakers will be Queer.
          <br />
          This meetup exists to give a voice to everyone, to make a safe space where everyone is
          welcome.
        </LargeParagraph>
        <LargeParagraph>Join us! There will be food and stickers 🌈</LargeParagraph>
      </Panel>
      {futureMeetups.length ? (
        <Panel wide heading="Upcoming meetups">
          <Cities>
            {futureMeetups.map(city => (
              <City {...city} key={city.city} />
            ))}
          </Cities>
        </Panel>
      ) : null}
      {pastMeetups.length ? (
        <Panel wide heading="Past Meetups">
          <Cities>
            {pastMeetups.map(city => (
              <City {...city} key={city.city} past />
            ))}
          </Cities>
        </Panel>
      ) : null}

      <Thanks
        organizers={[]}
        thanks={[
          {
            link: 'https://www.flaticon.com',
            name: 'Thank you to flaticon',
            reason: 'icons'
          }
        ]}
        site={site}
        mainOrganizer={mainOrganizer.find(o => o.main)}
      />
    </Layout>
  )
}

export default IndexPage
