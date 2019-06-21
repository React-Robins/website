import React from 'react'
import format from 'date-fns/format'
import {graphql} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import styled from 'styled-components'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Figure from '../components/Figure'

export const query = graphql`
  fragment SanityImage on SanityImage {
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

  query IndexPageQuery {
    site: sanitySiteSettings {
      title
      description
      location
      date
      organizers
    }
    speakers: allSanitySpeaker {
      edges {
        node {
          _id
          job
          name
          twitterLink
          photo {
            ...SanityImage
          }
        }
      }
    }
  }
`

const SpeakerPhoto = styled.div`
  width: 125px;
`

const IndexPage = props => {
  const {data, errors} = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <div
          css={`
            display: flex;
            flex-direction: column;
            font-size: 16px;
            line-height: 32px;
            text-align: center;
          `}
        >
          <span>
            Location:{' '}
            <a href='https://goo.gl/maps/VV6YUwPJaT79ESGG9' target='_blank'>
              <b>{site.location}</b>
            </a>
          </span>

          <span>
            Date & Time: <b>{format(site.date, ['DD/MM HH:mm'])} </b>
          </span>
        </div>
        {/* <ul>
          {data.speakers.edges &&
            data.speakers.edges.map(({node: speaker}) => (
              <li key={speaker._id}>
                <SpeakerPhoto>
                  <Figure node={speaker.photo} />
                </SpeakerPhoto>
                <h3>{speaker.name}</h3>
              </li>
            ))}
        </ul> */}
        <h1
          css={`
            text-align: center;
            display: block;
          `}
        >
          Okay laura can I sleep now? 🌈
        </h1>
      </Container>
    </Layout>
  )
}

export default IndexPage
