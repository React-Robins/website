import React from 'react'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Panel from '../components/Panel'
import Rainbow from '../components/rainbow/Rainbow'

import { allStripes } from './../helpers/useRainbow'
import styled from 'styled-components'
import Thanks from '../components/Thanks'

const Flag = styled(Rainbow)`
  width: 6em;
  height: 4em;
  border: 2px solid black;
  transform: rotate(-5deg);
  margin-bottom: 1em;
`

const Box = styled.a`
  display: block;
  border: 3px solid ${props => props.theme.contrastPurple};
  justify-content: center;
  margin-bottom: -3px;
  padding: 1em;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h3`
  font-size: 1em;
  font-weight: inherit;
  margin: 0;
`

const OrganizersPage = ({ location }) => {
  const { site } = location.state || {
    site: {
      title: 'QueerJS',
      description: 'A meetup for everyone where Queer Speakers take the stage'
    }
  }
  return (
    <Layout>
      <SEO title={site.title} description={site.description} />
      <main>
        <h1 hidden>Welcome to {site.title}</h1>
        <Panel heading="All the flags">
          <ul>
            {allStripes.map((stripe, i) => (
              <Box key={i} href={stripe.wiki} target="_blank">
                <Flag stripes={stripe.stripes} />
                <Title>{stripe.name}</Title>
              </Box>
            ))}
          </ul>
        </Panel>
      </main>
      <Thanks
        organizers={[]}
        thanks={[
          {
            link: 'https://www.flaticon.com',
            name: 'Thank you to flaticon',
            reason: 'icons'
          }
        ]}
        site={site}
      />
    </Layout>
  )
}

export default OrganizersPage
