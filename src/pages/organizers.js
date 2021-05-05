import React from 'react'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { Link } from 'gatsby'
import Panel from '../components/Panel'
import Speakers from '../components/Speakers'

import organizers from './_organizers'

const capitalize = s => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const OrganizersPage = () => {
  const { site } = {
    site: {
      title: 'React Ladies',
      description: 'A supportive community for women and non-binary React enthusiasts'
    }
  }
  return (
    <Layout>
      <SEO title={site.title} description={site.description} />
      <main>
        <h1 hidden>Welcome to {site.title}</h1>
        <Panel heading="Organizers">
          <p>
            Meet the team behind React Ladies 👋🏾 and let us know if you are interested in
            <Link to="/getting-involved"> getting involved</Link>.
          </p>
          <p
            css={`
              margin-bottom: 40px;
            `}
          >
            Thank you.
          </p>
          {Object.keys(organizers).map(location => {
            return (
              <>
                <h2
                  css={`
                    margin-bottom: 20px;
                  `}
                >
                  {capitalize(location)}
                </h2>
                <Speakers organizers speakers={organizers[location]} />
              </>
            )
          })}
        </Panel>
      </main>
    </Layout>
  )
}

export default OrganizersPage
