import React from 'react'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Panel, { LargeParagraph, BoldText } from '../components/Panel'
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
  const pastMeetups = sortedCities.filter(
    city => !isFuture(city.node.info.date) && !isToday(city.node.info.date)
  )

  return (
    <Layout>
      <SEO
        title={'React Ladies'}
        description={'A supportive community for women and non-binary React enthusiasts'}
      />
      <Panel>
        <LargeParagraph>
          <BoldText>React Ladies</BoldText> is a supportive community for women and non-binary React
          enthusiasts with any level of programming experience to grow   as technologists and meet
          other React developers. We center our events around JavaScript and other technologies
          within the React ecosystem.
        </LargeParagraph>
      </Panel>
      {futureMeetups.length ? (
        <Panel wide heading="Upcoming Events">
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
            # bySeason
            hour
            hostName
            hour
            icon {
              publicURL
            }
            # iconHover {
            #   publicURL
            # }
            hostIcon {
              publicURL
            }
          }
        }
      }
    }
  }
`
