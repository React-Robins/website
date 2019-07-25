import React from 'react'
import { graphql } from 'gatsby'
import Main from './_main'

export const query = graphql`
  query {
    london {
      site: SiteSettings(id: "siteSettings") {
        title
        description
        location
        date
        organizers
        googleMapsLink
        calendarLink
        cfp
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
        mc
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

export default ({ data = {} }) => {
  const { london } = data
  return <Main city={london} dataset="london" />
}
