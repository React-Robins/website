import React from 'react'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { Link } from 'gatsby'
import Panel, { LargeParagraph } from '../components/Panel'

const GettingInvolvedPage = () => {
  return (
    <Layout>
      <SEO
        title="QueerJS - Getting Involved"
        description="A meetup for everyone where Queer Speakers take the stage"
      />
      <main>
        <Panel>
          <LargeParagraph>
            There are a lot of ways you could get involved with QueerJS!
            <br />
            <br />
            If you think you'd like to do this, we'd love to work with you to make
            it happen - please contact us via {' '}
            <a
              href="https://twitter.com/QueerJS"
              rel="noopener noreferrer"
              title="Twitter"
              target="_blank"
            >
              Twitter
            </a>
            , or email us at {' '}
            <a
              href="mailto:hello@queerjs.com"
              rel="noopener noreferrer"
              title="Email"
            >
              hello@queerjs.org
            </a>!
          </LargeParagraph>
        </Panel>
        <Panel heading="Getting Involved"></Panel>
        <p>
          We're always looking for new locations to host meetups, as well as folks on the ground
          to act as local organizers and MCs.
          <br />
          <br />
          Involvement might include working with your employers to provide a space, organizing
          catering for meetup attendees, ensuring that there is a livestream or opportunity to
          record the speakers, and generally working to ensure that the meetup runs smoothly.
        </p>
        <Panel heading="What Do Local Organizers Do?"></Panel>
        <p>
          Local organizers are the point people for any given QueerJS event, and are key to its success.
          If you would like to be a local organizer, you should be prepared to:
          <ul>
            <li> Take point on finding a venue and date to hold the event. </li>
            <li> Ensure there is adequate seating for the RSVP'd number of attendees at the selected venue. </li>
            <li> Coordinate recording of event (and individual speakers) with onsite hosts, if possible. </li>
            <li> Coordinate food with onsite hosts, which may either be:
              <ul>
                <li> Provided by onsite hosts </li>
                <li> Ordered by local organizer and reimbursed through QueerJS' {' '}
                  <a
                    href="https://opencollective.com/queerjs"
                    rel="noopener noreferrer"
                    title="OpenCollective"
                  >
                    OpenCollective
                  </a>!
                </li>
              </ul>
            </li>
            <li> Ensure the {' '}
              <Link to="/code-of-conduct"> Code of Conduct</Link>{' '}
              is read to attendees at the beginning of the event.
            </li>
              <ul>
                <li> Mention{' '}
                  <Link to="/report"> reporting mechanisms</Link>{' '}
                  for CoC violations should they occur. </li>
              </ul>
            <li> Ensure the venue is cleaned following the close of the event. </li>
          </ul>
        </p>
      </main>
    </Layout>
  )
}

export default GettingInvolvedPage
