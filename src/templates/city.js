import React from 'react'
import { graphql } from 'gatsby'
import Main from '../pages/_main'

export default ({ data = {} }) => {
  const {
    javascriptFrontmatter: { frontmatter },
    allAirtable: { edges }
  } = data
  return <Main city={frontmatter} attendees={edges.map(edge => edge.node)} />
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
    javascriptFrontmatter(frontmatter: { info: { link: { eq: $slug } } }) {
      frontmatter {
        info {
          link
          city
        }
        site {
          location
          date
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
          photo
        }
      }
    }
  }
`
