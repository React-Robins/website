import React from 'react'
import { graphql } from 'gatsby'
import Main from '../pages/_main'

export default ({ data = {} }) => {
  const {
    javascriptFrontmatter: { frontmatter }
  } = data
  return <Main city={frontmatter} />
}

export const query = graphql`
  query($slug: String!) {
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
