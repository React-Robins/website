import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Thanks from '../components/Thanks'
import Panel from '../components/Panel'

import cities from './_cities'
import City from '../components/City'
import Heading from '../components/Heading'

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
      {futureMeetups.length ? (
        <Panel>
          <Heading>Upcoming meetups</Heading>
          {futureMeetups.map(city => (
            <City {...city} key={city.city} />
          ))}
        </Panel>
      ) : null}
      {pastMeetups.length ? (
        <Panel heading="Past Meetups">
          {pastMeetups.map(city => (
            <City {...city} key={city.city} past />
          ))}
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
