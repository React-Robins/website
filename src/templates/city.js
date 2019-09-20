import React from 'react'
import { graphql } from 'gatsby'
import Main from '../pages/_main'

export default ({ data = {} }) => {
  const {
    event,
    allAirtable: { edges }
  } = data
  return <Main city={event} attendees={edges.map(edge => edge.node)} />
}

export const query = graphql`
  query($slug: String!) {
    allAirtable(filter: { data: { city: { eq: $slug } } }) {
      edges {
        node {
          data {
            city
            ghLink
            name
          }
        }
      }
    }
    event(info: { link: { eq: $slug } }) {
      info {
        link
        city
        hour
        date
        maxCapacity
        rsvpsClosed
      }
      site {
        location
        googleMapsLink
        calendarLink
        cfp
      }
      mainOrganizer {
        name
        main
        phoneNumber
        twitterHandle
        email
      }
      organizers {
        id
        name
        email
        twitterHandle
      }
      thanks {
        id
        link
        name
        reason
      }
      sponsors {
        name
        link
        media
      }
      speakers {
        id
        mc
        name
        twitterLink
      }
    }
  }
`
