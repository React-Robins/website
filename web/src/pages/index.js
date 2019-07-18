import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Thanks from '../components/Thanks'
import Panel from '../components/Panel'

import cities from './_cities'
import City from '../components/City'

export const query = graphql`
  query {
    berlin {
      site: SiteSettings(id: "siteSettings") {
        title
        description
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
    }
  }
`

const IndexPage = ({ data = {} }) => {
  const {
    berlin: { site, organizers, mainOrganizer, thanks }
  } = data

  return (
    <Layout>
      <SEO title={site.title} description={site.description} />
      <main>
        <h1 hidden>Welcome to {site.title}</h1>
      </main>
      <Panel heading="Cities">
        {cities.map(city => (
          <City {...city} key={city.city} />
        ))}
        {/* <Thanks
          organizers={organizers}
          thanks={thanks}
          site={site}
          mainOrganizer={mainOrganizer.find(o => o.main)}
        /> */}
      </Panel>
    </Layout>
  )
}

export default IndexPage
