import React from 'react'
import {graphql} from 'gatsby'
import styled from 'styled-components'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Figure from '../components/Figure'
import Sponsors from '../components/Sponsors'
import Info from '../components/Info'

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

const SpeakerPhoto = styled.div`
  position: relative;
  border-radius: 100%;
  overflow: hidden;
  transition: 0.2s;

  &:hover {
    transform: scale(1.1) rotate(-5deg);
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
  display: grid;
  grid-gap: 40px;
  text-align: center;
  @media (min-width: 400px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`

const Footer = styled.footer`
  color: ${props => props.theme.lightGrey};
  font-size: 0.8em;
  margin: 80px 0 40px;
`

const Unstyled = styled.h3`
  font-size: 1em;
  font-weight: 600;
`

const Panel = ({heading, children}) => {
  const PanelDiv = styled.section`
    margin: 60px 0 30px;
  `
  const Heading = styled.h2`
    font-size: 32px;
    font-family: 'NeutraText-Bold';
  `
  return (
    <PanelDiv>
      {heading && <Heading>{heading}</Heading>}
      {children}
    </PanelDiv>
  )
}

const IndexPage = ({data = {}}) => {
  const site = data.site

  return (
    <Layout>
      <SEO title={site.title} description={site.description} />
      <main>
        <h1 hidden>Welcome to {site.title}</h1>
        <Info site={site} />
        <Panel heading='Speakers'>
          <Speakers>
            {data.speakers.edges &&
              data.speakers.edges.map(({node: speaker}) => (
                <li key={speaker._id}>
                  <SpeakerPhoto>
                    <Figure node={speaker.photo} />
                  </SpeakerPhoto>
                  <Unstyled>{speaker.name}</Unstyled>
                </li>
              ))}
          </Speakers>
        </Panel>
        <Panel heading='Sponsors'>
          <Sponsors />
        </Panel>
      </main>
      <Panel>
        <Footer>Icons by this guy</Footer>
      </Panel>
    </Layout>
  )
}

export default IndexPage
