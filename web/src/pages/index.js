import React from 'react'
import format from 'date-fns/format'
import {graphql} from 'gatsby'
import styled from 'styled-components'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Figure from '../components/Figure'
import Sponsors from '../components/Sponsors'

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
    thanks: allSanityThanks {
      edges {
        node {
          id
          link
          name
        }
      }
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

const Info = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  line-height: 32px;
  text-align: center;
  margin-bottom: 40px;
`

const SpeakerPhoto = styled.div`
  width: 150px;
  position: relative;

  &:hover {
    :after {
      content: '';
      width: 100%;
      height: 100%;
      background: linear-gradient(
        rgba(255, 0, 0, 1),
        rgba(255, 255, 0, 1),
        rgba(0, 255, 0, 1),
        rgba(0, 255, 255, 1),
        rgba(0, 0, 255, 1),
        rgba(255, 0, 255, 1),
        rgba(255, 0, 0, 1)
      );
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.3;
    }
  }
`

const Speakers = styled.ul`
  display: flex;
  text-align: center;

  li {
    margin: 20px;
  }
`

const IndexPage = ({data = {}}) => {
  const site = data.site

  return (
    <Layout>
      <SEO title={site.title} description={site.description} />
      <main>
        <h1 hidden>Welcome to {site.title}</h1>
        <Info>
          <span>
            Location:{' '}
            <a href='https://goo.gl/maps/VV6YUwPJaT79ESGG9' target='_blank'>
              <b>{site.location}</b>
            </a>
          </span>

          <span>
            Date & Time: <b>{format(site.date, ['DD/MM HH:mm'])} </b>
          </span>
        </Info>
        <Speakers>
          {data.speakers.edges &&
            data.speakers.edges.map(({node: speaker}) => (
              <li key={speaker._id}>
                <SpeakerPhoto>
                  <Figure node={speaker.photo} />
                </SpeakerPhoto>
                <h3>{speaker.name}</h3>
              </li>
            ))}
        </Speakers>
        <Sponsors />
      </main>
    </Layout>
  )
}

export default IndexPage
