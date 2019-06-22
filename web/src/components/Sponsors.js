import React from 'react'
import {useStaticQuery, graphql} from 'gatsby'
import Figure from './Figure'

export default () => {
  const {
    allSanitySponsor: {edges}
  } = useStaticQuery(graphql`
    fragment SponsorImage on SanityImage {
      crop {
        _key
        _type
        top
        bottom
        left
        right
      }
      hotspot {
        _key
        _type
        x
        y
        height
        width
      }
      asset {
        _id
      }
    }
    query {
      allSanitySponsor {
        edges {
          node {
            name
            link
            media {
              ...SponsorImage
            }
          }
        }
      }
    }
  `)

  return (
    <ul>
      {edges.map(({node: sponsor}) => (
        <a target='_blank' href={sponsor.link}>
          <Figure node={sponsor.media} alt={sponsor.name} />
        </a>
      ))}
    </ul>
  )
}
