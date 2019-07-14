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
    berlin {
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
    berlin: { site, organizers, mainOrganizer, thanks, speakers, attendees, sponsors }
  } = data

  return (
    <Layout>
      <SEO title={site.title} description={site.description} />
      <main>
        <h1 hidden>Welcome to {site.title}</h1>
        <Info site={site} dataset="production" />
        <Panel heading="What?">
          <p
            css={`
              font-family: 'NeutraText-Bold';
              font-size: 18px;
              line-height: 28px;
            `}
          >
            This is a meetup where anyone is welcome to attend and support the speakers and the idea
            but all the speakers will be Queer.
            <br />
            This meetup exists to give a voice to everyone, to make a safe space where everyone is
            welcome.
            <br />
            Join us! There will be food and stickers 🌈
            <br />
            <br />
            <b>
              All the talks will be livestream, if you don't wish to be in any of the videos please
              let us any of the organizers know
            </b>
          </p>
        </Panel>
        <Panel heading="Speakers">
          <Speakers speakers={speakers} />
        </Panel>
        <Panel heading={`Attendees (${attendees.length})`}>
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
