import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Sponsors from '../components/Sponsors'
import Info from '../components/Info/'
import Attendees from '../components/Attendees'
import Speakers from '../components/Speakers'
import Thanks from '../components/Thanks'
import Panel from '../components/Panel'

export const query = graphql`
  query {
    paris {
      site: SiteSettings(id: "siteSettings") {
        title
        description
        location
        date
        organizers
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
      thanks: allThanks {
        id: _id
        link
        name
        reason
      }
      attendees: allAttendees {
        id: _id
        ghLink
        name
      }
      sponsors: allSponsors {
        name
        link
        media {
          asset {
            url
          }
        }
      }
      speakers: allSpeakers {
        id: _id
        job
        name
        twitterLink
        photo {
          asset {
            _id
          }
        }
      }
    }
  }
`

const IndexPage = ({ data = {} }) => {
  const {
    paris: { site, organizers, mainOrganizer, thanks, speakers, attendees, sponsors }
  } = data

  return (
    <Layout>
      <SEO title={site.title} description={site.description} />
      <main>
        <h1 hidden>Welcome to {site.title}</h1>
        <Info site={site} dataset="paris" />
        <Panel heading="What?">
          <p
            css={`
              font-family: 'NeutraText-Bold';
              font-size: 18px;
              line-height: 28px;
            `}
          >
            This idea started when a random dude on twitter said he doesn't think "React Girls" is a
            good idea because he's gay and wouldn't want to be in a conference with only gay people.
            So now welcome to QueerJS.
            <br />
            This is a meetup where anyone is welcome to attend and support the speakers and the idea
            but all the speakers will be Queer.
            <br />
            Join us! There will be food and stickers 🌈
          </p>
        </Panel>
        <Panel heading="Speakers">
          <Speakers speakers={speakers} />
        </Panel>
        <Panel heading="Attendees">
          <Attendees attendees={attendees} />
        </Panel>

        <Panel heading="Sponsors">
          <Sponsors sponsors={sponsors} />
        </Panel>
      </main>
      <Panel heading="Special Thanks">
        <Thanks
          organizers={organizers}
          thanks={thanks}
          site={site}
          mainOrganizer={mainOrganizer.find(o => o.main)}
        />
      </Panel>
    </Layout>
  )
}

export default IndexPage
