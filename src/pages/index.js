import React from 'react'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Panel, { LargeParagraph } from '../components/Panel'
import City, { Cities } from '../components/City'

import { isFuture, isToday, parse } from 'date-fns'
import { graphql } from 'gatsby'

const IndexPage = ({ data: { allEvent } }) => {
  const getDate = date => parse(date, 'L', new Date())
  const sortedCities = allEvent.edges.sort(
    (a, b) => getDate(a.node.info.date) - getDate(b.node.info.date)
  )

  const futureMeetups = sortedCities.filter(
    city => isFuture(city.node.info.date) || isToday(city.node.info.date)
  )
  const pastMeetups = sortedCities.filter(city => !isFuture(city.node.info.date))

  return (
    <Layout>
      <SEO
        title={'QueerJS'}
        description={'A meetup for everyone where Queer Speakers take the stage'}
      />
      <Panel>
        <LargeParagraph>
          QueerJS is a series of meetups where anyone is welcome to attend and support the speakers
          and the idea but all the speakers will be Queer.
          <br />
          This meetup exists to give a voice to everyone, to make a safe space where everyone is
          welcome.
        </LargeParagraph>
        <LargeParagraph>
          Join us! There will be food and stickers{' '}
          <span role="img" aria-label="Queer Rainbow">
            🌈
          </span>
        </LargeParagraph>
      </Panel>
      {futureMeetups.length ? (
        <Panel wide heading="Upcoming meetups">
          <Cities>
            {futureMeetups.map(({ node }) => (
              <City {...node.info} key={node.id} />
            ))}
          </Cities>
        </Panel>
      ) : null}
      {pastMeetups.length ? (
        <Panel wide heading="Past Meetups">
          <Cities>
            {pastMeetups.map(({ node }) => (
              <City {...node.info} past key={node.id} />
            ))}
          </Cities>
        </Panel>
      ) : null}

      {/* <Thanks
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
      /> */}
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allEvent {
      edges {
        node {
          id
          info {
            city
            link
            date
            hour
            hostName
            hour
            icon {
              publicURL
            }
            iconHover {
              publicURL
            }
            hostIcon {
              publicURL
            }
          }
        }
      }
    }
  }
`
