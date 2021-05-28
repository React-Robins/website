import React from 'react'
import { graphql } from 'gatsby'
import Main from '../pages/_main'

export default ({ data = { query } }) => {
  const {
    event,
    allAirtable: { edges }
  } = data
  return <Main city={event} attendees={edges.map((edge) => edge.node)} />
}

export const query = graphql`
  query ($slug: String!) {
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
        food
        hour
        date
        #   bySeason
        # maxCapacity
        rsvpsClosed
      }
      site {
        location
        #   googleMapsLink
        calendarLink
        # rsvpLink
        cfp
        #  customDescription
      }
      announcement {
        heading
        text
      }
      mainOrganizer {
        name
        main
        phoneNumber
        twitterHandle
        email
        githubLink
      }
      organizers {
        #   id
        name
        email
        twitterHandle
        githubLink
      }
      # thanks {
      #   id
      #   link
      #   name
      #   reason
      # }
      sponsors {
        name
        link
        media
      }
      speakers {
        # id

        # mc
        name
        twitterLink
        talk
        # link
        githubLink
      }
    }
  }
`
